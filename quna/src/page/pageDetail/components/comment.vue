<template>
    <div class="com-wrap">
        <div class="com-title border-bottom">
            <h3 class="title">用户评论</h3>
        </div>
        <div class="com-content">
           <div v-for="(item ,inde) of com" :key = "inde">
                <div class="header">
                    <i class="iconfont">&#xe6d5;&#xe6d5;&#xe6d5;&#xe6d5;&#xe6d5;</i>
                    <span>莫** 2018-2-10</span>
                </div> 
                <div class="cont border-bottom">
                    <p class="cont-text">{{item.text}}
                        <!-- 客观的评价，时间刚刚好，便宜又实惠，7点集合地点搭车，然后出发，很快就到了景区，9点左右到达景区，导游取票，两小时游览，八达岭逛的时间就是太短了。天气很好，游客很少，这季节就这点好，八达岭长城很平缓，坡陡的地方比较少  ，挺适合游览,不过就是时间短，导游说11点就得发车，所以只能走马观花的游览。这点不能兼顾，如果真想完整的游览长城，最后一天，好好的观赏。12点20到达吃饭的地点，那地方靠近明十三陵，自助餐，非常不错的饭菜，很可口。这点值得 -->
                        <!-- 夸赞！然后12点40出发前往颐和园，13点40左右到达颐和园东门，导游买票，2点正式入园。两个小时的游园，导游精炼的讲解，非常棒，在听鹂馆，品茶吃点心，这点真是没有想到的，特别棒！然后一路游览，最后北门出，坐车回去，路经北大东门，下车拍照，奥林匹克公园下车，去水立方，鸟巢拍照，非常棒的一天！谢谢胡导游，很棒的一天，便宜实惠。真心觉得不错！不过有一点我不知道，我们团游客没有游览的景区票，像我喜欢收藏游票的人真的觉得有票存留特别棒！我们是学生票，最后胡导还退钱给我们了，这点这家旅行社真的非常有良心，很少见！值得信赖，要是第一次来北京不知道怎么玩，就选这家吧！真的超级实惠！ -->
                    </p>
                    <div class="img">
                        <div class="img-item" 
                             v-for="(img ,index) of item.commentImg" 
                             :key = "index"
                             @click = "getUrl(item.commentImg ,index)"
                        >
                            <img @click = "changeShowImg" :src="img" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-more">
                <p class="iconfont">查看更多&#xe632;</p>
            </div>
        </div>
        <gallary-bar :index = "index" :gallaryUrl = "url"  v-show="showImg" @changeImgShow = "changeImgShow"></gallary-bar>
    </div>
</template>

<script>

import gallaryBar from "pubCom/gallary/gallary.vue"

export default {
   name: "comWrap",
   data (){
       return {
           showImg: false,
           url: [],
           index: 0
       }
   },
   props: ["com"],
   components: {
       gallaryBar
   },
   methods: {
       changeShowImg (){
           this.showImg = true
       },
       changeImgShow (){
           this.showImg = false
       },
       getUrl (arrUrl, index){
        //    console.log(arrUrl)
           this.url = arrUrl
           this.index = index
        //    console.log(this.index)

       }
   },
   mounted (){


   },
   activated (){
   }
}
</script>

<style lang="stylus" scoped>
    .com-wrap
        z-index -1
        background #ffffff
        margin-top: .2rem;
        .com-title
            .title
                padding: 0 .1rem;
                height: .88rem;
                background: #fff;
                color: #333;
                font-size: .3rem;
                line-height: .88rem;
                text-indent: .2rem;
                &::before
                    display inline-block
                    content ""
                    height .25rem
                    width .04rem
                    background #00f
                    margin-right .2rem
        .com-content
            .header
                padding .2rem .4rem 0rem
                i
                    color: #ffb436
                    font-size: 10px !important
                span 
                    float right
            .cont
                padding-bottom .3rem
                p
                    text-indent .1rem
                    text-align justify
                    word-break break-all
                    padding .1rem .15rem
                    line-height .42rem
                    font-size .26rem
                    color #616161
                .img
                    margin-bottom .1rem
                    .img-item
                        width: 33.33%;
                        display inline-block
                        box-sizing border-box
                        padding .05rem
                        img
                            width 100%
        .search-more
            height .6rem
            border-top 1px dashed #eee
            p
                line-height .62rem
                font-size 16px
                text-align center

</style>