$(document).ready(function(){

	$html_body=$('html,body');
	var $window=$(window);
	var $skillName=$('.skill-name');
	var $lxNav_section=$('.lx-nav-section');
	var firstSectionHeight=$lxNav_section.eq(1).offset().top;
	var $LeshanImg = $('.Leshan-img');
	var $hobbyBtn=$('.hobby-bookmark');
	var $hobbyImgBox= $('.hobby-image-box');
	var $hobbyImgClose = $('.hobby-img-close');
	var $goalItem = $('.football-content .goal-item');
	var $ball = $('.football-content .ball');
	var $foot = $('.football-content .foot');
	var $ftImgBox = $('.football-img-box');
	var $ftImgBoxImg = $('.football-img-box-img');
	var $ftImgBoxClose = $('.football-img-box-close');
	var $ftImgBoxLoading = $('.football-img-box .loading');
	var $ftImgText = $('.football-img-text');

	var $lxNavTotop=$('.lx-nav-toTop');

	var imgHobbyAddr = ['Leshan01-md.jpg','Leshan02-md.jpg','chongqing-md.jpg','fuzhou-md.jpg','xiamen-md.jpg','kunming-md.jpg','qujing-md.jpg','dali-md.jpg','xian-md.jpg','qingdao1-md.jpg'];
	//var imgProjectWebapp = ['webapp1','webapp2','webapp3','webapp4']; 

	// -----------------------
	//响应式

	//职业技能 中间圆圈skill-name响应式
	// var width_skillName = $('.skill-content-item').width()* 0.1;
	// $('.skill-name').css({
	// 	'width': width_skillName,
	// 	'height': width_skillName,
	// 	'-ms-border-radius': width_skillName*0.5,
	// 	'-webkit-border-radius': width_skillName*0.5,
	// 	'-moz-border-radius': width_skillName*0.5,
	// 	'border-radius':  width_skillName*0.5
	//  });
	//------------------------

	// $('img').on("load",function(){
		
	// 	alert("laod finish");
	// });
	// $('img.img-first').load(function(){
		
	// 	alert("laod finish");
	// });

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


	/*
		加载图片
	*/
	var Loading = function(){

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

		//project -- webapp
		var num;
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

		//爱好
		for (var i = 0; i < imgHobbyAddr.length; i++) {
			$hobbyImgBox.eq(i).parent().find('.loading').find('img').addClass('scale');
			$hobbyImgBox.eq(i).find('img.hobby-img').attr('src', './images/'+ imgHobbyAddr[i] );
		}
		$hobbyImgBox.find('img.hobby-img').load(function(){
			//alert("laod");
			//console.log($(this).parent().find('.load'));
			$(this).parent().find('.loading').hide();
		});
	}
	Loading();


	/*
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


	//职业技能数据条增长
	var skillDataBar=function(el,data){
		//console.log(data);
		el.css({
			width:data
		});
	}

	//不同的技能可以设置不同的值
	$skillName.hover(function(){
		var el=$(this);
		var $target=el.parent().find('.skill-score').find('.skill-score-animate');
		var score=$target.attr('data-skill-score');
		skillDataBar($target, score);
	}); 
	$skillName.click(function(){
		var el=$(this);
		var $target=el.parent().find('.skill-score').find('.skill-score-animate');
		skillDataBar($target, '1%');
		return false;
	}); 
	$window.scroll(function(){
		if($window.scrollTop() >= firstSectionHeight){
			$('.skill-score').find('.skill-score-animate').each(function(){
				var $target=$(this);
				var score=$(this).attr('data-skill-score');
				skillDataBar($target, score);
			});	
		}
	});

	/*
		点击事件
	*/
	//hobby-box  标签
	$hobbyBtn.click(function(){
		var $el=$(this);
		var data = $(this).attr('data-img');
		var num = $(this).attr('data-num');
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

	//球门获取点数
	var goalFlag = false; //判断是否在射门过程中
	$goalItem.click(function(){
		if (goalFlag == true ) {
			return;
		}
		goalFlag = true;
		$ball.css({
			'display' : 'block'
		});
		// $foot.css({
		// 	'opacity' : '1'
		// });
		var goalLeftAry = [21 , 37 , 54 , 70];
		var goalBottomAry = [185 , 130 , 68 , 10];
		$this = $(this);
		//球门牌取到的数字
		var num = $this.text();
		var goalLeft = num%4!=0?num%4:4;
		var goalBottom = Math.ceil(num/4);
		// console.log(goalLeft);
		// console.log(goalBottom);
		// console.log(goalLeftAry[goalLeft-1]);
		// console.log(goalBottomAry[goalBottom-1]);
		$ball.animate({
			'width' : '32px' ,
			'height' : '32px',
			'left': goalLeftAry[goalLeft-1]+'%',
			'bottom': goalBottomAry[goalBottom-1]+'px',
			'opacity': '0'
		},1000, function(){
			// $this.css({
			// 	'background-color':'#999'
			// });
		});
		$ball.animate({
			'left': '46%',
		    'bottom': '-95px',
		    'width': '64px',
		    'height': '64px'
		},500,function(){
			goalFlag = false;
		});

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
				loadFootballImg();
			},50);
		});
		$ftImgText.html();

		return false;

		function loadFootballImg(){
			$ftImgBoxLoading.find('img').addClass('scale');
			$ftImgBoxImg.attr('src' , './images/ftTime'+ num +'.jpg');
		}
	});
	$ftImgBoxClose.click(function(){
		$ftImgBoxImg.hide();
		$ftImgBoxLoading.find('img').removeClass('scale');
		$ftImgBoxLoading.css({
			'display':'none'
		});
		$ball.css({
			'opacity': '1'
		});
		$ftImgBox.hide();
	});
	$ftImgBoxImg.load(function(){
		$ftImgBoxLoading.hide();
	});

	
});