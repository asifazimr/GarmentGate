const SECRET_HEADERS = /^(cookie|authorization|x-forwarded-for|x-real-ip|stripe-signature)$/i;
export function scrubEvent(event) {
    const request = event.request;
    if (request) {
        delete request.cookies;
        delete request.data;
        delete request.query_string;
        if (request.headers)
            request.headers = Object.fromEntries(Object.entries(request.headers).filter(([k]) => !SECRET_HEADERS.test(k)));
        if (request.url)
            request.url = request.url.split('?')[0];
    }
    if (event.user)
        event.user = event.user.id ? { id: event.user.id } : {};
    return event;
}
//# sourceMappingURL=scrub.js.map