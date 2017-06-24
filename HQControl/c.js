/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 * 
 * dateinput/dateinput.js
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * toolbox/toolbox.expose.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(a, b) {
	a.tools = a.tools || {
		version: "v1.2.6"
	};
	var c = [],
	d,
	e = [75, 76, 38, 39, 74, 72, 40, 37],
	f = {};
	d = a.tools.dateinput = {
		conf: {
			format: "mm/dd/yy",
			selectors: !1,
			yearRange: [ - 5, 5],
			lang: "en",
			offset: [0, 0],
			speed: 0,
			firstDay: 0,
			min: b,
			max: b,
			trigger: 0,
			toggle: 0,
			editable: 0,
			css: {
				prefix: "cal",
				input: "date",
				root: 0,
				head: 0,
				title: 0,
				prev: 0,
				next: 0,
				month: 0,
				year: 0,
				days: 0,
				body: 0,
				weeks: 0,
				today: 0,
				current: 0,
				week: 0,
				off: 0,
				sunday: 0,
				focus: 0,
				disabled: 0,
				trigger: 0
			}
		},
		localize: function(b, c) {
			a.each(c,
			function(a, b) {
				c[a] = b.split(",")
			}),
			f[b] = c
		}
	},
	d.localize("en", {
		months: "January,February,March,April,May,June,July,August,September,October,November,December",
		shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
		days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
		shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat"
	});
	function g(a, b) {
		return (new Date(a, b + 1, 0)).getDate()
	}
	function h(a, b) {
		a = "" + a,
		b = b || 2;
		while (a.length < b) a = "0" + a;
		return a
	}
	var i = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,
	j = a("<a/>");
	function k(a, b, c) {
		var d = a.getDate(),
		e = a.getDay(),
		g = a.getMonth(),
		k = a.getFullYear(),
		l = {
			d: d,
			dd: h(d),
			ddd: f[c].shortDays[e],
			dddd: f[c].days[e],
			m: g + 1,
			mm: h(g + 1),
			mmm: f[c].shortMonths[g],
			mmmm: f[c].months[g],
			yy: String(k).slice(2),
			yyyy: k
		},
		m = b.replace(i,
		function(a) {
			return a in l ? l[a] : a.slice(1, a.length - 1)
		});
		return j.html(m).html()
	}
	function l(a) {
		return parseInt(a, 10)
	}
	function m(a, b) {
		return a.getFullYear() === b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate()
	}
	function n(a) {
		if (a !== b) {
			if (a.constructor == Date) return a;
			if (typeof a == "string") {
				var c = a.split("-");
				if (c.length == 3) return new Date(l(c[0]), l(c[1]) - 1, l(c[2]));
				if (!/^-?\d+$/.test(a)) return;
				a = l(a)
			}
			var d = new Date;
			d.setDate(d.getDate() + a);
			return d
		}
	}
	function o(d, h) {
		var i = this,
		j = new Date,
		o = j.getFullYear(),
		p = h.css,
		q = f[h.lang],
		r = a("#" + p.root),
		s = r.find("#" + p.title),
		t,
		u,
		v,
		w,
		x,
		y,
		z = d.attr("data-value") || h.value || d.val(),
		A = d.attr("min") || h.min,
		B = d.attr("max") || h.max,
		C,
		D;
		A === 0 && (A = "0"),
		z = n(z) || j,
		A = n(A || new Date(o + h.yearRange[0], 1, 1)),
		B = n(B || new Date(o + h.yearRange[1] + 1, 1, -1));
		if (!q) throw "Dateinput: invalid language: " + h.lang;
		if (d.attr("type") == "date") {
			var D = d.clone(),
			E = D.wrap("<div/>").parent().html(),
			F = a(E.replace(/type/i, "type=text data-orig-type"));
			h.value && F.val(h.value),
			d.replaceWith(F),
			d = F
		}
		d.addClass(p.input);
		var G = d.add(i);
		if (!r.length) {
			r = a("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({
				position: "absolute"
			}).attr("id", p.root),
			r.children().eq(0).attr("id", p.head).end().eq(1).attr("id", p.body).children().eq(0).attr("id", p.days).end().eq(1).attr("id", p.weeks).end().end().end().find("a").eq(0).attr("id", p.prev).end().eq(1).attr("id", p.next),
			s = r.find("#" + p.head).find("div").attr("id", p.title);
			if (h.selectors) {
				var H = a("<select/>").attr("id", p.month),
				I = a("<select/>").attr("id", p.year);
				s.html(H.add(I))
			}
			var J = r.find("#" + p.days);
			for (var K = 0; K < 7; K++) J.append(a("<span/>").text(q.shortDays[(K + h.firstDay) % 7]));
			a("body").append(r)
		}
		h.trigger && (t = a("<a/>").attr("href", "#").addClass(p.trigger).click(function(a) {
			h.toggle ? i.toggle() : i.show();
			return a.preventDefault()
		}).insertAfter(d));
		var L = r.find("#" + p.weeks);
		I = r.find("#" + p.year),
		H = r.find("#" + p.month);
		function M(b, c, e) {
			z = b,
			w = b.getFullYear(),
			x = b.getMonth(),
			y = b.getDate(),
			e = e || a.Event("api"),
			e.type = "beforeChange",
			G.trigger(e, [b]);
			e.isDefaultPrevented() || (d.val(k(b, c.format, c.lang)), e.type = "change", G.trigger(e), d.data("date", b), i.hide(e))
		}
		function N(b) {
			b.type = "onShow",
			G.trigger(b),
			a(document).bind("keydown.d",
			function(b) {
				if (b.ctrlKey) return ! 0;
				var c = b.keyCode;
				if (c == 8) {
					d.val("");
					return i.hide(b)
				}
				if (c == 27 || c == 9) return i.hide(b);
				if (a(e).index(c) >= 0) {
					if (!C) {
						i.show(b);
						return b.preventDefault()
					}
					var f = a("#" + p.weeks + " a"),
					g = a("." + p.focus),
					h = f.index(g);
					g.removeClass(p.focus);
					if (c == 74 || c == 40) h += 7;
					else if (c == 75 || c == 38) h -= 7;
					else if (c == 76 || c == 39) h += 1;
					else if (c == 72 || c == 37) h -= 1;
					h > 41 ? (i.addMonth(), g = a("#" + p.weeks + " a:eq(" + (h - 42) + ")")) : h < 0 ? (i.addMonth( - 1), g = a("#" + p.weeks + " a:eq(" + (h + 42) + ")")) : g = f.eq(h),
					g.addClass(p.focus);
					return b.preventDefault()
				}
				if (c == 34) return i.addMonth();
				if (c == 33) return i.addMonth( - 1);
				if (c == 36) return i.today();
				c == 13 && (a(b.target).is("select") || a("." + p.focus).click());
				return a([16, 17, 18, 9]).index(c) >= 0
			}),
			a(document).bind("click.d",
			function(b) {
				var c = b.target; ! a(c).parents("#" + p.root).length && c != d[0] && (!t || c != t[0]) && i.hide(b)
			})
		}
		a.extend(i, {
			show: function(b) {
				if (! (d.attr("readonly") || d.attr("disabled") || C)) {
					b = b || a.Event(),
					b.type = "onBeforeShow",
					G.trigger(b);
					if (b.isDefaultPrevented()) return;
					a.each(c,
					function() {
						this.hide()
					}),
					C = !0,
					H.unbind("change").change(function() {
						i.setValue(I.val(), a(this).val())
					}),
					I.unbind("change").change(function() {
						i.setValue(a(this).val(), H.val())
					}),
					u = r.find("#" + p.prev).unbind("click").click(function(a) {
						u.hasClass(p.disabled) || i.addMonth( - 1);
						return ! 1
					}),
					v = r.find("#" + p.next).unbind("click").click(function(a) {
						v.hasClass(p.disabled) || i.addMonth();
						return ! 1
					}),
					i.setValue(z);
					var e = d.offset();
					/iPad/i.test(navigator.userAgent) && (e.top -= a(window).scrollTop()),
					r.css({
						top: e.top + d.outerHeight({
							margins: !0
						}) + h.offset[0],
						left: e.left + h.offset[1]
					}),
					h.speed ? r.show(h.speed,
					function() {
						N(b)
					}) : (r.show(), N(b));
					return i
				}
			},
			setValue: function(c, d, e) {
				var f = l(d) >= -1 ? new Date(l(c), l(d), l(e == b || isNaN(e) ? 1 : e)) : c || z;
				f < A ? f = A: f > B && (f = B),
				typeof c == "string" && (f = n(c)),
				c = f.getFullYear(),
				d = f.getMonth(),
				e = f.getDate(),
				d == -1 ? (d = 11, c--) : d == 12 && (d = 0, c++);
				if (!C) {
					M(f, h);
					return i
				}
				x = d,
				w = c,
				y = e;
				var k = new Date(c, d, 1 - h.firstDay),
				o = k.getDay(),
				r = g(c, d),
				t = g(c, d - 1),
				D;
				if (h.selectors) {
					H.empty(),
					a.each(q.months,
					function(b, d) {
						A < new Date(c, b + 1, 1) && B > new Date(c, b, 0) && H.append(a("<option/>").html(d).attr("value", b))
					}),
					I.empty();
					var E = j.getFullYear();
					for (var F = E + h.yearRange[0]; F < E + h.yearRange[1]; F++) A < new Date(F + 1, 0, 1) && B > new Date(F, 0, 0) && I.append(a("<option/>").text(F));
					H.val(d),
					I.val(c)
				} else s.html(q.months[d] + " " + c);
				L.empty(),
				u.add(v).removeClass(p.disabled);
				for (var G = o ? 0 : -7, J, K; G < (o ? 42 : 35); G++) J = a("<a/>"),
				G % 7 === 0 && (D = a("<div/>").addClass(p.week), L.append(D)),
				G < o ? (J.addClass(p.off), K = t - o + G + 1, f = new Date(c, d - 1, K)) : G < o + r ? (K = G - o + 1, f = new Date(c, d, K), m(z, f) ? J.attr("id", p.current).addClass(p.focus) : m(j, f) && J.attr("id", p.today)) : (J.addClass(p.off), K = G - r - o + 1, f = new Date(c, d + 1, K)),
				A && f < A && J.add(u).addClass(p.disabled),
				B && f > B && J.add(v).addClass(p.disabled),
				J.attr("href", "#" + K).text(K).data("date", f),
				D.append(J);
				L.find("a").click(function(b) {
					var c = a(this);
					c.hasClass(p.disabled) || (a("#" + p.current).removeAttr("id"), c.attr("id", p.current), M(c.data("date"), h, b));
					return ! 1
				}),
				p.sunday && L.find(p.week).each(function() {
					var b = h.firstDay ? 7 - h.firstDay: 0;
					a(this).children().slice(b, b + 1).addClass(p.sunday)
				});
				return i
			},
			setMin: function(a, b) {
				A = n(a),
				b && z < A && i.setValue(A);
				return i
			},
			setMax: function(a, b) {
				B = n(a),
				b && z > B && i.setValue(B);
				return i
			},
			today: function() {
				return i.setValue(j)
			},
			addDay: function(a) {
				return this.setValue(w, x, y + (a || 1))
			},
			addMonth: function(a) {
				var b = x + (a || 1),
				c = g(w, b),
				d = y <= c ? y: c;
				return this.setValue(w, b, d)
			},
			addYear: function(a) {
				return this.setValue(w + (a || 1), x, y)
			},
			destroy: function() {
				d.add(document).unbind("click.d").unbind("keydown.d"),
				r.add(t).remove(),
				d.removeData("dateinput").removeClass(p.input),
				D && d.replaceWith(D)
			},
			hide: function(b) {
				if (C) {
					b = a.Event(),
					b.type = "onHide",
					G.trigger(b),
					a(document).unbind("click.d").unbind("keydown.d");
					if (b.isDefaultPrevented()) return;
					r.hide(),
					C = !1
				}
				return i
			},
			toggle: function() {
				return i.isOpen() ? i.hide() : i.show()
			},
			getConf: function() {
				return h
			},
			getInput: function() {
				return d
			},
			getCalendar: function() {
				return r
			},
			getValue: function(a) {
				return a ? k(z, a, h.lang) : z
			},
			isOpen: function() {
				return C
			}
		}),
		a.each(["onBeforeShow", "onShow", "change", "onHide"],
		function(b, c) {
			a.isFunction(h[c]) && a(i).bind(c, h[c]),
			i[c] = function(b) {
				b && a(i).bind(c, b);
				return i
			}
		}),
		h.editable || d.bind("focus.d click.d", i.show).keydown(function(b) {
			var c = b.keyCode;
			if (!C && a(e).index(c) >= 0) {
				i.show(b);
				return b.preventDefault()
			}
			return b.shiftKey || b.ctrlKey || b.altKey || c == 9 ? !0 : b.preventDefault()
		}),
		n(d.val()) && M(z, h)
	}
	a.expr[":"].date = function(b) {
		var c = b.getAttribute("type");
		return c && c == "date" || a(b).data("dateinput")
	},
	a.fn.dateinput = function(b) {
		if (this.data("dateinput")) return this;
		b = a.extend(!0, {},
		d.conf, b),
		a.each(b.css,
		function(a, c) { ! c && a != "prefix" && (b.css[a] = (b.css.prefix || "") + (c || a))
		});
		var e;
		this.each(function() {
			var d = new o(a(this), b);
			c.push(d);
			var f = d.getInput().data("dateinput", d);
			e = e ? e.add(f) : f
		});
		return e ? e: this
	}
})(jQuery); (function(a) {
	a.tools = a.tools || {
		version: "v1.2.6"
	},
	a.tools.overlay = {
		addEffect: function(a, b, d) {
			c[a] = [b, d]
		},
		conf: {
			close: null,
			closeOnClick: !0,
			closeOnEsc: !0,
			closeSpeed: "fast",
			effect: "default",
			fixed: !a.browser.msie || a.browser.version > 6,
			left: "center",
			load: !1,
			mask: null,
			oneInstance: !0,
			speed: "normal",
			target: null,
			top: "10%"
		}
	};
	var b = [],
	c = {};
	a.tools.overlay.addEffect("default",
	function(b, c) {
		var d = this.getConf(),
		e = a(window);
		d.fixed || (b.top += e.scrollTop(), b.left += e.scrollLeft()),
		b.position = d.fixed ? "fixed": "absolute",
		this.getOverlay().css(b).fadeIn(d.speed, c)
	},
	function(a) {
		this.getOverlay().fadeOut(this.getConf().closeSpeed, a)
	});
	function d(d, e) {
		var f = this,
		g = d.add(f),
		h = a(window),
		i,
		j,
		k,
		l = a.tools.expose && (e.mask || e.expose),
		m = Math.random().toString().slice(10);
		l && (typeof l == "string" && (l = {
			color: l
		}), l.closeOnClick = l.closeOnEsc = !1);
		var n = e.target || d.attr("rel");
		j = n ? a(n) : null || d;
		if (!j.length) throw "Could not find Overlay: " + n;
		d && d.index(j) == -1 && d.click(function(a) {
			f.load(a);
			return a.preventDefault()
		}),
		a.extend(f, {
			load: function(d) {
				if (f.isOpened()) return f;
				var i = c[e.effect];
				if (!i) throw "Overlay: cannot find effect : \"" + e.effect + "\"";
				e.oneInstance && a.each(b,
				function() {
					this.close(d)
				}),
				d = d || a.Event(),
				d.type = "onBeforeLoad",
				g.trigger(d);
				if (d.isDefaultPrevented()) return f;
				k = !0,
				l && a(j).expose(l);
				var n = e.top,
				o = e.left,
				p = j.outerWidth({
					margin: !0
				}),
				q = j.outerHeight({
					margin: !0
				});
				typeof n == "string" && (n = n == "center" ? Math.max((h.height() - q) / 2, 0) : parseInt(n, 10) / 100 * h.height()),
				o == "center" && (o = Math.max((h.width() - p) / 2, 0)),
				i[0].call(f, {
					top: n,
					left: o
				},
				function() {
					k && (d.type = "onLoad", g.trigger(d))
				}),
				l && e.closeOnClick && a.mask.getMask().one("click", f.close),
				e.closeOnClick && a(document).bind("click." + m,
				function(b) {
					a(b.target).parents(j).length || f.close(b)
				}),
				e.closeOnEsc && a(document).bind("keydown." + m,
				function(a) {
					a.keyCode == 27 && f.close(a)
				});
				return f
			},
			close: function(b) {
				if (!f.isOpened()) return f;
				b = b || a.Event(),
				b.type = "onBeforeClose",
				g.trigger(b);
				if (!b.isDefaultPrevented()) {
					k = !1,
					c[e.effect][1].call(f,
					function() {
						b.type = "onClose",
						g.trigger(b)
					}),
					a(document).unbind("click." + m).unbind("keydown." + m),
					l && a.mask.close();
					return f
				}
			},
			getOverlay: function() {
				return j
			},
			getTrigger: function() {
				return d
			},
			getClosers: function() {
				return i
			},
			isOpened: function() {
				return k
			},
			getConf: function() {
				return e
			}
		}),
		a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),
		function(b, c) {
			a.isFunction(e[c]) && a(f).bind(c, e[c]),
			f[c] = function(b) {
				b && a(f).bind(c, b);
				return f
			}
		}),
		i = j.find(e.close || ".close"),
		!i.length && !e.close && (i = a("<a class=\"close\"></a>"), j.prepend(i)),
		i.click(function(a) {
			f.close(a)
		}),
		e.load && f.load()
	}
	a.fn.overlay = function(c) {
		var e = this.data("overlay");
		if (e) return e;
		a.isFunction(c) && (c = {
			onBeforeLoad: c
		}),
		c = a.extend(!0, {},
		a.tools.overlay.conf, c),
		this.each(function() {
			e = new d(a(this), c),
			b.push(e),
			a(this).data("overlay", e)
		});
		return c.api ? e: this
	}
})(jQuery); (function(a) {
	var b = a.tools.overlay,
	c = a(window);
	a.extend(b.conf, {
		start: {
			top: null,
			left: null
		},
		fadeInSpeed: "fast",
		zIndex: 9999
	});
	function d(a) {
		var b = a.offset();
		return {
			top: b.top + a.height() / 2,
			left: b.left + a.width() / 2
		}
	}
	var e = function(b, e) {
		var f = this.getOverlay(),
		g = this.getConf(),
		h = this.getTrigger(),
		i = this,
		j = f.outerWidth({
			margin: !0
		}),
		k = f.data("img"),
		l = g.fixed ? "fixed": "absolute";
		if (!k) {
			var m = f.css("backgroundImage");
			if (!m) throw "background-image CSS property not set for overlay";
			m = m.slice(m.indexOf("(") + 1, m.indexOf(")")).replace(/\"/g, ""),
			f.css("backgroundImage", "none"),
			k = a("<img src=\"" + m + "\"/>"),
			k.css({
				border: 0,
				display: "none"
			}).width(j),
			a("body").append(k),
			f.data("img", k)
		}
		var n = g.start.top || Math.round(c.height() / 2),
		o = g.start.left || Math.round(c.width() / 2);
		if (h) {
			var p = d(h);
			n = p.top,
			o = p.left
		}
		g.fixed ? (n -= c.scrollTop(), o -= c.scrollLeft()) : (b.top += c.scrollTop(), b.left += c.scrollLeft()),
		k.css({
			position: "absolute",
			top: n,
			left: o,
			width: 0,
			zIndex: g.zIndex
		}).show(),
		b.position = l,
		f.css(b),
		k.animate({
			top: f.css("top"),
			left: f.css("left"),
			width: j
		},
		g.speed,
		function() {
			f.css("zIndex", g.zIndex + 1).fadeIn(g.fadeInSpeed,
			function() {
				i.isOpened() && !a(this).index(f) ? e.call() : f.hide()
			})
		}).css("position", l)
	},
	f = function(b) {
		var e = this.getOverlay().hide(),
		f = this.getConf(),
		g = this.getTrigger(),
		h = e.data("img"),
		i = {
			top: f.start.top,
			left: f.start.left,
			width: 0
		};
		g && a.extend(i, d(g)),
		f.fixed && h.css({
			position: "absolute"
		}).animate({
			top: "+=" + c.scrollTop(),
			left: "+=" + c.scrollLeft()
		},
		0),
		h.animate(i, f.closeSpeed, b)
	};
	b.addEffect("apple", e, f)
})(jQuery); (function(a) {
	a.tools = a.tools || {
		version: "v1.2.6"
	};
	var b;
	b = a.tools.expose = {
		conf: {
			maskId: "exposeMask",
			loadSpeed: "slow",
			closeSpeed: "fast",
			closeOnClick: !0,
			closeOnEsc: !0,
			zIndex: 9998,
			opacity: .8,
			startOpacity: 0,
			color: "#fff",
			onLoad: null,
			onClose: null
		}
	};
	function c() {
		if (a.browser.msie) {
			var b = a(document).height(),
			c = a(window).height();
			return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, b - c < 20 ? c: b]
		}
		return [a(document).width(), a(document).height()]
	}
	function d(b) {
		if (b) return b.call(a.mask)
	}
	var e, f, g, h, i;
	a.mask = {
		load: function(j, k) {
			if (g) return this;
			typeof j == "string" && (j = {
				color: j
			}),
			j = j || h,
			h = j = a.extend(a.extend({},
			b.conf), j),
			e = a("#" + j.maskId),
			e.length || (e = a("<div/>").attr("id", j.maskId), a("body").append(e));
			var l = c();
			e.css({
				position: "absolute",
				top: 0,
				left: 0,
				width: l[0],
				height: l[1],
				display: "none",
				opacity: j.startOpacity,
				zIndex: j.zIndex
			}),
			j.color && e.css("backgroundColor", j.color);
			if (d(j.onBeforeLoad) === !1) return this;
			j.closeOnEsc && a(document).bind("keydown.mask",
			function(b) {
				b.keyCode == 27 && a.mask.close(b)
			}),
			j.closeOnClick && e.bind("click.mask",
			function(b) {
				a.mask.close(b)
			}),
			a(window).bind("resize.mask",
			function() {
				a.mask.fit()
			}),
			k && k.length && (i = k.eq(0).css("zIndex"), a.each(k,
			function() {
				var b = a(this);
				/relative|absolute|fixed/i.test(b.css("position")) || b.css("position", "relative")
			}), f = k.css({
				zIndex: Math.max(j.zIndex + 1, i == "auto" ? 0 : i)
			})),
			e.css({
				display: "block"
			}).fadeTo(j.loadSpeed, j.opacity,
			function() {
				a.mask.fit(),
				d(j.onLoad),
				g = "full"
			}),
			g = !0;
			return this
		},
		close: function() {
			if (g) {
				if (d(h.onBeforeClose) === !1) return this;
				e.fadeOut(h.closeSpeed,
				function() {
					d(h.onClose),
					f && f.css({
						zIndex: i
					}),
					g = !1
				}),
				a(document).unbind("keydown.mask"),
				e.unbind("click.mask"),
				a(window).unbind("resize.mask")
			}
			return this
		},
		fit: function() {
			if (g) {
				var a = c();
				e.css({
					width: a[0],
					height: a[1]
				})
			}
		},
		getMask: function() {
			return e
		},
		isLoaded: function(a) {
			return a ? g == "full": g
		},
		getConf: function() {
			return h
		},
		getExposed: function() {
			return f
		}
	},
	a.fn.mask = function(b) {
		a.mask.load(b);
		return this
	},
	a.fn.expose = function(b) {
		a.mask.load(b, this);
		return this
	}
})(jQuery);