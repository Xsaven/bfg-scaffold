module.exports = function (path) {
    return String(path).replace(/\\/g, '/')
        .replace(/\/[^/]*\/?$/, '');
}
