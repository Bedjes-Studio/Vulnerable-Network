<template>
  <div class="main">
    <router-link to="/" class="link">Lien vers /</router-link>
    <router-link to="/ailleurs" class="link">Lien vers /ailleurs</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
  .link{
    margin: 50px;
  }
</style>
