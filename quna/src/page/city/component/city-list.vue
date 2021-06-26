<template>
  <div class="list-wrap" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <ul class="wrap">
          <li class="wrap-item">{{stateCity}}</li>
        </ul>
      </div>
      <div class="area scroll">
        <div class="title border-topbottom">热门城市</div>
        <ul class="wrap">
          <li
            class="wrap-item"
            v-for="item of hotcity"
            :key="item.id"
            @click="changeHotCity(item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="area">
        <div :ref="key" v-for="(val,key) of cities" :key="key">
          <div class="title border-topbottom" :id="key">{{key}}</div>
          <ul class="wrap">
            <li
              @click="changeHotCity(res.name)"
              v-for="res of val"
              :key="res.id"
              class="wrap-item border-bottom"
            >{{res.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Bscroll from "better-scroll"

import { mapState, mapMutations } from "vuex";
export default {
  name: "city-list",
  props: {
    cities: Object,
    hotcity: Array,
    graph: String
  },
  methods: {
    ...mapMutations({
      changeState: "changeState"
    }),
    changeHotCity(val) {
      //    this.$store.commit("changeState" , val)  利用辅助方法 减少操作
      this.changeState(val);
      console.log("gogogogogoogogo");
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState({
      stateCity: state => state.city
    })
  },
  watch: {
    //    graph (){
    //        const el = this.$refs[this.graph][0]
    //        this.scroll.scrollToElement(el)
    //    }
  },
  mounted() {
    //    console.log('city-list mounted')
    //    setTimeout(()=>{
    //     this.scroll = new Bscroll(this.$refs.wrapper, { click: true })
    //    },1000)
  }
};
</script>

<style lang="stylus" scoped>
@import '~style/mixin.styl'
.border-topbottom {
  &:after {
    border-color: #cccccc;
  }

  &:before {
    border-color: #cccccc;
  }
}

.list-wrap {
  position: absolute;
  top: 84px;
  left: 0px;
  right: 0;
  bottom: 1rem;
  overflow: scroll;
  max-width: 700px;
  min-width: 320px;
  margin: 0 auto;
  scrollbar()
  .title {
    line-height: 0.54rem;
    background: #eee;
    font-size: 0.24rem;
    padding: 0 0.2rem;
  }

  .wrap {
    background: #fff;
    overflow: hidden;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;

    .wrap-item {
      float: left;
      min-width: 0.8rem;
      line-height: 0.5rem;
      text-align: center;
      border: 0.02rem solid #666;
      margin: 0.1rem;
      padding: 0 0.1rem;
    }
  }

  .grapheme {
    background: #ffffff;
  }

  .border-bottom {
    &:before {
      border-color: #cccccc;
    }
  }

  .grap-item {
    box-sizing: border-box;
    line-height: 0.7rem;
    padding: 0 0.4rem;
  }
}
</style>
