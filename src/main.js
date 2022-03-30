import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import 'element-plus/dist/index.css'
import './iconfont.css'
import { createRouter, createWebHashHistory } from 'vue-router'

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(router)
app.mount('#app')
