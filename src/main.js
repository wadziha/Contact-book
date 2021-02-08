import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import vuetify from './plugins/vuetify'
import eventBus from './utils/eventBus'
import JsonCSV from 'vue-json-csv'

import VuePapaParse from 'vue-papa-parse'
Vue.use(VuePapaParse)

import './scss/style.scss'
Vue.component('downloadCsv', JsonCSV)
Vue.config.productionTip = false
Vue.prototype.$eventBus = eventBus

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app')
