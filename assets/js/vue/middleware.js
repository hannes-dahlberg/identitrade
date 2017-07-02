import store from './store/index'

export default {
    //Redirect to 404 page if route is not defined
    invalidRoute(to, from, next) {
        if(to.name) {
            next()
        } else {
            next({ name: 'error.404' })
        }
    }
}