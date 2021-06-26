<template>
    <div class="register">
        <div class="back-icon border-right">
            <router-link tag = "i" to = "/login" class="iconfont icon ">&#xe64a;</router-link>
            <span class="register-head">注册</span>
        </div>
        <div>
            <mt-field label="用户名" v-model="userName" placeholder="请输入用户名"></mt-field>
            <mt-field label="密码" v-model="password" placeholder="请输入密码" type="password" ></mt-field>
            <mt-field label="手机号" v-model="tel" placeholder="请输入手机号" type="tel"></mt-field>
        </div>
        <div class="btn">
            <mt-button size="normal" @click="register" type="default">注册</mt-button>
            <router-link to = "/login"><mt-button size="normal" type="default">取消</mt-button></router-link>
        </div>
        <div class="success" v-show="showlog">
            <p>{{log_mes}}</p>
        </div>
    </div>    
</template>

<script>

import axios from 'axios'
export default {
   name: "register",
   data() {
       return{
            userName:'',
            password: '',
            tel:'',
            showlog: false,

            log_mes: ""
       }
   },
   methods: {
       register(){
            let formdata = new URLSearchParams()
            let name = this.userName.trim()
            let psw = this.password.trim()
            let tel = this.tel.trim()
            formdata.append('name',name)
            formdata.append('password',psw)
            formdata.append('tel',tel)
            axios.defaults.withCredentials = true
            axios.post("http://localhost:8088/travel_war/register", formdata)
                .then(res => this.success(res))
                .catch(e => this.error(e))
        },
        success(res) {
            this.log_mes = "注册成功!!!"
            this.showlog = true
            if(res.data.message === "注册成功") {
                setTimeout(() => {
                    this.$router.go(-1)
                    this.showlog = false
                }, 100)
            }
        },
        error(e) {
            this.log_mes = "注册失败!!!"
            this.showlog = true
            setTimeout(() => {
                 this.$router.go(-1)
                 this.showlog = false
            }, 100)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .register
        background #fff
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
        .btn
            margin-top 1.3rem
            display flex
            justify-content space-around
        .success
            &:after
                content ''
                display block
                position absolute
                top 0
                left 0
                bottom 0
                right 0
                opacity .7
                background #333
            p
                width 3.5rem
                height 2rem
                position absolute
                left 28%
                background #ffffff
                line-height 2rem
                text-align center
                z-index 2
</style>
