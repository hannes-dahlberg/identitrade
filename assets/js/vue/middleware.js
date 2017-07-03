import store from './store/index'

export default {
    //Redirect to 404 page if route is not defined
    invalidRoute(to, from, next) {
        if(to.name) {
            next()
        } else {
            next({ name: 'error.404' })
        }
    },
    //Check for auth in local storage
    checkAuth(to, from, next) {
        //If user is not logged in
        if(!store.getters.isAuth) {
            //Check local storage for auth data (containing token)
            var token = store.getters.readLocalStorage('token')
            if(token) { //If found set store to values
                store.dispatch('setToken', token)
            }
        }

        //Continue with request
        next()
    }
}