/*!
 * HQtools JavaScript v0.0.6
 * http://mt.huanqiu.com/
 *
 * Copyright 2014, Wang Zheng
 *
 * Date: Fri Nov 21 13:32:50 2014
 */


(function(W) {
	if(W.HQ) return;
	W.HQ = function() {
		var e = arguments[0] || null,
			a = [];
		for(var i in b) a[i] = b[i];
		if(!e) a = 0;
		else if(typeof e=="string"){
			if(e.indexOf("#") != -1) document.getElementById(r(e))&&a.push(document.getElementById(r(e)));
			else {
				a.push(document);
				a = a.find(e);
			}
		}else if(typeof e=="object") a.push(e);
		return a;
	};
	
	var r     = function(v) {
			if(!v) return '';
			return v.replace(/^(\#|\.)*/ig,'');
		},
		each  = function(data,fn) {   
					var t = data instanceof Function;
					if(t) var fn = data;
					var l = t?this.length:data.length;
					if(!l||!fn) return;
					for(var i=0;i<l;i++) !t?fn(i,data):(this[i].fn = fn,this[i].fn(i));
				},
		b     = {
		each : function(data,fn) {    // 遍历
			each.call(this,data,fn);
		},
		html : function(v) {   // 属性
			return this.domAttr("html",v);
		},
		val : function(v) {
			return this.domAttr("val",v);
		},
		domAttr : function(type,v) {
			var type = type=="html"?"innerHTML":"value";
			if(!v) { 
				var str = '';
				this.each(function(i) {
					str = this[type];
				});
				return str;
			}
			this.each(function(i) {
				this[type] = v;
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
				for(var i in val) this.setAttribute(i,val[i]);
			});
			return this;
		},
		addClass : function(val) {
			if(!val||typeof val!="string") return false;
			this.each(function() {
				b.classFn.call(this,val,"add");
			});
			return this;
		},
		removeClass : function(val) {
			if(!val||typeof val!="string") return false;
			this.each(function() {
				b.classFn.call(this,val,"remove");
			});
			return this;
		},
		hasClass : function(val) {
			if(!val|| this.length>1 ||typeof val!="string") return false;
			return b.classFn.call(this[0],val,"has");
		},
		classFn : function(val,type) {
			if(!val||typeof val!="string") return false;
			if(this.nodeType==1) {
				var classNames = _classArr(this.className),
					manipulateClassNames = _classArr(val);
				if(type=="add") {
					var findItems = manipulateClassNames,
						targetItems = classNames;
				}else if(type=="remove"){
					var findItems = classNames,
						targetItems = manipulateClassNames,
						newClassNames = [];
				}else if(type=="has"){
					var reg = new RegExp("(\s|^){1}("+val+"){1}(\s|$){1}"),
						t   = reg.test(this.className);
					return t;
				}else {
					return false;
				}
				for(var i=0,l=findItems.length;i<l;i++) {
					var item = findItems[i],
						c = false;
					for(var loop=0,itemsL=targetItems.length;loop<itemsL;loop++) {
						if(item==targetItems[loop]) c=true;
					}
					if(!c) newClassNames?newClassNames.push(item):targetItems.push(item);
				}
				var classArr = newClassNames || targetItems;
				this.className = classArr.join(" ").replace(/^\s+|\s+$/g,'');
			}
			
			function _classArr(str) {
				return str.replace(/^\s+|\s+$/g,'').replace(/\s+/g,',').split(",");
			}
		},
		eq : function(i) {       // 查找，筛选
			var o = [this[i]];
			for(var a in b) o[a] = b[a];
			return o;
		},
		find : function() {     
			var a = [];
			for(var i in b) a[i] = b[i];
			if(arguments[0] && !/^(\#|\.){1}/.test(arguments[0])) {
				var e = r(arguments[0]);
				this.each(function(i) {
					var c = this.getElementsByTagName(e);
					for(var i=0,l=c.length;i<l;i++) a.push(c[i]);	
				});
			}else if(!arguments[0] || arguments[0].indexOf(".") != -1){
				var e = !arguments[0]?'':r(arguments[0]);
				this.each(function(i) {
					var c = this.getElementsByTagName('*');
						for(var i=0,l=c.length;i<l;i++) {
							var f  = c[i];
							if(!e) a.push(f);
							else {
								var	cN = f.className.split(' ');
								for(var j=0,cL=cN.length;j<cL;j++) {
									if(cN[j] == e) {
										a.push(f);
										break;
									}
								}
							}
						}
				});
			}
			return a;
		},
		children : function() {
			return arguments[0]?this.find(arguments[0]):this.find();
		},
		parent : function() {
			var a = [];
			for(var i in b) a[i] = b[i];
			this.each(function() {
				var parent = this.parentNode;
				while(parent.nodeType!=1) parent = parent.parentNode;
				a.push(parent);
			});
			return a;
		},
		next : function() {
			return this.sib("nextSibling",false,arguments[0]);
		},
		nextall : function() {
			return this.sib("nextSibling",true,arguments[0]);
		},
		prev : function() {
			return this.sib("previousSibling",false,arguments[0]);
		},
		prevall : function() {
			return this.sib("previousSibling",true,arguments[0]).reverse();
		},
		siblings : function() {
			var a = [];
			a = a.concat(this.prevall(),this.nextall());
			for(var i in b) a[i] = b[i];
			return a;
		},
		sib : function(type,all,val) {
			var a = [],
				t = val?/^(\.){1}/.test(val):null;
			for(var i in b) a[i] = b[i];
			this.each(function() {
				var n = this[type];
				while(n) {
					if(n.nodeType==1&&_back(n)) {
						a.push(n);
						if(!all) break;
					}
					n = n[type];
				}
			});
			
			function _back(n) {
				if(!val) return true;
				if(t) {
					var e   = r(val),
						reg = new RegExp("(\s|^){1}("+e+"){1}(\s|$){1}");
					return reg.test(n.className);
				}else {
					if(val == n.tagName.toLowerCase()) return true;
					return false;
				}
			}
			
			return a;
		},
		on : function(type,handler) {   // 事件
			this.each(function() {
				if(this.addEventListener) this.addEventListener(type,handler,false);
				else if(this.attachEvent) this.attachEvent('on'+type,handler);
				else this['on'+type] = handler;
			});
			return this;
		},
		off : function(type,handler) {
			this.each(function() {
				if(this.removeEventListener) this.removeEventListener(type,handler,false);
				else if(this.detachEvent) this.detachEvent('on'+type,handler);
				else this['on'+type] = null;
			});
			return this;
		},
		css : function(k,v) {  // css
			if(!k) return this;
			var val = {};
			typeof k=="string"?(val[k]=v):(val=k);
			this.each(function() {
				var cssCode = "";
				for(var i in val) cssCode += i+":"+val[i]+";";
				this.style.cssText = cssCode;
			});
			return this;
		},
		offset : function() {  
			if(this.length>1) return false;
			var o = this[0];
			o.left = o.offsetLeft;
			o.top  = o.offsetTop;
			return o;
		},
		scrollTop : function(val) {
			if(!this.length||this.length>1) return false;
			return b.scroll.call(this[0],val,"scrollTop");
		},
		scrollLeft : function(val) {
			if(!this.length||this.length>1) return false;
			return b.scroll.call(this[0],val,"scrollLeft");
		},
		scroll : function(val,type) {
			if(!val) {
				var o = this[type];
				return o;
			}
			this[type] = val;
		},
		width : function() {
		
		},
		height : function() {
		
		},
		innerWidth : function() {
		
		},
		innerHeight : function() {
		
		}
	},
	tools = {
		domAttr : function(type,v) {
			var type = type=="html"?"innerHTML":"value";
			if(!v) { 
				var str = '';
				this.each(function(i) {
					str = this[type];
				});
				return str;
			}
			this.each(function(i) {
				this[type] = v;
			});
		},
		classFn : function(val,type) {
			if(!val||typeof val!="string") return false;
			if(this.nodeType==1) {
				var classNames = _classArr(this.className),
					manipulateClassNames = _classArr(val);
				if(type=="add") {
					var findItems = manipulateClassNames,
						targetItems = classNames;
				}else if(type=="remove"){
					var findItems = classNames,
						targetItems = manipulateClassNames,
						newClassNames = [];
				}else if(type=="has"){
					var reg = new RegExp("(\s|^){1}("+val+"){1}(\s|$){1}"),
						t   = reg.test(this.className);
					return t;
				}else {
					return false;
				}
				for(var i=0,l=findItems.length;i<l;i++) {
					var item = findItems[i],
						c = false;
					for(var loop=0,itemsL=targetItems.length;loop<itemsL;loop++) {
						if(item==targetItems[loop]) c=true;
					}
					if(!c) newClassNames?newClassNames.push(item):targetItems.push(item);
				}
				var classArr = newClassNames || targetItems;
				this.className = classArr.join(" ").replace(/^\s+|\s+$/g,'');
			}
			
			function _classArr(str) {
				return str.replace(/^\s+|\s+$/g,'').replace(/\s+/g,',').split(",");
			}
		},
		sib : function(type,all,val) {
			var a = [],
				t = val?/^(\.){1}/.test(val):null;
			for(var i in b) a[i] = b[i];
			this.each(function() {
				var n = this[type];
				while(n) {
					if(n.nodeType==1&&_back(n)) {
						a.push(n);
						if(!all) break;
					}
					n = n[type];
				}
			});
			
			function _back(n) {
				if(!val) return true;
				if(t) {
					var e   = r(val),
						reg = new RegExp("(\s|^){1}("+e+"){1}(\s|$){1}");
					return reg.test(n.className);
				}else {
					if(val == n.tagName.toLowerCase()) return true;
					return false;
				}
			}
			
			return a;
		},
		scroll : function(val,type) {
			if(!val) {
				var o = this[type];
				return o;
			}
			this[type] = val;
		}
	};

	HQ.each = each;
	
	HQ.setCookie = function(name,value,expiry,path,domain,secure){
		var nameString = name + "=" + value;
		var expiryString = "";
		if (expiry != null) {
			try {
				expiryString = ";expires=" + new Date(expiry).getTime().toGMTString();
			} 
			catch (e) {
				if (expiry) {
					var lsd = new Date();
					lsd.setTime(lsd.getTime() + expiry * 1000);
					lsd.setTime(lsd.getTime()+expiry);
					expiryString = ";expires=" + lsd.toGMTString();
				}
			}
		}else {
			alert('setCookie方法没有设置过期时间！');
			return;
		}
		var pathString = (path == null) ? ";path=/" : ";path=" + path;
		var domainString = (domain == null) ? ";domain=" + window.location.host : ";domain=" + domain;
		var secureString = (secure) ? ";secure=" : "";
		document.cookie = nameString + expiryString + pathString + domainString + secureString;
	};
	
	HQ.getCookie = function(name) {
		var i, aname, value, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			aname = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			value = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			aname = aname.replace(/^\s+|\s+$/g, "");
			if (aname == name) return unescape(value);
		}
		return '';
	};
	
	HQ.getUrl = function() {  // 获取地址属性
		var qs      = window.location.search.length?window.location.search.substring(1):'',
			args    = {},
			items   = qs.length ? qs.split('&'):[],
			item    = null,
			arr     = [];
		for (var i=0,o=items.length;i<o;i++) {
			item    = items[i].split('=');
			name    = item[0];
			value   = item[1];
			if(name.length) args[name] = value;
		}
		return args;
	};
	
	HQ.preventDefault = function() {  //mousewheel/DOMMouseScroll
		var e = arguments[0] || window.event;
		var a = e.target || e.srcElement;
		if (e&&e.preventDefault){ 
			e.preventDefault();
			e.stopPropagation();
		}else{ 
			e.returnvalue=false;  
			return false;     
		}
	};
	
	HQ.ajax = (function() {    // ajax
		var createXHR = function() {
			if(typeof XMLHttpRequest != 'undefined') {
				createXHR = function() {
					return new XMLHttpRequest();
				};
			}else if(typeof ActiveXObject != "undefined") {
				createXHR = function() {
					if(typeof arguments.callee.activeXString != "string") {
						var versions = ["MSXML2.XMLHttp.6.0","MSXM2.XMLHttp.3.0","MSXML2.XMLHttp"];
						for(var i=0,len=versions.length;i<len;i++) {
							try{
								new ActiveXObject(versions[i]);
								arguments.callee.activeXString = versions[i];
							}catch(ex){}
						}
					}
					return new ActiveXObject(arguments.callee.activeXString);
				};
			}else {
				createXHR = function() {
					throw new Error("No AJAX.");
				};
			}
		}
		
		return function(obj) {
			var o = {
				url : "",
				type: "GET",
				timeout: 6000,
				cache:false,
				data:{},
				dataType:"json", // xml json
				success:function() {},
				error:function() {}
			};
			for(var i in obj) o[i] = obj[i];
			
			if(o.type!="GET") {
				if(typeof o.data!="string") {
					var data = '?';
					for(var i in o.data) data += i+"="+o.data[i]+"&";
					o.data = data.replace(/\&$/,'');
				}
				o.url += o.data;
			}
			
			if(o.cache) o.url += ("&timeout=" + new Date().getTime());
			
			createXHR.open(o.type,o.url,false);
			
			createXHR.onreadystatechange = function() {
				if(createXHR.readyState == 4 ) {
					if((createXHR.status >= 200 && createXHR.status < 300) || createXHR.status == 304) {
						if(o.dataType == "text") var data = createXHR.responseText;
						else if(o.dataType == "xml") var data = createXHR.responseXML;
						else if(o.dataType == "json") eval("var data = " + createXHR.responseText);

						o.success(data);
						
					}else {
						// 加载中...
					}
				}
			};
			
			createXHR.timeout = o.timeout;
			createXHR.ontimeout = function() {
				o.error("请求超时！");
			};
			createXHR.send(null);
		};
	})();
	
	
})(window);