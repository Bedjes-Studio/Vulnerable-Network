<template>
    Login :
    <form action="" method="post">
        <input v-model="pseudoLogin" placeholder="Enter your login" type="text" name="login">
        <input v-model="passwordLogin" placeholder="Enter your password" type="password" name="password">
        <button @click.prevent="sendLogin">
            Login
        </button>
    </form>
    Register :
    <form action="" method="post">
        <input v-model="emailRegister" placeholder="Enter your email" type="email" name="email">
        <input v-model="pseudoRegister" placeholder="Enter your login" type="text" name="login">
        <input v-model="passwordRegister" placeholder="Enter your password" type="password" name="password">
        <button @click.prevent="sendRegister">
            Register
        </button>
    </form>

    Get reset password token :
    <form action="" method="post">
        <input v-model="emailReset" placeholder="Enter your email" type="email" name="email">
        <button @click.prevent="getToken">
            Get token
        </button>
    </form>
    Reset password: 
    <form action="" method="post">
        <input v-model="loginReset" placeholder="Enter your username" type="text" name="email">
        <input v-model="passwordReset" placeholder="Enter your new password" type="password" name="password">
        <input v-model="tokenReset" placeholder="Enter your token" type="text" name="token">
        <button @click.prevent="resetPassword">
            Reset password
        </button>
    </form>
</template>

<script>
import { mapStores } from 'pinia';
import { useLoginStore } from '@/stores/loginStore';

export default {
    name: 'LoginView',
    data(){
        return{
            pseudoLogin: "",
            passwordLogin: "",
            pseudoRegister: "",
            passwordRegister: "",
            emailRegister: "",
            loginReset: "",
            passwordReset: "",
            tokenReset: "",
        }
    },
    computed: {
        ...mapStores(useLoginStore)
    },
    methods: {
        async sendLogin(){
            let res = await fetch("http://localhost:8080/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.pseudoLogin, password: this.passwordLogin})
            });
            let data = await res.json();
            if(data.token){
                this.loginStore.token = data.token;
                this.loginStore.pseudo = this.pseudoLogin;
                this.$router.push("/images");
            }
        },
        async sendRegister(){
            await fetch("http://localhost:8080/api/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.pseudoRegister, password: this.passwordRegister, email: this.emailRegister})
            });
            let res = await fetch("http://localhost:8080/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.pseudoRegister, password: this.passwordRegister})
            });
            let data = await res.json();
            if(data.token){
                this.loginStore.token = data.token;
                this.loginStore.pseudo = this.pseudoLogin;
                this.$router.push("/images");
            }
        },
        async getToken(){
            await fetch("http://localhost:8080/api/user/generateResetToken", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: this.emailReset})
            });
        },
        async resetPassword(){
            await fetch("http://localhost:8080/api/user/resetPassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.loginReset, password: this.passwordReset, token: this.tokenReset})
            });
        }
    }
}
</script>

<style scoped>

</style>