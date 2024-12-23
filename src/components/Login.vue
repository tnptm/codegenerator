<script setup>
//import { VueElement } from 'vue';
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()

const props = defineProps(['LoginState'])

//const isLoggedIn = computed(()=> authStore.isLoggedIn)

const msg = ref("")

//const emit = defineEmits(['onLogin'])

const userData = ref([
    {
        un: "test",
        pw: "1234"
    }
])

const usernm = ref("")
const passwd = ref("")


function handleLogin(){
    if (userData.value.find((u) => { return u.un === usernm.value && u.pw === passwd.value })){
        authStore.login()
        //isLoggedIn.value = true
        //emit('onLogin',true)
        msg.value = "Logged in"
    } else {

        authStore.login()
        //emit('onLogin',false)
        msg.value = "Try again"
    }
}

</script>
<template>
<div id="login-form" class="m-auto w-52 p-4">
    <!--<div v-if="isLoggedIn">
        <button @click="isLoggedIn = !isLoggedIn">Log out</button>
    </div>-->
    <form @submit.prevent="handleLogin" >
        <label for="username">Username
            <input id="username" type="text" class="p-1 rounded border mb-3 focus:shadow-md" placeholder="Username" v-model="usernm"/> 
        </label>
        <label for="password">Password
            <input id="password" type="password" class="p-1 rounded border mb-3 focus:shadow-md"  placeholder="Password" v-model="passwd"/> 
        </label>
        <button type="submit" class="bg-slate-300 p-2 rounded-lg transition hover:bg-slate-400 hover:shadow-sm active:bg-slate-500 active:shadow-lg active:text-white">OK</button>
    </form>
    <div>{{ msg }}</div>
</div>

</template>
<style>

</style>