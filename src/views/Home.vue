<script setup>
import AssetsPanel from '../components/AssetsPanel.vue'
import SmartTable from '../components/SmartTable.vue'
import SmartChart from '../components/SmartChart.vue'
import { columns } from './common'
import { ref, computed } from 'vue'
import { useBillList } from '../hooks/index.js'
import { getTotalValue } from '../utils/index.js'
const filterValues = ref({ time: '', type: '' })
const { billList, refreshListFunc, filterListFunc, isLoading, isInitLoading, assetsData } =
  useBillList()

const totalValue = computed(() => getTotalValue(billList.value))
</script>

<template>
  <AssetsPanel :assetsData="assetsData" :isLoading="isInitLoading" />
  <SmartTable
    :columns="columns"
    :tableData="billList"
    :tableList="['category', 'type', 'amount', 'time']"
    :filterList="['time', 'type']"
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
      <SmartChart />
    </template>
  </SmartTable>
</template>
<style scoped></style>
