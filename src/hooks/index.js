import { onMounted, ref, getCurrentInstance, computed } from 'vue'
import { getBillList, getCategoryList } from '../api/index.js'
import { getTotalValue } from '../utils/index.js'
import { columns } from '../assets/columns.js'

/**
 * 账单列表hooks
 */
export const useBillList = () => {
  const billList = ref([])
  const isLoading = ref(true)
  const isInitLoading = ref(true)
  const assetsData = ref({
    // 总资产数据
    income: { value: 0 },
    expend: { value: 0 },
    assets: { value: 0 },
  })
  const categoryList = ref([])
  const categoryDict = ref([])
  const myColumns = ref(columns)

  const updateBillList = async ({ time, type, category } = {}) => {
    isLoading.value = true
    const res = await getBillList({ time, type, category })
    const newRes = res.map((item) => ({ ...item, categoryName: categoryDict.value[item.category] })) // 添加分类名字
    billList.value = newRes
    isLoading.value = false
    isInitLoading.value = false
    return newRes
  }

  onMounted(() => {
    getCategoryList()
      .then((res) => {
        const list = res.map((item) => ({ ...item, label: item.name, value: item.id }))
        // TODO:categoryList可去掉
        categoryList.value = list
        myColumns.value.category.form.options = list
        categoryDict.value = res.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {})
        return updateBillList()
      })
      .then((res) => {
        const { income, expend } = getTotalValue(res)
        assetsData.value = {
          income: { value: income },
          expend: { value: expend },
          assets: { value: income - expend },
        }
      })
  })
  return {
    billList,
    refreshListFunc: updateBillList,
    filterListFunc: updateBillList,
    isLoading,
    assetsData,
    isInitLoading,
    categoryList,
    categoryDict,
    columns: myColumns,
  }
}

/**
 * 把prop包装成可写的计算属性
 * @param {*} name 
 * @param {*} cb 
 * @returns 
 */
export const useProp = (name = 'modelValue', cb) => {
  const vm = getCurrentInstance()
  const { emit, proxy = { $props: {} } } = vm
  return computed({
    get: () => {
      const prop = proxy.$props[name]
      return prop
    },
    set: (newVal) => {
      emit(`update:${name}`, newVal)
      cb && cb(newVal)
    },
  })
}
