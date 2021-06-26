<template>
  <div>
      <label for="">{{label}}</label>
      <slot></slot>
      <span v-if="errStatus">{{errMessage}}</span>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
    inject: ["mForm"],
    props: ["prop", "label"],
    data() {
        return {
            errMessage: "",
            errStatus: false
        }
    },
    mounted() {
        this.$on("validate", this.validate)
    },
    methods: {
        validate() {
            const rules = this.mForm.rules[this.prop]
            const value = this.mForm.model[this.prop]
            let descripte = {[this.prop]: rules}
            let schema = new Schema(descripte)
            schema.validate({[this.prop]: value}, errors => {
                if (errors) {
                    this.errMessage = errors[0].message
                    this.errStatus = true
                }else{
                    this.errMessage = ""
                    this.errStatus = false
                }
            })
        }
    }
}
</script>

<style>

</style>