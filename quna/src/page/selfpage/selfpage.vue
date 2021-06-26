<template>
   <div class="selfpage">
      <self-header></self-header>
      <self-list></self-list>
      <foot-nav></foot-nav>
   </div> 
</template>

<script>

import selfHeader from './component/selfheader'
import selfList from './component/selfList'
import footNav from "pubCom/footNav/footnav.vue"

export default {
   name: "selfpage",
   components: {
      selfHeader,
      selfList,
      footNav
   }
}
</script>

<style lang="stylus" scoped>
   // .selfpage
   //    border-bottom 1px solid #eee
</style>
