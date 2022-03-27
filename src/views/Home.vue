<script setup>
import AssetsPanle from '../components/AssetsPanel.vue'
import SmartTable from '../components/SmartTable.vue'
import { getBillList } from '../api/index.js'
import { columns } from './common'
import { ref } from 'vue'
const filterValues = ref({
  time: '',
  type: 0,
})

const filterList = ref(['time', 'type'])
const tableList = ['category', 'type', 'amount', 'time']
const tableData = ref([])

getBillList().then((res) => {
  tableData.value = res
  console.log('--', res)
})
</script>

<template>
  <AssetsPanle />
  <SmartTable
    :columns="columns"
    :tableData="tableData"
    :tableList="tableList"
    :filterList="filterList"
    :filterValues="filterValues"
  />
</template>
<style scoped></style>
