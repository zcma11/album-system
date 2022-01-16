import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    photos: []
  },
  getters: {
    getPhotoByIdFn(state) {
      return id => state.photos.find(photo => photo.id == id)
    }
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    updatePhotos(state, photos) {
      state.photos = photos
    }
  },
  actions: {},
  modules: {}
})
