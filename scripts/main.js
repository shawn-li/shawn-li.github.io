$(document).ready(function(){
	$html_body=$('html,body');
	var $window=$(window);

	var scrollToSection=function(){

		$lxNav_section=$('.lx-nav-section');
		$header_item=$('.header-item');
		//fixed导航栏的item
		$lxNav_Item=$('.lx-nav-item');
		//fixed导航栏
		$lxNav_wrap=$('.lx-nav-wrap');

		//根据点击顶部header导航栏得到对应的section
		var getTargetSectionByNav=function(data){
			var targetTop;
			$lxNav_section.each(function(){
				if ($(this).attr('data-lx-nav') == data) {					
					//需要定位top高度值
					targetTop=$(this).offset().top;
					console.log("top--"+targetTop);
				}
				
			});
			return targetTop;
		}

		//给header按钮绑定事件
		$header_item.click(function(e){
			var el=$(this)

			//取到点击按键的data-lx-nav自定义属性值
			console.log(el.attr('data-lx-nav'));
			var data=el.attr('data-lx-nav');
			var targetTop=getTargetSectionByNav(data);
			console.log(targetTop);			
			if (targetTop == 0 ) {
				return false;
			}else{
				$html_body.animate({scrollTop: targetTop}, 800);
				$lxNav_wrap.fadeIn('fast');
				$lxNav_Item.each(function(){
					if ($(this).attr('data-lx-nav') == data ) {
						$(this).parent().parent().find('a').removeClass('active');
						$(this).addClass('active');
					}
				});
			}
			
		});
	}


	//lx-nav插件
	$(document).lxnav({
		navWidth:'100%'
	});

	scrollToSection();

});