module.exports = class LocalStore {

    set (key, value) {
        return localStorage.setItem(
            key, JSON.stringify({data: value})
        )
    }

    get (key, defaultData = null) {
        return this.has(key) ? JSON.parse(
            localStorage.getItem(key)
        ).data : defaultData;
    }

    has (key) {
        return !!localStorage.getItem(key);
    }

    delete (key) {
        localStorage.removeItem(key);
    }
}
