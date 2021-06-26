<template>
  <div>
      <cube-form
        :model="model"
        :schema="schema"
        @validate="validateHandler"
        @submit="submitHandler"
    ></cube-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            model: {
                username: "",
                password: ""
            },
            schema: {
                fields: [
                    {
                        type: 'input',
                        modelKey: 'username',
                        label: '用户名',
                        props: {
                        placeholder: '请输入'
                        },
                        rules: {
                        required: true
                        },
                        // validating when blur
                        trigger: 'blur'
                    },
                    {
                        type: 'input',
                        modelKey: 'password',
                        label: '密码',
                        props: {
                        placeholder: '请输入密码',
                        type: 'password',
                        eye: {
                            open: false
                        }
                        },
                        rules: {
                        required: true
                        },
                        // validating when blur
                        trigger: 'blur',
                    },
                    {
                        type: 'submit',
                        label: 'Submit'
                    },
                    {
                        type: 'reset',
                        label: 'Reset'
                    }
                ]
            },
        }
    },
    methods: {
        submitHandler(e) {
            let _this = this
            e.preventDefault()
            this.$store.dispatch('login', this.model)
                .then( code => {
                    console.log(code)
                    if (code) {
                        //this.$route 是路由参数对象
                        const path = this.$route.query.redirect || "/"
                        //this.$router是路由导航对象，可以用js操作路由的前进、后退
                        _this.$router.push(path)
                    }
                })
                .catch( err => {
                    console.log(err.response.data.error)
                    const toast = this.$createToast({
                    time: 2000,
                    txt: err.response.data.error || "重新登入",
                    type: 'error'
                })
                toast.show();
            })
        },
        validateHandler(result) {
            console.log(result)
        },
        resetHandler(e) {
            console.log('reset', e)
        }
    }
}
</script>

<style>

</style>