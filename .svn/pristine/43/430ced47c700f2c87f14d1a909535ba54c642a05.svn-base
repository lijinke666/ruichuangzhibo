
/**
 * [rcLoading 载入中]
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
window.rcLoading = function( msg ){
	msg = msg ? msg :'请稍后';
	var list ="";
	for(var i=1; i<=12; i++){
		list+= "<div class='sk-circle"+i+" sk-child'></div>";
	}
	var doms = $("" +
		"<div class='removeLoading jmcpopup modal' style='display: block'><div class='mask'><div class='loading'>" +
		"<div class='sk-circle'>" + list+ "</div><p class='text-center fz18 color-white'>"+msg+"</p></div></div>");
	$("body").append(doms);
};
rcLoading.prototype ={
	remove:function(){
		$(".removeLoading").remove();
	}
};
/**
 * 是否是正整数
 * @param str
 * @returns
 */
function isPInt(str) {
	var g = /^[1-9]*[1-9][0-9]*$/;
	return g.test(str);
}

/**
 * 是否是整数
 * @param str
 * @returns
 */
function isInt(str)
{
	var g=/^-?\d+$/;
	return g.test(str);
}
//正则匹配
function checkVal( req ,val ){
	return req.test( val );
}

//检查字符长度   中文算两个 英文算一个

function WidthCheck(str, maxLen){
	var w = 0;
	var tempCount = 0;
	for (var i=0; i<str.value.length; i++) {

		var c = str.value.charCodeAt(i);

		if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
			w++;
		}
		else {
			w+=2;
		}
		if (w > maxLen) {
			str.value = str.value.substr(0,i);
			break;
		}
	}
}
/**
 * IE8 placeholder
 */
if( !('placeholder' in document.createElement('input')) ){
	$('input[placeholder],textarea[placeholder]').each(function(){
		var that = $(this),
			text= that.attr('placeholder');
		if(that.val()===""){
			that.val(text).addClass('placeholder');
		}
		that.focus(function(){
			if(that.val()===text){
				that.val("").removeClass('placeholder');
			}
		}).blur(function(){
			if(that.val()===""){
				that.val(text).addClass('placeholder');
			}
		}).closest('form').submit(function(){
			if(that.val() === text){
				that.val('');
			}
		});
	});
}

/**
 * 弹出层
 * 调用：popup
 */
(function($) {
	function init($d){
		var $dom = $('<div class="jmcpopup modal"><div class="mask"></div><div class="jmcpopup-wrap modal-wrap"><div class="btn-close"><span class="iconfont icon-close"></span></div></div></div>');
		$('body').append( $dom );

		$dom.find('.btn-close').on('click', function(){
			$dom.fadeOut('fast');
		});

		$dom.find('.jmcpopup-wrap').on('click', function(e){
			e.stopPropagation();
		}).append( $d );

		$d.addClass('initd');

		return $dom;
	}

	$.fn.rcPopup = function(type, options) {
		return this.each(function() {
			var $this = $(this);
			if( type == 'show' ){
				var $dom,$wrap;
				if( ! $this.hasClass('initd') ){
					$dom	= init( $this );
					$wrap	= $dom.find('.jmcpopup-wrap');
				}else{
					$wrap	= $this.parent();
					$dom	= $wrap.parent();
				}
				if( options && options.width && options.height ){
					$wrap.css({'width':options.width, 'height':options.height});
				}
				$dom.fadeIn('fast');
				$this.css('display', 'block');
			}else if( type=='hide' ){
				$this.css('display', 'none').parent().parent().fadeOut('fast');
			}
		});
	};
})(jQuery);


/**
 * 提示框
 * @param	string		msg				消息
 * @param	function	onHideHandler	隐藏后回调
 * @param	int			showTime		显示时间
 * @param	string		desc			描述
 * @param	boolean		issuccess		是否是成功类型
 */
window.rcAlert = function(msg, issuccess, onHideHandler ,desc, showTime){
	var typestr;
	if ( issuccess == true){
		typestr = '<div class="gou"><span class="iconfont icon-true"></span></div>';
	}else if(issuccess == false){
		typestr = '<div class="cha"><span class="iconfont icon-false"></span></div>';
	}else{
		typestr = '<div class="tanhao"><span class="iconfont icon-gantanhao"></span></div>';
	}
	desc = desc ? desc : '温馨提示';
	var $dom = $('<div class="jmcpopup modal" style="display:block"><div class="mask"></div><div class="jmcpopup-wrap modal-wrap ctrl-modal"><div class="modal-title"><h2 class="none">'+desc+'</h2></div><table><tr><td>'+typestr+'<h1 class="none mt20">'+msg+'</h1></td></tr></table></div></div>');
	$('body').append($dom);

	if( typeof showTime == 'undefined' ){
		showTime = 1500;
	}else{
		showTime = Math.max( parseInt(showTime), 1500 );
	}
	var i=setTimeout(function(){
		clearTimeout(i);
		setTimeout(function(){
			$dom.remove();
			if( typeof(onHideHandler) == 'function'){
				onHideHandler();
			}
		}, 500);
		$dom.css('opacity', 0);
	}, showTime);
}

/**
 * 确认框
 * @param	string		msg				消息
 * @param	function	onHideHandler	隐藏后回调
 * @param	object		btns			按钮: 例 {'取消':'btn-default', '确认':'btn-primary'}
 * @param	string		desc			描述
 * @param	boolean		issuccess		是否是成功类型
 */
window.rcConfirm = function(msg, onHideHandler, btns, issuccess, desc ){
	if( typeof btns !== 'object' ){
		btns = {'确定':'btn-success'};
	}
	var btnstr = '';
	for( var key in btns){
		btnstr += '<a href="javascript:void(0)" class="btn '+btns[key]+'">'+key+'</a>';
	}
	var typestr = issuccess ? '<div class="gou"><span class="iconfont icon-true"></span></div>' : '<div class="tanhao"><span class="iconfont icon-gantanhao"></span></div>';
	desc = desc ? desc : '温馨提示';
	var $dom = $('<div class="jmcpopup modal" style="display:block"><div class="mask"></div><div class="jmcpopup-wrap modal-wrap ctrl-modal confirm-table"><table><tr><td>'+typestr+'<h1 class="none mt20">'+msg+'</h1></td></tr><tr><td class="btnbox">'+btnstr+'</td></tr></table></div></div>');
	$('body').append($dom);
	$dom.find('a').on('click', function(){
		var $btn = $(this);
		setTimeout(function(){
			$dom.remove();
			if( typeof onHideHandler == 'function' ){
				onHideHandler( $btn.index() + 1 );
			}
		}, 500);
		$dom.css('opacity', 0);
	});
};

/**
 * 未登录提示
 */
window.notloginConfirm = function(){
	rcConfirm('您还未登录', function(index){
		if(index==1){
			window.location.href = '/login'
		}
	}, {'立即登录':'btn-primary','暂不登录':'btn-cancel'})
}

//刷新登录验证码
function refirshVerify(img){
	//$('#verify-field').removeClass('hidden');
	var url = $(img).data('url');
	$(img).attr("src", url+"?"+Math.random());
}

/**
 * 提示还可输入多少字
 * 输入框  添加 checkwords Class  添加maxlength 属性
 * 显示区域 添加 maxMsgShow Class
 */
(function($){
	$.fn.checkWords = function( ){
		$(this).find(".checkwords").each(function(i){
			var $this = $(this),
				$maxLength = $this.attr('maxlength');  //最大输入
			if( $maxLength ){
				$this.on('keyup',function(){
					var $_this = $(this),
						$thisLength = $_this.val().length,
						$maxMsgShow = $_this.parent().next().find(".maxMsgShow");
					if( $thisLength >= $maxLength ){
						$_this.val($_this.val().substr(0,$maxLength));
						$maxMsgShow.html(0)
					}
					$maxMsgShow.html( $maxLength - $thisLength );
				})
			}
		})
	}
})(jQuery);

//添加年份
(function($){
	$.fn.addYear = function(){
		var nowYear = new Date().getFullYear(),
			year = nowYear - 1897,
			options = '';
		for(var i=0; i<year; i++){
			options += "<option value='"+nowYear+"'>"+nowYear+"年</option>";
			nowYear -= 1;
		}
		$(this).find('.addYear').each(function(){
			var $this = $(this);
			$this.append(options);
		})
	}
})(jQuery);


$(function(){
	(function(){
		//登录表单验证
		var $login_input = $(".login-input"),
			$phone = $login_input.find("#phone"),
			$password = $login_input.find("#pwd"),
			$btn_login = $login_input.find(".btn-login"),
			isPhone = false,
			isPwd = false,
			isAdmin = false;
		var phoneMsg = {
			nullMsg:"请输入手机号",
			successMsg:"",
			errorMsg:"请输入正确的11位手机号"
		};
		var adminMsg = {
			nullMsg:"请输入校园管理员账号",
			successMsg:"",
			errorMsg:"请输入正确校园管理员账号"
		};
		var pwdMsg = {
			nullMsg:"请输入密码",
			successMsg:"",
			errorMsg:"请输入正确的密码（6-15位字符）"
		};
		//登录身份切换
		var $select_status = $(".select-status>a");
		$select_status.on("click",function(){
			var $this = $(this);
			$phone.val('');
			$password.val('');
			$this.addClass("active").siblings().removeClass("active");
			if($this.hasClass("admin")){
				isAdmin = true;
				$phone.addClass("admin").attr("placeholder","请输入学校管理员账号")
			}else{
				isAdmin = false;
				$phone.attr("placeholder","请输入手机号")
			}
			$login_input.find(".login-msg").html('');
		});
		var checkReq = {
			checkAdmin:/^[0-9a-zA-Z]+$/,
			phone:/^[1][3|4|5|6|7|8][0-9]{9}$/,
			pwd: /^[0-9a-zA-Z\x21-\x7e]{6,15}$/
		};
		//手机号验证
		$phone.on("keyup blur",function(){
			var req;
			if(isAdmin === true){
				req = checkReq.checkAdmin;
			}else{
				req = checkReq.phone;
			}
			var $this = $(this),
				msgShowBox = $this.next().next(),
				val = $this.val(),
				checkPhone = checkVal(req, val);

			if(checkPhone){
				isPhone = true;
				$this.addClass("successfocus").removeClass("errorfocus");
				if(isAdmin == true){
					msgShowBox.html( adminMsg.successMsg );
				}else{
					msgShowBox.html( phoneMsg.successMsg );
				}

			}else if(val == ""){
				isPhone = false;
				$this.addClass("errorfocus").removeClass("successfocus");
				if(isAdmin == true){
					msgShowBox.html( adminMsg.nullMsg );
				}else{
					msgShowBox.html( phoneMsg.nullMsg );
				}

			}else{
				isPhone = false;
				$this.addClass("errorfocus").removeClass("successfocus");

				if(isAdmin == true){
					msgShowBox.html( adminMsg.errorMsg );
				}else{
					msgShowBox.html( phoneMsg.errorMsg );
				}
			}
		});
		//密码验证
		$password.on("keyup blur",function(){
			var $this = $(this),
				msgShowBox = $this.next().next(),
				val = $this.val(),
				checkPhone = checkVal(checkReq.pwd, val);
			if(checkPhone){
				isPwd = true;
				$this.addClass("successfocus").removeClass("errorfocus");
				msgShowBox.html( pwdMsg.successMsg );
			}else if(val == ""){
				isPwd = false;
				$this.addClass("errorfocus").removeClass("successfocus");
				msgShowBox.html( pwdMsg.nullMsg );
			}else{
				isPwd = false;
				$this.addClass("errorfocus").removeClass("successfocus");
				msgShowBox.html( pwdMsg.errorMsg );
			}
		});

		//登录
		$btn_login.on("click",function(){
			var username = $phone.val();
			var password = $password.val();
			if( username == ''){
				$phone.focus().addClass("errorfocus").next().next().html("请输入");
			}
			if( password == ''){
				$password.focus().addClass("errorfocus").next().next().html("请输入");
			}
			var req;
			if(isAdmin === true){
				req = checkReq.checkAdmin;
			}else{
				req = checkReq.phone;
			}
			if(checkVal(req,username)){
				isPhone = true;
			}
			if(checkVal(checkReq.pwd,password)){
				isPwd = true;
			}
			var type = 1;
			$.each($select_status,function(){
				var $this = $(this);
				if($this.hasClass("active")){
					type = $this.attr("name");
				}
			});

			if( isPhone===true && isPwd === true ){
				var url = $("form[name='login-form']").attr("action");
				var loading;
				$.ajax({
					url:url,
					type:"post",
					data:{username:username,password:password,type:type},
					dataType:"json",
					cache: false,
					beforeSend:function(){
						loading = new rcLoading("登录中...");
					},
					success:function(data){
						loading.remove();
						if(data.status == 0)
						{
							rcAlert(data.info,false);
						}
						if(data.status == 1)
						{
							rcAlert(data.info,true,function(){
								window.location.href=data.url;
							});

						}

					},
					error:function(){
						loading.remove();
						rcAlert("登录失败",false,function(){
							$password.val('').focus();
						})
					}
				})
			}
		});
	})();
	//忘记密码
	(function(){
		var $send_code = $("#send_code");
		$send_code.on("click", function () {
			var $this = $(this),
				$form = $this.parents("form"),
				phoneReq = /^[1][3|4|5|6|7|8][0-9]{9}$/,
				mobile = $form.find("input[name='mobile']").val();

			//是否处于发送验证码的状态
			if ($this.hasClass("ing")) {
				return;
			}
			//是否有验证码
			var ishasVerify = $this.data("hasverify");

			//有验证码
			if (typeof (ishasVerify) != 'undefined' && ishasVerify != 'false') {
				var verifycode = $form.find("input[name='verify']").val();
				if (verifycode.length != 4) {
					return rcAlert("请填写正确的图形验证码");
				}
			}
			//判断手机
			if (!phoneReq.test(mobile)) {
				return rcAlert("请填写正确的手机号");
			}
			var loading;
		 	 var type = 1,
                $select_status = $(".select-status>a");
            $.each($select_status,function(){
                var $this = $(this);
                if($this.hasClass("active")){
                    type = $this.attr("name");
                }
            });



			$.ajax({
				url: $this.data("url"),
				type:"post",
				data: {mobile:mobile,verify:verifycode,type:type},
				dataType: "json",
				cache: false,
				beforeSend:function(){
					loading = new rcLoading("发送中..");
				},
				error: function () {
					loading.remove();
					$this.html("发送验证码").removeClass("ing");
					rcAlert("发送失败", false);
				},
				success: function (data) {
					loading.remove();
					rcAlert(data.info, data.status==1?true:false);
					if(data.status==1)
					{
						var i = 60;
						var codeInterval = setInterval(function () {
							$this.html(i + "秒后重发");
							if (i == 0) {
								clearInterval(codeInterval);
								$this.html("发送验证码").removeClass("ing");
							}
							i--;
						}, 1000);
					}else{
						$this.removeClass("ing");
					}

				}
			});
			$this.addClass("ing");
		});

	})();

	//回到顶部
	var $backTop = $(".backTop");
	$backTop.on("click",function(){
		$("body").animate({"scrollTop":0},500)
	});

	$(window).scroll(function(){
		var top = $(document).scrollTop();
		if(top>=300){
			$backTop.show();
		}else{
			$backTop.hide();
		}
	});

	//头部导航栏效果
	var nav_move = $(".nav-move>li"),
		nav_move_bar = $(".nav-move-bar");    //移动条
	var offWidths = [];          //当前active状态下的 宽 和left
	//遍历当前active状态下的  width left
	$.each(nav_move, function () {
		var $this = $(this);
		if ($this.hasClass("active")) {
			var offsetWidth = $this.get(0).offsetWidth,
				offsetLeft = $this.get(0).offsetLeft;
			offWidths.push(offsetWidth, offsetLeft)
		}
	});
	initBar(nav_move_bar);
	nav_move.hover(function () {
		var $this = $(this);
		var offsetWidth = $this.get(0).offsetWidth,
			offsetLeft = $this.get(0).offsetLeft;
		nav_move_bar.css({
			"width": offsetWidth,
			"left": offsetLeft
		})
	}, function () {
		initBar(nav_move_bar);
	});
	//初始化移动条
	function initBar(ele) {
		ele.css({
			"width": offWidths[0],
			"left": offWidths[1]
		})
	}

	//个人中心 导航切换
	var $usercenter_menu = $(".usercenter-menu>h5"),
		$usermenu = $(".usercenter-menu>.usermenu");
	$usercenter_menu.on("click",function(){
		var $this = $(this);
		$this.find("i").addClass("rotate").parent().siblings("h5").find("i").removeClass("rotate");
		$this.next(".usermenu").slideDown().siblings(".usermenu").slideUp();
	});

    //显示当前导航栏
	$.each($usermenu,function(){
		var $this = $(this);
		var list = $this.find("a");
		if(list.hasClass("active")){
			$this.show();
			$this.prev().find('i').addClass('rotate');
			return false;
		}
	})
});