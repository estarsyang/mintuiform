import Vue from 'vue'
import App from './App.vue'
import uiInstance from '@/components/index'
import '@/assets/style/index.scss'
import 'amfe-flexible';

Vue.config.productionTip = false
Vue.use(uiInstance)

new Vue({
  render: h => h(App),
}).$mount('#app')
