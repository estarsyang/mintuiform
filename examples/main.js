import Vue from 'vue'
import App from './App.vue'
import libs from "../packages"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(libs)
new Vue({
  render: h => h(App),
}).$mount('#app')
