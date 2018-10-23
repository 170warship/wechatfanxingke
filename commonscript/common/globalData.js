
const app = getApp()

var globalData = {

    get nowSelectStar(){
        
        if(!app.globalData.nowSelectStar){

            try{
                app.globalData.nowSelectStar = wx.getStorageSync("APP_NOW_SELECT_STAR");
                return app.globalData.nowSelectStar;
            } catch (e) {
                // Do something when catch error
                return undefined;
            }
            

        }else{
            return app.globalData.nowSelectStar;
        }


    },

    get selectStars(){

        if (!app.globalData.selectStars) {

            try {
                app.globalData.selectStars = wx.getStorageSync("APP_SELECT_STARS");
                return app.globalData.selectStars;
            } catch (e) {
                // Do something when catch error
                return undefined;
            }


        } else {
            return app.globalData.selectStars;
        }


    },

    set nowSelectStar(star){

        try{
            wx.setStorageSync("APP_NOW_SELECT_STAR", star)
            app.globalData.nowSelectStar = star;

        }catch(e){

        }
    },

    set selectStars(stars){
        try {
            wx.setStorageSync("APP_NOW_SELECT_STAR", star)
            app.globalData.nowSelectStar = star;
        } catch (e) {

        }
    }

}

export {
    globalData
}