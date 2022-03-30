<script setup>
// 封装chart.js的账单图表业务组件

import Chart from 'chart.js/auto'
import { onMounted, watch } from 'vue'
import { defaultConfig1, defaultConfig2 } from '../assets/chartConfig.js'
import { getChartConfigForTime, quickSort } from '../utils/index.js'

const props = defineProps({ billList: Array })
let billChartTime = null
let billChartCategory = null

onMounted(() => {
  const ctx1 = document.getElementById('billChartTime').getContext('2d')
  const ctx2 = document.getElementById('billChartCategory').getContext('2d')
  billChartTime = new Chart(ctx1, defaultConfig1)
  billChartCategory = new Chart(ctx2, defaultConfig2)
})

/**
 * 获取chart配置数据，绘制支出金额在不同分类的柱状图，按金额大小排序
 * @param {Array} billList 账单列表
 */
function getChartConfigForExpend(billList) {
  const list = billList.filter((item) => item.type === 0)
  const categoryDict = list.reduce((res, item) => {
    const key = item.categoryName
    res[key] = res[key] ? res[key] + item.amount : item.amount
    return res
  }, {})
  const res = Object.keys(categoryDict).map((key) => {
    return {
      name: key,
      value: categoryDict[key],
    }
  })
  const sortList = quickSort(res, 'value', false)
  return {
    labels: sortList.map((item) => item.name),
    data: sortList.map((item) => item.value),
  }
}

watch(
  () => props.billList,
  () => {
    updateTimeChart()
    updateExpendChart()
  }
)

// 更新每日收支图表
function updateTimeChart() {
  const { labels, incomeData, expendData } = getChartConfigForTime(props.billList)
  billChartTime.data.labels = labels
  billChartTime.data.datasets[0].data = incomeData
  billChartTime.data.datasets[1].data = expendData
  billChartTime.update('active')
}

// 更新支出金额图表
function updateExpendChart() {
  const { labels, data } = getChartConfigForExpend(props.billList)
  billChartCategory.data.labels = labels
  billChartCategory.data.datasets[0].data = data
  billChartCategory.update('active')
}
</script>

<style scoped>
.canvas-box {
  max-width: 800px;
  max-height: 600px;
}
</style>
<template>
  <div class="w-full flex flex-col items-center">
    <canvas id="billChartCategory" width="600" height="400" class="canvas-box"></canvas>
    <div class="py-8"></div>
    <canvas id="billChartTime" width="600" height="600" class="canvas-box"></canvas>
  </div>
</template>
