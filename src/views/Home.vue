<script setup>
import AssetsPanel from '../components/AssetsPanel.vue'
import SmartTable from '../components/SmartTable.vue'
import { columns } from './common'
import { ref } from 'vue'
import { useBillList } from '../hooks/index.js'
const filterValues = ref({ time: '', type: '' })
const { billList, refreshListFunc, filterListFunc, isLoading } = useBillList()
</script>

<template>
  <AssetsPanel />
  <SmartTable
    :columns="columns"
    :tableData="billList"
    :tableList="['category', 'type', 'amount', 'time']"
    :filterList="['time', 'type']"
    :filterValues="filterValues"
    :isLoading="isLoading"
    @onFilterFunc="filterListFunc"
  />
</template>
<style scoped></style>
