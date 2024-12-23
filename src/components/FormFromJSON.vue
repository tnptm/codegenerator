<template>
    <!--<div v-html="defJsonObj">-->
    <div v-for="item in defJsonObj" :key="item.name" class="bg-blue-50 h-fit my-3 flex">
        <div class="w-4/5 transition block border border-slate-300 p-3 rounded-lg hover:border-slate-500 hover:shadow-lg">
            <div>{{ item.label }}</div>
            <input v-if="item.type == 'text'" 
                :type="item.type" 
                class="border block p-2 ml-4 rounded" 
                :name="item.name" 
                :placeholder="item.placeholder"
            >
            <ul v-if="item.type != 'text'">
                <li v-for="val in item.values" class="ml-4">
                    <input :type="item.type == 'radio'? 'radio': 'checkbox'" 
                            class="mx-2" 
                            :name="item.name" 
                            :value="val"
                    >{{ val }}
                </li>
            </ul>
        </div>
        
        <div class="ml-auto w-60 m-1 p-3 inline-block z-11">
            <ItemUtils :propertyName="item.name" v-on:update-data="handleChange"></ItemUtils>
        </div>
        <!--<div class="absolute w-full flex opacity-20 hover:opacity-100 transition">
        </div>-->
    </div>

    <!--<div>debug: {{ htmlObjs }}</div>-->
</template>
<script>
import ItemUtils from './ItemUtils.vue'

export default {
    components: {
        ItemUtils,
    },
    props: {
        defJsonObj: {
            type: Array,
            required: false,
        },
    },
    emits: ['updateData'],
    data() {
        return {
            data: [] //...this.jsonobj]
        }
    },
    methods:{
        handleChange(data) {
            this.$emit('updateData',data)
        }, 
    },
    computed: {
        htmlObjs() {
            let result = ""
            if (!this.defJsonObj){
                return "<div>No items added...</div>"
            }
            //return "<div>Data exist: " + this.defJsonObj.length + "</div>"
            else {
                for (let counter=0; counter<this.defJsonObj.length; counter++){
                    const obj = { ...this.defJsonObj[counter] }
                    if (obj?.type == 'text'){
                        result += `<div class="flex transition block my-3 border border-slate-300 p-3 rounded-lg bg-blue-50 hover:border-slate-500 hover:shadow-lg">
                                <div class="title block font-semibold text-lg">${obj.label}</div>
                                <input type="text" 
                                    class="border block p-2 ml-4 rounded" 
                                    name="${obj.name}" 
                                    placeholder="${obj.placeholder}"
                                >
                                <div class="ml-auto inline-block">
                                    <ItemUtils :propertyName="${obj.name}"></ItemUtils>
                                </div>
                            </div>`
                            
                    } else if (obj?.type == 'radio'){
                        result += `<div class="flex transition block my-3 border border-slate-300 p-3 rounded-lg bg-blue-50 hover:border-slate-500 hover:shadow-lg">
                                <div class="title block font-semibold text-lg">${obj.label}</div>
                                <div class="value-container"><ul>` 
                        result += obj.values.map(val => { return '<li class="ml-4"><input type="radio" class="mx-2" name="'+ obj.name +'" value="'+ val + '"/>'+ val + '</li>'}).join('')
                        result += '</ul></div></div>'
                    } else if (obj?.type == 'multiradio'){
                        result += `<div class="flex transition block my-3 border border-slate-300 p-3 rounded-lg bg-blue-50 hover:border-slate-500 hover:shadow-lg">
                                <div class="title block font-semibold text-lg">${obj.label}</div>
                                <div class="value-container"><ul>` 
                        result += obj.values.map(val => { return '<li class="ml-4"><input type="checkbox" class="mx-2" name="'+ obj.name +'" value="'+ val + '"/>'+ val + '</li>'}).join('')
                        result += '</ul></div></div>'
                    }
                }
                return result
            }
         
        }
    },
}
</script>