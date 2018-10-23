//search_star.js
//获取应用实例
const app = getApp()
var input = ''
var net = require("../../commonscript/common/netLoad.js")
var globalData = require("../../commonscript/common/globalData.js")
Page({
    data: {
        starArray: [],
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        needShowErrorView:false,
        needShowRetryBtn:false,
        errorText:"没有搜索结果哦，换个名字试试看"
    },

    onLoad:function(){
        input = 'S'
        this.gotoSearch()
    },

    bindKeyInput: function(e){
        input = e.detail.value;
    },
    inputSucess:function(e){


    },

    searchClick:function(e){
        
        this.gotoSearch();

    },
    //事件处理函数
    selectSingleStar: function (e) {
        var stars = this.data.starArray;
        for (var index in stars) {
            var star = stars[index];
            if (star.sid && (star.sid + '') == e.currentTarget.dataset.starid) {
                star.isSelect = !star.isSelect;

                this.setData({ starArray: stars });

                break;
            }

        }


    },
    selectStarsComplete: function (e) {

        var stars = this.data.starArray;
        var selectStars = [];
        var i = 0;

        for (var index in stars) {
            var star = stars[index];
            if (star.isSelect) {
                star[i] = { sid: star.sid, logo_img: star.logo_img, name: star.name }
            }
            i++;
        }

        globalData.selectStars = selectStars;
        globalData.nowSelectStar = selectStars[0];

    },
    gotoSearch:function(){
        

        var oThis = this;
        var url = 'https://search.idol001.com/star_search_v2.php'
        var params = { app_platform: 'ios', version: '85', platform: 'idolstar', word: input };
        net.fetchApi(url, params, 'GET').then(resp => {

            if (resp.data.idolstar.list.length > 0){
                oThis.setData({ starArray: resp.data.idolstar.list, needShowErrorView:false});
            }else{

                oThis.setData({ starArray: [], needShowErrorView: true, needShowRetryBtn: false, errorText: resp.data.error_description ? resp.data.error_description:"没有搜索结果哦，换个名字试试看" });

            }
        }, function(resp){
            console.log(resp);
            oThis.setData({ starArray: [], needShowErrorView: true, needShowRetryBtn: true, errorText: "网络似乎不太顺畅哦"});

        });

    }


})