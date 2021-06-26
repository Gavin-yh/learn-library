<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    axios.get('/api/info').then(res => {
      console.log(res)
    })
    .catch( err =>{
      console.log(err)
    })
  }
}
</script>