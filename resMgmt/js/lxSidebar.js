(function($){

	$.fn.lxSidebar = function(options){
		var settings = $.extend({} ,$.fn.lxSidebar.default, options );

		var $narrow=$('.lx-sidebar-narrow');
		var $item = $('.js-lx-sidebar-item');
		var $sidebar = $('.l-sidebar');
		var $summary = $('.l-sidebar-summary');
		var $menu = $('.l-sidebar-menu');
		var $main = $('.main');

		$narrow.click(function(){
			var $this = $(this);
			if ($sidebar.hasClass('mini')) {
				$sidebar.removeClass('mini');
				$summary.fadeIn(1500);
				$menu.fadeIn(1500);
				$main.removeClass('position');
			}else{
				$sidebar.addClass('mini');
				$summary.hide();
				$menu.hide();
				$main.addClass('position');
			}
		});
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
	$.fn.lxSidebar.default={

	}
})(jQuery)