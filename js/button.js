$(function() {
	/*
	$('#searchButton').button({
		// disabled:true    //点击无效
		// label:'搜索'    //更换value
		icons:{
			primary:'ui-icon-search',  //前面添加图标
			// secondary:'ui-icon-triangle-1-s'  //后面添加图标
		},
		// text:false  //文字被隐藏掉了

		$('#searchButton').button('disable');  //禁用
    $('#searchButton').button('enable');  //启用
	  });


	  $.cookie('user','卡',{
    expires:7,
    path:'/'  //时间7天后过期
    domain:'www.ycku.com',  //限制了域名没有生成
    secure:true,  //隐藏
	  });
	  $.cookie.raw=true;
	  $.cookie('use','是')
	  alert($.cookie('use'));
	  alert($.cookie('use'));
	  alert($.cookie().use);
	  $.removeCookie('user',{
	    path:'/',
	  });


*/

	$('#searchButton').button({
		// disabled:true    //点击无效
		// label:'搜索'    //更换value
		icons:{
			primary:'ui-icon-search',  //前面添加图标
			// secondary:'ui-icon-triangle-1-s'  //后面添加图标
		},
		// text:false  //文字被隐藏掉了
	});
  
  $('#searchButton').button('disable');  //禁用
  $('#searchButton').button('enable');  //启用

})