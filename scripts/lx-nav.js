(function($,Math){

	//fixed导航栏包括fixed按钮框
	$.fn.lxnav=function(options){

		var $window=$(window);
		$lxNav=$('.lx-nav');
		$html_body=$('html,body');
		$lxNav_wrap=$('.lx-nav-wrap');
		$lxNav_Pre=$('.lx-nav-pre');
		$lxNav_Next=$('.lx-nav-next');
		$lxNav_section=$('.lx-nav-section');
		$lxNav_Item=$('.lx-nav-item');

		var settings=$.extend( {} , $.fn.lxnav.default , options );
		//导航栏按钮个数
		var lxNavItemNum = $('.lx-nav-item').length;


		//初始化		
		if (settings.sidebarHeight != 'auto' && typeof settings.sidebarHeight =='number') {
			$lxNav.css("height",settings.sidebarHeight);
		}
		if (settings.wrapWidth != 'auto') {
			$lxNav.css("width",settings.navWidth);
		}
		if (settings.sectionHeight != 'auto' && typeof settings.sectionHeight =='number') {
			$lxNav_section.css("height",settings.sectionHeight);
		}
		console.log($lxNav.width());
		settings.navItemWidth = (($lxNav.width()-20-lxNavItemNum*20+20)/lxNavItemNum);
		//console.log(settings.navItemWidth);
		if (settings.navItemWidth != 'auto' && typeof settings.navItemWidth =='number') {
			$lxNav_Item.css("width",settings.navItemWidth);
			console.log(settings.navItemWidth);
		}
		$lxNav_wrap.hide();
		
		//sectionTopList ==> sectionDataList ==> lxNavList

		//按顺序取每个！section！的scrollTop放入数组sectionTopList
		var sectionTopList = [];
		for (var i = 0; i < $lxNav_section.length; i++) {
			sectionTopList.push(Math.round($lxNav_section.eq(i).offset().top));
		}
		//按顺序取每个！section！的data-lx-nav值放入sectionDataList
		var sectionDataList = [];
		for (var i = 0; i < $lxNav_Item.length; i++) {
			sectionDataList.push($lxNav_section.eq(i).attr('data-lx-nav'));
		}
		//对应secttionTopList的顺序取到！lx-nav！中data-lx-nav值放入lxNavList
		var lxNavList = [];
		for (var i = 0; i < $lxNav_Item.length; i++) {
			lxNavList.push($lxNav_Item.eq(i).attr('data-lx-nav'));
		}
		console.log(sectionTopList);
		console.log(sectionDataList);
		console.log(lxNavList);
		
		$lxNav.css({"background-color": settings.navBgColor});
		$lxNav.css({
			"opacity": settings.navOpacity,
			"-moz-opacity":settings.navOpacity
		});


		//根据点击导航栏得到对应的section
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

		//按pre键通过当前scrollTop值判断得到应该滚动的目标section的top值，然后取到对应的nav按键
		//增加active类，返回targetTop用于滚动事件
		var getPreTargetNavBySection=function(nowTop){
			//目标section的将要滚动到的高度top
			var targetTop = 0;
			//目标section的序号
			var target = 0;
			//目标nav的序号
			var target_nav = 0;
			for (var i = 0; i < sectionTopList.length; i++) {
				if (nowTop  > sectionTopList[i] ) {
					targetTop = Math.round(sectionTopList[i]);
					target = i;
				}
			}
			var data = sectionDataList[target];
			for (var i = 0; i < lxNavList.length; i++) {
				if(lxNavList[i] == data){
					target_nav = i;
					$lxNav_Item.eq(target_nav).addClass('active');
				}
			}
			console.log("nav目标data-lx-nav值"+data);
			console.log("section目标序号"+target);
			console.log("nav目标序号"+target_nav);
			return targetTop;
		}
		//按next键通过当前scrollTop值判断得到应该滚动的目标section的top值，然后取到对应的nav按键
		//增加active类，返回targetTop用于滚动事件
		var getNextTargetNavBySection=function(nowTop){
			//目标section的将要滚动到的高度top
			var targetTop = 0;
			//目标section的序号
			var target = 0;
			//目标nav的序号
			var target_nav = 0;
			for (var i = sectionTopList.length-1; i >0 ; i--) {
				if (nowTop  < sectionTopList[i] ) {
					targetTop = Math.round(sectionTopList[i]);
					target = i;
				}
			}
			var data = sectionDataList[target];
			for (var i = 0; i < lxNavList.length; i++) {
				if(lxNavList[i] == data){
					target_nav = i;
					$lxNav_Item.eq(target_nav).addClass('active');
				}
			}
			console.log("nav目标data-lx-nav值"+data);
			console.log("section目标序号"+target);
			console.log("nav目标序号"+target_nav);
			return targetTop;
		}


		//给nav按钮绑定事件
		$lxNav_Item.click(function(e){
			//console.log($($(this).parent().parent().children()));
			var el=$(this)
			var li_list=el.parent().parent().children();
			$(li_list).find('a').removeClass('active');
			el.addClass('active');

			//取到点击按键的data-lx-nav自定义属性值
			console.log(el.attr('data-lx-nav'));
			var data=el.attr('data-lx-nav');
			var targetTop=getTargetSectionByNav(data);
			console.log(targetTop);
			$html_body.animate({scrollTop: targetTop}, 800);
			if (targetTop == 0 ) {
				$lxNav_wrap.fadeOut('fast');
			}
			return false;
		});
		//滑轮后导航栏消失
		$html_body.bind("mousewheel",function(){
			if ($window.scrollTop() >= settings.sectionHeight) {
				$('.lx-nav-item').removeClass('active');
				$lxNav_wrap.fadeIn('slow');
			}else{
				$lxNav_wrap.fadeOut('fast');
			}
		});
		// $(window).scroll(function(event){
		// 	if ($window.scrollTop() >= settings.sectionHeight) {
		// 		$lxNav_wrap.fadeIn('slow');
		// 	}else{
		// 		$lxNav_wrap.fadeOut('fast');
		// 	}
		// });

		//点击导航栏消失
		$html_body.click(function(e){		
			if ($window.scrollTop() >= settings.sectionHeight) {
				//console.log($lxNav_wrap.css('display'));
				if ($lxNav_wrap.css('display')=='none') {
					$lxNav_wrap.fadeIn('fast');
					return false;
				}else if ($lxNav_wrap.css('display')=='block') {
					$lxNav_wrap.fadeOut('fast');
					return false;
				}
				
			}
		});

		
		//为lx-nav-box内的pre、next绑定点击事件
		$lxNav_Pre.click(function(){
			$lxNav_Item.removeClass('active');
			var nowTop = $window.scrollTop();
			var targetTop = getPreTargetNavBySection(nowTop);
			
			$html_body.animate({scrollTop: targetTop }, 800);
			console.log("目标滚动到的位置"+targetTop);
			return false;
		});
		$lxNav_Next.click(function(){
			$lxNav_Item.removeClass('active');
			var nowTop = $window.scrollTop();
			var targetTop = getNextTargetNavBySection(nowTop);
			
			$html_body.animate({scrollTop: targetTop }, 800);
			console.log("目标滚动到的位置"+targetTop);
			return false;
		});


	
	}

	$.fn.lxnav.default={
		sidebarHeight:'auto',	//导航栏高度
		sectionHeight: 600,	//每个section固定高度
		navItemWidth:'auto',  //导航栏每个按钮的宽度
		navWidth:'auto',    //导航栏宽度
		navBgColor: '#fff',    //导航栏背景颜色
		navOpacity:0.8       //导航栏透明度
	}

})(jQuery,Math);
