<script setup>
import dayjs from 'dayjs'
import Chart from 'chart.js/auto'
import { onMounted, watch } from 'vue'
import { defaultConfig } from '../assets/chartConfig.js'
const props = defineProps({ billList: Array })
let ctx = null
let myChart = null

onMounted(() => {
  ctx = document.getElementById('myChart').getContext('2d')
  myChart = new Chart(ctx, defaultConfig)
  console.log('onMounted:', '-------')
})

function getChartConfig(billList) {
  const timeList = billList.map((item) => dayjs(item.time).format('YYYY/MM/DD'))
  const labels = [...new Set(timeList)]
  const billDictByDay = {} // 保存每一天的收支金额
  timeList.forEach((item, index) => {
    if (!billDictByDay[item]) {
      billDictByDay[item] = { income: 0, expend: 0 }
    }
    const { amount, type } = billList[index]
    if (type === 0) {
      // 支出
      billDictByDay[item].expend += amount
    } else if (type === 1) {
      // 收入
      billDictByDay[item].income += amount
    }
  })

  let incomeData = []
  let expendData = []
  labels.forEach((item) => {
    const { income, expend } = billDictByDay[item]
    incomeData.push(income)
    expendData.push(-expend)
  })

  return {
    labels,
    incomeData,
    expendData,
  }
}

watch(
  () => props.billList,
  () => {
    console.log('watch:billList', myChart.data)
    const { labels, incomeData, expendData } = getChartConfig(props.billList)
    myChart.data.labels = labels
    myChart.data.datasets[0].data = incomeData
    myChart.data.datasets[1].data = expendData
    myChart.update('active')
  }
)
</script>

<style scoped>
#myChart {
  max-width: 800px;
  max-height: 800px;
}
</style>
<template>
  <div class="w-full flex justify-center">
    <canvas id="myChart" width="600" height="600"></canvas>
  </div>
</template>
