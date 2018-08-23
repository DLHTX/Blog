<template>
    <div id="login">
        <router-link style="margin-top:2vh;display: block;" to='/'><i class="iconfont icon-shangjiantou"  ></i></router-link>

        <div>
            <Upload class="upload"  v-on:imageUrl='getAvatar($event)'></Upload>
        </div>
        <div style="margin-top: 15vh;"><input type="text" v-model="username" placeholder="Username/Phone"></div>
        <div><input type="password" v-model="password" placeholder="Password"></div>
        <div><input type="password" v-model="password1" placeholder="Type your password again"></div>

       <div @click="onRegister()" class="loginBtn">Register</div>
       <router-link style="margin-top: 2vh;display:block;" to='/register'>Login</router-link>
    </div>

</template>

<script>
 import Upload from '../components/upload.vue'
// import { mapActions } from 'vuex'

    export default {
        components:{
            Upload
        },
        data () {
            return {
                username:null,
                password:null,
                password1:null,
                avatar:'http://pdsvnon20.bkt.clouddn.com/lyttonThu Aug 23 2018 09:44:57 GMT+0800 (中国标准时间)43.jpg'
            }
        },
        methods: {
            // ...mapActions(['register']),
            onRegister(){
                if(this.username == null||this.password === null){
                    this.$toast({message:'用户名或密码不能为空',duration:1000})
                }
                else if( (/^[a-zA-Z0-9_-]{4,16}$/).test(this.username)){
                    if(this.password === this.password1 ){
                        this.$axios.post('/auth/register',{username:this.username,password:this.password,avatar:this.avatar}).then(res=>{
                            console.log(res)
                            if(res.data.status === 0 ){
                                this.$toast({ message:'注册成功',duration:1000})
                                this.$router.push('/login')
                            }else{this.$toast({message:'用户名已存在',duration:1000})}
                        })}
                }else{this.$toast({message:'用户名必须为4-16位',duration:1000})}
                // else if(this.password === this.password1 ){
                //     this.$axios.post('/auth/register',{username:this.username,password:this.password}).then(res=>{
                //         console.log(res)
                //         if(res.data.status === 0 ){
                //             this.$toast({ message:'登陆成功',duration:1000})
                //             this.$router.push('/')
                //         }else{this.$toast({message:'登陆失败',duration:1000})}
                //     })
                // }
            },
            goback(){
                this.$router.push('/')
            },
            getAvatar(data){
                 this.avatar = data
                 console.log(this.avatar)
            }
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
            border-bottom: 1px solid #c5c5c5;
            padding: 1vh;
            margin: 2vh;
            transition: all .3s;
            &:focus{
                 border-bottom: 1px solid #6cc372;
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
