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
    // 用户登录
    await this.baas.auth.login({username: 'huying', password: 'huying'}).then(user => {
      console.log(111, user)
    });
    // 获取记录列表
    await this.getRecordList();
    // 调用云函数
    this.baas.invoke('func_test').then(res => {
      console.log('云函数返回结果', res.data);
    })
    // this.realTimeDatabase();
  },
  unmounted() {
    this.myTableObject.unsubscribe(); // 取消订阅上述示例中数据表的新增数据动作
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
    /** 实时数据库功能测试 */
    realTimeDatabase() {
      try {
        this.myTableObject = new this.baas.TableObject('test');
        this.myTableObject.subscribe('create', {
          oninit: () => {
            console.log(`订阅成功==>`)
          },
          onevent: res => {
            console.log(`订阅推送==>`, res)
            this.getRecordList();
          },
          onerror: err => {
            console.log(`订阅断开==>`, err)
          },
        })
      } catch (e) {
        console.log(e.toString());
      }
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
