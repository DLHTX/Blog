<template>
    <div style="height:100vh;overflow: hidden;">
        <div class="talkbar">
            <i class="iconfont icon-back" @click="goback()"></i>
            <span>群聊</span>
        </div>

        <div class="talkcontent" style=" height: 85%;overflow: scroll;" ref="talkcontent">
            <div class="talk" :class="[(msg1.fromUser===user.username)?rightClass:leftClass]"  v-for= '(msg1,index) in CHAT' :key= "index" >
                <div class="time">{{msg1.time}}</div>
                <div class="talkBox">
                    <img :src="msg1.avatar" alt="">
                    <span class='name'>{{msg1.fromUser}}</span>
                    <span class='text'>{{msg1.msg}}</span>
                </div>
            </div>
        </div>
        
         <div class="sendRemake">
            <input type="text" v-model="msg" @keyup.enter= 'submit'>   
            <span style='display: flex; align-items: center;height: 6vh;justify-content: center;'
            @click='submit'> <i class="iconfont icon-fasong" style="transform: rotateX(180deg);font-size: 25px;color: #616161;"> </i></span>
        </div>

        <!-- <i class="iconfont icon-back" @click="goback()"></i>
        <input type="text" v-model='msg'> 
        <button  @click="submit">发送</button>
        <div v-for= '(msg1,index) in CHAT' :key= "index" style="font-size: 17px;margin: 2vh 0;">
            <span>消息：{{msg1.msg}}</span>
            <span>来自：{{msg1.fromUser}}</span>
            <span>时间:{{msg1.time}}</span>
        </div> -->
    </div>
</template>

<script>
import CHAT from '../lib/client.js'
import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return {
            msg:'',
            CHAT:CHAT.msgArr,   
            logUser:CHAT.logUser,
            username: '',
            rightClass:'rightClass',
            leftClass:'leftClass',
            Usercount: CHAT.UserCount,
            randomColor:{
                
            }
        }
    },
    mounted(){
        CHAT.init(this.user.username)
        CHAT.message(this.user.username)
        this.$watch("CHAT", (newValue, oldValue)=> {
            console.log('CHAT发生变化')
            this.$refs.talkcontent.scrollTop =  this.$refs.talkcontent.scrollHeight;
        })
        this.$watch("logUser", (newValue, oldValue)=> {
            console.log('有人上线了',this.logUser)
            this.$toast({ message:`${this.logUser[0]}上线了`,duration:1000})
        })

      
    },
    methods:{
        goback(){
            this.$router.push('/')
            // CHAT.disconnect(this.user.username)
        },
        
        submit(){
            var date = new Date()
            var time = date.getHours() + ':' + date.getMinutes() +':' + date.getSeconds()
            var obj = {
                time: time,
                msg: this.msg,
                toUser:'群聊',
                avatar: this.user.avatar,
                fromUser: this.user.username
                }
            if(obj.msg === ''){this.$toast({ message:'内容不可为空',duration:1000})}else{
                CHAT.submit(obj)
                this.msg = ''
            }
           
        }
    },
    computed:{
        ...mapGetters(['user'])
    }
}
</script>


<style lang="less" scoped>
    .talkbar{
        height: 6vh;
        display: grid;
        grid-template-columns: 10% 90%;
        margin-bottom: 3vh;
        background: linear-gradient(to right, #ffe9e9 ,#b2bbff);
        i{
            justify-self: center;
            align-self: center;
            color: grey;
            font-size: 3vh;
        }
        span{
            color: #424242;
            align-self: center;
        }
    }
    .leftClass{
        margin-bottom: 5vh;
        .time{
            text-align: center;
            color: #737373;
        }
        .talkBox{
            display: grid;
            grid-template-rows: 3vh 1fr;
            grid-template-columns: 10vh 1fr;
            img{
                grid-row: 1/span2;
                justify-self: center;
                align-self: center;
                height: 6vh;
                width: 6vh;
                border-radius: 50%;
            }
            .text{
                grid-row: 2 / span1;
                grid-column: 2 / span1;
                background: linear-gradient(to right, #cbd0f9, #eac0fd);
                display: inline;
                align-self: center;
                justify-self: baseline;
                padding: 2vh;
                position: relative;
                 &::after{
                    content: '';
                    position: absolute;
                    display: block;
                    top: 0px;
                    left: -5px;
                    width: 0;
                    height: 0;
                    border-bottom: 5px solid transparent;
                    border-right: 5px solid #cbd0f9;
                }
            }
        }
    }

    .rightClass{
        margin-bottom: 5vh;
        .time{
            text-align: center;
            color: #737373;
        }
        .talkBox{
           display: grid;
            grid-template-rows: 3vh 1fr;
            grid-template-columns: 1fr 10vh;
            img{
                grid-row: 1 / span2;
                grid-column: 2/span1;
                justify-self: center;
                align-self: center;
                height: 6vh;
                width: 6vh;
                border-radius: 50%;
            }
            .name{
                justify-self: end;
            }
            .text{
                grid-row: 2 / span1;
                grid-column: 1 / span1;
                background-color: #e8e8e8;
                display: inline;
                align-self: center;
                margin-right: 10vh;
                justify-self: end;  
                padding: 2vh;
                position: relative;
                 &::after{
                    content: '';
                    position: absolute;
                    display: block;
                    top: 0px;
                    left: 100%;
                    width: 0;
                    height: 0;
                    border-bottom: 5px solid transparent;
                    border-left: 5px solid #e8e9e8;
                }
            }
        }
    }
    .sendRemake{
            position: absolute;
            top: 100%;
            height:6vh;
            width: 100%;
            transform: translateY(-6vh);
            display: grid;
            background-color: #e8e8e8;
            grid-template-columns: 80% 20%;
         
            input{
                padding: 0vh 2vh;
                height: 6vh;
                align-self: center;
                width: 90%;
                color: #3e3e3e;
                justify-self: end;
                font-size: 2.5vh;
            }
        }
</style>

