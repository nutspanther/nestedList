/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function (a, b) {
    "use strict";
    angular.module("mgcrea.ngStrap", ["mgcrea.ngStrap.modal", "mgcrea.ngStrap.aside", "mgcrea.ngStrap.alert", "mgcrea.ngStrap.button", "mgcrea.ngStrap.select", "mgcrea.ngStrap.datepicker", "mgcrea.ngStrap.navbar", "mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.popover", "mgcrea.ngStrap.dropdown", "mgcrea.ngStrap.typeahead", "mgcrea.ngStrap.scrollspy", "mgcrea.ngStrap.affix", "mgcrea.ngStrap.tab"]), angular.module("mgcrea.ngStrap.affix", ["mgcrea.ngStrap.helpers.dimensions"]).provider("$affix", function () {
        var a = this.defaults = {offsetTop: "auto"};
        this.$get = ["$window", "dimensions", function (b, c) {
            function d(d, g) {
                function h(a, c, d) {
                    var e = b.pageYOffset, f = b.document.body.scrollHeight;
                    return r >= e ? "top" : null !== a && e + a <= c.top ? "middle" : null !== s && c.top + d + l >= f - s ? "bottom" : "middle"
                }

                var i = {}, j = angular.extend({}, a, g), k = "affix affix-top affix-bottom", l = 0, m = 0, n = null, o = null, p = d.parent();
                if (j.offsetParent)if (j.offsetParent.match(/^\d+$/))for (var q = 0; q < 1 * j.offsetParent - 1; q++)p = p.parent(); else p = angular.element(j.offsetParent);
                var r = 0;
                j.offsetTop && ("auto" === j.offsetTop && (j.offsetTop = "+0"), j.offsetTop.match(/^[-+]\d+$/) ? (l -= 1 * j.offsetTop, r = j.offsetParent ? c.offset(p[0]).top + 1 * j.offsetTop : c.offset(d[0]).top - c.css(d[0], "marginTop", !0) + 1 * j.offsetTop) : r = 1 * j.offsetTop);
                var s = 0;
                return j.offsetBottom && (s = j.offsetParent && j.offsetBottom.match(/^[-+]\d+$/) ? b.document.body.scrollHeight - (c.offset(p[0]).top + c.height(p[0])) + 1 * j.offsetBottom + 1 : 1 * j.offsetBottom), i.init = function () {
                    m = c.offset(d[0]).top + l, e.on("scroll", this.checkPosition), e.on("click", this.checkPositionWithEventLoop), this.checkPosition(), this.checkPositionWithEventLoop()
                }, i.destroy = function () {
                    e.off("scroll", this.checkPosition), e.off("click", this.checkPositionWithEventLoop)
                }, i.checkPositionWithEventLoop = function () {
                    setTimeout(this.checkPosition, 1)
                }, i.checkPosition = function () {
                    var a = b.pageYOffset, e = c.offset(d[0]), g = c.height(d[0]), i = h(o, e, g);
                    n !== i && (n = i, d.removeClass(k).addClass("affix" + ("middle" !== i ? "-" + i : "")), "top" === i ? (o = null, d.css("position", j.offsetParent ? "" : "relative"), d.css("top", "")) : "bottom" === i ? (o = j.offsetUnpin ? -(1 * j.offsetUnpin) : e.top - a, d.css("position", j.offsetParent ? "" : "relative"), d.css("top", j.offsetParent ? "" : f[0].offsetHeight - s - g - m + "px")) : (o = null, d.css("position", "fixed"), d.css("top", l + "px")))
                }, i.init(), i
            }

            var e = angular.element(b), f = angular.element(b.document.body);
            return d
        }]
    }).directive("bsAffix", ["$affix", "dimensions", function (a) {
        return{restrict: "EAC", link: function (b, c, d) {
            var e = {scope: b, offsetTop: "auto"};
            angular.forEach(["offsetTop", "offsetBottom", "offsetParent", "offsetUnpin"], function (a) {
                angular.isDefined(d[a]) && (e[a] = d[a])
            });
            var f = a(c, e);
            b.$on("$destroy", function () {
                e = null, f = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.alert", []).run(["$templateCache", function (a) {
        var b = '<div class="alert" tabindex="-1" ng-class="[type ? \'alert-\' + type : null]"><button type="button" class="close" ng-click="$hide()">&times;</button><strong ng-bind="title"></strong>&nbsp;<span ng-bind-html="content"></span></div>';
        a.put("$alert", b)
    }]).provider("$alert", function () {
        var a = this.defaults = {animation: "animation-fade", prefixClass: "alert", placement: null, template: "$alert", container: !1, element: null, backdrop: !1, keyboard: !0, show: !0, duration: !1};
        this.$get = ["$modal", "$timeout", function (b, c) {
            function d(d) {
                var e = {}, f = angular.extend({}, a, d);
                e = b(f), f.scope || angular.forEach(["type"], function (a) {
                    f[a] && (e.$scope[a] = f[a])
                });
                var g = e.show;
                return f.duration && (e.show = function () {
                    g(), c(function () {
                        e.hide()
                    }, 1e3 * f.duration)
                }), e
            }

            return d
        }]
    }).directive("bsAlert", ["$window", "$location", "$sce", "$alert", function (a, b, c, d) {
        a.requestAnimationFrame || a.setTimeout;
        return{restrict: "EAC", scope: !0, link: function (a, b, c) {
            var e = {scope: a, element: b, show: !1};
            angular.forEach(["template", "placement", "keyboard", "html", "container", "animation", "duration"], function (a) {
                angular.isDefined(c[a]) && (e[a] = c[a])
            }), angular.forEach(["title", "content", "type"], function (b) {
                c[b] && c.$observe(b, function (c) {
                    a[b] = c
                })
            }), c.bsAlert && a.$watch(c.bsAlert, function (b) {
                angular.isObject(b) ? angular.extend(a, b) : a.content = b
            }, !0);
            var f = d(e);
            b.on(c.trigger || "click", f.toggle), a.$on("$destroy", function () {
                f.destroy(), e = null, f = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.aside", ["mgcrea.ngStrap.modal"]).run(["$templateCache", function (a) {
        var b = '<div class="aside" tabindex="-1" role="dialog"><div class="aside-dialog"><div class="aside-content"><div class="aside-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="aside-title" ng-bind="title"></h4></div><div class="aside-body" ng-show="content" ng-bind="content"></div><div class="aside-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>';
        a.put("$aside", b)
    }]).provider("$aside", function () {
        var a = this.defaults = {animation: "animation-fadeAndSlideRight", prefixClass: "aside", placement: "right", template: "$aside", container: !1, element: null, backdrop: !0, keyboard: !0, html: !1, show: !0};
        this.$get = ["$modal", function (b) {
            function c(c) {
                var d = {}, e = angular.extend({}, a, c);
                return d = b(e)
            }

            return c
        }]
    }).directive("bsAside", ["$window", "$location", "$sce", "$aside", function (a, b, c, d) {
        a.requestAnimationFrame || a.setTimeout;
        return{restrict: "EAC", scope: !0, link: function (a, b, c) {
            var e = {scope: a, element: b, show: !1};
            angular.forEach(["template", "placement", "backdrop", "keyboard", "html", "container", "animation"], function (a) {
                angular.isDefined(c[a]) && (e[a] = c[a])
            }), angular.forEach(["title", "content"], function (b) {
                c[b] && c.$observe(b, function (c) {
                    a[b] = c
                })
            }), c.bsAside && a.$watch(c.bsAside, function (b) {
                angular.isObject(b) ? angular.extend(a, b) : a.content = b
            }, !0);
            var f = d(e);
            b.on(c.trigger || "click", f.toggle), a.$on("$destroy", function () {
                f.destroy(), e = null, f = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.button", []).provider("$button", function () {
        var a = this.defaults = {activeClass: "active", toggleEvent: "click"};
        this.$get = function () {
            return{defaults: a}
        }
    }).directive("bsCheckboxGroup", function () {
        return{restrict: "A", require: "ngModel", compile: function (a, b) {
            a.attr("data-toggle", "buttons"), a.removeAttr("ng-model");
            var c = a[0].querySelectorAll('input[type="checkbox"]');
            angular.forEach(c, function (a) {
                var c = angular.element(a);
                c.attr("bs-checkbox", ""), c.attr("ng-model", b.ngModel + "." + c.attr("value"))
            })
        }}
    }).directive("bsCheckbox", ["$button", function (a) {
        var b = a.defaults, c = /^(true|false|\d+)$/;
        return{restrict: "A", require: "ngModel", link: function (a, d, e, f) {
            var g = b, h = "INPUT" === d[0].nodeName, i = h ? d.parent() : d, j = angular.isDefined(e.trueValue) ? e.trueValue : !0;
            c.test(e.trueValue) && (j = a.$eval(e.trueValue));
            var k = angular.isDefined(e.falseValue) ? e.falseValue : !1;
            c.test(e.falseValue) && (k = a.$eval(e.falseValue));
            var l = "boolean" != typeof j || "boolean" != typeof k;
            l && (f.$parsers.push(function (a) {
                return a ? j : k
            }), a.$watch(e.ngModel, function () {
                f.$render()
            })), f.$render = function () {
                var a = angular.equals(f.$modelValue, j);
                h && (d[0].checked = a), i.toggleClass(g.activeClass, a)
            }, d.bind(g.toggleEvent, function () {
                a.$apply(function () {
                    h || f.$setViewValue(!i.hasClass("active")), l || f.$render()
                })
            })
        }}
    }]).directive("bsRadioGroup", function () {
        return{restrict: "A", require: "ngModel", compile: function (a, b) {
            a.attr("data-toggle", "buttons"), a.removeAttr("ng-model");
            var c = a[0].querySelectorAll('input[type="radio"]');
            angular.forEach(c, function (a) {
                angular.element(a).attr("bs-radio", ""), angular.element(a).attr("ng-model", b.ngModel)
            })
        }}
    }).directive("bsRadio", ["$button", function (a) {
        var b = a.defaults, c = /^(true|false|\d+)$/;
        return{restrict: "A", require: "ngModel", link: function (a, d, e, f) {
            var g = b, h = "INPUT" === d[0].nodeName, i = h ? d.parent() : d, j = c.test(e.value) ? a.$eval(e.value) : e.value;
            f.$render = function () {
                var a = angular.equals(f.$modelValue, j);
                h && (d[0].checked = a), i.toggleClass(g.activeClass, a)
            }, d.bind(g.toggleEvent, function () {
                a.$apply(function () {
                    f.$setViewValue(j), f.$render()
                })
            })
        }}
    }]), angular.module("mgcrea.ngStrap.datepicker", ["mgcrea.ngStrap.tooltip"]).provider("$datepicker", function () {
        var a = this.defaults = {animation: "animation-fade", prefixClass: "datepicker", placement: "bottom-left", template: "datepicker/datepicker.tpl.html", trigger: "focus", container: !1, keyboard: !0, html: !1, delay: 0, dateType: "date", dateFormat: "shortDate", autoclose: !1, minDate: -1 / 0, maxDate: +1 / 0, startView: 0, minView: 0, weekStart: 0};
        this.$get = ["$window", "$document", "$rootScope", "$sce", "$locale", "dateFilter", "datepickerViews", "$tooltip", function (b, c, d, e, f, g, h, i) {
            function j(b, c, d) {
                function e(a) {
                    a.selected = f.$isSelected(a.date)
                }

                var f = i(b, angular.extend({}, a, d)), g = d.scope, j = f.$options, l = f.$scope, m = h(f);
                f.$views = m.views;
                var n = m.viewDate;
                f.$mode = j.startView;
                var o = f.$views[f.$mode];
                l.$select = function (a) {
                    f.select(a)
                }, l.$selectPane = function (a) {
                    f.$selectPane(a)
                }, l.$toggleMode = function () {
                    f.setMode((f.$mode + 1) % f.$views.length)
                }, f.update = function (a) {
                    if (!isNaN(a.getTime())) {
                        var b = angular.isUndefined(f.$date);
                        f.$date = a, o.update.call(o, a, b)
                    }
                }, f.select = function (a, d) {
                    angular.isDate(a) || (a = new Date(a)), !f.$mode || d ? (c.$setViewValue(a), c.$render(), j.autoclose && !d && ("focus" === j.trigger ? b[0].blur() : f.hide())) : (angular.extend(n, {year: a.getUTCFullYear(), month: a.getUTCMonth(), date: a.getUTCDate()}), f.setMode(f.$mode - 1), f.$build())
                }, f.setMode = function (a) {
                    f.$mode = a, o = f.$views[f.$mode], f.$build()
                }, f.$build = function () {
                    o.build.call(o)
                }, f.$updateSelected = function () {
                    for (var a = 0, b = l.rows.length; b > a; a++)angular.forEach(l.rows[a], e)
                }, f.$isSelected = function (a) {
                    return o.isSelected(a)
                }, f.$selectPane = function (a) {
                    var b = o.steps, c = new Date(Date.UTC(n.year + (b.year || 0) * a, n.month + (b.month || 0) * a, n.date + (b.day || 0) * a));
                    angular.extend(n, {year: c.getUTCFullYear(), month: c.getUTCMonth(), date: c.getUTCDate()}), f.$build()
                }, f.$onMouseDown = function (a) {
                    if (a.preventDefault(), a.stopPropagation(), k) {
                        var b = angular.element(a.target);
                        b.triggerHandler("click")
                    }
                }, f.$onKeyDown = function (a) {
                    if (/(38|37|39|40|13)/.test(a.keyCode)) {
                        if (a.preventDefault(), a.stopPropagation(), 13 === a.keyCode)return f.$mode ? l.$apply(function () {
                            f.setMode(f.$mode - 1)
                        }) : "focus" === j.trigger ? b[0].blur() : f.hide();
                        o.onKeyDown(a), g.$digest()
                    }
                };
                var p = f.init;
                f.init = function () {
                    c.$dateValue && (f.$date = c.$dateValue, f.$build()), p()
                };
                var q = f.show;
                f.show = function () {
                    q(), setTimeout(function () {
                        f.$element.on(k ? "touchstart" : "mousedown", f.$onMouseDown), j.keyboard && b.on("keydown", f.$onKeyDown)
                    })
                };
                var r = f.hide;
                return f.hide = function () {
                    f.$element.off(k ? "touchstart" : "mousedown", f.$onMouseDown), j.keyboard && b.off("keydown", f.$onKeyDown), r()
                }, f
            }

            var k = (angular.element(b.document.body), "createTouch"in b.document);
            return a.lang || (a.lang = f.id), j.defaults = a, j
        }]
    }).provider("$dateParser", ["$localeProvider", function () {
        var b = Date.prototype, c = this.defaults = {format: "shortDate"};
        this.$get = ["$locale", function (d) {
            c.lang || (c.lang = d.id);
            var e = function (c) {
                function e(a) {
                    var b, c = Object.keys(k), d = [], e = [];
                    for (b = 0; b < c.length; b++)if (-1 === ["/", ".", "-", " "].indexOf(c[b]) && a.split(c[b]).length > 1) {
                        var f = a.search(c[b]);
                        a = a.split(c[b]).join(""), k[c[b]] && (d[f] = k[c[b]])
                    }
                    return angular.forEach(d, function (a) {
                        e.push(a)
                    }), e
                }

                function f(a) {
                    var b, c = Object.keys(j);
                    for (b = 0; b < c.length; b++)a = a.split(c[b]).join("${"+b+"}");
                    for (b = 0; b < c.length; b++)a = a.split("${"+b+"}").join(j[c[b]]);
                    return new RegExp("^" + a + "$", ["i"])
                }

                var g = {};
                a.$locale = d;
                var h, i, j = {"/": "[\\/]", "-": "[-]", ".": "[.]", " ": "[\\s]", EEEE: "((?:" + d.DATETIME_FORMATS.DAY.join("|") + "))", EEE: "((?:" + d.DATETIME_FORMATS.SHORTDAY.join("|") + "))", dd: "((?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1})))", d: "((?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1})))", MMMM: "((?:" + d.DATETIME_FORMATS.MONTH.join("|") + "))", MMM: "((?:" + d.DATETIME_FORMATS.SHORTMONTH.join("|") + "))", MM: "((?:[0]?[1-9]|[1][012]))", M: "((?:[0]?[1-9]|[1][012]))", yyyy: "((?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]]))", yy: "((?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]]))"}, k = {dd: b.setUTCDate, d: b.setUTCDate, MMMM: function (a) {
                    return this.setUTCMonth(d.DATETIME_FORMATS.MONTH.indexOf(a))
                }, MMM: function (a) {
                    return this.setUTCMonth(d.DATETIME_FORMATS.SHORTMONTH.indexOf(a))
                }, MM: function (a) {
                    return this.setUTCMonth(1 * a - 1)
                }, M: function (a) {
                    return this.setUTCMonth(1 * a - 1)
                }, yyyy: b.setUTCFullYear, yy: function (a) {
                    return this.setUTCFullYear(2e3 + 1 * a)
                }, y: b.setUTCFullYear};
                return g.init = function () {
                    g.$format = d.DATETIME_FORMATS[c.format] || c.format, h = f(g.$format), i = e(g.$format)
                }, g.isValid = function (a) {
                    return angular.isDate(a) ? !isNaN(a.getTime()) : h.test(a)
                }, g.parse = function (a, b) {
                    if (angular.isDate(a))return a;
                    var c = h.exec(a);
                    if (!c)return!1;
                    for (var d = b || new Date(0), e = 0; e < c.length - 1; e++)i[e] && i[e].call(d, c[e + 1]);
                    return d
                }, g.init(), g
            };
            return e
        }]
    }]).directive("bsDatepicker", ["$window", "$parse", "$q", "$locale", "dateFilter", "$datepicker", "$dateParser", "$timeout", function (b, c, d, e, f, g, h) {
        {
            var i = b.requestAnimationFrame || b.setTimeout;
            a.moment
        }
        return{restrict: "EAC", require: "ngModel", link: function (a, b, c, d) {
            var e = {scope: a, controller: d};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template", "autoclose", "dateType", "dateFormat", "lang"], function (a) {
                angular.isDefined(c[a]) && (e[a] = c[a])
            });
            var j = g(b, d, e);
            e = j.$options, angular.forEach(["minDate", "maxDate"], function (a) {
                c[a] && c.$observe(a, function (b, c) {
                    ("now" === b || "today" === b) && (b = null), j.$options[a] = +new Date(b), angular.isDefined(c) && i(function () {
                        j && j.$build()
                    })
                })
            }), a.$watch(c.ngModel, function () {
                j.update(d.$dateValue)
            });
            var k = h({format: e.dateFormat, lang: e.lang});
            d.$parsers.unshift(function (a) {
                var b = k.parse(a, d.$dateValue);
                if (!b || isNaN(b.getTime()))return void d.$setValidity("date", !1);
                var c = b.getTime() >= e.minDate && b.getTime() <= e.maxDate;
                return d.$setValidity("date", c), d.$dateValue = b, "string" === e.dateType ? f(a, e.dateFormat) : "number" === e.dateType ? d.$dateValue.getTime() : "iso" === e.dateType ? d.$dateValue.toISOString() : d.$dateValue
            }), d.$formatters.push(function (a) {
                return d.$dateValue = angular.isDate(a) ? a : new Date(a), d.$dateValue
            }), d.$render = function () {
                b.val(d.$isEmpty(d.$viewValue) ? "" : f(d.$viewValue, e.dateFormat))
            }, a.$on("$destroy", function () {
                j.destroy(), e = null, j = null
            })
        }}
    }]).provider("datepickerViews", function () {
        function a(a, b) {
            for (var c = []; a.length > 0;)c.push(a.splice(0, b));
            return c
        }

        this.defaults = {dayFormat: "dd", daySplit: 7};
        this.$get = ["$locale", "$sce", "dateFilter", function (b, c, d) {
            return function (e) {
                var f = e.$scope, g = e.$options, h = b.DATETIME_FORMATS.SHORTDAY, i = h.slice(g.weekStart).concat(h.slice(0, g.weekStart)), j = c.trustAsHtml('<th class="dow text-center">' + i.join('</th><th class="dow text-center">') + "</th>"), k = e.$date || new Date, l = {year: k.getUTCFullYear(), month: k.getUTCMonth(), date: k.getUTCDate()}, m = [
                    {format: "dd", split: 7, height: 250, steps: {month: 1}, update: function (a, b) {
                        b || a.getUTCFullYear() !== l.year || a.getUTCMonth() !== l.month ? (angular.extend(l, {year: e.$date.getUTCFullYear(), month: e.$date.getUTCMonth(), date: e.$date.getUTCDate()}), e.$build()) : a.getUTCDate() !== l.date && (l.date = e.$date.getUTCDate(), e.$updateSelected())
                    }, build: function () {
                        for (var b, c = [], e = new Date(Date.UTC(l.year, l.month, 1)), h = new Date(+e - 864e5 * (e.getUTCDay() + 1 - g.weekStart)), i = 0; 35 > i; i++)b = new Date(+h + 864e5 * i), c.push({date: b, label: d(b, this.format), selected: this.isSelected(b), muted: b.getUTCMonth() !== l.month, disabled: this.isDisabled(b)});
                        f.title = d(e, "MMMM yyyy"), f.labels = j, f.rows = a(c, this.split), f.width = 100 / this.split, f.height = (this.height - 75) / f.rows.length
                    }, isSelected: function (a) {
                        return a.getUTCFullYear() === e.$date.getUTCFullYear() && a.getUTCMonth() === e.$date.getUTCMonth() && a.getUTCDate() === e.$date.getUTCDate()
                    }, isDisabled: function (a) {
                        return a.getTime() < g.minDate || a.getTime() > g.maxDate
                    }, onKeyDown: function (a) {
                        var b = e.$date.getTime();
                        37 === a.keyCode ? e.select(new Date(b - 864e5), !0) : 38 === a.keyCode ? e.select(new Date(b - 6048e5), !0) : 39 === a.keyCode ? e.select(new Date(b + 864e5), !0) : 40 === a.keyCode && e.select(new Date(b + 6048e5), !0)
                    }},
                    {name: "month", format: "MMM", split: 4, height: 250, steps: {year: 1}, update: function (a) {
                        a.getUTCFullYear() !== l.year ? (angular.extend(l, {year: e.$date.getUTCFullYear(), month: e.$date.getUTCMonth(), date: e.$date.getUTCDate()}), e.$build()) : a.getUTCMonth() !== l.month && (angular.extend(l, {month: e.$date.getUTCMonth(), date: e.$date.getUTCDate()}), e.$updateSelected())
                    }, build: function () {
                        for (var b, c = [], g = 0; 12 > g; g++)b = new Date(Date.UTC(l.year, g, 1)), c.push({date: b, label: d(b, this.format), selected: e.$isSelected(b), disabled: this.isDisabled(b)});
                        f.title = d(b, "yyyy"), f.labels = !1, f.rows = a(c, this.split), f.width = 100 / this.split, f.height = (this.height - 50) / f.rows.length
                    }, isSelected: function (a) {
                        return a.getUTCFullYear() === e.$date.getUTCFullYear() && a.getUTCMonth() === e.$date.getUTCMonth()
                    }, isDisabled: function (a) {
                        var b = +new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth() + 1, 0));
                        return b < g.minDate || a.getTime() > g.maxDate
                    }, onKeyDown: function (a) {
                        var b = e.$date.getUTCMonth();
                        37 === a.keyCode ? e.select(e.$date.setMonth(b - 1), !0) : 38 === a.keyCode ? e.select(e.$date.setMonth(b - 4), !0) : 39 === a.keyCode ? e.select(e.$date.setMonth(b + 1), !0) : 40 === a.keyCode && e.select(e.$date.setMonth(b + 4), !0)
                    }},
                    {name: "year", format: "yyyy", split: 4, height: 250, steps: {year: 12}, update: function (a) {
                        parseInt(a.getUTCFullYear() / 20, 10) !== parseInt(l.year / 20, 10) ? (angular.extend(l, {year: e.$date.getUTCFullYear(), month: e.$date.getUTCMonth(), date: e.$date.getUTCDate()}), e.$build()) : a.getUTCFullYear() !== l.year && (angular.extend(l, {year: e.$date.getUTCFullYear(), month: e.$date.getUTCMonth(), date: e.$date.getUTCDate()}), e.$updateSelected())
                    }, build: function () {
                        for (var b, c = l.year - l.year % (3 * this.split), g = [], h = 0; 12 > h; h++)b = new Date(Date.UTC(c + h, 0, 1)), g.push({date: b, label: d(b, this.format), selected: e.$isSelected(b), disabled: this.isDisabled(b)});
                        f.title = g[0].label + "-" + g[g.length - 1].label, f.labels = !1, f.rows = a(g, this.split), f.width = 100 / this.split, f.height = (this.height - 50) / f.rows.length
                    }, isSelected: function (a) {
                        return a.getUTCFullYear() === e.$date.getUTCFullYear()
                    }, isDisabled: function (a) {
                        var b = +new Date(Date.UTC(a.getUTCFullYear(), 1, 0));
                        return b < g.minDate || a.getTime() > g.maxDate
                    }, onKeyDown: function (a) {
                        var b = e.$date.getUTCFullYear();
                        37 === a.keyCode ? e.select(e.$date.setYear(b - 1), !0) : 38 === a.keyCode ? e.select(e.$date.setYear(b - 4), !0) : 39 === a.keyCode ? e.select(e.$date.setYear(b + 1), !0) : 40 === a.keyCode && e.select(e.$date.setYear(b + 4), !0)
                    }}
                ];
                return{views: g.minView ? Array.prototype.slice.call(m, g.minView) : m, viewDate: l}
            }
        }]
    }), angular.module("mgcrea.ngStrap.dropdown", ["mgcrea.ngStrap.tooltip"]).run(["$templateCache", function (a) {
        var b = '<ul tabindex="-1" class="dropdown-menu" role="menu"><li role="presentation" ng-class="{divider: item.divider}" ng-repeat="item in content" ><a role="menuitem" tabindex="-1" href="{{item.href}}" ng-if="!item.divider" ng-click="$eval(item.click);$hide()" ng-bind="item.text"></a></li></ul>';
        a.put("$dropdown", b)
    }]).provider("$dropdown", function () {
        var a = this.defaults = {animation: "animation-fade", prefixClass: "dropdown", placement: "bottom-left", template: "$dropdown", trigger: "click", container: !1, keyboard: !0, html: !1, delay: 0};
        this.$get = ["$window", "$tooltip", function (b, c) {
            function d(b, d) {
                function g(a) {
                    return a.target !== b[0] ? a.target !== b[0] && h.hide() : void 0
                }

                var h = {}, i = angular.extend({}, a, d);
                h = c(b, i), h.$onKeyDown = function (a) {
                    if (/(38|40)/.test(a.keyCode)) {
                        a.preventDefault(), a.stopPropagation();
                        var b = angular.element(h.$element[0].querySelectorAll("li:not(.divider) a"));
                        if (b.length) {
                            var c;
                            angular.forEach(b, function (a, b) {
                                f && f.call(a, ":focus") && (c = b)
                            }), 38 === a.keyCode && c > 0 ? c-- : 40 === a.keyCode && c < b.length - 1 ? c++ : angular.isUndefined(c) && (c = 0), b.eq(c)[0].focus()
                        }
                    }
                };
                var j = h.show;
                h.show = function () {
                    j(), setTimeout(function () {
                        i.keyboard && h.$element.on("keydown", h.$onKeyDown), e.on("click", g)
                    })
                };
                var k = h.hide;
                return h.hide = function () {
                    i.keyboard && h.$element.off("keydown", h.$onKeyDown), e.off("click", g), k()
                }, h
            }

            var e = angular.element(b.document.body), f = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
            return d
        }]
    }).directive("bsDropdown", ["$window", "$location", "$sce", "$dropdown", function (a, b, c, d) {
        return{restrict: "EAC", scope: !0, link: function (a, b, c) {
            var e = {scope: a};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template"], function (a) {
                angular.isDefined(c[a]) && (e[a] = c[a])
            }), c.bsDropdown && a.$watch(c.bsDropdown, function (b) {
                a.content = b
            }, !0);
            var f = d(b, e);
            a.$on("$destroy", function () {
                f.destroy(), e = null, f = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.helpers.debounce", []).constant("debounce", function (a, b, c) {
        var d, e, f, g, h;
        return function () {
            f = this, e = arguments, g = new Date;
            var i = function () {
                var j = new Date - g;
                b > j ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e)))
            }, j = c && !d;
            return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e)), h
        }
    }).constant("throttle", function (a, b, c) {
        var d, e, f, g = null, h = 0;
        c || (c = {});
        var i = function () {
            h = c.leading === !1 ? 0 : new Date, g = null, f = a.apply(d, e)
        };
        return function () {
            var j = new Date;
            h || c.leading !== !1 || (h = j);
            var k = b - (j - h);
            return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
        }
    }), angular.module("mgcrea.ngStrap.helpers.dimensions", []).factory("dimensions", ["$document", "$window", function () {
        var b = (angular.element, {}), c = b.nodeName = function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        };
        b.css = function (b, c, d) {
            var e;
            return e = b.currentStyle ? b.currentStyle[c] : a.getComputedStyle ? a.getComputedStyle(b)[c] : b.style[c], d === !0 ? parseFloat(e) || 0 : e
        }, b.offset = function (b) {
            var c = b.getBoundingClientRect(), d = b.ownerDocument;
            return{width: b.offsetWidth, height: b.offsetHeight, top: c.top + (a.pageYOffset || d.documentElement.scrollTop) - (d.documentElement.clientTop || 0), left: c.left + (a.pageXOffset || d.documentElement.scrollLeft) - (d.documentElement.clientLeft || 0)}
        }, b.position = function (a) {
            var e, f, g = {top: 0, left: 0};
            return"fixed" === b.css(a, "position") ? f = a.getBoundingClientRect() : (e = d(a), f = b.offset(a), f = b.offset(a), c(e, "html") || (g = b.offset(e)), g.top += b.css(e, "borderTopWidth", !0), g.left += b.css(e, "borderLeftWidth", !0)), {width: a.offsetWidth, height: a.offsetHeight, top: f.top - g.top - b.css(a, "marginTop", !0), left: f.left - g.left - b.css(a, "marginLeft", !0)}
        };
        var d = function (a) {
            var d = a.ownerDocument, e = a.offsetParent || d;
            if (c(e, "#document"))return d.documentElement;
            for (; e && !c(e, "html") && "static" === b.css(e, "position");)e = e.offsetParent;
            return e || d.documentElement
        };
        return b.height = function (a, c) {
            var d = a.offsetHeight;
            return c ? d += b.css(a, "marginTop", !0) + b.css(a, "marginBottom", !0) : d -= b.css(a, "paddingTop", !0) + b.css(a, "paddingBottom", !0) + b.css(a, "borderTopWidth", !0) + b.css(a, "borderBottomWidth", !0), d
        }, b.width = function (a, c) {
            var d = a.offsetWidth;
            return c ? d += b.css(a, "marginLeft", !0) + b.css(a, "marginRight", !0) : d -= b.css(a, "paddingLeft", !0) + b.css(a, "paddingRight", !0) + b.css(a, "borderLeftWidth", !0) + b.css(a, "borderRightWidth", !0), d
        }, b
    }]), angular.module("mgcrea.ngStrap.helpers.parseOptions", []).provider("$parseOptions", function () {
        var a = this.defaults = {regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/};
        this.$get = ["$parse", "$q", function (b, c) {
            function d(d, e) {
                function f(a) {
                    return a.map(function (a) {
                        var b, c, d = {};
                        return d[k] = a, b = j(d), c = n(d), angular.isObject(c) && (c = b), {label: b, value: c}
                    })
                }

                var g = {}, h = angular.extend({}, a, e);
                g.$values = [];
                var i, j, k, l, m, n, o;
                return g.init = function () {
                    g.$match = i = d.match(h.regexp), j = b(i[2] || i[1]), k = i[4] || i[6], l = i[5], m = b(i[3] || ""), n = b(i[2] ? i[1] : k), o = b(i[7])
                }, g.valuesFn = function (a, b) {
                    return c.when(o(a, b)).then(function (a) {
                        return g.$values = a ? f(a) : {}, g.$values
                    })
                }, g.init(), g
            }

            return d
        }]
    }), angular.module("mgcrea.ngStrap.modal", ["mgcrea.ngStrap.helpers.dimensions"]).run(["$templateCache", "$modal", function (a) {
        var b = '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title"></h4></div><div class="modal-body" ng-show="content" ng-bind="content"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>';
        a.put("$modal", b)
    }]).provider("$modal", function () {
        var a = this.defaults = {animation: "animation-fade", prefixClass: "modal", placement: "top", template: "$modal", container: !1, element: null, backdrop: !0, keyboard: !0, html: !1, show: !0};
        this.$get = ["$window", "$rootScope", "$compile", "$q", "$templateCache", "$http", "$animate", "$timeout", "dimensions", function (c, d, e, f, g, h, i) {
            function j(b) {
                function c(a) {
                    a.target === a.currentTarget && ("static" === q.backdrop ? j.focus() : j.hide())
                }

                var j = {}, q = angular.extend({}, a, b);
                j.$promise = f.when(g.get(q.template) || h.get(q.template));
                var r = j.$scope = q.scope && q.scope.$new() || d.$new();
                q.element || q.container || (q.container = "body"), q.scope || k(["title", "content"], function (a) {
                    q[a] && (r[a] = q[a])
                }), r.$hide = function () {
                    r.$$postDigest(function () {
                        j.hide()
                    })
                }, r.$show = function () {
                    r.$$postDigest(function () {
                        j.show()
                    })
                }, r.$toggle = function () {
                    r.$$postDigest(function () {
                        j.toggle()
                    })
                };
                var s, t, u = l('<div class="' + q.prefixClass + '-backdrop"/>');
                return j.$promise.then(function (a) {
                    angular.isObject(a) && (a = a.data), q.html && (a = a.replace(o, 'ng-bind-html="')), a = m.apply(a), s = e(a), j.init()
                }), j.init = function () {
                    q.show && r.$$postDigest(function () {
                        "focus" === q.trigger ? element[0].focus() : j.show()
                    })
                }, j.destroy = function () {
                    t && (t.remove(), t = null), u && (u.remove(), u = null), r.$destroy()
                }, j.show = function () {
                    var a = q.container ? p(q.container) : null, b = q.container ? null : q.element;
                    t = j.$element = s(r, function () {
                    }), t.css({display: "block"}).addClass(q.placement), q.animation && (q.backdrop && u.addClass("animation-fade"), t.addClass(q.animation)), q.backdrop && i.enter(u, n, null, function () {
                    }), i.enter(t, a, b, function () {
                    }), r.$isShown = !0, r.$$phase || r.$digest(), j.focus(), n.addClass(q.prefixClass + "-open"), q.backdrop && (t.on("click", c), u.on("click", c)), q.keyboard && t.on("keyup", j.$onKeyUp)
                }, j.hide = function () {
                    i.leave(t, function () {
                        n.removeClass(q.prefixClass + "-open")
                    }), q.backdrop && i.leave(u, function () {
                    }), r.$$phase || r.$digest(), r.$isShown = !1, q.backdrop && (t.off("click", c), u.off("click", c)), q.keyboard && t.off("keyup", j.$onKeyUp)
                }, j.toggle = function () {
                    r.$isShown ? j.hide() : j.show()
                }, j.focus = function () {
                    t[0].focus()
                }, j.$onKeyUp = function (a) {
                    27 === a.which && j.hide()
                }, j
            }

            var k = angular.forEach, l = angular.element, m = String.prototype.trim, n = l(c.document.body), o = /ng-bind="/gi, p = function (a, c) {
                return l((c || b).querySelectorAll(a))
            };
            return j
        }]
    }).directive("bsModal", ["$window", "$location", "$sce", "$modal", function (a, b, c, d) {
        return{restrict: "EAC", scope: !0, link: function (a, b, c) {
            var e = {scope: a, element: b, show: !1};
            angular.forEach(["template", "placement", "backdrop", "keyboard", "html", "container", "animation"], function (a) {
                angular.isDefined(c[a]) && (e[a] = c[a])
            }), angular.forEach(["title", "content"], function (b) {
                c[b] && c.$observe(b, function (c) {
                    a[b] = c
                })
            }), c.bsModal && a.$watch(c.bsModal, function (b) {
                angular.isObject(b) ? angular.extend(a, b) : a.content = b
            }, !0);
            var f = d(e);
            b.on(c.trigger || "click", f.toggle), a.$on("$destroy", function () {
                f.destroy(), e = null, f = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.navbar", []).provider("$navbar", function () {
        var a = this.defaults = {activeClass: "active", routeAttr: "data-match-route"};
        this.$get = function () {
            return{defaults: a}
        }
    }).directive("bsNavbar", ["$window", "$location", "$navbar", function (a, b, c) {
        var d = c.defaults;
        return{restrict: "A", link: function (a, c, e) {
            var f = d;
            angular.forEach(Object.keys(d), function (a) {
                angular.isDefined(e[a]) && (f[a] = e[a])
            }), a.$watch(function () {
                return b.path()
            }, function (a) {
                var b = c[0].querySelectorAll("li[" + f.routeAttr + "]");
                angular.forEach(b, function (b) {
                    var c = angular.element(b), d = c.attr(f.routeAttr), e = new RegExp("^" + d.replace("/", "\\/") + "$", ["i"]);
                    e.test(a) ? c.addClass(f.activeClass) : c.removeClass(f.activeClass)
                })
            })
        }}
    }]), angular.module("mgcrea.ngStrap.popover", ["mgcrea.ngStrap.tooltip"]).run(["$templateCache", function (a) {
        var b = '<div class="popover" tabindex="-1" ng-show="content" ng-class="{\'in\': $visible}"><div class="arrow"></div><h3 class="popover-title" ng-bind="title" ng-show="title"></h3><div class="popover-content" ng-bind="content"></div></div>';
        a.put("$popover", b)
    }]).provider("$popover", function () {
        var a = this.defaults = {animation: "animation-fade", placement: "right", template: "$popover", trigger: "click", keyboard: !0, html: !1, title: "", content: "", delay: 0, container: !1};
        this.$get = ["$tooltip", function (b) {
            function c(c, d) {
                var e = angular.extend({}, a, d);
                return b(c, e)
            }

            return c
        }]
    }).directive("bsPopover", ["$window", "$location", "$sce", "$popover", function (a, b, c, d) {
        var e = a.requestAnimationFrame || a.setTimeout;
        return{restrict: "EAC", scope: !0, link: function (a, b, c) {
            var f = {scope: a};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template"], function (a) {
                angular.isDefined(c[a]) && (f[a] = c[a])
            }), angular.forEach(["title", "content"], function (b) {
                c[b] && c.$observe(b, function (c, d) {
                    a[b] = c, angular.isDefined(d) && e(function () {
                        g && g.$applyPlacement()
                    })
                })
            }), c.bsPopover && a.$watch(c.bsPopover, function (b, c) {
                angular.isObject(b) ? angular.extend(a, b) : a.content = b, angular.isDefined(c) && e(function () {
                    g && g.$applyPlacement()
                })
            }, !0);
            var g = d(b, f);
            a.$on("$destroy", function () {
                g.destroy(), f = null, g = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.scrollspy", ["mgcrea.ngStrap.helpers.debounce", "mgcrea.ngStrap.helpers.dimensions"]).provider("$scrollspy", function () {
        var a = this.$$spies = {}, c = this.defaults = {debounce: 150, throttle: 100, offset: 100};
        this.$get = ["$window", "$document", "$rootScope", "dimensions", "debounce", "throttle", function (d, e, f, g, h, i) {
            function j(a, b) {
                return a[0].nodeName && a[0].nodeName.toLowerCase() === b.toLowerCase()
            }

            function k(e) {
                var k = angular.extend({}, c, e);
                k.element || (k.element = n);
                var o = j(k.element, "body"), p = o ? l : k.element, q = o ? "window" : k.id;
                if (a[q])return a[q].$$count++, a[q];
                var r, s, t, u, v, w, x = {}, y = x.$trackedElements = [], z = [];
                return x.init = function () {
                    this.$$count = 1, s = h(this.checkPosition, k.debounce), t = i(this.checkPosition, k.throttle), p.on("click", this.checkPositionWithEventLoop), l.on("resize", s), p.on("scroll", t), u = h(this.checkOffsets, k.debounce), f.$on("$viewContentLoaded", u), f.$on("$includeContentLoaded", u), u(), q && (a[q] = x)
                }, x.destroy = function () {
                    this.$$count--, this.$$count > 0 || (p.off("click", this.checkPositionWithEventLoop), l.off("resize", s), p.off("scroll", s), f.$off("$viewContentLoaded", u), f.$off("$includeContentLoaded", u))
                }, x.checkPosition = function () {
                    if (z.length) {
                        if (w = (o ? d.pageYOffset : p.prop("scrollTop")) || 0, v = Math.max(d.innerHeight, m.prop("clientHeight")), w < z[0].offsetTop && r !== z[0].target)return x.$activateElement(z[0]);
                        for (var a = z.length; a--;)if (!angular.isUndefined(z[a].offsetTop) && null !== z[a].offsetTop && r !== z[a].target && !(w < z[a].offsetTop || z[a + 1] && w > z[a + 1].offsetTop))return x.$activateElement(z[a])
                    }
                }, x.checkPositionWithEventLoop = function () {
                    setTimeout(this.checkPosition, 1)
                }, x.$activateElement = function (a) {
                    if (r) {
                        var b = x.$getTrackedElement(r);
                        b && (b.source.removeClass("active"), j(b.source, "li") && j(b.source.parent().parent(), "li") && b.source.parent().parent().removeClass("active"))
                    }
                    r = a.target, a.source.addClass("active"), j(a.source, "li") && j(a.source.parent().parent(), "li") && a.source.parent().parent().addClass("active")
                }, x.$getTrackedElement = function (a) {
                    return y.filter(function (b) {
                        return b.target === a
                    })[0]
                }, x.checkOffsets = function () {
                    angular.forEach(y, function (a) {
                        var c = b.querySelector(a.target);
                        a.offsetTop = c ? g.offset(c).top : null, k.offset && null !== a.offsetTop && (a.offsetTop -= 1 * k.offset)
                    }), z = y.filter(function (a) {
                        return null !== a.offsetTop
                    }).sort(function (a, b) {
                        return a.offsetTop - b.offsetTop
                    }), s()
                }, x.trackElement = function (a, b) {
                    y.push({target: a, source: b})
                }, x.untrackElement = function (a, b) {
                    for (var c, d = y.length; d--;)if (y[d].target === a && y[d].source === b) {
                        c = d;
                        break
                    }
                    y = y.splice(c, 1)
                }, x.activate = function (a) {
                    y[a].addClass("active")
                }, x.init(), x
            }

            var l = angular.element(d), m = angular.element(e.prop("documentElement")), n = angular.element(d.document.body);
            return k
        }]
    }).directive("bsScrollspy", ["$rootScope", "debounce", "dimensions", "$scrollspy", function (a, b, c, d) {
        return{restrict: "EAC", link: function (a, b, c) {
            var e = {scope: a};
            angular.forEach(["offset", "target"], function (a) {
                angular.isDefined(c[a]) && (e[a] = c[a])
            });
            var f = d(e);
            f.trackElement(e.target, b), a.$on("$destroy", function () {
                f.untrackElement(e.target, b), f.destroy(), e = null, f = null
            })
        }}
    }]).directive("bsScrollspyList", ["$rootScope", "debounce", "dimensions", "$scrollspy", function () {
        return{restrict: "A", compile: function (a) {
            var b = a[0].querySelectorAll("li > a[href]");
            angular.forEach(b, function (a) {
                var b = angular.element(a);
                b.parent().attr("bs-scrollspy", "").attr("data-target", b.attr("href"))
            })
        }}
    }]), angular.module("mgcrea.ngStrap.select", ["mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.helpers.parseOptions"]).provider("$select", function () {
        var a = this.defaults = {animation: "animation-fade", prefixClass: "select", placement: "bottom-left", template: "select/select.tpl.html", trigger: "focus", container: !1, keyboard: !0, html: !1, delay: 0, multiple: !1, sort: !0, caretHtml: '&nbsp;<span class="caret"></span>', placeholder: "Choose among the following..."};
        this.$get = ["$window", "$document", "$rootScope", "$tooltip", function (b, c, d, e) {
            function f(b, c, d) {
                var f = {}, h = angular.extend({}, a, d);
                f = e(b, h);
                var i = d.scope, j = f.$scope;
                j.$matches = [], j.$activeIndex = 0, j.$isMultiple = h.multiple, j.$activate = function (a) {
                    j.$$postDigest(function () {
                        f.activate(a)
                    })
                }, j.$select = function (a) {
                    j.$$postDigest(function () {
                        f.select(a)
                    })
                }, j.$isVisible = function () {
                    return f.$isVisible()
                }, j.$isActive = function (a) {
                    return f.$isActive(a)
                }, f.update = function (a) {
                    j.$matches = a, c.$modelValue && a.length ? j.$activeIndex = h.multiple && angular.isArray(c.$modelValue) ? c.$modelValue.map(function (a) {
                        return f.$getIndex(a)
                    }) : f.$getIndex(c.$modelValue) : j.$activeIndex >= a.length && (j.$activeIndex = h.multiple ? [] : 0)
                }, f.activate = function (a) {
                    return h.multiple ? (j.$activeIndex.sort(), f.$isActive(a) ? j.$activeIndex.splice(j.$activeIndex.indexOf(a), 1) : j.$activeIndex.push(a), h.sort && j.$activeIndex.sort()) : j.$activeIndex = a, j.$activeIndex
                }, f.select = function (a) {
                    var d = j.$matches[a].value;
                    f.activate(a), c.$setViewValue(h.multiple ? j.$activeIndex.map(function (a) {
                        return j.$matches[a].value
                    }) : d), c.$render(), i && i.$digest(), h.multiple || ("focus" === h.trigger ? b[0].blur() : f.$isShown && f.hide()), j.$emit("$select.select", d, a)
                }, f.$isVisible = function () {
                    return h.minLength && c ? j.$matches.length && c.$viewValue.length >= h.minLength : j.$matches.length
                }, f.$isActive = function (a) {
                    return h.multiple ? -1 !== j.$activeIndex.indexOf(a) : j.$activeIndex === a
                }, f.$getIndex = function (a) {
                    var b = j.$matches.length, c = b;
                    if (b) {
                        for (c = b; c-- && j.$matches[c].value !== a;);
                        if (!(0 > c))return c
                    }
                }, f.$onElementMouseDown = function (a) {
                    a.preventDefault(), a.stopPropagation(), f.$isShown ? b[0].blur() : b[0].focus()
                }, f.$onMouseDown = function (a) {
                    if (a.preventDefault(), a.stopPropagation(), g) {
                        var b = angular.element(a.target);
                        b.triggerHandler("click")
                    }
                }, f.$onKeyDown = function (a) {
                    if (/(38|40|13)/.test(a.keyCode)) {
                        if (a.preventDefault(), a.stopPropagation(), 13 === a.keyCode)return f.select(j.$activeIndex);
                        38 === a.keyCode && j.$activeIndex > 0 ? j.$activeIndex-- : 40 === a.keyCode && j.$activeIndex < j.$matches.length - 1 ? j.$activeIndex++ : angular.isUndefined(j.$activeIndex) && (j.$activeIndex = 0), j.$digest()
                    }
                };
                var k = f.init;
                f.init = function () {
                    k(), b.on(g ? "touchstart" : "mousedown", f.$onElementMouseDown)
                };
                var l = f.destroy;
                f.destroy = function () {
                    l(), b.off(g ? "touchstart" : "mousedown", f.$onElementMouseDown)
                };
                var m = f.show;
                f.show = function () {
                    m(), h.multiple && f.$element.addClass("select-multiple"), setTimeout(function () {
                        f.$element.on(g ? "touchstart" : "mousedown", f.$onMouseDown), h.keyboard && b.on("keydown", f.$onKeyDown)
                    })
                };
                var n = f.hide;
                return f.hide = function () {
                    f.$element.off(g ? "touchstart" : "mousedown", f.$onMouseDown), h.keyboard && b.off("keydown", f.$onKeyDown), n()
                }, f
            }

            var g = (angular.element(b.document.body), "createTouch"in b.document);
            return f.defaults = a, f
        }]
    }).directive("bsSelect", ["$window", "$parse", "$q", "$select", "$parseOptions", function (a, b, c, d, e) {
        var f = d.defaults;
        return{restrict: "EAC", require: "ngModel", link: function (a, b, c, g) {
            var h = {scope: a};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template", "placeholder", "multiple"], function (a) {
                angular.isDefined(c[a]) && (h[a] = c[a])
            });
            var i = e(c.ngOptions), j = d(b, g, h);
            a.$watch(i.$match[7], function () {
                i.valuesFn(a, g).then(function (a) {
                    j.update(a), g.$render()
                })
            }), g.$render = function () {
                var a, d;
                h.multiple && angular.isArray(g.$modelValue) ? a = g.$modelValue.map(function (a) {
                    return d = j.$getIndex(a), angular.isDefined(d) ? j.$scope.$matches[d].label : !1
                }).filter(angular.isDefined).join(", ") : (d = j.$getIndex(g.$modelValue), a = angular.isDefined(d) ? j.$scope.$matches[d].label : !1), b.html((a ? a : c.placeholder || f.placeholder) + f.caretHtml)
            }, a.$on("$destroy", function () {
                j.destroy(), h = null, j = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.tab", []).run(["$templateCache", function (a) {
        a.put("$pane", "{{pane.content}}");
        var b = '<ul class="nav nav-tabs"><li ng-repeat="pane in panes" ng-class="{active:$index==active}"><a data-toggle="tab" ng-click="setActive($index, $event)" data-index="{{$index}}">{{pane.title}}</a></li></ul><div class="tab-content"><div ng-repeat="pane in panes" class="tab-pane" ng-class="[$index==active?\'active\':\'\']" ng-include="pane.template || \'$pane\'"></div></div>';
        a.put("$tabs", b)
    }]).provider("$tab", function () {
        var a = this.defaults = {animation: "animation-fade", template: "$tabs"};
        this.$get = function () {
            return{defaults: a}
        }
    }).directive("bsTabs", ["$window", "$animate", "$tab", function (a, b, c) {
        var d = c.defaults;
        return{restrict: "EAC", scope: !0, require: "?ngModel", templateUrl: function (a, b) {
            return b.template || d.template
        }, link: function (a, b, c, e) {
            var f = d;
            angular.forEach(["animation"], function (a) {
                angular.isDefined(c[a]) && (f[a] = c[a])
            }), c.bsTabs && a.$watch(c.bsTabs, function (b) {
                a.panes = b
            }, !0), b.addClass("tabs"), f.animation && b.addClass(f.animation), a.active = a.activePane = 0, a.setActive = function (b) {
                a.active = b, e && e.$setViewValue(b)
            }, e && (e.$render = function () {
                a.active = 1 * e.$modelValue
            })
        }}
    }]), angular.module("mgcrea.ngStrap.tooltip", ["mgcrea.ngStrap.helpers.dimensions"]).run(["$templateCache", function (a) {
        var b = '<div class="tooltip" ng-show="title"><div class="tooltip-arrow"></div><div class="tooltip-inner" ng-bind="title"></div></div>';
        a.put("$tooltip", b)
    }]).provider("$tooltip", function () {
        var a = this.defaults = {animation: "animation-fade", prefixClass: "tooltip", container: !1, placement: "top", template: "$tooltip", trigger: "hover focus", keyboard: !1, html: !1, show: !1, title: "", type: "", delay: 0};
        this.$get = ["$window", "$rootScope", "$compile", "$q", "$templateCache", "$http", "$animate", "$timeout", "dimensions", function (c, d, e, f, g, h, i, j, k) {
            function l(b, c) {
                function j() {
                    return"body" === r.container ? k.offset(b[0]) : k.position(b[0])
                }

                function l(a, b, c, d) {
                    var e, f = a.split("-");
                    switch (f[0]) {
                        case"right":
                            e = {top: b.top + b.height / 2 - d / 2, left: b.left + b.width};
                            break;
                        case"bottom":
                            e = {top: b.top + b.height, left: b.left + b.width / 2 - c / 2};
                            break;
                        case"left":
                            e = {top: b.top + b.height / 2 - d / 2, left: b.left - c};
                            break;
                        default:
                            e = {top: b.top - d, left: b.left + b.width / 2 - c / 2}
                    }
                    if (!f[1])return e;
                    if ("top" === f[0] || "bottom" === f[0])switch (f[1]) {
                        case"left":
                            e.left = b.left;
                            break;
                        case"right":
                            e.left = b.left + b.width - c
                    } else if ("left" === f[0] || "right" === f[0])switch (f[1]) {
                        case"top":
                            e.top = b.top - d;
                            break;
                        case"bottom":
                            e.top = b.top + b.height
                    }
                    return e
                }

                var q = {}, r = q.$options = angular.extend({}, a, c);
                q.$promise = f.when(g.get(r.template) || h.get(r.template));
                var s = q.$scope = r.scope && r.scope.$new() || d.$new();
                r.delay && angular.isString(r.delay) && (r.delay = parseFloat(r.delay)), s.$hide = function () {
                    s.$$postDigest(function () {
                        q.hide()
                    })
                }, s.$show = function () {
                    s.$$postDigest(function () {
                        q.show()
                    })
                }, s.$toggle = function () {
                    s.$$postDigest(function () {
                        q.toggle()
                    })
                }, q.$isShown = !1;
                var t, u, v, w, x;
                return q.$promise.then(function (a) {
                    angular.isObject(a) && (a = a.data), r.html && (a = a.replace(o, 'ng-bind-html="')), a = m.apply(a), x = a, v = e(a), q.init()
                }), q.init = function () {
                    r.delay && angular.isNumber(r.delay) && (r.delay = {show: r.delay, hide: r.delay});
                    for (var a = r.trigger.split(" "), c = a.length; c--;) {
                        var d = a[c];
                        "click" === d ? b.on("click", q.toggle) : "manual" !== d && (b.on("hover" === d ? "mouseenter" : "focus", q.enter), b.on("hover" === d ? "mouseleave" : "blur", q.leave))
                    }
                    r.show && s.$$postDigest(function () {
                        "focus" === r.trigger ? b[0].focus() : q.show()
                    })
                }, q.destroy = function () {
                    for (var a = r.trigger.split(" "), c = a.length; c--;) {
                        var d = a[c];
                        "click" === d ? b.off("click", q.toggle) : "manual" !== d && (b.off("hover" === d ? "mouseenter" : "focus", q.enter), b.off("hover" === d ? "mouseleave" : "blur", q.leave))
                    }
                    w && (w.remove(), w = null), s.$destroy()
                }, q.enter = function () {
                    return clearTimeout(t), u = "in", r.delay && r.delay.show ? void(t = setTimeout(function () {
                        "in" === u && q.show()
                    }, r.delay.show)) : q.show()
                }, q.show = function () {
                    var a = r.container ? p(r.container) : null, c = r.container ? null : b;
                    w = q.$element = v(s, function () {
                    }), w.css({top: "0px", left: "0px", display: "block"}).addClass(r.placement), r.animation && w.addClass(r.animation), r.type && w.addClass(r.prefixClass + "-" + r.type), i.enter(w, a, c, function () {
                    }), q.$isShown = !0, s.$$phase || s.$digest(), n(q.$applyPlacement), r.keyboard && ("focus" !== r.trigger ? (q.focus(), w.on("keyup", q.$onKeyUp)) : b.on("keyup", q.$onFocusKeyUp))
                }, q.leave = function () {
                    return clearTimeout(t), u = "out", r.delay && r.delay.hide ? void(t = setTimeout(function () {
                        "out" === u && q.hide()
                    }, r.delay.hide)) : q.hide()
                }, q.hide = function () {
                    i.leave(w, function () {
                    }), s.$$phase || s.$digest(), q.$isShown = !1, r.keyboard && w.off("keyup", q.$onKeyUp)
                }, q.toggle = function () {
                    q.$isShown ? q.leave() : q.enter()
                }, q.focus = function () {
                    w[0].focus()
                }, q.$applyPlacement = function () {
                    if (w) {
                        var a = j(), b = w.prop("offsetWidth"), c = w.prop("offsetHeight"), d = l(r.placement, a, b, c);
                        d.top += "px", d.left += "px", w.css(d)
                    }
                }, q.$onKeyUp = function (a) {
                    27 === a.which && q.hide()
                }, q.$onFocusKeyUp = function (a) {
                    27 === a.which && b[0].blur()
                }, q
            }

            var m = String.prototype.trim, n = c.requestAnimationFrame || c.setTimeout, o = /ng-bind="/gi, p = function (a, c) {
                return angular.element((c || b).querySelectorAll(a))
            };
            return l
        }]
    }).directive("bsTooltip", ["$window", "$location", "$sce", "$tooltip", function (a, b, c, d) {
        var e = a.requestAnimationFrame || a.setTimeout;
        return{restrict: "EAC", scope: !0, link: function (a, b, c) {
            var f = {scope: a};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "type", "template"], function (a) {
                angular.isDefined(c[a]) && (f[a] = c[a])
            }), angular.forEach(["title"], function (b) {
                c[b] && c.$observe(b, function (c, d) {
                    a[b] = c, angular.isDefined(d) && e(function () {
                        g && g.$applyPlacement()
                    })
                })
            }), c.bsTooltip && a.$watch(c.bsTooltip, function (b, c) {
                angular.isObject(b) ? angular.extend(a, b) : a.content = b, angular.isDefined(c) && e(function () {
                    g && g.$applyPlacement()
                })
            }, !0);
            var g = d(b, f);
            a.$on("$destroy", function () {
                g.destroy(), f = null, g = null
            })
        }}
    }]), angular.module("mgcrea.ngStrap.typeahead", ["mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.helpers.parseOptions"]).run(["$templateCache", function (a) {
        var b = '<ul tabindex="-1" class="typeahead dropdown-menu" ng-show="$isVisible()" role="select"><li role="presentation" ng-repeat="match in $matches" ng-class="{active: $index == $activeIndex}"><a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a></li></ul>';
        a.put("$typeahead", b)
    }]).provider("$typeahead", function () {
        var a = this.defaults = {animation: "animation-fade", prefixClass: "typeahead", placement: "bottom-left", template: "$typeahead", trigger: "focus", container: !1, keyboard: !0, html: !1, delay: 0, minLength: 1, limit: 6};
        this.$get = ["$window", "$rootScope", "$tooltip", function (b, c, d) {
            function e(b, c) {
                var e = {}, f = angular.extend({}, a, c), g = f.controller;
                e = d(b, f);
                var h = c.scope, i = e.$scope;
                i.$matches = [], i.$activeIndex = 0, i.$activate = function (a) {
                    i.$$postDigest(function () {
                        e.activate(a)
                    })
                }, i.$select = function (a) {
                    i.$$postDigest(function () {
                        e.select(a)
                    })
                }, i.$isVisible = function () {
                    return e.$isVisible()
                }, e.update = function (a) {
                    i.$matches = a, i.$activeIndex >= a.length && (i.$activeIndex = 0)
                }, e.activate = function (a) {
                    i.$activeIndex = a
                }, e.select = function (a) {
                    var c = i.$matches[a].value;
                    g && (g.$setViewValue(c), g.$render(), h && h.$digest()), "focus" === f.trigger ? b[0].blur() : e.$isShown && e.hide(), i.$activeIndex = 0, i.$emit("$typeahead.select", c, a)
                }, e.$isVisible = function () {
                    return f.minLength && g ? i.$matches.length && g.$viewValue.length >= f.minLength : !!i.$matches.length
                }, e.$onMouseDown = function (a) {
                    a.preventDefault(), a.stopPropagation()
                }, e.$onKeyDown = function (a) {
                    if (/(38|40|13)/.test(a.keyCode)) {
                        if (a.preventDefault(), a.stopPropagation(), 13 === a.keyCode)return e.select(i.$activeIndex);
                        38 === a.keyCode && i.$activeIndex > 0 ? i.$activeIndex-- : 40 === a.keyCode && i.$activeIndex < i.$matches.length - 1 ? i.$activeIndex++ : angular.isUndefined(i.$activeIndex) && (i.$activeIndex = 0), i.$digest()
                    }
                };
                var j = e.show;
                e.show = function () {
                    j(), setTimeout(function () {
                        e.$element.on("mousedown", e.$onMouseDown), f.keyboard && b.on("keydown", e.$onKeyDown)
                    })
                };
                var k = e.hide;
                return e.hide = function () {
                    e.$element.off("mousedown", e.$onMouseDown), f.keyboard && b.off("keydown", e.$onKeyDown), k()
                }, e
            }

            angular.element(b.document.body);
            return e.defaults = a, e
        }]
    }).directive("bsTypeahead", ["$window", "$parse", "$q", "$typeahead", "$parseOptions", function (a, b, c, d, e) {
        var f = d.defaults;
        return{restrict: "EAC", require: "ngModel", link: function (a, b, c, g) {
            var h = {scope: a, controller: g};
            angular.forEach(["placement", "container", "delay", "trigger", "keyboard", "html", "animation", "template", "limit", "minLength"], function (a) {
                angular.isDefined(c[a]) && (h[a] = c[a])
            });
            var i = h.limit || f.limit, j = e(c.ngOptions + " | filter:$viewValue | limitTo:" + i), k = d(b, h);
            a.$watch(c.ngModel, function () {
                j.valuesFn(a, g).then(function (a) {
                    a.length > i && (a = a.slice(0, i)), k.update(a)
                })
            }), a.$on("$destroy", function () {
                k.destroy(), h = null, k = null
            })
        }}
    }])
}(window, document), function () {
    "use strict";
    angular.module("mgcrea.ngStrap.datepicker").run(["$templateCache", function (a) {
        a.put("datepicker/datepicker.tpl.html", '<div class="dropdown-menu datepicker"><table tabindex="-1" height="100%"><thead><tr class="text-center"><th><button type="button" class="btn btn-default pull-left" ng-click="$selectPane(-1)"><i class="glyphicon glyphicon-chevron-left"></i></button></th><th colspan="5" style="width: 100%"><button type="button" class="btn btn-default btn-block text-strong" ng-click="$toggleMode()"><strong style="text-transform: capitalize" ng-bind="title"></strong></button></th><th><button type="button" class="btn btn-default pull-right" ng-click="$selectPane(+1)"><i class="glyphicon glyphicon-chevron-right"></i></button></th></tr><tr ng-show2="labels" ng-bind-html="labels"></tr></thead><tbody><tr ng-repeat="(i, row) in rows"><td colspan="7" style="letter-spacing: -4px"><span ng-repeat="(j, el) in row" class="text-center"><button type="button" class="btn btn-default" style="height:{{height}}px;width:{{width}}%" ng-class="{\'btn-primary\': el.selected}" ng-click="$select(el.date)" ng-disabled="el.disabled"><span ng-class="{\'text-muted\': el.muted}" ng-bind="el.label"></span></button></span></td></tr></tbody></table></div>')
    }]), angular.module("mgcrea.ngStrap.select").run(["$templateCache", function (a) {
        a.put("select/select.tpl.html", '<ul tabindex="-1" class="select dropdown-menu" ng-show="$isVisible()" role="select"><li role="presentation" ng-repeat="match in $matches" ng-class="{active: $isActive($index)}"><a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a> <i class="glyphicon glyphicon-ok" ng-if="$isMultiple"></i></li></ul>')
    }])
}(window, document);
//# sourceMappingURL=angular-strap.min.map