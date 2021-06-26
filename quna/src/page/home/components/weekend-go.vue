<template>
    <div class="we-go-wrap">
        <h2 class="wrap-title">周末去哪</h2>
        <ul class="wrap">
            <li class="wrap-item"  v-for = "item of weekendGo"  :key = "item.id">
                <a href = "" class="wrap-content">
                    <div class="wrap-img">
                        <img v-lazy = "item.images[0].url"/>
                    </div>
                        <div class="wrap-info">
                        <p class="info-title">{{item.name}}</p>
                        <p class="info-recom">{{item.recom}}</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name : "wekgo",
    props:["weekendGo"]
}
</script>

<style lang="stylus" scoped>
    @import "~style/mixin.styl"
    .we-go-wrap
        width: 100%
        .wrap-title
            height: .8rem
            line-height: .8rem
            color: #212121
            padding-left: .26rem
            background #eeeeee
        .wrap
            background: #ffffff
            .wrap-item
                margin-bottom: .1rem
                .wrap-content
                    display: block
                    background: #ffffff
                    width: 100%
                    .wrap-img
                        width: 100%
                        padding-bottom: 37%
                        height: 0
                        overflow: hidden
                        img 
                            width:100%
                    .wrap-info
                        padding: .14rem .2rem .2rem .2rem
                        .info-title
                            font-size: .28rem
                            color: #212121
                            padding-left: .1rem
                            line-height .48rem
                            ellipsis()
                        .info-recom
                            color: #616161
                            font-size: .24rem
                            line-height: .42rem
                            padding-left: .14rem 
                            ellipsis()
</style>