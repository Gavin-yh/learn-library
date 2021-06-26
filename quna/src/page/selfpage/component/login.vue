<template>
    <div class="login-wrap">
        <div class="back-icon border-right">
            <router-link tag = "i" to = "/selfpage" class="iconfont icon ">&#xe64a;</router-link>
            <span class="register-head">注册</span>
        </div>
        <div class="logo">
            <div>
                <img src="http://localhost:8081/photo/loading2.png" alt="">
            </div>
        </div>
        <div class="login-msg">
            <div>
                <form class="form">
                用户名:<input class="text" name="name" v-model="name" placeholder="请输入用户名" type="text">
                密码:<input class="text" name="password" v-model="psw" placeholder="请输入密码" type="password">
                <input type="button" @click="submit"  class="sub" value="登录">
                <router-link tag="button" class="rest" to="/register">注册</router-link>
                </form>
            </div>
        </div>
        <loading v-show="loadingStatus"></loading>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import loading from 'pubCom/loading/loading'

import axios from 'axios'
export default {
    name: "login",
    data() {
        return {
            name: '',
            psw: '',
            loadingStatus: false
        }
    },
    components:{
        loading
    },
    methods: {
        ...mapMutations({
            changeLoadS: 'changeLoadS',
            saveUserName: 'saveUserName'
        }),
        submit() {
            if (this.name && this.psw) {
                this.loadingStatus = true
                let formdata = new URLSearchParams()
                let name = this.name.trim()
                let psw = this.psw.trim()
                formdata.append('name',name)
                formdata.append('password',psw)
                formdata.append('tel','')
                axios.defaults.withCredentials = true
                axios.post("http://localhost:8088/travel_war/login", formdata)
                    .then(res => this.success(res))
                    .catch(e => this.error(e))
            }
        },
        success(res) {
            if (res.data.id && res.data.name) {
                this.saveUserName(res.data.name)
                this.changeLoadS('登录成功！！！')
                setTimeout(() => {
                    this.$router.go(-1)
                    this.changeLoadS('正在登录！！！')
                    this.loadingStatus = false
                }, 500);
            }
        },
        error(e) {
            console.log(e)
        }
    },
    watch: {
        $route(to, from){
            if (localStorage.userName) {

            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .login-wrap
        margin 0 auto
        max-width: 700px;
        min-width: 320px;
        Position absolute
        top 0
        left 0
        right 0
        bottom 0
        background #eee
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
            .register-head
                flex-grow 1
                margin-right .9rem
                text-align center
                line-height .84rem
                font-size: 0.34rem
                color: #ffffff
        .logo
            text-align center
            padding 1rem 0
            div
                width 140px
                height 140px
                display inline-block
                background #eee
                border-radius 50%
                img 
                    border-radius 50%
        .login-msg
            font-size .4rem
            div
                width 5rem
                line-height .8rem
                margin 0 auto
                .text 
                    padding-left .3rem
                    display block
                    height .7rem
                    width 5rem
                .sub
                    cursor pointer
                    margin .3rem .7rem 0 0
                    width 1.8rem
                    padding .1rem 0
                .rest
                    margin .3rem 0 0 .7rem
                    width 1.8rem
                    padding .1rem
                    cursor pointer
</style>