export default {
    auth(payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/admin', payload).then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    },
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get('/api/admin').then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    }
}