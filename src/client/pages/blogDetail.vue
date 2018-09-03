<template>
    <div class="blogDetail">
        <div class="pane" v-show='ispop'>

        </div>

        <div>
            <i class="iconfont icon-back" @click="goback()" style="font-size:inherit;float:left;"></i>
            <span>Blog</span>
        </div>

        <div class="blog" v-if='blog'>
            <div class="userinfo1" >
                <img :src="blog.avatar" alt="" >
                <span style="rgb(70, 70, 70);">{{blog.username}}</span>
                <span style="justify-self:end;rgb(70, 70, 70);">{{friendlyDate(blog.updatedAt)}}</span>
            </div>
            <div class="title">
                {{blog.title}}
            </div>
            <div class="content">
                {{blog.content}}
            </div>
        </div>
        
        <div class="remark" @click="popRemark()">
            <img src="../static/img/remake.png" alt="">
        </div>

        <popRemark class="popRemark"  :class="ispop?'popRemarkActive':''" v-on:ispop='changeActive($event)' 
        :userInfo='blog'></popRemark>

    </div>
</template>

<script>
import popRemark from '../../client/components/popRemark'

export default {
    components:{
        popRemark
    },
    data(){
        return {
            id:this.$route.query.queryid,
            blog:null,
            ispop:false,
            userInfo:this.$route.userInfo
        }
    },
    created(){
         this.getBlog()
    },

    methods:{
        // initData(){
        //     this.id = this.$route.query
        // },
        getBlog(){
            this.$axios.post('/auth/findBlogByid',{id:this.id})
                .then(res=>{
                    console.log(res)
                    this.blog = res.data.blog[0]
                })
        },
        goback(){
            this.$router.push('/')
        },
        popRemark(){
            if(this.ispop) { this.ispop = false}
            else{this.ispop = true}
        },
        changeActive(event){
            this.ispop = event
        }
    }
}
</script>

<style lang='less' scoped>
    .pane{
        background: #63636394 !important;
        z-index: -1;
        height: 100vh;
        top: 0;
        width: 100vh;
        position: absolute;
        transition: all 0.2s;
    }
    .popRemarkActive {
        top: 0!important;
        transition: all .2s;
    }
    .blogDetail{
        height: 8vh;
        text-align: center;
        line-height: 8vh;
        padding: 0 1vh;
        font-size: 4vh;
        position: fixed;
        background: white;      
        width: 100%;
        padding: 0;
        left: 0;
        border-bottom:1px solid #e6e6e6;
          transition: all .2s;
    }
    .userinfo1{
            height: 8vh;
            font-size: 2vh;
            grid-template-columns: 15% 20% 65%;
            display: grid;
            padding: 0 2vh;
            img{
            height:6vh;
            width: 6vh;
            border-radius: 50%;
            margin-right: 1vh;
                        z-index: -2;
            align-self: center;
            }
            span{
            // align-self: center;
            }
        }

    .blog{
        height: 92vh;
        overflow: scroll;
        padding: 0 1vh;
        .title{
            text-align: initial;
            padding: 0 1vh;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .content{
            font-size: 3vh;
            line-height: 25px;
            text-align: initial;
            padding: 0 1vh;
        }
       
    }    
    .remark{
        width: 100%;
        position: fixed;
        height: 8vh;
        line-height: 8vh;
        background-color: white;
        top: 100vh;
        transform: translateY(-8vh);
        border-top: 1px solid #e6e6e6;
        display: grid;
        grid-template-columns: auto auto;
        img{
            height: 4vh;
            align-self: center;
            display: inline-block;
            margin-left: 2vh;    

        }
    }
    .popRemark{
        position:absolute;
        top:100vh;
        transition: all .2s;
    }
</style>
