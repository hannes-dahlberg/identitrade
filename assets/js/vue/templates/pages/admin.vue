<template>
    <div class="col-xs-12 col-md-4 col-md-offset-4 margin-top-10">
        <router-link :to="{ name: 'page.start' }">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            Back
        </router-link>
        <h1 class="text-center text-uppercase">Admin</h1>
        <form v-if="!isAuth" v-on:submit.prevent="auth">
            <div class="form-group" :class="{ 'has-error': hasError }">
                <input class="form-control" type="password" v-model="password" placeholder="password" />
            </div>
            <button class="btn btn-block btn-lg btn-primary text-uppercase" type="submit">Login</button>
        </form>
        <div v-else>
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th class="col-xs-1">#</th>
                        <th class="col-xs-11">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users">
                        <td>{{ index }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <p class="text-center">
                <a href="" v-on:click.prevent="logout">Logout</a>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                password: null,
                hasError: false,
            }
        },
        computed: {
            isAuth() {
                return this.$store.getters.isAuth
            },
            users() {
                return this.$store.getters.getUsers || []
            }
        },
        mounted() {
            this.getUsers()
        },
        methods: {
            //Authenticate user action
            auth() {
                //Dispatch store action
                this.$store.dispatch('auth', this.password).then(() => {
                    //If successfull get all users
                    this.getUsers()
                }).catch(() => {
                    //Authentication failed
                    alert('Login failed')
                    this.hasError = true
                })
            },
            //Logout
            logout() {
                this.$store.dispatch('removeToken')
            },
            //Get all users
            getUsers() {
                //Check if logged in first
                if(this.isAuth) {
                    this.$store.dispatch('getUsers')
                }
            }
        }
    }
</script>