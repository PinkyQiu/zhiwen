$(function() {
	/* 

	  dialog的属性
	  $('#reg').dialog();
		$('#login').dialog();  //可以同时出现

		$('#reg').dialog({
			title:'知问注册',  
			buttons:{
				'提交':function() {
					alert('aa');
				},
				'取消':function() {
					$(this).dialog('close');
				}
			}
		});  //dialog的外观选项

		$('#reg').dialog({
			title:'知问注册',  
			buttons:{
				'提交':function() {
					alert('aa');
				},
				'取消':function() {
					$(this).dialog('close');
				}
			},
			// position:'left top'
			// width:500,
			// height:300
			// minWidth:200,
			// minHeight:200
			// maxWidth:1200,
			// maxHeight:1200

			// show:false;
			// hide:false;  //和不加参数没区别

			// show:true,
			// hide:true  //淡入淡出的效果

			// show:'slide',
			// hide:'slide'    //从左边淡入淡出

			// show:'blind',
			// hide:'blind'   //从顶部显示或消失

			// show:'puff',
			// hide:'puff'   //中心开始缩放
			// autoOpen:false  //隐藏掉整个框


			// draggable:false  //不能移动

			// resizable:false  //不能调整大小


			// modal:true  //外面有一层屏幕，不能操作外面

			closeText:'关闭'  //关闭的title为关闭


		});  //dialog的外观选项

		$('#regA').click(function() {
			$('#reg').dialog('open');
		})  //先隐藏，点击时出现



		dialog的方法

		$('#reg').dialog({
				focus:function(e,ui) {
					alert('焦点');
				}
			});  //刷新时可获得焦点

			$('#login').dialog({
				focus:function(e,ui) {
					alert('焦点');
				}
			}); //有几个点击会获得焦点

			$('#reg').dialog({
				create:function(e,ui) {
					alert('焦点');
				},
				autoOpen:false
			});  //只要创建了就会执行

			$('#reg').dialog({
				open:function(e,ui) {
					alert('焦点');
				},
				autoOpen:false
			});  //只有打开了才会执行

			$('#reg').dialog({
				close:function(e,ui) {
					alert('焦点');
				},
				
			});  //点击关闭就会弹窗

			$('#reg').dialog({
				beforeClose:function(e,ui) {
					alert('焦点');
					return false;
				}	
			});  //没有return false时和close一样，有的话会被执行，对话框不会被关闭
      

      $('#reg').dialog({
				drag:function(e,ui) {
					alert('焦点');
				}	
			});  //每次移动就执行

			$('#reg').dialog({
				drag:function(e,ui) {
					alert('top:'+ui.position.top+','+'left:'+ui.position.left);
				}	
			});  //每次移动获得坐标

			$('#reg').dialog({
				dragStart:function(e,ui) {
					alert('top:'+ui.position.top+','+'left:'+ui.position.left);
				}	
			});  //每次移动获得开始坐标

			$('#reg').dialog({
				dragStop:function(e,ui) {
					alert('top:'+ui.position.top+','+'left:'+ui.position.left);
				}	
			});  //每次移动获得停止坐标

			$('#reg').dialog({
				resize:function(e,ui) {
					alert('a');
				}	
			});  //每次改变框的大小执行

			$('#reg').dialog({
				resize:function(e,ui) {
					alert('width:'+ui.size.width+','+'height:'+ui.size.height);
				}	
			});  //改变框获得宽高

			$('#reg').dialog({
				resizeStart:function(e,ui) {
					alert('width:'+ui.size.width+','+'height:'+ui.size.height);
				}	
			});  //改变框开始获得宽高

			$('#reg').dialog({
				resizeStop:function(e,ui) {
					alert('width:'+ui.size.width+','+'height:'+ui.size.height);
				}	
			});  //改变框结束获得宽高

			$('#reg').dialog({
				autoOpen:false
			});  //改变框结束获得宽高

			$('#regA').click(function() {
				$('#reg').dialog('open');
			})// 关掉时点击打开

			$('#reg').dialog({
				autoOpen:false
			});  //改变框结束获得宽高

			$('#regA').click(function() {
				$('#reg').dialog('open');
			})// 关掉时点击打开

			$('#reg').click(function() {
				$('#reg').dialog('close');
			})// 关闭

			 $('#reg').dialog();
		
			$('#reg').click(function() {
				$('#reg').dialog('destory');
			})  //点击时删除

			$('#reg').dialog();
		
			alert($('#reg').dialog('isOpen'));  //true

			$('#reg').dialog({
				autoOpen:false
			});  //改变框结束获得宽高

		 $('#reg').dialog('open').css('fontSize','50px');  //内容变大，返回的this是reg的div

		 $('#reg').dialog();
			  //改变框结束获得宽高

		 $('#reg').dialog('widget').css('fontSize','50px');  //整个对话框变大，这里返回的this是整体

     alert($('#reg').dialog('option','title'));  //获得title的值 

     $('#reg').dialog({
     	autoOpen:false
     });
			  //改变框结束获得宽高

		 $('#reg').dialog('widget').css('fontSize','50px'); 

		 alert($('#reg').dialog('option','autoOpen'));  //获得autoOpen的值 

     $('#reg').dialog();
     alert($('#reg').dialog('option','title','111'));  //设置title的值

     $('#reg').dialog();
     $('#reg').on('dialogclose',function() {
     	alert('a');
     }); 

     $('#reg').parent().find('button').eq(1).button('disable');  //提交按钮禁用
     

     $('#reg input[type=radio]').button();


     $('#reg').buttonset();




     //tooltip
     $('#reg input[title]').tooltip({
	  	 disabled:true   //工具提示被禁用
	  	 content:'发哈'  //改变title内容
	  	 item:'input'  //只有input的title可以用，其他过滤了
	  	 tooltipClass:'a'  //通过class为a改变样式
	  	 show:false,
	  	 hide:false, //没有淡入淡出效果

	  	 show:'slide',
	  	 hide:'slide',   //左边出现和退出

	  	 track:true,  //title跟随鼠标移动

	  	position:{
	  		my:'left top',
	  		 at:'right center'
	  	},
	  	 open:function(e,ui) {
	  	 	alert(ui.tooltip);   //打开时触发,返回jq的object
	  	 }
	  });

	   $('#pass').tooltip('open');   //一开始就会显示title

	  $('#uesr').on('tooltipopen',function() {
	  	alert('aaa');   //打开时调用
	  })



	  $('#date').datepicker({
  	dateFormat:'yy-mm-dd',
  	//dayNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  	//dayNamesShort:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
    dayNamesMin:['日','一','二','三','四','五','六'],
    monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    altField:'#abc',
    altFormat:'dd-mm-yy',
    //appendText:'日历',
    showWeek:true,
    weekHeader:'周',
    firstDay:1,
    //disabled:true,  //日历禁用
    //numberOfMonths:3,  //弹出3个
    //numberOfMonths:[3,2], //3行2列
    //showOtherMonths:true,//上个月或下个月也显示
    //selectOtherMonths:true  //可以选择上个月或下个月
    changeMonth:true, //有下拉列表可以选择月份
    changeYear:true,   //有下拉列表可以选择年份
    //isRTL:true,  //日历左右反过来了
    //autoSize:true,  //没有设置宽高的话自动调整宽高
    //showOn:'button',   //后面多出个按钮点击按钮出现日历
    //showOn:'both',   //点击框或者右边都可以显示
    //buttonText:'日历',   //按钮值为日历
    showButtonPanel:true,  //日历多了今天和Done
    closeText:'close',     //日历最下面显示关闭
    currentText:'今天',    //日历最下面显示中文今天
    //nextText:'下个月',   //箭头显示下个月
    //prevText:'上个月',   //箭头显示上个月
    //navigationAsDateFormat:true  ,在上下各月或者今天加mm或dd会显示月份或时间
    //yearSuffix:'年',
    //showMonthAfterYear:true,  //年份和时间换了顺序
    maxDate:0,  //明天就不能选择
    //minDate:-8000,  //只能选择昨天和今天
    hideIfNoPrevNext:true,  //next隐藏
    yearRange:'1950:2020',  //设定年份
    //defaultDate:-1, //选定今天的前一天
    //gotoCurrent:false,  //回到今天
    //showAnim:false,
    //duration:1000,  //花一秒钟慢慢出现
    //showAnim:'slide',  //从左边进入
    // beforeShow:function() {
    // 	alert('ww');  //出现日历之前显示
    // }
    // beforeShowDay:function(date) {
    // 	if (date.getDate()==1) {
    // 		return [false,'a','被禁用'];
    // 	}else{
    // 		return [true];
    // 	}
    // }
    // onChangeMonthYear:function(year,month,inst) {
    // 	alert(year);   //改变年份就弹窗
    // 	alert(month);
    // 	alert(inst);
    // }
    // onSelect:function(dateText,inst) {
    // 	alert(dateText);  //选好激活
    // };

    // onClose:function(dateText,inst) {
    // 	alert(dateText);  //关闭或选好激活
    // }
 




  });
  
  //alert($('#reg').datepicker('getDate'));  //获得当前日期
  $('#date').datepicker('setDate','2016-08-09');  //设定日期


	*/

		 $('#reg').dialog({
			title:'知问注册',  
			buttons:{
				'提交':function() {}
			}
		});  //dialog的外观选项

		
     
			  
	 //$('#reg input[type=checkbox]').button(); 

	 //$('#reg').buttonset(); 

		


      

		
			
				
			  

			

			
		 

		
		
})