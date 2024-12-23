<script setup>
import ValueList from './ValueList.vue';
import FormFromJSON from './FormFromJSON.vue';
import { ref, computed } from 'vue';

//import {ref} from VueElement
//const resultCode = ref("")
const resultJsonObj = ref([])
const generatedStructure = ref("")
const newType = ref("")
const newItemFormOpen = ref(false)
const tempValList = ref([])
const fieldValues = ref({
    label: "",
    placeholder: ""
})

const resultCode = computed(()=>{
    return JSON.stringify(resultJsonObj.value)
})

const types= [
            {
                type: "text",
                label: "",
                placeholder: "",
                name: "",
                
            },
            {
                type: "radio",
                label: "",
                values: [],
                name: ""
            },
            {
                type: "multiradio",
                label: "",
                values: [],
                name: ""
            },
        ];

const resultHtml = computed(()=>{
    if (resultJsonObj && false){
        return '\
            <div class="form-item">\
                <div class="form-item-label font-bold">Otsikko</div>\
                <ul class="form-value-list">\
                    <li class="form-value-item list-disc ml-4">arvo</li>\
                    <li class="form-value-item list-disc ml-4">arvo2</li>\
                </ul>\
            </div>';
    } 
    return "";
})


const addItemState = ref(
    {
        type : "",
        buttonText :"Add new",
    }
)
function toggleSelector(){
    //console.log("add main selector")
    //if (!newItemFormOpen.value && !newType.value.length){
    //    alert("Select type first")
    //} else {
    newItemFormOpen.value = !newItemFormOpen.value
    
    addItemState.value.buttonText = (newItemFormOpen.value) ? 'Close' : 'Add new'
    
    /*if (newItemFormOpen.value){

    }*/
}


function handleValuesUpdate(data){
    tempValList.value = data //[ ...data ]

}

function addItem(){
    // validate fields
    // pust to json struct
    // regenerate html for result viewer
    // show json st
    let itemsInJson = resultJsonObj.value.length
    const selectedObj = { ...types.find(item => item.type == newType.value) }
    selectedObj.label = fieldValues.value.label
    if (newType.value == "text"){
        selectedObj.placeholder = fieldValues.value.placeholder
    } else {
        selectedObj.values = tempValList.value.map(item => item.stringval )
    }
    selectedObj.name = `property-${itemsInJson}` // add last in the list
    
    resultJsonObj.value.push(selectedObj)

}

</script>

<template>
    <div class="w-4/5 m-auto">
        <div class="font-bold">Code Generator</div>
        <div id="model-container" class="p-4 bg-blue-100">
            <FormFromJSON :defJsonObj="resultJsonObj"></FormFromJSON>
        </div>
        
        <div class="block">
            <button @click="toggleSelector" 
                class="ml-2 mt-4 px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition"
                >{{ addItemState.buttonText }}
            </button>

        </div>
        <div class="bg-neutral-50 border border-gray-200 block mx-2 px-2 w-fit" v-bind:class="`${ (newItemFormOpen ) ? '' : 'h-0 opacity-0' }`">
            <div>
                <div class="flex">
                    <div class="p-2 w-28 font-semibold">Type: </div>
                    <div class="p-2">
                        <select name="type" v-model="newType" class="mx-2 p-2" placeholder="Select type">
                            
                            <option v-for="item in types" :key="item.type">{{ item.type }}</option>
                        </select>
                    </div>
                </div>
                <div v-if="newType.length > 0">
                    <div class="flex mt-1">
                        <div class="p-2 w-28 font-semibold">Title: </div>
                        <input type="text" 
                            lass="ml-2 border block px-2 py-1" 
                            name="label" 
                            placeholder="Item title.." 
                            v-model="fieldValues.label"
                            >
                    </div>
                    <div v-if="newType == 'text'" class="flex mt-1">
                        <div class="p-2 w-28 font-semibold">Placeholder: </div>
                        <input 
                            type="text" 
                            class="border block px-2 py-1 ml-1" 
                            name="placeholder" 
                            placeholder="Item placeholder.."
                            v-model="fieldValues.placeholder">
                    </div>
                    
                    <div class="flex mt-1" v-if="newType != 'text'">
                        <div class="p-2 w-28 font-semibold">Values: </div>
                        <div><ValueList v-on:updateValList="handleValuesUpdate"></ValueList></div>
                    </div>
                </div>
            </div>
            <div class="block">
                <button @click="addItem" 
                    class="my-4 px-4 py-2 rounded-md bg-green-200 hover:bg-green-300 active:bg-green-400 transition"
                >Save Item
                </button>
            
            </div>
        </div>
        <label for="jsoncode" class="block mt-4">JSON:</label>
        <textarea id="jsoncode" class="w-4/5 h-fit m-auto border bg-green-100 p-2" placeholder="Generated code goes here..">{{ resultCode }}</textarea>
    </div>
    <div>valuelist: {{ tempValList.map((data)=>data.stringval).join(', ') }}</div>
    
</template>
