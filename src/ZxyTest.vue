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
    // const res = await this.baas.auth.getRedirectResult();
    // console.log('授权结果-----', res);
    // 设置 createUser 参数为 false，避免直接创建一个账户
    // console.log(this.baas);
    // this.baas.auth.loginWithThirdParty('oauth-wechat-web', 'http://localhost:8080/zxyAuth').then(user => {
    //   // 已经有用户记录，不是第一次登录，进入正常业务流程。
    //   console.log('登录成功--', user);
    // }, err => {
    //   console.log(err);
    //   // 登录失败，没有账户记录。
    //   // 这时候可以让用户先通过 wx.auth.register() 注册一个账户，或者 wx.auth.login() 登录一个已有账户，再使用 linkWechat 进行绑定，这里以登录账户为例
    //   // if (err.code === 404) {
    //   //   this.baas.auth.login({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
    //   //     user.linkWechat().then(res => {
    //   //       console.log(res.statusCode)
    //   //       // 关联成功，下次可以通过 wx.BaaS.auth.loginWithWechat 登录了
    //   //     })
    //   //   })
    //   // }
    // })
    // 用户登录
    await this.baas.auth.login({username: 'huying', password: 'huying'}).then(user => {
      console.log(111, user)
    });
    // 获取记录列表
    await this.getRecordList();
    // 调用云函数
    // this.baas.invoke('func_test').then(res => {
    //   console.log('云函数返回结果', res.data);
    // })
    // this.realTimeDatabase();
  },
  unmounted() {
    // this.myTableObject.unsubscribe(); // 取消订阅上述示例中数据表的新增数据动作
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
