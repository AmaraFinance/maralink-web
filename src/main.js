// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n.js'

import '../theme/index.css'
import './styles/color-variables.scss'
import './styles/zcm-main.css'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import $envConfig from '@/common/config.js';
Vue.prototype.$envConfig = $envConfig;
Vue.$envConfig = Vue.prototype.$envConfig;

import $tools from '@/common/tools.js';
Vue.prototype.$tools = $tools;
Vue.$tools = Vue.prototype.$tools;

import store from '@/store';
Vue.$store = store;
Vue.prototype.$store = store;

// let vuexStore = require('@/store/$u.mixin.js');
// Vue.mixin(vuexStore);

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   i18n,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
