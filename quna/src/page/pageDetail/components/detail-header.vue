<template>
  <div>
    <div @click="changeS" class="head-wrap">
       <!-- head-header  :style="myOpacity" v-show="showHeader" -->
      <div class="head-header" >
        <div @click = "go" class="back-btn">
          <i class="back iconfont">&#xe64a;</i>
        </div>
        <p class="header-title">{{imgName}}</p>
      </div>
      <img class="head-img" :src="firstImg">
      <div class="head-info">
        <div class="info-icon">
          <span class="iconfont">&#xe653;</span>
          {{imgLength}}
        </div>
        <div class="info-title">{{imgName}}(AAAAA景区)</div>
      </div>
      <div v-show="!showHeader" @click = "go" class="iconfont head-icon">&#xe64a;</div>
    </div>
    <!-- hidden是detail-header 父级定义的函数 在img-bar里触发 去改变相应的展示 -->
    <!-- <keep-alive> -->
    <img-bar @hidden="hidden" v-if="state" :gallaryUrl = "url"></img-bar>
    <!-- </keep-alive> -->
    <detail-recom v-show="!state" :recom="recom"></detail-recom>
    <detail-comment v-show="!state" :com = "comment1"></detail-comment>
    <detail-foot v-show="!state"></detail-foot>
    <home-foot v-show="!state"></home-foot>
  </div>
</template>

<script>

import { mapState, mapMutations } from "vuex"
import detailRecom from './detail-recommend.vue'
import detailComment from "./comment.vue"

import detailFoot from "./detail-foot.vue"
import homeFoot from 'homeFoot/components/foot-dec.vue'

import imgBar from 'pubCom/imgBar/imgBar'
export default {
    name: "detailHead",
    props: [
        "comment1"],
    components: {
        detailRecom,
        imgBar,
        detailComment,
        detailFoot,
        homeFoot
    },
    data (){
        return {
            //控制img-bar 的显示和隐藏
            state: false,
            // imgName:'',
            // imgLength:0,
            // firstImg:''

            //控制 head-header的显隐
            showHeader: false,
            myOpacity:{
              opacity: 0  
            }

        }
    },
    methods: {
        changeS (){
            this.state = true
        },
        hidden (){
            this.state = false
        },
        ...mapMutations({
            // con:'con' 测试方法（没什么作用）
        }),
        getTop (){
            const top = document.documentElement.scrollTop
            if(top > 30){
                let opacity = top / 80
                opacity = opacity > 1 ? 1 : opacity
                this.myOpacity.opacity = opacity
                this.showHeader = true
            }else{
                this.showHeader = false
            }
        },
        go (){
            this.$router.go(-1)
        }
        
    },
    computed: {
        ...mapState({
            viewName: state => state.viewName,//景点名字
            imgLength: state => state.imgLength,
            imgName: state => state.imgName,
            firstImg: state => state.firstImg,
            recom: state => state.recom,

            url: state => state.imgUrl,//传递给 imgBar --> 传给 gallary好让画廊组件的可迁移性提高


            //获取哪个路由点进了detail（详情页），好做回退
            // detailRouteState: state => state.detailRouteState
        })
    },
    activated (){
        window.addEventListener('scroll', this.getTop)
    },
    deactivated (){
        this.state = false//当切换出 detail-header时 将img-bar隐藏
        window.removeEventListener('scroll',this.getTop)
    }
    
}
</script>

<style lang="stylus" scoped>
  @import '~style/mixin.styl'

  .head-wrap
      position: relative
      height: 0
      overflow: hidden
      padding-bottom: 55%
      .head-header
          z-index: 1000
          position: fixed
          top: 0
          height: 0.84rem
          width: 100%
          margin: 0 auto
          max-width: 700px;
          min-width: 320px;
          background-color: #00BCD4
          display: flex
          line-height: 0.8rem
          .back-btn
              display: line-block
              color: #ffffff
              width: 0.8rem
              heigth: 0.84rem
              line-height: 0.9rem
              text-align: center
              .back
                  font-size: 0.6rem
          .header-title
              flex: 1
              text-align: center
              margin-right: 0.8rem
              font-size: 0.34rem
              color: #ffffff

      .head-img
          width: 100%
      .head-info
          position: absolute
          left: 0.3rem
          right: 0
          bottom: 0.3rem
          line-height: 0.3rem
          color: #ffffff
          .info-title
              font-size: 0.36rem
              padding: 0.2rem 0
      .head-icon
          position: absolute
          top: 0.2rem
          left: 0.3rem
          color: #fff
          width: 0.8rem
          line-height: 0.8rem
          text-align: center
          background: #000
          opacity: 0.8
          font-size: 0.6rem
          border-radius: 50%
</style>