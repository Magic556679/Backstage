<template>
  <div class="container">
    <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">
        請先登入
        </h1>
        <div class="col-4">
        <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username" v-model="user.username"
                placeholder="name@example.com" required autofocus>
            <label for="username">Email address</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" id="password" v-model="user.password"
                placeholder="Password" required>
            <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" @click="login" type="button" id="login">
            登入
            </button>
        </form>
        </div>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    login () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((response) => {
          if (response.data.success) {
            const { token, expired } = response.data
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`
            this.$router.push('/Dashboard')
            // this.$router.push('/views/test')
          } else {
            alert(response.data.message)
          }
        })
    }
  }
}
</script>
