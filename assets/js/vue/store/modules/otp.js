import otp from '../../../api/otp'

export default {
    actions: {
        //Request OTP
        requestOtp({ }, email) {
            return new Promise((resolve, reject) => {
                //Uses otp api to make request
                otp.request({ email }).then(() => resolve()).catch(error => reject())
            })
        },
        //Validate OTP
        validateOtp({ }, payload) {
            return new Promise((resolve, reject) => {
                /*Uses otp api to make request. Make sure payload has "email"
                and code*/
                otp.validate(payload).then(() => resolve()).catch(error => reject())
            })
        }
    }
}