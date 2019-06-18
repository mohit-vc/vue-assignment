import Vue from 'vue';
import App from './App.vue';
import FlashMessage from '@smartweb/vue-flash-message';
import router from './router.js';
import axios from 'axios'

Vue.use(FlashMessage, { time: 4000 });
/**
 * Event Bus
 * @type {CombinedVueInstance<V extends Vue, Object, Object, Object, Record<never, any>>}
 */
window.events = new Vue();


axios.interceptors.request.use((config) => {
    const hasToken = !!localStorage.auth_token

    if (hasToken) {
        config.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + localStorage.auth_token
        }
    }
    return config
}, (error) => {
    return Promise.reject(error)
});
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * Change this to actual URL
 * @type {string}
 */
axios.defaults.baseURL = `http://10.0.0.174:8000/api`;


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
