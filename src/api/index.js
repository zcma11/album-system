import http from '@/utils/http'

export const login = data => {
  return http.post('/api/login', data)
}

export const uploadPic = (img, cb) => {
  const data = new FormData()
  data.append('img', img)
  console.log(data.get('img'))
  return http.post('/api/upload', data, {
    onUploadProgress(e) {
      cb && cb((e.loaded / e.total).toFixed(2))
    }
  })
}

export const getPhotoById = id => {
  return http.get('/api/getphoto', {
    params: {
      id
    }
  })
}

export const getPhotos = () => {
  return http.get('/api/getphotos')
}
