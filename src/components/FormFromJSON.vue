<template>
    <div v-html="htmlObjs">
    </div>
    <div>debug: {{ htmlObjs }}</div>
</template>
<script>
export default {
    props: {
        defJsonObj: {
            type: Array,
            required: false,
        },
    },
    data() {
        return {
            data: [] //...this.jsonobj]
        }
    },
    computed: {
        htmlObjs() {
            let result = ""
            if (!this.defJsonObj){
                return "<div>No items added...</div>"
            }
            //return "<div>Data exist: " + this.defJsonObj.length + "</div>"
            else {
                for (let counter; counter<this.defJsonObj.length; counter++){
                    const obj = this.defJsonObj[counter]
                    if (obj?.type == 'text'){
                        result += `<div class="block">
                                <div class="title block">${obj.title}<div>
                                <input type="text" 
                                    class="border block" 
                                    name="${obj.name}" 
                                    placeholder="${obj.placeholder}"
                                >
                            </div>`
                            
                    } else if (obj?.type == 'radio'){
                        result += `<div class="block">
                                <div class="title block">${obj.title}<div>
                                <div class="value-container">
                                    ${obj.values.map(val => {'<input type="radio" class="border block" name="'+ obj.name +'" value="'+ val + '">'}).join('')}
                                <div>
                            </div>`
                    } else if (obj?.type == 'multiradio'){
                        result += `<div class="block">
                                <div class="title block">${obj.title}<div>
                                <input type="text" class="border block" name="${obj.name}">
                            </div>`
                    }
                }
                return result
            }
         
        }
    },
}
</script>