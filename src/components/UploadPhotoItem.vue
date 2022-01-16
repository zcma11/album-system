<template>
  <div class="uploadPhotoItem">
    <span class="myProgress">
      <span class="plan" :style="{ transform: `scale(${precent}, 1)` }"></span>
      {{ precent * 100 }}%
    </span>
    <img :src="imgUrl" />
    <span class="pictureName">{{ item.name }} </span>
  </div>
</template>

<script>
export default {
  props: ['item'],
  created() {
    const reader = new FileReader()
    reader.readAsDataURL(this.item)
    reader.onload = () => {
      this.imgUrl = reader.result
    }
  },
  data() {
    return {
      imgUrl: '',
      precent: 0
    }
  },
  methods: {
    updatePrecent(value) {
      this.precent = value
    }
  }
}
</script>

<style scoped>
.uploadPhotoItem {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  float: left;
  margin-bottom: 30px;
  position: relative;
}

.uploadPhotoItem img {
  width: 164px;
  height: 123px;
  opacity: 1;
  background: rgb(222, 222, 222);
}

.pictureName {
  background: white;
  border: 1px solid rgb(225, 225, 225);
  text-align: center;
}

.myProgress {
  top: 50px;
  height: 24px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  position: absolute;
  width: 164px;
  color: white;
}

.plan {
  position: absolute;
  width: 164px;
  left: 0px;
  transform-origin: left;
  background: rgba(0, 255, 0, 0.5);
  height: 24px;
}
</style>
