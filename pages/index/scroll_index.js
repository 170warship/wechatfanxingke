// pages/index/scroll_index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height:200
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var list = [];
        var list2 = []
        for (var i = 0; i < 25; i++) {
            list.push({ text: "list_text" + i })
            list2.push({ text: "list2_text" + i });
        }

        var oThis = this;
        this.setData({
            text1: "text1",
            infoList: list
        }, function () {
            console.log("setData在界面渲染完毕后，这段会被调用");
        });

        console.log(1, oThis.data.infoList);

        // wx.createSelectorQuery().selectAll(".list_view_bg1").boundingClientRect(function (rects) {
        //     var index = 0;
        //     var needReShow = false;
        //     var tripArray = oThis.data.tripArray;

        //     var showIndexs = [];

        //     if(rects.length > 0){
        //         oThis.setData({height:rects[0].height});
        //     }

        // }).exec();
    },
    scrolling: function (e) {
        console.log(e.detail.scrollTop, e);
    },
    toupper: function (e) {
        // console.log(e)
    },
    onPageScroll: function (e) {
        console.log(e);
    },
    tolower: function (e) {
        // console.log(e)
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
        setTimeout(function(){
            wx.stopPullDownRefresh();

        },1000);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('onReachBottom')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})