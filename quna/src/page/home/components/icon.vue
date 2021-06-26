<template> 
    <swiper :options="swiperOption">
        <swiper-slide class="icon-wrap" v-for = "(items,index) of pages" :key = "index">
            <div class = "icon" v-for = "item of items" :key = item.id>
                <div class="img-wrap">
                    <img :src = "item.url" />
                </div>
                <div class="info">
                    <p>{{item.text}}</p>
                </div>
            </div>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
export default {
    name :'icons',
    props:["icons"],
    data(){
        return {
            swiperOption:{
                pagination:".swiper-pagination",
            }
        }
    },
    computed:{
        pages(){
            let pages = []
            this.icons.forEach((item ,index) => {
                const page = Math.floor(index/8)
                if(!pages[page]){
                    pages[page] = []
                }
                pages[page].push(item)
            })
            return pages
        }
    }
}
</script>

<style lang="stylus" scoped>
     @import '~style/mixin.styl'
    .icon-wrap
        padding-top .2rem
        font-size 0
        width 100%
        padding-bottom 50%
        height 0
        background #ffffff
        .icon
            background #fff
            position relative
            overflow hidden
            display inline-block
            width 25%
            height 0
            padding-bottom 25%
            .img-wrap
                position absolute 
                top 0 
                left 0 
                right 0
                bottom .6rem
                img
                    display block
                    height 80%
                    margin:0 auto
            .info
                position absolute 
                bottom 0
                font-size 16px
                height .6rem
                line-height .6rem
                padding-bottom .3rem
                width 100%
                text-align center
                p
                    width: 1.3rem
                    margin: 0 auto
                    text-align: center
                    ellipsis()
</style>
