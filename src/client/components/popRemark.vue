<template>
    <div class="popRemark">
        <i class="iconfont icon-shangjiantou" @click="ispop()"></i>



        <div class="sendRemake">
            <input type="text" />   
            <span style="font-size: 3.5vh;color: #616161;" 
            @click='sendRemake()'>Send</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    // props:['userInfo'],
    methods:{
        ispop(){
            this.$emit('ispop',false)
        },
        sendRemake(){
            this.$axios.post('/auth/sendRemake').then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .popRemark{
        height: 92vh;
        margin-top: 8vh;
        width: 100%;
        background-color:white;
        i{
            display: block;
            transform: rotate(180deg);    
        }
        .sendRemake{
            position: absolute;
            top: 100%;
            height: 8vh;
            width: 100%;
            transform: translateY(-9vh);
            display: grid;
            background-color: #d4d4d459;
            grid-template-columns: 70% 30%;
            border-radius: 35px;
            input{
                padding: 0vh 2vh;
                height: 6vh;
                align-self: center;
                width: 84%;
                justify-self: end;
                font-size: 3vh;
            }
        }
    }
</style>
