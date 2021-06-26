<template>
    <div class="comp-order">
        <com-header></com-header>
        <div class="info">
            <div class="title">
                {{orderTitle}}(官方)
            </div>
            <div class="money">
                ￥{{orderPrice}}
            </div>
        </div>
        <div class="number">
            <div class="number-title">
                购票数量
            </div>
            <div class="number-wrap">
                <button class="btn" @click = "del">-</button>
                <input class="text" type="text" v-model="number" readonly>
                <button class="btn" @click = "add">+</button>
            </div>
        </div>
        <div class="tab">
            <mt-field label="游客名" v-model="name" placeholder="请输入名字"></mt-field>
            <mt-field label="手机号" v-model="tel" placeholder="请输入手机号" type="tel"></mt-field>
        </div>
        <div class="totle">
            <div class="totle-price">
                <p class="price-title">产品价格/</p>
                <p class="price-num">￥{{totle}}</p>
            </div>
            <div class="order" @click="success">
                提交订单
            </div>
        </div>
        <div class="alert" v-show="alertStatus">
            <div class="alertBox">
                <div class="alert-exit">
                   <i class="iconfont" @click="closeAlert">&#xe61c;</i>
                </div>
                <p class="mes">购票成功!!!</p>
                <p class="point">(可以在订单中查看)</p>
                <button @click="saveData" tag="button">确定</button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapState, mapMutations } from "vuex"
import axios from 'axios'

import comHeader from './component/header.vue'

export default {
    name: "compOrder",
    data() {
        return {
            number: 1,
            totle: 0,

            name: '',
            tel: '',

            alertStatus:false
        }
    },
    methods: {
        add() {
            this.number ++
            this.totle = this.orderPrice * this.number
        },
        del() {
            if (this.number > 1) {
                this.number --
                this.totle = this.orderPrice * this.number
            }
        },
        success() {
            if (this.tel && this.name) {
                this.alertStatus = true
                return
            }
            alert('信息不完整!请填写完整信息')
        },
        closeAlert() {
            this.alertStatus = false
        },
        saveData() {
            //axios    保存数据
                let formdata = new URLSearchParams()
                formdata.append('name',this.orderTitle)
                formdata.append('price',this.orderPrice)
                formdata.append('count',this.number)
                formdata.append('attractionsId', 1)
                axios.defaults.withCredentials = true
                axios.post("http://localhost:8088/travel_war/order", formdata)
                    .then(res => this.orderSuccess(res))
                    .catch(e => this.error(e))
            this.$router.go(-1)
        },
        orderSuccess(res) {
            console.log(res)
        },
        error(e) {
            console.log(e)
        }
    },
    computed: {
        ...mapState({
            orderTitle: state => state.orderTitle,
            orderPrice: state => state.orderPrice
        })
    },
    components: {
        comHeader
    },
    watch: {
        $route(to,from){
            this.alertStatus = false
            this.number = 1 //当用户上次点击增加后，没有回复到1，下次进来的时候数据会不对
            this.totle = this.orderPrice
        }
    },
    mounted() {
        this.totle = this.orderPrice
    }

}
</script>

<style lang="stylus" scoped>
    .comp-order
        .info
            background #fff
            display flex
            height 1.5rem
            line-height 1.5rem
            .title
                color #212121
                font-size .32rem
                margin 0 0 .04rem .4rem
            .money
                flex-grow 1
                text-align right
                color #ff9800
                padding-right .3rem
                font-size .4rem
        .number
            display flex
            background #fff
            margin-top .2rem
            height 1rem
            line-height 1rem
            .number-title
                width 3rem
                font-size .3rem
                padding-left .4rem
            .number-wrap
                text-align right 
                flex-grow 1
                padding-right .4rem
                .btn
                    font-size .4rem
                    height .3rem
                    width .3rem
                    line-height .3rem
                .text
                    width .6rem
                    text-align center
        .tab
            margin-top .2rem
        .totle
            position absolute 
            bottom 0
            right 0
            left 0
            display flex
            height 1rem
            .totle-price
                flex-grow 1
                display flex
                line-height 1rem
                color #ff9800
                padding-left .3rem
                border-top 2px solid #eee
                .price-num
                    font-size .4rem
                    margin-left .1rem
            .order
                width 3rem
                background #ff9800
                width 3.5rem
                line-height 1rem
                font-size .38rem
                text-align center
                color #fff
                font-weight bold
        .alert
           &:after
                content ''
                display block
                position absolute
                top 0
                bottom 0
                left 0
                right 0
                background #333
                opacity .5
            .alertBox
                position absolute 
                top 40%
                left 19%
                width 4rem
                height 3rem
                background #fff
                border 1px solid #333
                z-index 2
                .alert-exit
                    text-align right 
                    padding .1rem .1rem 0 0
                    i
                        font-size .5rem
                p
                    text-align center
                    margin .1rem 0 .3rem 0
                .mes
                    font-size .4rem
                .point
                    font-size .1rem
                    color red
                button
                    width 1.3rem
                    height .6rem
                    display block
                    margin 0 auto



</style>