module.exports = function (str, first = false) {
    return str.replace(/[-_]/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return first ? word.toUpperCase() : (index === 0 ? word.toLowerCase() : word.toUpperCase());
    }).replace(/\s+/g, '');
}
