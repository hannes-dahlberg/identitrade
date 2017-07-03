export default {
    request(payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/otp', payload).then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    },
    validate(payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/otp/validate', payload).then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    }
}