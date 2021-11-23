module.exports = {
    array_or_object (val) {
        return Object(val) === val
    },
    object (val) {
        return Object.prototype.toString.call(val) === '[object Object]'
    },
    empty_object(val) {
        return Object.keys(val).length === 0
    },
    number (num) {
        return !isNaN(Number(num))
    },
    required(value) {
        return !!String(value).trim();
    },
    email(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    string(string) {
        return !this.number(string) && String(string) === string;
    },
    bool(bool) {
        return bool === true || bool === false;
    },
    length_min(val, min = 1) {
        if (this.bool(val) || val === null) {
            return false;
        }
        return String(val).length >= Number(min);
    }
};
