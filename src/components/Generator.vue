<script setup>
import ValueList from './ValueList.vue';
import FormFromJSON from './FormFromJSON.vue';
import { ref, computed, } from 'vue';

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

//const emit = defineEmits(['inFocus', 'submit'])

const resultCode = computed(()=>{
    if (activeResult.value === 'json'){
        return JSON.stringify(resultJsonObj.value)
    } else {
        let formcode = JSON.stringify(resultJsonObj.value)
        formcode = formcode.replaceAll('[','(|')
        formcode = formcode.replaceAll(']','|)')
        return formcode
    }

})
const activeResult = ref('json')
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

/*const resultHtml = computed(()=>{
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
*/

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
    selectedObj.id = itemsInJson
    
    resultJsonObj.value.push(selectedObj)

}

function handleDataChange(data){
    let realIndex = null
    let newData = []
    switch (data.action) {
        case 'delete' :

            //alert("Delete!")
            console.log(resultJsonObj.value[data.elm])
            for (let i=0; i<resultJsonObj.value.length; i++){
                
                if (resultJsonObj.value[i].id == data.elm){
                    
                    let c = confirm(`Do you want to delete item labeled: ${resultJsonObj.value[i].label} (${i + 1})?`)
                    if (c) {
                        resultJsonObj.value.splice(i,1)
                    }
                    break;
                }
            }
            break;
        case 'up':
            for (let i=0; i<resultJsonObj.value.length; i++){
                if (resultJsonObj.value[i].id == data.elm){
                    realIndex = i
                    break;
                }
            }
            if (realIndex === 0){
                // can not move up
                alert("Can not move more up!")
            } else {

                for (let i=0; i<resultJsonObj.value.length; i++){
                    if (i==realIndex-1){
                        newData.push({...resultJsonObj.value[i+1]})
                    } else if (i==realIndex){
                        newData.push({...resultJsonObj.value[i-1]})
                    }
                    else {
                        newData.push({...resultJsonObj.value[i]})
                    }
                }
                resultJsonObj.value = [ ...newData ]
            }
             
            
            break;
        case 'down':
            for (let i=0; i<resultJsonObj.value.length; i++){
                if (resultJsonObj.value[i].id == data.elm){
                    realIndex = i
                    break;
                }
            }
            if (realIndex === resultJsonObj.value.length-1){
                // can not move down
                alert("Can not move more down!")
            } else {

                for (let i=0; i<resultJsonObj.value.length; i++){
                    if (i==realIndex+1){
                        newData.push({...resultJsonObj.value[i-1]})
                    } else if (i==realIndex){
                        newData.push({...resultJsonObj.value[i+1]})
                    }
                    else {
                        newData.push({...resultJsonObj.value[i]})
                    }
                }
                resultJsonObj.value = [ ...newData ]
            }
             
            break;
        case 'edit':
            alert("Not implemneted. Tip: Remove and create new item!")
            break;
    }
    //resultJsonObj
}

</script>

<template>
    <div class="w-4/5 m-auto ">
        <div class="font-bold h-6"> </div>
        <div id="model-container" class="p-4 bg-blue-100  rounded-lg shadow">
            <FormFromJSON :defJsonObj="resultJsonObj" v-on:update-data="handleDataChange"></FormFromJSON>
        </div>
        
        <div class="block">
            <button @click="toggleSelector" 
                class="ml-2 mt-4 px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition"
                >{{ addItemState.buttonText }}
            </button>

        </div>
        <div class="bg-neutral-50 border shadow-lg border-gray-200 block mx-2 px-4 rounded w-fit" v-bind:class="`${ (newItemFormOpen ) ? '' : 'h-0 opacity-0' }`">
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
                        <div><ValueList v-on:update-val-list="handleValuesUpdate"></ValueList></div>
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
        <label for="jsoncode" class="block mt-4">
            <button @click="activeResult = 'json'" class="border p-2" :class="`${ (activeResult=='json') ? 'bg-blue-400 text-white shadow' : 'bg-blue-200' }`">
                JSON
            </button>
            <button @click="activeResult = 'form'" class="border p-2" v-bind:class="`${(activeResult=='form') ? 'bg-blue-400 text-white shadow' : 'bg-blue-200'}`">
                Form-Code
            </button>
        </label>
        <textarea id="jsoncode" class="w-4/5 h-52 m-auto border bg-green-100 p-2" placeholder="Generated code goes here..">{{ resultCode }}</textarea>
    </div>
    <div>valuelist: {{ tempValList.map((data)=>data.stringval).join(', ') }}</div>
    
</template>
