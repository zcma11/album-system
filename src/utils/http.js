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
    config.headers.authorization = token
  }

  return config
})

myAxios.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err)
    if (err.response.status === 401) {
      Vue.prototype.$alert('请重新登录', 'login', {
        confirmButtonText: '确定',
        callback: () => {
          router.push({
            name: 'Login'
          })
        }
      })
      router.push({
        name: 'Login'
      })
    }
  }
)

export default myAxios
