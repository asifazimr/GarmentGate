export class InvalidVideoError extends Error {
}
const METADATA_BOXES = new Set(['udta', 'meta', 'uuid', 'Xtra']);
const CONTAINERS = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts']);
const METADATA_TRACKS = new Set(['meta', 'camm', 'gpmd', 'mebx', 'mett', 'text', 'tmcd']);
function boxes(buf, from, to) {
    const out = [];
    let offset = from;
    while (offset + 8 <= to) {
        let size = buf.readUInt32BE(offset);
        const type = buf.toString('latin1', offset + 4, offset + 8);
        let header = 8;
        if (size === 1) {
            if (offset + 16 > to)
                throw new InvalidVideoError('Truncated video');
            const big = buf.readBigUInt64BE(offset + 8);
            if (big > BigInt(Number.MAX_SAFE_INTEGER))
                throw new InvalidVideoError('Video too large');
            size = Number(big);
            header = 16;
        }
        else if (size === 0) {
            size = to - offset;
        }
        if (size < header || offset + size > to)
            throw new InvalidVideoError('Malformed video');
        out.push({ type, start: offset, body: offset + header, end: offset + size });
        offset += size;
    }
    return out;
}
function blank(buf, box) {
    buf.write('free', box.start + 4, 'latin1');
    buf.fill(0, box.body, box.end);
}
function child(buf, parent, type) {
    return boxes(buf, parent.body, parent.end).find((b) => b.type === type);
}
function sampleRanges(buf, stbl) {
    const stsz = child(buf, stbl, 'stsz');
    const stsc = child(buf, stbl, 'stsc');
    const stco = child(buf, stbl, 'stco') ?? child(buf, stbl, 'co64');
    if (!stsz || !stsc || !stco)
        return [];
    const fixedSize = buf.readUInt32BE(stsz.body + 4);
    const sampleCount = buf.readUInt32BE(stsz.body + 8);
    const sizeOf = (i) => fixedSize !== 0 ? fixedSize : buf.readUInt32BE(stsz.body + 12 + i * 4);
    const chunkCount = buf.readUInt32BE(stco.body + 4);
    const wide = stco.type === 'co64';
    const chunkOffset = (i) => wide
        ? Number(buf.readBigUInt64BE(stco.body + 8 + i * 8))
        : buf.readUInt32BE(stco.body + 8 + i * 4);
    const entries = buf.readUInt32BE(stsc.body + 4);
    const runs = Array.from({ length: entries }, (_, i) => ({
        firstChunk: buf.readUInt32BE(stsc.body + 8 + i * 12),
        samplesPerChunk: buf.readUInt32BE(stsc.body + 12 + i * 12),
    }));
    const ranges = [];
    let sample = 0;
    for (let chunk = 0; chunk < chunkCount && sample < sampleCount; chunk += 1) {
        const run = [...runs].reverse().find((r) => r.firstChunk <= chunk + 1);
        let offset = chunkOffset(chunk);
        for (let s = 0; s < (run?.samplesPerChunk ?? 0) && sample < sampleCount; s += 1, sample += 1) {
            const size = sizeOf(sample);
            ranges.push([offset, offset + size]);
            offset += size;
        }
    }
    return ranges;
}
function isMetadataTrack(buf, trak) {
    const mdia = child(buf, trak, 'mdia');
    const hdlr = mdia && child(buf, mdia, 'hdlr');
    const minf = mdia && child(buf, mdia, 'minf');
    const stbl = minf && child(buf, minf, 'stbl');
    if (!hdlr || !stbl)
        return null;
    const handler = buf.toString('latin1', hdlr.body + 8, hdlr.body + 12);
    const stsd = child(buf, stbl, 'stsd');
    const format = stsd && stsd.end - stsd.body >= 16
        ? buf.toString('latin1', stsd.body + 12, stsd.body + 16)
        : '';
    return METADATA_TRACKS.has(handler) || METADATA_TRACKS.has(format) ? stbl : null;
}
export function sanitizeVideo(input) {
    const buf = Buffer.from(input);
    const top = boxes(buf, 0, buf.length);
    const ftyp = top[0];
    if (ftyp?.type !== 'ftyp')
        throw new InvalidVideoError('File is not an MP4 or MOV video');
    const moov = top.find((b) => b.type === 'moov');
    if (!moov)
        throw new InvalidVideoError('Video has no movie header');
    const walk = (from, to) => {
        for (const box of boxes(buf, from, to)) {
            if (METADATA_BOXES.has(box.type))
                blank(buf, box);
            else if (box.type === 'trak') {
                const stbl = isMetadataTrack(buf, box);
                if (stbl) {
                    for (const [start, end] of sampleRanges(buf, stbl)) {
                        if (start >= 0 && end <= buf.length && start < end)
                            buf.fill(0, start, end);
                    }
                }
                walk(box.body, box.end);
            }
            else if (CONTAINERS.has(box.type))
                walk(box.body, box.end);
        }
    };
    for (const box of top) {
        if (METADATA_BOXES.has(box.type))
            blank(buf, box);
        else if (box.type === 'moov')
            walk(box.body, box.end);
    }
    return buf;
}
//# sourceMappingURL=video-processor.js.map