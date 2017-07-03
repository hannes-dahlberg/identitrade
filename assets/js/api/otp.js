export default {
    //Request an OTP code that will be sent to email. Payload needs "email"
    request(payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/otp', payload).then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    },
    //Validate OTP code. Payload needs "email" and "code"
    validate(payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/otp/validate', payload).then(response => {
                resolve(response.data)
            }).catch(error => reject(error))
        })
    }
}