<template>
    <div class="header">
        <a href = "/" class = "back-btn">
            <i class="back iconfont">&#xe64a;</i>
        </a>
        <div class = "map">
            <a  href = "#" class = "map-link">
                <i class = " select iconfont">&#xe650;</i>
                <span class = "map-link-info">请输入城市/景点/游玩主题</span>
            </a>
        </div>
        <div class = "localtion">
            <router-link  class="local-link" to = "/city">
                <span class="localtion-title">{{stateCity}}</span>
                <i class="localtion-icon iconfont">&#xe625;</i>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapState ,mapMutations } from 'vuex'

export default {
    name: "headerpage",
    computed: {
        ...mapState ({
            stateCity : state => state.city
        })
    },
    // methods: {
    //     // ...mapMutations({
    //     //     chagefromRouteState: "chagefromRouteState"
    //     // })
        
    // },
    watch: {
        $route (to ,from){
            //利用状态管理，对该页面的路由进行保存，在进入城市选择页面时，页面想要跳回来，做准备
            //城市选择页，有两个地方可以进入，一个是home的header，另一个是hotAllBar页面，
            //为了能跳回进入城市选择页的页面，只好对路由进行缓存

            // this.chagefromRouteState(from.path) 用this.$router.go()
　　　　　　 document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            console.log("home-header is $router")
        }
    },

}
</script>
<style scoped lang="stylus">
    @import '~style/mixin.styl'
    .header
        height .84rem
        width 100%
        background-color #00BCD4
        display flex
        line-height .8rem
        .back-btn
            display line-block
            color #ffffff
            width 0.8rem
            heigth .84rem
            line-height .9rem
            text-align center
            .back
                font-size .6rem

        .map
            position relative
            height .6rem
            margin .14rem 0
            box-sizing border-box
            flex-grow 1
            .map-link
                display inline-block
                width 100%
                height 100%
                border-radius 0.06rem
                background-color #ffffff
                color #cccccc
                .select
                    display inline-block
                    height .6rem
                    width .5rem
                    font-size .5rem
                    position absolute
                    left .1rem
                    line-height .6rem
                .map-link-info
                    position: absolute;
                    left: .7rem;
                    top: 0;
                    width 3.6rem
                    height .6rem
                    line-height .6rem
                    ellipsis()
        .localtion
            .local-link
                color #fff
                display block
                width 100%
                height .8rem
                line-height .8rem
                padding-left .2rem
                box-sizing border-box
                .localtion-icon
                    font-size .5rem
                    vertical-align top
                .localtion-title
                    display inline-block
                    min-width .6rem
                    max-width 1.2rem
                    height 100%
                    ellipsis()
        

</style>