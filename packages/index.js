import mtChecklist from './src/components/checklist';
import mtForm from './src/components/form/';
import mtFormItem from './src/components/form/form-item';
import mtInput from './src/components/input';
import mtRadio from './src/components/radio';
const components = {
    'mt-form': mtForm,
    'mt-form-item': mtFormItem,
    'mt-input': mtInput,
    'mt-form-radio': mtRadio, mtInput,
    'mt-form-checklist': mtChecklist,
}

export default function install(Vue) {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}