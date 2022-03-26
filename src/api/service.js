import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'https://moqw5oz2.api.sanity.io/v2022-03-27/data/query/production'
const service = axios.create({
  baseURL,
  timeout: 10000,
})

service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response.data
    } else {
      ElMessage.error(response.statusText)
      return Promise.reject('error')
    }
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
