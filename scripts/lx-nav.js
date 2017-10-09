(function($,Math){

	//fixed导航栏包括fixed按钮框
	$.fn.lxnav=function(options){

		var $window=$(window),		//取window对象，主要用于监控滚动位置
		$lxNav=$('.lx-nav'),		//nav ul对象用于宽度比例设置
		$html_body=$('html,body'),		//取html，body对象，主要用于滚动
		$wrap=$('#wrap'),
		$lxNav_wrap=$('.lx-nav-wrap'),		//nav 外层用于定位、透明度设置、背景颜色
		$lxNav_Pre=$('.lx-nav-pre'),		//fixed上一页
		$lxNav_Next=$('.lx-nav-next'),		//fixed下一页
		$lxNav_section=$('.lx-nav-section'),	//section
		$lxNav_Item=$('.lx-nav-item'),		//fixed nav按键
		$lxNav_box=$('.lx-nav-box'),    //fixed上一页/下一页按键框
		$lxnavFlag =$ (".lx-nav-flag");   //fixed导航栏开关

		var settings=$.extend( {} , $.fn.lxnav.default , options );
		//导航栏按钮个数
		var lxNavItemNum = $('.lx-nav-item').length;
		
		// --------------------------------------------------
		//初始化	
		if (settings.sidebarHeight != 'auto' && typeof settings.sidebarHeight =='number') {
			$lxNav.css("height",settings.sidebarHeight);
		}
		if (settings.wrapWidth != 'auto') {
			$lxNav.css("width",settings.navWidth);
			//console.log(settings.navWidth);
		}else{
			$lxNav.css("width",'100%');
		}
		if (settings.sectionHeight != 'auto' && typeof settings.sectionHeight =='number') {
			$lxNav_section.css("height",settings.sectionHeight);
		}else if(settings.sectionHeight == 'auto'){
			settings.sectionHeight=$lxNav_section.eq(1).offset().top;
		}
		//fixed导航开关初始化
		
		if (settings.lxnavFlag) {
			$lxnavFlag.find('a').html("fixed导航-关");
		}else{
			$lxnavFlag.find('a').html("fixed导航-开");
			console.log(settings.lxnavFlag);
		}

		// 导航按钮
		// settings.navItemWidth = (($lxNav.width()-20-lxNavItemNum*20+20)/lxNavItemNum);
		// //console.log(settings.navItemWidth);
		// if (settings.navItemWidth != 'auto' && typeof settings.navItemWidth =='number') {
		// 	$lxNav_Item.css("width",settings.navItemWidth);
		// 	//console.log(settings.navItemWidth);
		// }
		if (settings.preAndNextBox_Top != 'auto') {
			$lxNav_box.css({
				top:settings.preAndNextBox_Top
			});
			//console.log(settings.preAndNextBox_Top);
		}
		if (settings.preAndNextBox_Right != 'auto') {
			$lxNav_box.css({
				right:settings.preAndNextBox_Right
			});
		}
		//fixed回到顶部
		if (settings.lxNavTotop) {
			$lxNav_toTop=$(settings.lxNavTotop);    
		}
		
		//$lxNav_wrap.hide();	
		//sectionTopList ==> sectionDataList ==> lxNavList

		//按顺序取每个！section！的scrollTop放入数组sectionTopList
		var sectionTopList = [];
		for (var i = 0; i < $lxNav_section.length; i++) {
			console.log(i + '===' + $lxNav_section.eq(i).offset().top)
			sectionTopList.push(Math.round($lxNav_section.eq(i).offset().top));
		}
		//按顺序取每个！section！的data-lx-nav值放入sectionDataList
		var sectionDataList = [];
		for (var i = 0; i < $lxNav_Item.length; i++) {
			sectionDataList.push($lxNav_section.eq(i).attr('data-lx-nav'));
		}
		//依次取到！lx-nav！中data-lx-nav值放入lxNavList
		var lxNavList = [];
		for (var i = 0; i < $lxNav_Item.length; i++) {
			lxNavList.push($lxNav_Item.eq(i).attr('data-lx-nav'));
		}
		console.log(sectionTopList);
		console.log(sectionDataList);
		console.log(lxNavList);
		
		$lxNav_wrap.css({"background-color": settings.navBgColor});
		$lxNav_wrap.css({
			"-moz-opacity":settings.navOpacity,
			"-ms-opacity":settings.navOpacity,
			"-webkit-opacity":settings.navOpacity,
			"opacity": settings.navOpacity
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
				if (Math.round(nowTop)  < sectionTopList[i] ) {
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
			var el=$(this);
			var li_list=el.parent().parent().children();
			$(li_list).find('a').removeClass('active');
			el.addClass('active');

			//取到点击按键的data-lx-nav自定义属性值
			console.log(el.attr('data-lx-nav'));
			var data=el.attr('data-lx-nav');
			var targetTop=getTargetSectionByNav(data);
			console.log(targetTop);
			$html_body.animate({scrollTop: targetTop}, 800);
			
			settings.afterScroll(targetTop);
			if (targetTop == 0 ) {
				$lxNav_wrap.fadeOut('fast');
			}else{
				$lxNav_wrap.fadeIn('slow');
				console.log(333)
			}
			return false;
		});
		//滑轮后导航栏消失
		//$html_body.bind("mousewheel",function(){
		$(window).scroll(function(event){
			// if ($('.lx-nav-item .active')) {
			// 	var scrollFlagData = $('.lx-nav-item .active').attr('data-lx-nav');
			// 	var scrollFlagNum = scrollFlagData
			// }
			$lxNav_wrap.fadeOut('fast');
			// if ($window.scrollTop() > settings.sectionHeight) {			
			// 	//$('.lx-nav-item').removeClass('active');
			// 	if ($lxNav_wrap.css('display') == 'none') {
			// 		$lxNav_wrap.fadeIn('slow');
			// 	}
			// }else{
			// 	if($lxNav_wrap.css('display') !='none') {
			// 		$lxNav_wrap.fadeOut('fast');
			// 	}
			// }
		});
		$html_body.bind("mousewheel",function(){
			$('.lx-nav-item').removeClass('active');
		});

		//顶部导航栏开关
		$lxnavFlag.click(function(){
			if (settings.lxnavFlag) {
				settings.lxnavFlag=false;
				$(this).find('a').html("fixed导航-开");
				return false;
			}else{
				settings.lxnavFlag=true;
				$(this).find('a').html("fixed导航-关");
				return false;
			}
		});

		//点击导航栏消失
		$html_body.click(function(e){		
			//console.log(settings.sectionHeight);
			if (!settings.lxnavFlag) {
				return false;
			}
			if ($window.scrollTop() >= Math.round(settings.sectionHeight)) {
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
			//取到targetTop的值，得到section的序号，再通过data-lx-nav取到nav的序号
			var num = sectionTopList.indexOf(Math.round(targetTop));
			var data = $lxNav_section.eq(num).attr('data-lx-nav');
			//console.log(data);
			var nav_num = lxNavList.indexOf(data);
			$lxNav_Item.eq(nav_num).addClass('active');

			$html_body.animate({scrollTop: targetTop }, 800);
			console.log("目标滚动到的位置"+targetTop);
			settings.afterScroll(targetTop);
			return false;
		});
		$lxNav_Next.click(function(){
			$lxNav_Item.removeClass('active');
			var nowTop = $window.scrollTop();
			console.log(nowTop);
			var targetTop = getNextTargetNavBySection(nowTop);
			var num = sectionTopList.indexOf(Math.round(targetTop));
			var data = $lxNav_section.eq(num).attr('data-lx-nav');
			//console.log(data);
			var nav_num = lxNavList.indexOf(data);
			$lxNav_Item.eq(nav_num).addClass('active');
			
			$html_body.animate({scrollTop: targetTop }, 800);
			console.log("目标滚动到的位置"+targetTop);
			settings.afterScroll(targetTop);
			return false;
		});
		$lxNav_toTop.click(function(){
			$lxNav_Item.removeClass('active');
			$html_body.animate({scrollTop: 0 }, 800);
			return false;
		});

	
	}

	$.fn.lxnav.default={
		sidebarHeight:'auto',	//导航栏高度
		sectionHeight: 'auto',	//每个section固定高度
		navItemWidth:'auto',  //导航栏每个按钮的宽度
		navWidth:'100%',    //导航栏宽度
		navBgColor: '#fff',    //导航栏背景颜色
		navOpacity:0.8 ,      //导航栏透明度
		preAndNextBox_Top: 'auto',
		preAndNextBox_Right: 'auto',
		lxnavFlag: true,
		lxNavTotop:'.js-Totop',
		afterScroll: function(targetTop){}   //活动到对应section后回调函数,并传入对应section的top值作为参数
	}

})(jQuery,Math);
