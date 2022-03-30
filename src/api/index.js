import service from './service'
import dayjs from 'dayjs'

// 获取分类列表
export const getCategoryList = async () => {
  const query = `*[_type == "category"]{
    id,
    name,
    type
  }`
  const res = await service.get(`/query/production?query=${encodeURIComponent(query)}`)
  return res.result
}

// 获取账单列表
export const getBillList = async ({ time = '', type = '', category = '' } = {}) => {
  console.log({ category })
  const typeStr = type === '' ? '' : `&& type == ${type}`
  const categoryStr = category === '' ? '' : `&& category == '${category}'`
  let timeStr = ''
  if (time > 0) {
    const endTimestamp = dayjs(time).add(1, 'month').valueOf()
    timeStr = `&& time >= ${time} && time < ${endTimestamp}`
  }
  const query = `*[_type == "bill" ${typeStr} ${timeStr} ${categoryStr}] | order(time desc) {
    time,
    type,
    category,
    amount,
  }`
  const res = await service.get(`/query/production?query=${encodeURIComponent(query)}`)
  return res.result
}

// 添加账单记录
export const addBillRecord = (data) => {
  return service.post('/mutate/production', {
    mutations: [
      {
        create: {
          _type: 'bill',
          ...data,
        },
      },
    ],
  })
}
