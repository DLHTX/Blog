function friendlyDate(datsStr) {
    let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
    let time = dateObj.getTime()
    let now = Date.now()
    let space = now - time
    let str = ''
  
    switch (true) {
      case space < 60000:
        str = ' Just now'
        break
      case space < 1000*3600:
        str = Math.floor(space/60000) + ' minutes ago'
        break
      case space < 1000*3600*24:
        str = Math.floor(space/(1000*3600)) + ' hours ago'
        break
      default:
        str = Math.floor(space/(1000*3600*24)) + ' day ago'
    }
    return str
  }
  
  export default {
    install(Vue, options) {
      Vue.prototype.friendlyDate = friendlyDate
    }
  }