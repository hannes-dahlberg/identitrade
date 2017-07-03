//Import libraries
import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'
import bootstrapSass from 'bootstrap-sass'

//Setting to window
window.Vue = Vue
window.axios = axios

window.axios.defaults.validateStatus = (status) => {
    return status <= 400
}