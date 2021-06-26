<template>
   <div class="self-list">
       <div class="money-bar bar">
           <ul>
               <li class="money">
                   <span>余额</span>
                   <span class="mes" ><i class="iconfont" style="margin-right: .1rem">&#xe603;</i>{{money}}</span>
               </li>
               <li class="ticket">
                   <span>优惠卷</span>
                   <span class="mes">{{ticket}}</span>
               </li>
           </ul>
       </div>
       <div class="setting-bar bar">
           <ul>
               <li class="money">
                   <span>意见反馈</span>
               </li>
               <li class="ticket">
                   <span>设置</span>
               </li>
           </ul>
       </div>
       <div class="login-out" v-show="login_out">
           <p @click="loginOut">注销</p>
       </div>
   </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    name: "selfList",
    data() {
        return {
            money: "0.00",
            ticket: "0",
            login_out: false
        }
    },
    methods:{
        ...mapMutations({
            saveUserName:"saveUserName"
        }),
        loginOut() {
            console.log('s')
            axios.get('http://localhost:8088/travel_war/logout')
                .then(res => {
                    console.log(res)
                    this.login_out = false
                    this.saveUserName('未登录')
                    // localStorage.userName = '未登录'
                })
                .catch(e => {
                    console.log(e)
                })
        },
        changeOutS() {
            if (localStorage.userName !== '未登录') {
                this.login_out = true
            }else{
                this.login_out = false
            }
        }
    },
    watch: {
        $route(to, from) {
            this.changeOutS()
        }
    },
    mounted() {
        this.changeOutS()
    }
}
</script>

<style lang="stylus" scoped>
    .self-list
        margin-top .2rem
        .bar
            background #fff
            li
                height 1rem
                line-height 1rem
                border-bottom 1px solid #eee
                padding-left .4rem
                position relative
                .mes
                    position absolute
                    right .7rem
        .setting-bar
            margin-top .2rem
        .login-out
            p
                height 1rem
                background #ccc
                margin-top .2rem
                color #0fe
                font-size: .4rem
                line-height 1rem
                text-align center
</style>
