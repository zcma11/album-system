import axios from 'axios'
import store from '../store/index'
import router from '@/router'
import Vue from 'vue'

const myAxios = axios.create({})

myAxios.interceptors.request.use(config => {
  // 本地存的token
  const token = store.state.token

  if (token) {
    // 如果有就带过去
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
})

myAxios.interceptors.response.use(
  res => res.data,
  err => {
    // console.log(err)
    if (err.response.status === 401) {
      localStorage.removeItem('token')
      Vue.prototype.$message.error('账号异常')
      Vue.prototype.$alert('请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          router.push({
            name: 'Login'
          })
        }
      })
    }
    return {}
  }
)

export default myAxios
