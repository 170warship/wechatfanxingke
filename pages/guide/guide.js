const app = getApp()
var net = require("../../commonscript/common/netLoad.js")
var globalData = require("../../commonscript/common/globalData.js")
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        starArray:[],
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        var oThis = this;
        var url = 'https://data.idol001.com/api_moblie_idol_v2.php?action=get_recommend_hot_star_list'
        var params = {app_platform:'ios', version:'85'}
        net.fetchApi(url, params, 'GET').then(resp=>{

            oThis.setData({ starArray: resp.data.list});

        });

    },
    getUserInfo: function (e) {

    },

    //事件处理函数
    selectSingleStar: function (e) {
        var stars = this.data.starArray;
        for( var index in stars ){
            var star  = stars[index];
            if( star.sid && (star.sid + '') == e.currentTarget.dataset.starid){
                star.isSelect = !star.isSelect;

                this.setData({ starArray:stars });

                break;
            }

        }


    },
    selectStarsComplete:function (e){

        var stars = this.data.starArray;
        var selectStars = [];
        var i = 0;

        for (var index in stars) {
            var star = stars[index];
            if (star.isSelect) {
                star[i] = { sid: star.sid, logo_img: star.logo_img, name:star.name }
            }
            i++;
        }
        
        globalData.selectStars = selectStars;
        globalData.nowSelectStar = selectStars[0];

    },


    searchStar:function(e){

        wx.navigateTo({
            url: '../search_star/search_star',
        })

    }

})