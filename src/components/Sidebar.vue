<template>
  <div class="flex flex-col justify-between h-full">
    <div class="px-5 border-b pb-2">
      <div class="flex logo-box items-center pt-2">
        <img src="../assets/logo.png" class="w-6 h-6 mr-1" />
        <div class="text-lg">记账工具</div>
      </div>
      <el-button size="large" :icon="Plus" class="w-full">添加账单</el-button>

      <div class="pt-4 cursor-pointer">
        <div
          v-for="item in menuList"
          :key="item.title"
          class="px-2 text-base flex items-center hover:bg-slate-200 h-10 rounded-md mb-2"
          :class="{ 'bg-[#D0E2FF]': item.name === currentMenu }"
          @click="handleMenu(item)"
        >
          <div :class="['iconfont', item.icon, 'menu-icon']"></div>
          <div class="pl-1">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <div class="cursor-pointer px-5 pb-4">
      <div
        v-for="item in settingList"
        :key="item.title"
        class="px-2 text-sm flex items-center hover:bg-slate-200 h-8 rounded-md mb-1"
        @click="ElMessage('coming soon...')"
      >
        <div :class="['iconfont', item.icon]"></div>
        <div class="pl-1">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const menuList = [
  {
    name: 'home',
    title: '账户总览',
    icon: 'icon-home',
    path: '/home',
  },
  {
    name: 'category',
    title: '账单分类',
    icon: 'icon-category',
    path: '/category',
  },
  {
    name: 'dashboard',
    title: '统计报表',
    icon: 'icon-dashboard',
    path: '/dashboard',
  },
  {
    name: 'assets',
    title: '我的资产',
    icon: 'icon-cash',
    path: '/assets',
  },
]
const currentMenu = ref('home')

const settingList = [
  {
    name: 'setting',
    title: '设置',
    icon: 'icon-setting',
  },
  {
    name: 'help',
    title: '帮助与反馈',
    icon: 'icon-help',
  },
  {
    name: 'logout',
    title: '退出登录',
    icon: 'icon-logout',
  },
]

function handleMenu(item) {
  currentMenu.value = item.name
  router.push(item.path)
}
</script>

<style scoped>
.logo-box {
  height: 80px;
}
.menu-icon {
  font-size: 1.2rem;
}
</style>
