
  var searchSiteObj = new PageController({
	   'name': 'searchSite',
	   'tpl' : 'template/station/searchSite.html'
    });
  
  searchSiteObj.getSites=function(){
	  var dataObj = {
		 city :  $('#searchSite_searchCityList_dummy').val(),
		 address : $('#searchSite_searchAddress').val(),
		 fromPage : 'searchSite'
	  }
	  
	  localSiteObj.show('reload',function(){
		  localSiteObj.setData(dataObj);  
		  localSiteObj.pushRoute(function(){
			  searchSiteObj.show();  
		  })
	  })
  };
  
  searchSiteObj.getData = function(){
	 
	 $.ajax({
		url : ConfigObj.localSite +  '?m=user.station.searchStation',
		type:'post',
		data:'',
		dataType:'json',
		success:function(obj){
			//console.log('搜索站点城市区域接口返回 :',obj);
			if(obj.code == '0000'){
				searchSiteObj.formatHtml(obj.info);	
			}else{
				$.alertMsg(obj.code_str);
			}
		},
		
	  })  
	  
  }
  
  searchSiteObj.formatHtml = function(obj){
	  var html = '';
	  for(var i=0;i<obj.length;i++){
		 var itm = obj[i];
		 html += ' <option value="' + itm + '">'+ itm  +'</option>'  
	  }
	  $('#searchSite_searchCityList').html(html);
	  $('#searchSite_searchCityList').mobiscroll().select({
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'bottom',
        fixedWidth: [100, 170]
      });
  }
  
  
  
  searchSiteObj.onloadExecution = function(){
	  $('#searchSite_searchBtn').unbind('tap').tap(function(){
		searchSiteObj.getSites(); 
	  }) 
	  
	  $('#searchSite_cityTit').unbind('tap').tap(function(){
		  $('#searchSite_searchCityList').mobiscroll('show');  
	  })
	  $("#searchSite_searchAddress").unbind('focus').focus(function(){
	  	$(this).parent().addClass('focus');
	  });
	  $("#searchSite_searchAddress").unbind('blur').blur(function(){
	  	$(this).parent().removeClass('focus');
	  });
	  $("#searchSite_backObj").unbind('tap').tap(function(){
	  	  searchSiteObj.goBack();
	  });
      $("#searchSite_stationObj").unbind('tap').tap(function(){
		 localSiteObj.pushRoute(function(){  //路由机制
			searchSiteObj.show();
		 }) 
		 localSiteObj.show('reload');
      });
  }
  
  searchSiteObj.init = function(){
	 searchSiteObj.onloadExecution();
	 searchSiteObj.getData();
  }
  
 
   
   