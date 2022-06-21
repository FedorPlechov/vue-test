// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import { VueMaskDirective } from 'v-mask'
import ListOfUsers from './components/ListOfUsers'

Vue.config.productionTip = false

Vue.component('list-of-users', ListOfUsers)
Vue.directive('mask', VueMaskDirective);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  vuetify,
  template: '<App/>'
})
