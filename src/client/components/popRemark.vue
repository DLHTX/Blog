<template>
    <div class="popRemark">
        <i class="iconfont icon-shangjiantou" @click="ispop()"></i>
        <div style="overflow:scroll;height: 78vh;">
            <span v-if= 'remakeList.length === 0 ' style="font-size: 20px; color: #888888;">嘤嘤嘤~没有评论哟~</span>
            <div class="remake" v-for= '(remake,index) in remakeList' :key= "index" v-if= "remakeList">
                <img :src="remake.avatar" alt="">
                <span class="username">{{remake.username}}
                    <span v-if="remake.lz" style="    font-size: 1.5vh;color: #519a8c;border: 1px solid #519a8c;padding: 0 .5vh;">楼主</span>
                </span>
                <div class="content" >
                    {{remake.content}}
                </div>
                  <div class="creatAt">评论于 {{remake.createdAt}}</div>
            </div>
        </div>
     


        <div class="sendRemake">
            <input type="text" v-model="form.remarkContent" @keyup.enter= 'sendRemake()'>   
            <span style='display: flex; align-items: center;height: 6vh;justify-content: center;'
            @click='sendRemake()'> <i class="iconfont icon-fasong" style="transform: rotateX(180deg);font-size: 25px;color: #616161;"> </i></span>
        </div>
    </div>
</template>

<script>
import {mapGetters} from   'vuex'

export default {
    data(){
        return{
            form:{},
            remakeList:[],
            blogname1:this.blogname
        }
    },
    mounted(){
        this.findRemake()
        this.initdata()
    },
    props:['blogname'],
    methods:{
        ispop(){
            this.$emit('ispop',false)
        },
        initdata(){
            this.form = {
                    remarkContent:null,
                    username:this.user.username,
                    avatar:this.user.avatar,
                    id:this.$route.query.queryid
            }
        },
        sendRemake(){
            if(this.user){
                if(this.form.remarkContent === null||this.form.remarkContent === undefined){
                    this.$toast({message:'评论内容不可为空',duration:1000})
                }else{
                    this.$axios.post('/auth/sendRemake',{form:this.form}).then(res=>{
                        console.log(res)
                        if(res.data.status === 0 ){
                            this.$toast({ message:'评论成功',duration:1000})
                            this.form.remarkContent = ''
                            this.findRemake()
                        }else{
                            this.$toast({ message:'注销失败',duration:1000})
                        }
                    })
                }
            }else{
                //  this.$toast({message:'尚未登陆，无法评论',duration:1000})
                this.$router.push('/login')
            }
        },
        findRemake(){
            this.$axios.post('/auth/findRemake',{id:this.$route.query.queryid}).then(res=>{
                res.data.remake.forEach(remakelist =>{
                    remakelist.createdAt = (new Date(remakelist.createdAt).getMonth()+1)+'月'+ (new Date(remakelist.createdAt).getDate())+'日'
                    if(remakelist.username == this.blogname1){
                        remakelist.lz = true
                    }
                })
                this.remakeList = res.data.remake
            
                console.log(this.remakeList)
            })
        }
    },
    computed:{
        ...mapGetters(['user'])
    }
}
</script>

<style lang="less" scoped>
    .popRemark{
        height: 92vh;
        margin-top: 8vh;
        width: 100%;
        background-color:white;
        line-height: unset;
        i{
            display: block;
            transform: rotate(180deg);    
        }
        .remake{
                display: grid;
                grid-template-columns: 20% 1fr;
                grid-template-rows: 4vh 1fr 4vh;
                padding: 1vh 0vh;
                border-bottom: 1px solid #ececec;
            img{
                justify-self: center;
                height: 6vh;
                width: 6vh;
                border-radius: 50%;
                margin-right: 1vh;
                grid-row: 1/span2;
            }
            .username{
                font-size: 2.5vh;
                justify-self: baseline;
                align-self: center;

            }
            .content{
                grid-column: 2/span1;
                justify-self: baseline;
                grid-column: 2/span1;
                font-size: 15px;
                color: #6d6d6d;
                line-height:25px;
                text-align: -webkit-auto;
            }
            .creatAt{
                line-height: 14px;
                font-size: 14px;
                grid-column: 2/span1;
                justify-self: baseline;
                color: #969696;
                align-self: center;
                grid-row: 3/span1;
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
            border-radius: 35px;
            input{
                padding: 0vh 2vh;
                height: 6vh;
                align-self: center;
                width: 84%;
                justify-self: end;
                font-size: 2.5vh;
            }
        }
    }
</style>
