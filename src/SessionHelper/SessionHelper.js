class SessionHelper {

    static SetSiteInfoFooter(JSONData){
        sessionStorage.setItem('SiteInfoFooter',JSON.stringify(JSONData));
    }
    static GetSiteInfoFooter(callback){
        sessionStorage.getItem('SiteInfoFooter', function (err, value) {
            if(err){
                callback(null)
            }
            else{
                callback(JSON.parse(value))
            }
        });
    }



    static setUserMobile(UserMobile){
        localStorage.setItem("UserMobile",UserMobile)
    }
    static getUserMobile(){
        return  localStorage.getItem("UserMobile")
    }
    static removeUserMobile(){
        return  localStorage.removeItem("UserMobile")
    }



    static SetRedirectFromDetails(winlocation){
        sessionStorage.setItem("winlocation",winlocation)
    }

    static GetRedirectFromDetails(){
        return sessionStorage.getItem("winlocation");
    }
    
}

export default SessionHelper;

