<template>
    <div @click = "changestate" class="gallary-wrap">
        <div class="gallary-cont">
            <swiper :options="swiperOption">
                <swiper-slide v-for = "(item,index) of gallaryUrl" :key = "index">
                    <img class="cont-img" :src="item" alt="">
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "gallary",
    props: {
        gallaryUrl : Array,
        index : Number
    },
    data () {
        return {
            swiperOption: {
                pagination : ".swiper-pagination",
                paginationType : "fraction",
                // loop: true,
                // observeParents: true,
                // observer: true,
                initialSlide: this.index
            }
        }
    },
    methods: {
        changestate (){
            this.$emit("changeImgShow")
        }
    }
}
</script>

<style lang="stylus" scoped>
    .gallary-wrap >>> .swiper-container
        overflow inherit    
    .gallary-wrap
        position fixed
        top 0
        left 0
        bottom 0
        right 0
        display flex
        flex-direction column
        justify-content center
        background #000
        z-index 1009
        .gallary-cont
            background #000
            .cont-img
                width 100%
            .swiper-pagination
                color #ffffff
                position absolute
                bottom -1rem

</style>