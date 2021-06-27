<template>
  <div class="home">
    <div id="nav">
      <div class="container">
        <router-link to="/">首頁</router-link> |
        <router-link to="/Products">前台列表</router-link> |
        <router-link to="/Cart">前台購物車</router-link> |
        <router-link to="/Dashboard">登入後台</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  }
}
</script>
