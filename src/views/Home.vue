<script setup>
import AssetsPanel from '../components/AssetsPanel.vue'
import SmartTable from '../components/SmartTable.vue'
import BillChart from '../components/BillChart.vue'

import { columns } from './common'
import { ref, computed, toRefs } from 'vue'
import { useBillList } from '../hooks/index.js'
import { getTotalValue } from '../utils/index.js'
const filterValues = ref({ time: '', type: '' })
const {
  billList,
  refreshListFunc,
  filterListFunc,
  isLoading,
  isInitLoading,
  assetsData,
  categoryList,
  categoryDict,
} = useBillList()

const totalValue = computed(() => getTotalValue(billList.value))

// const newColumns = computed(() => {
//   const res = { ...columns }
//   const options = categoryList.value.map(({ label, value }) => ({ label, value }))
//   res.category.form.options = options
//   return res
// })
</script>

<template>
  <AssetsPanel :assetsData="assetsData" :isLoading="isInitLoading" />
  <SmartTable
    :columns="columns"
    :tableData="billList"
    :tableList="['categoryName', 'type', 'amount', 'time']"
    :filterList="['time', 'type', 'category']"
    :filterValues="filterValues"
    :isLoading="isLoading"
    @onFilterFunc="filterListFunc"
  >
    <template #middle>
      <div class="pl-4 text-base pb-2">
        <span class="text-[#999] text-sm">当前收支：</span>
        <span class="text-[#38a169]">收入: ￥{{ totalValue.income }}</span>
        <span class="text-[#e2e2e2] px-3">|</span>
        <span class="text-[#f23d3d]">支出: ￥{{ totalValue.expend }}</span>
      </div>
    </template>
    <template #chart>
      <div v-loading="isLoading">
        <BillChart :billList="billList" />
      </div>
    </template>
  </SmartTable>
</template>
<style scoped></style>
