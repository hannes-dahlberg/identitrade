import Vuex from 'vuex'

//Importing state, actions and getters to use with store
import state from './state'
import actions from './actions'
import getters from './getters'

//Export new Vuex store
export default new Vuex.Store({
    state,
    actions,
    getters,
    modules: { }
})