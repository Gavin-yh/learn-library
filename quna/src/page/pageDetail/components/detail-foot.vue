<template>
    <div class="foot-wrap">
        <div class="foot-title border-bottom">
            <h3 class="title">看了该景点的人还看了</h3>
        </div>
        <recom-list :recomment = "recomment"></recom-list>
    </div>
</template>

<script>
import recomList from './recom-list.vue'


import axios from "axios"
export default {
    name: "detailFoot",
    data (){
        return {
            recomment: []
        }
    },
    components: {
        recomList
    },
    mounted (){
        axios.get('/api/home')
            .then(res => {
                    let Data = res.data
                    if(res.statusText == "OK"){
                        this.recomment = Data.recomment.reverse()
                    }
                })                
    }
}
</script>

<style lang="stylus" scoped>
    .foot-wrap
        z-index -1
        background #ffffff
        margin-top: .2rem;
        .foot-title
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

</style>