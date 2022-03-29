import { onMounted, ref } from 'vue'
import { getBillList } from '../api/index.js'

/**
 * 账单列表hooks
 */
export const useBillList = () => {
  const billList = ref([])
  const isLoading = ref(true)

  const updateBillList = ({ time, type, isMounted = false } = {}) => {
    isLoading.value = isMounted ? false : true
    getBillList({ time, type }).then((res) => {
      billList.value = res
      isLoading.value = false
    })
  }

  onMounted(() => {
    updateBillList({ isMounted: true })
  })
  return {
    billList,
    refreshListFunc: updateBillList,
    filterListFunc: updateBillList,
    isLoading,
  }
}
