<template>
    <div class="D-recom">
        <div class="travel">
            <div class="travel-T">
                <span class="travel-title">入园参考</span>
            </div>
            <div class="travel-content">
                <h4 class="Tcon-title">开放时间</h4>
                <p>旺季(6月～10月)：09:00～18:00开放，17:00停止入园；</p>
                <p>淡季(11月～5月)：09:00～17:00开放，16:00停止入园；</p>
            </div>
        </div>
        <div class="travel price">
            <div class="travel-price">
                <span class="price-title">票价详情</span>
            </div>
            <div class="price-content">
                <div class="price-wrap" v-for="item of priceData" :key="item.id">
                    <div>
                        <p class="price-t">{{imgName}}{{item.title}}</p>
                        <p class="mes">(指定日) (随买随用)</p>
                        <p class="time">日期:明天</p>
                    </div>
                    <div class="order">
                        <p>￥{{item.price}}</p>
                        <button class="btn" @click="saveOrderMes({title:imgName+item.title,price:item.price,orderS:true})">预定</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="play travel">
            <div class="travel-T">
                <span class="travel-title">特色玩法</span>
            </div>
            <div class="travel-content">
                <div v-for = "(val,key,index) of recom" :key = "index">
                    <div class="play-recom">{{key}}</div>
                    <div class="play-img">
                        <img :src="val" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapMutations } from "vuex"


export default {
    name: "detailR",
    props:{
        recom: Object
    },
    data() {
        return {
            priceData: [
                {
                    id: 1,
                    title:"景点成人票",
                    price: "120" 
                },{
                    id: 2,
                    title:"景点儿童票",
                    price: "100" 
                },{
                    id: 3,
                    title:"景点老人票",
                    price: "110" 
                },{
                    id: 4,
                    mes:"景点军人票",
                    price: "100" 
                }
            ]
        }
    },
    methods: {
        ...mapMutations({
            saveOrderMes:"saveOrderMes"
        }),

    },
    computed: {
        ...mapState({
            imgName: state => state.imgName//景点名字
        })
    },
    

}
</script>

<style lang="stylus" scoped>
    @import '~style/mixin.styl'
    .D-recom
        background #eeeeee
        line-height .6rem
        .travel
            position relative
            background #ffffff
            .travel-T
                border-bottom 1px solid #eee
                .travel-title
                    padding-left .2rem
                    display inline-block
                    width 4rem
                    font-size .3rem
                    font-weight bold
                    color #212121
                &:before
                    display inline-block
                    content ""
                    width .2rem
                    height .2rem
                    background #f40
            .travel-content 
                padding: 0rem 0.2rem .2rem;
                .Tcon-title
                    font-size .3rem
                    font-weight bold
                    color #212121
        .price
            margin-top .2rem
            .travel-price
                border-bottom 1px solid #eee
                .price-title
                    padding-left .2rem
                    display inline-block
                    width 4rem
                    font-size .3rem
                    font-weight bold
                    color #212121
                &:before
                    display inline-block
                    content ""
                    width .2rem
                    height .2rem
                    background #f40
            .price-content 
                padding: .2rem 0.2rem .2rem;
                .price-wrap
                    display flex
                    .price-t
                        text-indent .3rem
                    .mes
                        color #ccc
                        text-indent .3rem
                    .time
                        text-indent .3rem
                        &:before
                            display inline-block
                            content ""
                            width .2rem
                            height .2rem
                            border-radius 50%
                            background #0ff
                            margin-right .1rem
                    .order
                        flex-grow 1
                        text-align right
                        padding-right .5rem
                        color #ff9800
                        p
                            padding-right .23rem
                        .btn
                            padding .1rem .3rem
                            background #ff9800
                            color #ffffff
        .play
            margin-top .2rem
            .play-recom
                line-height .42rem
                color #616161
            .play-img
                height 0
                padding-bottom 59%
                width 100%
                overflow hidden
                background #eeeeee
                margin .2rem 0
                img
                    width 100%
                


            

                    
                
</style>