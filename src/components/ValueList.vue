<script setup>
import { ref, defineEmits } from 'vue'
const valueList = ref([])
const tempVal=ref("")

const emit = defineEmits(['updateValList']);

const addValue = () => {
    if (tempVal.value && tempVal.value.length){
        valueList.value.push({
            id: "prop" + valueList.value.length, 
            stringval: tempVal.value
        })
        tempVal.value = ""
    }
    emit('updateValList',valueList.value)
}



</script>
<template>
    <div id="valueList" class="block">[
        <ul class="mx-2">
            <li v-for="val in valueList" :key="val.id">"{{ val.stringval }}"{{ (valueList.length == val.id) ? '' : ',' }} </li>
        </ul>]
    </div>
    <div class="block m-2">
        <input class="border" placeholder="value..." type="text" v-model="tempVal"> 
        <button class="border p-1 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition border-r-red-50" @click="addValue"> +Add value to list</button>
        <button class="border p-1 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition border-l-red-50" @click="valueList=[]">Reset List</button>
    </div>
</template>