//Import libraries
import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'
import bootstrapSass from 'bootstrap-sass'
import Nodehelpers from 'nodehelpers'

//Setting to window
window.Vue = Vue
window.axios = axios
window.nodehelpers = Nodehelpers

//Setting default headers for axios
window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': $('meta[name=\'csrf-token\']').attr('content'),
    'X-Requested-With': 'XMLHttpRequest'
};

window.axios.defaults.validateStatus = (status) => {
    return status <= 400
}