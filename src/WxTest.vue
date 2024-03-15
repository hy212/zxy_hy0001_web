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


export default {
  name: 'WxTest',
  components: {
  }, data() {
    return {
      db: null,
      users: [],
      value: '',
      watcher: null,
    };
  },
 created() {
    this.initWithoutLogin();
    // this.initWithLogin();
  },
  unmounted() {
  },
  methods: {
    /** 未登录态 */
    async initWithoutLogin() {
      const { initCloud } = require('@wxcloud/cloud-sdk')
      const cloud = initCloud();
      // 声明新的 cloud 实例
      const c1 = new cloud.Cloud({
        // 必填，表示是未登录模式
        identityless: true,
        // 资源方 AppID
        resourceAppid: 'wx56193108f800382d',
        // 资源方环境 ID
        resourceEnv: 'hygzh-2gk5scd7d4d9478e',
      })
      await c1.init()
      this.db = c1.database();
      // 先取出集合记录总数
      const countResult = await this.db.collection('test').count();
      console.log('共享数据库test---countResult', countResult);
      this.realTimeDatabase();
    },
    /** 登录态（todo 待细化跑通流程） */
    async initWithLogin() {
      const { initCloud } = require('@wxcloud/cloud-sdk')
      const cloud = initCloud();
      const WX_OFFICIAL_ACCOUNT_APPID = 'wx56193108f800382d';
      const checkLoginOptions = {
        provider: 'OfficialAccount',
        appid: WX_OFFICIAL_ACCOUNT_APPID,
      }
      const result = await cloud.checkLogin(checkLoginOptions)
      console.log(cloud);
      console.log(`checkLogin result: `, result)
      if (result.errCode === 0 && result.loggedIn) {
        console.log(`checkLogin success`)

        const instance = window.instance = new cloud.Cloud({
          appid: WX_OFFICIAL_ACCOUNT_APPID,
          // 资源方 AppID
          resourceAppid: 'wx56193108f800382d',
          // 资源方环境 ID
          resourceEnv: 'hygzh-2gk5scd7d4d9478e',
        })
        const initResult = await instance.init()

        console.log(`instance inited`, initResult)
        console.log(`can use cloud instance to access resource now !`)

        const els = [...document.getElementsByClassName('display-none')]
        els.forEach(el => el.classList.remove('display-none'))
      } else {
        console.log(`checkLogin with sdk errCode ${result.errCode} errMsg ${result.errMsg}, will start oauth in 10s`)

        setTimeout(() => {
          try {
            cloud.startLogin({
              provider: 'OfficialAccount',
              appid: WX_OFFICIAL_ACCOUNT_APPID,
              scope: 'snsapi_base',
              redirectUri: 'http://localhost:8080/',
            })
          } catch (e) {
            console.error(`startLogin fail: ${e}`)
            console.warn(`will start OfficialAccount OAuth login in 10s.`)
          }
        }, 10000)
      }
      // 声明新的 cloud 实例
      const c1 = new cloud.Cloud({
        // 必填，表示是未登录模式
        identityless: false,
        appid: 'wx56193108f800382d',
        // 资源方 AppID
        resourceAppid: 'wx56193108f800382d',
        // 资源方环境 ID
        resourceEnv: 'hygzh-2gk5scd7d4d9478e',
      })
      console.log(c1);
      await c1.init()
      const db = c1.database();
      // 先取出集合记录总数
      const countResult = await db.collection('test').count();
      console.log('共享数据库test---countResult', countResult);
    },
    /** 获取数据列表 */
    async getRecordList() {
      const res = await this.db.collection('test').get();
      console.log('数据库记录-------', res);
      this.users = res.data.map(v=> v.username);
    },
    /** 添加记录 */
    async addRecords() {
      await this.db.collection('test').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          username: "learn cloud database",
        }
      })
      this.getRecordList();
    },
    /** 实时数据库功能测试 */
    realTimeDatabase() {
      this.watcher = this.db.collection('test').watch({
        onChange: (snapshot)=> {
          console.log('snapshot', snapshot);
          this.getRecordList();
        },
        onError: (err)=> {
          console.error('the watch closed because of error', err)
        }
      })
    },
  },}
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
