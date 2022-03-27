<script setup>
import AssetsPanle from '../components/AssetsPanel.vue'
import SmartTable from '../components/SmartTable.vue'
import { ref } from 'vue'
const filterValues = ref({
  time: '',
  type: 0,
})
const columns = {
  time: {
    label: '选择月份',
    formType: 'date-picker',
    key: 'time',
    form: {
      type: 'month',
      placeholder: '请选择月份',
    },
  },
  type: {
    label: '账单类型',
    formType: 'select',
    key: 'type',
    form: {
      clearable: true,
      placeholder: '请选择账单类型',
      options: [
        {
          label: '支出',
          value: 0,
        },
        {
          label: '收入',
          value: 1,
        },
      ],
    },
  },
}

const filterList = ref(['time', 'type'])
const tableList = ['time', 'type']
const tableData = [
  {
    time: 12412423,
    type: 0,
  },
  {
    time: 12412423,
    type: 0,
  },
  {
    time: 12412423,
    type: 0,
  },
]
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
