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
