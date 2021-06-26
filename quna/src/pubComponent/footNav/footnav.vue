<template>
  <div class="foot_nav">
    <div>
      <router-link tag="i" to="/" class="iconfont" @click.native="changeS('home')" :class="{blue:homeBlue}">&#xe61a;</router-link>
    </div>
    <div>
      <router-link tag="i" to="/banner" class="iconfont" @click.native="changeS('cat')" :class="{blue:catBlue}">&#xe648;</router-link>
    </div>
    <div>
      <router-link tag="i" to="/selfpage" class="iconfont" @click.native="changeS('sel')" :class="{blue:selBlue}">&#xe636;</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "footNav",
  data() {
    return {
      homeBlue: true,
      catBlue: false,
      selBlue: false
    };
  },
  methods: {
    saveS(home, cat, sel) {
      var blue = {
          homeBlue: home,
          catBlue: cat,
          selBlue: sel
      }
      localStorage.Blue = JSON.stringify(blue)
    },
    changeS(Status) {
      switch (Status) {
        case "home":
          this.homeBlue = true;
          this.catBlue = false;
          this.selBlue = false;
          this.saveS(this.homeBlue,this.catBlue,this.selBlue)
          break;
        case "cat":
          this.homeBlue = false;
          this.catBlue = true;
          this.selBlue = false;
          this.saveS(this.homeBlue,this.catBlue,this.selBlue)
          break;
        case "sel":
          this.homeBlue = false;
          this.catBlue = false;
          this.selBlue = true;
          this.saveS(this.homeBlue,this.catBlue,this.selBlue)
          break;
      }
    }
  },
  mounted() {
      if(localStorage.Blue) {
        var blue = JSON.parse(localStorage.Blue)
        this.homeBlue = blue.homeBlue
        this.catBlue = blue.catBlue
        this.selBlue = blue.selBlue
      }
  },
};
</script>

<style lang="stylus" scoped>
.foot_nav
    max-width 700px
    min-width 320px
    display flex
    justify-content space-around
    position absolute
    bottom 0
    height 1rem
    width 100%
    border-top 1px solid #eee
    div
        width 33.33%
        text-align center
        i
            font-size .6rem
            height 1rem
            display inline-block
            line-height 1rem
        .blue
            color blue
</style>
