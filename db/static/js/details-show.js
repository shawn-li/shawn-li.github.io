(function(){

	var $showDiv = $('.details-show');
	var hoverEvent = function(e){
		var _id = $(this).find('.cover').find('a').attr('href').match(/\/[0-9]*$/)[0].replace('/','');
		console.log(_id)
		let _obj = this.getBoundingClientRect();
        let _top = _obj.top-document.documentElement.clientTop+document.documentElement.scrollTop;//document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
		let _left = _obj.left-document.documentElement.clientLeft+document.documentElement.scrollLeft;//document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
		
		let book = {}

		$.get('https://api.douban.com/v2/book/'+_id, function(d){
			book = {
				title:d.title,
				author:d.author,
				pubdate:d.pubdate,
				publisher:d.publisher,
				summary:d.summary
			}
			showInDiv(book);
			$showDiv.css({
				'display':'block',
				'left':(_left+115)+'px',
				'top':_top+'px'
			});
		},'jsonp');

		//console.log(this)
		// console.log(top)
		// console.log(left)
		return false;
	}
	var leaveEvent = function(){
		$showDiv.css('display','none')
	}
	
	var showInDiv = function(obj){
		let $showDiv = $('.details-show');
		$showDiv.find('h4').text(obj.title);
		$showDiv.find('.dt-author').html(obj.author);
		$showDiv.find('.dt-pubdate').html(obj.pubdate);
		$showDiv.find('.dt-publisher').html(obj.publisher);
		$showDiv.find('.dt-summary').html(obj.summary);
	}

	var imgArr =  document.querySelectorAll('.js-hover');
	for(let i=0;i<imgArr.length;i++){
		imgArr[i].addEventListener('mouseover',hoverEvent);
	}
	for(let i=0;i<imgArr.length;i++){
		imgArr[i].addEventListener('mouseleave',leaveEvent);
	}	
	// showDiv.addEventListener("mouseover",function(e){
	// 	var e = e||window.e;
	// 	e.stopPropagation();
	// })
	

})()