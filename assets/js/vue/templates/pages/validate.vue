<template>
    <div class="col-xs-12 col-md-4 col-md-offset-4 margin-top-10">
        <router-link :to="{ name: 'page.start' }">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            Back
        </router-link>
        <h1 class="text-center text-uppercase">Validate</h1>
        <form v-on:submit.prevent="validateOtp">
            <div class="form-group" :class="{ 'has-error': hasError }">
                <input class="form-control" type="text" v-model="email" placeholder="email" />
            </div>
            <div class="form-group" :class="{ 'has-error': hasError }">
                <input class="form-control text-uppercase text-center" style="letter-spacing: 10px;" type="text" v-model="otp" placeholder="code" />
            </div>
            <button class="btn btn-block btn-lg btn-primary text-uppercase" type="submit">Validate</button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: null,
                otp: null,
                hasError: false
            }
        },
        methods: {
            validateOtp() {
                this.$store.dispatch('validateOtp', {
                    email: this.email,
                    otp: this.otp
                }).then(() => {
                    alert('Valid!')
                }).catch(() => {
                    alert('Invalid!')
                    this.hasError = true
                })
            }
        }
    }
</script>