<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import Generator from './components/Generator.vue';
import { useAuthStore } from './stores/auth';
import { ref, computed } from 'vue'

//const currentPage = ref('Login')

const authStore = useAuthStore();

const isLoggedIn = computed(()=> authStore.isLoggedIn)
/*
const currentPage = computed(()=>{
  return (isLoggedIn) ? "Generator" : "Login"
})

const handleSetLogin = (data) => { 
  isLoggedIn.value = data 
  console.log(data)
};
*/
</script>

<template>
  <!--<div>Main app: logged {{ (isLoggedIn) ? 'in' : 'out' }}</div>-->
  <header class="p-4 bg-emerald-400 flex">
    <div class="text-xl p-1 text-slate-700 font-bold">Code generator for tp-form configurator</div>
    <button v-if="isLoggedIn" 
      class="p-1 
            bg-orange-100 
            hover:bg-orange-200
            transition 
            outline-1 
            active:outline-blue-400 
            border 
            border-black 
            ml-auto 
            rounded" 
      @click="authStore.logout()"
    >
      Log out
    </button>
  
  </header>
  <div v-if="isLoggedIn === true">
    
    <Generator />
  </div>
  <div v-else="">
    <Login></Login>
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
