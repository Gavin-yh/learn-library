<template>
  <div>
      <input :value="value" :type="type" @input="onInput" />
  </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        onInput(e) {
            const value = e.target.value
            this.$emit("input", value)
            this.$parent.$emit("validate", value)
        }
    }
}
</script>

<style>

</style>