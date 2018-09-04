<template>
    <div class="createBox">
        <div class="bar">
            <i class="iconfont icon-back" @click="goback()"></i>
            <span>New Blog</span>
        </div>
        <div class="content1">
            <input type="text" placeholder="Please Enter Blog Title" v-model="BlogInfo.title"> 
            <textarea name="" id="" cols="30" rows="10" placeholder="Please Enter Blog Content" v-model="BlogInfo.content"></textarea>
            <div class="btn" @click="createBlog()">Send</div>
        </div>
    </div>
</template>
 
<script>
//本段总结 computed，data存在于beforecreate和created之间执行 data比computed先 所以不能在data()中初始化mapGetters

import  {mapGetters}  from 'vuex'
export default {
    data(){
        return {
            BlogInfo:{}
        }
    },
    mounted(){
        this.BlogInfo = {
                title:'',
                content:'',
                love:0,
                username:this.user.userInfo.username,
                avatar:this.user.userInfo.avatar,
        }
    },
    methods:{
        goback(){
            this.$router.push('/')
        },
        createBlog(){
            if(this.BlogInfo.title === '' ||this.BlogInfo.content === ''){
                 this.$toast({message:'内容不可为空',duration:1000})
            }else{
                this.$axios.post('/auth/creatBlog',{BlogInfo:this.BlogInfo}).then(res=>{
                    console.log(res)
                    if(res.data.status === 0 ){
                        this.$toast({message:'发布成功',duration:1000})
                        this.$router.push('/')
                    }
                })
            }
        }
    },
    computed:{
        ...mapGetters([
            'user'
        ])
    }
}
</script>

<style lang='less' scoped>
input{
    height: 5vh;
    font-size: 3vh;
    font-family: 'Raleway';
    width: 100%;
    font-weight: 400;
    border-bottom: 1px solid #e2e2e2;
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
.createBox{
    height: 100vh;
    font-size: 2vh;
    font-family: 'Raleway';
    background-color: white;
    padding: 0 2vh;
    text-align: center;
    .bar{
        height: 10vh;
        text-align: center;
        line-height: 10vh;
        font-family: 'Raleway';
        font-size: 4vh;
        i{
            font-size: 4vh;
            float: left;
        }
        span{

        }
    }
    .content1{
        margin-top: 1vh;
        .btn{
            margin-top: 4vh;
            display: inline-block;
            padding: 1vh 10vh;
            background-color: #6cc372;
            border-radius: 21px;
            box-shadow: 0 0 44px -9px #3a3a3a73;
            color: white;
        }
        textarea{
            outline: none;
            border: none;
            margin-top: 2vh;
            font-size: 2.6vh;
            width: 100%;
            border-bottom: 1px solid #e2e2e2;
            font-family: 'Raleway';
            resize: none;
        }
    }


}
</style>

