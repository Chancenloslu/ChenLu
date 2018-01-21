Page({
  data: {
  nav:'',
  cid:'',
  list:''
  },

  onLoad: function (options) {
    var that=this
  wx.request({
    url: 'https://ttc.botbrain.ai/v3/config/RVCQS9UR56',
    data:{
      appid: 'RVCQS9UR56',
      securekey:'KMHFMCCMN224H3929Z325V',
      platform: 'wechatMini'
    },
    success: function(e){
      console.log(e)
      that.setData({
        nav:e.data.data.columns,
        cid:e.data.data.columns[0].id
      })
    }
  })
  //获取用户的openid
  wx.login({
    success:function(e){
      console.log(e)
      wx.request({
        url:'https://open.emstail.com/v5/getOpenid',
        data:{
          appid:'wx709e6674f7f774f4',
          secret:'ea6bc14158c310a4790174929cd4dec5',
          code: e.code
        },
        success:function(res){
          console.log(res)
          wx.setStorageSync('openid',res.data.openid)

          wx.request({
            url:'https://ttc.botbrain.ai/v3/data/feed',
            data:{
              appid:'RVCQS9UR56',
              columnid: that.data.cid,
              uid: wx.getStorageSync('openid'),
              sid:Date.parse(new Date())/1000,
              ct: 20,
              platform:'wechatMini'
            },
            success:function(e){
              console.log(e)
              that.setData({
                list:e.data.data
              })
            }
          })
        }
      })
    }
  })
  },
})
