<template>
  <!--  <img alt="Vue logo" src="assets/logo.png">-->
  <!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->

 授权页面

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'ZxyTest',
  components: {
    // HelloWorld
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
    // sdk初始化
    this.baas = require('minapp-sdk');
    this.baas.init('84c4ee23bba6240808a2', {});
    this.baas.auth.thirdPartyAuth();
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
