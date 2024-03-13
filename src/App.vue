<template>
<!--  <img alt="Vue logo" src="assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div>
    <b>动态列表</b>
    <ul>
      <li v-for="item in users" :key="item">{{item}}</li>
    </ul>
    <div>
      <input v-model.trim="value" />
      <button @click="addRecords" :disabled="!value" style="margin-left: 5px;">新增数据</button>
    </div>
  </div>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      baas: null,
      users: [],
      value: ''
    };
  },
  async created() {
    this.baas = require('minapp-sdk');
    this.baas.init('84c4ee23bba6240808a2', {});
    await this.baas.auth.login({username: 'huying', password: 'huying'}).then(user => {
      console.log(111, user)
    });
    await this.getRecordList();
  },
  methods: {
    /** 获取数据列表 */
    async getRecordList() {
      let MyTableObject = new this.baas.TableObject('test');
      let query = new this.baas.Query();
      const res = await MyTableObject.setQuery(query).find();
      this.users = res.data.objects.map(v=> v.username);
    },
    /** 添加记录 */
    async addRecords() {
      let MyTableObject = new this.baas.TableObject('test');
      let MyRecord = MyTableObject.create();
      const res = await MyRecord.set({ username: this.value }).save();
      console.log(res);
      this.value = '';
      await this.getRecordList();
    },
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
