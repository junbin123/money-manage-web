<script setup>
const tabList = [
  {
    title: '总资产',
    amount: 1178,
    name: 'assets',
    color: '#333',
  },
  {
    title: '总收入',
    amount: 1178,
    name: 'income',
    color: '#38a169',
  },
  {
    title: '总支出',
    amount: 117845,
    name: 'expend',
    color: '#f23d3d',
  },
]

const assetsList = [
  {
    title: '支付宝',
    id: '123',
    amount: 12,
  },
  {
    title: '微信',
    id: '123dfg',
    amount: 14,
  },
  {
    title: '支付宝',
    id: '123',
    amount: 12,
  },
]
</script>

<template>
  <div class="panel-box border-b px-4 pt-8">
    <el-tabs class="tabs-box" type="card">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.title"
        class="tab-pane-box"
      >
        <div class="text-2xl" :style="{ color: item.color }">￥{{ item.amount }}</div>
        <div class="flex flex-wrap pt-3 pb-2">
          <div class="assets-card mr-2 mb-2 border rounded-md w-40 p-2 min-w-[100px]" v-for="item in assetsList" :key="item.name">
            <div class="text-sm pb-2">{{ item.title }}</div>
            <div class="text-xl">￥{{ item.amount }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
.panel-box {
}
.tab-pane-box {
  /* border: 1px solid #e8e8e8; */
}
</style>
