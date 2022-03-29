<template>
  <canvas id="myChart" width="400" height="400"></canvas>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted, ref } from 'vue'
onMounted(() => {
  var ctx = document.getElementById('myChart').getContext('2d')
  const data = {
    labels: ['2019/12/16', '2019/12/17', '2019/12/18', '2019/12/16'],
    datasets: [
      {
        label: '收入',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#38a169',
        backgroundColor: '#63BC8D',
        borderWidth: 1,
      },
      {
        label: '支出',
        data: [-12, -19, -3, 5, 2, 3],
        borderColor: '#E74040',
        backgroundColor: '#EA7878',
      },
    ],
  }
  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  }
  var myChart = new Chart(ctx, config)
})
</script>

<style></style>
