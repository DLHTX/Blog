// import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    // ...mapActions(['register']),
    onRegister() {
      $axios.post('/auth/register',{username:'dlhtt',password:'1234'}).then(res=>{
          console.log(res)
      })
    }
  }
}