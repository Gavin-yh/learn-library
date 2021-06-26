<template>
    <div class="swiper-wrap">
        <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide class="swiper-img" v-for = "item of swiperdata" :key = "item.id">
                <img :src = "item.url"/>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    name : "homeswiper",
    props:["swiperdata"],
    data(){
        return {
            swiperOption : {
                pagination:".swiper-pagination",
                loop:true,
                autoplay: 1000,
                speed: 1000,
                initialSlide: 1,
                disableOnInteraction: false 

            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .swiper-wrap >>> .swiper-pagination-bullet-active
        background: red !important;
    .swiper-wrap
        width 100%
        height 0
        padding-bottom 26%
    .swiper-img img 
        width 100%
        background #eee
</style>
