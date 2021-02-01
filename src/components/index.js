import mtForm from '@/components/form/form'
import mtFormItem from '@/components/form/form-item'
import mtInput from '@/components/input'
import { Field, Radio, Checklist, Button } from 'mint-ui';

const uiComponent = {
  'mt-form': mtForm,
  'mt-form-item': mtFormItem,
  'mt-input': mtInput,
  [Field.name]: Field,
  [Radio.name]: Radio,
  [Checklist.name]: Checklist,
  [Button.name]: Button,
}


export default function install(Vue) {
  Object.keys(uiComponent).forEach(key => {
    Vue.component(key, uiComponent[key])
  })
}