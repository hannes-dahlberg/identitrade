export default {
    //Authentication request. Make sure payload has "password"
    auth(payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/admin', payload).then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    },
    //Get users (token is required)
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get('/api/admin').then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    }
}