<template>
    <ul>
        <li  
            class="recom-content" 
            v-for = "item of recomment" 
            :key = "item.id"
            @click="change(item.name)"
        >
            <div
                class="re-content-wrap"
            >
                <div class="content-img">
                    <img :src = "item.images[0].url"/>
                </div>
                <div class="content-cont">
                    <p class="cont-name paddin">{{item.name}}</p>
                    <div class="cont-icon paddin">
                        <i class="iconfont">&#xe6d5;&#xe6d5;&#xe6d5;&#xe6d5;&#xe6d5;</i>
                    </div>
                    <div class="cont-info paddin">
                        <p class="info-com">5656条评论</p>
                        <p class="info-der">{{item.local}}</p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>

import { mapMutations } from 'vuex'
 export default{
     name: "recomList",
     props:["recomment"],
     methods: {
        ...mapMutations({
            changeName: "changeViewName"
        }),
        change (name){
            this.changeName(name)
            this.$router.replace(name)
　　　　　　 document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
            location.reload()//手动去刷新下页面，不然景点名字改了，不刷新的话，因为在同一个组件，activated 不会再重新发送请求，数据也没办法响应。
        }
    }
 }
</script>

<style lang="stylus" scoped>
        ul
            height: 0;
            padding-bottom: 252%;
            overflow: hidden;
            .recom-content
                padding: .1rem 0 .2rem .3rem 
                border-bottom: 2px solid #eee
                .re-content-wrap
                    display: flex
                    width: 100%
                    height: 100%
                    color: #000
                    .content-img
                        width: 2rem
                        height: 2rem
                    img 
                        width: 100%
                        height: 100%
                    .content-cont
                        margin: .4rem 0 0 .3rem
                        flex-grow: 1
                        .paddin
                            padding: .1rem 0
                    .cont-name
                        font-size: 19px
                        font-weight: bold
                        width 4rem
                        ellipsis()
                    .cont-icon
                        color: #ffb436
                        i
                            font-size: 10px !important
                    .cont-info
                        display: flex
                        .info-com
                            flex-grow 1
                        .info-der
                            width 1.5rem
                            text-align: right
                            padding-right: .2rem
                            ellipsis()
</style>