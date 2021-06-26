<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>

export default {
    name :"app",
}
</script>
<style lang="stylus" scoped>
    #app
        // overflow-x: hidden
        background: #eee
        margin: 0 auto;
        max-width: 700px;
        min-width: 320px;
</style>