<template>

    <router-view v-if='isRouterAlive'></router-view> 

</template>

<script>
export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true 
      })
    }
  }
}
</script>
<style>
.mint-toast{
    padding: 1vh 4vh;
    border-radius: 33px;
    position: absolute;
    top: 2%;
    left: 50%;
    background-color: #6cc372;
    color: white;
    transform: translateX(-50%);
    z-index: 999;
}
html{
  height: 100%;
  font-size: 2vh;
  font-family:'SegoeWP';
}
body {
  height: 100%;
  margin: 0!important;
  user-select:none!important;
  padding: 0!important;
}
</style>
