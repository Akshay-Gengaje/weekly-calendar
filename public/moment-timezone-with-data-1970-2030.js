!(function (a, i) {
  "use strict";
  "object" == typeof module && module.exports
    ? (module.exports = i(require("moment")))
    : "function" == typeof define && define.amd
      ? define(["moment"], i)
      : i(a.moment);
})(this, function (o) {
  "use strict";
  void 0 === o.version && o.default && (o = o.default);
  var i,
    s = {},
    c = {},
    A = {},
    u = {},
    m = {},
    a =
      ((o && "string" == typeof o.version) ||
        D(
          "Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/"
        ),
      o.version.split(".")),
    r = +a[0],
    e = +a[1];
  function n(a) {
    return 96 < a ? a - 87 : 64 < a ? a - 29 : a - 48;
  }
  function t(a) {
    var i = 0,
      r = a.split("."),
      e = r[0],
      o = r[1] || "",
      c = 1,
      A = 0,
      r = 1;
    for (45 === a.charCodeAt(0) && (r = -(i = 1)); i < e.length; i++)
      A = 60 * A + n(e.charCodeAt(i));
    for (i = 0; i < o.length; i++) (c /= 60), (A += n(o.charCodeAt(i)) * c);
    return A * r;
  }
  function l(a) {
    for (var i = 0; i < a.length; i++) a[i] = t(a[i]);
  }
  function f(a, i) {
    for (var r = [], e = 0; e < i.length; e++) r[e] = a[i[e]];
    return r;
  }
  function p(a) {
    for (
      var a = a.split("|"),
        i = a[2].split(" "),
        r = a[3].split(""),
        e = a[4].split(" "),
        o = (l(i), l(r), l(e), e),
        c = r.length,
        A = 0;
      A < c;
      A++
    )
      o[A] = Math.round((o[A - 1] || 0) + 6e4 * o[A]);
    return (
      (o[c - 1] = 1 / 0),
      {
        name: a[0],
        abbrs: f(a[1].split(" "), r),
        offsets: f(i, r),
        untils: e,
        population: 0 | a[5],
      }
    );
  }
  function b(a) {
    a && this._set(p(a));
  }
  function M(a, i) {
    (this.name = a), (this.zones = i);
  }
  function h(a) {
    var i = a.toTimeString(),
      r = i.match(/\([a-z ]+\)/i);
    "GMT" ===
      (r =
        r && r[0]
          ? (r = r[0].match(/[A-Z]/g))
            ? r.join("")
            : void 0
          : (r = i.match(/[A-Z]{3,5}/g))
            ? r[0]
            : void 0) && (r = void 0),
      (this.at = +a),
      (this.abbr = r),
      (this.offset = a.getTimezoneOffset());
  }
  function d(a) {
    (this.zone = a), (this.offsetScore = 0), (this.abbrScore = 0);
  }
  function E() {
    for (
      var a,
        i,
        r = new Date().getFullYear() - 2,
        e = new h(new Date(r, 0, 1)),
        o = [e],
        c = 1;
      c < 48;
      c++
    )
      (i = new h(new Date(r, c, 1))).offset !== e.offset &&
        ((a = (function (a, i) {
          for (var r; (r = 6e4 * (((i.at - a.at) / 12e4) | 0)); )
            (r = new h(new Date(a.at + r))).offset === a.offset
              ? (a = r)
              : (i = r);
          return a;
        })(e, i)),
        o.push(a),
        o.push(new h(new Date(a.at + 6e4)))),
        (e = i);
    for (c = 0; c < 4; c++)
      o.push(new h(new Date(r + c, 0, 1))),
        o.push(new h(new Date(r + c, 6, 1)));
    return o;
  }
  function g(a, i) {
    return a.offsetScore !== i.offsetScore
      ? a.offsetScore - i.offsetScore
      : a.abbrScore !== i.abbrScore
        ? a.abbrScore - i.abbrScore
        : a.zone.population !== i.zone.population
          ? i.zone.population - a.zone.population
          : i.zone.name.localeCompare(a.zone.name);
  }
  function z() {
    try {
      var a = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (a && 3 < a.length) {
        var i = u[P(a)];
        if (i) return i;
        D(
          "Moment Timezone found " +
            a +
            " from the Intl api, but did not have that data loaded."
        );
      }
    } catch (a) {}
    for (
      var r,
        e,
        o = E(),
        c = o.length,
        A = (function (a) {
          for (var i, r, e = a.length, o = {}, c = [], A = 0; A < e; A++)
            for (i in (r = m[a[A].offset] || {}))
              r.hasOwnProperty(i) && (o[i] = !0);
          for (A in o) o.hasOwnProperty(A) && c.push(u[A]);
          return c;
        })(o),
        n = [],
        t = 0;
      t < A.length;
      t++
    ) {
      for (r = new d(T(A[t])), e = 0; e < c; e++) r.scoreOffsetAt(o[e]);
      n.push(r);
    }
    return n.sort(g), 0 < n.length ? n[0].zone.name : void 0;
  }
  function P(a) {
    return (a || "").toLowerCase().replace(/\//g, "_");
  }
  function k(a) {
    var i, r, e, o;
    for ("string" == typeof a && (a = [a]), i = 0; i < a.length; i++) {
      (o = P((r = (e = a[i].split("|"))[0]))),
        (s[o] = a[i]),
        (u[o] = r),
        (A = c = t = n = void 0);
      var c,
        A,
        n = o,
        t = e[2].split(" ");
      for (l(t), c = 0; c < t.length; c++)
        (A = t[c]), (m[A] = m[A] || {}), (m[A][n] = !0);
    }
  }
  function T(a, i) {
    a = P(a);
    var r = s[a];
    return r instanceof b
      ? r
      : "string" == typeof r
        ? ((r = new b(r)), (s[a] = r))
        : c[a] && i !== T && (i = T(c[a], T))
          ? ((r = s[a] = new b())._set(i), (r.name = u[a]), r)
          : null;
  }
  function S(a) {
    var i, r, e, o;
    for ("string" == typeof a && (a = [a]), i = 0; i < a.length; i++)
      (e = P((r = a[i].split("|"))[0])),
        (o = P(r[1])),
        (c[e] = o),
        (u[e] = r[0]),
        (c[o] = e),
        (u[o] = r[1]);
  }
  function _(a) {
    k(a.zones), S(a.links);
    var i,
      r,
      e,
      o = a.countries;
    if (o && o.length)
      for (i = 0; i < o.length; i++)
        (r = (e = o[i].split("|"))[0].toUpperCase()),
          (e = e[1].split(" ")),
          (A[r] = new M(r, e));
    y.dataVersion = a.version;
  }
  function C(a) {
    return (
      C.didShowError ||
        ((C.didShowError = !0),
        D(
          "moment.tz.zoneExists('" +
            a +
            "') has been deprecated in favor of !moment.tz.zone('" +
            a +
            "')"
        )),
      !!T(a)
    );
  }
  function B(a) {
    var i = "X" === a._f || "x" === a._f;
    return !(!a._a || void 0 !== a._tzm || i);
  }
  function D(a) {
    "undefined" != typeof console &&
      "function" == typeof console.error &&
      console.error(a);
  }
  function y(a) {
    var i = Array.prototype.slice.call(arguments, 0, -1),
      r = arguments[arguments.length - 1],
      e = T(r),
      i = o.utc.apply(null, i);
    return (
      e && !o.isMoment(a) && B(i) && i.add(e.parse(i), "minutes"), i.tz(r), i
    );
  }
  (r < 2 || (2 == r && e < 6)) &&
    D(
      "Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " +
        o.version +
        ". See momentjs.com"
    ),
    (b.prototype = {
      _set: function (a) {
        (this.name = a.name),
          (this.abbrs = a.abbrs),
          (this.untils = a.untils),
          (this.offsets = a.offsets),
          (this.population = a.population);
      },
      _index: function (a) {
        for (var i = +a, r = this.untils, e = 0; e < r.length; e++)
          if (i < r[e]) return e;
      },
      countries: function () {
        var i = this.name;
        return Object.keys(A).filter(function (a) {
          return -1 !== A[a].zones.indexOf(i);
        });
      },
      parse: function (a) {
        for (
          var i,
            r,
            e,
            o = +a,
            c = this.offsets,
            A = this.untils,
            n = A.length - 1,
            t = 0;
          t < n;
          t++
        )
          if (
            ((i = c[t]),
            (r = c[t + 1]),
            (e = c[t && t - 1]),
            i < r && y.moveAmbiguousForward
              ? (i = r)
              : e < i && y.moveInvalidForward && (i = e),
            o < A[t] - 6e4 * i)
          )
            return c[t];
        return c[n];
      },
      abbr: function (a) {
        return this.abbrs[this._index(a)];
      },
      offset: function (a) {
        return (
          D("zone.offset has been deprecated in favor of zone.utcOffset"),
          this.offsets[this._index(a)]
        );
      },
      utcOffset: function (a) {
        return this.offsets[this._index(a)];
      },
    }),
    (d.prototype.scoreOffsetAt = function (a) {
      (this.offsetScore += Math.abs(this.zone.utcOffset(a.at) - a.offset)),
        this.zone.abbr(a.at).replace(/[^A-Z]/g, "") !== a.abbr &&
          this.abbrScore++;
    }),
    (y.version = "0.5.43"),
    (y.dataVersion = ""),
    (y._zones = s),
    (y._links = c),
    (y._names = u),
    (y._countries = A),
    (y.add = k),
    (y.link = S),
    (y.load = _),
    (y.zone = T),
    (y.zoneExists = C),
    (y.guess = function (a) {
      return (i = i && !a ? i : z());
    }),
    (y.names = function () {
      var a,
        i = [];
      for (a in u)
        u.hasOwnProperty(a) && (s[a] || s[c[a]]) && u[a] && i.push(u[a]);
      return i.sort();
    }),
    (y.Zone = b),
    (y.unpack = p),
    (y.unpackBase60 = t),
    (y.needsOffset = B),
    (y.moveInvalidForward = !0),
    (y.moveAmbiguousForward = !1),
    (y.countries = function () {
      return Object.keys(A);
    }),
    (y.zonesForCountry = function (a, i) {
      var r;
      return (
        (r = (r = a).toUpperCase()),
        (a = A[r] || null)
          ? ((r = a.zones.sort()),
            i
              ? r.map(function (a) {
                  return { name: a, offset: T(a).utcOffset(new Date()) };
                })
              : r)
          : null
      );
    });
  var L,
    a = o.fn;
  function O(a) {
    return function () {
      return this._z ? this._z.abbr(this) : a.call(this);
    };
  }
  function N(a) {
    return function () {
      return (this._z = null), a.apply(this, arguments);
    };
  }
  (o.tz = y),
    (o.defaultZone = null),
    (o.updateOffset = function (a, i) {
      var r,
        e = o.defaultZone;
      void 0 === a._z &&
        (e &&
          B(a) &&
          !a._isUTC &&
          ((a._d = o.utc(a._a)._d), a.utc().add(e.parse(a), "minutes")),
        (a._z = e)),
        a._z &&
          ((e = a._z.utcOffset(a)),
          Math.abs(e) < 16 && (e /= 60),
          void 0 !== a.utcOffset
            ? ((r = a._z), a.utcOffset(-e, i), (a._z = r))
            : a.zone(e, i));
    }),
    (a.tz = function (a, i) {
      if (a) {
        if ("string" != typeof a)
          throw new Error(
            "Time zone name must be a string, got " + a + " [" + typeof a + "]"
          );
        return (
          (this._z = T(a)),
          this._z
            ? o.updateOffset(this, i)
            : D(
                "Moment Timezone has no data for " +
                  a +
                  ". See http://momentjs.com/timezone/docs/#/data-loading/."
              ),
          this
        );
      }
      if (this._z) return this._z.name;
    }),
    (a.zoneName = O(a.zoneName)),
    (a.zoneAbbr = O(a.zoneAbbr)),
    (a.utc = N(a.utc)),
    (a.local = N(a.local)),
    (a.utcOffset =
      ((L = a.utcOffset),
      function () {
        return (
          0 < arguments.length && (this._z = null), L.apply(this, arguments)
        );
      })),
    (o.tz.setDefault = function (a) {
      return (
        (r < 2 || (2 == r && e < 9)) &&
          D(
            "Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " +
              o.version +
              "."
          ),
        (o.defaultZone = a ? T(a) : null),
        o
      );
    });
  a = o.momentProperties;
  return (
    "[object Array]" === Object.prototype.toString.call(a)
      ? (a.push("_z"), a.push("_a"))
      : a && (a._z = null),
    _({
      version: "2023c",
      zones: [
        "Africa/Abidjan|GMT|0|0||48e5",
        "Africa/Nairobi|EAT|-30|0||47e5",
        "Africa/Algiers|CET|-10|0||26e5",
        "Africa/Lagos|WAT|-10|0||17e6",
        "Africa/Khartoum|CAT|-20|0||51e5",
        "Africa/Cairo|EET EEST|-20 -30|0101010101010|29NW0 1cL0 1cN0 1fz0 1a10 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0|15e6",
        "Africa/Casablanca|+00 +01|0 -10|010101010101010101010101|1Vq20 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0|32e5",
        "Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|11e6",
        "Africa/Johannesburg|SAST|-20|0||84e5",
        "Africa/Juba|EAT CAT|-30 -20|01|24nx0|",
        "Africa/Sao_Tome|GMT WAT|0 -10|010|1UQN0 2q00|",
        "Africa/Tripoli|EET|-20|0||11e5",
        "America/Adak|HST HDT|a0 90|01010101010101010101010|1VkA0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|326",
        "America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1Vkz0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|30e4",
        "America/Santo_Domingo|AST|40|0||29e5",
        "America/Fortaleza|-03|30|0||34e5",
        "America/Asuncion|-03 -04|30 40|01010101010101010101010|1Vq30 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0|28e5",
        "America/Panama|EST|50|0||15e5",
        "America/Mexico_City|CST CDT|60 50|01010101010|1VsU0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|20e6",
        "America/Managua|CST|60|0||22e5",
        "America/Caracas|-04|40|0||29e5",
        "America/Lima|-05|50|0||11e6",
        "America/Denver|MST MDT|70 60|01010101010101010101010|1Vkx0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|26e5",
        "America/Campo_Grande|-03 -04|30 40|0101|1Vc30 1HB0 FX0|77e4",
        "America/Chicago|CST CDT|60 50|01010101010101010101010|1Vkw0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|92e5",
        "America/Chihuahua|MST MDT CST|70 60 60|01010101012|1VsV0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|81e4",
        "America/Ciudad_Juarez|MST MDT CST|70 60 60|010101010120101010101010|1Vkx0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1wn0 cm0 EP0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|",
        "America/Phoenix|MST|70|0||42e5",
        "America/Whitehorse|PST PDT MST|80 70 70|0101012|1Vky0 1zb0 Op0 1zb0 Op0 1z90|23e3",
        "America/New_York|EST EDT|50 40|01010101010101010101010|1Vkv0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|21e6",
        "America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1Vky0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|15e6",
        "America/Halifax|AST ADT|40 30|01010101010101010101010|1Vku0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|39e4",
        "America/Godthab|-03 -02 -01|30 20 10|0101010101012121212121|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 2so0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|17e3",
        "America/Grand_Turk|AST EDT EST|40 40 50|01212121212121212121212|1Vkv0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|37e2",
        "America/Havana|CST CDT|50 40|01010101010101010101010|1Vkt0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0|21e5",
        "America/Mazatlan|MST MDT|70 60|01010101010|1VsV0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0|44e4",
        "America/Metlakatla|AKST AKDT PST|90 80 80|012010101010101010101010|1Vkz0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|14e2",
        "America/Miquelon|-03 -02|30 20|01010101010101010101010|1Vkt0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|61e2",
        "America/Noronha|-02|20|0||30e2",
        "America/Ojinaga|MST MDT CST CDT|70 60 60 50|01010101012323232323232|1Vkx0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1wn0 Rc0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|23e3",
        "America/Santiago|-03 -04|30 40|01010101010101010101010|1VJD0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|62e5",
        "America/Sao_Paulo|-02 -03|20 30|0101|1Vc20 1HB0 FX0|20e6",
        "Atlantic/Azores|-01 +00|10 0|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e4",
        "America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1Vktu 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0|11e4",
        "Antarctica/Casey|+11 +08|-b0 -80|0101010|1Vkh0 1o30 14k0 1kr0 12l0 1o01|10",
        "Asia/Bangkok|+07|-70|0||15e6",
        "Asia/Vladivostok|+10|-a0|0||60e4",
        "Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1VsE0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|40e5",
        "Asia/Tashkent|+05|-50|0||23e5",
        "Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1VsC0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00|14e5",
        "Europe/Istanbul|+03|-30|0||13e6",
        "Antarctica/Troll|+00 +02|0 -20|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|40",
        "Asia/Dhaka|+06|-60|0||16e6",
        "Asia/Amman|EET EEST +03|-20 -30 -30|01010101012|1VrW0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 LA0 1C00|25e5",
        "Asia/Kamchatka|+12|-c0|0||18e4",
        "Asia/Dubai|+04|-40|0||39e5",
        "Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1VpW0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|22e5",
        "Asia/Kuala_Lumpur|+08|-80|0||71e5",
        "Asia/Kolkata|IST|-5u|0||15e6",
        "Asia/Chita|+09|-90|0||33e4",
        "Asia/Shanghai|CST|-80|0||23e6",
        "Asia/Colombo|+0530|-5u|0||22e5",
        "Asia/Damascus|EET EEST +03|-20 -30 -30|01010101012|1VrW0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0|26e5",
        "Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|35e5",
        "Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1Vpz0 1qL0 11c0 1on0 11B0 1o00 11A0 1qo0 XA0 1qp0 1cN0 1cL0 17d0 1in0 14p0 1lb0 11B0 1nX0 11B0 1qL0 WN0 1qL0|18e5",
        "Asia/Hong_Kong|HKT|-80|0||73e5",
        "Asia/Jakarta|WIB|-70|0||31e6",
        "Asia/Jayapura|WIT|-90|0||26e4",
        "Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1Vpc0 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0|81e4",
        "Asia/Kabul|+0430|-4u|0||46e5",
        "Asia/Karachi|PKT|-50|0||24e6",
        "Asia/Kathmandu|+0545|-5J|0||12e5",
        "Asia/Sakhalin|+11|-b0|0||58e4",
        "Asia/Makassar|WITA|-80|0||15e5",
        "Asia/Manila|PST|-80|0||24e6",
        "Asia/Pyongyang|KST KST|-8u -90|01|1VGf0|29e5",
        "Asia/Qyzylorda|+06 +05|-60 -50|01|1Xei0|73e4",
        "Asia/Rangoon|+0630|-6u|0||48e5",
        "Asia/Seoul|KST|-90|0||23e6",
        "Asia/Tehran|+0330 +0430|-3u -4u|01010101010|1VoIu 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0|14e6",
        "Asia/Tokyo|JST|-90|0||38e6",
        "Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|27e5",
        "Atlantic/Cape_Verde|-01|10|0||50e4",
        "Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1VsEu 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|11e5",
        "Australia/Brisbane|AEST|-a0|0||20e5",
        "Australia/Darwin|ACST|-9u|0||12e4",
        "Australia/Eucla|+0845|-8J|0||368",
        "Australia/Lord_Howe|+11 +1030|-b0 -au|01010101010101010101010|1VsD0 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu|347",
        "Australia/Perth|AWST|-80|0||18e5",
        "Pacific/Easter|-05 -06|50 60|01010101010101010101010|1VJD0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|30e2",
        "Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|12e5",
        "Etc/GMT-1|+01|-10|0||",
        "Pacific/Tongatapu|+13|-d0|0||75e3",
        "Pacific/Kiritimati|+14|-e0|0||51e2",
        "Etc/GMT-2|+02|-20|0||",
        "Pacific/Tahiti|-10|a0|0||18e4",
        "Pacific/Niue|-11|b0|0||12e2",
        "Etc/GMT+12|-12|c0|0||",
        "Pacific/Galapagos|-06|60|0||25e3",
        "Etc/GMT+7|-07|70|0||",
        "Pacific/Pitcairn|-08|80|0||56",
        "Pacific/Gambier|-09|90|0||125",
        "Etc/UTC|UTC|0|0||",
        "Europe/London|GMT BST|0 -10|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|10e6",
        "Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1Vq00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|67e4",
        "Europe/Moscow|MSK|-30|0||16e6",
        "Europe/Volgograd|MSK +04|-30 -40|010|1WQL0 5gn0|10e5",
        "Pacific/Honolulu|HST|a0|0||37e4",
        "MET|MET MEST|-10 -20|01010101010101010101010|1Vq10 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|",
        "Pacific/Chatham|+1345 +1245|-dJ -cJ|01010101010101010101010|1VsC0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00|600",
        "Pacific/Apia|+14 +13|-e0 -d0|01010101|1VsC0 1cM0 1fA0 1a00 1fA0 1a00 1fA0|37e3",
        "Pacific/Fiji|+13 +12|-d0 -c0|01010101|1UVO0 1VA0 s00 20o0 pc0 2hc0 bc0|88e4",
        "Pacific/Guam|ChST|-a0|0||17e4",
        "Pacific/Marquesas|-0930|9u|0||86e2",
        "Pacific/Pago_Pago|SST|b0|0||37e2",
        "Pacific/Norfolk|+11 +12|-b0 -c0|01010101010101010101|219P0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0|25e4",
      ],
      links: [
        "Africa/Abidjan|Africa/Accra",
        "Africa/Abidjan|Africa/Bamako",
        "Africa/Abidjan|Africa/Banjul",
        "Africa/Abidjan|Africa/Bissau",
        "Africa/Abidjan|Africa/Conakry",
        "Africa/Abidjan|Africa/Dakar",
        "Africa/Abidjan|Africa/Freetown",
        "Africa/Abidjan|Africa/Lome",
        "Africa/Abidjan|Africa/Monrovia",
        "Africa/Abidjan|Africa/Nouakchott",
        "Africa/Abidjan|Africa/Ouagadougou",
        "Africa/Abidjan|Africa/Timbuktu",
        "Africa/Abidjan|America/Danmarkshavn",
        "Africa/Abidjan|Atlantic/Reykjavik",
        "Africa/Abidjan|Atlantic/St_Helena",
        "Africa/Abidjan|Etc/GMT",
        "Africa/Abidjan|Etc/GMT+0",
        "Africa/Abidjan|Etc/GMT-0",
        "Africa/Abidjan|Etc/GMT0",
        "Africa/Abidjan|Etc/Greenwich",
        "Africa/Abidjan|GMT",
        "Africa/Abidjan|GMT+0",
        "Africa/Abidjan|GMT-0",
        "Africa/Abidjan|GMT0",
        "Africa/Abidjan|Greenwich",
        "Africa/Abidjan|Iceland",
        "Africa/Algiers|Africa/Tunis",
        "Africa/Cairo|Egypt",
        "Africa/Casablanca|Africa/El_Aaiun",
        "Africa/Johannesburg|Africa/Maseru",
        "Africa/Johannesburg|Africa/Mbabane",
        "Africa/Khartoum|Africa/Blantyre",
        "Africa/Khartoum|Africa/Bujumbura",
        "Africa/Khartoum|Africa/Gaborone",
        "Africa/Khartoum|Africa/Harare",
        "Africa/Khartoum|Africa/Kigali",
        "Africa/Khartoum|Africa/Lubumbashi",
        "Africa/Khartoum|Africa/Lusaka",
        "Africa/Khartoum|Africa/Maputo",
        "Africa/Khartoum|Africa/Windhoek",
        "Africa/Lagos|Africa/Bangui",
        "Africa/Lagos|Africa/Brazzaville",
        "Africa/Lagos|Africa/Douala",
        "Africa/Lagos|Africa/Kinshasa",
        "Africa/Lagos|Africa/Libreville",
        "Africa/Lagos|Africa/Luanda",
        "Africa/Lagos|Africa/Malabo",
        "Africa/Lagos|Africa/Ndjamena",
        "Africa/Lagos|Africa/Niamey",
        "Africa/Lagos|Africa/Porto-Novo",
        "Africa/Nairobi|Africa/Addis_Ababa",
        "Africa/Nairobi|Africa/Asmara",
        "Africa/Nairobi|Africa/Asmera",
        "Africa/Nairobi|Africa/Dar_es_Salaam",
        "Africa/Nairobi|Africa/Djibouti",
        "Africa/Nairobi|Africa/Kampala",
        "Africa/Nairobi|Africa/Mogadishu",
        "Africa/Nairobi|Indian/Antananarivo",
        "Africa/Nairobi|Indian/Comoro",
        "Africa/Nairobi|Indian/Mayotte",
        "Africa/Tripoli|Europe/Kaliningrad",
        "Africa/Tripoli|Libya",
        "America/Adak|America/Atka",
        "America/Adak|US/Aleutian",
        "America/Anchorage|America/Juneau",
        "America/Anchorage|America/Nome",
        "America/Anchorage|America/Sitka",
        "America/Anchorage|America/Yakutat",
        "America/Anchorage|US/Alaska",
        "America/Campo_Grande|America/Cuiaba",
        "America/Caracas|America/Boa_Vista",
        "America/Caracas|America/Guyana",
        "America/Caracas|America/La_Paz",
        "America/Caracas|America/Manaus",
        "America/Caracas|America/Porto_Velho",
        "America/Caracas|Brazil/West",
        "America/Caracas|Etc/GMT+4",
        "America/Chicago|America/Indiana/Knox",
        "America/Chicago|America/Indiana/Tell_City",
        "America/Chicago|America/Knox_IN",
        "America/Chicago|America/Matamoros",
        "America/Chicago|America/Menominee",
        "America/Chicago|America/North_Dakota/Beulah",
        "America/Chicago|America/North_Dakota/Center",
        "America/Chicago|America/North_Dakota/New_Salem",
        "America/Chicago|America/Rainy_River",
        "America/Chicago|America/Rankin_Inlet",
        "America/Chicago|America/Resolute",
        "America/Chicago|America/Winnipeg",
        "America/Chicago|CST6CDT",
        "America/Chicago|Canada/Central",
        "America/Chicago|US/Central",
        "America/Chicago|US/Indiana-Starke",
        "America/Denver|America/Boise",
        "America/Denver|America/Cambridge_Bay",
        "America/Denver|America/Edmonton",
        "America/Denver|America/Inuvik",
        "America/Denver|America/Shiprock",
        "America/Denver|America/Yellowknife",
        "America/Denver|Canada/Mountain",
        "America/Denver|MST7MDT",
        "America/Denver|Navajo",
        "America/Denver|US/Mountain",
        "America/Fortaleza|America/Araguaina",
        "America/Fortaleza|America/Argentina/Buenos_Aires",
        "America/Fortaleza|America/Argentina/Catamarca",
        "America/Fortaleza|America/Argentina/ComodRivadavia",
        "America/Fortaleza|America/Argentina/Cordoba",
        "America/Fortaleza|America/Argentina/Jujuy",
        "America/Fortaleza|America/Argentina/La_Rioja",
        "America/Fortaleza|America/Argentina/Mendoza",
        "America/Fortaleza|America/Argentina/Rio_Gallegos",
        "America/Fortaleza|America/Argentina/Salta",
        "America/Fortaleza|America/Argentina/San_Juan",
        "America/Fortaleza|America/Argentina/San_Luis",
        "America/Fortaleza|America/Argentina/Tucuman",
        "America/Fortaleza|America/Argentina/Ushuaia",
        "America/Fortaleza|America/Bahia",
        "America/Fortaleza|America/Belem",
        "America/Fortaleza|America/Buenos_Aires",
        "America/Fortaleza|America/Catamarca",
        "America/Fortaleza|America/Cayenne",
        "America/Fortaleza|America/Cordoba",
        "America/Fortaleza|America/Jujuy",
        "America/Fortaleza|America/Maceio",
        "America/Fortaleza|America/Mendoza",
        "America/Fortaleza|America/Montevideo",
        "America/Fortaleza|America/Paramaribo",
        "America/Fortaleza|America/Punta_Arenas",
        "America/Fortaleza|America/Recife",
        "America/Fortaleza|America/Rosario",
        "America/Fortaleza|America/Santarem",
        "America/Fortaleza|Antarctica/Palmer",
        "America/Fortaleza|Antarctica/Rothera",
        "America/Fortaleza|Atlantic/Stanley",
        "America/Fortaleza|Etc/GMT+3",
        "America/Godthab|America/Nuuk",
        "America/Halifax|America/Glace_Bay",
        "America/Halifax|America/Goose_Bay",
        "America/Halifax|America/Moncton",
        "America/Halifax|America/Thule",
        "America/Halifax|Atlantic/Bermuda",
        "America/Halifax|Canada/Atlantic",
        "America/Havana|Cuba",
        "America/Lima|America/Bogota",
        "America/Lima|America/Eirunepe",
        "America/Lima|America/Guayaquil",
        "America/Lima|America/Porto_Acre",
        "America/Lima|America/Rio_Branco",
        "America/Lima|Brazil/Acre",
        "America/Lima|Etc/GMT+5",
        "America/Los_Angeles|America/Ensenada",
        "America/Los_Angeles|America/Santa_Isabel",
        "America/Los_Angeles|America/Tijuana",
        "America/Los_Angeles|America/Vancouver",
        "America/Los_Angeles|Canada/Pacific",
        "America/Los_Angeles|Mexico/BajaNorte",
        "America/Los_Angeles|PST8PDT",
        "America/Los_Angeles|US/Pacific",
        "America/Managua|America/Belize",
        "America/Managua|America/Costa_Rica",
        "America/Managua|America/El_Salvador",
        "America/Managua|America/Guatemala",
        "America/Managua|America/Regina",
        "America/Managua|America/Swift_Current",
        "America/Managua|America/Tegucigalpa",
        "America/Managua|Canada/Saskatchewan",
        "America/Mazatlan|Mexico/BajaSur",
        "America/Mexico_City|America/Bahia_Banderas",
        "America/Mexico_City|America/Merida",
        "America/Mexico_City|America/Monterrey",
        "America/Mexico_City|Mexico/General",
        "America/New_York|America/Detroit",
        "America/New_York|America/Fort_Wayne",
        "America/New_York|America/Indiana/Indianapolis",
        "America/New_York|America/Indiana/Marengo",
        "America/New_York|America/Indiana/Petersburg",
        "America/New_York|America/Indiana/Vevay",
        "America/New_York|America/Indiana/Vincennes",
        "America/New_York|America/Indiana/Winamac",
        "America/New_York|America/Indianapolis",
        "America/New_York|America/Iqaluit",
        "America/New_York|America/Kentucky/Louisville",
        "America/New_York|America/Kentucky/Monticello",
        "America/New_York|America/Louisville",
        "America/New_York|America/Montreal",
        "America/New_York|America/Nassau",
        "America/New_York|America/Nipigon",
        "America/New_York|America/Pangnirtung",
        "America/New_York|America/Port-au-Prince",
        "America/New_York|America/Thunder_Bay",
        "America/New_York|America/Toronto",
        "America/New_York|Canada/Eastern",
        "America/New_York|EST5EDT",
        "America/New_York|US/East-Indiana",
        "America/New_York|US/Eastern",
        "America/New_York|US/Michigan",
        "America/Noronha|Atlantic/South_Georgia",
        "America/Noronha|Brazil/DeNoronha",
        "America/Noronha|Etc/GMT+2",
        "America/Panama|America/Atikokan",
        "America/Panama|America/Cancun",
        "America/Panama|America/Cayman",
        "America/Panama|America/Coral_Harbour",
        "America/Panama|America/Jamaica",
        "America/Panama|EST",
        "America/Panama|Jamaica",
        "America/Phoenix|America/Creston",
        "America/Phoenix|America/Dawson_Creek",
        "America/Phoenix|America/Fort_Nelson",
        "America/Phoenix|America/Hermosillo",
        "America/Phoenix|MST",
        "America/Phoenix|US/Arizona",
        "America/Santiago|Chile/Continental",
        "America/Santo_Domingo|America/Anguilla",
        "America/Santo_Domingo|America/Antigua",
        "America/Santo_Domingo|America/Aruba",
        "America/Santo_Domingo|America/Barbados",
        "America/Santo_Domingo|America/Blanc-Sablon",
        "America/Santo_Domingo|America/Curacao",
        "America/Santo_Domingo|America/Dominica",
        "America/Santo_Domingo|America/Grenada",
        "America/Santo_Domingo|America/Guadeloupe",
        "America/Santo_Domingo|America/Kralendijk",
        "America/Santo_Domingo|America/Lower_Princes",
        "America/Santo_Domingo|America/Marigot",
        "America/Santo_Domingo|America/Martinique",
        "America/Santo_Domingo|America/Montserrat",
        "America/Santo_Domingo|America/Port_of_Spain",
        "America/Santo_Domingo|America/Puerto_Rico",
        "America/Santo_Domingo|America/St_Barthelemy",
        "America/Santo_Domingo|America/St_Kitts",
        "America/Santo_Domingo|America/St_Lucia",
        "America/Santo_Domingo|America/St_Thomas",
        "America/Santo_Domingo|America/St_Vincent",
        "America/Santo_Domingo|America/Tortola",
        "America/Santo_Domingo|America/Virgin",
        "America/Sao_Paulo|Brazil/East",
        "America/St_Johns|Canada/Newfoundland",
        "America/Whitehorse|America/Dawson",
        "America/Whitehorse|Canada/Yukon",
        "Asia/Bangkok|Antarctica/Davis",
        "Asia/Bangkok|Asia/Barnaul",
        "Asia/Bangkok|Asia/Ho_Chi_Minh",
        "Asia/Bangkok|Asia/Hovd",
        "Asia/Bangkok|Asia/Krasnoyarsk",
        "Asia/Bangkok|Asia/Novokuznetsk",
        "Asia/Bangkok|Asia/Novosibirsk",
        "Asia/Bangkok|Asia/Phnom_Penh",
        "Asia/Bangkok|Asia/Saigon",
        "Asia/Bangkok|Asia/Tomsk",
        "Asia/Bangkok|Asia/Vientiane",
        "Asia/Bangkok|Etc/GMT-7",
        "Asia/Bangkok|Indian/Christmas",
        "Asia/Chita|Asia/Dili",
        "Asia/Chita|Asia/Khandyga",
        "Asia/Chita|Asia/Yakutsk",
        "Asia/Chita|Etc/GMT-9",
        "Asia/Chita|Pacific/Palau",
        "Asia/Dhaka|Antarctica/Vostok",
        "Asia/Dhaka|Asia/Almaty",
        "Asia/Dhaka|Asia/Bishkek",
        "Asia/Dhaka|Asia/Dacca",
        "Asia/Dhaka|Asia/Kashgar",
        "Asia/Dhaka|Asia/Omsk",
        "Asia/Dhaka|Asia/Qostanay",
        "Asia/Dhaka|Asia/Thimbu",
        "Asia/Dhaka|Asia/Thimphu",
        "Asia/Dhaka|Asia/Urumqi",
        "Asia/Dhaka|Etc/GMT-6",
        "Asia/Dhaka|Indian/Chagos",
        "Asia/Dubai|Asia/Baku",
        "Asia/Dubai|Asia/Muscat",
        "Asia/Dubai|Asia/Tbilisi",
        "Asia/Dubai|Asia/Yerevan",
        "Asia/Dubai|Etc/GMT-4",
        "Asia/Dubai|Europe/Astrakhan",
        "Asia/Dubai|Europe/Samara",
        "Asia/Dubai|Europe/Saratov",
        "Asia/Dubai|Europe/Ulyanovsk",
        "Asia/Dubai|Indian/Mahe",
        "Asia/Dubai|Indian/Mauritius",
        "Asia/Dubai|Indian/Reunion",
        "Asia/Gaza|Asia/Hebron",
        "Asia/Hong_Kong|Hongkong",
        "Asia/Jakarta|Asia/Pontianak",
        "Asia/Jerusalem|Asia/Tel_Aviv",
        "Asia/Jerusalem|Israel",
        "Asia/Kamchatka|Asia/Anadyr",
        "Asia/Kamchatka|Etc/GMT-12",
        "Asia/Kamchatka|Kwajalein",
        "Asia/Kamchatka|Pacific/Funafuti",
        "Asia/Kamchatka|Pacific/Kwajalein",
        "Asia/Kamchatka|Pacific/Majuro",
        "Asia/Kamchatka|Pacific/Nauru",
        "Asia/Kamchatka|Pacific/Tarawa",
        "Asia/Kamchatka|Pacific/Wake",
        "Asia/Kamchatka|Pacific/Wallis",
        "Asia/Kathmandu|Asia/Katmandu",
        "Asia/Kolkata|Asia/Calcutta",
        "Asia/Kuala_Lumpur|Asia/Brunei",
        "Asia/Kuala_Lumpur|Asia/Choibalsan",
        "Asia/Kuala_Lumpur|Asia/Irkutsk",
        "Asia/Kuala_Lumpur|Asia/Kuching",
        "Asia/Kuala_Lumpur|Asia/Singapore",
        "Asia/Kuala_Lumpur|Asia/Ulaanbaatar",
        "Asia/Kuala_Lumpur|Asia/Ulan_Bator",
        "Asia/Kuala_Lumpur|Etc/GMT-8",
        "Asia/Kuala_Lumpur|Singapore",
        "Asia/Makassar|Asia/Ujung_Pandang",
        "Asia/Rangoon|Asia/Yangon",
        "Asia/Rangoon|Indian/Cocos",
        "Asia/Sakhalin|Asia/Magadan",
        "Asia/Sakhalin|Asia/Srednekolymsk",
        "Asia/Sakhalin|Etc/GMT-11",
        "Asia/Sakhalin|Pacific/Bougainville",
        "Asia/Sakhalin|Pacific/Efate",
        "Asia/Sakhalin|Pacific/Guadalcanal",
        "Asia/Sakhalin|Pacific/Kosrae",
        "Asia/Sakhalin|Pacific/Noumea",
        "Asia/Sakhalin|Pacific/Pohnpei",
        "Asia/Sakhalin|Pacific/Ponape",
        "Asia/Seoul|ROK",
        "Asia/Shanghai|Asia/Chongqing",
        "Asia/Shanghai|Asia/Chungking",
        "Asia/Shanghai|Asia/Harbin",
        "Asia/Shanghai|Asia/Macao",
        "Asia/Shanghai|Asia/Macau",
        "Asia/Shanghai|Asia/Taipei",
        "Asia/Shanghai|PRC",
        "Asia/Shanghai|ROC",
        "Asia/Tashkent|Antarctica/Mawson",
        "Asia/Tashkent|Asia/Aqtau",
        "Asia/Tashkent|Asia/Aqtobe",
        "Asia/Tashkent|Asia/Ashgabat",
        "Asia/Tashkent|Asia/Ashkhabad",
        "Asia/Tashkent|Asia/Atyrau",
        "Asia/Tashkent|Asia/Dushanbe",
        "Asia/Tashkent|Asia/Oral",
        "Asia/Tashkent|Asia/Samarkand",
        "Asia/Tashkent|Asia/Yekaterinburg",
        "Asia/Tashkent|Etc/GMT-5",
        "Asia/Tashkent|Indian/Kerguelen",
        "Asia/Tashkent|Indian/Maldives",
        "Asia/Tehran|Iran",
        "Asia/Tokyo|Japan",
        "Asia/Vladivostok|Antarctica/DumontDUrville",
        "Asia/Vladivostok|Asia/Ust-Nera",
        "Asia/Vladivostok|Etc/GMT-10",
        "Asia/Vladivostok|Pacific/Chuuk",
        "Asia/Vladivostok|Pacific/Port_Moresby",
        "Asia/Vladivostok|Pacific/Truk",
        "Asia/Vladivostok|Pacific/Yap",
        "Atlantic/Azores|America/Scoresbysund",
        "Atlantic/Cape_Verde|Etc/GMT+1",
        "Australia/Adelaide|Australia/Broken_Hill",
        "Australia/Adelaide|Australia/South",
        "Australia/Adelaide|Australia/Yancowinna",
        "Australia/Brisbane|Australia/Lindeman",
        "Australia/Brisbane|Australia/Queensland",
        "Australia/Darwin|Australia/North",
        "Australia/Lord_Howe|Australia/LHI",
        "Australia/Perth|Australia/West",
        "Australia/Sydney|Antarctica/Macquarie",
        "Australia/Sydney|Australia/ACT",
        "Australia/Sydney|Australia/Canberra",
        "Australia/Sydney|Australia/Currie",
        "Australia/Sydney|Australia/Hobart",
        "Australia/Sydney|Australia/Melbourne",
        "Australia/Sydney|Australia/NSW",
        "Australia/Sydney|Australia/Tasmania",
        "Australia/Sydney|Australia/Victoria",
        "Etc/UTC|Etc/UCT",
        "Etc/UTC|Etc/Universal",
        "Etc/UTC|Etc/Zulu",
        "Etc/UTC|UCT",
        "Etc/UTC|UTC",
        "Etc/UTC|Universal",
        "Etc/UTC|Zulu",
        "Europe/Athens|Asia/Famagusta",
        "Europe/Athens|Asia/Nicosia",
        "Europe/Athens|EET",
        "Europe/Athens|Europe/Bucharest",
        "Europe/Athens|Europe/Helsinki",
        "Europe/Athens|Europe/Kiev",
        "Europe/Athens|Europe/Kyiv",
        "Europe/Athens|Europe/Mariehamn",
        "Europe/Athens|Europe/Nicosia",
        "Europe/Athens|Europe/Riga",
        "Europe/Athens|Europe/Sofia",
        "Europe/Athens|Europe/Tallinn",
        "Europe/Athens|Europe/Uzhgorod",
        "Europe/Athens|Europe/Vilnius",
        "Europe/Athens|Europe/Zaporozhye",
        "Europe/Chisinau|Europe/Tiraspol",
        "Europe/Dublin|Eire",
        "Europe/Istanbul|Antarctica/Syowa",
        "Europe/Istanbul|Asia/Aden",
        "Europe/Istanbul|Asia/Baghdad",
        "Europe/Istanbul|Asia/Bahrain",
        "Europe/Istanbul|Asia/Istanbul",
        "Europe/Istanbul|Asia/Kuwait",
        "Europe/Istanbul|Asia/Qatar",
        "Europe/Istanbul|Asia/Riyadh",
        "Europe/Istanbul|Etc/GMT-3",
        "Europe/Istanbul|Europe/Minsk",
        "Europe/Istanbul|Turkey",
        "Europe/Lisbon|Atlantic/Canary",
        "Europe/Lisbon|Atlantic/Faeroe",
        "Europe/Lisbon|Atlantic/Faroe",
        "Europe/Lisbon|Atlantic/Madeira",
        "Europe/Lisbon|Portugal",
        "Europe/Lisbon|WET",
        "Europe/London|Europe/Belfast",
        "Europe/London|Europe/Guernsey",
        "Europe/London|Europe/Isle_of_Man",
        "Europe/London|Europe/Jersey",
        "Europe/London|GB",
        "Europe/London|GB-Eire",
        "Europe/Moscow|Europe/Kirov",
        "Europe/Moscow|Europe/Simferopol",
        "Europe/Moscow|W-SU",
        "Europe/Paris|Africa/Ceuta",
        "Europe/Paris|Arctic/Longyearbyen",
        "Europe/Paris|Atlantic/Jan_Mayen",
        "Europe/Paris|CET",
        "Europe/Paris|Europe/Amsterdam",
        "Europe/Paris|Europe/Andorra",
        "Europe/Paris|Europe/Belgrade",
        "Europe/Paris|Europe/Berlin",
        "Europe/Paris|Europe/Bratislava",
        "Europe/Paris|Europe/Brussels",
        "Europe/Paris|Europe/Budapest",
        "Europe/Paris|Europe/Busingen",
        "Europe/Paris|Europe/Copenhagen",
        "Europe/Paris|Europe/Gibraltar",
        "Europe/Paris|Europe/Ljubljana",
        "Europe/Paris|Europe/Luxembourg",
        "Europe/Paris|Europe/Madrid",
        "Europe/Paris|Europe/Malta",
        "Europe/Paris|Europe/Monaco",
        "Europe/Paris|Europe/Oslo",
        "Europe/Paris|Europe/Podgorica",
        "Europe/Paris|Europe/Prague",
        "Europe/Paris|Europe/Rome",
        "Europe/Paris|Europe/San_Marino",
        "Europe/Paris|Europe/Sarajevo",
        "Europe/Paris|Europe/Skopje",
        "Europe/Paris|Europe/Stockholm",
        "Europe/Paris|Europe/Tirane",
        "Europe/Paris|Europe/Vaduz",
        "Europe/Paris|Europe/Vatican",
        "Europe/Paris|Europe/Vienna",
        "Europe/Paris|Europe/Warsaw",
        "Europe/Paris|Europe/Zagreb",
        "Europe/Paris|Europe/Zurich",
        "Europe/Paris|Poland",
        "Pacific/Auckland|Antarctica/McMurdo",
        "Pacific/Auckland|Antarctica/South_Pole",
        "Pacific/Auckland|NZ",
        "Pacific/Chatham|NZ-CHAT",
        "Pacific/Easter|Chile/EasterIsland",
        "Pacific/Galapagos|Etc/GMT+6",
        "Pacific/Gambier|Etc/GMT+9",
        "Pacific/Guam|Pacific/Saipan",
        "Pacific/Honolulu|HST",
        "Pacific/Honolulu|Pacific/Johnston",
        "Pacific/Honolulu|US/Hawaii",
        "Pacific/Kiritimati|Etc/GMT-14",
        "Pacific/Niue|Etc/GMT+11",
        "Pacific/Pago_Pago|Pacific/Midway",
        "Pacific/Pago_Pago|Pacific/Samoa",
        "Pacific/Pago_Pago|US/Samoa",
        "Pacific/Pitcairn|Etc/GMT+8",
        "Pacific/Tahiti|Etc/GMT+10",
        "Pacific/Tahiti|Pacific/Rarotonga",
        "Pacific/Tongatapu|Etc/GMT-13",
        "Pacific/Tongatapu|Pacific/Enderbury",
        "Pacific/Tongatapu|Pacific/Fakaofo",
        "Pacific/Tongatapu|Pacific/Kanton",
      ],
      countries: [
        "AD|Europe/Andorra",
        "AE|Asia/Dubai",
        "AF|Asia/Kabul",
        "AG|America/Puerto_Rico America/Antigua",
        "AI|America/Puerto_Rico America/Anguilla",
        "AL|Europe/Tirane",
        "AM|Asia/Yerevan",
        "AO|Africa/Lagos Africa/Luanda",
        "AQ|Antarctica/Casey Antarctica/Davis Antarctica/Mawson Antarctica/Palmer Antarctica/Rothera Antarctica/Troll Asia/Urumqi Pacific/Auckland Pacific/Port_Moresby Asia/Riyadh Antarctica/McMurdo Antarctica/DumontDUrville Antarctica/Syowa Antarctica/Vostok",
        "AR|America/Argentina/Buenos_Aires America/Argentina/Cordoba America/Argentina/Salta America/Argentina/Jujuy America/Argentina/Tucuman America/Argentina/Catamarca America/Argentina/La_Rioja America/Argentina/San_Juan America/Argentina/Mendoza America/Argentina/San_Luis America/Argentina/Rio_Gallegos America/Argentina/Ushuaia",
        "AS|Pacific/Pago_Pago",
        "AT|Europe/Vienna",
        "AU|Australia/Lord_Howe Antarctica/Macquarie Australia/Hobart Australia/Melbourne Australia/Sydney Australia/Broken_Hill Australia/Brisbane Australia/Lindeman Australia/Adelaide Australia/Darwin Australia/Perth Australia/Eucla",
        "AW|America/Puerto_Rico America/Aruba",
        "AX|Europe/Helsinki Europe/Mariehamn",
        "AZ|Asia/Baku",
        "BA|Europe/Belgrade Europe/Sarajevo",
        "BB|America/Barbados",
        "BD|Asia/Dhaka",
        "BE|Europe/Brussels",
        "BF|Africa/Abidjan Africa/Ouagadougou",
        "BG|Europe/Sofia",
        "BH|Asia/Qatar Asia/Bahrain",
        "BI|Africa/Maputo Africa/Bujumbura",
        "BJ|Africa/Lagos Africa/Porto-Novo",
        "BL|America/Puerto_Rico America/St_Barthelemy",
        "BM|Atlantic/Bermuda",
        "BN|Asia/Kuching Asia/Brunei",
        "BO|America/La_Paz",
        "BQ|America/Puerto_Rico America/Kralendijk",
        "BR|America/Noronha America/Belem America/Fortaleza America/Recife America/Araguaina America/Maceio America/Bahia America/Sao_Paulo America/Campo_Grande America/Cuiaba America/Santarem America/Porto_Velho America/Boa_Vista America/Manaus America/Eirunepe America/Rio_Branco",
        "BS|America/Toronto America/Nassau",
        "BT|Asia/Thimphu",
        "BW|Africa/Maputo Africa/Gaborone",
        "BY|Europe/Minsk",
        "BZ|America/Belize",
        "CA|America/St_Johns America/Halifax America/Glace_Bay America/Moncton America/Goose_Bay America/Toronto America/Iqaluit America/Winnipeg America/Resolute America/Rankin_Inlet America/Regina America/Swift_Current America/Edmonton America/Cambridge_Bay America/Inuvik America/Dawson_Creek America/Fort_Nelson America/Whitehorse America/Dawson America/Vancouver America/Panama America/Puerto_Rico America/Phoenix America/Blanc-Sablon America/Atikokan America/Creston",
        "CC|Asia/Yangon Indian/Cocos",
        "CD|Africa/Maputo Africa/Lagos Africa/Kinshasa Africa/Lubumbashi",
        "CF|Africa/Lagos Africa/Bangui",
        "CG|Africa/Lagos Africa/Brazzaville",
        "CH|Europe/Zurich",
        "CI|Africa/Abidjan",
        "CK|Pacific/Rarotonga",
        "CL|America/Santiago America/Punta_Arenas Pacific/Easter",
        "CM|Africa/Lagos Africa/Douala",
        "CN|Asia/Shanghai Asia/Urumqi",
        "CO|America/Bogota",
        "CR|America/Costa_Rica",
        "CU|America/Havana",
        "CV|Atlantic/Cape_Verde",
        "CW|America/Puerto_Rico America/Curacao",
        "CX|Asia/Bangkok Indian/Christmas",
        "CY|Asia/Nicosia Asia/Famagusta",
        "CZ|Europe/Prague",
        "DE|Europe/Zurich Europe/Berlin Europe/Busingen",
        "DJ|Africa/Nairobi Africa/Djibouti",
        "DK|Europe/Berlin Europe/Copenhagen",
        "DM|America/Puerto_Rico America/Dominica",
        "DO|America/Santo_Domingo",
        "DZ|Africa/Algiers",
        "EC|America/Guayaquil Pacific/Galapagos",
        "EE|Europe/Tallinn",
        "EG|Africa/Cairo",
        "EH|Africa/El_Aaiun",
        "ER|Africa/Nairobi Africa/Asmara",
        "ES|Europe/Madrid Africa/Ceuta Atlantic/Canary",
        "ET|Africa/Nairobi Africa/Addis_Ababa",
        "FI|Europe/Helsinki",
        "FJ|Pacific/Fiji",
        "FK|Atlantic/Stanley",
        "FM|Pacific/Kosrae Pacific/Port_Moresby Pacific/Guadalcanal Pacific/Chuuk Pacific/Pohnpei",
        "FO|Atlantic/Faroe",
        "FR|Europe/Paris",
        "GA|Africa/Lagos Africa/Libreville",
        "GB|Europe/London",
        "GD|America/Puerto_Rico America/Grenada",
        "GE|Asia/Tbilisi",
        "GF|America/Cayenne",
        "GG|Europe/London Europe/Guernsey",
        "GH|Africa/Abidjan Africa/Accra",
        "GI|Europe/Gibraltar",
        "GL|America/Nuuk America/Danmarkshavn America/Scoresbysund America/Thule",
        "GM|Africa/Abidjan Africa/Banjul",
        "GN|Africa/Abidjan Africa/Conakry",
        "GP|America/Puerto_Rico America/Guadeloupe",
        "GQ|Africa/Lagos Africa/Malabo",
        "GR|Europe/Athens",
        "GS|Atlantic/South_Georgia",
        "GT|America/Guatemala",
        "GU|Pacific/Guam",
        "GW|Africa/Bissau",
        "GY|America/Guyana",
        "HK|Asia/Hong_Kong",
        "HN|America/Tegucigalpa",
        "HR|Europe/Belgrade Europe/Zagreb",
        "HT|America/Port-au-Prince",
        "HU|Europe/Budapest",
        "ID|Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura",
        "IE|Europe/Dublin",
        "IL|Asia/Jerusalem",
        "IM|Europe/London Europe/Isle_of_Man",
        "IN|Asia/Kolkata",
        "IO|Indian/Chagos",
        "IQ|Asia/Baghdad",
        "IR|Asia/Tehran",
        "IS|Africa/Abidjan Atlantic/Reykjavik",
        "IT|Europe/Rome",
        "JE|Europe/London Europe/Jersey",
        "JM|America/Jamaica",
        "JO|Asia/Amman",
        "JP|Asia/Tokyo",
        "KE|Africa/Nairobi",
        "KG|Asia/Bishkek",
        "KH|Asia/Bangkok Asia/Phnom_Penh",
        "KI|Pacific/Tarawa Pacific/Kanton Pacific/Kiritimati",
        "KM|Africa/Nairobi Indian/Comoro",
        "KN|America/Puerto_Rico America/St_Kitts",
        "KP|Asia/Pyongyang",
        "KR|Asia/Seoul",
        "KW|Asia/Riyadh Asia/Kuwait",
        "KY|America/Panama America/Cayman",
        "KZ|Asia/Almaty Asia/Qyzylorda Asia/Qostanay Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral",
        "LA|Asia/Bangkok Asia/Vientiane",
        "LB|Asia/Beirut",
        "LC|America/Puerto_Rico America/St_Lucia",
        "LI|Europe/Zurich Europe/Vaduz",
        "LK|Asia/Colombo",
        "LR|Africa/Monrovia",
        "LS|Africa/Johannesburg Africa/Maseru",
        "LT|Europe/Vilnius",
        "LU|Europe/Brussels Europe/Luxembourg",
        "LV|Europe/Riga",
        "LY|Africa/Tripoli",
        "MA|Africa/Casablanca",
        "MC|Europe/Paris Europe/Monaco",
        "MD|Europe/Chisinau",
        "ME|Europe/Belgrade Europe/Podgorica",
        "MF|America/Puerto_Rico America/Marigot",
        "MG|Africa/Nairobi Indian/Antananarivo",
        "MH|Pacific/Tarawa Pacific/Kwajalein Pacific/Majuro",
        "MK|Europe/Belgrade Europe/Skopje",
        "ML|Africa/Abidjan Africa/Bamako",
        "MM|Asia/Yangon",
        "MN|Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan",
        "MO|Asia/Macau",
        "MP|Pacific/Guam Pacific/Saipan",
        "MQ|America/Martinique",
        "MR|Africa/Abidjan Africa/Nouakchott",
        "MS|America/Puerto_Rico America/Montserrat",
        "MT|Europe/Malta",
        "MU|Indian/Mauritius",
        "MV|Indian/Maldives",
        "MW|Africa/Maputo Africa/Blantyre",
        "MX|America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Chihuahua America/Ciudad_Juarez America/Ojinaga America/Mazatlan America/Bahia_Banderas America/Hermosillo America/Tijuana",
        "MY|Asia/Kuching Asia/Singapore Asia/Kuala_Lumpur",
        "MZ|Africa/Maputo",
        "NA|Africa/Windhoek",
        "NC|Pacific/Noumea",
        "NE|Africa/Lagos Africa/Niamey",
        "NF|Pacific/Norfolk",
        "NG|Africa/Lagos",
        "NI|America/Managua",
        "NL|Europe/Brussels Europe/Amsterdam",
        "NO|Europe/Berlin Europe/Oslo",
        "NP|Asia/Kathmandu",
        "NR|Pacific/Nauru",
        "NU|Pacific/Niue",
        "NZ|Pacific/Auckland Pacific/Chatham",
        "OM|Asia/Dubai Asia/Muscat",
        "PA|America/Panama",
        "PE|America/Lima",
        "PF|Pacific/Tahiti Pacific/Marquesas Pacific/Gambier",
        "PG|Pacific/Port_Moresby Pacific/Bougainville",
        "PH|Asia/Manila",
        "PK|Asia/Karachi",
        "PL|Europe/Warsaw",
        "PM|America/Miquelon",
        "PN|Pacific/Pitcairn",
        "PR|America/Puerto_Rico",
        "PS|Asia/Gaza Asia/Hebron",
        "PT|Europe/Lisbon Atlantic/Madeira Atlantic/Azores",
        "PW|Pacific/Palau",
        "PY|America/Asuncion",
        "QA|Asia/Qatar",
        "RE|Asia/Dubai Indian/Reunion",
        "RO|Europe/Bucharest",
        "RS|Europe/Belgrade",
        "RU|Europe/Kaliningrad Europe/Moscow Europe/Simferopol Europe/Kirov Europe/Volgograd Europe/Astrakhan Europe/Saratov Europe/Ulyanovsk Europe/Samara Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr",
        "RW|Africa/Maputo Africa/Kigali",
        "SA|Asia/Riyadh",
        "SB|Pacific/Guadalcanal",
        "SC|Asia/Dubai Indian/Mahe",
        "SD|Africa/Khartoum",
        "SE|Europe/Berlin Europe/Stockholm",
        "SG|Asia/Singapore",
        "SH|Africa/Abidjan Atlantic/St_Helena",
        "SI|Europe/Belgrade Europe/Ljubljana",
        "SJ|Europe/Berlin Arctic/Longyearbyen",
        "SK|Europe/Prague Europe/Bratislava",
        "SL|Africa/Abidjan Africa/Freetown",
        "SM|Europe/Rome Europe/San_Marino",
        "SN|Africa/Abidjan Africa/Dakar",
        "SO|Africa/Nairobi Africa/Mogadishu",
        "SR|America/Paramaribo",
        "SS|Africa/Juba",
        "ST|Africa/Sao_Tome",
        "SV|America/El_Salvador",
        "SX|America/Puerto_Rico America/Lower_Princes",
        "SY|Asia/Damascus",
        "SZ|Africa/Johannesburg Africa/Mbabane",
        "TC|America/Grand_Turk",
        "TD|Africa/Ndjamena",
        "TF|Asia/Dubai Indian/Maldives Indian/Kerguelen",
        "TG|Africa/Abidjan Africa/Lome",
        "TH|Asia/Bangkok",
        "TJ|Asia/Dushanbe",
        "TK|Pacific/Fakaofo",
        "TL|Asia/Dili",
        "TM|Asia/Ashgabat",
        "TN|Africa/Tunis",
        "TO|Pacific/Tongatapu",
        "TR|Europe/Istanbul",
        "TT|America/Puerto_Rico America/Port_of_Spain",
        "TV|Pacific/Tarawa Pacific/Funafuti",
        "TW|Asia/Taipei",
        "TZ|Africa/Nairobi Africa/Dar_es_Salaam",
        "UA|Europe/Simferopol Europe/Kyiv",
        "UG|Africa/Nairobi Africa/Kampala",
        "UM|Pacific/Pago_Pago Pacific/Tarawa Pacific/Midway Pacific/Wake",
        "US|America/New_York America/Detroit America/Kentucky/Louisville America/Kentucky/Monticello America/Indiana/Indianapolis America/Indiana/Vincennes America/Indiana/Winamac America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Vevay America/Chicago America/Indiana/Tell_City America/Indiana/Knox America/Menominee America/North_Dakota/Center America/North_Dakota/New_Salem America/North_Dakota/Beulah America/Denver America/Boise America/Phoenix America/Los_Angeles America/Anchorage America/Juneau America/Sitka America/Metlakatla America/Yakutat America/Nome America/Adak Pacific/Honolulu",
        "UY|America/Montevideo",
        "UZ|Asia/Samarkand Asia/Tashkent",
        "VA|Europe/Rome Europe/Vatican",
        "VC|America/Puerto_Rico America/St_Vincent",
        "VE|America/Caracas",
        "VG|America/Puerto_Rico America/Tortola",
        "VI|America/Puerto_Rico America/St_Thomas",
        "VN|Asia/Bangkok Asia/Ho_Chi_Minh",
        "VU|Pacific/Efate",
        "WF|Pacific/Tarawa Pacific/Wallis",
        "WS|Pacific/Apia",
        "YE|Asia/Riyadh Asia/Aden",
        "YT|Africa/Nairobi Indian/Mayotte",
        "ZA|Africa/Johannesburg",
        "ZM|Africa/Maputo Africa/Lusaka",
        "ZW|Africa/Maputo Africa/Harare",
      ],
    }),
    o
  );
});
