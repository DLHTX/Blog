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
