import { fileWithRenditions } from '../media/media.service.js';
export const messageInclude = {
    sender: { select: { id: true, role: true, firstName: true, lastName: true } },
    attachments: { include: { file: fileWithRenditions }, orderBy: { id: 'asc' } },
};
export function messageView(m, audience, links, relayedFrom) {
    const fromStaff = m.sender.role === 'ADMIN';
    const staffView = audience.kind === 'staff';
    const label = fromStaff
        ? staffView
            ? `${m.sender.firstName} ${m.sender.lastName} · GarmentGate`
            : 'GarmentGate'
        : staffView
            ? `${m.sender.firstName} ${m.sender.lastName} · ${audience.companyCode}`
            : m.sender.firstName;
    const attachments = m.attachments.map((a) => ({
        id: a.id,
        name: a.displayName,
        contentType: a.file.mimeType,
        sizeBytes: a.file.sizeBytes,
        processing: a.file.processingStatus ?? 'PENDING',
        url: links.get(a.id)?.url ?? null,
        thumbUrl: links.get(a.id)?.thumbUrl ?? null,
        flagged: a.flagged,
    }));
    const reasons = [
        ...new Set([...m.flagReasons, ...m.attachments.flatMap((a) => a.flagReasons)]),
    ];
    return {
        id: m.id,
        conversationId: m.conversationId,
        sender: {
            userId: m.sender.id,
            side: fromStaff ? 'GARMENTGATE' : 'COMPANY',
            label,
            isMe: m.senderId === audience.viewerId,
        },
        body: m.filteredContent,
        flagged: m.flagged,
        reasons: staffView ? reasons : [],
        original: staffView && m.flagged ? m.originalContent : null,
        relayedFrom: m.relayedFromId ? (relayedFrom.get(m.relayedFromId) ?? 'GarmentGate') : null,
        attachments,
        createdAt: m.createdAt.toISOString(),
    };
}
export function audienceFor(actor, companyCode) {
    return actor.isAdmin
        ? { kind: 'staff', viewerId: actor.userId, companyCode }
        : { kind: 'company', viewerId: actor.userId };
}
//# sourceMappingURL=chat-views.js.map