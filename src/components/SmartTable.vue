<script setup>
import SmartForm from './SmartForm/SmartForm.vue'
import { ref, computed } from 'vue'
import { isFunction } from '../utils/index.js'

const props = defineProps({
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
  isLoading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['onFilterFunc'])
const columns = props.columns

// 需要处理的key值，通过render函数
const needFormateKeys = computed(() => {
  const res = props.tableList.filter((item) => {
    const render = columns[item]?.form?.render
    return isFunction(render)
  })
  return res
})

/**
 * 格式化TableData数据
 */
function formateTableData(data) {
  const res = data.map((item) => {
    const itemTemp = needFormateKeys.value.reduce((res, key) => {
      const render = columns[key].form.render
      const formatedValue = render(item)
      return {
        ...res,
        [key]: formatedValue,
      }
    }, item)
    return itemTemp
  })
  return res
}

function onFormSubmit(val) {
  emit('onFilterFunc', val)
}
</script>

<style scoped></style>
<template>
  <div class="pt-6">
    <SmartForm
      :value="filterValues"
      :columns="columns"
      :formList="filterList"
      :isLoading="isLoading"
      @onSubmit="onFormSubmit"
    />
  </div>
  <slot name="middle"></slot>
  <div class="w-full px-4">
    <el-table :data="formateTableData(tableData)" border v-loading="isLoading">
      <el-table-column
        v-for="tableKey in tableList"
        :key="tableKey"
        :prop="tableKey"
        :label="columns[tableKey].label"
      />
    </el-table>
  </div>
</template>
