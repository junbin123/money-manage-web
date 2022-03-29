import { onMounted, ref } from 'vue'
import { getBillList } from '../api/index.js'

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

  const updateBillList = async ({ time, type } = {}) => {
    isLoading.value = true
    const res = await getBillList({ time, type })
    billList.value = res
    isLoading.value = false
    isInitLoading.value = false
    return res
  }

  onMounted(() => {
    updateBillList().then((res) => {
      let income = 0
      let expend = 0
      res.forEach((item) => {
        if (item.type === 0) {
          expend += item.amount
        }
        if (item.type === 1) {
          income += item.amount
        }
      })
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
  }
}
