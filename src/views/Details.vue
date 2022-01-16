<template>
  <div>
    <img :src="item.imgUrl" width="300" height="250" />
    <p>{{ item.name }}</p>
    <button @click="$router.back()">back</button>
  </div>
</template>

<script>
import { getPhotoById } from '@/api'
export default {
  props: ['id'],
  async created() {
    let img = { data: this.$store.getters.getPhotoByIdFn(this.id) }
    if (!img.data) {
      img = await getPhotoById(this.id)
    }
    this.item = img.data
  },
  data() {
    return {
      item: {}
    }
  }
}
</script>
