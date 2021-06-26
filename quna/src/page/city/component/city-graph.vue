<template>
    <div class="wrap">
       <ul class="wrap-item">
           <a 
            :ref = "key" 
            class="item" 
            v-for = "(val , key) of cities" 
            :key = "key"
            @click = "scroll"
           >
             {{key}}
           </a>
       </ul> 
    </div>
</template>

<script>
export default {
   name: "city-graph",
   props: {
       cities : Object,
   },
   data (){
       return {
           touchStatus : false,
           Aposition : 134,
           graphList: [],
           num : 0,
           time: null
       }
   },
   methods:{
       scroll (e){
           document.getElementById(e.target.innerText).scrollIntoView(true); 
        //    document.getElementsByClassName("list-wrap")[0].style.marginTop = ""
        //    document.getElementsByClassName("list-wrap")[0].style.marginTop = "1.7rem"
       },
       getGp (e){
           this.$emit("export",e.target.innerText)
       },
       touchstart (e){
           this.touchStatus = true
           for(let i in this.cities){
               this.graphList.push(i)
           }
       },
       touchmove (e){
           //因为touchmove得触发频率很高，做一个节流，使得页面得性能有所提升
           if(this.time){
               clearTimeout(this.time)
           }
           this.time = setTimeout(() => {
               if(this.touchStatus){
                    const movePosition = e.touches[0].clientY
                    this.num = Math.floor((movePosition - this.Aposition) / 22)
                    if(this.num >= 0 || this.num < this.graphList.length){
                        console.log(this.graphList[this.num])
                            this.$emit("export",this.graphList[this.num])
                    }
                }
           }, 16);
           
       },
       touchend (){
           this.touchStatus = false
       }
   },

}
</script>

<style lang="stylus" scoped>
        .wrap-item
            display flex
            flex-direction column 
            justify-content center
            position fixed
            top 2.58rem
            right 0
            width .4rem
            // bottom 0
            .item 
                text-align center
                line-height .44rem


</style>
