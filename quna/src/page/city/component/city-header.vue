<template>
    <div class="cityheader">
        <div class="header-bar">
            <p @click="go"  class="back-btn">
                <i class="back iconfont">&#xe64a;</i>
            </p>
            <h1 class="title">城市选择</h1>
        </div>
        <div class="header-search">
            <input v-model="keyword" type = "text" placeholder = "请输入城市名或拼音"/>
        </div>
        <div  class="search-list-content"  ref = "s-l-c" v-show="Status">
            <ul>
                <li class="search-list-item border-bottom" @click = changeHotCity(item.name) v-for="(item,key) of list" :key = key>{{item.name}}</li>
                <li class="search-list-item border-bottom" v-show="noData">没有相应的数据...</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Bscroll from "better-scroll"
import { mapState ,mapMutations } from "vuex"

export default {
    name: "cityheader",
    data (){
        return {
            keyword : '',
            time : null,
            list : [],
            Status : false, //search-list-content
        }
    },
    props: {
        cities : Object
    },
    methods : {
        ...mapMutations({
            changeState : "changeState"
        }),
        changeHotCity(val){
            this.changeState(val)
            this.go()
        },
        go (){
            console.log("go run ")
            this.$router.go(-1)
        }
    },
    computed : {
        noData (){
            return !this.list.length
        },
        //  noData 控制没有数据时 no-data 的显隐
    },
    watch : {
        keyword (){
            if(this.time){
                clearTimeout(this.time)
            }
            if(!this.keyword){
                this.list = []
                this.Status = false //当没值时 列表隐藏
                return
            }else{
                const result = []
                this.Status = true //当输入框 有值时 列表显示
                this.time = setTimeout(() => {
                    for (let i in this.cities){
                        this.cities[i].forEach(el => {
                        if(el.name.indexOf(this.keyword) != -1 || el.spell.indexOf(this.keyword) != -1){
                            result.push(el)  //有个误区  直接用this.list来push，造成this.list里面一直有上次输入的，没清空，用result ，每次改变时 都是一个新的数组
                        }
                        });
                    }
                }, 200);
                this.list = result
            }
        }
    },
    mounted (){
        this.scroll = new Bscroll(this.$refs["s-l-c"],{click:true}) //创建better-scroll的实例 参数用$refs获取的dom 元素
    },
    //当页面从其他地方加载时，初始化搜索框的数据
    //（当没有初始化时，在次进入页面，由于是单页应用，页面不会刷新，导致上一次的操作还在，
    //如搜索框里上次搜的词条, search-list-content 没有隐藏）
    activated (){
        this.Status = false
        this.keyword = ""
    }
}
</script>

<style lang="stylus" scoped>
    @import '~style/mixin.styl'
    .cityheader
        width: 100%;
        z-index 9
        background #00BCD4
        .header-bar
            height .86rem
            line-height .86rem
            display flex
            .back-btn
                display inline-block
                color #ffffff
                height .8rem
                width .86rem
                text-align center
                i 
                    vertical-align middle
                .back
                    font-size .6rem
            .title
                display inline-block
                flex-grow 1
                margin-right .86rem
                text-align center 
                color #ffffff
                font-size .36rem
                ellipsis()
        .header-search
            padding .1rem .1rem
            input 
                box-sizing border-box
                width 100%
                height .62rem
                line-height .62rem
                text-align center
                padding 0 .1rem
                color #666
                border-radius .1rem
        .search-list-content
            position absolute 
            top 1.64rem
            left 0 
            bottom 0
            right 0
            z-index 1
            background #eee
            overflow hidden
            .search-list-item
                background #ffffff
                line-height .7rem
                padding-left .2rem

</style>
