export default {
    /*Write to local storage. Payload should be an object with a single property
    which will be used as the local storage key*/
    writeLocalStorage({}, payload) {
        localStorage.setItem(Object.keys(payload)[0], JSON.stringify(payload[Object.keys(payload)[0]]))
    },
    //Remove item from local storage using key
    removeLocalStorage({}, key) {
        localStorage.removeItem(key)
    }
}