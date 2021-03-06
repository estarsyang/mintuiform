import Vue from 'vue'
import App from './App.vue'
import libs from "../packages"
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(Mint);
Vue.use(libs)

new Vue({
  render: h => h(App),
}).$mount('#app')
