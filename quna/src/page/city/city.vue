<template>
  <div>
    <city-header :cities="cities"></city-header>
    <city-list :cities="cities" :hotcity = "hotcity"></city-list>
    <city-graph @export="childVal" :cities="cities"></city-graph>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import cityHeader from "./component/city-header";
import cityList from "./component/city-list";
import cityGraph from "./component/city-graph";
import footNav from "pubCom/footNav/footnav.vue"

import axios from "axios";

export default {
  name: "city",
  data() {
    return {
      cities: {},
      hotcity: [],
      graph: ""
    };
  },
  methods: {
    childVal(val) {
      if (val) {
        console.log(val);
        this.graph = val;
      }
    },
    getCity(data) {
      var newcities = {};
      data.forEach(item => {
        if (!newcities[item.keyword]) {
          newcities[item.keyword] = [];
        }
        newcities[item.keyword].push(item);
      });
      this.cities = newcities;
    },
    getHotCity(data) {
        var hotcity = [];
        data.forEach(item => {
            if (item.hot) {
                hotcity.push(item)
            }
        })
        this.hotcity = hotcity
    },
    getAllData() {
      axios.get("/api/city").then(res => {
        if (res.statusText == "OK") {
          let data = res.data;
          this.getCity(data);
          this.getHotCity(data)
        }
      });
    }
  },
  components: {
    cityHeader,
    cityList,
    cityGraph,
    footNav
  },
  mounted() {
    // axios.get('/city/data')
    //     .then(res => {
    //         if(res.data.codemsg){
    //             let data = res.data.data
    //             this.cities = data.cities
    //             this.hotcity = data.hotcity
    //         }
    //     })
    this.getAllData();
  }
};
</script>

<style lang="stylus" scoped></style>