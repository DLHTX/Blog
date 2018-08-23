<template>
<div>
    
    <div class="app full-height" @click='noActive()'>
      <div class="appbar">
        <i class="iconfont icon-zk" @click="onActive()"></i>
        <span class="title">Home</span>
        <i class="iconfont icon-search"></i>

      </div>
     

    <div class="typebar" :class="{SwipeActive:isSwipeActive}" >
          <span 
          v-for="(item,index) in classArr" 
          @click="result(index)"
          :key="index"
          :class="resultNum === index?'typebarActive':''"
          >{{item}}</span>
    </div>

      <div class="content" 
        v-swipeup="{fn:swipeup,name:'上滑'}"
        v-swipedown="{fn:swipedown,name:'下滑'}"
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="moreLoading" 
        infinite-scroll-distance="0" 
        infinite-scroll-immediate-check="false"
        >
        <div class="item" v-for="blog in blogs" :key='blog.id'>
          <div class="userinfo">
             <img :src="blog.avatar" alt="">
             <span style="rgb(70, 70, 70);">{{blog.username}}</span>
             <span style="justify-self:end;rgb(70, 70, 70);">{{friendlyDate(blog.createdAt)}}</span>
          </div>
          <div class="title" style="padding: 0 2vh;color: black;font-weight: 600;">
           {{blog.title}}
          </div>
          <div style="padding: 0 2vh;rgb(70, 70, 70);">
            {{blog.content}}
          </div>
          <div class="icon" >
            <i class="iconfont icon-love"  @click="love()"
              :class="{loveActive:isLoveActive}"
            ></i><span style="    align-self: center;">{{blog.love}}</span>
            <i class="iconfont icon-share" style="color: rgb(128, 128, 128);justify-self: end;"></i>
          </div>
        </div>

        <!--底部判断是加载图标还是提示“全部加载”-->
        <div class="more_loading" v-show="!queryLoading" style="height: 6vh;text-align: center;line-height: 6vh;">
            <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
            <span v-show="allLoaded">No more data..</span>
        </div>
    

      </div>

      <Slide id="slide" 
      :class="{activeClass:isActive}" 
      v-on:noActive='changeActive($event)'
      ></Slide>
    </div>
     <router-view></router-view> 
  </div>
  <!--  <div id="app" class="box" 
     v-tap="vuetouch" //vuetouch为函数名，如没有参数，可直接写函数名
     v-longtap="{fn:vuetouch,name:'长按'}" //如果有参数以对象形式传，fn 为函数名
     v-swipeleft="{fn:vuetouch,name:'左滑'}"
     v-swiperight="{fn:vuetouch,name:'右滑'}"
     v-swipeup="{fn:vuetouch,name:'上滑'}"
     v-swipedown="{fn:vuetouch,name:'下滑'}"
 >{{ name }}</div> -->

</template>

<script>
import Slide from '../../client/components/Slide'


export default {
  components: { 
    Slide
  },
  data () {
    return {
      isActive:false,
      classArr:['New','Popular'],
      num:0,
      isSwipeActive:false,
      isLoveActive:false,
      blogs:[],
      //初始化无限加载相关参数
      queryLoading: false,
      moreLoading: false,
      allLoaded: false,
      totalNum: 0,
      pageSize: 5,
      pageNum: 1,
    }
  },
  created(){
      this.$axios.post('/auth/findAllBlog',{page:this.pageNum,pageSize:this.pageSize}).then(res=>{
          console.log(res)
          this.blogs = res.data.rows 
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
    },
    onActive(){
      console.log('click')
      event.stopPropagation(); 
       this.isActive = true;
    },
    noActive(){
       console.log('click')
      event.stopPropagation(); 
       this.isActive = false;
    },
    changeActive(data){
      console.log('change!')
      this.isActive = data
    },
    result(index){
      this.num = index
    },
    love(){
      if(!this.isLoveActive){
         this.isLoveActive = true
      }else{
        this.isLoveActive = false
      }

    },
    swipeup(){
      this.isSwipeActive = true
    },
    swipedown(){
      this.isSwipeActive = false
    },
    loadMore() {
        console.log('loadMore')
        if(this.allLoaded){
          this.moreLoading = true;
          return;
        }
        if(this.queryLoading){
          return;
        }
        this.moreLoading = !this.queryLoading;
        this.pageNum++;
        
        this.$axios.post('/auth/findAllBlog',{page:this.pageNum,pageSize:this.pageSize}).then(res=>{
            console.log(res)
            this.blogs = this.blogs.concat(res.data.rows)
            this.allLoaded = res.data.rows.length <= this.pageSize;
            this.moreLoading = this.allLoaded;
        })
      
        // this.$http.post("请求后台数据的接口",Object.assign({pageNum:this.pageNum},this.params)).then((res) => {
        //   if(res.sData && res.sData.list){
        //     this.list = this.list.concat(res.sData.list);
            // this.allLoaded = this.debtList.length==this.totalNum;
        //   }
        //   this.moreLoading = this.allLoaded;
        // });
      }
  },
  computed:{
    resultNum(){
      return this.num
    },
    // params() {
    //     return{
    //       //这里先定义要传递给后台的数据
    //       //然后将每次请求20条的参数一起提交给后台
    //       pageSize: this.pageSize
    //       }
    //   }
  }
  
}
</script>

<style lang='less' >
@keyframes love{
  0% {font-size:2vh;}
  50%{font-size: 2.5vh;}
  100% {font-size:2vh;}
}
.SwipeActive{
  transition: all .2s!important;
  top: 0!important;
//   opacity: 0;
//   margin-top: -10vh;
//   z-index: -999;
//   position: absolute;
}
.activeClass{
  left :0!important;
  transition:all .2s!important;
  opacity:1!important;
}
.typebarActive{
  background-color: rgba(91, 219, 194, 1);
  color: white;

}
.loveActive{
  color: rgb(255, 109, 109)!important;
  transition:all .2s!important;
  animation: love .6s  ease  1;
}
html{
  height: 100%;
  font-size: 2vh;
  font-family:'Raleway';
}
body {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f1f7fa73;
}
a{
  text-decoration: none;
  color:inherit;
}

.app{
  height: 100vh;
  overflow:hidden;
  .appbar{
    // height: 16vh;
    position: absolute;
    width: 100%;
    height: 10vh;
    color: #828282;
    background-color: white;
    font-size: 4vh!important;
    text-align: center;
    line-height: 10vh;
    font-family:'Raleway';
    .icon-zk{
      float: left;
      font-size: 2.5vh;
      margin-left: 2vh;
    }
    .icon-search{
      float: right;
      font-size: 2.5vh;
      margin-right: 2vh;
    }
    #slide{
      background-color: red;
    }
    
  }
  .typebar{
    height: 10vh;
    position: absolute;
    width: 100%;
    top: 10vh;
    color: #828282;
    background-color: white;
    font-size: 2vh!important;
    text-align: center;
    line-height: 10vh;
    font-family:'Raleway';
    box-shadow: 0 8px 10px -5px #00000014;
    -moz-box-shadow: 0 8px 10px -5px #00000014;
	  -webkit-box-shadow: 0 8px 10px -5px #00000014;
    transition: all .2s;
    span{
      padding: .5vh 2vh;
      border-radius: 60px;
      margin: 0 2vh;
      }
    }
  .content{
    overflow: scroll;
    height: 80%;
    width: 100%;
    margin-top: 10vh;
    padding-top: 10vh;

    .item{
      width: 95%;
      margin: auto;
      border-radius: 4px;
      background-color: white;
      margin-top: 2vh;
      box-shadow: 0 0 36px -1px #0000001f;
      -moz-box-shadow:  0 0 36px -1px #0000001f;
	    -webkit-box-shadow: 0 0 36px -1px #0000001f;
      .userinfo{
        height: 8vh;
        font-size: 1.5vh;
        display: grid;
        grid-template-columns: 15% 45% 40%;
        display: gird;
        padding: 0 2vh;
        img{
          height:6vh;
            width: 6vh;
          border-radius: 50%;
          margin-right: 1vh;
          align-self: center;
        }
        span{
          align-self: center;
        }

      }
      .icon{
        display: grid;
        grid-template-columns: 5% 10% 85%;
        padding: 0 2vh;
        height: 5vh;
        i{
          align-self: center;
          font-size:2vh;
          color:rgb(167, 167, 167);
          transition:all .2s;
        }
      }
    }
  }
}
</style>
