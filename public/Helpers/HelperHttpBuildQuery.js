module.exports = function (obj, num_prefix = null, temp_key = null) {

    let output_string = []

    if (obj !== null) {

        Object.keys(obj).forEach((val) => {

            let key = val;

            num_prefix && !isNaN(key) ? key = num_prefix + key : '';

            key = encodeURIComponent(key.replace(/[!'()*]/g, escape));

            temp_key ? key = temp_key + '[' + key + ']' : '';

            if (typeof obj[val] === 'object') {

                output_string.push(key + '=' + JSON.stringify(obj[val]))
            }

            else {

                let value = encodeURIComponent(String(obj[val]).replace(/[!'()*]/g, escape));

                output_string.push(key + '=' + value);
            }

        });
    }

    return output_string.join('&');
}
