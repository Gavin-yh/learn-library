<template>
    <div>
        <ul class="list-bottom">
            <li class="list-item my-border">
                <span class="iconfont">&#xe60f;</span>
                <span>定位失败</span>
            </li>
            <li class="list-item">
                <span class="iconfont">&#xe602;</span>
                <router-link class="look-link" to = "/banner">必游榜单</router-link>               
            </li>
        </ul>
    </div>
</template>

<script>
export default {
   name :"list-bottom" 
}
</script>

<style lang="stylus" scoped>
    .list-bottom
        border-top 1px solid #eee
        display flex
        .list-item
            flex-grow 1
            height 1rem
            line-height 1rem
            text-align center
            background #ffffff
            .look-link
                color #000
        .my-border 
            border-right 2px solid #eee
</style>