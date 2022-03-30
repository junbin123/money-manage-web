import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'https://moqw5oz2.api.sanity.io/v2022-03-27/data'
const testToken =
  'skU0iupjscChlBysNeEGOL0nK7IhN0JFZxPk4rq4F5neOhQPRMYdjpH8cEpiCWGgKmhVVSkOyMULmivLAHjl7gtwhaT2MgvswmUjFEY2qoSWHwUClYtNo9zMOSMNmcp6zqC4vLfb1dJxqyjW1kd9HqbMcRMzwbpP9AyO3yC4gWIdXbDXUmCo'
const service = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${testToken}`,
  },
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
