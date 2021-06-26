<template>
    <div class="order-foot-bar" v-show="orderS" >
        <div class="order-opacity-bar" @click="hiddenBar()"></div>
        <div class="order-wrap">
            <div class="order-mes-wrap">
                <div class="order-mes">
                    <h5>{{title}}(官方)</h5>
                    <p class="order-price">￥{{price}}</p>
                    <p class="order-time">日期：XXX</p>
                </div>
                <div class="order-close">
                    <i class="iconfont" @click="hiddenBar()">&#xe61c;</i>
                </div>
            </div>
            <div class="order-btn">
                <p @click = "order">预定</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
    name: "orderFootBar",
    methods: {
        ...mapMutations({
            hiddenBar:"hiddenBar"
        }),
        order() {
            if(localStorage.userName === "未登录") {
                this.$router.push({path:"/login"})
                return
            }
            this.$router.push({path:"/completeOrder"})
        }
    },
    computed: {
        ...mapState({
            title: state => state.orderTitle,
            price: state => state.orderPrice,
            orderS: state => state.orderStatus
        })
    }
}
</script>

<style lang="stylus" scoped>
    .order-foot-bar
        .order-opacity-bar
            position absolute
            bottom 0
            top 0
            left 0
            right 0
            background #7A7A7A 
            opacity .6
            z-index 1
        .order-wrap
            position absolute
            bottom 0
            width 100%
            height 4rem
            background #fff
            z-index 2
            .order-mes-wrap
                height 3rem
                display flex
                .order-mes
                    width 4rem
                    padding .3rem .2rem
                    h5
                        color #212121
                        font-size .38rem
                        line-height .4rem
                        font-weight bold
                    .order-price
                        color #ff9800
                        font-size .3rem
                        margin .2rem .3rem
                    .order-time
                        margin .4rem .2rem
                .order-close
                    flex-grow 1
                    text-align right
                    padding .2rem .3rem 0 0
                    i
                        font-size .5rem
                        color #cc
            .order-btn
                height 1rem
                line-height 1rem
                background #ff9800
                color #ffffff
                text-align center
                font-size .45rem

</style>
