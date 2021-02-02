import Vue from 'vue'
import App from './App.vue'
import uiInstance from '@/components/index'
import '@/assets/style/index.scss'
import 'amfe-flexible';
import mintForm from 'mintuiform'
console.log(mintForm);

Vue.config.productionTip = false
Vue.use(uiInstance)
Vue.use(mintForm)

new Vue({
  render: h => h(App),
}).$mount('#app')
