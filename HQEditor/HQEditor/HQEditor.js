(function(W,D) {
	console.log(W.JSON);
	if(!W.HQEDITOR) W.HQEDITOR = (function() {
		var E = {
			timestamp: 'A8LE4JO',
			version: '1.0.0',
			tools:function() {
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
			}
		};
		
		E.tools.each = each;

		E.tools.setCookie = function(name,value,expiry,path,domain,secure){
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
	
		E.tools.getCookie = function(name) {
			var i, aname, value, ARRcookies = D.cookie.split(";");
			for (i = 0; i < ARRcookies.length; i++) {
				aname = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
				value = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
				aname = aname.replace(/^\s+|\s+$/g, "");
				if (aname == name) return unescape(value);
			}
			return '';
		};
		
		E.tools.preventDefault = function() {  //mousewheel/DOMMouseScroll
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
					
					if(v&&type=="innerHTML") return this;
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
							var reg = new RegExp("(\s|^)?("+val+"){1}(\s|$)?"),
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
							var sV    = /^scroll/g.test(i) ? a.tools(this)[i]() : parseInt(a.tools(this).css(i)),
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
									a.tools(t)[i](arr[index-1][i]);
									delete arr[index-1][i];
								}
							}
							a.tools(t).css(arr[index-1]);
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
			b = {
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
							val = this.getAttribute(k);
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
					return this;
				},
				off : function(type,handler) {
					if (this.events && this.events[type]) delete this.events[type][handler.$$guid];

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
							this.appendChild(ele);
						});
						return this;
					}else this.appendChild(ele);
				},
				appendTo : function(ele) {
					var ele = ele.length?ele:a.tools(ele),
						_t  = this;
					if(ele.length) {
						ele.each(function() {
							this.appendChild(_t[0]);
						});
						return this;
					}else ele.appendChild(this);
				},
				prepend : function(ele) {
					var ele = ele[0] || ele;
					this.each(function() {
						var l = a.tools(this).children();
						if(!l.length) b.append.call(this,ele);
						else {
							var o = l.eq(0)[0];
							
							this.insertBefore(ele,o);
						}
					});
					return this;
				},
				prependTo : function(ele) {
					var ele = ele.length?ele:a.tools(ele),
						_t  = this;
					ele.each(function() {
						var l = a.tools(this).children();
						if(!l.length) _t.appendTo(a.tools(this));
						else {
							var o = l.eq(0)[0];
							this.insertBefore(_t[0],o);
						}
					});
					return this;
				},
				after : function(ele) {  // 外部插入
					var ele = ele[0] || ele;
					this.each(function() {
						var nS = this.nextSibling;
						while(nS) {
							if(nS.nodeType==1||!nS.nextSibling) break;
							nS = nS.nextSibling;
						}
						!nS || nS.nodeType!=1?a.tools(this.parentNode).append(ele):this.parentNode.insertBefore(ele,nS);
					});
					return this;
				},
				before : function(ele) {
					var ele = ele[0] || ele;
					this.each(function() {
						this.parentNode.insertBefore(ele,this);
					});
					return this;
				},
				remove : function(ele) {
					var ele = !ele?false:ele.replace(/^\./,"");
					this.each(function() {
						var $o = a.tools(this);
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
		
		return E;
	})();
	
	
	
	
	
	
	
	if(!HQEDITOR.editor) {
		
		HQEDITOR.editor = function(ele,opt) {
			this.o = {
				minHeight:100
			};
			for(var i in opt) this.o[i] = opt[i];
			this.box = typeof ele=="string"?HQEDITOR.tools("#"+ele):HQEDITOR.tools(ele);
			
			this.E   = HQEDITOR.tools(D.createElement("div"));
			this.E
			.addClass("HQEdit_Box")
			.html(HQEDITOR.htmlCode)
			.appendTo(this.box);
			
			this.ifr = D.createElement("iframe");
			this.$ifr = HQEDITOR.tools(this.ifr);
			this.$ifr
			.css("height",this.o.minHeight)
			.attr("id","editer")
			.appendTo(this.E.find(".hq_content"));
			
			
			this.ifr.$ = this.ifr.contentDocument || this.ifr.contentWindow.document; // W3C || IE
			this.ifr.$.designMode = "on";
			this.ifr.$.contentEditable = true;
			
			this.event();
			
		};
		
		HQEDITOR.editor.prototype.event = function() { // tools button 注册事件
			var _this = this;
			this.$g = this.E.find(".hq_toolgroup");
			this.$g.each(function(i) {
				var type = HQEDITOR.tools(this).attr("type");
				HQEDITOR.tools(this).find(".hq_tool").each(function() {
					HQEDITOR.tools(this).on("click",(function(t) {return function() { t.hi.call(t,HQEDITOR.tools(this),type); }})(_this));
				});
			});
		};
		
		HQEDITOR.editor.prototype.hi = function(o,t,v) {
			if(type=="click") return;
			o.hasClass("on")?o.removeClass("on"):o.addClass("on");
			if(t=="radio") o.siblings(".hq_tool").removeClass("on");
		};
		
		HQEDITOR.editor.prototype.editGroup = function() { //编辑
			this.ifr.$.execCommand("bold",false,null);
			//if(this.ifr.$.getSelection) console.log(this.ifr.$.getSelection());
			//else console.log(this.ifr.$.selection.createRange().text);
		};
		
		
		
		
		
		
		
		
		HQEDITOR.cssCode = (function() {
			var cssCode = "";
			cssCode += '.HQEdit_Box {width:100%;min-width:530px;border:1px solid #cecece;background:#fff;font-family:Arial;font-size:12px;color:#424242;}';
			cssCode += '.HQEdit_Box i {font-style:normal;}';
			cssCode += '.HQEdit_Box .hq_disabled {filter:alpha(opacity=20);  -moz-opacity:0.2;  -khtml-opacity: 0.2;  opacity: 0.2;cursor:default;}';
			cssCode += '.HQEdit_Box span {cursor:pointer;}';
			cssCode += '.HQEdit_Box .on,.HQEdit_Box .hq_tool:hover {background-color:#b8c9e9;border-radius:3px;color:#000;}';
			cssCode += '.HQEdit_Box .HQtools,.HQEdit_Box .HQBott {width:inherit;height:28px;background-color:#e0e1e5;}';
			cssCode += '.HQEdit_Box .HQBott {background-color:#ecedef;}';
			cssCode += '.HQEdit_Box .editBar {width:inherit;background:#ecedef;height:36px;border-bottom:1px solid #cecece;}';
			cssCode += '.HQEdit_Box .hq_toolgroup {float:left;margin:0 5px;}';
			cssCode += '.HQEdit_Box .hq_bar {white-space:normal;display:block;float:left;line-height:20px;margin:4px 5px;padding:0 4px;}';
			cssCode += '.HQEdit_Box .hq_tool {width:20px;height:20px;display:block;float:left;background-image:url(images/icon.png);padding:0px;margin:4px 1px;}';
			cssCode += '.HQEdit_Box .HQ_undo_Off {background-position:-5px -26px;}';
			cssCode += '.HQEdit_Box .HQ_redo_Off {background-position:-30px -26px;}';
			cssCode += '.HQEdit_Box .HQ_undo_On {background-position:-4px -3px;}';
			cssCode += '.HQEdit_Box .HQ_redo_On {background-position:-30px -3px;display:inline-block;}';
			cssCode += '.HQEdit_Box .hq_cut {background-position:-61px -2px;}';
			cssCode += '.HQEdit_Box .hq_copy {background-position:-91px -2px;}';
			cssCode += '.HQEdit_Box .hq_paste {background-position:-121px -2px;}';
			cssCode += '.HQEdit_Box .hq_find {background-position:-152px -2px;}';
			cssCode += '.HQEdit_Box .hq_replace {background-position:-181px -2px;}';
			cssCode += '.HQEdit_Box .hq_selectAll {background-position:-276px -2px;}';
			cssCode += '.HQEdit_Box .hq_removeFormat {background-position:-306px -2px;}';
			cssCode += '.HQEdit_Box .hq_image {background-position:-367px -2px;}';
			cssCode += '.HQEdit_Box .hq_flash {background-position:-402px -2px;}';
			cssCode += '.HQEdit_Box .hq_maximize {background-position:-435px -3px;}';
			cssCode += '.HQEdit_Box .hq_bold {background-position:-60px -25px;}';
			cssCode += '.HQEdit_Box .hq_italic {background-position:-90px -25px;}';
			cssCode += '.HQEdit_Box .hq_underline {background-position:-120px -24px;}';
			cssCode += '.HQEdit_Box .hq_superscript {background-position:-152px -24px;}';
			cssCode += '.HQEdit_Box .hq_subscript {background-position:-183px -24px;}';
			cssCode += '.HQEdit_Box .hq_justifyleft {background-position:-276px -25px;}';
			cssCode += '.HQEdit_Box .hq_justifycenter {background-position:-305px -25px;}';
			cssCode += '.HQEdit_Box .hq_justifyright {background-position:-335px -25px;}';
			cssCode += '.HQEdit_Box .hq_justifyblock {background-position:-367px -25px;}';
			cssCode += '.HQEdit_Box .hq_textcolor {width:28px;background-position:-243px -25px;position:relative;}';
			cssCode += '.HQEdit_Box .hq_bgcolor {width:28px;background-position:-214px -25px;position:relative;}';
			cssCode += '.HQEdit_Box .hq_bulletedlist {background-position:-402px -25px;}';
			cssCode += '.HQEdit_Box .hq_numberedlist {background-position:-435px -25px;}';
			cssCode += '.HQEdit_Box .hq_outdent {background-position:-460px -25px;}';
			cssCode += '.HQEdit_Box .hq_indent {background-position:-483px -25px;}';
			cssCode += '.HQEdit_Box .hq_link {background-position:-214px -1px;}';
			cssCode += '.HQEdit_Box .hq_anchor {background-position:-335px -1px;}';
			cssCode += '.HQEdit_Box em {width:8px;height:20px;display:block;float:right;background:url(images/selectB.png) no-repeat right center;}';
			cssCode += '.HQEdit_Box .editBar .hq_toolgroup {margin:5px;}';
			cssCode += '.HQEdit_Box .hq_selectBox {width:46px;height:22px;float:left;background:url(images/selectB.png) no-repeat 36px center #fff;border:1px solid #babdc5;margin-top:1px;margin-left:-1px;line-height:22px;text-indent:3px;position:relative;}';
			cssCode += '.HQEdit_Box .vib {width:3px;height:20px;overflow:hidden;border-left:1px solid #c8cad0;float:left;margin-top:9px;}';
			cssCode += '.HQEdit_Box .hq_resizer {width:20px;height:20px;float:right;background:url(images/icon.png) no-repeat -460px -2px;margin:4px;cursor:n-resize;}';
			cssCode += '.HQEdit_Box .selectOption {position:absolute;z-index:10;background:#fff;border:1px solid #c8c8c8;width:100px;max-height:150px;overflow:auto;left:-1px;top:22px;}';
			cssCode += '.HQEdit_Box .selectOption span {width:100%;display:block;text-indent:3px;line-height:1.8em;}';
			cssCode += '.HQEdit_Box .selectOption span:hover {background:#d0d0ff;}';
			cssCode += '.HQEdit_Box .colorBox {width:176px;padding:4px;position:absolute;left:0;top:19px;background:#fff;border:1px solid #c8c8c8;}';
			cssCode += '.HQEdit_Box ul,.HQEdit_Box li {overflow:hidden;margin:0;padding:0;}';
			cssCode += '.HQEdit_Box .colorBox .item {margin:3px;width:12px;height:12px;list-style-type:none;float:left;background:#808080;padding:1px;border:1px solid #fff;}';
			cssCode += '.HQEdit_Box .colorBox .item span {width:12px;height:12px;display:block;}';
			cssCode += '.HQEdit_Box .colorBox .auto {clear:both;line-height:20px;text-align:center;background:#e3edfe;border:1px solid #e3edfe;}';
			cssCode += '.HQEdit_Box .colorBox li:hover {border:1px solid #6d6dc3;}';
			cssCode += '.HQEdit_Box iframe {width:100%;border:none;background:none;}';
			
			var d = W.HQEDITOR_CSSPATH || '';
			if(!d) {
				var sEle  = D.createElement("style"),
					$sEle = HQEDITOR.tools(sEle);
				$sEle.attr("type","text/css"); 
				HQEDITOR.tools("head").eq(0).append($sEle);
				if(sEle.styleSheet) sEle.styleSheet.cssText += cssCode; 
				else if(D.getBoxObjectFor) sEle.innerHTML += cssCode; //火狐
				else sEle.appendChild(D.createTextNode(cssCode));
				W.HQEDITOR_CSSPATH = true;
			}
			return cssCode;
		})();
		
		HQEDITOR.htmlCode = (function() {
			var htmlCode = "";
			htmlCode += '<div class="HQtools">';
			htmlCode += '<span class="hq_bar" title="源码">HTML</span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool HQ_undo_On" title="撤销"></span>';
			htmlCode += '<span class="hq_tool HQ_redo_On" title="重做"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool hq_cut" title="剪切"></span>';
			htmlCode += '<span class="hq_tool hq_copy" title="复制"></span>';
			htmlCode += '<span class="hq_tool hq_paste" title="粘贴"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool hq_find" title="查找"></span>';
			htmlCode += '<span class="hq_tool hq_replace" title="替换"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool hq_selectAll" title="全选"></span>';
			htmlCode += '<span class="hq_tool hq_removeFormat" title="清除"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool hq_link" title="链接"></span>';
			htmlCode += '<span class="hq_tool hq_anchor" title="锚点"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool hq_image" title="图像"></span>';
			htmlCode += '<span class="hq_tool hq_flash" title="flash"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool hq_maximize" title="全屏"></span>';
			htmlCode += '</span>';
			htmlCode += '</div>';
			htmlCode += '<div class="editBar">';
			htmlCode += '<span class="hq_toolgroup" type="select">';
			htmlCode += '<span class="hq_selectBox">';
			htmlCode += '<i>字体</i>';
			htmlCode += '<span class="selectOption" style="display:none;" >';
			htmlCode += '<span>宋体</span>';
			htmlCode += '<span>黑体</span>';
			htmlCode += '<span>仿宋</span>';
			htmlCode += '<span>楷体</span>';
			htmlCode += '<span>隶书</span>';
			htmlCode += '<span>幼圆</span>';
			htmlCode += '<span>微软雅黑</span>';
			htmlCode += '<span>Arial</span>';
			htmlCode += '<span>Trebuchet MS</span>';
			htmlCode += '</span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_selectBox">';
			htmlCode += '<i>大小</i>';
			htmlCode += '<span class="selectOption" style="display:none;">';
			htmlCode += '<span style="font-size:8px;">8</span>';
			htmlCode += '<span style="font-size:9px;">9</span>';
			htmlCode += '<span style="font-size:12px;">12</span>';
			htmlCode += '<span style="font-size:14px;">14</span>';
			htmlCode += '<span style="font-size:16px;">16</span>';
			htmlCode += '<span style="font-size:18px;">18</span>';
			htmlCode += '<span style="font-size:20px;">20</span>';
			htmlCode += '<span style="font-size:22px;">22</span>';
			htmlCode += '<span style="font-size:24px;">24</span>';
			htmlCode += '<span style="font-size:26px;">26</span>';
			htmlCode += '<span style="font-size:28px;">28</span>';
			htmlCode += '<span style="font-size:36px;">36</span>';
			htmlCode += '<span style="font-size:48px;">48</span>';
			htmlCode += '<span style="font-size:72px;">72</span>';
			htmlCode += '</span>';
			htmlCode += '</span>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_toolgroup" type="selectMore">';
			htmlCode += '<span class="hq_tool hq_bold" title="加粗"></span>';
			htmlCode += '<span class="hq_tool hq_italic" title="倾斜"></span>';
			htmlCode += '<span class="hq_tool hq_underline" title="下划线"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="vib"></span>';
			htmlCode += '<span class="hq_toolgroup" type="radio">';
			htmlCode += '<span class="hq_tool hq_superscript" title="上标"></span>';
			htmlCode += '<span class="hq_tool hq_subscript" title="下标"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="vib"></span>';
			htmlCode += '<span class="hq_toolgroup" type="select">';
			htmlCode += '<span class="hq_tool hq_bgcolor" title="背景颜色">';
			htmlCode += '<em></em>';
			htmlCode += '<div class="colorBox" style="display:none;">';
			htmlCode += '<ul>';
			htmlCode += '<li class="auto">自动</li>';
			htmlCode += '<li class="item"><span style="background:#000000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#003366;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#000080;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#333399;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#0000ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#3366ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#666699;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#cc99ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#333333;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#9999ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#33cccc;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#00ccff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#99ccff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ccffff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff00ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff99cc;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#808080;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#339966;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#00ffff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ccffcc;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffffff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffff99;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffcc99;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#800080;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#969696;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#003300;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#00ff00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffff00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffcc00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff9900;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff0000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#993366;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#c0c0c0;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#008000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#99cc00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#808000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#333300;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff6600;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#993300;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#800000;"></span></li>';
			htmlCode += '</ul>';
			htmlCode += '</div>';
			htmlCode += '</span>';
			htmlCode += '<span class="hq_tool hq_textcolor" title="文本颜色">';
			htmlCode += '<em></em>';
			htmlCode += '<div class="colorBox" style="display:none;">';
			htmlCode += '<ul>';
			htmlCode += '<li class="auto">自动</li>';
			htmlCode += '<li class="item"><span style="background:#000000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#003366;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#000080;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#333399;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#0000ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#3366ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#666699;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#cc99ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#333333;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#9999ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#33cccc;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#00ccff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#99ccff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ccffff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff00ff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff99cc;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#808080;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#339966;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#00ffff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ccffcc;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffffff;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffff99;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffcc99;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#800080;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#969696;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#003300;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#00ff00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffff00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ffcc00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff9900;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff0000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#993366;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#c0c0c0;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#008000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#99cc00;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#808000;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#333300;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#ff6600;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#993300;"></span></li>';
			htmlCode += '<li class="item"><span style="background:#800000;"></span></li>';
			htmlCode += '</ul>';
			htmlCode += '</div>';
			htmlCode += '</span>';
			htmlCode += '</span>';
			htmlCode += '<span class="vib"></span>';
			htmlCode += '<span class="hq_toolgroup" type="radio">';
			htmlCode += '<span class="hq_tool hq_justifyleft" title="左对齐"></span>';
			htmlCode += '<span class="hq_tool hq_justifycenter" title="居中"></span>';
			htmlCode += '<span class="hq_tool hq_justifyright" title="右对齐"></span>';
			htmlCode += '<span class="hq_tool hq_justifyblock" title="两端对齐"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="vib"></span>';
			htmlCode += '<span class="hq_toolgroup" type="radio">';
			htmlCode += '<span class="hq_tool hq_bulletedlist" title="项目列表"></span>';
			htmlCode += '<span class="hq_tool hq_numberedlist" title="编号列表"></span>';
			htmlCode += '</span>';
			htmlCode += '<span class="vib"></span>';
			htmlCode += '<span class="hq_toolgroup" type="click">';
			htmlCode += '<span class="hq_tool hq_outdent hq_disabled" title="减少缩进"></span>';
			htmlCode += '<span class="hq_tool hq_indent" title="增多缩进"></span>';
			htmlCode += '</span>';
			htmlCode += '</div>';
			htmlCode += '<div class="hq_content"></div>';
			htmlCode += '<div class="HQBott">';
			htmlCode += '<span class="hq_resizer"></span>';
			htmlCode += '</div>';
			
			return htmlCode;
		})();
		
		
	}
	
	
	
})(window,document);