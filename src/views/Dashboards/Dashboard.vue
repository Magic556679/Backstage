<template>
    <div class="container">
      <router-link to="/">返回首頁</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
      <div>後台</div>
    </div>
    <router-view></router-view>
</template>
<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      checkSuccess: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http.post(api)
          .then((response) => {
            if (response.data.success) {
              this.checkSuccess = true
            } else {
              alert(response.data.message)
              this.$router.push('/login')
            }
          })
      }
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      this.$router.push('/login')
    }
  }
}
</script>
