module.exports = function (num, decimals = 0, dec_point = '.', thousands_sep = ',') {
    let i, j, kw, kd, km;
    if( isNaN(decimals = Math.abs(decimals)) ){ decimals = 2; }
    if( dec_point === undefined ){ dec_point = ","; }
    if( thousands_sep === undefined ){ thousands_sep = "."; }
    i = parseInt(num = (+num || 0).toFixed(decimals)) + "";
    if( (j = i.length) > 3 ){ j = j % 3; } else{ j = 0; }
    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = (decimals ? dec_point + Math.abs(num - parseInt(i)).toFixed(decimals).replace(/-/, '0').slice(2) : "");
    return km + kw + kd;
}
