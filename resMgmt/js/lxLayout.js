(function(window,document){
	//使用 var lxl = new lxLayout({layout:'A',pheight:'600px',height:'400px'});
	//	   lxl.init();
	function lxLayout(param){
		var _setting = {
			layout: 'A',
			pheight:'300px',
			height:'200px',
			backgroundColor:'#666'
		}

		//参数设置
		var config = function(param){
			for (var name in param) {
			 	_setting[name] = param[name];
			} 
			if(_setting['layout'] == 'A'){
				var cssText2 = 'float:left;width:20%;';
				_setting['cssText2'] = cssText2;
			}else if(_setting['layout'] == 'B'){
				var cssText1 = 'background-color:#ccc;';
				var cssText2 = 'height:20%;width:80%;margin:0 auto;';
				_setting['cssText1'] = cssText1;
				_setting['cssText2'] = cssText2;
			}
		}

		//初始化
		var init = function(){
			var html = document.documentElement;
			var body = document.body;
			var div1 = document.createElement('div');
			var div2 = document.createElement('div');
			div1.style.cssText =  'width:100%;background-color:#999;padding:1%;padding-right:1%;'

			config(param);

			for(var name in _setting){
				if (name == 'cssText2') {
					div2.style.cssText +=  _setting['cssText2'];
				}else if (name == 'cssText1') {
					div1.style.cssText +=  _setting['cssText1'];
				}else if( name == 'pheight'){
					div1.style.height =  _setting['pheight'];
				}
				else{
					div2.style[name] = _setting[name];
				}	
			}
			console.log(_setting)
			body.appendChild(div1);
			div1.appendChild(div2);
		}

		var api = {

		}

		return {
			init : init,
			api : api,
			config: config
		}
	}

	lxLayout.prototype.say = function(){
		alert(1);
	}
	window.lxLayout = lxLayout;
})(window,document);