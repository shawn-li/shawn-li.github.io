(function($){

	//判断是否是移动设备
	var isMobile = (function(){
		var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        var result = !!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
        //console.log(result);
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            
        } else {
            
        }
        return {
        	result : result
        }
	})();


	$.fn.lxSidebar = function(options){
		// console.log(isMobile);
		var settings = $.extend({} ,$.fn.lxSidebar.default, options );

		var $sidebar = $('.l-sidebar');
		var $summary = $('.l-sidebar-summary');
		var $menu = $('.l-sidebar-menu');
		var $main = $('.main');
		var $html_body = $('body,html');

		//sidebar 加载数据
		var lxSidebarJson = function(url){
			
			$.ajaxSetup({  
			    async : false  
			});  
			$.get( url , function(data){
				var _data = data.catalog;

				create(_data);
				console.log('sidebar data loaded!');
			});
		}
		//创建sidebar
		var create = function(_data){
			for (var i = 0; i < _data.length; i++) {
				var type = _data[i].type 
				var arr_obj = [];
				var children = _data[i].children;
				
				if (children) {
					var len = children.length;
					for (var j=0; j<len;j++) {
						//console.log(children[j].type);
						arr_obj.push(children[j]);
					}
				}
				//console.log(arr);
				createLi(document.querySelector('.lx-sidebar-ul'),type,arr_obj);
			}
		}
		//创建sidebar
		var createLi = function(parent ,text, children){
			var liDom = document.createElement('li');
			liDom.className = 'lx-sidebar-li';
			var aDom = document.createElement('a');
			var aTextNode = document.createTextNode(text);
			aDom.className = "js-lx-sidebar-item";
			aDom.appendChild(aTextNode);
			aDom.setAttribute('href','javascript:;');
			var imgDom = document.createElement('img');
			imgDom.className = 'lx-sidebar-arrow js-lx-sidebar-item';
			imgDom.setAttribute('src','./icons/arrow.png');
			var ulDom = document.createElement('ul');
			ulDom.className = 'lx-sidebar-show';
			for (var i = 0; i < children.length; i++) {
				var subliDom = document.createElement('li');
				subliDom.className = 'lx-sidebar-sub-li'
				var subaDom = document.createElement('a');
				subaDom.className = 'js-lx-sidebar-subItem';
				subaDom.setAttribute('href','javascript:;');
				subaDom.setAttribute('data-file',children[i].name);
				subaDom.setAttribute('data-type',children[i].type);
				var aTextNode = document.createTextNode(children[i].type);
				subaDom.appendChild(aTextNode);
				subliDom.appendChild(subaDom);
				ulDom.appendChild(subliDom);
			}

			parent.appendChild(liDom);
			liDom.appendChild(aDom);
			liDom.appendChild(imgDom);
			liDom.appendChild(ulDom);
		}

		var mobile = function(){
			$sidebar.click(function(){
				var $this = $(this);
				if ($sidebar.hasClass('mini')) {
					//sidebar出现
					$sidebar.removeClass('mini');
					$summary.fadeIn(1200);
					$menu.fadeIn(1200);
					$main.removeClass('position');
					$html_body.animate({scrollTop: 0 }, 800);
				}else{
					//sidebar隐藏
					$sidebar.addClass('mini');
					$summary.hide();
					$menu.hide();
					$main.addClass('position');
					$html_body.animate({scrollTop: 0 }, 800);
				}
				return false;
			});

			//手机滑动控制sidebar
			var $body = $('body');
			var touchstart,touchend;
			$body.bind('touchstart', function(e){
				touchstart=e.changedTouches[0].clientX;
			});
			$body.bind('touchend',function(e){
			touchend=e.changedTouches[0].clientX;
				if (touchend - touchstart > 50) {
					//sidebar出现
					$sidebar.removeClass('mini');
					$summary.fadeIn(1200);
					$menu.fadeIn(1200);
					$main.removeClass('position');
					$html_body.animate({scrollTop: 0 }, 800);
				}else if(touchend - touchstart < -50){
					//sidebar隐藏
					$sidebar.addClass('mini');
					$summary.hide();
					$menu.hide();
					$main.addClass('position');
				}
			});
		}

		var PCEvent = function(){
			var $narrow=$('.lx-sidebar-narrow');
			$narrow.on('click',function(){
				var $this = $(this);
				if ($sidebar.hasClass('mini')) {
					//sidebar出现
					$sidebar.removeClass('mini');
					$summary.fadeIn(1200);
					$menu.fadeIn(1200);
					$main.removeClass('position');
				}else{
					//sidebar隐藏
					$sidebar.addClass('mini');
					$summary.hide();
					$menu.hide();
					$main.addClass('position');
				}
				return false;
			});
		}

		var allEvent = function(){
			var $item = $('.js-lx-sidebar-item');
			$item.click(function(){
				var $this = $(this);
				var $Box = $this.parent().find('.lx-sidebar-show');
				var $arrow = $this.parent().find('.lx-sidebar-arrow');
				if ($Box.css('display') == 'none') {
					//全部初始
					$('.lx-sidebar-ul').find('.lx-sidebar-show').slideUp(300);
					$('.lx-sidebar-ul').find('.lx-sidebar-arrow').removeClass('img-rotate');

					$Box.slideDown(300);
					$arrow.addClass('img-rotate');
				}else{
					$Box.slideUp(300);
					$arrow.removeClass('img-rotate');
				}
				$this = null;
				return false;
			});
		}

		// if (isMobile) {
		// 	mobile();
		// }else{
		// 	PCEvent();
		// }
		

		

		return {
			say : function(){
				console.log(1)
			},
			lxSidebarJson : lxSidebarJson,
			mobile: mobile,
			PCEvent: PCEvent,
			allEvent: allEvent
		}

	}
	$.fn.lxSidebar.default={

	}

	window.isMobile = isMobile;
})(jQuery)