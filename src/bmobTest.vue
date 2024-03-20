<template>
  <!--  <img alt="Vue logo" src="assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->

 授权页面

</template>

<script>
import Bmob from "hydrogen-js-sdk";

export default {
  name: 'BmobTest',
  components: {
  },
  data() {
    return {
      baas: null,
      users: [],
      value: '',
      myTableObject: null,
    };
  },
  async created() {
    console.log(111);
    Bmob.initialize("aefae693045cacfc", "f84d78e84386aa91635eb04b0cf2df31");
    let params = {
      username: 'huying',
      password: 'huying',
    }
    await Bmob.User.register(params);
    Bmob.User.login(params.username, params.password).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  unmounted() {
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
