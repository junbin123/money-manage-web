import Home from './views/Home.vue'
import Category from './views/Category.vue'
import Dashboard from './views/Dashboard.vue'
import Assets from './views/Assets.vue'

export const routes = [
  { path: '/home', component: Home, meta: { title: '账户总览' } },
  { path: '/category', component: Category, meta: { title: '账单分类' } },
  { path: '/dashboard', component: Dashboard, meta: { title: '统计报表' } },
  { path: '/assets', component: Assets, meta: { title: '我的资产' } },
  { path: '/:path(.*)', redirect: '/home' },
  { path: '/', redirect: '/home' },
]
