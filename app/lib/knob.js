/**
 * @yaireo/knobs - UI knobs controllers for JS/CSS live manipulation of various parameters
 *
 * @version v1.2.3
 * @homepage https://github.com/yairEO/knobs
 */

/*! Knobs 1.2.3 MIT | https://github.com/yairEO/knobs */
!(function (e, t) {
	"object" == typeof exports &&
	"undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define(t)
		: ((e =
				"undefined" != typeof globalThis
					? globalThis
					: e || self).Knobs = t());
})(this, function () {
	"use strict";
	"undefined" != typeof globalThis
		? globalThis
		: "undefined" != typeof window
		? window
		: "undefined" != typeof global
		? global
		: "undefined" != typeof self && self;
	function e(e) {
		return e &&
			e.__esModule &&
			Object.prototype.hasOwnProperty.call(
				e,
				"default",
			)
			? e.default
			: e;
	}
	var t = {
		exports: {},
	};
	/*! Color-Picker 0.10.2 MIT | https://github.com/yairEO/color-picker */
	!(function (e, t) {
		!(function (e) {
			var t = (e) =>
					new DOMParser().parseFromString(
						e.trim(),
						"text/html",
					).body.firstElementChild,
				o = {
					color: "white",
					onInput: (e) => e,
					onChange: (e) => e,
					buttons: {
						undo: {
							icon: "↶",
							title: "Undo",
						},
						format: {
							icon: "⇆",
							title: "Switch Color Format",
						},
						add: {
							icon: "+",
							title: "Add to Swatches",
						},
					},
				};
			const a = (e) =>
					e
						.match(/\((.*)\)/)[1]
						.split(",")
						.map(Number),
				r = (e) =>
					Object.assign(
						[0, 0, 0, 1],
						e
							.match(/\((.*)\)/)[1]
							.split(",")
							.map((e, t) =>
								3 != t || e.includes("%")
									? parseFloat(e)
									: 100 * parseFloat(e),
							),
					),
				n = (e) =>
					`hsla(${e.h}, ${e.s}%, ${e.l}%, ${e.a}%)`,
				i = (e) => e.toFixed(1).replace(".0", ""),
				s = (e) => {
					const [t, o, a, r] = ((e) =>
							e.match(/\w\w/g))(e),
						[n, i, s] = [t, o, a].map((e) =>
							parseInt(e, 16),
						);
					return `rgba(${n},${i},${s},${
						r
							? (parseInt(r, 16) / 255).toFixed(2)
							: 1
					})`;
				},
				l = (e) => {
					var t,
						o = document
							.createElement("canvas")
							.getContext("2d");
					return (
						(o.fillStyle = e),
						"#" == (t = o.fillStyle)[0] ? t : c(t)
					);
				},
				c = (e) => {
					const [t, o, r, n] = a(e),
						i =
							"#" +
							[t, o, r]
								.map((e) =>
									e.toString(16).padStart(2, "0"),
								)
								.join("");
					return 3 == e.length
						? i
						: i +
								Math.round(255 * n)
									.toString(16)
									.padStart(2, "0");
				},
				h = (e) => {
					let [t, o, r, n] = a(e);
					(t /= 255), (o /= 255), (r /= 255);
					let s = Math.max(t, o, r),
						l = Math.min(t, o, r),
						c = s - l,
						h = 0,
						d = 0,
						p = ((s + l) / 2).toPrecision(5);
					return (
						c &&
							((d =
								p > 0.5
									? c / (2 - s - l)
									: c / (s + l)),
							(h =
								s == t
									? (o - r) / c + (o < r ? 6 : 0)
									: (h =
											s == o
												? (r - t) / c + 2
												: (t - o) / c + 4)),
							(h /= 6)),
						{
							h: i(360 * h),
							s: i(100 * d),
							l: i(100 * p),
							a: i(100 * n),
						}
					);
				},
				d = (e, t) => (
					(t = (t + "").toLowerCase()),
					(e = l(e)),
					"hex" == t
						? e
						: t.startsWith("hsl")
						? n(h(s(e)))
						: t.startsWith("rgb")
						? s(e)
						: e
				);
			function p({
				name: e,
				min: t = 0,
				max: o = 100,
				value: a,
			}) {
				return `<div class="range color-picker__${e}" title="${e}" style="--min:${t}; --max:${o};">\n            <input type="range" name="${e}" value="${a}" min="${t}" max="${o}">\n            <output></output>\n            <div class='range__progress'></div>\n          </div>`;
			}
			function b(e) {
				const {
					buttons: { undo: t, format: o },
				} = this.settings;
				return `\n    <div class='color-picker__value cp-checkboard'>\n      <input name='value' inputmode='decimal' placeholder='CSS Color' value='${l(
					n(e),
				)}'>\n      <button title='${t.title}' name="undo">${t.icon}</button>\n      <button title='${o.title}' name='format'>${o.icon}</button>\n      <div></div>\n    </div>\n  `;
			}
			function u(e, t) {
				const {
					buttons: { add: o },
				} = this.settings;
				return `\n    <div class='color-picker__swatches' style='--initial-len:${
					t.length
				}'>\n      <button name='addSwatch' title='${o.title}'>${o.icon}</button>\n      ${e.map((e) => g(e, t.includes(e))).join("")}\n    </div>\n  `;
			}
			function g(e, t) {
				return `<div class="cp-checkboard color-picker__swatch" title="${e}" style="--c:${e}">${t ? "" : '<button name="removeSwatch">&times;</button>'}</div>`;
			}
			var v = Object.freeze({
				__proto__: null,
				scope: function () {
					const {
						h: e,
						s: t,
						l: o,
						a: a,
					} = this.color;
					return `\n    <div class='${(
						"color-picker " +
						(this.settings.className || "")
					).trim()}'>\n      ${p({
						name: "hue",
						value: e,
						max: "360",
					})}\n      ${p({
						name: "saturation",
						value: t,
					})}\n      ${p({
						name: "lightness",
						value: o,
					})}\n      ${p({
						name: "alpha",
						value: a,
					})}\n      <output></output>\n      ${b.call(
						this,
						this.color,
					)}\n      ${
						this.swatches
							? u.call(
									this,
									this.swatches,
									this.initialSwatches,
							  )
							: ""
					}\n    </div>\n  `;
				},
				slider: p,
				value: b,
				swatches: u,
				swatch: g,
			});
			function f() {
				this.syncGlobalSwatchesWithLocal();
			}
			function m(e) {
				e.preventDefault();
				const { value: t, max: o } = e.target,
					a = -1 * Math.sign(e.deltaY);
				t &&
					o &&
					((e.target.value = Math.min(
						Math.max(+t + a, 0),
						+o,
					)),
					x.call(this, e));
			}
			function k(e) {
				"Escape" == e.key &&
					this.settings.onClickOutside(e);
			}
			function _(e) {
				this.DOM.scope.contains(e.target) ||
					this.settings.onClickOutside(e);
			}
			function x(e) {
				const {
					name: t,
					value: o,
					type: a,
				} = e.target;
				"range" == a &&
					this.setColor({
						...this.color,
						[t[0]]: +o,
					});
			}
			function y(e) {
				const { type: t } = e.target;
				("range" != t && "text" != t) ||
					(this.history.last = this.color);
			}
			function w(e) {
				this.setColor(
					this.getHSLA(e.target.value),
				),
					this.DOM.value.blur();
			}
			function S(e) {
				const {
					name: t,
					parentNode: o,
					classList: a,
					title: r,
				} = e.target;
				"format" == t
					? this.swithFormat()
					: "undo" == t
					? this.history.undo()
					: "addSwatch" == t
					? this.addSwatch()
					: "removeSwatch" == t
					? this.removeSwatch(o, o.title)
					: a.contains("color-picker__swatch") &&
					  r &&
					  ((this.history.last = this.color),
					  this.setColor(this.getHSLA(r)));
			}
			var C = Object.freeze({
				__proto__: null,
				bindEvents: function () {
					[
						["scope", "input", x],
						["scope", "change", y],
						["scope", "click", S],
						["scope", "wheel", m],
						["value", "change", w],
					].forEach(([e, t, o]) =>
						this.DOM[e].addEventListener(
							t,
							o.bind(this),
							{
								pasive: !1,
							},
						),
					),
						window.addEventListener(
							"storage",
							f.bind(this),
						),
						this.settings.onClickOutside &&
							(document.body.addEventListener(
								"click",
								_.bind(this),
							),
							window.addEventListener(
								"keydown",
								k.bind(this),
							));
				},
			});
			function z() {
				const e = () =>
						this.settings.onChange(this.CSSColor),
					t = this.setColor.bind(this);
				return {
					_value: [this.color],
					get pop() {
						return this._value.pop();
					},
					get previous() {
						return this._value[
							this._value.length - 2
						];
					},
					set last(t) {
						this._value.push(t), e();
					},
					undo() {
						if (this._value.length > 1) {
							this.pop;
							let o =
								this._value[
									this._value.length - 1
								];
							return t(o), e(), o;
						}
					},
				};
			}
			const M = "@yaireo/color-picker/swatches";
			var O = Object.freeze({
				__proto__: null,
				getSetGlobalSwatches: function (e) {
					const t =
							this.settings.swatchesLocalStorage,
						o = "string" == typeof t ? t : "";
					return (
						t &&
							e &&
							(localStorage.setItem(M + o, e),
							dispatchEvent(
								new Event("storage"),
							)),
						localStorage[M + o]
							?.split(",")
							.filter(String) || []
					);
				},
				syncGlobalSwatchesWithLocal: function () {
					(this.sharedSwatches =
						this.getSetGlobalSwatches()),
						(this.swatches =
							this.sharedSwatches.concat(
								this.initialSwatches,
							)),
						this.DOM.swatches &&
							setTimeout(() => {
								const e = t(
									this.templates.swatches.call(
										this,
										this.swatches,
										this.initialSwatches,
									),
								);
								this.DOM.swatches.replaceWith(e),
									(this.DOM.swatches = e);
							}, 500);
				},
				addSwatch: function (e = this.CSSColor) {
					if (
						((e, t) =>
							e.some((e) => l(e) == l(t)))(
							this.swatches,
							e,
						)
					)
						return;
					const o = t(this.templates.swatch(e));
					o.classList.add("cp_remove"),
						this.DOM.swatches.prepend(o),
						setTimeout(
							() =>
								o.classList.remove("cp_remove"),
							0,
						),
						this.swatches.unshift(e),
						this.sharedSwatches.unshift(e),
						this.getSetGlobalSwatches(
							this.sharedSwatches,
						);
				},
				removeSwatch: function (e, t) {
					e.classList.add("cp_remove"),
						setTimeout(() => e.remove(), 200);
					const o = (e) => e != t;
					(this.swatches =
						this.swatches.filter(o)),
						(this.sharedSwatches =
							this.sharedSwatches.filter(o)),
						this.getSetGlobalSwatches(
							this.sharedSwatches,
						);
				},
			});
			function T(e) {
				this.settings = Object.assign({}, o, e);
				const {
					color: t,
					defaultFormat: a,
					swatches: r,
				} = this.settings;
				(this.DOM = {}),
					(this.sharedSwatches =
						this.getSetGlobalSwatches()),
					(this.initialSwatches = r || []),
					(this.swatches =
						r &&
						this.sharedSwatches.concat(
							this.initialSwatches,
						)),
					(this.color = d(t, a)),
					(this.history = z.call(this)),
					this.init();
			}
			(T.prototype = {
				templates: v,
				...O,
				...C,
				getColorFormat: (e) =>
					"#" == e[0]
						? "hex"
						: e.indexOf("hsl")
						? e.indexOf("rgb")
							? ""
							: "rgba"
						: "hsla",
				getHSLA(e) {
					let t;
					if (e)
						return e.h && e.s
							? e
							: ((this.colorFormat =
									this.getColorFormat(e)),
							  e.indexOf("hsla")
									? ((e = l(e)),
									  (e = s(e)),
									  (t = h(e)))
									: ((t = r(e)),
									  (t = {
											h: t[0],
											s: t[1],
											l: t[2],
											a: t[3],
									  })),
							  t);
				},
				swithFormat() {
					switch (this.colorFormat) {
						case "":
						case "hex":
							this.colorFormat = "rgba";
							break;
						case "rgba":
							this.colorFormat = "hsla";
							break;
						case "hsla":
							this.colorFormat = "hex";
					}
					this.setCSSColor(),
						(this.DOM.value.value =
							this.CSSColor);
				},
				updateRangeSlider(e, t) {
					const o = this.DOM.scope.querySelector(
						`input[name="${e}"]`,
					);
					o &&
						((o.value = t),
						o.parentNode.style.setProperty(
							"--value",
							t,
						),
						o.parentNode.style.setProperty(
							"--text-value",
							JSON.stringify("" + Math.round(t)),
						),
						this.updateCSSVar(e, t));
				},
				setCSSColor() {
					(this.CSSColor = l(n(this.color))),
						"rgba" == this.colorFormat
							? (this.CSSColor = s(this.CSSColor))
							: "hsla" == this.colorFormat &&
							  (this.CSSColor = n(this.color)),
						this.DOM.scope &&
							this.DOM.scope.setAttribute(
								"data-color-format",
								this.colorFormat,
							),
						this.settings.onInput(this.CSSColor);
				},
				setColor(e) {
					e &&
						((e = this.getHSLA(e)),
						(this.color = e),
						this.setCSSColor(),
						this.DOM.scope &&
							this.updateAllCSSVars(),
						this.DOM.value &&
							(this.DOM.value.value =
								this.CSSColor));
				},
				updateCSSVar(e, t) {
					this.DOM.scope.style.setProperty(
						"--" + e,
						t,
					);
				},
				updateAllCSSVars() {
					const e = this.NamedHSLA(this.color);
					Object.entries(e).forEach(([e, t]) => {
						this.updateRangeSlider(e, t);
					});
				},
				NamedHSLA: (e) => ({
					hue: e.h,
					saturation: e.s,
					lightness: e.l,
					alpha: e.a,
				}),
				build() {
					const e =
						this.templates.scope.call(this);
					(this.DOM.scope = t(e)),
						(this.DOM.value =
							this.DOM.scope.querySelector(
								'input[name="value"]',
							)),
						(this.DOM.swatches =
							this.DOM.scope.querySelector(
								".color-picker__swatches",
							));
				},
				init() {
					this.build(),
						this.setColor(this.color),
						this.bindEvents();
				},
			}),
				(e.CSStoHSLA = r),
				(e.HSLAtoCSS = n),
				(e.any_to_hex = l),
				(e.changeColorFormat = d),
				(e.default = T),
				(e.hex_rgba = s),
				(e.rgba_hsla = h),
				Object.defineProperty(e, "__esModule", {
					value: !0,
				});
		})(t);
	})(0, t.exports);
	var o = e(t.exports),
		a = (e) => e + "" == "[object Object]";
	function r(e, ...t) {
		if (!t.length) return e;
		const o = t.shift();
		if (a(e) && a(o))
			for (const t in o)
				a(o[t])
					? (e[t] ||
							Object.assign(e, {
								[t]: {},
							}),
					  r(e[t], o[t]))
					: Object.assign(e, {
							[t]: o[t],
					  });
		return r(e, ...t);
	}
	function n({ withToggler: e = !0 }) {
		const {
			visible: t,
			live: o,
			theme: a,
		} = this.settings;
		return `\n    <aside class='knobs' data-position='${
			a.position
		}' data-flow='${a.flow}'>\n      ${e ? `<label title='Demo Settings' ${2 == t ? "style='display:none'" : ""} for='knobsToggle'><div class='leversIcon'>\n  <div><b></b></div>\n  <div><b></b></div>\n  <div><b></b></div>\n</div>\n</label>` : ""}\n      <div class='knobs__bg'></div>\n      <form class='knobs__labels'>\n        <div class='knobs__groups'>\n          \x3c!-- Knobs goes here --\x3e\n        </div>\n        <section class='knobs__controls'>\n          ${o ? "" : '<input type="submit" value="Apply">'}\n          <input type="reset" value="↩ Reset" title="Reset to defaults">\n          <a class='poweredBy' href='https://github.com/yairEO/knobs' target='_blank'>Get <em>Knobs</em></a>\n        </section>\n      </form>\n    </aside>\n  `;
	}
	function i(e) {
		return e.render
			? `<div class='knobs__knob ${
					e.knobClass || ""
			  }'>${e.render}</div>`
			: e && e.type
			? `<div class='knobs__knob ${
					e.knobClass || ""
			  }'>\n        <input type='checkbox' css-util-before data-for-knob='${
					e.__name
			  }' ${
					!1 === e.isToggled ? "" : "checked"
			  } class='knobs__knob__toggle' title='Temporarily disable the knob' />\n        <label data-type='${
					e.type
			  }'>\n          ${
					e.label
						? `<div class='knobs__knob__label' ${
								e.cssVar && e.cssVar[1]
									? `data-units='${e.cssVar[1].replace(
											"-",
											"",
									  )}'`
									: ""
						  }>${e.label}</div>`
						: ""
			  }\n          <div class='knobs__knob__inputWrap'>\n            ${s.call(
					this,
					e,
			  )}\n          </div>\n        </label>\n        <button type='button' name='${
					e.__name
			  }' class='knobs__knob__reset' title='Reset'>↩</button>\n      </div>\n    `
			: void 0;
	}
	function s(e) {
		let {
			type: t,
			step: o,
			min: a,
			max: r,
			value: n,
			options: i,
		} = e;
		return "range" == t
			? `\n      <div class="range-slider" style="--step:${
					o || 1
			  }; --min:${a}; --max:${r}; --value:${n}; --text-value:'${n}'">\n        <input type="range" ${this.knobAttrs(
					e,
			  )}>\n        <output></output>\n        <div class='range-slider__progress'></div>\n      </div>`
			: "checkbox" == t
			? `\n      <div class="switch">\n        <input type='${t}' ${this.knobAttrs(
					e,
			  )} class="switch__input">\n        <div class='switch__gfx'></div>\n      </div>`
			: "select" == t && i?.length
			? `\n      <select ${this.knobAttrs(
					e,
			  )}>\n        ${i.map(
					(t) =>
						`<option ${
							(Array.isArray(t) ? t[0] : t) ==
							e.value
								? "selected"
								: ""
						} value='${
							Array.isArray(t) ? t[0] : t
						}'>${
							Array.isArray(t) ? t[1] : t
						}</option>`,
			  )}\n      </select>`
			: ("color" == t && (t = "text"),
			  `<div><input type='${t}' data-type='${
					e.type
			  }' ${this.knobAttrs(e)}></div>`);
	}
	var l = Object.freeze({
		__proto__: null,
		scope: function () {
			const { visible: e } = this.settings;
			return `\n    <input hidden type='checkbox' ${
				e ? "checked" : ""
			} id='knobsToggle' />\n    ${n.call(
				this,
				{},
			)}\n  `;
		},
		knobs: n,
		fieldset: function (e) {
			var t, o;
			if (a(e[0])) o = e;
			else {
				([t, ...o] = e),
					(t = (function ({
						label: e,
						checked: t,
						knobsCount: o,
					}) {
						var a =
							e.replace(/ /g, "-") +
							Math.random()
								.toString(36)
								.slice(-6);
						return `<input hidden id="${a}" type="checkbox" ${
							t ? "checked" : ""
						} class="toggleSection">\n          <label class="knobs__legend" ${
							e && "data-has-label"
						} for="${a}" title="Expand/Collapse">\n            <div>\n              ${
							e && `<span>${e}</span>`
						}\n              <span class='knobs__legend__knobsCount' css-util-before>${o}</span>\n            </div>\n          </label>`;
					})({
						...(t instanceof Array
							? {
									label: t[0],
									checked: !!t[1],
							  }
							: {
									label: t,
									checked: !0,
							  }),
						knobsCount: o.length,
					}));
			}
			return `<fieldset ${
				t ? "data-has-legend" : ""
			}>\n    ${
				t || ""
			}\n    <div class="fieldset__group">\n      <div class="fieldset__group__wrap">\n        ${o
				.map(i.bind(this))
				.join(
					"",
				)}\n      </div>\n    </div>\n  </fieldset>`;
		},
		knob: i,
	});
	const c =
			window.requestAnimationFrame ||
			((e) => window.setTimeout(e, 1e3 / 60)),
		h = (e, t) => e.classList.contains(t);
	function d() {
		let e,
			t = this;
		new ResizeObserver((o) => {
			clearTimeout(e),
				(e = setTimeout(() => {
					t.setIframeProps();
				}, 500));
		}).observe(this.settings.appendTo);
	}
	var p = Object.freeze({
		__proto__: null,
		bindEvents: function () {
			(this.eventsRefs = this.eventsRefs || {
				change(e) {
					e.target.name && this.onChange(e);
				},
				input(e) {
					try {
						let t;
						h(e.target, "toggleSection") &&
							e.target.checked &&
							((t =
								e.target.parentNode.querySelector(
									".fieldset__group",
								)),
							this.setIframeProps({
								heightOffset: 9999,
							}));
					} catch (e) {}
					e.target.hasAttribute("is-knob-input")
						? (this.onInput(e), this.onChange(e))
						: h(
								e.target,
								"knobs__knob__toggle",
						  ) &&
						  this.toggleKnob(
								e.target.dataset.forKnob,
								e.target.checked,
						  );
				},
				transitionstart(e) {
					h(e.target, "fieldset__group__wrap") &&
						e.target.parentNode.setAttribute(
							"transitioned",
							1,
						);
				},
				transitionend(e) {
					h(e.target, "fieldset__group__wrap") &&
						(e.target.parentNode.removeAttribute(
							"transitioned",
						),
						this.setIframeProps());
				},
				wheel(e) {
					const {
							value: t,
							max: o,
							step: a,
							type: r,
						} = e.target,
						n =
							Math.sign(e.deltaY) *
							(+a || 1) *
							-1;
					"range" == r && e.preventDefault(),
						t &&
							o &&
							((e.target.value = Math.min(
								Math.max(+t + n, 0),
								+o,
							)),
							this.onInput(e),
							this.onChange(e));
				},
				mainToggler(e) {
					this.toggle(e.target.checked);
				},
				reset: this.applyKnobs.bind(
					this,
					null,
					!0,
				),
				submit: this.onSubmit.bind(this),
				click: this.onClick.bind(this),
				focusin: this.onFocus.bind(this),
			}),
				[
					["scope", "click"],
					["form", "change"],
					["form", "input"],
					["form", "reset"],
					["form", "submit"],
					["form", "focusin"],
					["form", "transitionend"],
					["form", "transitionstart"],
					["scope", "wheel"],
					[
						"mainToggler",
						"change",
						this.eventsRefs.mainToggler.bind(
							this,
						),
					],
				].forEach(
					([e, t, o]) =>
						this.DOM[e] &&
						this.DOM[e].addEventListener(
							t,
							o || this.eventsRefs[t].bind(this),
							{
								passive: !1,
							},
						),
				),
				d.call(this);
		},
		onFocus: function (e) {},
		onInput: function (e) {
			const t = e.target,
				{ type: o, value: a, checked: r } = t,
				n = "checkbox" == o,
				{ label: i } = this.getKnobDataByName(
					e.target.name,
				);
			this.setParentNodeValueVars(t),
				this.setKnobDataByName(
					e.target.name,
					n
						? {
								checked: r,
						  }
						: {
								value: a,
						  },
				),
				null != a && i && this.setPersistedData();
		},
		onChange: function (e, t) {
			this.setKnobChangedFlag(
				this.getKnobElm(e.target.name),
			);
			const o = this.getKnobDataByName(
					e.target.name,
				),
				a =
					"input" == e.type &&
					o &&
					"range" != o.type,
				r = o && "checkbox" == o.type;
			if (!o) return;
			const n = t ? [] : this.getSimilarKnobs(o);
			n.length &&
				n.forEach((e) => {
					const t = this.getInputByName(e.__name);
					(t.value = o.value),
						this.onInput({
							target: t,
						});
				}),
				(r || this.settings.live) &&
					(("input" == e.type && a) ||
						(c(() => this.updateDOM(o)),
						"function" == typeof o.onChange &&
							o.onChange(e, o)));
		},
		onSubmit: function (e) {
			e.preventDefault();
			var t = e.target.querySelectorAll("input");
			return (
				(this.settings.live = !0),
				t.forEach((e) =>
					this.onChange({
						target: {
							value: e.value,
							name: e.name,
						},
					}),
				),
				(this.settings.live = !1),
				!1
			);
		},
		onClick: function (e) {
			const { target: t } = e,
				o =
					this.DOM.iframe.getBoundingClientRect();
			this.hideColorPickers(
				t.colorPicker
					? t.colorPicker.DOM.scope
					: null,
			),
				h(t, "knobs__knob__reset") &&
					this.resetKnobByName(t.name),
				"color" == t.dataset.type &&
					setTimeout(
						(a) =>
							this.toggleColorPicker(t, {
								x: e.clientX + o.x,
								y: e.clientY + o.y + 20,
							}),
						100,
					);
		},
	});
	const b = "@yaireo/knobs/knobs";
	var u = Object.freeze({
			__proto__: null,
			getPersistedData: function () {
				let e,
					t = this.settings.persist,
					o = "string" == typeof t ? "/" + t : "";
				if (
					1 == localStorage.getItem(b + o + "/v")
				)
					try {
						e = JSON.parse(localStorage[b + o]);
					} catch (e) {}
				return e;
			},
			setPersistedData: function () {
				let e = this.settings.persist,
					t = "string" == typeof e ? "/" + e : "";
				if (e) {
					let e = JSON.stringify(this.knobs);
					localStorage.setItem(b + t + "/v", 1),
						localStorage.setItem(b + t, e),
						dispatchEvent(new Event("storage"));
				}
			},
		}),
		g = {
			visible: 0,
			live: !0,
			theme: {
				flow: "horizontal",
				styles: "",
				RTL: !1,
				position: "top right",
				primaryColor: "#0366D6",
				"range-value-background": "#FFF",
				background: "rgba(0,0,0,1)",
				textColor: "white",
				border: "none",
			},
		};
	function v(e) {
		if (
			!window.CSS ||
			!CSS.supports("top", "var(--a)")
		)
			return this;
		const { knobs: t = [], ...o } = e || {};
		(this.settings = r(
			{
				...g,
				appendTo: document.body,
			},
			o,
		)),
			(this.knobs = t),
			(this.DOM = {}),
			(this.state = {}),
			this.build();
	}
	return (
		(v.prototype = {
			_types: [
				"range",
				"color",
				"checkbox",
				"text",
			],
			...p,
			...u,
			cloneKnobs: function (e, t) {
				return e.map((e) => {
					if (e && e.type) {
						if (
							((e.__name =
								e.__name ||
								(e.label?.replace("/ /g", "-") ||
									"") +
									Math.random()
										.toString(36)
										.slice(-6)),
							(e.defaultValue =
								e.defaultValue ??
								e.value ??
								this.getKnobValueFromCSSVar(e)),
							(e.defaultChecked =
								e.defaultChecked ?? !!e.checked),
							(e.isToggled = e.isToggled ?? !0),
							t)
						) {
							let o = t.find(
								(t) =>
									t.label && t.label == e.label,
							);
							if (o)
								return (
									e.defaultValue &&
										(o.defaultValue =
											e.defaultValue),
									e.options &&
										(o.options = e.options),
									o
								);
						}
						"range" == e.type
							? ((e.value = +e.value),
							  (e.defaultValue =
									+e.defaultValue))
							: "checkbox" == e.type
							? (e.checked =
									e.checked || e.defaultChecked)
							: (e.value =
									e.value || e.defaultValue);
					}
					return e.cssVar
						? {
								...e,
								cssVar: [...e.cssVar],
						  }
						: a(e)
						? {
								...e,
						  }
						: e;
				});
			},
			set knobs(e) {
				e &&
					e instanceof Array &&
					((this._knobs = this.cloneKnobs(
						e,
						this.getPersistedData(),
					)),
					this.DOM && this.render());
			},
			get knobs() {
				return this._knobs;
			},
			getCSSVariables({
				flow: e,
				styles: t,
				RTL: o,
				position: a,
				...r
			}) {
				var n,
					i = "";
				for (n in (this.settings.knobsToggle &&
					(r["knobs-toggle"] = 1),
				r))
					i += `--${n}:${r[n]}; `;
				return i;
			},
			getKnobValueFromCSSVar(e) {
				let t;
				if (
					!("value" in e) &&
					e.cssVar &&
					e.cssVar.length
				) {
					let o =
						e.cssVar[2] ||
						this.settings.CSSVarTarget;
					return (
						o.length && (o = o[0]),
						(t = getComputedStyle(o)
							.getPropertyValue(
								"--" + e.cssVar[0],
							)
							.trim()),
						"range" == e.type &&
							(t = parseInt(t)),
						"color" != e.type ||
							t ||
							(t = "transparent"),
						t
					);
				}
			},
			templates: l,
			hideColorPickers(e) {
				document
					.querySelectorAll(".color-picker")
					.forEach(
						(t) =>
							t != e && t.classList.add("hidden"),
					);
			},
			toggleColorPicker(e, t) {
				const { value: a } = e,
					r = this;
				let n = e.colorPicker;
				!n ||
				n.DOM.scope.classList.contains("hidden")
					? ((n =
							n ||
							new o({
								color: a,
								className: "hidden",
								swatches: [],
								swatchesLocalStorage: !0,
								onClickOutside(t) {
									n.DOM.scope.classList.contains(
										"hidden",
									) ||
										r.hideColorPickers(
											n.DOM.scope,
										);
									let o = "add";
									t.target == e && (o = "toggle"),
										"Escape" == t.key &&
											(o = "add"),
										n.DOM.scope.classList[o](
											"hidden",
										);
								},
								onInput(t) {
									(e.value = t),
										r.onInput({
											type: "input",
											target: e,
										}),
										r.onChange({
											type: "change",
											target: e,
										});
								},
							})),
					  document.body.contains(n.DOM.scope) ||
							((e.colorPicker = n),
							document.body.appendChild(
								n.DOM.scope,
							)),
					  setTimeout(() => {
							((e, t) => {
								const o =
										document.documentElement
											.clientWidth,
									a =
										document.documentElement
											.clientHeight,
									r = e.clientWidth,
									n = e.clientHeight,
									i = {
										left:
											t.x + r > o
												? o - r - 20
												: t.x - r / 2,
										top:
											t.y + n > a
												? a - n - 20
												: t.y,
									};
								(e.style.left = i.left),
									(e.style.top = i.top);
							})(n.DOM.scope, t),
								n.DOM.scope.classList.remove(
									"hidden",
								);
					  }, 100))
					: n.DOM.scope.classList.add("hidden");
			},
			knobAttrs(e) {
				var t = `name="${e.__name}" is-knob-input`,
					o = [
						"label",
						"type",
						"onchange",
						"options",
						"selected",
						"cssvar",
						"__name",
						"istoggled",
						"defaultchecked",
						"defaultvalue",
					];
				for (var a in e)
					("checked" != a || e[a]) &&
						(o.includes(a.toLowerCase()) ||
							(t += ` ${a}="${e[a]}"`));
				return t;
			},
			getKnobDataByName(e) {
				return this._knobs
					.filter(Boolean)
					.find((t) => t.__name == e);
			},
			setKnobDataByName(e, t) {
				if (e && t && a(t)) {
					const o = this.getKnobDataByName(e);
					for (let e in t)
						o[e] = +t[e] == t[e] ? +t[e] : t[e];
				}
			},
			getInputByName(e) {
				return this.DOM.scope.querySelector(
					`[name="${e}"`,
				);
			},
			getKnobElm(e) {
				const t = this.getInputByName(e);
				return t
					? t.closest(".knobs__knob")
					: void 0;
			},
			getSimilarKnobs(e) {
				return this.knobs.filter(
					(t) =>
						t?.cssVar?.[0] &&
						t?.cssVar?.[0] == e?.cssVar?.[0] &&
						t.__name != e.__name,
				);
			},
			setParentNodeValueVars(e) {
				e &&
					[
						["--value", e.value],
						[
							"--text-value",
							JSON.stringify(e.value),
						],
					].forEach(([t, o]) =>
						e?.parentNode.style.setProperty(t, o),
					);
			},
			updateDOM({
				cssVar: e,
				value: t,
				type: o,
				isToggled: a,
				__name: r,
			}) {
				if (e && e.length) {
					var [n, i, s] = e,
						l = s || this.settings.CSSVarTarget,
						c = this.getInputByName(r),
						h = "setProperty";
					if (
						((!a ||
							("checkbox" == o &&
								c &&
								!c.checked)) &&
							(h = "removeProperty"),
						i && "-" == i[0] && (i = ""),
						Object.prototype.toString
							.call(l)
							.includes("Element") && (l = [l]),
						l && l.length && void 0 !== t && n)
					)
						for (let e of l)
							e.style[h]("--" + n, t + (i || ""));
				}
			},
			applyKnobs(e, t) {
				(e || this._knobs).forEach((e) => {
					const o = (t) => e.type == t;
					var a,
						r = this.getInputByName(e.__name),
						n = {
							target: r,
						},
						i = t ? "defaultValue" : "value",
						s = t ? "defaultChecked" : "checked";
					this.setParentNodeValueVars(r),
						e &&
							e.type &&
							!1 !== e.isToggled &&
							(o("checkbox")
								? ((a = r.checked = !!e.checked),
								  (r.checked = e[s]))
								: (a = r.value = e[i]),
							this.setResetKnobTitle(e.__name, a),
							("" === r.value &&
								r.value !== e.value) ||
								(this.onInput(n),
								this.onChange(n, !0)),
							setTimeout(() => {
								o("checkbox") || (r.value = e[i]),
									o("color") &&
										(r.title = r.value);
							}),
							this.setKnobChangedFlag(
								this.getKnobElm(e.__name),
								e.value != e.defaultValue,
							));
				});
			},
			setResetKnobTitle(e, t) {
				try {
					(t = "Reset to " + t),
						(this.getKnobElm(e).querySelector(
							".knobs__knob__reset",
						).title = t);
				} catch (e) {}
			},
			resetKnobByName(e) {
				this.setKnobChangedFlag(
					this.getKnobElm(e),
					!1,
				),
					this.applyKnobs(
						[this.getKnobDataByName(e)],
						!0,
					);
			},
			calculateGroupsHeights() {
				this.DOM.form
					.querySelectorAll(
						".fieldset__group__wrap",
					)
					.forEach((e) => {
						e.style.setProperty(
							"--height",
							e.clientHeight,
						);
					});
			},
			setIframeProps(e) {
				var t =
						(0 == this.state.visible
							? "remove"
							: "set") + "Property",
					o = this.DOM.iframe.style,
					{ heightOffset: a = 0 } = e || {};
				"setProperty" == t &&
					(o.setProperty(
						"--knobsWidth",
						"2000px",
					),
					o.setProperty(
						"--knobsHeight",
						"10000px",
					));
				var { clientWidth: r, clientHeight: n } =
					this.DOM.scope;
				o[t]("--knobsWidth", r + "px"),
					o[t]("--knobsHeight", +n + +a + "px");
			},
			toggle(e) {
				this.DOM.mainToggler &&
					(void 0 === e &&
						(e = !this.DOM.mainToggler.checked),
					(this.state.visible = e),
					(this.DOM.mainToggler.checked = e),
					this.setIframeProps());
			},
			toggleKnob(e, t) {
				let o = this.getKnobDataByName(e),
					a =
						"checkbox" == o.type
							? "checked"
							: "value",
					r = t
						? "checked" == a
							? o.checked
							: o.value
						: "checked" == a
						? o.defaultChecked
						: o.value;
				(o.isToggled = t),
					(o[a] = r),
					this.updateDOM(o),
					"function" == typeof o.onChange &&
						o.onChange(null, o),
					this.setPersistedData();
			},
			setKnobChangedFlag(e, t) {
				e &&
					e[
						(0 == t ? "remove" : "set") +
							"Attribute"
					]("data-changed", !0);
			},
			build() {
				if (this.settings.standalone)
					this.DOM.scope =
						((e = this.templates.knobs.call(
							this,
							{
								withToggler: !1,
							},
						)),
						new DOMParser().parseFromString(
							e.trim(),
							"text/html",
						).body.firstElementChild);
				else {
					const e = this.createIframe();
					(this.DOM.scope =
						e.body.querySelector(".knobs")),
						(this.DOM.groups =
							e.body.querySelector(
								".knobs__groups",
							)),
						(this.DOM.mainToggler =
							e.getElementById("knobsToggle"));
				}
				var e;
				(this.DOM.form =
					this.DOM.scope.querySelector("form")),
					this.render(),
					setTimeout(this.bindEvents.bind(this));
			},
			createIframe() {
				var e,
					t,
					o = this.settings.theme;
				return (
					(this.DOM.iframe =
						document.createElement("iframe")),
					this.DOM.iframe.setAttribute(
						"class",
						"knobsIframe",
					),
					(this.DOM.iframe.style.cssText = `\n        border: none;\n        position: fixed;\n        z-index: 999999;\n        ${(
						o.position + " "
					)
						.split(" ")
						.join(
							":0;",
						)}\n        width: var(--knobsWidth, 56px);\n        height: clamp(56px, var(--knobsHeight, 56px), 100%);\n    `),
					this.settings.appendTo.appendChild(
						this.DOM.iframe,
					),
					(e =
						this.DOM.iframe.contentWindow
							.document).open(),
					e.write(
						this.templates.scope.call(this),
					),
					(t = `.knobs{ ${this.getCSSVariables(
						o,
					)} }`),
					(t +=
						"\ufefflabel,button,input{cursor:pointer;font:12px Arial, sans-serif}body,form{padding:0;margin:0}[css-util-before]::before{content:'';opacity:.2;position:absolute;top:0;right:0;bottom:0;left:0}#knobsToggle+.knobs>label{--size: calc(var(--toggleSize)/2);--offset: calc(var(--toggleOffset));position:absolute;width:var(--size);height:var(--size);top:var(--offset);right:var(--offset);padding:calc((var(--toggleSize) - var(--size))/2);font-size:20px;line-height:1;z-index:1;color:var(--textColor)}#knobsToggle:not(:checked)+.knobs>label:hover+.knobs__bg{opacity:1;transform:scale(1.15)}#knobsToggle:checked+.knobs{display:inline-block}#knobsToggle:checked+.knobs>label{padding:0}#knobsToggle:checked+.knobs .knobs__bg{--corner-radius: 8px;--offset: calc(var(--corner-radius) * -1);top:var(--offset);right:var(--offset);bottom:var(--offset);left:var(--offset);border-radius:var(--corner-radius);margin:0;width:calc(100% + var(--corner-radius));height:calc(100% + var(--corner-radius));opacity:1;transition:0.3s cubic-bezier(0.45, 0, 0.2, 1),margin 0.2s,border-radius 0.2s}#knobsToggle:checked+.knobs .knobs__labels{transform:none;transition:calc(var(--in-duration) * 1s) var(--in-easing)}#knobsToggle:checked+.knobs .knobs__labels fieldset,#knobsToggle:checked+.knobs .knobs__labels .knobs__controls{transform:none;opacity:1;transition:calc(var(--in-duration) * 1s) calc(var(--in-duration) * .5s) ease-out}html,body{overflow:hidden}.knobs{--range-track-color: var(--primaryColor);--knobs-gap: 3px;--side-pad: 12px;--toggleSize: 40px;--toggleOffset: 6px;--in-easing: cubic-bezier(.75,0,.35,1);--in-duration: .3;--color-size: 20px;--line-height: Max(0px, var(--color-size));--knobs-group-transition: .33s cubic-bezier(.45, 0, .2, 1);--LTR-Bool: 1;font:12px/1 'Fira Sans Condensed', sans-serif;color:var(--textColor);position:relative;overflow:hidden}.knobs[data-flow='compact']{--color-size: 16px}.knobs[data-flow='compact'] label[data-type='select'],.knobs[data-flow='compact'] label[data-type='range']{flex-flow:column}.knobs[data-flow='compact'] label[data-type='select'] .range-slider,.knobs[data-flow='compact'] label[data-type='range'] .range-slider{--thumb-size: 12px;--track-height: calc(var(--thumb-size)/2)}.knobs[data-flow='compact'] label[data-type='select'] ~ .knobs__knob__reset,.knobs[data-flow='compact'] label[data-type='range'] ~ .knobs__knob__reset{align-self:flex-start;margin-top:.5ch}.knobs[data-flow='compact'] label[data-type='select'] .knobs__label,.knobs[data-flow='compact'] label[data-type='range'] .knobs__label{margin:0;padding:0}.knobs label{user-select:none;cursor:pointer}.knobs__bg{pointer-events:none;position:absolute;top:0;right:0;z-index:-1;margin:var(--toggleOffset);width:var(--toggleSize);height:var(--toggleSize);border-radius:50%;background:var(--background);opacity:.8;backdrop-filter:blur(8px);transition:120ms}.knobs__labels{display:flex;flex-flow:column;max-height:100%;border:var(--border);transform:translateX(calc(100.1% * var(--LTR-Bool)))}.knobs__labels fieldset{display:table;border:0;padding:0;margin:0;opacity:0;transform:translateX(calc(22% * var(--LTR-Bool)))}.knobs__labels fieldset:only-of-type>label{pointer-events:none}.knobs__labels fieldset:first-child:not([data-has-legend]){overflow:visible}.knobs__labels .fieldset__group[transition-done]{overflow:visible}.knobs__labels .fieldset__group__wrap{padding:var(--side-pad);transition:var(--knobs-group-transition)}.knobs__labels hr{border:0;border-top:1px solid var(--textColor);opacity:.25}.knobs__labels hr:last-of-type{margin-bottom:0}.knobs__labels label:not(.knobs__legend){order:5;flex:1;display:flex;position:relative;z-index:1}.knobs__labels .range-slider,.knobs__labels input[type=text]{min-width:200px}.knobs__labels label:not(.knobs__legend)>:last-child{flex:1;text-align:right;align-self:center}.knobs__groups{flex:1;margin-top:calc(var(--side-pad) * 2.5);overflow-y:scroll;scrollbar-width:none}.knobs__groups::-webkit-scrollbar{display:none}.knobs__groups>fieldset:first-child .knobs__knob:first-child .range-slider{--value-offset-y: 14px}.knobs__legend{display:flex;align-items:center;font-weight:700;opacity:.66;line-height:1.6;cursor:pointer;transition:0.2s cubic-bezier(0.45, 0, 0.2, 1)}.knobs__legend[data-has-label]{gap:2ch}.knobs__legend[data-has-label]:hover{gap:4ch}.knobs__legend::before,.knobs__legend::after{content:'';height:1px;background:var(--textColor);flex:1;opacity:.5;transition:inherit}.knobs__legend:hover{opacity:.85}.knobs__legend>div{display:flex;align-items:center;gap:2ch}.knobs__legend__knobsCount{display:inline-block;border-radius:50%;width:1.5em;height:1.5em;line-height:1.6;font-size:.9em;text-align:center;overflow:hidden;position:relative;transition:var(--knobs-group-transition)}.knobs__legend__knobsCount::before{background:var(--textColor);opacity:.3}.knobs__legend__knobsCount:only-child{margin:0 2ch}.knobs .toggleSection:checked ~ .knobs__legend .knobs__legend__knobsCount{transform:scale(0);margin:0;width:0}.knobs .toggleSection:checked ~ .fieldset__group[transitioned]{overflow:hidden}.knobs .toggleSection:not(:checked) ~ .knobs__legend{margin-bottom:1em}.knobs .toggleSection:not(:checked) ~ .fieldset__group{overflow:hidden}.knobs .toggleSection:not(:checked) ~ .fieldset__group .fieldset__group__wrap{opacity:0;margin-top:calc(var(--height) * -1px);text-shadow:0px 3px 2px}.knobs[data-flow='compact'] .knobs__knob__toggle{align-self:flex-start;margin-top:calc(var(--knobs-gap, 6px) + 2px)}.knobs__knob{display:flex;justify-content:flex-end;position:relative;line-height:var(--line-height);min-height:24px}.knobs__knob:hover .knobs__knob__label{opacity:1}.knobs__knob[data-changed] .knobs__knob__reset{opacity:.75;pointer-events:auto}.knobs__knob[data-changed] .knobs__knob__reset:hover{opacity:1;background:var(--textColor);color:var(--background);transition:0s}.knobs__knob__toggle{display:var(--knobs-toggle, none);order:1;align-self:center;margin:0 5px 0 0;appearance:none;width:12px;height:12px;outline:none;border-radius:50%;position:relative;text-align:center;line-height:10px}.knobs__knob__toggle::before{border:1px solid var(--textColor);opacity:.4;border-radius:3px}.knobs__knob__toggle::after{content:'';height:100%;z-index:5;width:999px;position:absolute;left:0;pointer-events:none}.knobs__knob__toggle:hover::before{opacity:1}.knobs__knob__toggle:checked:hover ~ *{text-decoration:line-through;transition:.15s}.knobs__knob__toggle:checked::after{content:'✔';color:var(--textColor);font-size:12px;text-shadow:-1px -2px var(--background),3px -2px var(--background);position:relative;z-index:1}.knobs__knob__toggle:not(:checked) ~ *{pointer-events:none !important;filter:grayscale(50%);opacity:.4;transition:.2s}.knobs__knob__toggle:not(:checked) ~ * ::-webkit-slider-thumb{pointer-events:none !important}.knobs__knob__toggle:not(:checked) ~ * ::-moz-slider-thumb{pointer-events:none !important}.knobs__knob__reset{order:0;pointer-events:none;margin-right:.5em;padding:0;align-self:center;color:inherit;background:none;border:0;cursor:pointer;opacity:.33;outline:none;border-radius:50%;width:2ch;height:2ch;user-select:none;transition:.15s ease-out}.knobs__knob__label{margin-right:2ch;white-space:nowrap;display:flex;align-items:center;opacity:.8;transition:80ms}.knobs__knob__label::after{content:attr(data-units);opacity:.5;margin-left:1ch}.leversIcon{width:56px;transform:scale(0.4);transform-origin:0 0}.leversIcon>div{display:flex;align-items:center;transition:transform .2s ease}.leversIcon>div:nth-child(1)::before{flex:.33;transition-delay:.3s}.leversIcon>div:nth-child(2){margin:2px 0}.leversIcon>div:nth-child(2)::after{flex:.33}.leversIcon>div:nth-child(3)::before{flex:.8;transition-delay:.1s}.leversIcon>div>b{display:inline-block;width:7.5px;height:7.5px;border-radius:50%;border:4px solid currentColor;margin:0 5px}.leversIcon>div::before,.leversIcon>div::after{content:'';height:5px;background:currentColor;border-radius:5px;flex:1;transition:flex .1s ease}.leversIcon>div::after{flex:auto;opacity:.33}@keyframes leversIcon{30%{flex:.2}80%{flex:5}}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(1)::before{animation:1s leversIcon ease infinite}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(2){margin:1px 0}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(2)::after{animation:1s .1s leversIcon ease reverse infinite}#knobsToggle:not(:checked)+.knobs>label:hover .leversIcon>div:nth-child(3)::before{animation:1.2s .15s leversIcon ease alternate infinite}#knobsToggle:checked+.knobs>label{--size: 18px;--offset: calc(var(--toggleOffset) + var(--size)/3)}#knobsToggle:checked+.knobs>label .leversIcon{width:65px;color:var(--textColor);transition:color .2s;transform:scale(0.3) translate(0, 6px);opacity:.7}#knobsToggle:checked+.knobs>label .leversIcon:hover{opacity:1}#knobsToggle:checked+.knobs>label .leversIcon b{transform:scale(0);margin:0;width:0}#knobsToggle:checked+.knobs>label .leversIcon>div::after{flex:0}#knobsToggle:checked+.knobs>label .leversIcon>div::before{flex:3;height:8px}#knobsToggle:checked+.knobs>label .leversIcon>div:nth-child(1){transform:rotate(45deg);transform-origin:20% 50%}#knobsToggle:checked+.knobs>label .leversIcon>div:nth-child(2){opacity:0}#knobsToggle:checked+.knobs>label .leversIcon>div:nth-child(3){transform:rotate(-45deg);transform-origin:0 0}#knobsToggle:checked+.knobs[data-position~='top'] .knobs__bg{bottom:auto}#knobsToggle:checked+.knobs[data-position~='right'] .knobs__bg{left:auto}#knobsToggle:checked+.knobs[data-position~='bottom']>label{top:auto;bottom:var(--offset)}#knobsToggle:checked+.knobs[data-position~='bottom'] .knobs__bg{top:auto}#knobsToggle:checked+.knobs[data-position~='bottom'][data-position~='right']{--control-right-pad: var(--toggleSize)}#knobsToggle:checked+.knobs[data-position~='left']>label{right:auto;left:var(--offset)}#knobsToggle:checked+.knobs[data-position~='left'] .knobs__bg{right:auto}#knobsToggle:checked+.knobs[data-position~='left'][data-position~='bottom']{--control-left-pad: var(--toggleSize)}.knobs[data-position~='left']{--LTR-Bool: -1}.knobs label[data-type='select'] .knobs__knob__inputWrap::before{--hide: Calc(var(--value)  -  var(--value));content:'N/A';font-style:italic;opacity:var(--hide);filter:opacity(0.5);position:absolute;right:2em;pointer-events:none}.knobs label[data-type='select']::after{content:'❯';pointer-events:none;align-self:center;transform:translate(-100%, var(--offset-y, -1px)) rotate(90deg) scaleY(0.8);transition:.1s}.knobs label[data-type='select']:hover{--offset-y: 1px}.knobs label[data-type='select'] select{font:inherit;background:none;color:var(--textColor);padding:3px 0;cursor:pointer;border:none;outline:none;text-align-last:right;appearance:none;padding:0 1.1em 0 0}.knobs label[data-type='select'] option{background:var(--background)}.knobs .range-slider{--fill-color: var(--range-track-color);--primaryColor: var(--range-value-background);--value-active-color: var(--range-track-color);--value-background: transparent;--value-background-hover: white;--value-offset-y: 9px;--progress-background: #444;--thumb-size: 14px;--track-height: calc(var(--thumb-size)/3);--ticks-thickness: 1px;--ticks-height: 0px;--show-min-max: none;--thumb-color: var(--range-track-color);--thumb-shadow: 0 0 3px rgba(0,0,0,.2), 0 0 0 calc(var(--thumb-size)/6) inset white;--thumb-shadow-active: 0 0 3px rgba(0,0,0,.2), 0 0 0 calc(var(--thumb-size)/4) inset white;color:transparent}.knobs .range-slider>input:hover+output{box-shadow:0 0 0 3px var(--value-background),0 0 6px 4px var(--background)}.range-slider{--primary-color: #0366D6;--value-offset-y: var(--ticks-gap);--value-active-color: white;--value-background: transparent;--value-background-hover: var(--primary-color);--value-font: 700 12px/1 Arial;--fill-color: var(--primary-color);--progress-background: #EEE;--progress-radius: 20px;--track-height: calc(var(--thumb-size)/2);--min-max-font: 12px Arial;--min-max-opacity: .5;--min-max-x-offset: 10%;--thumb-size: 22px;--thumb-color: white;--thumb-shadow: 0 0 3px rgba(0,0,0,.4),\r\n                  0 0 1px rgba(0,0,0,.5) inset,\r\n                  0 0 0 99px var(--thumb-color) inset;--thumb-shadow-active: 0 0 0 calc(var(--thumb-size)/4) inset var(--thumb-color),\r\n                         0 0 0 99px var(--primary-color) inset,\r\n                         0 0 3px rgba(0,0,0,.4);--thumb-shadow-hover: var(--thumb-shadow);--ticks-thickness: 1px;--ticks-height: 5px;--ticks-gap: var(--ticks-height, 0);--ticks-color: silver;--step: 1;--ticks-count: (var(--max) - var(--min)) / var(--step);--maxTicksAllowed: 30;--too-many-ticks: Min(1, Max(var(--ticks-count) - var(--maxTicksAllowed), 0));--x-step: Max( var(--step), var(--too-many-ticks) * (var(--max) - var(--min)) );--tickIntervalPerc_1: Calc( (var(--max) - var(--min)) / var(--x-step) );--tickIntervalPerc: calc(  (100% - var(--thumb-size))/var(--tickIntervalPerc_1) * var(--tickEvery, 1)  );--value-a: Clamp(var(--min), var(--value, 0), var(--max));--value-b: var(--value, 0);--text-value-a: var(--text-value, \"\");--completed-a: calc((var(--value-a) - var(--min) ) / (var(--max) - var(--min)) * 100);--completed-b: calc((var(--value-b) - var(--min) ) / (var(--max) - var(--min)) * 100);--ca: Min(var(--completed-a), var(--completed-b));--cb: Max(var(--completed-a), var(--completed-b));--thumbs-too-close: Clamp(\r\n    -1,\r\n    1000 * (Min(1, Max(var(--cb) - var(--ca) - 5, -1)) + 0.001),\r\n    1\r\n  );--thumb-close-to-min: Min(1, Max(var(--ca) - 5, 0));--thumb-close-to-max: Min(1, Max(95 - var(--cb), 0));box-sizing:content-box;display:inline-block;height:Max(var(--track-height), var(--thumb-size));background:linear-gradient(to right, var(--ticks-color) var(--ticks-thickness), transparent 1px) repeat-x;background-size:var(--tickIntervalPerc) var(--ticks-height);background-position-x:calc(var(--thumb-size)/2 - var(--ticks-thickness)/2);background-position-y:var(--flip-y, bottom);padding-bottom:var(--flip-y, var(--ticks-gap));padding-top:calc(var(--flip-y) * var(--ticks-gap));position:relative;z-index:1}.range-slider[data-ticks-position='top']{--flip-y: 1}.range-slider::before,.range-slider::after{--offset: calc(var(--thumb-size)/2);content:counter(x);display:var(--show-min-max, block);font:var(--min-max-font);position:absolute;bottom:var(--flip-y, -2.5ch);top:calc(-2.5ch * var(--flip-y));opacity:Clamp(0, var(--at-edge), var(--min-max-opacity));transform:translateX(calc( var(--min-max-x-offset) * var(--before, -1) * -1)) scale(var(--at-edge));pointer-events:none}.range-slider::before{--before: 1;--at-edge: var(--thumb-close-to-min);counter-reset:x var(--min);left:var(--offset)}.range-slider::after{--at-edge: var(--thumb-close-to-max);counter-reset:x var(--max);right:var(--offset)}.range-slider__values{position:relative;top:50%;line-height:0;text-align:justify;width:100%;pointer-events:none;margin:0 auto;z-index:5}.range-slider__values::after{content:'';width:100%;display:inline-block;height:0;background:red}.range-slider__progress{--start-end: calc(var(--thumb-size)/2);--clip-end: calc(100% - (var(--cb) ) * 1%);--clip-start: calc(var(--ca) * 1%);--clip: inset(-20px var(--clip-end) -20px var(--clip-start));position:absolute;left:var(--start-end);right:var(--start-end);top:calc(var(--ticks-gap) * var(--flip-y,0) + var(--thumb-size)/2 - var(--track-height)/2);height:calc(var(--track-height));background:var(--progress-background, #EEE);pointer-events:none;z-index:-1;border-radius:var(--progress-radius)}.range-slider__progress::before{content:'';position:absolute;left:0;right:0;clip-path:var(--clip);top:0;bottom:0;background:var(--fill-color, black);box-shadow:var(--progress-flll-shadow);z-index:1;border-radius:inherit}.range-slider__progress::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:var(--progress-shadow);pointer-events:none;border-radius:inherit}.range-slider>input{-webkit-appearance:none;width:100%;height:var(--thumb-size);margin:0;position:absolute;left:0;top:calc(50% - Max(var(--track-height), var(--thumb-size))/2 + calc(var(--ticks-gap)/2 * var(--flip-y, -1)));cursor:-webkit-grab;cursor:grab;outline:none;background:none}.range-slider>input:not(:only-of-type){pointer-events:none}.range-slider>input::-webkit-slider-thumb{appearance:none;border:none;height:var(--thumb-size);width:var(--thumb-size);transform:var(--thumb-transform);border-radius:var(--thumb-radius, 50%);background:var(--thumb-color);box-shadow:var(--thumb-shadow);pointer-events:auto;transition:.1s}.range-slider>input::-moz-range-thumb{appearance:none;border:none;height:var(--thumb-size);width:var(--thumb-size);transform:var(--thumb-transform);border-radius:var(--thumb-radius, 50%);background:var(--thumb-color);box-shadow:var(--thumb-shadow);pointer-events:auto;transition:.1s}.range-slider>input::-ms-thumb{appearance:none;border:none;height:var(--thumb-size);width:var(--thumb-size);transform:var(--thumb-transform);border-radius:var(--thumb-radius, 50%);background:var(--thumb-color);box-shadow:var(--thumb-shadow);pointer-events:auto;transition:.1s}.range-slider>input:hover{--thumb-shadow: var(--thumb-shadow-hover)}.range-slider>input:hover+output{--value-background: var(--value-background-hover);--y-offset: -5px;color:var(--value-active-color);box-shadow:0 0 0 3px var(--value-background)}.range-slider>input:active{--thumb-shadow: var(--thumb-shadow-active);cursor:grabbing;z-index:2}.range-slider>input:active+output{transition:0s}.range-slider>input:nth-of-type(1){--is-left-most: Clamp(0, (var(--value-a) - var(--value-b)) * 99999 ,1)}.range-slider>input:nth-of-type(1)+output{--value: var(--value-a);--x-offset: calc(var(--completed-a) * -1%)}.range-slider>input:nth-of-type(1)+output:not(:only-of-type){--flip: calc(var(--thumbs-too-close) * -1)}.range-slider>input:nth-of-type(1)+output::after{content:var(--prefix, \"\") var(--text-value-a) var(--suffix, \"\")}.range-slider>input:nth-of-type(2){--is-left-most: Clamp(0, (var(--value-b) - var(--value-a)) * 99999 ,1)}.range-slider>input:nth-of-type(2)+output{--value: var(--value-b)}.range-slider>input:only-of-type ~ .range-slider__progress{--clip-start: 0}.range-slider>input+output{--flip: -1;--x-offset: calc(var(--completed-b) * -1%);--pos: calc(((var(--value) - var(--min))/(var(--max) - var(--min))) * 100%);pointer-events:none;position:absolute;z-index:5;background:var(--value-background);border-radius:10px;padding:2px 4px;left:var(--pos);transform:translate(var(--x-offset), calc(150% * var(--flip) - (var(--y-offset, 0px) + var(--value-offset-y)) * var(--flip)));transition:all .12s ease-out, left 0s}.range-slider>input+output::after{content:var(--prefix, \"\") var(--text-value-b) var(--suffix, \"\");font:var(--value-font)}.knobs[data-flow='compact'] .switch{--size: 10px;--thumb-scale: 1.3}.knobs[data-flow='compact'] .switch__gfx{padding:0}.knobs .switch{--color-bg: #444;--color-bg-on: #444;--thumb-color-off: #d75d4a;--thumb-color-on: #4ec964;--thumb-scale: 1.1;--width-multiplier: 2.5;--thumb-animation-pad: 15%;--size: 1em}.knobs .switch .switch__gfx{background:none;border:1px solid var(--bg, var(--color-bg))}.knobs .switch input:focus+div{outline:none}.switch{--color-bg: #E1E1E1;--color-bg-on: #16B5FF;--thumb-color-on: white;--thumb-color-off: var(--thumb-color-on);--thumb-scale: 1;--size: 16px;--duration: .18s;--width-multiplier: 2.5;--thumb-animation-pad: 15%;user-select:none;display:inline-flex;align-items:center}@keyframes switchMoveThumb{50%{padding:0 var(--thumb-animation-pad)}}@keyframes switchMoveThumb1{50%{padding:0 var(--thumb-animation-pad)}}.switch--textRight .switch__label{order:10;padding:0 0 0 .4em}.switch>div{cursor:pointer}.switch__label{order:0;padding-right:.4em;color:var(--label-color)}.switch__gfx{--thumb-left: 0%;--transform: translateX(calc(var(--thumb-left) * -1)) scale(var(--thumb-scale));order:5;padding:3px;position:relative;background:var(--bg, var(--color-bg));border-radius:50px;width:calc(var(--size) * var(--width-multiplier));transition:var(--duration);background-size:4px 4px}.switch__gfx::before{content:'';display:block;position:relative;left:var(--thumb-left);background:var(--thumb-color, var(--thumb-color-off));border-radius:var(--size);width:var(--size);height:var(--size);transform:var(--transform);transition:var(--duration);animation:switchMoveThumb var(--duration) ease 1}.switch input{position:absolute;opacity:0}.switch input[disabled]+div{background-image:linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%)}.switch input:disabled ~ div{cursor:not-allowed}.switch input:indeterminate+div{--thumb-left: 50%}.switch input:checked+div{--bg: var(--color-bg-on);--thumb-left: 100%;--thumb-color: var(--thumb-color-on)}.switch input:checked+div::before{animation-name:switchMoveThumb1}.switch input:focus+div{outline:1px dotted silver}.switch input:focus:not(:focus-visible)+div{outline:none}.knobs__controls{display:flex;align-items:center;opacity:0;flex-direction:row-reverse;margin:var(--side-pad) var(--control-right-pad, var(--side-pad)) var(--side-pad) var(--control-left-pad, var(--side-pad));position:relative;z-index:1}.knobs__controls>input{color:var(--textColor);border:0;background:none;margin-left:1em;line-height:1}.poweredBy{margin-right:auto;text-decoration:none;color:inherit;padding:3px;font-size:10px;opacity:.5;transition:.15s}.poweredBy:hover{color:var(--primaryColor);opacity:1}label[data-type=\"color\"]>.knobs__knob__inputWrap>div{display:inline-block;border-radius:5px;overflow:hidden;width:calc(var(--color-size) * 4);height:calc(var(--color-size) - 2px);background:var(--background) repeating-conic-gradient(rgba(255,255,255,0.266667) 0% 25%, transparent 0% 50%) 0/7px 7px}label[data-type=\"color\"]:hover>.knobs__knob__inputWrap>div{animation:colorHover .3s ease-out}label[data-type=\"color\"] input{width:100%;height:100%;border:0;background:var(--value);color:transparent;outline:none;caret-color:transparent;text-transform:uppercase;font-weight:600}label[data-type=\"color\"] input::selection{color:transparent}@keyframes colorHover{30%{width:calc(var(--color-size) * 4.5)}60%{width:calc(var(--color-size) * 3.5)}}\n" +
						o.styles),
					e.head.insertAdjacentHTML(
						"beforeend",
						`<style>${t}</style>`,
					),
					e.close(),
					e
				);
			},
			render() {
				var e = this._knobs
					.reduce(
						(e, t) => (
							!a(t) &&
								e[e.length - 1].length &&
								e.push([]),
							e[e.length - 1].push(t),
							e
						),
						[[]],
					)
					.map(this.templates.fieldset.bind(this))
					.join("");
				(this.DOM.groups.innerHTML = e),
					this.calculateGroupsHeights(),
					this.DOM.mainToggler &&
						this.toggle(
							this.DOM.mainToggler.checked,
						),
					this.applyKnobs();
				[...document.styleSheets].some(
					(e) => "@yaireo/knobs" == e.title,
				) ||
					document.head.insertAdjacentHTML(
						"beforeend",
						"<style title='@yaireo/knobs'>\n      .color-picker .range{--tickEvery: 400;--primaryColor: #000;--progress-color: transparent;--progress-shadow: unset;--value-active-color: white;--value-background: white;--value-font: 700 12px/1 Arial;--fill-color: var(--primaryColor);--thumb-size: 21px;--track-height: calc(var(--thumb-size)/1.5);--thumb-shadow: 0 0 3px rgba(0,0,0,.2);--step: 1;--completed: calc((var(--value) - var(--min) ) / (var(--max) - var(--min)) * 100);--show-min-max: none;--LTR: 1;display:inline-block;height:Max(var(--track-height), var(--thumb-size));background:none;position:relative;z-index:1;padding-bottom:0;padding-top:0;margin:0 0 calc((var(--thumb-size) - var(--track-height)) * -1)}.color-picker .range__progress{position:absolute;left:0;top:50%;transform:translateY(-50%) translateZ(0);width:100%;height:calc(var(--track-height));pointer-events:none;z-index:-1;box-shadow:var(--progress-shadow);border-radius:20px;background:var(--fill-color, white)}.color-picker .range__progress::after{content:unset}.color-picker .range>input{--thumb-color: transparent;--inner-shadow: 0 0 0 calc(var(--thumb-size)/8) inset white;-webkit-appearance:none;width:100%;height:var(--thumb-size);margin:0;cursor:-webkit-grab;cursor:grab;outline:none;background:none}.color-picker .range>input::-webkit-slider-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.color-picker .range>input::-moz-range-thumb{appearance:none;height:var(--thumb-size);width:var(--thumb-size);border-radius:50%;background:var(--thumb-color, white);border:1px solid silver;box-shadow:var(--inner-shadow, 0 0),var(--thumb-shadow)}.color-picker .range>input:active{cursor:grabbing}.color-picker .range>input:active+output{transition:0s}.color-picker .range>input:hover+output{--value-background: var(--primaryColor);opacity:1;color:var(--value-active-color);transform:translate(var(--x-offset), 0);box-shadow:0 0 0 3px var(--value-background)}.color-picker .range>output{--x-offset: calc(var(--completed) * -1% * var(--LTR));--pos: calc(((var(--value) - var(--min))/(var(--max) - var(--min))) * 100%);opacity:0;pointer-events:none;position:absolute;z-index:5;background:var(--value-background);border-radius:10px;padding:0 4px;top:-3.5ch;left:var(--pos);transform:translate(var(--x-offset), 6px);transition:all .12s ease-out, left 0s, top 0s}.color-picker .range>output::before{--size: 5px;content:'';top:calc(100% + 2px);left:50%;border:solid transparent;height:0;width:0;position:absolute;pointer-events:none;border-top-color:var(--value-background);border-width:var(--size);margin-left:calc(var(--size) * -1);transition:inherit}.color-picker .range>output::after{content:var(--text-value);font:var(--value-font)}.color-picker{--hue: 150;--saturation: 100;--lightness: 50;--alpha: 100;--s: calc(var(--saturation) * 1%);--l: calc(var(--lightness) * 1%);--a: calc(var(--alpha) * 1%);--color: hsla(var(--hue), var(--s), var(--l), var(--a));--checkboard-color: #DDD;--checkboard-base-gradient: repeating-conic-gradient(var(--checkboard-color) 0% 25%, transparent 0% 50%);--width: 320;--width-units: 1px;display:flex;flex-flow:column;gap:.5em;width:calc(var(--width) * var(--width-units));position:relative;box-sizing:border-box;transition:opacity .15s, transform .15s;transition-timing-function:ease-out}.color-picker__hue.range{grid-area:hue;--fill-color: linear-gradient(to right, red 0%, #ff0 16.6%, lime 33.3%, cyan 50%, blue 66.6%, #f0f 83.3%, red 100%)}.color-picker__saturation.range{grid-area:saturation;--fill-color: linear-gradient(to right, white, hsl(var(--hue),var(--s), 50%))}.color-picker__lightness.range{grid-area:lightness;--c: hsl(var(--hue), var(--s), 50%);--fill-color: linear-gradient(to right, black, var(--c), white)}.color-picker__alpha.range{grid-area:alpha;--checkboard-size: calc(var(--track-height)/2);--fill-color: linear-gradient(to right, transparent, hsl(var(--hue), var(--s), var(--l))),\r\n                  var(--checkboard-base-gradient)\r\n                  0 / var(--checkboard-size) var(--checkboard-size)}.color-picker button{cursor:pointer;border:none;background:none;outline:none}.cp-checkboard::before{content:'';position:absolute;z-index:-1;top:0;bottom:0;left:0;right:0;border-radius:inherit;background:repeating-conic-gradient(var(--checkboard-color) 0% 25%, transparent 0% 50%) 0/12px 12px}.color-picker>output{grid-area:color;border-radius:5px;overflow:hidden;position:relative;width:50px;background:hsla(var(--hue), var(--s), var(--l), var(--a));box-shadow:0 0 8px -5px}.color-picker>output::before{content:'';position:absolute;z-index:-1;top:0;bottom:0;left:0;right:0;background:repeating-conic-gradient(var(--checkboard-color) 0% 25%, transparent 0% 50%) 0/12px 12px}.color-picker.hidden{opacity:0;pointer-events:none;transform:scale(0.95)}.color-picker[style~='left:']{position:absolute;z-index:999999;border-radius:10px;padding:.5em;box-shadow:0 0 20px rgba(0,0,0,0.25);backdrop-filter:blur(3px);background-color:rgba(255,255,255,0.5)}@media only screen and (max-device-width: 640px){.color-picker[style~='left:']{max-width:70%}}.color-picker__value{--isLightColor: Min(1, Max(60 - var(--lightness) - (100 - var(--alpha)), 0));grid-area:value;position:relative;display:inline-flex;align-items:center;overflow:hidden;border-radius:10px;color:hsl(var(--hue), 100%, calc(var(--isLightColor) * 100%));box-shadow:0 0 4px rgba(0,0,0,0.2)}.color-picker__value input{flex:1;order:2;cursor:text;width:0;letter-spacing:-.5px;word-spacing:-3px;font:800 16px/2 monospace;font-size:calc(var(--width)*var(--width-units)/ 20);text-transform:uppercase;padding:0;text-align:center;border:none;outline:none;background:none;color:inherit;transition:color .2s}.color-picker__value input ~ div{position:absolute;z-index:-1;top:0;bottom:0;left:0;right:0;border-radius:inherit;background:var(--color)}.color-picker__value input:focus{color:black}.color-picker__value input:focus ~ button{transform:translateX(100%)}.color-picker__value input:focus+button{transform:translateX(-100%)}.color-picker__value input:focus ~ div{background:none;transition:background .15s;border:3px solid var(--color)}.color-picker__value>button{order:3;width:1.5em;background:none;border:none;font:22px/1.2 monospace;outline:none;color:inherit;cursor:pointer;user-select:none;transition:color .2s, transform .2s ease-out}.color-picker__value>button[name='undo']{order:1}.color-picker__swatches{display:flex;flex-wrap:wrap;align-items:center;gap:3px}.color-picker__swatches>button{--shadow-size: 2px;order:0;padding:12px;width:0;height:0;border-radius:50%;background:var(--c);font-size:18px;line-height:1px;text-indent:-6px;transition:.1s;box-shadow:0 0 0 var(--shadow-size) inset var(--color)}.color-picker__swatches>button:hover:not(:active){--shadow-size: 4px}.color-picker__swatch{order:1;padding:12px;line-height:0;border-radius:50%;background:var(--c);position:relative;cursor:pointer;transition:.15s ease-in-out}.color-picker__swatch:hover{transition:50ms}.color-picker__swatch:hover>button{opacity:1}.color-picker__swatch.cp_remove{padding:0;pointer-events:none;transition:.2s}.color-picker__swatch>button{opacity:0;position:absolute;top:0;right:0;width:0;height:0;border-radius:50%;line-height:.1;color:black;font-weight:800;text-shadow:0 3px white, -2px 1px white}\n\n      .color-picker{z-index:999999;position:fixed}\n\n      </style>",
					);
			},
		}),
		v
	);
});
