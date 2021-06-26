<template>
  <div class="self_head">
    <div class="login_status">
      <i class="iconfont login_h">&#xe610;</i>
      <router-link to="/login" tag="span" class="login_mes">{{username}}</router-link>
      <i class=" iconfont right_logo">&#xe60f;</i>
    </div>
    <div class = "head_nav">
        <ul>
            <router-link tag = "li" to="/order">
                <i class="iconfont icon">&#xe601;</i>
                <p>订单管理</p>
            </router-link>
            <li>
                <i class="iconfont icon">&#xe613;</i>
                <p>收藏</p>
            </li>
        </ul>
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "selfH",
  computed:{
      ...mapState({
          username:state => state.username
      })
  },
  methods: {
      ...mapMutations({
          saveUserName: "saveUserName"
      })
  },
  mounted() {//防止刷新数据没啦
    if(localStorage.userName !== "未登录") { 
        this.saveUserName(localStorage.userName)
    }
  }
};
</script>

<style lang="stylus" scoped>
    .self_head
        background #ffffff
        padding-bottom .3rem
        .login_status
            padding-top .3rem
            .login_h
                font-size 1.4rem
                vertical-align middle
            .login_mes
                font-size .4rem
                font-weight bold
                margin-left 0.2rem
            .right_logo
                position absolute
                top .6rem
                right .6rem

        .head_nav ul
            padding-top .3rem
            display flex
            justify-content space-around
            li
                text-align center
                .icon
                    font-size .7rem
                p
                    margin-top .2rem
</style>
