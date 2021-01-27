import mtForm from '@/components/form/form'
import mtFormItem from '@/components/form/form-item'
import mtInput from '@/components/input'
import { Field } from 'mint-ui';

const uiComponent = {
  'mt-form': mtForm,
  'mt-form-item': mtFormItem,
  'mt-input': mtInput,
  [Field.name]:Field
}


export default function install(Vue) {
  Object.keys(uiComponent).forEach(key => {
    Vue.component(key, uiComponent[key])
  })
}