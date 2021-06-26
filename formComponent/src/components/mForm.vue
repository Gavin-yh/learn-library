<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
export default {
    provide() {
        return {
            mForm: this
        }
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object
        }
    }
}
</script>

<style>

</style>