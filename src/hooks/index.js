import { onMounted, ref, getCurrentInstance, computed } from 'vue'
import { getBillList, getCategoryList, addBillRecord } from '../api/index.js'
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

  const categoryDict = ref({})
  const myColumns = ref(columns)

  /**
   * 更新账单列表
   * @param {number} param0.time 事件戳筛选项
   * @param {number} param0.type 收支类型筛选项
   * @param {string} param0.category 分类筛选项
   * @returns {Promise}
   */
  const updateBillList = async ({ time, type, category } = {}) => {
    isLoading.value = true
    const res = await getBillList({ time, type, category })
    const newRes = res.map((item) => ({
      ...item,
      categoryName: categoryDict.value[item.category].name,
    })) // 添加分类名字
    billList.value = newRes
    isLoading.value = false
    isInitLoading.value = false
    return newRes
  }

  onMounted(() => {
    getCategoryList()
      .then((res) => {
        const list = res.map((item) => ({ ...item, label: item.name, value: item.id }))
        myColumns.value.category.form.options = list
        categoryDict.value = res.reduce((acc, cur) => ({ ...acc, [cur.id]: { ...cur } }), {})
        return updateBillList()
      })
      .then((res) => {
        updateAssetsData(res)
      })
  })

  /**
   * 更新总收支数据面板
   * @param {Array} res 账单列表数据
   */
  function updateAssetsData(res) {
    const { income, expend } = getTotalValue(res)
    assetsData.value = {
      income: { value: income },
      expend: { value: expend },
      assets: { value: income - expend },
    }
  }

  /**
   * home 页面数据刷新方法
   */
  function refreshFunc() {
    isLoading.value = true
    isInitLoading.value = true
    updateBillList().then((res) => {
      updateAssetsData(res)
    })
  }
  return {
    billList,
    refreshFunc,
    filterListFunc: updateBillList,
    isLoading,
    assetsData,
    isInitLoading,
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

/**
 *
 */

export const useCreateBill = (categoryDict) => {
  const createLoading = ref(false)
  function addBillFunc(inputValues) {
    createLoading.value = true
    const { amount, category, createTime: time } = inputValues
    const data = {
      amount,
      category,
      time,
      type: categoryDict.value[category].type,
    }
    return addBillRecord(data).then((res) => {
      createLoading.value = false
      return Promise.resolve(res)
    })
  }
  return {
    createLoading,
    addBillFunc,
  }
}
