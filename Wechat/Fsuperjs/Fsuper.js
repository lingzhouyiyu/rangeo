var Serverurl = "http://hx.pailetec.com/";
function goorder() {
	mui.openWindow({
		url: 'orderlist.html'
	});
}

function goindex() {
	mui.openWindow({
		url: 'index.html'
	});
}

function goperson() {
	mui.openWindow({
		url: 'personal.html'
	});
}
//hash页面返回
function hashback() {
	location.hash = 'mainpage';
	window.onhashchange = function(e) {

		var oldHash = e.oldURL.split('#')[1];
		var newHash = e.newURL.split('#')[1];
		if(oldHash == "mainpage") {
			return;
		}
		$("#" + oldHash).slideUp();

	};

}

//hash页面切换
function hashswitch(dom) {
	var id = $(dom).attr("id");
	id = id + "page";
	$("#" + id).slideDown();
	location.hash = id;
}
//hash页面关闭
function dbgoback(dom) {
	$(dom).slideUp();
}

//点击按钮调用的方法
function refresh() {
	window.location.reload();
}

//Android强制刷新
function androrefresh(res) {
	var curres = sessionStorage.getItem(res);
	if(curres) {
		sessionStorage.removeItem(res);
		window.location.reload();
	}
}

//解决苹果刷新
function iosrefresh() {
	var isPageHide = false;
	window.addEventListener('pageshow', function() {
		if(isPageHide) {
			window.location.reload();
		}
	});
	window.addEventListener('pagehide', function() {
		isPageHide = true;
	});

}
//挂载事件
function startclick(dom) {
	mui("#pullrefresh").on('tap', dom, function(event) {
		this.click();
	});
}

//身份证验证
function IdentityCodeValid(code){
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	var pass = true;
	if (code == "" || code == null) {
		pass = false
	}
	if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
		pass = false
	} else if (!city[code.substr(0, 2)]) {
		pass = false
	} else {
		if (code.length == 18) {
			code = code.split('');
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi
			}
			var last = parity[sum % 11];
			if (parity[sum % 11] != code[17]) {
				pass = false
			}
		}
	}
	return pass
}

//验证手机号
function checktel(data) {
	var regtel = /^1\d{10}$/;
	var telpass = true;
	if(data == "" || data == null) {
		telpass = false;
	} else if(!regtel.test(data)) {
		telpass = false;
	}
	return telpass;
}

//验证姓名
function checkname(data) {
	var regname = /^([\u4e00-\u9fa5]){2,7}$/;
	var namepass = true;
	if(data == "" || data == null) {
		namepass = false;
	} else if(!regname.test(data)) {
		namepass = false;
	}
	return namepass;
}

//截取字符串信息处理
function plusXing(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for(var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}