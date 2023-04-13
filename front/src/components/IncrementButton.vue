<template>
  <div class="button">
    Le composant de test
    <button @click="increment">
      {{count}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  data(){
    return {
      count: 0,
    }
  },
  methods: {
    increment(){
      this.count++;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
