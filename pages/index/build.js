// pages/index/build.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        resource:'',
    },
    

    loopTimer:null,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var oThis = this;

        const class_type_building = 1;

        const resource_type_wood = 1;//这个序号也是资源数组里的下标索引
        const resource_type_iron = 2;
        const resource_type_food = 3;
        const resource_type_castle_core = 10;


        const building_type_food = 1;
        const building_type_iron = 2;
        const building_type_train = 3;


        const ALL_OUTPUT_INTERVAL = 30;


        var Class1 = {

            _id: 1005,

            classType: class_type_building,

            production: resource_type_food,

            output:100,

            outputInterval: ALL_OUTPUT_INTERVAL,

            level:1,

            nextUpgradeSources: [resource_type_castle_core],

            nextUpgradeSourcesAmount:[100],

            nexUpgradeToClassId: 1006,

        };

        var Class2 = {

            _id: 1006,

            classType: class_type_building,

            production: resource_type_food,

            output: 102,

            outputInterval: ALL_OUTPUT_INTERVAL,

            level: 2,

            nextUpgradeSources: [resource_type_castle_core],

            nextUpgradeSourcesAmount: [100],

            nexUpgradeToClassId: null,

        };


        var Class3 = {

            _id: 1105,

            classType: class_type_building,

            production: resource_type_iron,

            output: 100,

            outputInterval: ALL_OUTPUT_INTERVAL,

            level: 1,

            nextUpgradeSources: [resource_type_castle_core],

            nextUpgradeSourcesAmount: [100],

            nexUpgradeToClassId: 1106,

        };

        var Class4 = {

            _id: 1106,

            classType: class_type_building,

            production: resource_type_iron,

            output: 102,

            outputInterval: ALL_OUTPUT_INTERVAL,

            level: 2,

            nextUpgradeSources: [resource_type_castle_core],

            nextUpgradeSourcesAmount: [100],

            nexUpgradeToClassId: null,

        };

        var Class5 = {

            _id: 1205,

            level:2,

        }



        var objF = {
            classId: 1005,
            remainInterval: 0
        };

        var objI = {
            classId: 1105,
            remainInterval: 0
        };

        // var ClassDic = {
        //     Class1._id:Class1,
        //     Class2._id:Class2,
        // }
        var ClassDic = {};
        
        ClassDic[Class1._id] = Class1;
        ClassDic[Class2._id] = Class2;
        ClassDic[Class3._id] = Class3;
        ClassDic[Class4._id] = Class4;
        ClassDic[Class5._id] = Class5;

        app.globalData.ClassDic = ClassDic;


        app.globalData.allBuilding[building_type_food] = objF;

        app.globalData.allBuilding[building_type_iron] = objI;

        app.globalData.allBuilding[building_type_train] = { classId:1205 };


        var timeInterval = 1;
        this.loopTimer = setInterval(function(){

            for (var i = 0; i < app.globalData.allBuilding.length; i ++){
                var obj = app.globalData.allBuilding[i];

                if(!obj){
                    continue;
                }

                var objClass = ClassDic[obj.classId];

                if(!objClass){
                    continue;
                }

                if (obj.remainInterval <= 0) {
                    app.globalData.allResource[objClass.production] += objClass.output;
                    obj.remainInterval = objClass.outputInterval;
                } else {
                    obj.remainInterval -= timeInterval;
                }

                // console.log('resource:', oThis.allResource);

                oThis.setData({ resource: app.globalData.allResource.join(',') });
            }

            

        }, 50);

    },


    goGotTrain:function(){

        wx.navigateTo({
            url: 'train',
        })
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
        clearInterval(this.loopTimer);
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
    clickToUpgrade: function(e){

        this.upgrade(e.currentTarget.dataset.buildIndex)
    },
    upgrade:function(index){
        var oThis = this;
        var building = app.globalData.allBuilding[index];


        if(!building){
            return;
        }

        var cls = app.globalData.ClassDic[building.classId];


        var canUp = !!cls.nexUpgradeToClassId;




        for (var i = 0; i < cls.nextUpgradeSources.length && canUp ;i ++)
        {
            var nowUpResourceAmount = app.globalData.allResource[ cls.nextUpgradeSources[i] ];

            var needUpResourceAmount = cls.nextUpgradeSourcesAmount[i];

            if (needUpResourceAmount > nowUpResourceAmount){

                canUp = false;
                break;
            }

        }

        if(canUp){

            for (var i = 0; i < cls.nextUpgradeSources.length; i++) {
                var nowUpResourceAmount = app.globalData.allResource[cls.nextUpgradeSources[i]];

                var needUpResourceAmount = cls.nextUpgradeSourcesAmount[i];

                app.globalData.allResource[cls.nextUpgradeSources[i]] = nowUpResourceAmount - needUpResourceAmount;

            }



            oThis.allBuilding[index].classId = cls.nexUpgradeToClassId;

            console.log('after upgrade resource:', app.globalData.allResource);

            oThis.setData({ resource: app.globalData.allResource.join(',')});

            console.log('building:', app.globalData.allBuilding[index]);
        }


    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})