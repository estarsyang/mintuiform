
import mtForm from '@/components/form/form'
import mtFormItem from '@/components/form/form-item'
import mtRadio from '@/components/radio'
import mtCheckbox from '@/components/checklist'
import { Field, Radio, Checklist, Button } from 'mint-ui';

const uiComponent = {
  'mt-form': mtForm,
  'mt-form-item': mtFormItem,
  'mt-form-radio': mtRadio,
  'mt-form-checklist': mtCheckbox,
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