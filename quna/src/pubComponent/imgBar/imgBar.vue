<template>
    <div>
        <div class="wrapper">
            <div class="wrapper-head">
                <!-- hidden  是父级上的 事件 在自己中触发，去改变父级 里的state -->
                <div @click = "hidden" class="icon iconfont">&#xe64a;</div>
                <div class="title">景区图片</div>
            </div>
            <ul class="wrapper-img">
                <li @click = "showGallary(index)" v-for = "(item,index) of imgUrl" :key = "index" class="img-cont">
                    <img :src="item" alt="">
                </li>
            </ul>
        </div>
        <gallary :gallaryUrl = "gallaryUrl" :index = "index" @changeImgShow = "changeImgShow" v-if = "showImg"></gallary>
    </div>
</template>

<script>
import { mapState } from "vuex"

import gallary from "../gallary/gallary"
export default {
    name: "imgBar",
    props: {
        paramsId: Number,
        gallaryUrl: Array
    },
    components: {
        gallary
    },
    computed:{
        ...mapState({
            imgUrl: state => state.imgUrl
        })
    },
    data (){
        return {
            showImg: false,
            index: 0//当点击相应的 相片的时候  画廊的展示从相应的图片开始展示  传递给gallary
        }
    },
    methods: {
        hidden (){
            this.$emit('hidden')
        },
        showGallary (index){
            this.showImg = true
            this.index = index
            // 评论区 点击改变不了 图片的索引
        },
        changeImgShow (){
            this.showImg = false
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '~style/mixin.styl'
    .wrapper-head
        width 100%
        height .8rem
        display flex
        line-height .8rem
        background #ffffff
        position absolute
        top 0
        .icon
            width .8rem
            font-size .72rem
        .title
            flex-grow 1
            font-size .32rem
            color #333
            ellipsis()
            text-align center
            margin-right .8rem
    .wrapper-img
        position absolute
        top .8rem
        left 0
        bottom 0
        right 0
        background #eee
        padding-top .2rem
        overflow scroll
        .img-cont
            display inline-block
            padding .1rem .1rem
            width 50%
            box-sizing border-box
            img 
                width 100%
</style>