/*!
 * jQuery v1.8.3 
 * Copyright (c) 2014, CalendarSource - Wang Zheng. All rights reserved.
 * For licensing, see XX.html version 1.1.0 beta
 * Date: Fri Nov 25 15:03:10 2014
 */

(function($) {
	$.fn.extend({
		HQ_dateControl: function(opt) {
			var o           = $.extend({
				format      : 'YYYY-MM-DD',
				months      : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
				days        : ['周日','周一','周二','周三','周四','周五','周六'],
				displayNum  : 2,
				min         : 0,		  // 
				multiSelect : "radio",	  // radio selectMore section
				data        : null,       // json
				callback    : null,       // function
				backType    : "date"      // date ; timestamp ; UTC
			},opt),
				$eleInp     = $(this);
			if(o.multiSelect!='selectMore'&&o.multiSelect!='section'&&o.multiSelect!='radio') o.multiSelect = 'radio';
			o.displayNum = Math.floor(parseInt(o.displayNum));
			if(!o.displayNum) o.displayNum = 1;
			
			var	C           = new Calendar($eleInp,o);
		}
	});
})(jQuery);

function Calendar($e,opt) {
	this.dateContro  =  {
							min         : 1900,
							max         : 2099,
							DOMonth     : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
							lDOMonth    : [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
						}
	this.$e          = $e;
	this.opt         = opt;
	this.now         = new Date();
	this.now.setMilliseconds(0);
	this.now.setSeconds(0);
	this.now.setMinutes(0);
	this.now.setHours(0);
	this.nowY        = this.now.getFullYear();
	this.nowM        = this.now.getMonth();
	this.nowD        = this.now.getDate();
	this.b           = this.formatData().b.split(",");
	this.data        = this.opt.data?this.hi():false;
	this.times       = [];
	this.val         = this.calData();
	//this.opt.min != 0&&this.writeInp();
	this.daysFormat  = (function(t) {
		var str = "";
		for(var i=0,l=t.opt.days;i<7;i++) {
			str += i?(i!=l.length-1?"<li>"+l[i]+"</li>":"<li class='weekend'style='margin-right:0;'>"+l[i]+"</li>"):"<li class='weekend'>"+l[i]+"</li>";
		}
		return str;
	})(this);
	
	var d = window.HQDATECONTROL_CSSPATH || '';
	if(!d) {
		var sEle    = document.createElement("style"),
			$sEle   = $(sEle);
		$sEle.attr("type","text/css"); 
		$("head").eq(0).append($sEle);
		if(sEle.styleSheet) sEle.styleSheet.cssText += this.cssCode; 
		else if(document.getBoxObjectFor) sEle.innerHTML += this.cssCode; //火狐
		else sEle.appendChild(document.createTextNode(this.cssCode));
		window.HQDATECONTROL_CSSPATH = true;
	}
	this.$e
	.on("click",(function(t) {
		return function() {
			t.writeInp();
			t.createCalendar.call(t);
		};
	})(this))
	.on("keydown",function(e) {
		if(e.keyCode==8) $(this).val("");
		else return false;
	})
	.on("focus",(function(t) {
		return function() {
			t.F = true;
		};
	})(this))
	.on("blur",(function(t) {
		return function() {
			t.F = false;
		};
	})(this));
}

Calendar.prototype.getDaysofmonth = function(monthNo, p_year) {
	if (!(p_year%4)) {
		if (!(p_year%100)&&(p_year%400)) return this.dateContro.DOMonth[monthNo];
		return this.dateContro.lDOMonth[monthNo];
	} else return this.dateContro.DOMonth[monthNo];		
}

Calendar.prototype.arrFn = function(val) {
	var n = [];
	for(var i = 0,l = val.length;i<l;i++) {
		var f = val[i],
			p = true;
		for(var o = 0,loop = n.length;o<loop;o++) {
			var n1 = f.getTime(),
				n2 = n[o].getTime();
				
			if(n2==n1) {
				p = false;
				break;
			} 
		}
		p&&n.push(f);
	}
	n.sort(function(v1,v2) {
		if(v1<v2) return 1;
		else if(v1>v2) return -1;
		else return 0;
	});
	n.reverse();
	this.times = n;
	return n;
};

Calendar.prototype.calData = function(val,o) {  // calendar time 
	var reg   = new RegExp("^(\\d){"+this.b[0]+"}("+this.b[3]+"){1}(\\d){"+this.b[1]+"}("+this.b[3]+"){1}(\\d){"+this.b[2]+"}$"),
		inpV  = !this.$e.attr("v")?this.$e.val():this.$e.attr("v"),
		aOd   = typeof o!="undefined" && !o,
		v     = val&&[val] || (inpV?inpV.split(";"):"");

	if(v.length) {
		for(var i=0,l=v.length;i<l;i++) {
			var d = _push.call(this,i)
			if(!aOd) {
				this.times.push(d);
			}else {
				var date = d.getTime();
				for(var o=0,loop=this.times.length;o<loop;o++) {
					var p = this.times[o].getTime();
					if(p==date) {
						this.times.splice(o,1);
						break;
					}
				}
			}
		}
	}else this.times.push(this.now);

	return this.arrFn(this.times);
	
	function _push(index) {
		var val = v[index].replace(/^\s+|\s+$/ig,"");
		if(reg.test(val)) {
			var r  = new  RegExp("(?: |"+this.b[3]+"|\,|:)","ig"),
			st = val.split(r);
			st[1]--;
			eval('var stC = new Date('+st.join(',')+');');
			var m = stC.getMonth(),
				y = stC.getFullYear(),
				d = stC.getDate();
			if(this.opt.min>0) {
				var l = {y:y,m:m,d:d},
					f = {y:this.nowY,m:this.nowM,d:this.nowD};
			}else if(this.opt.min<0) {
				var f = {y:y,m:m,d:d},
					l = {y:this.nowY,m:this.nowM,d:this.nowD};
			}
			
			var t = f?this.range(f,l):true;
			if(t&&y>=this.dateContro.min&&y<=this.dateContro.max) return stC;
			else return this.now;
		}else return this.now;
	}
};

Calendar.prototype.range = function(f,l) {
	if(!f||!l||f.y<l.y) return true;
	else if(f.y==l.y) 
		if(f.m<l.m) return true;
		else if(f.m==l.m) if(f.d<=l.d) return true;else return false;
		else return false;
	else return false;
};

Calendar.prototype.writeInp = function() {  // calendar format value
	this.months = [];
	this.days   = [];
	this.years  = [];
	var m     = [],
		date  = "",
		sDate = "";
	for(var i=0,l=this.val.length;i<l;i++) {
		var obj = this.val[i];
		if(typeof this.vNowMonth=="undefined") {
			this.vNowMonth = obj.getMonth();
			this.vNowYear  = obj.getFullYear();
		}
		
		this.months.push(obj.getMonth());
		this.days.push(obj.getDate()<10?"0"+obj.getDate():obj.getDate());
		this.years.push(obj.getFullYear());
		m.push(obj.getMonth()+1<10?"0"+(obj.getMonth()+1):obj.getMonth()+1);
		date += this.years[i] + this.b[3] + m[i] + this.b[3] + this.days[i] + ";";
		if(i<this.opt.displayNum||i==l-1) sDate += this.years[i] + this.b[3] + m[i] + this.b[3] + this.days[i] + (i!=this.opt.displayNum-1?";":"");
		else if(i==this.opt.displayNum) sDate += "...";
		if(this.opt.multiSelect=="radio") break;
		
	}
	this.$e.val(sDate.replace(/^;|;$/ig,"")).attr("v",date.replace(/^;|;$/ig,""));
}

Calendar.prototype.createCalendar = function() { // create calendar
	if(typeof this.$d!="undefined") return;
	var iPos     = this.inputPosition(),
		t        = iPos.t+iPos.h+5,
		l        = iPos.l;
	this.$d  = $(document.createElement("div"));
	this.$d
	.addClass("HQ_date_box")
	.css({top:t,left:l})
	.html(this.htmlCode)
	.appendTo($(document.body))
	.bind("selectstart",function() {return false;})
	.find(".HQ_data_week_box")
	.html("<ul>"+this.daysFormat+"</ul>");
	if(this.opt.multiSelect!="radio") {
		this.$d.append('<div class="HQ_data_cancel">取消</div><div class="HQ_data_ok">确定</div>');
		this.$d.attr("o",this.val);
		this.okB = this.$d.find(".HQ_data_ok");
		this.cancelB = this.$d.find(".HQ_data_cancel");
		this.okB.on("click",(function(t) {
			return function() {t.running.call(t);};
		})(this));
		this.cancelB.on("click",(function(t) {
			return function() {
				t.delCalendar.call(t,true);
			};
		})(this));
	}
	
	this.pM  = this.$d.find(".HQ_date_prevM");
	this.nM  = this.$d.find(".HQ_date_nextM");
	this.pF  = this.$d.find(".HQ_date_prevF");
	this.nF  = this.$d.find(".HQ_date_nextF");
	this.flop();
	
	this.pM.on("click",(function(t) {
		return function() {
			t.flop.call(t,"prevM");
		};
	})(this));
	this.nM.on("click",(function(t) {
		return function() {
			t.flop.call(t,"nextM");
		};
	})(this));
	this.pF.on("click",(function(t) {
		return function() {
			t.flop.call(t,"prevF");
		};
	})(this));

	this.nF.on("click",(function(t) {
		return function() {
			t.flop.call(t,"nextF");
		};
	})(this));
	
	(function(t) {
		return setTimeout(function() {
			$(document.body).bind("click",(function(t) {
				return function() {
					var e  = arguments[0] || window.event,
						s  = e.target || e.srcElement,
						c  = (function() {
							while(s.nodeType==1) {
								if(/HQ_date_box/ig.test(s.className)) return true;
								s = s.parentNode;
							}
							return false;
						})();
					!c&&!t.F&&t.delCalendar.call(t,true);
				};
			})(t));
		},200);
	})(this);
};

Calendar.prototype.flop = function(type) {
	switch(type) {
		case "prevM":
			this.vNowMonth--;
			_PNRun.call(this);
			break;
		case "nextM":
			this.vNowMonth++;
			_PNRun.call(this);
			break;
		case "prevF":
			if(this.opt.min<=0||this.opt.min&&this.vNowYear>this.nowY) this.vNowYear--;
			_flop.call(this);
			break;
		case "nextF":
			if(this.opt.min>=0||this.opt.min<0&&this.vNowYear<this.nowY) this.vNowYear++;
			_flop.call(this);
			break;
		default:
			_flop.call(this);
			break;
	}
	function _PNRun() {
		
		if(this.vNowMonth<0) {
			this.vNowYear--;
			this.vNowMonth = 11;
		}else if(this.vNowMonth>11) {
			this.vNowYear++;
			this.vNowMonth = 0;
		}
		_flop.call(this);
	}
	
	function _flop() {
		
		if(this.opt.min>0&&this.vNowYear<=this.nowY&&this.vNowMonth<=this.nowM) {
			this.pM.css("visibility","hidden");
			this.vNowMonth = this.nowM;
		}else if(this.opt.min<0&&this.vNowYear>=this.nowY&&this.vNowMonth>=this.nowM) {
			this.nM.css("visibility","hidden");
			this.vNowMonth = this.nowM;
		}else if(this.vNowMonth==0&&this.vNowYear<=this.dateContro.min) {
			this.pM.css("visibility","hidden");
		}else if(this.vNowMonth==11&&this.vNowYear>=this.dateContro.max) {
			this.nM.css("visibility","hidden");
		}else {
			this.pM.css("visibility","visible");
			this.nM.css("visibility","visible");
		}
		
		if(this.opt.min>0&&this.vNowYear<=this.nowY||this.vNowYear<=this.dateContro.min) {
			this.pF.css("visibility","hidden");
			
		}else if(this.opt.min<0&&this.vNowYear>=this.nowY||this.vNowYear>=this.dateContro.max) {
			this.nF.css("visibility","hidden");
		}else {
			this.pF.css("visibility","visible");
			this.nF.css("visibility","visible");
		}
		this.writeDate();
	}
};

Calendar.prototype.writeDate = function() { // calendar 渲染
	this.$d.find(".m").text(this.opt.months[this.vNowMonth]);
	this.$d.find(".y").text(this.vNowYear);
	var vDate = new Date();
	
	vDate.setDate(1);
	vDate.setMonth(this.vNowMonth);
	vDate.setFullYear(this.vNowYear);
	var firstDay = vDate.getDay(),
		Day     = 1,
		LastDay = this.getDaysofmonth(parseInt(this.vNowMonth),parseInt(this.vNowYear)),
		Code    = '';
	this.$ul     = $(document.createElement("ul"));
	this.$d.find('.HQ_data_days').html(this.$ul);
	
	this.output(firstDay,"p");  
	this.rendering({l:LastDay,m:this.vNowMonth,y:this.vNowYear,fa:false});
	var n = Math.floor((LastDay+firstDay)/7)*7,
		p = 7-(LastDay+firstDay-n);
	this.output(p,"n");
};

Calendar.prototype.output = function(f,s) {
	var p    = s=="p"?this.vNowMonth - 1:this.vNowMonth + 1,
		y    = this.vNowYear,
		hide = false;
	
	if(p<0) {
		if(y<=this.dateContro.min) hide = true;
		y--;
		p = 11;
	}else if(p>11) {
		if(y>=this.dateContro.max) hide = true;
		y++;
		p = 0;
	}
	if(s=="p") {
		var L = this.getDaysofmonth(parseInt(p),parseInt(y));
		this.rendering({l:L,m:p,y:y,f:(f<2&&!hide?f+7:f),fa:true,hide:hide});
	}else {
		this.rendering({l:(f<4&&!hide?f+7:f),m:p,y:y,fa:true,hide:hide});
	}
};

Calendar.prototype.rendering = function(opt) {
	var Day = opt.f?opt.l-opt.f+1:1;
	for(var i = Day; i<=opt.l ; i++) {
		var $li    = $(document.createElement("li"));
		if(opt.hide) {
			$li.html("<span>&nbsp;</span>").addClass("hide").appendTo(this.$ul);
			continue;
		}
		var	d      = this.day(Day,opt.m,opt.y),
			wDay   = Day<10?"0"+Day:Day,
			wMonth = (opt.m+1)<10?"0"+(opt.m+1):opt.m+1,
			htm    = d.d?"<div class=\"focus\"></div><span>"+Day+"</span>":"<span>"+Day+"</span>";
			$li.html(htm).attr("HQ_date",opt.y+this.b[3]+wMonth+this.b[3]+wDay);
			
		if(this.opt.min>0) {
			var l = {y:opt.y,m:opt.m,d:Day},
				f = {y:this.nowY,m:this.nowM,d:this.nowD};
		}else if(this.opt.min<0) {
			var f = {y:opt.y,m:opt.m,d:Day},
				l = {y:this.nowY,m:this.nowM,d:this.nowD};
		}
		var r = this.opt.min!=0?this.range(f,l):true;
		
		this.data&&!d.d||!r?$li.addClass("ban"):(d.h?(!d.n&&opt.fa&&$li.addClass("an"),d.n&&$li.addClass("now"),$li.addClass("cur")):(!d.n?(opt.fa?$li.addClass("an"):$li.addClass("h")):$li.addClass("now")));
	
		if(r&&(!this.data||this.data&&d.d)) {
			$li.on("click",(function(t) {
				return function(e) {
					t.show.call(t,this);
				};
			})(this,Day));
		}
		Day++;
		$li.appendTo(this.$ul);
	}
	this.opt.multiSelect=="section"&&this.section();
};

Calendar.prototype.section = function() {
	var timeS = new Date(this.val[0]).getTime(),
		timeE = (this.val.length>1?new Date(this.val[1]).getTime():timeS)+1000*60*60*24;
		
	this.$ul.find("li").each(function(i) {
		var li = $(this),
			v  = new Date(li.attr("hq_date").replace(/-/ig,"/")).getTime();
		!li.hasClass("ban")&&v>=timeS&&v<timeE?li.addClass("cur"):li.removeClass("cur");
	});
};

Calendar.prototype.show = function() {
	var $e   = $(arguments[0]),
		date = $e.attr("hq_date");
		
	if(this.opt.multiSelect=="section") {
		if(this.opt.multiSelect=="section"&&this.val&&this.val.length>1) this.times.length = 0;
		this.val = this.calData(date);
		this.section();
	}else if(this.opt.multiSelect=="selectMore"){
		if(!$e.hasClass("cur")) $e.addClass("cur");
		else if(this.times.length>1) $e.removeClass("cur");
		this.val = this.calData(date,$e.hasClass("cur"));
	}else {
		this.val.length = 0;
		this.val = this.calData(date);
	}
	this.writeInp();
	if(this.opt.multiSelect=="radio") this.running();
};

Calendar.prototype.running = function(date) {
	if(this.opt.callback) {
		var val = [];
		_data.call(this);
		this.opt.callback(val);
	}
	this.delCalendar();
	
	function _data() {
		for(var i=0,l=this.val.length;i<l;i++) {
			if(this.opt.backType=="timestamp") {var d = this.val[i].getTime();}
			else if(this.opt.backType=="UTC") {var d = this.val[i];}
			else {
				var today       = new Date(this.val[i]),
					nD          = today.getDate(),
					nM          = today.getMonth(),
					nY          = today.getFullYear();
				var d = nY+this.b[3]+(nM+1)+this.b[3]+nD;
			}
			val.push(d);
		}
		return val;
	}
};

Calendar.prototype.formatData = function() { //  calendar format
	var vData = {};
	switch (this.opt.format) {
		case "YYYY\/MM\/DD":
				vData.b = "4,2,2,\/";
				break;
		case "YYYY-MM-DD":
				vData.b = "4,2,2,-";
				break;
	}
	return vData;
};

Calendar.prototype.hi = function() {  // data 
	var dataHis = [];
	for(var o in this.opt.data) {
		var d   = {},
			his = new Date(parseInt(o));
		d.nowDay   = his.getDate();
		d.nowMonth = his.getMonth();
		d.nowYear  = his.getFullYear();
		dataHis.push(d);
	}
	return dataHis;
};

Calendar.prototype.day = function(Day,m,y) {  // date 高亮
	var r = {},
		m = m || this.vNowMonth,
		y = y || this.vNowYear;
		
	if(this.data) {
		for(var i=0,l=this.data.length;i<l;i++) {
			if(Day == this.data[i].nowDay && m == this.data[i].nowMonth && y == this.data[i].nowYear) r.d = true;
		}
	}
	for(var i=0,l=this.days.length;i<l;i++) {
		if (Day == this.days[i] && m == this.months[i] && y == this.years[i]) {
			r.h = true;
			if(Day == this.nowD && m == this.nowM && y == this.nowY) r.n = true;
			else r.n = null;
			return r;
		}else if(Day == this.nowD && m == this.nowM && y == this.nowY) {
			r.h = false;
			r.n = true;
		}else {
			r.h = false;
			r.n = false;
		}
	}
	return r;
};

Calendar.prototype.delCalendar = function(f) { // calendar close
	if(this.opt.multiSelect!='radio'&&f) {
		var d = this.$d.attr("o").split(",");
		this.val.length = 0;
		for(var i=0,l=d.length;i<l;i++) this.val.push(new Date(d[i]));
		this.writeInp();
	}
	typeof this.$d=="object"&&this.$d.length&&(this.$d.remove(),delete this.$d);
	$(document.body).unbind("click");
};

Calendar.prototype.inputPosition = function() { // calendar position
	var s = this.$e.offset();
	return {t:s.top,l:s.left,h:this.$e.innerHeight()};
}

Calendar.prototype.htmlCode = (function() {
	var htmlCode = "";
	htmlCode += '<div class="HQ_date_head">';
	htmlCode += '<div class="HQ_date_prevF">&lt;</div>';
    htmlCode += '<div class="HQ_date_prevM">&lt;</div>';
    htmlCode += '<div class="HQ_data_title"><span class="m"></span> <span class="y"></span></div>';
    htmlCode += '<div class="HQ_date_nextM">&gt;</div>';
    htmlCode += '<div class="HQ_date_nextF">&gt;</div>';
    htmlCode += '</div>';
    htmlCode += '<div class="HQ_data_week_box"><ul></ul></div>';
    htmlCode += '<div class="HQ_data_days"></div>';
	return htmlCode;
})();

Calendar.prototype.cssCode = (function() {
	var cssCode = '';
	cssCode += '.HQ_date_box {font-family:Arial;width:238px;position:absolute;z-index:5;background:#ededef;border-radius:5px;box-shadow: 1px 1px 6px #888888;}';
	cssCode += '.HQ_date_box ul,.HQ_date_box li {margin:0;padding:0;list-style-type:none;}';
	cssCode += '.HQ_date_head {margin:0 5px;height:40px;}';
	cssCode += '.HQ_date_prevM,.HQ_date_nextM,.HQ_date_prevF,.HQ_date_nextF {display: block;width: 16px;height: 16px;float: left;cursor: pointer;border-radius:2px;margin:12px 4px 0 0;line-height:16px;text-align:center;color:#fff;}';
	cssCode += '.HQ_date_prevM {background-color:#fb5f24;}';
	cssCode += '.HQ_date_nextM {background-color:#fb5f24;}';
	cssCode += '.HQ_date_prevF {background-color:#323232;}';
	cssCode += '.HQ_date_nextF {background-color:#323232;margin-right:0;}';
	cssCode += '.HQ_data_title {width:148px;float:left;hieght:28px;line-height:28px;text-align:center;background:#383637;border-radius:3px;margin:6px 4px 0 0;font-size:14px;font-weight:bolder;}';
	cssCode += '.HQ_data_title .m {color:#fb5f24;}';
	cssCode += '.HQ_data_title .y {color:#efefef;}';
	cssCode += '.HQ_data_week_box {margin:0 4px;background:#d0d0d0;}';
	cssCode += '.HQ_data_week_box ul {overflow:hidden;}';
	cssCode += '.HQ_data_week_box li {width:32px;height:24px;background:#4d4d4d;float:left;margin:1px 1px 1px 0px;color:#fff;font-size:12px;line-height:24px;text-align:center;font-family:"微软雅黑";}';
	cssCode += '.HQ_data_week_box .weekend {color:#999;}';
	cssCode += '.HQ_data_days {margin:8px 3px;overflow:hidden;}';
	cssCode += '.HQ_data_days ul {padding:1px 0 0 1px;overflow:hidden;}';
	cssCode += '.HQ_data_days li {width:32px;height:31px;border:1px solid #cecece;margin:-1px 0 0 -1px;float:left;background:#fff;cursor:pointer;position:relative;}';
	cssCode += '.HQ_data_days li span {display:block;width:inherit;text-align:center;line-height:20px;padding-top:10px;}';
	cssCode += '.HQ_data_days .hide {visibility:hidden;}';
	cssCode += '.HQ_data_days .h:hover,.HQ_data_days .an:hover {background:#ececec;box-shadow:inset 1px 1px 2px #c7c7c7;}';
	cssCode += '.HQ_data_days .cur:hover {background:#ff9167;box-shadow:inset 1px 1px 2px #ff6024;}';
	cssCode += '.HQ_data_days .an {color:#cecece;}';
	cssCode += '.HQ_data_days .now {background:#767676;box-shadow:inset 1px 1px 2px #6e6e6e;color:#fff;}';
	cssCode += '.HQ_data_days .cur {background:#ff9167;box-shadow:inset 1px 1px 2px #ff6024;color:#fff;}';
	cssCode += '.HQ_data_days .ban {background:#ebebeb;color:#bbbbbb;}';
	
	cssCode += '.HQ_data_days .focus {width:6px;height:6px;overflow:hidden;position:absolute;left:3px;top:3px;background:#fd5e27;border-radius:6px;}';
	cssCode += '.HQ_data_days .cur .focus,.HQ_data_days .now .focus {background:#fff;}';
	cssCode += '.HQ_date_box .HQ_data_ok,.HQ_date_box .HQ_data_cancel {width:50px;height:25px;text-align:center;line-height:25px;float:right;margin:-3px 3px 5px 0;font-size:14px;border-radius:2px;cursor:pointer;}';
	cssCode += '.HQ_date_box .HQ_data_ok {background:#616161;color:#fff;}';
	cssCode += '.HQ_date_box .HQ_data_cancel {background:#d5d5d5;color:#808080;}';
	return cssCode;
})();