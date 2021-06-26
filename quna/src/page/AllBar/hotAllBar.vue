<template>
    <div class="banner-wrap">
        <default-header></default-header>
        <bar-list></bar-list>
        <foot-nav></foot-nav>
    </div>
</template>

<script>
import defaultHeader from 'pubCom/headerBar/defaultHeader'
import barList from './component/barList.vue'
import footNav from "pubCom/footNav/footnav.vue"
export default {
    name: "bannerBar",
    components: {
        defaultHeader,
        barList,
        footNav
    }
}
</script>

<style lang="stylus" scoped>
    
</style>
