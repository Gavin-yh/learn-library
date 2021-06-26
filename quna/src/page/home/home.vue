<template>
  <div id="home">
    <home-header></home-header>
    <div class="home_wrap">
      <home-swiper :swiperdata="headerSwiper"></home-swiper>
      <home-icon :icons="iconList"></home-icon>
      <home-list-bottom></home-list-bottom>
      <home-wek-hot :weekendHot="weekendHot"></home-wek-hot>
      <home-recom :recomment="recomment"></home-recom>
      <home-wek-go :weekendGo="weekendGo"></home-wek-go>
      <home-foot></home-foot>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>
<script>
import homeHeader from "./components/header.vue";
import homeSwiper from "./components/swiper.vue";
import homeIcon from "./components/icon.vue";
import homeListBottom from "./components/map-list-bottom.vue";
import homeWekHot from "./components/weekend-hot.vue";
import homeRecom from "./components/recommend.vue";
import homeWekGo from "./components/weekend-go.vue";
import homeFoot from "./components/foot-dec.vue";
import footNav from "pubCom/footNav/footnav.vue"

import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "homepage",
  data() {
    return {
      lastCity: "", //缓冲的变量
      headerSwiper: [],
      iconList: [
        {
          id: "06",
          url:
            "http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
          text: "景点门票"
        },
        {
          id: "07",
          url:
            "http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png",
          text: "一日游"
        },
        {
          id: "08",
          url:
            "http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
          text: "必游景点"
        },
        {
          id: "09",
          url:
            "http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png",
          text: "动植物园"
        },
        {
          id: "10",
          url:
            "http://img1.qunarzz.com/piao/fusion/1803/b6/37560ece9c62b502.png",
          text: "城市观光"
        },
        {
          id: "11",
          url:
            "http://img1.qunarzz.com/piao/fusion/1803/b6/37560ece9c62b502.png",
          text: "泡温泉"
        },
        {
          id: "12",
          url:
            "http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
          text: "野生动物园"
        },
        {
          id: "13",
          url:
            "http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
          text: "野生动物园"
        },
        {
          id: "14",
          url:
            "http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
          text: "野生动物园"
        }
      ],
      weekendHot: [],
      recomment: [],
      weekendGo: []
    };
  },
  computed: {
    ...mapState({
      city: "city" //获取状态 结合缓冲的变量 对当前的数据进行检查 看是否需要发送新的请求
    })
  },
  methods: {
    getInfo() {
      axios.get("/api/home").then(res => {
        let Data = res.data;
        console.log(Data);
        if (res.statusText == "OK") {
          // this.headerSwiper = Data.headerSwiper
          // this.iconList = Data.iconList
          // this.weekendHot = Data.weekendHot
          // this.recomment = Data.recomment
          // this.weekendGo = Data.weekendGo
          ({
            headerSwiper: this.headerSwiper,
            weekendHot: this.weekendHot,
            recomment: this.recomment,
            weekendGo: this.weekendGo
          } = Data);
        }
      });
    }
  },
  components: {
    homeHeader,
    homeSwiper,
    homeIcon,
    homeListBottom,
    homeWekHot,
    homeRecom,
    homeWekGo,
    homeFoot,
    footNav
  },
  mounted() {
    //mockjs + axios
    //mockjs直接拦截 http (xhr)请求,当用<keep-alive>进行优化（减少在路由切换时频繁发送相应的请求) , 用mockjs 无法模拟真实的xhr请求
    // 进而 中间的一些需要优化的问题 也就没办法体现出来
    // axios.get('/home/data')
    //     .then(res => {
    //         let Data = res.data.data
    //         if(res.data.codemsg){
    //             this.headerSwiper = Data.headerSwiper
    //             this.iconList = Data.iconList
    //             this.weekendHot = Data.weekendHot
    //             this.recomment = Data.recomment
    //             this.weekendGo = Data.weekendGo
    //         }
    //     })

    // webpack 中的代理proxy  + axios
    // 可以比较完整的模拟出 ， xhr 的请求，在路由切换的时候，network 下的xhr 会发现mounted 执行时会发送相同的请求 而没有去缓存
    // 则<keep-alive> 实现组件数据的缓存
    // axios.get('/city/data')
    //     .then(res => {
    //         console.log(res)
    //     },fa => {
    //         console.log(fa)
    //     })
    this.lastCity = this.city;
    this.getInfo();
  },
  activated() {
    if (this.lastCity !== this.city) {
      this.lastCity = this.city;
      this.getInfo();
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import '~style/mixin.styl'
  .home_wrap
      position: absolute;
      top: 42px;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow: scroll;
      max-width: 700px;
      min-width: 320px;
      margin: 0 auto;
      scrollbar()
</style>

