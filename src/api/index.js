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
