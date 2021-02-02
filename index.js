import mtForm from './src/components/form/form'
import mtFormItem from './src/components/form/form-item'
import mtInput from './src/components/input/index'

const components = {
  'mt-form': mtForm,
  'mt-form-item': mtFormItem,
  'mt-input': mtInput,
}

export default function install (Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
