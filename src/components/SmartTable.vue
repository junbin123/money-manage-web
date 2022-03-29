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
const currColumns = ref(props.columns)
const activeName = ref('table')

// 需要处理的key值，通过render函数
const needFormateKeys = computed(() => {
  const res = props.tableList.filter((item) => {
    const render = currColumns.value[item]?.form?.render
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
      const render = currColumns.value[key].form.render
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
      :columns="currColumns"
      :formList="filterList"
      :isLoading="isLoading"
      @onSubmit="onFormSubmit"
    />
  </div>
  <slot name="middle"></slot>
  <el-tabs class="px-4" v-model="activeName">
    <el-tab-pane label="列表" class="flex justify-center" name="table">
      <div class="w-full max-w-3xl">
        <el-table :data="formateTableData(tableData)" border v-loading="isLoading">
          <el-table-column
            v-for="tableKey in tableList"
            :key="tableKey"
            :prop="tableKey"
            :label="currColumns[tableKey].label"
          />
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="图表" name="chart">
      <slot name="chart"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
