import Vuex from 'vuex'

//Importing state, actions and getters to use with store
import state from './state'
import actions from './actions'
import getters from './getters'

//Importing modules
import admin from './modules/admin'
import otp from './modules/otp'

//Export new Vuex store
export default new Vuex.Store({
    state,
    actions,
    getters,
    modules: { admin, otp }
})