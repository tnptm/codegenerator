<script setup>
import { ref, onMounted, onBeforeMount} from 'vue'
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()

const props = defineProps(['LoginState'])

const usernm = ref("")
const passwd = ref("")

const msg = ref("")
const apiUrl = ref("")

onMounted(()=>{
  if (import.meta.env.DEV){
    apiUrl.value = import.meta.env.VITE_API_PATH_DEV
  } else {
    apiUrl.value = import.meta.env.VITE_API_PATH
  }
})

async function handleLogin(){
    // 
    try {
        const response = await fetch(`${apiUrl.value}/auth.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernm.value,
            password: passwd.value,
          }),
        });

        const data = await response.json();
        if (data.success) {
            authStore.login(usernm.value)
            msg.value = "Login successful!";
          // Redirect or perform further actions
        } else {
          msg.value = data.message;
        }
    } catch (error) {
        msg.value = "An error occurred. Please try again. (" + error + ")";
        console.error(error);
    }
    
}



function OldhandleLogin(){
    if (userData.value.find((u) => { return u.un === usernm.value && u.pw === passwd.value })){
        authStore.login()
        //emit('onLogin',true)
        msg.value = "Logged in"
    } else {
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