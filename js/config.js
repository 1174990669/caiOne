if (ConfigObj) {
    ConfigObj.local = false;

    ConfigObj.appName = 'dianshicai';
    ConfigObj.appEnname = '';
    ConfigObj.version = '';	//内核版本（HTML、JS）
    ConfigObj.umengChannel = '';		//从app获取
    ConfigObj.appVersionCode = '';	//app的版本代码( ios ?)
    ConfigObj.appVersionName = '';	//app的版本名称( ios ?)
	ConfigObj.stationId='';			//从app获取
	ConfigObj.tel = "13318747935";
	ConfigObj.a1 = "";
	ConfigObj.a2 = "";
	ConfigObj.display = true;
	ConfigObj.last_time = 3; //登录错误次数
        //ConfigObj.platForm

    // 正式环境接口
    ConfigObj.zdid = '';
    // ConfigObj.zdid = 'E93C17-C7DF-0B2C93';  //咨询版本
    // ConfigObj.zdid = '0F267B-2DF3-D646F5';

    ConfigObj.appkey = 'EF0D1335-20C7-1993-F970-A69DEE4A253F';

    ConfigObj.localSite = 'http://a.xxyya.cn:8269/api'; //测试
    // ConfigObj.localSite = 'http://cptest.xxyya.cn:9527/api'; //正式
    // ConfigObj.localSi = 'http://a.91zibo.com/api';
    // console.log(ConfigObj.localSite)
    // ConfigObj.touchWebSite = 'http://caipiao.91zibo.com/';
    ConfigObj.appDLUrl = 'http://outershare.huohuotuan.cn'; // 下载页
    // ConfigObj.appDLUrl = 'http://www.huohuotuan.cn/game/langshisan.html'; // 下载页

	// 测试环境接口
//	ConfigObj.zdid = '6EEE91-9860-98F347';
//	ConfigObj.appkey = 'EF0D1335-20C7-1993-F970-A69DEE4A253F';
//  ConfigObj.localSite = 'http://a.91zbl.cn:8080/api';
//	ConfigObj.touchWebSite = 'http://caipiao.91zbl.cn:8080/';
//  ConfigObj.appDLUrl = 'http://caipiao.91zbl.cn:8080/System/DownLoad/page?sharefrom=app'; // 下载页

    if (ConfigObj.local) ConfigObj.localSite = 'p.js';

    ConfigObj.fastLotType = 'gd11x5';
    ConfigObj.fastLotApi = {
        'tjsyy': {
            scheme: '?m=lottery.Tjsyy.index',
            chart: '?m=Lottery.Tjsyy.getChartData'
        },
        'gd11x5': {
            scheme: '?m=lottery.Gd11x5.index',
            chart: '?m=Lottery.Gd11x5.getChartData'
        },
        'sd11x5': {
            scheme: '?m=lottery.sd11x5.index',
            chart: '?m=Lottery.sd11x5.getChartData'
        },        
        'xj11x5': {
            scheme: '?m=lottery.xj11x5.index',
            chart: '?m=Lottery.xj11x5.getChartData'
        },
        'gx11x5': {
            scheme: '?m=lottery.gx11x5.index',
            chart: '?m=Lottery.gx11x5.getChartData'
        },
        'hub11x5': {
            scheme: '?m=lottery.Hub11x5.index',
            chart: '?m=Lottery.Hub11x5.getChartData'
        },
        'jx11x5': {
            scheme: '?m=lottery.jx11x5.index',
            chart: '?m=Lottery.jx11x5.getChartData'
        }
    };

    ConfigObj.fastK3Type = 'jxk3';
    ConfigObj.fastK3Api = {
        'jxk3':{
            scheme:'?m=lottery.jxk3.index',
            chart:'?m=Lottery.jxk3.getChartData'
        },
        'gxk3': {
            scheme: '?m=lottery.gxk3.index',
            chart: '?m=Lottery.gxk3.getChartData'
        },
        'jlk3':{
        	scheme:'?m=lottery.jlk3.index',
        	chart:'?m=Lottery.jlk3.getChartData'
        }
    };

    ConfigObj.syx5Type = ['gd11x5', 'xj11x5', 'sd11x5', 'gx11x5']; // 各省 11选5
    
    
    if (ConfigObj.platForm === 'android' && typeof android_obj !== 'undefined') {
        ConfigObj.umengChannel = android_obj.getUmengChannel();	//友盟ID
        ConfigObj.version = android_obj.getAppVersionName(); // 安卓应用管理上显示的版本
        ConfigObj.stationId = android_obj.getStationId();
        ConfigObj.zdid = android_obj.getStationId();
    } else if (ConfigObj.platForm === 'ios' && typeof ios_obj !== 'undefined') {
        ios_obj.upLoadUMengChanelIdForLottery();  //友盟ID
        ConfigObj.zdid = '';    //ios渠道号
    }   
}
