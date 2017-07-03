<template>
    <div class="col-xs-12 col-md-4 col-md-offset-4">
        <h1 class="text-center text-uppercase">Request</h1>
        <form v-on:submit.prevent="requestOtp">
            <div class="form-group" :class="{ 'has-error': hasError }">
                <input class="form-control" type="text" v-model="email" placeholder="email" />
            </div>
            <button class="btn btn-block btn-lg btn-primary text-uppercase" type="submit">Request OTP</button>
        </form>
        <hr />
        <p class="text-center">
            <router-link :to="{ name: 'page.validate' }">Validate</router-link>
            |
            <router-link :to="{ name: 'page.admin' }">Admin</router-link>
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: null,
                hasError: false
            }
        },
        methods: {
            //Requesting OTP
            requestOtp() {
                //Dispatch store action
                this.$store.dispatch('requestOtp', this.email).then(() => {
                    //OTP was sent to user
                    alert('OTP code sent to email. Check email inbox!')
                }).catch(() => {
                    //OTP request failed
                    alert('OTP was not sent')
                    this.hasError = true
                })
            }
        }
    }
</script>