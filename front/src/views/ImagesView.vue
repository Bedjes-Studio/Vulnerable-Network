<template>
  <img src="@/assets/1.jpg" @click="goto(1)">
  <img src="@/assets/2.jpg" @click="goto(2)"/>
  <img src="@/assets/3.jpg" @click="goto(3)"/>
  <img src="@/assets/4.jpg" @click="goto(4)"/>
</template>

<script>

export default {
  name: 'ImagesView',
  methods: {
    goto(n){
      this.$router.push(`/image/${n}`);
    }
  }
}
</script>

<style scoped>
img{
  width: 200px;
  margin: 50px;
}
</style>
