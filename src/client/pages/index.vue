<template>
<div style="background-color: rgba(204, 204, 204, 0.22);">
    
    <div class="app full-height" @click='noActive()'>
      <div class="appbar">
        <i class="iconfont icon-zk" @click="onActive()"></i>
        <span class="title">Home</span>
        <i class="iconfont icon-search"></i>

      </div>
     

    <div class="typebar" :class="{SwipeActive:isSwipeActive}" >
          <span 
          v-for="(item,index) in classArr" 
          @click="result(item,index)"
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
        <div class="item" v-for="(blog,index) in blogs" :key='blog.id' 
		    v-longtap="{fn:longtap,deleteBox:index}"
		 >
          <div class="userinfo" >
             <img :src="blog.avatar" alt="" v-if='blog.avatar'>
             <span style="rgb(70, 70, 70);">{{blog.username}}</span>
             <span style="justify-self:end;rgb(70, 70, 70);">{{friendlyDate(blog.updatedAt)}}</span>
          </div>
          <div class="title">
           {{blog.title}}
          </div>

          <div class="blogContent" 	@click="goBlogDetail(blog.id)">{{blog.content}}</div>

          <div class="icon" >
            <i class="iconfont icon-love"  
              @click="love(index,blog.id)"
              :key="index"
              :class="{ loveActive: loveSelect.indexOf(index) > -1 }"
            ></i><span style="    align-self: center;">{{blog.love}}</span>
            <i class="iconfont icon-share" style="color: rgb(128, 128, 128);justify-self: end;"></i>
          </div>
		  <div class="deleteBox" v-show="deleteBox === index" @click="deleteMessage(index)">
			  <span>Detele This Message</span>
		  </div>

		<!-- <social-sharing url="https://vuejs.org/"
							title="The Progressive JavaScript Framework"
							description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
							quote="Vue is a progressive framework for building user interfaces."
							hashtags="vuejs,javascript,framework"
							twitter-user="vuejs"
							inline-template>
								<div>
									<network network="email">
										<i class="fa fa-envelope"></i> Email
									</network>
									<network network="googleplus">
										<i class="fa fa-google-plus"></i> Google +
									</network>
									<network network="weibo">
										<i class="fa fa-weibo"></i> Weibo
									</network> 

								</div>
		</social-sharing> -->
        </div>

        <!--底部判断是加载图标还是提示“全部加载”-->
        <div class="more_loading" v-show="!queryLoading" style="height: 6vh;text-align: center;line-height: 6vh;">
            <mt-spinner type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
            <span v-show="allLoaded">No more data..</span>
        </div>
    
      </div>

      <Slide id="slide" :class="{activeClass:isActive}" v-on:noActive='changeActive($event)'  v-on:userInfo ='getUserInfo($event)'></Slide>
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
import { userInfo } from 'os';


export default {
  components: { 
    Slide
  },
  inject:['reload'],
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
      //////////////////////
      loveSelect:[],
      deleteBox:null,
      findBy:'findAllBlog',
      userInfo
    }
  },
  created(){
      this.getAllblog()
  },
  methods: {
    getAllblog(){
      this.$axios.post('/auth/' + this.findBy,{page:this.pageNum,pageSize:this.pageSize}).then(res=>{
          console.log(res)
          this.blogs = res.data.rows
      })
    },
    initLoadingDate(){
      this.queryLoading=false
      this.moreLoading = false
      this.allLoaded = false
      this.totalNum =0
      this.pageSize = 5
      this.pageNum = 1
    },
    onActive(){
      console.log('click')
      event.stopPropagation(); 
      this.isActive = true;
      console.log(this.isActive)
    },
    noActive(){
      event.stopPropagation(); 
      this.isActive = false;
    },
    changeActive(data){
      console.log('change!')
      this.isActive = data
    },
    result(item,index){
      this.num = index
      if(item === 'New'){
        // this.blogs = this.blogs.sort(compare('createdAt'))
        // console.log(this.blogs)
          this.findBy = 'findAllBlog'
          this.initLoadingDate()
          this.getAllblog()
      }else{
        // this.blogs = this.blogs.sort(compare('love'))
          this.findBy = 'findAllBlogByLove'
          this.initLoadingDate()
          this.getAllblog()
        }
	},
    love(index,id,lovenum){
		  console.log(event.currentTarget)
      if(this.loveSelect.indexOf(index) > -1){
          this.loveSelect.splice(this.loveSelect.indexOf(index),1)
          this.$axios.post('/auth/noloveBlog',{id:id}).then(res=>{
          this.blogs[index].love--
        })
      }else{
        this.loveSelect.push(index)
        console.log(this.loveSelect)
        this.$axios.post('/auth/loveBlog',{id:id}).then(res=>{
			this.blogs[index].love++
        })
      }
    },

    swipeup(){
      this.isSwipeActive = true
    },
    swipedown(){
      this.isSwipeActive = false
    },
    longtap(index){
      this.deleteBox = index.deleteBox
      console.log(this.deleteBox)
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
        
        this.$axios.post('/auth/'+ this.findBy,{page:this.pageNum,pageSize:this.pageSize}).then(res=>{
            console.log(res)
            this.blogs = this.blogs.concat(res.data.rows)
            this.allLoaded = res.data.rows.length < this.pageSize;
            this.moreLoading = this.allLoaded;
        })
	},
	deleteMessage(index){
		this.deleteBox = null
	  this.$toast({ message:'This is not your message',duration:1000})
	},
	goBlogDetail(id){
    console.log(id)
     this.$router.push({path:'/blogDetail',query:{queryid:id,userInfo:this.userInfo}})
    // this.$router.push({name:'blogDetail',params:id})
  },
  getUserInfo(data){
    this.userInfo = data
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
  50%{font-size: 2.2vh;}
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
  animation: love .4s  ease  1;
}
html{
  height: 100%;
  font-size: 2vh;
  font-family:'SegoeWP';
}
body {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  height: 100%;
  margin: 0!important;
  user-select:none!important;
  padding: 0!important;

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
  	font-family:'SegoeWP';
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
	  z-index: 1;
    top: 10vh;
    color: #828282;
    background-color: white;
    font-size: 2vh!important;
    text-align: center;
    line-height: 10vh;
  	font-family:'SegoeWP';
    // box-shadow: 0 8px 10px -5px #00000014;
    // -moz-box-shadow: 0 8px 10px -5px #00000014;
	  // -webkit-box-shadow: 0 8px 10px -5px #00000014;
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
      position:relative;
      // box-shadow: 0 0 36px -1px #0000001f;
      // -moz-box-shadow:  0 0 36px -1px #0000001f;
		// -webkit-box-shadow: 0 0 36px -1px #0000001f;
	.deleteBox{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		border-radius: 4px;
		color: #ffffff;
		font-size: 2vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #444444c2;
			span{
				padding: 1vh 3vh;
				background: #ff6262;
				border-radius: 41px;
			}
		}
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
	  .title{
		padding: 0 2vh;
		color: black;
		font-weight: 500;
		overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
	  }
	  .blogContent{
		padding: 0 2vh;
		color: #b5b5b5;
		line-height: 20px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
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
