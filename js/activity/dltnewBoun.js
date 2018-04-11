var dltnewBounObj = new PageController({
    'name': 'dltnewBoun',
    'tpl': 'template/activity/dltnewBoun.html'
});
//regsendBonus_backbtn regsendBonus_shareObj

dltnewBounObj.createDomObj = function () {
    this.activeObj = $("#regsendBonus_activeObj");
    this.getObj = $("#regsendBonus_getObj");
    this.succObj = $("#regsendBonus_succObj");
    this.backBtn = $('#regsendBonus_backbtn');
    this.shareObj = $('#regsendBonus_shareObj');
}

dltnewBounObj.createEvent = function () {

    $('#regsendBonus_shareObj').tap(function () {  //分享
            $('#global_shareWrap').css('display','block')
        })
        /*$('#pImg_fen').tap(function(){  //分享regsendBonus_backbtn
            $('#global_shareWrap').css('display','block')
            // regsendBonusObj.share();
        })*/
    $('#p_click').tap(function () { //投注
            homeObj.gotoDltBet();
    })

    this.backBtn.unbind('tap').tap(function () {
        // history.go(-1)
        // dltnewBounObj.goBack(); 
        regnewBonusObj.destroy();
        homeObj.show();
    })

    this.shareObj.on('tap', function () {
        // console.log(25)
        dltnewBounObj.share();

    });

    this.activeObj.unbind('tap').tap(function (e) {
        var aObj = $.oto_checkEvent(e, "A");
        if (aObj) {
            var thisObj = $(aObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT) {
                case "gethb" :
                    dltnewBounObj.getAjax();
                    return true;
                case "href" :
                    dltnewBounObj.hrefUrl(thisObj);
                    return true;
                case 'mybonus' :
                    dltnewBounObj.goBonusRecord();
                    return true;
            }
        }
    });
}

dltnewBounObj.goBonusRecord = function () {
    if (!loginObj.isLogin) {
        userCenterObj.goLogin();
        return false;
    }

    // 恢复原来背景颜色
    document.body.style.backgroundColor = Global.bgColor ? Global.bgColor : '#f2f3f7';

    bonusRecordObj.goBack = function () {
        bonusRecordObj.destroy();
        dltnewBounObj.show();
    };
    bonusRecordObj.show();
};

dltnewBounObj.hrefUrl = function (obj) {
    var self = this;
    var thisH = obj.attr("data-h");
    switch (thisH) {
        case 'record':
            bonusRecordObj.goBack = function () {
                bonusRecordObj.destroy();
                self.show();
            }
            bonusRecordObj.show();
            break;
        case 'home':
            Global.GC();
            homeObj.show();
            break;

    }
}

dltnewBounObj.share = function () {
    // dltnewBounObj.getData()
    Global.socialShare({
        'domId': 'regsendBonus',
        'title': '新人礼3元红包免费领',
        'content': '上天天中彩，领新人红包，中百万大奖，享美好人生',
        'url': this.shareObj.url,
        'imagePath': this.shareObj.imagePath
    });
};

dltnewBounObj.getData = function (id) {
//	//console.log(id);
    var postData = {
        'c_event_id': id
    };
    var self = this;
    self.id = id;
    var secretData = {
    	'para': Global.encrypt(postData),
    	'access_token': loginObj.access_token
    }
    $.ajax({
        url: ConfigObj.localSite + '?m=user.activity.regSendBonus',
        data: secretData,
        type: "post",
        dataType: "json",
        success: function (data) {
		console.log('注册送活动返回数据', data);
			
            if (data.code == "0000") {
                /**
                 if (data.info.attended == 'yes') {
                      self.getObj.hide();
                      self.succObj.show();
                  } else {
                      self.getObj.show();
                      self.succObj.hide();
                  }
                 **/
                data.data_info = $.parseJSON(Global.crypt(data.data_info));
                self.shareObj = {};
                self.shareObj.url = data.data_info.share_info.share_url;
                self.shareObj.title = data.data_info.share_info.share_title;
                self.shareObj.content = data.data_info.share_info.share_text;
                self.shareObj.imagePath = data.data_info.share_info.share_pic_url;
                self.formatHtml(data.data_info);
            } else {
                // console.log() gethb
                $.alertMsg(data.code_str);
                self.getObj.show();
                self.succObj.hide();
            }
        }
    });
}

dltnewBounObj.formatHtml = function (data) {
//  //console.log(data);

    if (data.is_valid) {
        //$('#regsendBonus_date').html('活动时间：' + (data.event_begindate || '2017.04.01') + '至' + '红包派完结束');
    	$('#regsendBonus_date').html('活动时间：' + (data.event_begindate || '2017.04.01') + '至' + data.event_enddate);
        $('#regsendBonus_act').attr('data-t', 'gethb').html('立即领取');
    } else {
        $('#regsendBonus_date').html('来晚啦，活动已结束');
        $('#regsendBonus_act').attr('data-t', 'mybonus').html('我的红包');
    }


    $('#regsendBonus_rules').html(data.rule.Register);
};

// 点击领取
dltnewBounObj.getAjax = function () {
    if (!loginObj.isLogin) {
        // console.log(158)
        // 用户未登录，先跳到注册页面
        var id = dltnewBounObj.id;
        registerObj.goBack = function () {
            dltnewBounObj.show(true, function () {
                dltnewBounObj.getData(id);
            });
        };
        // $.alertMsg('请注册后领取红包');
        registerObj.show();
        return;
    }
//  //console.log(loginObj.userInfo.mobile)
    if(loginObj.userInfo.mobile == ""){
    	var id = dltnewBounObj.id;
    	bindPhoneObj.goBack = function () {
            dltnewBounObj.show(true, function () {
                dltnewBounObj.getData(id);
            });
        };
    	$.alertMsg('请绑定手机后领取红包');
    	bindPhoneObj.show();
    	return;
    }
    if (this.checkAjax)return false;
    this.checkAjax = true;
    var postData = {
        'c_event_id': dltnewBounObj.id
    }
    var secretData = {
    	'para': Global.encrypt(postData),
        'access_token': loginObj.access_token
    }
    $.ajax({
        url: ConfigObj.localSite + '?m=user.activity.regReceive',
        data: secretData,
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == "0000") {
                // dltnewBounObj.getSucc();
                $.alertMsg('您已成功领取红包', true);
                setTimeout(function () {
                   Global.GC();
                   homeObj.show();
                }, 2000);
                return false;
            } else if (data.code == '-1007') {
                $.alertMsg(data.code_str);
                dltnewBounObj.checkAjax = false;
                setTimeout(function () {
                    Global.GC();
                    userCenterObj.show('reload');
                }, 2000);
            }
            else {
                $.alertMsg(data.code_str);
                dltnewBounObj.checkAjax = false;
            }
        }
    });
}

dltnewBounObj.getSucc = function () {
    this.getObj.hide();
    this.succObj.show();
}

dltnewBounObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
}

dltnewBounObj.init = function () {
    dltnewBounObj.setDefConfig();
    dltnewBounObj.onloadExecution();
}

dltnewBounObj.setDefConfig = function () {
    this.checkAjax = false;
    this.id = '';
    this.shareImgUrl = '';
}

dltnewBounObj.dirShow = function (obj) {
    var self = this;
    self.show('reload', function () {
        self.id = (obj && obj.id) ? obj.id : ''; // 活动 id
        self.getData(self.id);
    });
}
  
  
	
  

