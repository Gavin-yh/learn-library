<template>
    <div class="order-wrap">
        <div class="back-icon border-right">
            <i @click="back" class="iconfont icon ">&#xe64a;</i>
            <span class="order-head">订单填写</span>
        </div> 
    </div>
</template>

<script>
export default {
    name: "comHeader",
    methods: {
        back() {
            this.$router.go(-1)
        }
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
</style>
