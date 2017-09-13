$(function() {

  // 搜索按钮
  $('#searchButton').button({
    icons: {
      primary: 'ui-icon-search', //前面添加图标
    }
  });

  // 提问按钮
  $('#questionButton').button({
    icons: {
      primary: 'ui-icon-lightbulb', //前面添加图标
    }
  }).click(function() {
    if ($.cookie('user')) {
      $('#question').dialog('open');
    }else{
      $('#error').dialog('open');
      setTimeout(function() {
        $('#error').dialog('close');
        $('#login').dialog('open');
      },1000)
    }
  });

  $.ajax({
    url:'showContent.php',
    type:'POST',
    success:function(response,status,xhr) {
      var json=$.parseJSON(response);
      var html='';
      var arr=[];
      var summary=[];
      $.each(json,function(index,value) {
        html+='<h4>' + value.user +' 发表于 '+ value.date +'</h4>'
        +'<h3>'+ value.title+'</h3>'
        +'<div class="editor">'+value.content+'</div>'
        +'<div class="bottom"><span class="comment" dataId="'+value.id+'">'+value.count+'条评论</span><span class="up">收起</span></div>'
        +'<hr noshade="noshade" size="1">'
        +'<div class="commentList"></div>'

      })

      $('.content').append(html);

      $.each($('.editor'),function(index,value) {
        arr[index]=$(value).html();
        summary[index]=arr[index].substr(0,200);
        if (summary[index].substring(199,200)=='<') {
          summary[index]=replacePos(summary[index],200,'');
        };
        if (summary[index].substring(198,200)=='</') {
          summary[index]=summary[index]=replacePos(summary[index],200,'');
          summary[index]=replacePos(summary[index],199,'');     
        };
        if (arr[index].length>200) {
          summary[index]+='...<span class="down">显示全部</span>'
          $(value).html(summary[index]);
        };
        $('.bottom .up').hide();
        
      });
      $.each($('.editor'),function(index,value) {
        $(this).on('click','.down',function() {
          $('.editor').eq(index).html(arr[index]);
          $(this).hide();
          $('.bottom .up').eq(index).show();
        })
      });

      $.each($('.bottom'),function(index,value) {
        $(this).on('click','.up',function() {
          $('.editor').eq(index).html(summary[index]);;
          $(this).hide();
          $('.editor .down').eq(index).show();
        })
      });

      $.each($('.bottom'),function(index,value) {
        $(this).on('click','.comment',function() {
          var commentListThis=this;
          if ($.cookie('user')) {
            if (!$('.commentList').eq(index).has('form').length) {
              $.ajax({
                url:'showComment.php',
                type:'POST',
                data:{
                  titleid:$(commentListThis).attr('dataId'),
                },
                beforeSend:function(jqXHR,settings) {
                  $('.commentList').eq(index).append('<dl class="commentLoad"><dd>正在加载评论</dd><dt>');        
                },
                success:function(response,status) {
                  $('.commentList').eq(index).find('.commentLoad').hide();
                  var jsonComment=$.parseJSON(response);
                  var count=0;
                  $.each(jsonComment,function(index2,value) {
                    count=value.count;
                    $('.commentList').eq(index).append('<dl class="commentContent"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>');
                  })
                  $('.commentList').eq(index).append('<dl><dd><span class="loadMore">加载更多评论</span></dd></dl>')
                  var page=2;
                  if (page>count) {
                    $('.commentList').eq(index).find('.loadMore').off('click');
                    $('.commentList').eq(index).find('.loadMore').hide();
                  };
                  $('.commentList').eq(index).find('.loadMore').button().on('click',function() {
                    $('.commentList').eq(index).find('.loadMore').button('disable');
                    $.ajax({
                      url:'showComment.php',
                      type:'POST',
                      data:{
                        titleid:$(commentListThis).attr('dataId'),
                        page:page,
                      },
                      beforeSend:function(jqXHR,settings) {
                        $('.commentList').eq(index).find('.loadMore').html('<img src="../images/loadMore.gif"/>')        
                      },
                      success:function(response,status) {
                        var jsonCommentMore=$.parseJSON(response);
                        $.each(jsonCommentMore,function(index3,value) {
                          $('.commentList').eq(index).find('.commentContent').last().after('<dl class="commentContent"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>');
                        });
                        $('.commentList').eq(index).find('.loadMore').button('enable');
                        $('.commentList').eq(index).find('.loadMore').html('加载更多评论');
                        page++;
                        if (page>count) {
                          $('.commentList').eq(index).find('.loadMore').off('click');
                          $('.commentList').eq(index).find('.loadMore').hide();
                        };
                      },
                    })
                  })
                  $('.commentList').eq(index).append('<form><dl class="commentAdd"><dt><textarea name="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="'+$(commentListThis).attr('dataId')+'"/><input type="hidden" name="user" value="'+$.cookie('user')+'"/><input type="button" value="发表"/></dd></dl></form>');
                  $('.commentList').eq(index).find('input[type=button]').button().click(function() {
                    var _this=this;
                    $('.commentList').eq(index).find('form').ajaxSubmit({
                      url:'addComment.php',
                      type:'POST',
                      beforeSubmit:function(formData,jqForm,options) {
                        $('#loading').dialog('open');
                        $(_this).button('disable');              
                      },
                      success:function(responseText,statusText) {
                        if(responseText) {
                          $(_this).button('enable');
                          $('#loading').css('background','url(../images/succ.png) no-repeat 16px center').html('数据新增成功'); 
                          setTimeout(function() {
                            var date=new Date();
                            $('#loading').dialog('close');
                            $('.commentList').eq(index).prepend('<dl class="commentContent"><dt>'+$.cookie('user')+'</dt><dd>'+$('.commentList').eq(index).find('textarea').val()+'</dd><dd>'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds()+'</dd></dl>')          
                            $('.commentList').eq(index).find('form').resetForm();
                            $('#loading').css('background','url(../images/loading.png) no-repeat 16px center').html('数据交互中...');
                          },1000) 
                        };
                      },
                    })
                  }) 
                },
              })
            }; 
            if ($('.commentList').eq(index).is(':hidden')) {
              $('.commentList').eq(index).show();
            }else{
              $('.commentList').eq(index).hide();
            };  
          }else{
            $('#error').dialog('open');
            setTimeout(function() {
              $('#error').dialog('close');
              $('#login').dialog('open');
            },1000)
          }
        })

      });  

       
      // $.each($('.editor'),function(index,value) {
      //   arr[index]=$(value).height();
      //   if ($(value).height()>155) {
      //     $(value).next('.bottom').find('.up').hide();
      //   };
      //   $(value).height(170);
      // });

      // $.each($('.bottom .down'),function(index,value) {
      //   $(this).click(function() {
      //     $(this).parent().prev().height( arr[index]);
      //     $(this).hide();
      //     $(this).parent().find('.up').show();
      //   })
      // });

      // $.each($('.bottom .up'),function(index,value) {
      //   $(this).click(function() {
      //     $(this).parent().prev().height(170);
      //     $(this).hide();
      //     $(this).parent().find('.down').show();
      //   })
      // });



    }
  })
  
  // 问题框
  $('#question').dialog({
    autoOpen: false,
    modal: true, //外面有一层屏幕，不能操作外面
    width: 500,
    height: 360,
    resizable: false, //不能调整大小  
    buttons: {
      '发布': function() {
        $(this).ajaxSubmit({
          url:'addContent.php',
          type:'POST',
          data:{
            user:$.cookie('user'),
            content:$('.uEditorIframe').contents().find('#iframeBody').html(),
          },
          beforeSubmit:function(formData,jqForm,options) {
            $('#loading').dialog('open');
            $('#question').dialog('widget').find('button').eq(1).button('disable');              
          },
          success:function(responseText,statusText) {
            if(responseText) {
              $('#question').dialog('widget').find('button').eq(1).button('enable');
              $('#loading').css('background','url(../images/succ.png) no-repeat 16px center').html('数据新增成功'); 
              setTimeout(function() {
                $('#loading').dialog('close');
                $('#question').dialog('close');
                $('#question').resetForm();
                $('.uEditorIframe').contents().find('#iframeBody').html('请输入问题描述');
                $('#loading').css('background','url(../images/loading.png) no-repeat 16px center').html('数据交互中...');
              },1000) 
            };
          },
        });
      }
    }
  });
  
  // 编辑器
  $('.uEditorCustom').uEditor();
  
  // 错误框先登录
  $('#error').dialog({
    autoOpen:false,
    modal:true,
    closeOnEscape:false,
    resizable:false,
    draggable:false,
    width:180,
    height:50
  }).parent().find('.ui-widget-header').hide();
  
  //登录后隐藏
  $('#member,#logoutA').hide();
  if ($.cookie('user')) {
    $('#member,#logoutA').show();
    $('#regA,#loginA').hide();
    $('#member').html($.cookie('user'));
  }else{
    $('#regA,#loginA').show();
    $('#member,#logoutA').hide();
  }
  
  // 点击退出回到未登录状态
  $('#logoutA').click(function() {
    $.removeCookie('user');
    window.location.href='/zhiwen/html/';
  });
  
  // 加载
  $('#loading').dialog({
    autoOpen:false,
    modal:true,
    closeOnEscape:false,
    resizable:false,
    draggable:false,
    width:180,
    height:50
  }).parent().find('.ui-widget-header').hide();

  // 点击注册
  $('#regA').click(function() {
    $('#reg').dialog('open');
  })

  // 注册
  $('#reg').dialog({
    autoOpen: false,
    modal: true, //外面有一层屏幕，不能操作外面
    width: 320,
    height: 340,
    resizable: false, //不能调整大小  
    buttons: {
      '提交': function() {
      	$(this).submit();
      }
    }
  }).buttonset().validate({
		submitHandler:function(form) { 
      $(form).ajaxSubmit({
        url:'add.php',
        type:'POST',
        beforeSubmit:function(formData,jqForm,options) {
          $('#loading').dialog('open');
          $('#reg').dialog('widget').find('button').eq(1).button('disable');  
          
        },
        success:function(responseText,statusText) {
          if(responseText) {
            $('#reg').dialog('widget').find('button').eq(1).button('enable');
            $('#loading').css('background','url(../images/succ.png) no-repeat 16px center').html('数据新增成功'); 
            $.cookie('user',$('#user').val());
            
            setTimeout(function() {
              $('#loading').dialog('close');
              $('#reg').dialog('close');
              $('#reg').resetForm();
              $('#reg span').html('*').removeClass('succ');
              $('#loading').css('background','url(../images/loading.png) no-repeat 16px center').html('数据交互中...');
              $('#member,#logoutA').show();
              $('#regA,#loginA').hide();
              $('#member').html($.cookie('user')); 
            },1000) 
          };
        },
      })
		},
		showErrors:function(errorMap,errorList) {  
			var error=this.numberOfInvalids();
			if (error>0) {
        $('#reg').dialog('option','height',error*20+340);
       }else{
       	$('#reg').dialog('option','height',340);
       }
			this.defaultShowErrors();
		},
		highlight:function(element,errorClass) {
			$(element).css('border','1px solid #630');
      $(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight:function(element,errorClass) {
			$(element).css('border','1px solid #ccc');
			$(element).parent().find('span').html('&nbsp').addClass('succ');
		},
		errorLabelContainer:'ol.regError',
		wrapper:'li',
		rules:{
			user:{
				required:true,
				minlength:2,
        remote:{
          url:'isUser.php',
          type:'POST',
        }
			},
			pass:{
				required:true,
				minlength:6,
			},
			email:{
				required:true,
				email:true
			},
			date:{
				date:true
			},
		},
		messages:{
			user:{
				required:'账号不得为空',
				minlength: '账号不得小于{0}位',
        remote:'账号被占用',
			},
			pass:{
				required:'密码不得为空',
				minlength: '密码不得小于{0}位',
			},
			email:{
				required:'邮箱不得为空',
				minlength: '请输入正确的邮箱',
			},
		}
	});

  // 日历表
  $('#date').datepicker({
  	dateFormat:'yy-mm-dd',
  	dayNamesMin:['日','一','二','三','四','五','六'],
  	monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    changeMonth:true, //有下拉列表可以选择月份
    changeYear:true,   //有下拉列表可以选择年份
    maxDate:0,  //明天就不能选择
    yearRange:'1950:2020',  //设定年份
    showMonthAfterYear:true,
  });
 
  // email
  $('#email').autocomplete({
  	delay:0,
  	autoFocus:true,
    source: function(request, response) {
      // alert(request.term);   //输入什么弹出什么
      // response(['aa','aaaa','aaaaa','bb'])  //绑定数据源，不会根据你的数据而呈现结果，会把所以呈现出来
      var hosts = ['qq.com', '163.com', '263.com', 'sina.com.cn', 'gmail.com'],
        term = request.term, //获取用户输入的内容
        name = term, //邮箱的用户名
        host = '', //邮箱的域名
        ix = term.indexOf('@'), //@的位置
        result = []; //最终呈现的邮箱列表

      result.push(term);


      //当有@的时候，重新分别用户名和域名
      if (ix > -1) {
      	name=term.slice(0,ix);
      	host=term.slice(ix+1);
      };
      if (name) {
      	var findedHosts=(host?$.grep(hosts,function(value,index) {
      			return value.indexOf(host)>-1;
      		}):hosts),   
      	    findedResult=$.map(findedHosts,function(value,index) {
           return name+'@'+value;
      	})
      	result=result.concat(findedResult);
      }
      response(result);
    }
  })


  // 点击登录
  $('#loginA').click(function() {
    $('#login').dialog('open');
  })

  // 登录
  $('#login').dialog({
    autoOpen: false,
    modal: true, //外面有一层屏幕，不能操作外面
    width: 320,
    height: 250,
    resizable: false, //不能调整大小  
    buttons: {
      '登录': function() {
        $(this).submit();
      }
    }
  }).validate({
    submitHandler:function(form) {
      $(form).ajaxSubmit({
        url:'isLogin.php',
        type:'POST',
        beforeSubmit:function(formData,jqForm,options) {
          $('#loading').dialog('open');
          $('#login').dialog('widget').find('button').eq(1).button('disable');  
          
        },
        success:function(responseText,statusText) {
          if(responseText) {
            $('#login').dialog('widget').find('button').eq(1).button('enable');
            $('#loading').css('background','url(../images/succ.png) no-repeat 16px center').html('登录成功'); 
            if ($('#expires').is(':checked')) {
              $.cookie('user',$('#loginUser').val(),{
                expires:7,
              })
            }else{
              $.cookie('user',$('#loginUser').val());
            }
            setTimeout(function() {
              $('#loading').dialog('close');
              $('#login').dialog('close');
              $('#login').resetForm();
              $('#login span').html('*').removeClass('succ');
              $('#loading').css('background','url(../images/loading.png) no-repeat 16px center').html('数据交互中...');
              $('#member,#logoutA').show();
              $('#regA,#loginA').hide();
              $('#member').html($.cookie('user')); 
            },1000) 
          };
        },
      })
    },
    showErrors:function(errorMap,errorList) {  
      var error=this.numberOfInvalids();
      if (error>0) {
        $('#login').dialog('option','height',error*20+250);
       }else{
        $('#login').dialog('option','height',250);
       }
      this.defaultShowErrors();
    },
    highlight:function(element,errorClass) {
      $(element).css('border','1px solid #630');
      $(element).parent().find('span').html('*').removeClass('succ');
    },
    unhighlight:function(element,errorClass) {
      $(element).css('border','1px solid #ccc');
      $(element).parent().find('span').html('&nbsp').addClass('succ');
    },
    errorLabelContainer:'ol.loginError',
    wrapper:'li',
    rules:{
      loginUser:{
        required:true,
        minlength:2
      },
      loginPass:{
        required:true,
        minlength:6,
        remote:{
          url:'isLogin.php',
          type:'POST',
          data:{
            loginUser:function() {
              return $('#loginUser').val();
            }
          }
        }
      },
    },
    messages:{
      loginUser:{
        required:'账号不得为空',
        minlength: '账号不得小于{0}位',
      },
      loginPass:{
        required:'密码不得为空',
        minlength: '密码不得小于{0}位',
        remote:'账号或密码不正确',
      },
    }
  });
   
   // 切换
   $('#tabs').tabs();


   // 下拉菜单
   $('#accordion').accordion();


})
  

  function replacePos(strObj,pos,replaceText) {
    return strObj.substr(0,pos-1)+replaceText+strObj.substring(pos,strObj.length);
  }
