$(document).ready(function(){

	//变量声明
	$html_body=$('html,body');
	var $window=$(window);
	var $skillName=$('.skill-name');
	var $lxNav_section=$('.lx-nav-section');
	var firstSectionHeight=$lxNav_section.eq(1).offset().top;
	var $LeshanImg = $('.Leshan-img');
	var $hobbyBtn=$('.hobby-bookmark');
	var $hobbyImgBox = $('.hobby-image-box');
	var $hbImgBoxImg = $('.football-img-box .hobby-img');
	var $hobbyImgClose = $('.hobby-img-close');
	var $hbImgBoxLoading = $('.hobby-image-box .loading');
	var $hbImgSummary = $('.hobby-img-summary');

	var $goalItem = $('.football-content .goal-item');
	var $ball = $('.football-content .ball');
	var $foot = $('.football-content .foot');
	var $ftImgBox = $('.football-img-box');
	var $ftImgBoxImg = $('.football-img-box-img');
	var $ftImgBoxClose = $('.football-img-box-close');
	var $ftImgBoxLoading = $('.football-img-box .loading');
	var $ftImgSummary = $('.football-img-summary');
	var $ftImgText = $('.football-img-text');
	var $ftImgTime = $('.football-img-time');

	var $lxnavFlag = $('.lx-nav-flag');
	var $lxnavBox = $('.lx-nav-box');
	var $lxNavTotop=$('.lx-nav-toTop');
	var $lxNavTotopMobile = $('.lx-nav-mobile-toTop');

	var imgHobbyAddr = ['Leshan01-md.jpg','Leshan02-md.jpg','chongqing-md.jpg','fuzhou-md.jpg','xiamen-md.jpg','kunming-md.jpg','qujing-md.jpg','dali-md.jpg','xian-md.jpg','qingdao1-md.jpg'];
	//var imgProjectWebapp = ['webapp1','webapp2','webapp3','webapp4']; 


	//---------------------------------------------------

	/*
		加载图片 ~loading
	*/
	var LoadingProfile = function(){
		//profile
		$LeshanImg.each(function(index , el){
			$this = $(el);
			$this.parent().find('.loading').find('img').addClass('scale');
			var imgName = $this.attr('data-img');
			$this.attr('src' , './images/' + imgName + '.jpg');
		});

		$LeshanImg.load(function(){
			$(this).parent().find('.loading').hide();
		});
	}
	var LoadingProject = function(){
		//project -- webapp
		//var num;
		var $projectImgLoad=$('.project-img-load');
		for (var i = 0; i < $projectImgLoad.length; i++) {
			$projectImgLoad.eq(i).parent().find('.loading').find('img').addClass('scale');
			$projectImgLoad.eq(i).attr('src', './images/webapp'+ (i+1) +'.png');
			//console.log("Image"+i+" finish!");
		}
		$projectImgLoad.load(function(){
			//alert("laod");
			//console.log($(this).parent().find('.load'));
			$(this).parent().find('.loading').hide();
		});
	}
	var LoadingHobby = function(num){
		//爱好
		$hobbyImgBox.eq(num).find('img.hobby-img').attr('src', './images/'+ imgHobbyAddr[num]);
		$hobbyImgBox.eq(num).find('img.hobby-img').load(function(){
			$(this).parent().find('.loading').hide();
			$hbImgBoxImg.css({
				'display':'block'
			});
			console.log($(this).find('.loading'))
		});
		var hb_text_object;
		$.get("./mock/hobbyText.json", function(result){
		    var hb_text = result.items[num].text;
		    var hb_time = result.items[num].time;
		    hb_text_object = {
				text: hb_text,
				time: hb_time
			};
			console.log(hb_text_object);
			addHobbyText( num , hb_text_object);		
		 });
	}
	function loadFootball(num){
		$ftImgBoxLoading.find('img').addClass('scale');
		$ftImgBoxImg.attr('src' , './images/ftTime'+ num +'.jpg');
		$ftImgBoxImg.load(function(){
			$ftImgBoxLoading.hide();
			$ftImgBoxImg.css({
				'display':'block'
			});
			//get请求拿到图片文字json信息
			var ft_text_object;

			$.get("./mock/ftTimeText.json", function(result){
				console.log(result.items[ft_num-1].text);
			    var ft_text = result.items[ft_num-1].text;
			    var ft_time = result.items[ft_num-1].time;
			    ft_text_object= {
					text: ft_text,
					time: ft_time
				};
				addFootballText(ft_text_object);
			 });
			
		});
	}
	LoadingProfile();
	LoadingProject();

	//---------------------------------------------------

	//判断是否是移动设备
	var isMobile = function(){
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
            $lxnavFlag.remove();
	   		$lxnavBox.remove();
	   		$lxNavTotop.remove();
	   		$lxNavTotopMobile.show();
        } else {
            
        }
        return result;
	}
	isMobile();
	    
	//---------------------------------------------------

	//lx-nav插件
	$(document).lxnav({
		navWidth:'90%',  
		lxnavFlag: false,
		//preAndNextBox_Top: '50px',
		//preAndNextBox_Right: '2%',
		exceptClick:'.hobby-bookmark',
		afterScroll:function(targetTop){
			if(Math.round(targetTop) == Math.round(firstSectionHeight)){
				$('.skill-score').find('rect').each(function(){
					var $target=$(this);
					var score=$(this).attr('data-skill-score');
					skillDataBar($target, score);
				});
			}
		}
	});

	//---------------------------------------------------

	/*
		header模块 ~header
		点击header上的按键 滑动到对应的Section
	*/
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
			var el=$(this);

			//取到点击按键的data-lx-nav自定义属性值
			console.log(el.attr('data-lx-nav'));
			var data=el.attr('data-lx-nav');
			var targetTop=getTargetSectionByNav(data);
			console.log(targetTop);			
			if (targetTop == 0 ) {
				return false;
			}else{
				$html_body.animate({scrollTop: targetTop}, 800);
				//$lxNav_wrap.fadeIn('fast');
				$lxNav_Item.each(function(){
					if ($(this).attr('data-lx-nav') == data ) {
						$(this).parent().parent().find('a').removeClass('active');
						$(this).addClass('active');
					}
				});
				if(Math.round(targetTop) == Math.round(firstSectionHeight)){
					$('.skill-score').find('rect').each(function(){
						var $target=$(this);
						var score=$(this).attr('data-skill-score');
						skillDataBar($target, score);
					});
				}
			}
			
		});
	}
	scrollToSection();

	//---------------------------------------------------

	/*
		职业技能模块 ~skill
	*/
	//职业技能数据条增长
	var skillDataBar=function(el,data){
		//console.log(data);
		el.css({
			width:data
		});
	}
	$skillName.click(function(){
		var el=$(this);
		var $target=el.parent().find('.skill-score').find('.skill-score-animate');
		var skillFlag = $target.attr('data-skill-flag');
		if (skillFlag == 'true') {
			skillDataBar($target, '1%');
			$target.css('background-color','#666');
			$target.attr('data-skill-flag','false');
		}else if(skillFlag == 'false'){
			var score=$target.attr('data-skill-score');
			skillDataBar($target, score);
			var index = score.indexOf('%');
			var score_num = score.substring(0,index);
			console.log(score_num);
			if (score_num >= 80) {
				$target.css('background-color','#7adc30');
			}else if ( score_num <60 ) {
				$target.css('background-color','#d62121');
			}
			$target.attr('data-skill-flag','true');
		}		
		return false;
	}); 
	$window.scroll(function(){
		if($window.scrollTop() >= firstSectionHeight){
			$('.skill-score').find('.skill-score-animate').each(function(){
				var $target=$(this);
				$target.attr('data-skill-flag','true');
				
				var score=$target.attr('data-skill-score');
				var index = score.indexOf('%');
				var score_num = score.substring(0,index);
				skillDataBar($target, score);
				if (score_num >= 80) {
					$target.css('background-color','#7adc30');
				}else if ( score_num <60 ) {
					$target.css('background-color','#d62121');
				}
			});	
		}
	});

	//---------------------------------------------------

	/*
		旅游模块 ~hobby
	*/
	//hobby-box  标签
	var addHobbyText = function(num , hb_text_object){ 
		//num为hobbyBox的序号，hb_text_object为json文本参数对象
		console.log(hb_text_object);
		var text = hb_text_object.text;
		var time = hb_text_object.time;
		var t = '<div class="hobby-summary-icon"></div><div class="hobby-img-time">'+time+'</div><div class="hobby-img-text">'+text+'</div>';
		
		$hbImgSummary.eq(num).html(t);
	}
	$hobbyBtn.click(function(){
		var $el=$(this);
		var data = $(this).attr('data-img');
		var num = $(this).attr('data-num');

		LoadingHobby(num);

		$hobbyBtn.each(function(){
			$(this).css("display","block");
		});
		$el.css("display","none");
		$hobbyImgBox.each(function(index, el){
			$(el).css({
				'display':'none'
			});
		});
		//console.log(num);
		$hobbyImgBox.eq(num).css({
			'display':'block'
		});
		
		if (num <5 ) {
			$hobbyImgBox.eq(num).animate({'left':'20%'},300);
			$hobbyImgClose.eq(num).css({
				'right':'-10%'
			});
		}else{
			$hobbyImgBox.eq(num).animate({'right':'20%'},300);
			$hobbyImgClose.eq(num).css({
				'left':'-10%'
			});
		}
		//$hobbyImgBox.eq(num).animate({'left':'13%'},500);
		$hobbyImgClose.eq(num).css({
			'display':'block'
		});
		
		//叉位置	
		var leftOrRight;
		if (num < 5) {
			//console.log(num);
			// $hobbyImgBoxLeft.css({
			// 	'left': '14%'
			// });
			//$hobbyImgBoxLeft.addClass('hobby-afterImgBox-afterSlider');
			//$hobbyImgClose.attr('data-img-num', num);
			$hobbyImgClose.removeClass('position-right position-left');
			$hobbyImgClose.addClass('position-right');
			leftOrRight = ((num*19)/90).toFixed(2)*100;
			//console.log(leftOrRight+'%');
			$hobbyImgClose.css('top' , leftOrRight + '%' );
			$hobbyImgClose.css('-ms-border-radius' , '0 40px 40px 0');
			$hobbyImgClose.css('-moz-border-radius' , '0 40px 40px 0');
			$hobbyImgClose.css('-webkit-border-radius' , '0 40px 40px 0');
			$hobbyImgClose.css('border-radius' , '0 40px 40px 0');

		}else{
			num -= 5;
			$hobbyImgClose.removeClass('position-right position-left');
			$hobbyImgClose.addClass('position-left');
			leftOrRight = ((num*19)/90).toFixed(2)*100;
			$hobbyImgClose.css('top' , leftOrRight + '%' );
			$hobbyImgClose.css('-ms-border-radius' , '40px 0 0 40px');
			$hobbyImgClose.css('-moz-border-radius' , '40px 0 0 40px');
			$hobbyImgClose.css('-webkit-border-radius' , '40px 0 0 40px');
			$hobbyImgClose.css('border-radius' , '40px 0 0 40px');
			num += 5;
		}

		$hobbyImgBox.each(function(index, el){
			
			if (index<5 && index != num) {
				$(el).css({
					'left':'0%'
				});
				
			}else if(index>=5 && index != num){
				$(el).css({
					'right':'0%'
				});
				//console.log(el);
			}
		});
		return false;
	});
	$hobbyImgClose.click(function(){
		$hobbyImgBox.css({
			'display':'none'
		});
		$hobbyBtn.each(function(){
			$(this).css("display","block");
		});
		return false;
	});


	/* 
		足球模块 ~football
	*/
	var addFootballText = function(obj){
		var text = obj.text;
		var time = obj.time;
		text = '<div class="football-img-time">'+time+'</div><div class="football-img-text">'+text+'</div>';
		$ftImgSummary.html(text);
	}
	var footballAnimateAtPc = function(obj){
		var goalLeftAry = [21 , 37 , 54 , 70];
		var goalBottomAry = [185 , 130 , 68 , 10];
		var goalLeft = obj.goalLeft,
			goalBottom = obj.goalBottom,
			ft_num = obj.ft_num;

		$ball.animate({
			'width' : '32px',
			'height' : '32px',
			'left': goalLeftAry[goalLeft-1]+'%',
			'bottom': goalBottomAry[goalBottom-1]+'px',
			'opacity': '0'
		},1000);
		$ball.animate({
			'left': '46%',
		    'bottom': '-95px',
		    'width': '64px',
		    'height': '64px'
		},500);
		
		var imgBoxAry = [ 1.6 , 26.2 , 50.8 , 77 ];
		//照片框渐大
		$ftImgBox.css({
			'display' : 'block',
			'opacity' : '0',
			'width': '23%',
			'height': '23%',
			'left' :　imgBoxAry[goalLeft-1] + '%' ,
			'top' :　imgBoxAry[goalBottom-1] + '%' 
		});

		$ftImgBox.animate({
			'width': '120%',
			'height': '120%',
			'top':  '-4%',
			'left': '-10%',
			'opacity' : '1'
		},1000 , function(){
			$ftImgBoxClose.css({
				'display' :　'block'
			});
			$ftImgBoxLoading.css({
				'display': 'block'
			});
			$ftImgBoxImg.css({
				'display':'block'
			});
			setTimeout(function(){
				loadFootball(ft_num);
			},50);
			goalFlag = false;
			return false;
		});
	}
	var footballAnimateAtMobile = function(ft_num){
		$ftImgBoxClose.css({
			'display' :　'block'
		});
		$ftImgBox.css({
			'display':'block',
			'top':  '-4%',
			'left': '-10%',
			'width': '0px',
			'height' : '0px'
		});
		$ftImgBox.animate({
			'width': '120%',
			'height': '120%'
		},1000);

		//get请求拿到图片文字json信息
		var ft_text, ft_time, ft_text_object;
		$.get("./mock/ftTimeText.json", function(result){
			console.log(result.items[ft_num-1].text);
		    ft_text = result.items[ft_num-1].text;
		    ft_time = result.items[ft_num-1].time;
		    ft_text_object= {
				text: ft_text,
				time: ft_time
			}
		 });
		goalFlag = false;
		$('.before-loading').click(function(){
			loadFootball(ft_num, ft_text_object);
			$('.before-loading').css({
				'display':'none'
			});
			return false;
		});

	}
	//是否是移动设备
	var isMobile = isMobile()
	//球门获取点数
	var goalFlag = false; //判断是否在射门过程中
	//球门牌取到的数字
	var ft_num;
	$goalItem.click(function(){
		// e.stopPropagation();
		// e.preventDefault()
		if (goalFlag == true ) {
			return;
		}
		goalFlag = true;
		$ball.css({
			'display' : 'block'
		});
		//清除文字介绍
		$ftImgSummary.html(' ');
		$this = $(this);
		ft_num = $this.text();
		var goalLeft = ft_num%4!=0?ft_num%4:4;
		var goalBottom = Math.ceil(ft_num/4);
		var object = {
			goalLeft : goalLeft,
			goalBottom : goalBottom,
			ft_num : ft_num
		}
		//移动设备响应式设计
		if (isMobile) {
			//移动设备
			$('.before-loading').css({
				'display':'block'
			});
			footballAnimateAtMobile(ft_num);
			return false;
		}else{
			footballAnimateAtPc(object);
			return false;
		}
		
	});

	
	$ftImgBoxClose.click(function(){		
		//$ftImgBoxLoading.find('img').removeClass('scale');
		$ftImgBoxLoading.css({
			'display':'none'
		});
		$ball.css({
			'opacity': '1'
		});
		
		$ftImgBoxImg.hide();

		if (isMobile) {
			$ftImgBox.css({
				'display':'block',
				'top':  '-4%',
				'left': '-10%',
				'width': '0px',
				'height' : '0px'
			});
		}
		$ftImgBox.hide();
		return false;
	});
	

	
});