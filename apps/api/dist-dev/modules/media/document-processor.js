import { EncryptedPDFError, PDFArray, PDFDict, PDFDocument, PDFName, PDFRef, PDFStream, } from 'pdf-lib';
export class InvalidDocumentError extends Error {
}
const CATALOG_KEYS = [
    'Metadata',
    'PieceInfo',
    'Names',
    'OpenAction',
    'AA',
    'AcroForm',
    'SpiderInfo',
    'Perms',
    'Threads',
    'AF',
];
const OBJECT_KEYS = ['Metadata', 'PieceInfo', 'AA', 'Annots', 'AF'];
export async function sanitizePdf(input) {
    if (input.subarray(0, 5).toString('latin1') !== '%PDF-') {
        throw new InvalidDocumentError('File is not a PDF');
    }
    let doc;
    try {
        doc = await PDFDocument.load(input, { updateMetadata: false, throwOnInvalidObject: false });
    }
    catch (error) {
        if (error instanceof EncryptedPDFError) {
            throw new InvalidDocumentError('Password-protected PDFs are not supported');
        }
        throw new InvalidDocumentError('File is not a readable PDF');
    }
    try {
        return await strip(doc);
    }
    catch (error) {
        if (error instanceof InvalidDocumentError)
            throw error;
        throw new InvalidDocumentError('File is not a readable PDF');
    }
}
async function strip(doc) {
    const { context } = doc;
    context.trailerInfo.Info = undefined;
    context.trailerInfo.Encrypt = undefined;
    for (const key of CATALOG_KEYS)
        doc.catalog.delete(PDFName.of(key));
    for (const [, object] of context.enumerateIndirectObjects()) {
        const dict = object instanceof PDFStream ? object.dict : object instanceof PDFDict ? object : null;
        if (!dict)
            continue;
        for (const key of OBJECT_KEYS)
            dict.delete(PDFName.of(key));
    }
    collectGarbage(doc);
    const pages = doc.getPageCount();
    if (pages === 0)
        throw new InvalidDocumentError('The PDF has no pages');
    const data = await doc.save({
        useObjectStreams: false,
        addDefaultPage: false,
        updateFieldAppearances: false,
    });
    return { data: Buffer.from(data), pages };
}
function collectGarbage(doc) {
    const { context } = doc;
    const reachable = new Set();
    const stack = context.trailerInfo.Root ? [context.trailerInfo.Root] : [];
    while (stack.length > 0) {
        const object = stack.pop();
        if (object instanceof PDFRef) {
            if (reachable.has(object.tag))
                continue;
            reachable.add(object.tag);
            const target = context.lookup(object);
            if (target)
                stack.push(target);
        }
        else if (object instanceof PDFStream) {
            stack.push(object.dict);
        }
        else if (object instanceof PDFDict) {
            for (const [, value] of object.entries())
                stack.push(value);
        }
        else if (object instanceof PDFArray) {
            stack.push(...object.asArray());
        }
    }
    for (const [ref] of context.enumerateIndirectObjects()) {
        if (!reachable.has(ref.tag))
            context.delete(ref);
    }
}
//# sourceMappingURL=document-processor.js.map