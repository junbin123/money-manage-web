<template>
  <div class="pb-4 pt-6">
    <SmartForm
      :value="filterValues"
      :columns="columns"
      :formList="filterList"
      @onSubmit="onFormSubmit"
    />
  </div>
  <div class="w-full px-4">
    <el-table :data="tableData" border>
      <el-table-column
        v-for="tableKey in tableList"
        :key="tableKey"
        :prop="tableKey"
        :label="columns[tableKey].label"
      />
    </el-table>
  </div>
</template>

<script setup>
import SmartForm from './SmartForm/SmartForm.vue'
import { ref } from 'vue'

defineProps({
  columns: {
    type: Object,
    default: () => ({}),
  },
  filterValues: {
    type: Object,
    default: () => ({}),
  },
  filterList: {
    type: Array,
    default: () => [],
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  tableList: {
    type: Array,
    default: () => [],
  },
})

function onFormSubmit(val) {
  console.log('onFormSubmit', val)
}
</script>

<style scoped></style>
