import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import 'normalize.css/normalize.css'
import './style/index.scss'
import mgjUI from '@/components'
import '@/mock'
import 'lib-flexible/flexible.js'
import 'vant/lib/toast/style'

createApp(App).use(mgjUI).use(store).use(router).mount('#app')
