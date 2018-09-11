<template>
    <div id="login">
        <router-link style="margin-top:2vh;display:block;" to='/'><i class="iconfont icon-shangjiantou"  ></i></router-link>

        <div style="font-size: 5vh;margin-top:6vh;" >
            <img src="../static/img/avatar.png" alt="">
        </div>
        <div style="margin-top: 15vh;"><input type="text" v-model="username" placeholder="Username/Phone"></div>
        <div><input type="password" v-model="password" placeholder="Password" @keyup.enter= 'onLogin()'></div>

       <div @click="onLogin()" class="loginBtn">Login</div>
       <router-link style="margin-top: 2vh;display:block;" to='/register'>Register</router-link>
    </div>

</template>

<script>
 import Upload from '../components/upload.vue'
 import { mapGetters, mapActions } from 'vuex'
 import CHAT from '../lib/client.js'
// import { mapActions } from 'vuex'

    export default {
        components:{
            Upload
        },
        data () {
            return {
                username:null,
                password:null
            }
        },
        methods: {
            // ...mapActions(['register']),
            ...mapActions([
                'checkLogin',
                'login'
            ]),
            onLogin(){
                if(this.username == null||this.password === null){
                    this.$toast({message:'用户名或密码不能为空',duration:1000})
                }else{
                    // this.$axios.post('/auth/login',{username:this.username,password:this.password}).then(res=>{
                    //     console.log(res)
                    //     if(res.data.status === 0 ){
                    //         this.$toast({ message:'登陆成功',duration:1000})
                    //         this.$router.push('/')
                    //     }else{this.$toast({message:'用户名或密码错误',duration:1000})
                    //     }
                    // })
                    console.log('1')
                    this.login({username:this.username,password:this.password}).then(res=>{
                       if(this.isLogin){
                            this.$toast({ message:'登陆成功',duration:1000})
                           
                            this.$router.push({path: this.$route.query.redirect || '/'})
                        }else{
                            this.$toast({message:'用户名或密码错误',duration:1000})}
                        })
                    }
            },
            goback(){
                this.$router.push('/')
            }
        },
        computed:{
        ...mapGetters([
            'isLogin',
            'user'
        ])
    }

           

    }

</script>

<style lang='less'>
.mint-toast{
    padding: 1vh 4vh;
    border-radius: 33px;
    position: absolute;
    top: 2%;
    left: 50%;
    background-color: #6cc372;
    color: white;
    transform: translateX(-50%);
}
    #login{
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        background-color: white;
        text-align: center;
        .upload{
            .el-upload{
                height: 0;
                    margin-bottom: 20vh;
            }
            input{
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
                -webkit-user-select: none;
                -moz-user-focus: none;
                -moz-user-select: none;
                -webkit-appearance:none;
                outline: none;
                border: none;
                &:foucs{
                    outline:none;
                }
            }
        }
        input{
            font-size: 2vh;
            border: none;
            outline: none;
            width: 70%;
            border-bottom: 1px solid #969696!important;
            padding: 1vh;
            margin: 2vh;
            transition: all .3s;
            &:focus{
                border-bottom: 1px solid #6cc372!important;
                transition: all .3s;
            }
        }
        .loginBtn{
            margin-top: 4vh;
            display: inline-block;
            padding: 1vh 10vh;
            background-color: #6cc372;
            border-radius: 21px;
            box-shadow: 0 0 44px -9px #3a3a3a73;
            color: white;
        }
    }
    

</style>
