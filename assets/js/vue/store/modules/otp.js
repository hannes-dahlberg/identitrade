import otp from '../../../api/otp'

export default {
    state: {

    },
    actions: {
        requestOtp({ }, email) {
            return new Promise((resolve, reject) => {
                otp.request({ email }).then(() => resolve()).catch(error => reject())
            })
        },
        validateOtp({ }, payload) {
            return new Promise((resolve, reject) => {
                otp.validate(payload).then(() => resolve()).catch(error => reject())
            })
        }
    },
    getters: {

    }
}