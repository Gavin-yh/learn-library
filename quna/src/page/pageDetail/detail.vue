<template>
    <div>
        <div class="detail_wrap">
            <detail-header :comment1 = "comment"></detail-header>
        </div>
        <order-foot-bar></order-foot-bar>
        <foot-nav></foot-nav>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from "axios"

import detailHeader from "./components/detail-header.vue"
import footNav from "pubCom/footNav/footnav.vue"
import orderFootBar from 'pubCom/orderFootBar/orderBar'

export default {
    name: "Detail",
    data (){
        return {
            comment: []
        }
    },
    methods: {
        ...mapMutations({
            hiddenBar: "hiddenBar"
        })
    },
    components: {
       detailHeader,
       footNav,
       orderFootBar
    },
    computed: {
       ...mapState ({
           viewName: state => state.viewName
       }) 
    },
    watch:{
        //监听路由，当第二次切换进入detail时，将页面至于顶部（防止出来，新进来的页面，位置停在了上次浏览的位置）
        $route(to,from){
　　　　　　 document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            this.$store.commit('saveDetailData', {url:[], name:"",recom:{}})
            console.log('detail router change scrolltop')
            this.hiddenBar()
            
        }
    },
    //mounted 只有当页面构建完成是触发一次。用这个的话，在和主页切换的时候，数据得刷新才能再次获取
    //思考 下面的为什么用vuex  而不用父子组件的传值方式
    activated (){
        // 请求相应图片 传递给imgBar 由imgBar做一定的展示，以及再传递給画廊 gallary进行数据的渲染
        //上面的解释，是针对于用父子组件来传值的方法

        //下面的方法则是用状态管理vuex加上localStorage 进行的数据在组件间的传递
        axios.get ('/local/gallary.json')
            .then (res => {
                if (res.status === 200){
                    res.data.data.forEach(ele => {
                        // 使用localStorage 得结合 weekend-hot 导航 a ,若这里用<router-link>  页面起不到刷新的效果，则用户主动刷新页面是时
                        //由于 this.viewName 为空 则数据请求发送不了，页面空白
                       if(ele.name == (this.viewName || localStorage.viewName)){
                        //    console.log('ssss', ele.name)
                        //    console.log(ele.url)

                          //利用父子组件传值的方式明显效率应该会比 用vuex来的高
                           //有一个误区： 来这里传递给子组件时
                                        //  在子组件的activated钩子里打印这个父组件传过来的值时，为空（一直以为没有传过来）
                                        // 实际上已经传过来的 ，只是在路由切换的时候，父组件的activated钩子会晚于该组件下的子组件的activated
                                        //导致值在父组件中还没请求到时，子组件就开始打印，为空
                                        //到父组件的activated执行时，将值传递给子组件，在打印时，导致一种假象，父组件能打印，子组件中打印的是空
                                        //注意观察执行的循序。（差点陷入恐慌。。。。）                                   

                           this.comment = ele.comment
                           this.$store.commit('saveDetailData', {url:ele.url, name:ele.name,recom:ele.recom})
                        //传递多个参数,用对象的形式来传递
                       }
                    });

                }
            })
    },
    deactivated (){
        //用来做页面数据的清除，当该页面第二次点进来时，页面没有立即有数据时，会显示上一次的数据
        //等有数据时，页面有一种抖动的感觉（数据显示）,
        //有个弊端，就是当用户点击相同景区时，会都浪费一次请求，
        //这里的优化：加上一层判断，若用户点同一个景点进来，数据不用清空。
        //           解决方案：（在页面销毁前，对数据进行缓存，当进入页面时，在发送请求的前面判断是否去缓存）
        this.$store.commit('saveDetailData', {url:[], name:"",recom:{}})
    }
    //该页面还有可以优化的地方：
        //1.数据可以直接用父子组件传值的方式传递给 detail-header
            //中间省去了对状态管理仓库的折腾。虽说用仓库来管理数据，比较方便。
            //但这里用父子组件间的传值，显然会好于用仓库。可以提高页面的性能。
    
}
</script>

<style lang="stylus" scoped>
    @import '~style/mixin.styl'
    .detail_wrap
        position absolute
        top .84rem
        left 0
        right 0
        bottom 1rem
        max-width: 700px;
        min-width: 320px;
        margin: 0 auto
        overflow scroll
        scrollbar()
</style>
