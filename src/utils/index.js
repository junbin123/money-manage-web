/**
 * 判断是否为函数
 * @param {any} value 任意值
 * @returns {Boolean} 是否为函数
 */
export function isFunction(value) {
  return value && {}.toString.call(value) === '[object Function]'
}
