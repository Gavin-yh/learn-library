// pages/search/search.js
var app = getApp();
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backhome(){
    // wx.navigateBack 得配合着navigagteto 用  
    wx.navigateBack({
      url:"../home/home",
    })
  },
  searchMovie(e){
    var value;
    var url;
    clearTimeout(timer);
    timer = setTimeout(()=> {
      value = e.detail.value;
      url = app.globalData.doubanBase + app.globalData.url + value
      wx.request({
        url,
        method: 'GET',
        header: { 'content-type': 'json' },
        success: res => {
          //  title images year directors average
          // console.log(value)
          // console.log(res.data.subjects);
           this.movieInfo(res.data.subjects);
        },
        fail(err) {
          console.log(err);
        }
      })
    },200);
  },
  movieInfo(list){
    var resultList = [];
    list && list.forEach(item => {
      var dirs = item.directors.map(i => i.name).join('/');//拿出所有的导演
      var desc = item.rating.average + '分' + item.year + '/' + dirs;
      resultList.push({
        title:item.title,
        image:item.images.small,
        desc,
        id:item.id
      }) 
    })
    this.setData({resultList})
  }
})