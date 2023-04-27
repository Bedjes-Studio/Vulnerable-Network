<template>
    <img v-if="$route.params.id==1" src="@/assets/1.jpg">
    <img v-else-if="$route.params.id==2" src="@/assets/2.jpg">
    <img v-else-if="$route.params.id==3" src="@/assets/3.jpg">
    <img v-else src="@/assets/4.jpg">
    <form method="post">
        <input v-model="cardNumber" type="text" name="cardNumber">
        <button @click.prevent="buy">
            Buy
        </button>
    </form>
    <h1 v-if="bought">
        Bought !
    </h1>
</template>

<script>
import { mapStores } from 'pinia';
import { useLoginStore } from '@/stores/loginStore';

export default{
    name: "ImageView",
    data(){
        return {
            cardNumber: "",
            bought: false
        }
    },
    computed: {
        ...mapStores(useLoginStore)
    },
    methods: {
        async buy(){
            await fetch("http://localhost:8080/api/user/updateCreditCard", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({jwt: this.loginStore.token, creditCard: this.cardNumber})
            });
            this.bought = true;
        }
    }
}
</script>

<style scoped>
img{
    width: 500px;
    margin: 50px;
}
</style>