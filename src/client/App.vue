<template>
  <div class="app full-height">
    <!-- <h1>{{ message }}</h1> -->
    <!-- <router-link :to="{ name: 'hello' }">Goto Hello</router-link> -->
    <!-- <div @click='onRegister'>注册</div> -->
    <div class="appbar">
      <i class="iconfont icon-zk"></i>
      <span class="title">Home</span>
      <i class="iconfont icon-search"></i>
    </div>





    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Express + Vue boilerplate-Konata9'
    }
  },
  created(){
      // this.$axios.post('/auth/findBlog').then(res=>{
      //     console.log(res)
      // })
       this.$axios.post('/auth/findAllBlog').then(res=>{
          console.log(res)
      })
      

  },
  methods: {
    // ...mapActions(['register']),
    onRegister() {
      // this.$axios.post('/auth/register',{username:'dlhtt',password:'1234'}).then(res=>{
      //     console.log(res)
      // })
      // this.$axios.post('/auth/login',{username:'dhty',password:'123456'}).then(res=>{
      //     console.log(res)
      // })
      // this.$axios.post('/auth/checkLogin').then(res=>{
      //   console.log(res)
      // })
      // this.$axios.post('/auth/creatBlog').then(res=>{
      //     console.log(res)
      // })
      


    }
  }
  
}
</script>

<style lang='less' >
html {
  height: 100%;
}

body {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: rgba(241, 247, 250, 1);
}

.app{
  height: 100vh;
  overflow:hidden;
  .appbar{
    height: 10vh;
    color: #828282;
    background-color: white;
    font-size: 5vh!important;
    text-align: center;
    line-height: 10vh;
    .icon-zk{
      float: left;
      font-size: 4vh;
      margin-left: 3vh;
    }
    .icon-search{
      float: right;
      font-size: 4vh;
      margin-right: 3vh;
    }
  }
}
</style>
