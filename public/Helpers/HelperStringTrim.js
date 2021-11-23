module.exports = function (str, charList = "\t\n\r") {
    charList = !charList ? ' s\xA0' : charList.replace(/([[\]().?/*{}+$^:])/g, '$1');
    let re = new RegExp('^[' + charList + ']+|[' + charList + ']+$', 'g');
    return str.replace(re, '');
}
