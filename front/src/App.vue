<template>
  <div class="main">
    <router-link v-if="$route.name!='admin'" to="/admin">Go to admin page</router-link>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
  
</style>
