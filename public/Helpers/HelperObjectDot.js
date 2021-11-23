module.exports = function (obj, tgt = {}, path = [], useBrackets = false, keepArray = false, separator = ".") {

    let isArray = Array.isArray(obj);
    let is = window.$vm.is;

    Object.keys(obj).forEach(
        (key) => {

            let index = isArray && useBrackets ? '[' + key + ']' : key;

            if (
                is.array_or_object(obj[key]) &&
                ((is.object(obj[key]) && !is.empty_object(obj[key])) ||
                    (Array.isArray(obj[key]) && !keepArray && obj[key].length !== 0))
            ) {
                if (isArray && useBrackets) {

                    let previousKey = path[path.length - 1] || '';

                    return window.$vm.help.object_dot(
                        obj[key],
                        tgt,
                        path.slice(0, -1).concat(previousKey + index)
                    )
                } else {

                    return window.$vm.help.object_dot(obj[key], tgt, path.concat(index))
                }
            } else {

                if (isArray && useBrackets) {

                    tgt[path.join(separator).concat('[' + key + ']')] = obj[key]

                } else {

                    tgt[path.concat(index).join(separator)] = obj[key]
                }
            }
        }
    );

    return tgt
}
