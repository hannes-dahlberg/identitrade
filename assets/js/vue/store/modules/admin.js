import admin from '../../../api/admin'

export default {
    state: {
        token: null,
        users: null
    },
    actions: {
        auth({ state, dispatch }, password) {
            return new Promise((resolve, reject) => {
                admin.auth({ password }).then(response => {
                    dispatch('setToken', response.token)
                    dispatch('storeToken')
                    resolve()
                }).catch(error => reject())
            })
        },
        setToken({ state, getters }, token) {
            state.token = token

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters.getToken
        },
        storeToken({ state, dispatch }) {
            //Store auth values in local storage
            dispatch('writeLocalStorage', { token: state.token })
        },
        removeToken({ state, dispatch }) {
            dispatch('removeLocalStorage', 'token')
            state.token = null
        },
        getUsers({ state }) {
            return new Promise((resolve, reject) => {
                admin.getUsers().then(response => {
                    state.users = response.users
                }).catch(error => reject())
            })
        }
    },
    getters: {
        isAuth: state => {
            return state.token ? true : false
        },
        getToken: state => {
            return state.token
        },
        getUsers: state => {
            return state.users
        }
    }
}