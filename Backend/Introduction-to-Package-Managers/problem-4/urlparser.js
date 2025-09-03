const url = require('url');

function parseUrl(fullUrl) {
    const parsedUrl = new URL(fullUrl);
    return {
        hostname: parsedUrl.hostname,
        pathname: parsedUrl.pathname,
        queryParameters: Object.fromEntries(parsedUrl.searchParams)
    };
}

module.exports = parseUrl;