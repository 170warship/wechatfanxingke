// pages/part_page/part_page.js

import { initPartTab } from "part_item.js"

var tabCount = 3;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nowTabIndex:0,
    },
    tabList:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var oThis = this;

        for (var i = 0; i < tabCount; i++){
            var item = initPartTab();
            oThis.tabList.push(item);
        }

        oThis.tabList[oThis.data.nowTabIndex].onLoad();

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

    }
})