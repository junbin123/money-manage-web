<script setup>
import AssetsPanel from '../components/AssetsPanel.vue'
import CreateDialog from '../components/CreateDialog.vue'
import SmartTable from '../components/SmartTable.vue'
import BillChart from '../components/BillChart.vue'

import dayjs from 'dayjs'
import { ref, computed } from 'vue'
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
  categoryDict,
  categoryList,
  columns,
} = useBillList()

const totalValue = computed(() => getTotalValue(billList.value))
const showPop = ref(true)
const createValues = ref({
  category: 'bsn20th0k2o',
  createTime: dayjs().valueOf(),
})
</script>

<template>
  {{ showPop ? 'show' : 'hide' }}
  <!-- {{ categoryList }} -->
  {{ createValues }}
  <AssetsPanel :assetsData="assetsData" :isLoading="isInitLoading" @onCreate="showPop = true" />
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
  <CreateDialog
    v-model:isShow="showPop"
    v-model:createValues="createValues"
    :columns="columns"
    :createList="['category', 'amount', 'createTime']"
  />
</template>
<style scoped></style>
