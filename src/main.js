import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
// 匯入 vee-validate 相關規則
import rules from '@vee-validate/rules'
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App.vue'
import router from './router'

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 調整為輸入字元立即進行驗證
})
setLocale('zh_TW')

const app = createApp(App)

app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('Loading', Loading)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')

// createApp(App).use(router).mount('#app').use(VueAxios, axios)
