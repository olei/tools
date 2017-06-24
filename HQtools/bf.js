


(function(W) {
	if(W.HQ) return;
	W.HQ = function() {
		var e = arguments[0] || null,
			a = [];
		var b = new tools();
		for(var i in b) a[i] = b[i];
		if(!e) a = 0;
		else if(typeof e=="string"){
			if(e.indexOf("#") != -1) 
				document.getElementById(r(e))&&a.push(document.getElementById(r(e)));
			else {
				a.push(document);
				a = a.find(e);
			}
		}else if(typeof e=="object") a.push(e);
		return a;
	};
	
	
	
	
	
	
	var r = function(v) {
			if(!v) return '';
			return v.replace(/^(\#|\.)*/ig,'');
		},
	tools = function() {};
		
	tools.prototype = {
		each : function(fn) {    // 遍历
			var l = this.length;
			if(!l||!fn) return;
			for(var i=0;i<l;i++) {
				this[i].fn = fn;
				this[i].fn(i);
			}
		},
		html : function(v) {   // 属性
			if(!v) { 
				var str = '';
				this.each(function(i) {
					str += this.innerHTML;
				});
				return str;
			}
			this.each(function(i) {
				this.innerHTML = v;
			});
		},
		val : function(v) {
		
		},
		css : function(k,v) {  
			if(!k) return;
			var val = {};
			typeof k=="string"?(val[k]=v):(val=k);
			this.each(function() {
				var cssCode = "";
				for(var i in val) cssCode += i+":"+val[i]+";";
				this.style.cssText = cssCode;
			});
		},
		attr : function(k,v) {
			if(typeof k=="string"&&!v) {
				var val="";
				this.each(function() {
					val = this.getAttribute("abc");
				});
				return val || '';
			}
			var val = {};
			typeof k=="string"?(val[k]=v):(val=k);
			this.each(function() {
				for(var i in val) {
					this.setAttribute(i,val[i]);
				}
			});
		},
		eq : function(i) {       // 查找，筛选
			var b = new tools(),o = [this[i]];
			for(var a in b) o[a] = b[a];
			return o;
		},
		find : function() {     
			var a = [];
			var b = new tools();
			for(var i in b) a[i] = b[i];
			
			if(!/^(\#|\.){1}/.test(arguments[0])) {
				var e = r(arguments[0]);
				this.each(function(i) {
					var c = this.getElementsByTagName(e);
					for(var i=0,l=c.length;i<l;i++) a.push(c[i]);	
				});
			}else if(arguments[0].indexOf(".") != -1){
				var e = r(arguments[0]);
				this.each(function(i) {
					var c = this.getElementsByTagName('*');
						for(var i=0,l=c.length;i<l;i++) {
							var f  = c[i],
								cN = f.className.split(' ');
							for(var j=0,cL=cN.length;j<cL;j++) {
								if(cN[j] == e) {
									a.push(f);
									break;
								}
							}
						}
				});
			}
			return a;
		},
		on : function(type,handler) {   // 事件
			this.each(function() {
				if(this.addEventListener) this.addEventListener(type,handler,false);
				else if(this.attachEvent) this.attachEvent('on'+type,handler);
				else this['on'+type] = handler;
			});
		},
		un : function(type,handler) {
			this.each(function() {
				if(this.removeEventListener) this.removeEventListener(type,handler,false);
				else if(this.detachEvent) this.detachEvent('on'+type,handler);
				else this['on'+type] = null;
			});
		}
	};
	
	var o = new tools();
	HQ.each = o.each;
})(window);