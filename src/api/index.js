import http from '@/utils/http'

export const login = data => {
  return http.post('api/login', data)
}
