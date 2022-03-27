import service from './service'

export const getCategoryList = async () => {
  const query = `*[_type == "category"]{
    id,
    name,
    type
  }`
  const res = await service.get(`?query=${encodeURIComponent(query)}`)
  return res.result
}
/**
 * 获取账单列表
 * @returns {Promise<*>}
 */
export const getBillList = async () => {
  const query = `*[_type == "bill"]{
    time,
    type,
    category,
    amount,
  }`
  const res = await service.get(`?query=${encodeURIComponent(query)}`)
  return res.result
}
