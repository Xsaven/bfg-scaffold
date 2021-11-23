module.exports = function (sec) {
    return new Date((sec ? sec : 0) * 1000).toISOString().substr(11, 8);
}
