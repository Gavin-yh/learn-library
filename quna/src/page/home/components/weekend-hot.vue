<template>
   <div class="weekend-hot">
      <div class="hot-title">
         <img class = "title-img" src = "http://img1.qunarzz.com/piao/fusion/1711/16/bfbb9874e8f11402.png"/>
         <span class="title">本周热门榜单</span>
         <router-link class="title-link" to = "/banner">
            <span>全部榜单</span>
            <i class="iconfont">&#xe632;</i>
         </router-link>
      </div>
      <div class="hot-info">
         <ul class="info-wrap">
            <router-link
               class="info-wrap-item"
               v-for = "item of weekendHot" 
               :key = "item.id"
               :to = "'/detail/' + item.name"
               @click.native="changeVname(item.name)"

            >
            <!-- getViewName  用来获取 相应景区的名字，
            从而去改变 vuex里面的 ViewName 这个状态 
            供详情页里的相册组件和取的相应的数据 -->
               <img class="info-wrap-item-img" :src = "item.images[0].url"/>
               <p class="dec">{{item.name}}</p>
            </router-link>
         </ul>
      </div>
   </div> 
</template>

<script>
import { mapMutations } from 'vuex'

export default {
   name :"weekend-h",
   props:["weekendHot"],
   methods:{
      changeVname (name){
         this.changeViewName(name)
      },
      ...mapMutations({
         changeViewName : "changeViewName"
      })
   }
}
</script>
<style lang="stylus" scoped>
    @import '~style/mixin.styl'
   .weekend-hot
      width 100%
      background #eee
      padding-top .2rem
      padding-bottom .1rem
      .hot-title
         position relative
         height .9rem
         line-height .9rem
         background #fff
         .title-img
            width .3rem
            height .3rem
            vertical-align .001rem
            margin-left .1rem
         .title
            color #212121
            font-size .3rem
         .title-link
            color: #000;
            position: absolute;
            top: 0;
            right: 0;
            display: block;
            height: .9rem;
            line-height: .9rem;
      .hot-info
         width 100%
         height 40%;
         background #fff
         .info-wrap
            overflow-x scroll
            overflow-y hidden
            white-space nowrap
            padding-left .3rem
            .info-wrap-item
               display inline-block
               margin-right .1rem
               width 1.8rem
               .info-wrap-item-img
                  width 100%
               .dec
                  height .7rem
                  line-height .7rem
                  text-align center
                  color #000
                  ellipsis()
</style>