// pages/index/train.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    allTroops:{

        classId:{
            amount: 100,
        },
    },
    proTroopsList:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        const class_type_troop = 2;

        const building_type_food = 1;
        const building_type_iron = 2;
        const building_type_train = 3;


        const resource_type_iron = 2;
        const resource_type_food = 3;

        var Class1 = {

            _id: 2005,

            classType: class_type_troop,

            atk:100,

            hp:1000,

            def:20,

            critRate:1,

            level: 1,

            productionRequires:[ {
                build: building_type_train,
                level:1,
            }],

            productionConsumptions:[
                {
                    resource: resource_type_iron,
                    amount:100,
                },
                {
                    resource: resource_type_food,
                    amount: 100,
                },
            ]

        };

        var Class2 = {

            _id: 2006,

            classType: class_type_troop,

            atk: 120,

            hp: 1200,

            def: 20,

            critRate: 1,

            level: 2,

            productionRequires: [{
                build: building_type_train,
                level: 1,
            }],

            productionConsumptions: [
                {
                    resource: resource_type_iron,
                    amount: 100,
                },
                {
                    resource: resource_type_food,
                    amount: 100,
                },
            ]

        };

        // app.globalData.troopsDic = {


        // }

        this.proTroopsList = [Class1, Class2];
    },


    runLoop: function(){



    },

    produceTroop:function(e){
        var index = e.currentTarget.dataset.index;

        var classObj = this.proTroopsList[index];

        if(!classObj){
            return;
        }


        var canPro = true;

        for (var i = 0; i < classObj.productionRequires.length;i ++){

            var re = classObj.productionRequires[i];

            var reB = app.globalData.ClassDic[ app.globalData.allBuilding[re.build].classId ];

            if(re.level > reB.level){
                canPro = false;
                break;
            }

        }

        for (var j = 0; j < classObj.productionConsumptions.length; j++) {

            var pc = classObj.productionConsumptions[j];

            var reR = app.globalData.allResource[pc.resource];

            if (pc.amount > reR) {
                canPro = false;
                break;
            }

        }


        if(canPro){

            console.log("before resource:", app.globalData.allResource);

            for (var j = 0; j < classObj.productionConsumptions.length; j++) {

                var pc = classObj.productionConsumptions[j];

                var reR = app.globalData.allResource[pc.resource];

                app.globalData.allResource[pc.resource] = reR - pc.amount;
                

            }

            app.globalData.troopsDic[classObj._id] = app.globalData.troopsDic[classObj._id] ? app.globalData.troopsDic[classObj._id] + 1:1;



            console.log("troop:", app.globalData.troopsDic);

            console.log("after resource:", app.globalData.allResource);



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