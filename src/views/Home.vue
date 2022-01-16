<template>
  <div class="container">
    <div class="photoHeader">
      <div class="imgContainer">
        <img class="photoName" src="@/assets/img/1.jpg" />
      </div>
      <div class="btnContainer">
        <span class="photoTitle">相册名称</span>
        <button class="mybtn" @click="showUploadPopup = true">上传照片</button>
      </div>
    </div>

    <div class="photoContainer">
      <div
        class="photoItem"
        v-for="item in photos"
        :key="item.id"
        @click="$router.push(`details/${item.id}`)"
      >
        <img :src="item.imgUrl" />
        <span class="ellipse">
          {{ item.name }}
        </span>
      </div>
    </div>
    <UploadPopup :visible.sync="showUploadPopup" @afterUploadPhoto="getp" />
  </div>
</template>

<script>
import UploadPopup from '@/components/UploadPopup.vue'
import { getPhotos } from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    UploadPopup
  },
  async created() {
    this.getp()
  },
  data() {
    return {
      showUploadPopup: false
    }
  },
  computed: {
    ...mapState(['photos'])
  },
  methods: {
    go() {
      this.$router.push('/login')
    },
    async getp() {
      const { data } = await getPhotos()
      this.$store.commit('updatePhotos', data)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  /* background: rgb(224, 240, 244); */
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
}

.photoHeader {
  width: 100%;
  display: flex;
}

.photoName {
  width: 70px;
  height: 70px;
  margin: 0px;
}

.btnContainer {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  font-size: 22px;
}

.imgContainer {
  width: 70px;
  height: 70px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
  background-color: #fff;
  padding: 3px;
  top: 0;
  left: 0;
}

.photoTitle {
  margin-bottom: 10px;
}

.mybtn {
  width: 168px;
  height: 35px;
  background: #5ccfe6;
  border: 1px solid #5ccfe6;
  color: white;
  font-size: 16px;
}

.photoContainer {
  margin-top: 50px;
}

.photoItem {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  float: left;
  margin-bottom: 30px;
}

.photoItem img {
  width: 164px;
  height: 123px;
  opacity: 1;
  background: rgb(222, 222, 222);
}

.photoItem span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  width: 164px;
  height: 32px;
  background: rgb(244, 253, 255);
  line-height: 32px;
  float: left;
}

.mybtn {
  cursor: pointer;
}
</style>
