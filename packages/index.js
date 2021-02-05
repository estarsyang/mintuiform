import mtForm from './components/form/form'
import mtFormItem from './components/form/form-item'
import mtInput from './components/input/index'
import mtRadio from './components/radio/index'
import mtChecklist from './components/checklist/index'
import './assets/index.css'

const components = {
  'mt-form': mtForm,
  'mt-form-item': mtFormItem,
  'mt-input': mtInput,
  'mt-form-radio': mtRadio, mtInput,
  'mt-form-checklist': mtChecklist,
}
const install = (Vue) => {
  if (install.installed) return;
  install.installed = true
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

// 如果是直接引入的
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
