### mintui form基本包
主要是老项目中用到 mintui，在实现表单的时候比较痛苦，就按照element ui写着一套。
总共封装了以下组件
- form 组件，执行校验和复位操作
- formItem 组件， 监听 input radio select textarea等元素的事件，比如 blur change等
- 重新封装了 field radio checklist 等组件。和 mintui 之前的用法保持一致

```js
npm i mintuiform
//  main.js
import mintuiform from 'mintuiform'
Vue.use(mintuiform)
```
```html
<!-- input -->
<mt-input></mt-input>
<!-- radio -->
<mt-form-radio></mt-form-radio>
<!-- checklist -->
<mt-form-checklist></mt-form-checklist>
```