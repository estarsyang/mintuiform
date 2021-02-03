### mintui form基本包
主要是老项目中用到 mintui，在实现表单的时候比较痛苦，就按照element ui写着一套。
这里是最基本的原来 mintui 的封装
总共封装了三个组件
- form 组件，执行校验和复位操作
- formItem 组件， 监听 input radio select textarea等元素的事件，比如 blur change等
- input 重新封装mintui field 组件，注入 blur 事件。坑爹的field竟然没有 blur 事件

```js
npm i mintuiform
//  main.js
import mintuiform from 'mintuiform'
Vue.use(mintuiform)
```