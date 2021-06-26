<template>
    <div class="order-wrap">
        <div class="back-icon border-right">
            <router-link tag = "i" to = "/selfpage" class="iconfont icon ">&#xe64a;</router-link>
            <span class="order-head">订单管理</span>
        </div>
        <div>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1" class="allOrder color">全部订单</mt-tab-item>
                <mt-tab-item id="2" class="toPay color">订单填写</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="all-order-wrap" v-for="(ele, index) of allOrder" :key=index>
                        <div class="name">{{ele.name}}</div>
                        <div class="all-price">
                            <p class="price">￥{{ele.price}}</p>
                            <p class="number">/3</p>
                        </div>
                    </div>
                    <mt-cell class="nodata" v-show="!allOrder.length" title="暂时没有订单..."></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <mt-cell v-show="topay.length" v-for="ele of topay" :key = ele.id :title="'测试 ' + ele" />
                    <mt-cell class="nodata" v-show="!topay.length" title="暂时还没有待付款订单..."></mt-cell>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
export default {
   name: "orderBar",
   data() {
       return {
           selected: '1' ,
           topay: [
           ],
           allOrder: [
           ]
       }
   },
   methods:{
       orderData() {
            axios.defaults.withCredentials = true
           if (localStorage.userName !== '未登录'){
                axios.get("http://localhost:8088/travel_war/order")
                    .then(res => this.success(res))
                    .catch(e => this.error(e))
            }
       },
       success(res) {
           this.allOrder = res.data
           console.log(res)
       },
       error(e) {
           console.log(e)
       }
   },
   watch:{
       $route(to, from) {
            this.orderData()
       }
   },
   mounted(){
       this.orderData()
   }
}
</script>

<style lang="stylus" scoped>
    .order-wrap
        .back-icon
            display flex
            height .84rem
            background #00BCD5
            .icon
                display inline-block
                line-height .84rem
                width .84rem
                font-size .7rem
                color #ffffff
            .order-head
                flex-grow 1
                margin-right .9rem
                text-align center
                line-height .84rem
                font-size: 0.34rem
                color: #ffffff
        .color
            color #333
        .nodata >>>.mint-cell-title
            text-align center
        .all-order-wrap
            display flex
            height 1.5rem
            line-height 1.5rem
            background #ffffff
            margin .2rem 0
            .name
                flex-grow 1
                padding-left .2rem
            .all-price
                display flex
                width 2rem
                color #ff9800
                .price
                    font-size .5rem
                .number
                    padding-top .2rem
                
</style>
