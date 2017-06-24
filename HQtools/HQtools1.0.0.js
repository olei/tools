/*!
 * HQtools JavaScript v1.0.0
 *
 *
 * Copyright 2014, Wang Zheng
 *
 * Date: Fri Nov 28 10:41:10 2014
 */


(function(W,D) {
	if(!W.$) W.$ = function() {
		var e = arguments[0] || null,
			a = [];
		for(var i in b) a[i] = b[i];
		if(!e) a = 0;
		else if(typeof e=="string"){
			if(e.indexOf("#") != -1) D.getElementById(tools.r(e))&&a.push(D.getElementById(tools.r(e)));
			else {
				a.push(D);
				a = a.find(e);
			}
		}else if(typeof e=="object") a.push(e);
		return a;
	};
	
	var each  = function(data,fn) {   
					var t = data instanceof Function;
					if(t) var fn = data;
					var l = t?this.length:data.length;
					if(!l||!fn) return;
					for(var i=0;i<l;i++) !t?fn(i,data):(this[i].fn = fn,this[i].fn(i));
				},
		tools = {
			r : function() {
				if(!arguments[0]) return '';
				return arguments[0].replace(/^(\#|\.)*/ig,'');
			},
			guid : 1,
			handleEvent : function(event) {
				var e = event || W.event;
				var handlers = this.events[e.type];
				for (var o in handlers) {
					this.$$handleEvent = handlers[o];
					this.$$handleEvent(e);
				}
			},
			clone : function(obj) {
				if(!obj || typeof obj != 'object') return obj;
				var nObj = {}; 
				for(var i in obj) nObj[i] = tools.clone(obj[i]); 
				return nObj; 
			},
			cloneEle : function(ele) {
				var c = ele.cloneNode(true);
				for(var i in ele) {
					try{
						c[i] = ele[i];
					}catch(e) {};
				}
				return c;
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
						var e   = tools.r(val),
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
				var d = D.body || D.documentElement;
				if(!val) {
					var o = this[type] || d[type];
					return o;
				}
				this?(this[type] = val):(d[type] = val);
			},
			animate : function(o,time) {
				this.aS&&clearInterval(this.aS);
				var n     = Math.ceil(time/10),
					index = 1,
					val   = {},
					arr   = [];
					
				for(var loop=0;loop<n;loop++) {
					var css = {};
					for(var i in o) {
						var sV    = /^scroll/g.test(i) ? $(this)[i]() : parseInt($(this).css(i)),
							nV    = o[i],
							c     = nV>sV?nV-sV:sV-nV;
						val[i] = val[i] || _getMinusArray(c,n);
						css[i] = Math.floor(nV>sV?sV+val[i][loop]:sV-val[i][loop]);
					}
					arr.push(css);
				}
				
				(function(t) {
					t.aS = setInterval(function() {
						index>=n&&clearInterval(t.aS);
						for(var i in arr[index-1]) {
							if(/^scroll/g.test(i)) {
								$(t)[i](arr[index-1][i]);
								delete arr[index-1][i];
							}
						}
						$(t).css(arr[index-1]);
						index++;
					},10);
				})(this);
				
				function _getMinusArray(count,n) {
					n = n<=1 ? 2 : n;
					var d   = (count-n*0)*2/(n*(n-1)),
						arr = [],
						narr= [];
					for(var i=0;i<n;i++) arr.unshift(0+d*i);
					for(var i=0;i<arr.length;i++) !i?narr.push(arr[i]):narr.push(arr[i]+narr[i-1]);
					return narr;
				}
			},
			action : function(type,val) {
				this.aS&&clearInterval(this.aS);
				var n    = this.style.opacity*10 || (type == 'show'?0:10),
					time = n;

				if(type == 'show') {
					this.style.opacity = n/10;
					this.style.display = "";
					(function(t) {
						t.aS = setInterval(function() {
							n==10&&clearInterval(t.aS);
							t.style.opacity = n/10;
							n++;
						},val/(10-time));
					})(this);

				}else {
					(function(t) {
						t.aS = setInterval(function() {
							!n&&(clearInterval(t.aS),t.style.display="none");
							t.style.opacity = n/10;
							n--;
						},val/time);
					})(this);
				}
			}
		},
		b     = {
			each : function(data,fn) {    // 遍历
				each.call(this,data,fn);
			},
			html : function(v) {   // 属性
				return tools.domAttr.call(this,"html",v);
			},
			val : function(v) {
				return tools.domAttr.call(this,"val",v);
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
				if(!val||typeof val!="string") return;
				this.each(function() {
					tools.classFn.call(this,val,"add");
				});
				return this;
			},
			removeClass : function(val) {
				if(!val||typeof val!="string") return;
				this.each(function() {
					tools.classFn.call(this,val,"remove");
				});
				return this;
			},
			hasClass : function(val) {
				if(!val||typeof val!="string"||this.length&&this.length>1) return;
				var t = this[0] || this;
				return tools.classFn.call(t,val,"has");
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
					var e = tools.r(arguments[0]);
					this.each(function(i) {
						var c = this.getElementsByTagName(e);
						for(var i=0,l=c.length;i<l;i++) a.push(c[i]);	
					});
				}else if(!arguments[0] || arguments[0].indexOf(".") != -1){
					var e = !arguments[0]?'':tools.r(arguments[0]);
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
				if(!this.length||this.length>1) return;
				var a = [],
					t = this[0];
				for(var i in b) a[i] = b[i];
				for(var i=0,l=t.childNodes.length;i<l;i++) {
					if(t.childNodes[i].nodeType!=1) continue;
					var e = arguments[0]?tools.r(arguments[0]):"";
					if(arguments[0] && !/^(\#|\.){1}/.test(arguments[0])) t.childNodes[i].nodeName.toLowerCase()==e&&a.push(t.childNodes[i]);
					else if(arguments[0]&&arguments[0].indexOf(".") != -1) b.hasClass.call(t.childNodes[i],e)&&a.push(t.childNodes[i]);
					else t.childNodes[i].nodeType==1&&a.push(t.childNodes[i]);
				}
				return a;
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
				return tools.sib.call(this,"nextSibling",false,arguments[0]);
			},
			nextall : function() {
				return tools.sib.call(this,"nextSibling",true,arguments[0]);
			},
			prev : function() {
				return tools.sib.call(this,"previousSibling",false,arguments[0]);
			},
			prevall : function() {
				return tools.sib.call(this,"previousSibling",true,arguments[0]).reverse();
			},
			siblings : function() {
				var a = [];
				a = a.concat(this.prevall(),this.nextall());
				for(var i in b) a[i] = b[i];
				return a;
			},
			on : function(type,handler) {   // 事件
				this.each(function() {
					if (!handler.$$guid) handler.$$guid = tools.guid++;
					if (!this.events) this.events = {};
					var handlers = this.events[type];
					if (!handlers) {
						handlers = this.events[type] = {};
						if (this["on" + type]) handlers[0] = this["on" + type];
					}
					handlers[handler.$$guid] = handler;
					this["on" + type] = function() {tools.handleEvent.call(this);};
				});
				/*
				this.each(function() {
					if(this.addEventListener) this.addEventListener(type,handler,false);
					else if(this.attachEvent) this.attachEvent('on'+type,handler);
					else this['on'+type] = handler;
				});
				*/
				return this;
			},
			off : function(type,handler) {
				if (this.events && this.events[type]) delete this.events[type][handler.$$guid];
				/*
				this.each(function() {
					if(this.removeEventListener) this.removeEventListener(type,handler,false);
					else if(this.detachEvent) this.detachEvent('on'+type,handler);
					else this['on'+type] = null;
				});
				*/
				return this;
			},
			css : function(k,v) {  // css
				if(!k||!this.length) return this;
				
				if(!v&&typeof k!="object") {
					if(this.length>1) return this;
					var prop = k.replace(/(\-){1}(\w){1}/g,function(word){
							return word.replace(/-/g,'').toUpperCase();
						});
					if (this[0].currentStyle) return this[0].currentStyle[prop];
					else if(W.getComputedStyle) return D.defaultView.getComputedStyle(this[0],null)[prop];
					else return this;
				}
				
				var val = {},
					v   = typeof v == "number" ? v+"px" : v;
				typeof k=="string"?(val[k]=v):(val=k);
				
				this.each(function() {
					var cssCode  = "",
						oCssCode = this.style.cssText;
					for(var i in val) {
						var reg  = new RegExp(i+"{1}\s*\:{1}\s*\d+\w+\s*\;+");
						oCssCode = oCssCode.replace(reg,'');
						cssCode += i+":"+(typeof val[i]=="number"?val[i]+"px":val[i])+";";
					}
					this.style.cssText = oCssCode+cssCode;
				});
				return this;
			},
			offset : function() {  
				if(!this.length||this.length>1) return;
				var o = this[0];
				o.left = o.offsetLeft;
				o.top  = o.offsetTop;
				return o;
			},
			scrollTop : function(val) {
				if(!this.length||this.length>1) return;
				return tools.scroll.call(this[0],val,"scrollTop");
			},
			scrollLeft : function(val) {
				if(!this.length||this.length>1) return;
				return tools.scroll.call(this[0],val,"scrollLeft");
			},
			width : function() {
				if(!this.length || this.length>1) return;
				return this[0].style.width || this[0].clientWidth;
			},
			height : function() {
				if(!this.length || this.length>1) return;
				return this[0].style.height || this[0].clientHeight;
			},
			innerWidth : function() {
				if(!this.length || this.length>1) return;
				return this[0].offsetWidth;
			},
			innerHeight : function() {
				if(!this.length || this.length>1) return;
				return this[0].offsetHeight;
			},
			append : function(ele) {  // 文档处理   内部插入
				var ele = ele[0] || ele;
				if(this.length) {
					this.each(function() {
						var c = tools.cloneEle(ele);
						this.appendChild(c);
					});
					return this;
				}else this.appendChild(ele);
			},
			appendTo : function(ele) {
				var ele = ele.length?ele:$(ele),
					_t  = this;
				if(ele.length) {
					ele.each(function() {
						var c = tools.cloneEle(_t[0]);
						this.appendChild(c);
					});
					return this;
				}else ele.appendChild(this);
			},
			prepend : function(ele) {
				var ele = ele[0] || ele;
				this.each(function() {
					var l = $(this).children();
					if(!l.length) b.append.call(this,ele);
					else {
						var o = l.eq(0)[0],
							c = tools.cloneEle(ele);
						
						this.insertBefore(c,o);
					}
				});
				return this;
			},
			prependTo : function(ele) {
				var ele = ele.length?ele:$(ele),
					_t  = this;
				ele.each(function() {
					var l = $(this).children();
					if(!l.length) _t.appendTo($(this));
					else {
						var o = l.eq(0)[0],
							c = tools.cloneEle(_t[0]);
						this.insertBefore(c,o);
					}
				});
				return this;
			},
			after : function(ele) {  // 外部插入
				var ele = ele[0] || ele;
				this.each(function() {
					var c = tools.cloneEle(ele);
					var nS = this.nextSibling;
					while(nS) {
						if(nS.nodeType==1||!nS.nextSibling) break;
						nS = nS.nextSibling;
					}
					!nS || nS.nodeType!=1?$(this.parentNode).append(ele):this.parentNode.insertBefore(c,nS);
				});
				return this;
			},
			before : function(ele) {
				var ele = ele[0] || ele;
				this.each(function() {
					var c = tools.cloneEle(ele);
					this.parentNode.insertBefore(c,this);
				});
				return this;
			},
			remove : function(ele) {
				var ele = !ele?false:ele.replace(/^\./,"");
				this.each(function() {
					var $o = $(this);
					if(ele&&$o.hasClass(ele)) this.parentNode.removeChild(this);
					else if(!ele) this.parentNode.removeChild(this);
				});
			},
			show : function(val) { // 效果
				this.each(function() {
					tools.action.call(this,"show",val);
				});
				return this;
			},
			hide : function(val) {
				this.each(function() {
					tools.action.call(this,"hide",val);
				});
				return this;
			},
			animate : function(opt,time) {
				if(!opt||typeof opt!="object") return;
				if(!time) time = 300;
				this.each(function() {
					tools.animate.call(this,opt,time);
				});
				return this;
			}
		};

	$.each = each;

	$.setCookie = function(name,value,expiry,path,domain,secure){
		var nameString = name + "=" + value;
		var expiryString = "";
		if (expiry != null) {
			try {
				expiryString = ";expires=" + new Date(expiry).getTime().toGMTString();
			}catch (e) {
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
		var domainString = (domain == null) ? ";domain=" + W.location.host : ";domain=" + domain;
		var secureString = (secure) ? ";secure=" : "";
		D.cookie = nameString + expiryString + pathString + domainString + secureString;
	};
	
	$.getCookie = function(name) {
		var i, aname, value, ARRcookies = D.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			aname = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			value = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			aname = aname.replace(/^\s+|\s+$/g, "");
			if (aname == name) return unescape(value);
		}
		return '';
	};
	
	$.getUrl = function(qs) {  // 获取地址属性
		var qs      = qs || W.location.search.length?W.location.search.substring(1):'',
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
	
	$.preventDefault = function() {  //mousewheel/DOMMouseScroll
		var e = arguments[0] || W.event,
			a = e.target || e.srcElement;
		if (e&&e.preventDefault){ 
			e.preventDefault();
			e.stopPropagation();
		}else{ 
			e.returnvalue=false;  
			return false;     
		}
	};
	
	$.ajax = (function() {    // ajax
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
				url      : "",
				type     : "GET",
				timeout  : 6000,
				cache    : false,
				data     : {},
				dataType : "json", // text xml json
				success  : function() {},
				error    : function() {}
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
	
})(window,document);