

const app = getApp();



const class_type_building = 1;
const class_type_troop = 2;

const resource_type_wood = 1;//这个序号也是资源数组里的下标索引
const resource_type_iron = 2;
const resource_type_food = 3;
const resource_type_castle_core = 10;

const building_type_main_city = 0;
const building_type_food = 1;
const building_type_iron = 2;
const building_type_train = 3;

const ALL_OUTPUT_INTERVAL = 30;


var LoginTypeEnum = {

    class_type_building: class_type_building,
    class_type_troop: class_type_troop,

    building_type_main_city: building_type_main_city,
    building_type_food: building_type_food,
    building_type_iron: building_type_iron,
    building_type_train: building_type_train,


    resource_type_wood: resource_type_wood,
    resource_type_iron: resource_type_iron,
    resource_type_food: resource_type_food,
    resource_type_castle_core: resource_type_castle_core,
}


var Class0 = {

    _id: 1500,

    classType: class_type_building,

    level: 1,

    nextUpgradeSources: [resource_type_castle_core],

    nextUpgradeSourcesAmount: [100],

    nextUpgradeToClassId: 1501,

    upgradeRequires: [],


}

var Class01 = {

    _id: 1501,

    classType: class_type_building,

    level: 2,

    nextUpgradeSources: [resource_type_castle_core],

    nextUpgradeSourcesAmount: [100],

    nextUpgradeToClassId: null,

    upgradeRequires: [],


}



//food field
var Class1 = {

    _id: 1005,

    classType: class_type_building,

    production: resource_type_food,

    output: 100,

    outputInterval: ALL_OUTPUT_INTERVAL,

    level: 1,

    nextUpgradeSources: [resource_type_castle_core],

    nextUpgradeSourcesAmount: [100],

    nextUpgradeToClassId: 1006,

    upgradeRequires: [{
        build: building_type_main_city,
        level: 2,
    }],

};

//food field
var Class2 = {

    _id: 1006,

    classType: class_type_building,

    production: resource_type_food,

    output: 102,

    outputInterval: ALL_OUTPUT_INTERVAL,

    level: 2,

    nextUpgradeSources: [resource_type_castle_core],

    nextUpgradeSourcesAmount: [100],

    nextUpgradeToClassId: null,

    upgradeRequires: [{
        build: building_type_main_city,
        level: 3,
    }],

};

//iron mine
var Class3 = {

    _id: 1105,

    classType: class_type_building,

    production: resource_type_iron,

    output: 100,

    outputInterval: ALL_OUTPUT_INTERVAL,

    level: 1,

    nextUpgradeSources: [resource_type_castle_core],

    nextUpgradeSourcesAmount: [100],

    nextUpgradeToClassId: 1106,

    upgradeRequires: [{
        build: building_type_main_city,
        level: 2,
    }],

};

//iron mine
var Class4 = {

    _id: 1106,

    classType: class_type_building,

    production: resource_type_iron,

    output: 102,

    outputInterval: ALL_OUTPUT_INTERVAL,

    level: 2,

    nextUpgradeSources: [resource_type_castle_core],

    nextUpgradeSourcesAmount: [100],

    nextUpgradeToClassId: null,

    upgradeRequires: [{
        build: building_type_main_city,
        level: 3,
    }],

};

//troop center
var Class5 = {

    _id: 1205,

    level: 2,

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

ClassDic[Class0._id] = Class0;
ClassDic[Class01._id] = Class01;
ClassDic[Class1._id] = Class1;
ClassDic[Class2._id] = Class2;
ClassDic[Class3._id] = Class3;
ClassDic[Class4._id] = Class4;
ClassDic[Class5._id] = Class5;

app.globalData.ClassDic = ClassDic;


app.globalData.allBuilding[building_type_main_city] = { classId: Class0._id };

app.globalData.allBuilding[building_type_food] = objF;

app.globalData.allBuilding[building_type_iron] = objI;

app.globalData.allBuilding[building_type_train] = { classId: Class5._id };


function getResourceAmount(resource_type){

    return app.globalData.allResource[resource_type] ? app.globalData.allResource[resource_type]:0;

}

function changeResourceAmount(resource_type, changeValue){
    if(app.globalData.allResource[resource_type] != undefined){

        app.globalData.allResource[resource_type] += changeValue;

    } 

    return getResourceAmount(resource_type);
}


function getTroopAmount(classId){
    return app.globalData.troopDic[classId] ? app.globalData.troopDic[classId]: 0;
}

function changeTroopAmount(classId, changeValue){
    var count = -1;
    if(app.globalData.troopDic[classId]){
        app.globalData.troopDic[classId] += changeValue;
        count = app.globalData.troopDic[classId];
    }

    return count;
}


function canProduceTroop(classId){

    var canPro = true;

    var classObj = app.globalData.ClassDic[classId];

    if(!classObj){
        return false;
    }

    for (var i = 0; i < classObj.productionRequires.length; i++) {

        var re = classObj.productionRequires[i];

        var reB = app.globalData.ClassDic[app.globalData.allBuilding[re.build].classId];

        if (re.level > reB.level) {
            canPro = false;
            break;
        }

    }

    for (var j = 0; j < classObj.productionConsumptions.length; j++) {

        var pc = classObj.productionConsumptions[j];

        var reR = getResourceAmount(pc.resource);

        if (pc.amount > reR) {
            canPro = false;
            break;
        }

    }

    return canPro;


    

}

function produceTroop(classId){

    var canPro = canProduceTroop(classId);

    if (canPro) {


        for (var j = 0; j < classObj.productionConsumptions.length; j++) {

            var pc = classObj.productionConsumptions[j];

            var reR = app.globalData.allResource[pc.resource];

            app.globalData.allResource[pc.resource] = reR - pc.amount;


        }

        changeTroopAmount(classId, 1);

    }
}



function resourceProduceLoop(interval){

    for (var i = 0; i < app.globalData.allBuilding.length; i++) {
        var obj = app.globalData.allBuilding[i];

        if (!obj) {
            continue;
        }

        var objClass = ClassDic[obj.classId];

        if (!objClass) {
            continue;
        }

        obj.remainInterval -= interval;

        if(obj.remainInterval <= 0){
            var count = Math.floor( Math.abs(obj.remainInterval) / objClass.outputInterval ) + 1;

            changeResourceAmount(objClass.production, objClass.output*count);

            obj.remainInterval = objClass.outputInterval - ( Math.abs(obj.remainInterval) % objClass.outputInterval );

        }

    }

}

function canUpgradeBuilding(building_type){
    var building = getBuilding(building_type);


    if (!building) {
        return false;
    }

    var cls = app.globalData.ClassDic[building.classId];


    var canUp = !!cls.nextUpgradeToClassId && !!app.globalData.ClassDic[cls.nextUpgradeToClassId];



    for (var j = 0; j < cls.upgradeRequires.length; j++) {

        var re = cls.upgradeRequires[j];

        if(!re){
            continue;
        }

        var reB = app.globalData.ClassDic[app.globalData.allBuilding[re.build].classId];

        if (re.level > reB.level) {
            canUp = false;
            break;
        }

    }


    for (var i = 0; i < cls.nextUpgradeSources.length && canUp; i++) {
        var nowUpResourceAmount = getResourceAmount(cls.nextUpgradeSources[i])

        var needUpResourceAmount = cls.nextUpgradeSourcesAmount[i];

        if (needUpResourceAmount > nowUpResourceAmount) {

            canUp = false;
            break;
        }

    }

    return canUp;
}


function getBuilding(building_type){
    return app.globalData.allBuilding[building_type];
}

function setBuilding(building_type, classId){

    var cls = app.globalData.ClassDic[classId];

    if (!cls || cls.classType != class_type_building){
        return null;
    }

    var building = getBuilding(building_type);

    if(!building){
        return null;
    }

    app.globalData.allBuilding[building_type].classId = classId;

    return cls;
}


function upgradeBuilding(building_type){

    var canUp = canUpgradeBuilding(building_type)

    var cls = app.globalData.ClassDic[getBuilding(building_type).classId];

    if (canUp) {

        for (var i = 0; i < cls.nextUpgradeSources.length; i++) {
            var nowUpResourceAmount = getResourceAmount(cls.nextUpgradeSources[i]);

            var needUpResourceAmount = cls.nextUpgradeSourcesAmount[i];

            changeResourceAmount(cls.nextUpgradeSources[i], -needUpResourceAmount);

        }

        var building = getBuilding(building_type);

        setBuilding(building_type, cls.nextUpgradeToClassId);

    }

}


export {
    LoginTypeEnum,
    getResourceAmount,
    changeResourceAmount,
    getTroopAmount,
    changeTroopAmount,
    canProduceTroop,
    produceTroop,
    canUpgradeBuilding,
    upgradeBuilding,
    getBuilding,
    resourceProduceLoop
}

