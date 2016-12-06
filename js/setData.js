// 用于通过数据生成结构；

function doData (id, data) {
	this.obj = document.getElementById(id);
	// console.log(this.obj)
	this.data = new dealData(data);
}

doData.prototype = {
	setFileArea: function(data, index){
		var html = '';
		var allFile = this.data.fondChild(data, index)
		for (var i = 0; i < allFile.length; i++) {
			html += '<a href="javascript:;" dataid = "'+ allFile[i].id +'">'+
						'<i></i>'+
						'<span>'+ allFile[i].title +'</span>'+
					'</a>';
		}
		this.obj.innerHTML = html;
	},
	setFileTree: function (data, index) {
		this.obj.innerHTML = this.setTree(data, index)
	},
	setTree: function (data, index, indent) {
		// indent -- 每级缩进
		indent = indent || 1;
		/*var onOff = this.data.fondChild(data, index).length > 0 ? true : false;
		console.log(onOff)
		if (!onOff) {
			return '';
		} else {
			// var classN = 
		}*/

		var html = '<ul>';

		for (var i = 0; i < data.length; i++) {
			if (data[i].pid === index) {
				var onOff1 = this.data.fondChild(data, data[i].id).length > 0 ? true : false;
				var className = onOff1 ? 'fileIco' : '';
				var add = onOff1 ? this.setTree(data, data[i].id, (indent+1)) : '';
				onOff = true;
				html += '<li>'+
							'<h1 class="title" style="padding-left: '+ (38 + indent*10) +'px" data="'+ data[i].id +'"><p>'+
							'<i class="'+ className +'"></i>'+
							'<i class="smallFileIco"></i>'+
							'<span>'+ data[i].title +'</span>'+
							'</p></h1>'+
							add +
						'</li>';
			}
		}

		html += '</ul>'
		return html;
	},
	setMainAreaNav: function (data, index) {
		// console.log(index);
		var html = '';
		var allNav = this.data.findAllParent(data, index);
		// console.log(allNav.length)
		for (var i = allNav.length - 1; i >= 0; i--) {
			html += '<a href="javascript:;" style = "z-index: '+i+'">'+ allNav[i].title +'</a>';
		}
		this.obj.innerHTML = html;
		this.obj.children[this.obj.children.length-1].className = 'lastPath';
	}
};