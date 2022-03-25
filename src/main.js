import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import 'element-plus/dist/index.css'
import './iconfont.css'
import { createRouter, createWebHistory } from 'vue-router'
import { ElImage } from 'element-plus'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use({ ElImage }, { size: 'small', zIndex: 3000 })
app.mount('#app')
