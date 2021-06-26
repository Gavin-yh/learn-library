<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    {{value}}
    <m-form :model = "model" :rules = "rules">
      <m-form-item label = "用户名" prop = "username">
        <m-input v-model="model.username" type="username"></m-input>
      </m-form-item>
      <m-form-item label = "密码" prop = "password">
        <m-input v-model="model.password" type="password"></m-input>
      </m-form-item>
    </m-form>
  </div>
</template>

<script>
import mInput from './components/mInput.vue'
import mFormItem from './components/mFormItem.vue'
import mForm from './components/mForm.vue'

export default {
  name: 'app',
  components: {
    mInput,
    mFormItem,
    mForm
  },
  data() {
    return {
      value: "dd",
      model: {
        username: "",
        password: ""
      },
      rules: {
        username: [{
          required: true,
          message: "请输入用户名"
        }],
        password: [{
          required: true,
          message: "请输入密码"
        }]
      }
    }
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
