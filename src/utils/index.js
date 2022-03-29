import dayjs from 'dayjs'
/**
 * 判断是否为函数
 * @param {any} value 任意值
 * @returns {Boolean} 是否为函数
 */
export function isFunction(value) {
  return value && {}.toString.call(value) === '[object Function]'
}

/**
 * 获取账单的总收支
 * @param {Array} billList 账单列表
 * @returns {Object} 总收支数据
 */
export function getTotalValue(billList = []) {
  let income = 0
  let expend = 0
  billList.forEach((item) => {
    if (item.type === 0) {
      expend += item.amount
    }
    if (item.type === 1) {
      income += item.amount
    }
  })
  return { income, expend }
}

/**
 *
 */
export function getChartConfigForTime(billList) {
  const timeList = billList.map((item) => dayjs(item.time).format('YYYY/MM/DD'))
  const labels = [...new Set(timeList)]
  const billDictByDay = {} // 保存每一天的收支金额
  timeList.forEach((item, index) => {
    if (!billDictByDay[item]) {
      billDictByDay[item] = { income: 0, expend: 0 }
    }
    const { amount, type } = billList[index]
    if (type === 0) {
      // 支出
      billDictByDay[item].expend += amount
    } else if (type === 1) {
      // 收入
      billDictByDay[item].income += amount
    }
  })

  let incomeData = []
  let expendData = []
  labels.forEach((item) => {
    const { income, expend } = billDictByDay[item]
    incomeData.push(income)
    expendData.push(-expend)
  })

  return {
    labels,
    incomeData,
    expendData,
  }
}

/**
 * 快排
 * @param {Array} arr 列表
 * @param {String} sortKey 排列基准值
 * @param {Boolean} isAscending 是否为升序
 */
export function quickSort(arr = [], sortKey = '', isAscending = true) {
  if (arr.length <= 1) {
    return arr
  }
  const pivotIndex = Math.floor(arr.length / 2)
  const pivotKey = sortKey
    ? arr.slice(pivotIndex, pivotIndex + 1)[0][sortKey]
    : arr.slice(pivotIndex, pivotIndex + 1)[0]
  const pivot = arr.splice(pivotIndex, 1)[0]
  const left = []
  const right = []
  arr.forEach((item, index) => {
    const key = sortKey ? item[sortKey] : item
    if (isAscending) {
      if (key < pivotKey) {
        left.push(item)
      } else {
        right.push(item)
      }
    } else {
      if (key > pivotKey) {
        left.push(item)
      } else {
        right.push(item)
      }
    }
  })
  return [
    ...quickSort(left, sortKey, isAscending),
    pivot,
    ...quickSort(right, sortKey, isAscending),
  ]
}
