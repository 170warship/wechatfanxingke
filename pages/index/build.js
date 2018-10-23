// pages/index/build.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        resource:'',
    },
    allResource:[0,0,0,0,0,0,0,0,0,0,1000,0,0,],//参照resource_type_...里的说明

    allBuilding:[],

    ClassDic:{},

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


        var Class1 = {

            _id: 1005,

            classType: class_type_building,

            production: resource_type_food,

            output:100,

            outputInterval: 10,

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

            outputInterval: 10,

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

            outputInterval: 10,

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

            outputInterval: 10,

            level: 2,

            nextUpgradeSources: [resource_type_castle_core],

            nextUpgradeSourcesAmount: [100],

            nexUpgradeToClassId: null,

        };





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

        this.ClassDic = ClassDic;


        this.allBuilding[0] = objF;

        this.allBuilding[1] = objI;



        var timeInterval = 1;
        this.loopTimer = setInterval(function(){

            for(var i = 0; i < oThis.allBuilding.length; i ++){
                var obj = oThis.allBuilding[i];
                var objClass = ClassDic[obj.classId];

                if (obj.remainInterval <= 0) {
                    oThis.allResource[objClass.production] += objClass.output;
                    obj.remainInterval = objClass.outputInterval;
                } else {
                    obj.remainInterval -= timeInterval;
                }

                // console.log('resource:', oThis.allResource);

                oThis.setData({ resource: oThis.allResource.join(',') });
            }

            

        }, 50);

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
        var building = this.allBuilding[index];


        if(!building){
            return;
        }

        var cls = this.ClassDic[building.classId];


        var canUp = !!cls.nexUpgradeToClassId;




        for (var i = 0; i < cls.nextUpgradeSources.length && canUp ;i ++)
        {
            var nowUpResourceAmount = this.allResource[ cls.nextUpgradeSources[i] ];

            var needUpResourceAmount = cls.nextUpgradeSourcesAmount[i];

            if (needUpResourceAmount > nowUpResourceAmount){

                canUp = false;
                break;
            }

        }

        if(canUp){

            for (var i = 0; i < cls.nextUpgradeSources.length; i++) {
                var nowUpResourceAmount = this.allResource[cls.nextUpgradeSources[i]];

                var needUpResourceAmount = cls.nextUpgradeSourcesAmount[i];

                this.allResource[cls.nextUpgradeSources[i]] = nowUpResourceAmount - needUpResourceAmount;

            }



            oThis.allBuilding[index].classId = cls.nexUpgradeToClassId;

            console.log('after upgrade resource:', oThis.allResource);

            oThis.setData({resource:oThis.allResource.join(',')});

            console.log('building:', oThis.allBuilding[index]);
        }


    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})