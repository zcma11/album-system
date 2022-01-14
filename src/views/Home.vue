<template>
  <div class="home">
    <button @click="go">click</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    go() {
      this.$router.push('/login')
    }
  }
}
</script>
