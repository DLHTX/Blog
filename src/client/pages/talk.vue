<template>
    <div>
        <i class="iconfont icon-back" @click="goback()"></i>
        <input type="text" v-model='msg'> 
        <button  @click="submit">发送</button>
        <span>{{newUser}}</span>
        <div v-for= '(msg1,index) in CHAT' :key= "index" style="    font-size: 17px;
    margin: 2vh 0;">
            <span>消息：{{msg1.msg}}</span>
            <span>来自：{{msg1.fromUser}}</span>
            <span>时间:{{msg1.time}}</span>
        </div>
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
            username: '',
            newUser:CHAT.newUser
        }
    },
    mounted(){
        console.log(this.user.username +'上线了')
        if(!this.user.username){
            console.log('尚未登录')
        }else{
            CHAT.init(this.user.username)
        }
        CHAT.message(this.user.username)
        this.$toast({ message:`${this.newUser}上线了`,duration:1000})
    },
    methods:{
        goback(){
            this.$router.push('/')
            CHAT.disconnect(this.user.username)
        },
        submit(){
            var date = new Date()
            var time = date.getHours() + ':' + date.getMinutes()
            var obj = {
                time: time,
                msg: this.msg,
                toUser:'群聊',
                fromUser: this.user.username
                }
            CHAT.submit(obj)
            this.msg = ''
        }
    },
    computed:{
        ...mapGetters(['user'])
    }
}
</script>

