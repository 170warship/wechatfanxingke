// pages/index/fang.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var oThis = this;

        var sol1 = {
            atk:10,
            def:10,
            hp:100,
            mp:100,
            dead:0,

        }

        var sol2 = {
            atk: 10,
            def: 10,
            hp: 100,
            mp: 100,
            dead:0,
        }


        var interv = setInterval(function(){

            if(!sol1.dead && !sol2.dead){
                oThis.loop(sol1, sol2);
            }else{
                clearInterval(interv)
            }

            oThis.runResult(sol1, sol2);

            
            console.log('sol1:', sol1, ',sol2:', sol2);
        }, 500);

    },
    loop:function(sol1, sol2){
        var minMisHp = 1;
        var hp1 = sol1.hp;
        var hp2 = sol2.hp;

        var misHp1 = sol2.atk - sol1.def < minMisHp ? minMisHp : sol2.atk - sol1.def;
        var misHp2 = sol1.atk - sol2.def < minMisHp ? minMisHp : sol1.atk - sol2.def;

        sol1.hp = sol1.hp - misHp1;

        sol2.hp = sol2.hp - misHp2;


    },

    runResult: function(sol1, sol2){

        if(sol1.hp <= 0){
            sol1.dead = true;

            console.log(sol1)
        }

        if(sol2.hp <= 0){
            sol2.dead = true;
        }


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