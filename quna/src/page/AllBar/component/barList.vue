<template>
   <div class="list-wrap" ref = "wrapper">
       <div class="content">
           <div class="conten-item"
                v-for = "(item ,index) of arrBar"
                :key="index"
            >
                <router-link 
                    :to ="'/detail/' + item.name" 
                    class="re-content-wrap"
                    @click.native = "changeName(item.name)"
                >
                    <div class="content-img">
                        <img :src = "item.url"/>
                    </div>
                    <div class="content-cont">
                        <p class="cont-name paddin">{{item.name}}</p>
                        <div class="cont-icon paddin">
                            <i class="iconfont">&#xe6d5;&#xe6d5;&#xe6d5;&#xe6d5;&#xe6d5;</i>
                        </div>
                        <div class="cont-info paddin">
                            <p class="info-com">{{item.comment}}</p>
                        </div>
                        <!-- <p class="info-der">{{item.recom}}</p> -->
                    </div>
                </router-link>
                <div class="re-content-recom">{{item.recom}}</div>
                <div class="recontent-more border-top">
                    <router-link 
                        :to="'/detail/' + item.name" 
                        class="iconfont"
                        @click.native = "changeName(item.name)"
                    >
                        查看更多&#xe63f;
                    </router-link>
                </div>
            </div>
       </div>
   </div> 
</template>

<script>
// import Bscroll from 'better-scroll'
import axios from 'axios'
import { mapState ,mapMutations } from 'vuex'
export default {
    name: "barList",
    data (){
        return {
            arrBar: []
        }
    },
    methods: {
        ...mapMutations({
            changeName: "changeViewName",
        })
    },
    mounted (){
        // this.scroll = new Bscroll(this.$refs.wrapper,{click:true})
    },
    created (){
       axios.get("local/allBar.json")
            .then(res => {
                if(res.statusText == "OK"){
                    console.log(res)
                    this.arrBar = res.data.allBar
                }
            })
    }
}
</script>

<style lang="stylus" scoped>
    @import '~style/mixin.styl'
    .list-wrap
        background #eee
        padding 0rem .15rem 0rem
        position absolute 
        top .84rem
        left 0rem
        right 0rem 
        bottom 1rem
        max-width: 700px;
        min-width: 320px;
        margin: 0 auto
        overflow scroll
        box-sizing: border-box;
        scrollbar()
        .content
            .conten-item
                margin .45rem 0rem
                padding .2rem .1rem 0rem
                background #ffffff
                min-width 6rem
                .re-content-wrap
                        display flex
                        width 100%
                        height 100%
                        color #000
                        .content-img
                            width 2.8rem
                            height 2rem
                        img 
                            width 100%
                            height 100%
                        .content-cont
                            margin .4rem 0 0 .3rem
                            flex-grow 1
                            .paddin
                                padding .1rem 0
                        .cont-name
                            font-size 19px
                            font-weight bold
                            width 4rem
                            ellipsis()
                        .cont-icon
                            color #ffb436
                            i
                                font-size 10px !important
                        .cont-info
                            .info-com
                                color #9e9e9e;
                                font-size .24rem;
                                line-height .24rem;
                .re-content-recom
                    padding-top .2rem 
                    text-indent .5rem
                    height 1.4rem
                    line-height .5rem
                    max-height 2rem
                .recontent-more
                    height .8rem
                    a
                        display block
                        text-align center
                        font-size: .28rem
                        line-height .8rem
</style>
