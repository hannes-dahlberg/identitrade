import admin from '../../../api/admin'

export default {
    state: {
        token: null,
        users: null
    },
    actions: {
        //Authentication
        auth({ state, dispatch }, password) {
            return new Promise((resolve, reject) => {
                //Uses api auth method
                admin.auth({ password }).then(response => {
                    //Set token and store it to local storage
                    dispatch('setToken', response.token)
                    dispatch('storeToken')
                    resolve()
                }).catch(error => reject())
            })
        },
        //Setting token to state and adding it to axios default header
        setToken({ state, getters }, token) {
            state.token = token

            //The token will no be part of every axios request
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters.getToken
        },
        //Store token to local storage
        storeToken({ state, dispatch }) {
            //Store auth values in local storage
            dispatch('writeLocalStorage', { token: state.token })
        },
        //Removing token from local storage
        removeToken({ state, dispatch }) {
            dispatch('removeLocalStorage', 'token')
            state.token = null

            //Remove token from axios header
            axios.defaults.headers.common['Authorization'] = null
        },
        //Get all users (requires authorization header)
        getUsers({ state }) {
            return new Promise((resolve, reject) => {
                admin.getUsers().then(response => {
                    //Set response users to state
                    state.users = response.users
                }).catch(error => reject())
            })
        }
    },
    getters: {
        //Check if logged in
        isAuth: state => {
            return state.token ? true : false
        },
        //Get the set token
        getToken: state => {
            return state.token
        },
        //Get users
        getUsers: state => {
            return state.users
        }
    }
}