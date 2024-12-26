<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import Generator from './components/Generator.vue';
import { useAuthStore } from './stores/auth';
import { ref, computed, onMounted } from 'vue'

//const currentPage = ref('Login')


//const title = ref("Code generator for tp-form configurator")
const title = ref("")

onMounted(()=>{
  if (import.meta.env.DEV){
    title.value = import.meta.env.VITE_APP_TITLE_DEV
  } else {
    title.value = import.meta.env.VITE_APP_TITLE
  }
})


/*if (node.value == "dev"){
  title.value = import.meta.env.VITE_TITLE_DEV
}*/
//process.env.VUE_APP_TITLE)
const authStore = useAuthStore();

const isLoggedIn = computed(()=> authStore.isLoggedIn)
const usernm = computed(()=> authStore.userName)

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
    <div class="text-xl p-1 text-slate-700 font-bold">{{ title }}</div>
    <div class="ml-auto" v-if="isLoggedIn"><span class="mx-2 text-blue-600">{{ usernm }}</span>
        <button  
            class="py-1 
                  bg-orange-100 
                  hover:bg-orange-200
                  transition 
                  outline-1 
                  active:outline-blue-400 
                  border 
                  border-orange-500
                  shadow 
                  rounded px-3" 
            @click="authStore.logout()"
          >
            Log out
      </button>
    </div>
    
  
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
