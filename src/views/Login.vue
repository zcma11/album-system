<template>
  <div class="loginContainer">
    <h1>登录</h1>
    <div>
      姓名：
      <input
        class="inputStyle"
        id="username"
        type="text"
        name="username"
        v-model="username"
      /><br />密码：
      <input
        class="inputStyle"
        id="password"
        type="password"
        name="pwd"
        v-model="password"
      /><br />
      <button @click="signIn" class="loginStyle" id="loginBtn">登录</button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      login({ username: this.username, password: this.password })
        .then(res => {
          console.log(res)
          if (res.status === 0) {
            return this.$message.error('登录失败')
          }
          this.$store.commit('setToken', res.data.token)
          this.$message.success('登录成功')
          this.$router.push({
            name: 'Home'
          })
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
.loginContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.loginContainer input {
  margin-bottom: 20px;
}
.loginStyle {
  width: 160px;
  height: 40px;
  background: rgb(50, 203, 77);
  color: white;
  font-size: 17px;
}
.inputStyle {
  width: 200px;
  height: 30px;
  padding: 5px;
  outline: none;
}

.inputStyle:focus {
  border: 1px solid rgb(50, 203, 77);
}
form {
  position: relative;
}
.exchange {
  position: absolute;
  top: 8px;
  right: 65px;
  color: red;
}
</style>
