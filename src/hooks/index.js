import { onMounted, ref } from 'vue'
import { getBillList, getCategoryList } from '../api/index.js'
import { getTotalValue } from '../utils/index.js'

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

  const updateBillList = async ({ time, type } = {}) => {
    isLoading.value = true
    const res = await getBillList({ time, type })
    const newRes = res.map((item) => ({ ...item, categoryName: categoryDict.value[item.category] })) // 添加分类名字
    billList.value = newRes
    isLoading.value = false
    isInitLoading.value = false
    return newRes
  }

  onMounted(() => {
    getCategoryList()
      .then((res) => {
        categoryList.value = res.map((item) => ({ ...item, label: item.name, value: item.id }))
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
  }
}

// export const useCategoryList = () => {
//   const
// const result   = getCategoryList().then(res=>{

// })
// }
