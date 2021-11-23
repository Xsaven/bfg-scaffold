module.exports = function (pattern, text) {
    pattern = pattern
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\#-]', 'g'), '\\$&')
        .replace(/\\\*/g, '.*');

    return (new RegExp(pattern + '$', 'u')).test(text);
}
