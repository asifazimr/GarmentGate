export function toOwnedImage(source, urls) {
    return {
        id: source.id,
        processing: source.file.processingStatus ?? 'PENDING',
        review: source.reviewStatus,
        reviewNote: source.reviewNote,
        urls: urls.get(source.fileId) ?? null,
        caption: source.caption,
        sortOrder: source.sortOrder,
    };
}
//# sourceMappingURL=owned-image.js.map