<template>
<div class="slide" @click="stopPropagation()" :style="`left:${noActive.left};`">
    <div class="login" v-if="isLogin">
        <img :src= "user.avatar" alt="" v-if= "user">
        <router-link to="/login"  class="loginBtn">{{user.username}}</router-link>
    </div>
    <div class="login" v-if="!isLogin">
        <img src= "../static/img/avatar.png" alt="">
        <router-link to="/login"  @mouseover.native="noActive()" class="loginBtn">登录</router-link>
    </div>

    <div class="icon">
        <div class="fabu"  @click="goCreate()">
            <i class="iconfont icon-fabu"></i>
            <span>发布</span>
            <i class="iconfont icon-youjiantou" style="float:right;"></i>
        </div>
        <div class="pinglun">
            <i class="iconfont icon-pinglun"></i>
            <span>评论</span> 
            <i class="iconfont icon-youjiantou" style="float:right;"></i>
        </div>
        <div class="shoucang">
            <i class="iconfont icon-shoucang "></i>
            <span>收藏</span>
            <i class="iconfont icon-youjiantou" style="float:right;"></i>
        </div>
        <div class="boke">
            <i class="iconfont icon-blog "></i>
            <span>我的</span>
            <i class="iconfont icon-youjiantou" style="float:right;"></i>
        </div>
        <div class="zhuxiao" v-if="isLogin" @click="onlogout()">
            <i class="iconfont icon-logout" style="color: #ff7979;"></i>
            <span  style="color: #ff7979;">注销</span>
            <i class="iconfont icon-youjiantou" style="float:right; color: #ff7979;"></i>
        </div>


    </div>


 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Slide',
    // props:[
    //     'isLogin','userInfo'
    // ],
    data(){
        return{
            Active:false,
        }
    },
    computed:{
        ...mapGetters([
            'isLogin',
            'user'
        ])
    },
    mounted(){
        this.checkLogin()
    },
    methods:{
      ...mapActions([
        'checkLogin',
        'logout'
       ]),
      stopPropagation(){
        event.stopPropagation(); 
      },
      onlogout(){
            this.logout().then(res=>{
                if(this.isLogin ){
                    this.$toast({ message:'注销成功',duration:1000})
                }
            })
      },
      noActive(){
          this.$emit('noActive',this.Active)
          //通过this.$emit实现子组件改变父组件的值！！！！！！！！
      },
      goCreate(){
          if(!this.isLogin){
            this.$toast({ message:'尚未登录',duration:1000})
          }else{
            this.$router.push({name:'create'})
          }
      }
    },


}
</script>

<style lang='less' scoped>
    .slide{
        height: 100vh;
        width:80%;
        background-color: white;
        position: absolute;
        box-shadow: 0 0 31px -8px #0e0e0e4a;
        -moz-box-shadow:0 0 31px -8px #0e0e0e4a;
	    -webkit-box-shadow:0 0 31px -8px #0e0e0e4a;
        z-index: 999;
        top: 0;
        left: -90%;
        transition:all .2s;
        opacity: 0;
        .login{
            font-family:'Raleway';
            height: 20vh;
            display: grid;
            img{
                height: 10vh;
                width: 10vh;
                border-radius: 50%;
                justify-self: center;
                align-self: center;
            }
            .loginBtn{
                text-decoration: none;
                color: #969696;
                padding: 0.5vh 6vh;
                border: 1px solid #afafaf;
                border-radius: 41px;
                font-size: 1.5vh;
                justify-self: center;
                align-self: center;
            }
        }
        .icon{
            padding: 1vh 3vh;
            div{
                font-size: 2vh;
                height: 6vh;
                line-height: 6vh;
                border-bottom: 1px solid #efefef;
                i{
                  font-size: inherit;
                  color: #408474;
                }
            }
        }
    }
</style>
