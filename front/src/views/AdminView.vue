<template>
    <form>
        <input type="text" v-model="path" placeholder="New config file path" name="path">
        <button>
            Submit config file
        </button>
    </form>
    <div class="data">
        {{data}}
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useLoginStore } from '@/stores/loginStore';
export default{
    name: "AdminView",
    data(){
        return {
            path: "",
            data: {}
        }
    },
    computed: {
        ...mapStores(useLoginStore)
    },
    methods: {
        async sendConfig(){
            let res = await fetch("http://localhost:8080/api/file/updateConfig", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({path: this.path, jwt: this.loginStore.token})
            });
            this.data = await res.json();
        }
    }
}
</script>

<style scoped>

</style>