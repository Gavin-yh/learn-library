<template>
   <div class="loading">
       {{loadStatus}}
   </div> 
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "loading",
    computed: {
        ...mapState({
            loadStatus: state => state.loadStatus
        })
    }
}
</script>

<style lang='stylus' scoped>
    .loading
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        background #333
        opacity .7
        color #fff
        text-align center
        line-height 13rem
        font-size .5rem
</style>
