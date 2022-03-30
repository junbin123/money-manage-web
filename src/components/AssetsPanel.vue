<script setup>
// 总收支数据面板组件

const assetsList = [
  {
    title: '总资产',
    name: 'assets',
    color: '#333',
  },
  {
    title: '总收入',
    name: 'income',
    color: '#38a169',
  },
  {
    title: '总支出',
    name: 'expend',
    color: '#f23d3d',
  },
]
const props = defineProps({
  assetsData: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="panel-box border-b px-4 pt-8">
    <div class="flex flex-wrap pt-3 pb-2" v-loading="isLoading">
      <div
        class="assets-card sm:w-40 h-20 text-base mx-1 mb-2 border rounded-md w-full p-2 min-w-[100px] bg-[#3894FF] text-white flex items-center justify-center cursor-pointer hover:bg-[#3894FF] hover:bg-[#60A5F5]"
        @click="$emit('onCreate')"
      >
        <div class="iconfont icon-add" style="font-size: 1.25rem; color: white"></div>
        添加账单
      </div>
      <div
        class="assets-card mx-1 mb-2 border rounded-md p-2 min-w-[100px] h-20 sm:w-40 w-full"
        v-for="item in assetsList"
        :key="item.name"
      >
        <div class="text-sm pb-2 text-[#666]">{{ item.title }}</div>
        <div class="text-xl" :style="{ color: item.color }">
          ￥{{ assetsData[item.name].value }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
