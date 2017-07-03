export default {
    //Read from local storage
    readLocalStorage: () => (key) => {
        return JSON.parse(localStorage.getItem(key))
    }
}