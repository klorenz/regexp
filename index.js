function parse(n) {
  if ("string" != typeof n) {
    var t = new TypeError("The regexp to parse must be represented as a string.");
    throw t;
  }
  index = 1, cgs = {}, result = parser.parse(n);
  for (var l = 0; l < n.length; l++) cgs[l] && (cgs[l].index = index++);
  return result;
}

function Token(n) {
  this.type = n, this.offset = Token.offset(), this.text = Token.text();
}

function Alternate(n, t) {
  Token.call(this, "alternate"), this.left = n, this.right = t;
}

function Match(n) {
  Token.call(this, "match"), this.body = n.filter(Boolean);
}

function Group(n, t) {
  Token.call(this, n), this.body = t;
}

function CaptureGroup(n, t) {
  Group.call(this, "capture-group"), cgs[this.offset] = this, this.body = n, t && (this.name = t[0] + t[1].join(""));
}

function Quantified(n, t) {
  Token.call(this, "quantified"), this.body = n, this.quantifier = t;
}

function Quantifier(n, t) {
  Token.call(this, "quantifier"), this.min = n, this.max = t, this.greedy = !0;
}

function CharSet(n, t) {
  Token.call(this, "charset"), this.invert = n, this.body = t;
}

function CharacterRange(n, t) {
  Token.call(this, "range"), this.start = n, this.end = t;
}

function CharacterClass(n, t) {
  Token.call(this, "charclass"), this.start = n, this.end = t;
}

function Literal(n) {
  Token.call(this, "literal"), this.body = n, this.escaped = this.body != this.text;
}

function Unicode(n) {
  Token.call(this, "unicode"), this.code = n.toUpperCase();
}

function UnicodeCategory(n, t) {
  Token.call(this, "unicode-category"), this.code = n, this.invert = t;
}

function Hex(n) {
  Token.call(this, "hex"), this.code = n.toUpperCase();
}

function Octal(n) {
  Token.call(this, "octal"), this.code = n.toUpperCase();
}

function BackReference(n) {
  Token.call(this, "back-reference"), this.code = n.toUpperCase();
}

function ControlCharacter(n) {
  Token.call(this, "control-character"), this.code = n.toUpperCase();
}

var parser = function() {
  function n(n, t) {
    function l() {
      this.constructor = n;
    }
    l.prototype = t.prototype, n.prototype = new l();
  }
  function t(n, t, l, r, u) {
    function e(n, t) {
      function l(n) {
        function t(n) {
          return n.charCodeAt(0).toString(16).toUpperCase();
        }
        return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n) {
          return "\\x0" + t(n);
        }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n) {
          return "\\x" + t(n);
        }).replace(/[\u0180-\u0FFF]/g, function(n) {
          return "\\u0" + t(n);
        }).replace(/[\u1080-\uFFFF]/g, function(n) {
          return "\\u" + t(n);
        });
      }
      var r, u;
      switch (n.length) {
       case 0:
        r = "end of input";
        break;

       case 1:
        r = n[0];
        break;

       default:
        r = n.slice(0, -1).join(", ") + " or " + n[n.length - 1];
      }
      return u = t ? '"' + l(t) + '"' : "end of input", "Expected " + r + " but " + u + " found.";
    }
    this.expected = n, this.found = t, this.offset = l, this.line = r, this.column = u, 
    this.name = "SyntaxError", this.message = e(n, t);
  }
  function l(n) {
    function l() {
      return n.substring(ce, oe);
    }
    function r() {
      return ce;
    }
    function u(t) {
      function l(t, l, r) {
        var u, e;
        for (u = l; r > u; u++) e = n.charAt(u), "\n" === e ? (t.seenCR || t.line++, t.column = 1, 
        t.seenCR = !1) : "\r" === e || "\u2028" === e || "\u2029" === e ? (t.line++, t.column = 1, 
        t.seenCR = !0) : (t.column++, t.seenCR = !1);
      }
      return ae !== t && (ae > t && (ae = 0, ie = {
        line: 1,
        column: 1,
        seenCR: !1
      }), l(ie, ae, t), ae = t), ie;
    }
    function e(n) {
      se > oe || (oe > se && (se = oe, fe = []), fe.push(n));
    }
    function o(n) {
      var t = 0;
      for (n.sort(); t < n.length; ) n[t - 1] === n[t] ? n.splice(t, 1) : t++;
    }
    function c() {
      var t, l, r, u, o;
      return t = oe, l = a(), null !== l ? (r = oe, 124 === n.charCodeAt(oe) ? (u = gt, 
      oe++) : (u = null, 0 === pe && e(wt)), null !== u ? (o = c(), null !== o ? (u = [ u, o ], 
      r = u) : (oe = r, r = kt)) : (oe = r, r = kt), null === r && (r = yt), null !== r ? (ce = t, 
      l = Tt(l, r), null === l ? (oe = t, t = l) : t = l) : (oe = t, t = kt)) : (oe = t, 
      t = kt), t;
    }
    function a() {
      var n, t, l, r, u;
      if (n = oe, t = s(), null === t && (t = yt), null !== t) if (l = oe, pe++, r = h(), 
      pe--, null === r ? l = yt : (oe = l, l = kt), null !== l) {
        for (r = [], u = p(), null === u && (u = i()); null !== u; ) r.push(u), u = p(), 
        null === u && (u = i());
        null !== r ? (u = f(), null === u && (u = yt), null !== u ? (ce = n, t = xt(t, r, u), 
        null === t ? (oe = n, n = t) : n = t) : (oe = n, n = kt)) : (oe = n, n = kt);
      } else oe = n, n = kt; else oe = n, n = kt;
      return n;
    }
    function i() {
      var n;
      return n = T(), null === n && (n = F(), null === n && (n = Z())), n;
    }
    function s() {
      var t, l;
      return t = oe, 94 === n.charCodeAt(oe) ? (l = Rt, oe++) : (l = null, 0 === pe && e(jt)), 
      null !== l && (ce = t, l = mt()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function f() {
      var t, l;
      return t = oe, 36 === n.charCodeAt(oe) ? (l = Gt, oe++) : (l = null, 0 === pe && e(Ot)), 
      null !== l && (ce = t, l = Ut()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function p() {
      var n, t, l;
      return n = oe, t = i(), null !== t ? (l = h(), null !== l ? (ce = n, t = Qt(t, l), 
      null === t ? (oe = n, n = t) : n = t) : (oe = n, n = kt)) : (oe = n, n = kt), n;
    }
    function h() {
      var n, t, l;
      return pe++, n = oe, t = d(), null !== t ? (l = g(), null === l && (l = yt), null !== l ? (ce = n, 
      t = St(t, l), null === t ? (oe = n, n = t) : n = t) : (oe = n, n = kt)) : (oe = n, 
      n = kt), pe--, null === n && (t = null, 0 === pe && e(Ft)), n;
    }
    function d() {
      var n;
      return n = C(), null === n && (n = b(), null === n && (n = A(), null === n && (n = v(), 
      null === n && (n = k(), null === n && (n = y()))))), n;
    }
    function C() {
      var t, l, r, u, o, c;
      return t = oe, 123 === n.charCodeAt(oe) ? (l = Bt, oe++) : (l = null, 0 === pe && e(zt)), 
      null !== l ? (r = w(), null !== r ? (44 === n.charCodeAt(oe) ? (u = Lt, oe++) : (u = null, 
      0 === pe && e(Mt)), null !== u ? (o = w(), null !== o ? (125 === n.charCodeAt(oe) ? (c = Zt, 
      oe++) : (c = null, 0 === pe && e(Et)), null !== c ? (ce = t, l = Ht(r, o), null === l ? (oe = t, 
      t = l) : t = l) : (oe = t, t = kt)) : (oe = t, t = kt)) : (oe = t, t = kt)) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function b() {
      var t, l, r, u;
      return t = oe, 123 === n.charCodeAt(oe) ? (l = Bt, oe++) : (l = null, 0 === pe && e(zt)), 
      null !== l ? (r = w(), null !== r ? (n.substr(oe, 2) === _t ? (u = _t, oe += 2) : (u = null, 
      0 === pe && e(Pt)), null !== u ? (ce = t, l = $t(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt)) : (oe = t, t = kt), t;
    }
    function A() {
      var t, l, r, u;
      return t = oe, 123 === n.charCodeAt(oe) ? (l = Bt, oe++) : (l = null, 0 === pe && e(zt)), 
      null !== l ? (r = w(), null !== r ? (125 === n.charCodeAt(oe) ? (u = Zt, oe++) : (u = null, 
      0 === pe && e(Et)), null !== u ? (ce = t, l = qt(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt)) : (oe = t, t = kt), t;
    }
    function v() {
      var t, l;
      return t = oe, 43 === n.charCodeAt(oe) ? (l = Dt, oe++) : (l = null, 0 === pe && e(Wt)), 
      null !== l && (ce = t, l = It()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function k() {
      var t, l;
      return t = oe, 42 === n.charCodeAt(oe) ? (l = Jt, oe++) : (l = null, 0 === pe && e(Kt)), 
      null !== l && (ce = t, l = Nt()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function y() {
      var t, l;
      return t = oe, 63 === n.charCodeAt(oe) ? (l = Vt, oe++) : (l = null, 0 === pe && e(Xt)), 
      null !== l && (ce = t, l = Yt()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function g() {
      var t;
      return 63 === n.charCodeAt(oe) ? (t = Vt, oe++) : (t = null, 0 === pe && e(Xt)), 
      t;
    }
    function w() {
      var t, l, r;
      if (t = oe, l = [], nl.test(n.charAt(oe)) ? (r = n.charAt(oe), oe++) : (r = null, 
      0 === pe && e(tl)), null !== r) for (;null !== r; ) l.push(r), nl.test(n.charAt(oe)) ? (r = n.charAt(oe), 
      oe++) : (r = null, 0 === pe && e(tl)); else l = kt;
      return null !== l && (ce = t, l = ll(l)), null === l ? (oe = t, t = l) : t = l, 
      t;
    }
    function T() {
      var t, l, r, u;
      return t = oe, 40 === n.charCodeAt(oe) ? (l = rl, oe++) : (l = null, 0 === pe && e(ul)), 
      null !== l ? (r = j(), null === r && (r = m(), null === r && (r = G(), null === r && (r = O(), 
      null === r && (r = U(), null === r && (r = R(), null === r && (r = x())))))), null !== r ? (41 === n.charCodeAt(oe) ? (u = el, 
      oe++) : (u = null, 0 === pe && e(ol)), null !== u ? (ce = t, l = cl(r), null === l ? (oe = t, 
      t = l) : t = l) : (oe = t, t = kt)) : (oe = t, t = kt)) : (oe = t, t = kt), t;
    }
    function x() {
      var n, t;
      return n = oe, t = c(), null !== t && (ce = n, t = al(t)), null === t ? (oe = n, 
      n = t) : n = t, n;
    }
    function R() {
      var t, l, r;
      return t = oe, n.substr(oe, 2) === il ? (l = il, oe += 2) : (l = null, 0 === pe && e(sl)), 
      null !== l ? (r = c(), null !== r ? (ce = t, l = fl(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function j() {
      var t, l, r;
      return t = oe, n.substr(oe, 2) === pl ? (l = pl, oe += 2) : (l = null, 0 === pe && e(hl)), 
      null !== l ? (r = c(), null !== r ? (ce = t, l = dl(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function m() {
      var t, l, r;
      return t = oe, n.substr(oe, 2) === Cl ? (l = Cl, oe += 2) : (l = null, 0 === pe && e(bl)), 
      null !== l ? (r = c(), null !== r ? (ce = t, l = Al(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function G() {
      var t, l, r;
      return t = oe, n.substr(oe, 3) === vl ? (l = vl, oe += 3) : (l = null, 0 === pe && e(kl)), 
      null !== l ? (r = c(), null !== r ? (ce = t, l = yl(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function O() {
      var t, l, r;
      return t = oe, n.substr(oe, 3) === gl ? (l = gl, oe += 3) : (l = null, 0 === pe && e(wl)), 
      null !== l ? (r = c(), null !== r ? (ce = t, l = Tl(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function U() {
      var t, l, r, u, o, a;
      if (t = oe, l = Q(), null !== l) {
        if (r = oe, xl.test(n.charAt(oe)) ? (u = n.charAt(oe), oe++) : (u = null, 0 === pe && e(Rl)), 
        null !== u) {
          for (o = [], jl.test(n.charAt(oe)) ? (a = n.charAt(oe), oe++) : (a = null, 0 === pe && e(ml)); null !== a; ) o.push(a), 
          jl.test(n.charAt(oe)) ? (a = n.charAt(oe), oe++) : (a = null, 0 === pe && e(ml));
          null !== o ? (u = [ u, o ], r = u) : (oe = r, r = kt);
        } else oe = r, r = kt;
        null !== r ? (62 === n.charCodeAt(oe) ? (u = Gl, oe++) : (u = null, 0 === pe && e(Ol)), 
        null !== u ? (o = c(), null !== o ? (ce = t, l = Ul(r, o), null === l ? (oe = t, 
        t = l) : t = l) : (oe = t, t = kt)) : (oe = t, t = kt)) : (oe = t, t = kt);
      } else oe = t, t = kt;
      return t;
    }
    function Q() {
      var t;
      return n.substr(oe, 3) === Ql ? (t = Ql, oe += 3) : (t = null, 0 === pe && e(Fl)), 
      null === t && (n.substr(oe, 2) === Sl ? (t = Sl, oe += 2) : (t = null, 0 === pe && e(Bl))), 
      t;
    }
    function F() {
      var t, l, r, u, o;
      if (pe++, t = oe, 91 === n.charCodeAt(oe) ? (l = Ll, oe++) : (l = null, 0 === pe && e(Ml)), 
      null !== l) if (94 === n.charCodeAt(oe) ? (r = Rt, oe++) : (r = null, 0 === pe && e(jt)), 
      null === r && (r = yt), null !== r) {
        for (u = [], o = B(), null === o && (o = S(), null === o && (o = z())); null !== o; ) u.push(o), 
        o = B(), null === o && (o = S(), null === o && (o = z()));
        null !== u ? (93 === n.charCodeAt(oe) ? (o = Zl, oe++) : (o = null, 0 === pe && e(El)), 
        null !== o ? (ce = t, l = Hl(r, u), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
        t = kt)) : (oe = t, t = kt);
      } else oe = t, t = kt; else oe = t, t = kt;
      return pe--, null === t && (l = null, 0 === pe && e(zl)), t;
    }
    function S() {
      var t, l, r, u;
      return pe++, t = oe, l = z(), null !== l ? (45 === n.charCodeAt(oe) ? (r = Pl, oe++) : (r = null, 
      0 === pe && e($l)), null !== r ? (u = z(), null !== u ? (ce = t, l = ql(l, u), null === l ? (oe = t, 
      t = l) : t = l) : (oe = t, t = kt)) : (oe = t, t = kt)) : (oe = t, t = kt), pe--, 
      null === t && (l = null, 0 === pe && e(_l)), t;
    }
    function B() {
      var t, l, r, u;
      return pe++, t = oe, n.substr(oe, 2) === Wl ? (l = Wl, oe += 2) : (l = null, 0 === pe && e(Il)), 
      null !== l ? (n.substr(oe, 5) === Jl ? (r = Jl, oe += 5) : (r = null, 0 === pe && e(Kl)), 
      null === r && (n.substr(oe, 5) === Nl ? (r = Nl, oe += 5) : (r = null, 0 === pe && e(Vl)), 
      null === r && (n.substr(oe, 5) === Xl ? (r = Xl, oe += 5) : (r = null, 0 === pe && e(Yl)), 
      null === r && (n.substr(oe, 5) === nr ? (r = nr, oe += 5) : (r = null, 0 === pe && e(tr)), 
      null === r && (n.substr(oe, 5) === lr ? (r = lr, oe += 5) : (r = null, 0 === pe && e(rr)), 
      null === r && (n.substr(oe, 5) === ur ? (r = ur, oe += 5) : (r = null, 0 === pe && e(er)), 
      null === r && (n.substr(oe, 5) === or ? (r = or, oe += 5) : (r = null, 0 === pe && e(cr)), 
      null === r && (n.substr(oe, 5) === ar ? (r = ar, oe += 5) : (r = null, 0 === pe && e(ir)), 
      null === r && (n.substr(oe, 5) === sr ? (r = sr, oe += 5) : (r = null, 0 === pe && e(fr)), 
      null === r && (n.substr(oe, 5) === pr ? (r = pr, oe += 5) : (r = null, 0 === pe && e(hr)), 
      null === r && (n.substr(oe, 5) === dr ? (r = dr, oe += 5) : (r = null, 0 === pe && e(Cr)), 
      null === r && (n.substr(oe, 6) === br ? (r = br, oe += 6) : (r = null, 0 === pe && e(Ar))))))))))))), 
      null !== r ? (n.substr(oe, 2) === vr ? (u = vr, oe += 2) : (u = null, 0 === pe && e(kr)), 
      null !== u ? (ce = t, l = yr(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt)) : (oe = t, t = kt), pe--, null === t && (l = null, 
      0 === pe && e(Dl)), t;
    }
    function z() {
      var n, t;
      return pe++, n = M(), null === n && (n = L()), pe--, null === n && (t = null, 0 === pe && e(gr)), 
      n;
    }
    function L() {
      var t, l;
      return t = oe, wr.test(n.charAt(oe)) ? (l = n.charAt(oe), oe++) : (l = null, 0 === pe && e(Tr)), 
      null !== l && (ce = t, l = xr(l)), null === l ? (oe = t, t = l) : t = l, t;
    }
    function M() {
      var n;
      return n = P(), null === n && (n = ot(), null === n && (n = K(), null === n && (n = N(), 
      null === n && (n = V(), null === n && (n = X(), null === n && (n = Y(), null === n && (n = nt(), 
      null === n && (n = tt(), null === n && (n = lt(), null === n && (n = rt(), null === n && (n = ut(), 
      null === n && (n = et(), null === n && (n = at(), null === n && (n = it(), null === n && (n = st(), 
      null === n && (n = ht(), null === n && (n = dt()))))))))))))))))), n;
    }
    function Z() {
      var n;
      return n = E(), null === n && (n = _(), null === n && (n = H())), n;
    }
    function E() {
      var t, l;
      return t = oe, 46 === n.charCodeAt(oe) ? (l = Rr, oe++) : (l = null, 0 === pe && e(jr)), 
      null !== l && (ce = t, l = mr()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function H() {
      var t, l;
      return pe++, t = oe, Or.test(n.charAt(oe)) ? (l = n.charAt(oe), oe++) : (l = null, 
      0 === pe && e(Ur)), null !== l && (ce = t, l = xr(l)), null === l ? (oe = t, t = l) : t = l, 
      pe--, null === t && (l = null, 0 === pe && e(Gr)), t;
    }
    function _() {
      var n;
      return n = $(), null === n && (n = J(), null === n && (n = q(), null === n && (n = D(), 
      null === n && (n = W(), null === n && (n = I(), null === n && (n = ot(), null === n && (n = K(), 
      null === n && (n = N(), null === n && (n = V(), null === n && (n = X(), null === n && (n = Y(), 
      null === n && (n = nt(), null === n && (n = tt(), null === n && (n = lt(), null === n && (n = rt(), 
      null === n && (n = ut(), null === n && (n = et(), null === n && (n = ct(), null === n && (n = at(), 
      null === n && (n = it(), null === n && (n = st(), null === n && (n = ft(), null === n && (n = pt(), 
      null === n && (n = ht(), null === n && (n = dt()))))))))))))))))))))))))), n;
    }
    function P() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Qr ? (l = Qr, oe += 2) : (l = null, 0 === pe && e(Fr)), 
      null !== l && (ce = t, l = Sr()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function $() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Qr ? (l = Qr, oe += 2) : (l = null, 0 === pe && e(Fr)), 
      null !== l && (ce = t, l = Br()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function q() {
      var t, l;
      return t = oe, n.substr(oe, 2) === zr ? (l = zr, oe += 2) : (l = null, 0 === pe && e(Lr)), 
      null !== l && (ce = t, l = Mr()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function D() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Zr ? (l = Zr, oe += 2) : (l = null, 0 === pe && e(Er)), 
      null !== l && (ce = t, l = Hr()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function W() {
      var t, l;
      return t = oe, n.substr(oe, 2) === _r ? (l = _r, oe += 2) : (l = null, 0 === pe && e(Pr)), 
      null !== l && (ce = t, l = $r()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function I() {
      var t, l;
      return t = oe, n.substr(oe, 2) === qr ? (l = qr, oe += 2) : (l = null, 0 === pe && e(Dr)), 
      null !== l && (ce = t, l = Wr()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function J() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Ir ? (l = Ir, oe += 2) : (l = null, 0 === pe && e(Jr)), 
      null !== l && (ce = t, l = Kr()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function K() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Nr ? (l = Nr, oe += 2) : (l = null, 0 === pe && e(Vr)), 
      null !== l && (ce = t, l = Xr()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function N() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Yr ? (l = Yr, oe += 2) : (l = null, 0 === pe && e(nu)), 
      null !== l && (ce = t, l = tu()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function V() {
      var t, l;
      return t = oe, n.substr(oe, 2) === lu ? (l = lu, oe += 2) : (l = null, 0 === pe && e(ru)), 
      null !== l && (ce = t, l = uu()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function X() {
      var t, l;
      return t = oe, n.substr(oe, 2) === eu ? (l = eu, oe += 2) : (l = null, 0 === pe && e(ou)), 
      null !== l && (ce = t, l = cu()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function Y() {
      var t, l;
      return t = oe, n.substr(oe, 2) === au ? (l = au, oe += 2) : (l = null, 0 === pe && e(iu)), 
      null !== l && (ce = t, l = su()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function nt() {
      var t, l;
      return t = oe, n.substr(oe, 2) === fu ? (l = fu, oe += 2) : (l = null, 0 === pe && e(pu)), 
      null !== l && (ce = t, l = hu()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function tt() {
      var t, l;
      return t = oe, n.substr(oe, 2) === du ? (l = du, oe += 2) : (l = null, 0 === pe && e(Cu)), 
      null !== l && (ce = t, l = bu()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function lt() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Au ? (l = Au, oe += 2) : (l = null, 0 === pe && e(vu)), 
      null !== l && (ce = t, l = ku()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function rt() {
      var t, l;
      return t = oe, n.substr(oe, 2) === yu ? (l = yu, oe += 2) : (l = null, 0 === pe && e(gu)), 
      null !== l && (ce = t, l = wu()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function ut() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Tu ? (l = Tu, oe += 2) : (l = null, 0 === pe && e(xu)), 
      null !== l && (ce = t, l = Ru()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function et() {
      var t, l;
      return t = oe, n.substr(oe, 2) === ju ? (l = ju, oe += 2) : (l = null, 0 === pe && e(mu)), 
      null !== l && (ce = t, l = Gu()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function ot() {
      var t, l, r;
      return t = oe, n.substr(oe, 2) === Ou ? (l = Ou, oe += 2) : (l = null, 0 === pe && e(Uu)), 
      null !== l ? (n.length > oe ? (r = n.charAt(oe), oe++) : (r = null, 0 === pe && e(Qu)), 
      null !== r ? (ce = t, l = Fu(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function ct() {
      var t, l, r;
      return t = oe, 92 === n.charCodeAt(oe) ? (l = Su, oe++) : (l = null, 0 === pe && e(Bu)), 
      null !== l ? (zu.test(n.charAt(oe)) ? (r = n.charAt(oe), oe++) : (r = null, 0 === pe && e(Lu)), 
      null !== r ? (ce = t, l = Mu(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    function at() {
      var t, l, r, u;
      if (t = oe, n.substr(oe, 2) === Zu ? (l = Zu, oe += 2) : (l = null, 0 === pe && e(Eu)), 
      null !== l) {
        if (r = [], Hu.test(n.charAt(oe)) ? (u = n.charAt(oe), oe++) : (u = null, 0 === pe && e(_u)), 
        null !== u) for (;null !== u; ) r.push(u), Hu.test(n.charAt(oe)) ? (u = n.charAt(oe), 
        oe++) : (u = null, 0 === pe && e(_u)); else r = kt;
        null !== r ? (ce = t, l = Pu(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
        t = kt);
      } else oe = t, t = kt;
      return t;
    }
    function it() {
      var t, l, r, u;
      if (t = oe, n.substr(oe, 2) === $u ? (l = $u, oe += 2) : (l = null, 0 === pe && e(qu)), 
      null !== l) {
        if (r = [], Du.test(n.charAt(oe)) ? (u = n.charAt(oe), oe++) : (u = null, 0 === pe && e(Wu)), 
        null !== u) for (;null !== u; ) r.push(u), Du.test(n.charAt(oe)) ? (u = n.charAt(oe), 
        oe++) : (u = null, 0 === pe && e(Wu)); else r = kt;
        null !== r ? (ce = t, l = Iu(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
        t = kt);
      } else oe = t, t = kt;
      return t;
    }
    function st() {
      var t, l, r, u;
      if (t = oe, n.substr(oe, 2) === Ju ? (l = Ju, oe += 2) : (l = null, 0 === pe && e(Ku)), 
      null !== l) {
        if (r = [], Du.test(n.charAt(oe)) ? (u = n.charAt(oe), oe++) : (u = null, 0 === pe && e(Wu)), 
        null !== u) for (;null !== u; ) r.push(u), Du.test(n.charAt(oe)) ? (u = n.charAt(oe), 
        oe++) : (u = null, 0 === pe && e(Wu)); else r = kt;
        null !== r ? (ce = t, l = Nu(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
        t = kt);
      } else oe = t, t = kt;
      return t;
    }
    function ft() {
      var t, l, r, u;
      if (t = oe, n.substr(oe, 3) === Vu ? (l = Vu, oe += 3) : (l = null, 0 === pe && e(Xu)), 
      null !== l) {
        if (r = [], Yu.test(n.charAt(oe)) ? (u = n.charAt(oe), oe++) : (u = null, 0 === pe && e(ne)), 
        null !== u) for (;null !== u; ) r.push(u), Yu.test(n.charAt(oe)) ? (u = n.charAt(oe), 
        oe++) : (u = null, 0 === pe && e(ne)); else r = kt;
        null !== r ? (125 === n.charCodeAt(oe) ? (u = Zt, oe++) : (u = null, 0 === pe && e(Et)), 
        null !== u ? (ce = t, l = te(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
        t = kt)) : (oe = t, t = kt);
      } else oe = t, t = kt;
      return t;
    }
    function pt() {
      var t, l, r, u;
      if (t = oe, n.substr(oe, 3) === le ? (l = le, oe += 3) : (l = null, 0 === pe && e(re)), 
      null !== l) {
        if (r = [], Yu.test(n.charAt(oe)) ? (u = n.charAt(oe), oe++) : (u = null, 0 === pe && e(ne)), 
        null !== u) for (;null !== u; ) r.push(u), Yu.test(n.charAt(oe)) ? (u = n.charAt(oe), 
        oe++) : (u = null, 0 === pe && e(ne)); else r = kt;
        null !== r ? (125 === n.charCodeAt(oe) ? (u = Zt, oe++) : (u = null, 0 === pe && e(Et)), 
        null !== u ? (ce = t, l = ue(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
        t = kt)) : (oe = t, t = kt);
      } else oe = t, t = kt;
      return t;
    }
    function ht() {
      var t, l;
      return t = oe, n.substr(oe, 2) === Zu ? (l = Zu, oe += 2) : (l = null, 0 === pe && e(Eu)), 
      null !== l && (ce = t, l = ee()), null === l ? (oe = t, t = l) : t = l, t;
    }
    function dt() {
      var t, l, r;
      return t = oe, 92 === n.charCodeAt(oe) ? (l = Su, oe++) : (l = null, 0 === pe && e(Bu)), 
      null !== l ? (n.length > oe ? (r = n.charAt(oe), oe++) : (r = null, 0 === pe && e(Qu)), 
      null !== r ? (ce = t, l = xr(r), null === l ? (oe = t, t = l) : t = l) : (oe = t, 
      t = kt)) : (oe = t, t = kt), t;
    }
    var Ct, bt = arguments.length > 1 ? arguments[1] : {}, At = {
      regexp: c
    }, vt = c, kt = null, yt = "", gt = "|", wt = '"|"', Tt = function(n, t) {
      return t ? new Alternate(n, t[1]) : n;
    }, xt = function(n, t, l) {
      return new Match([ n ].concat(t).concat([ l ]));
    }, Rt = "^", jt = '"^"', mt = function() {
      return new Token("start");
    }, Gt = "$", Ot = '"$"', Ut = function() {
      return new Token("end");
    }, Qt = function(n, t) {
      return new Quantified(n, t);
    }, Ft = "Quantifier", St = function(n, t) {
      return t && (n.greedy = !1), n;
    }, Bt = "{", zt = '"{"', Lt = ",", Mt = '","', Zt = "}", Et = '"}"', Ht = function(n, t) {
      return new Quantifier(n, t);
    }, _t = ",}", Pt = '",}"', $t = function(n) {
      return new Quantifier(n, 1/0);
    }, qt = function(n) {
      return new Quantifier(n, n);
    }, Dt = "+", Wt = '"+"', It = function() {
      return new Quantifier(1, 1/0);
    }, Jt = "*", Kt = '"*"', Nt = function() {
      return new Quantifier(0, 1/0);
    }, Vt = "?", Xt = '"?"', Yt = function() {
      return new Quantifier(0, 1);
    }, nl = /^[0-9]/, tl = "[0-9]", ll = function(n) {
      return +n.join("");
    }, rl = "(", ul = '"("', el = ")", ol = '")"', cl = function(n) {
      return n;
    }, al = function(n) {
      return new CaptureGroup(n);
    }, il = "?:", sl = '"?:"', fl = function(n) {
      return new Group("non-capture-group", n);
    }, pl = "?=", hl = '"?="', dl = function(n) {
      return new Group("positive-lookahead", n);
    }, Cl = "?!", bl = '"?!"', Al = function(n) {
      return new Group("negative-lookahead", n);
    }, vl = "?<=", kl = '"?<="', yl = function(n) {
      return new Group("positive-lookbehind", n);
    }, gl = "?<!", wl = '"?<!"', Tl = function(n) {
      return new Group("negative-lookbehind", n);
    }, xl = /^[A-Za-z_]/, Rl = "[A-Za-z_]", jl = /^[A-Za-z0-9_]/, ml = "[A-Za-z0-9_]", Gl = ">", Ol = '">"', Ul = function(n, t) {
      return new CaptureGroup(t, n);
    }, Ql = "?P<", Fl = '"?P<"', Sl = "?<", Bl = '"?<"', zl = "CharacterSet", Ll = "[", Ml = '"["', Zl = "]", El = '"]"', Hl = function(n, t) {
      return new CharSet(!!n, t);
    }, _l = "CharacterRange", Pl = "-", $l = '"-"', ql = function(n, t) {
      return new CharacterRange(n, t);
    }, Dl = "CharacterClass", Wl = "[:", Il = '"[:"', Jl = "alnum", Kl = '"alnum"', Nl = "alpha", Vl = '"alpha"', Xl = "blank", Yl = '"blank"', nr = "cntrl", tr = '"cntrl"', lr = "digit", rr = '"digit"', ur = "lower", er = '"lower"', or = "upper", cr = '"upper"', ar = "graph", ir = '"graph"', sr = "print", fr = '"print"', pr = "punct", hr = '"punct"', dr = "space", Cr = '"space"', br = "xdigit", Ar = '"xdigit"', vr = ":]", kr = '":]"', yr = function(n) {
      return new CharacterClass(n);
    }, gr = "Character", wr = /^[^\\\]]/, Tr = "[^\\\\\\]]", xr = function(n) {
      return new Literal(n);
    }, Rr = ".", jr = '"."', mr = function() {
      return new Token("any-character");
    }, Gr = "Literal", Or = /^[^|\\.[()?+*$\^]/, Ur = "[^|\\\\.[()?+*$\\^]", Qr = "\\b", Fr = '"\\\\b"', Sr = function() {
      return new Token("backspace");
    }, Br = function() {
      return new Token("word-boundary");
    }, zr = "\\A", Lr = '"\\\\A"', Mr = function() {
      return new Token("begin-of-string");
    }, Zr = "\\Z", Er = '"\\\\Z"', Hr = function() {
      return new Token("end-of-string-before-nl");
    }, _r = "\\z", Pr = '"\\\\z"', $r = function() {
      return new Token("end-of-string");
    }, qr = "\\G", Dr = '"\\\\G"', Wr = function() {
      return new Token("match-start-position");
    }, Ir = "\\B", Jr = '"\\\\B"', Kr = function() {
      return new Token("non-word-boundary");
    }, Nr = "\\d", Vr = '"\\\\d"', Xr = function() {
      return new Token("digit");
    }, Yr = "\\D", nu = '"\\\\D"', tu = function() {
      return new Token("non-digit");
    }, lu = "\\f", ru = '"\\\\f"', uu = function() {
      return new Token("form-feed");
    }, eu = "\\n", ou = '"\\\\n"', cu = function() {
      return new Token("line-feed");
    }, au = "\\r", iu = '"\\\\r"', su = function() {
      return new Token("carriage-return");
    }, fu = "\\s", pu = '"\\\\s"', hu = function() {
      return new Token("white-space");
    }, du = "\\S", Cu = '"\\\\S"', bu = function() {
      return new Token("non-white-space");
    }, Au = "\\t", vu = '"\\\\t"', ku = function() {
      return new Token("tab");
    }, yu = "\\v", gu = '"\\\\v"', wu = function() {
      return new Token("vertical-tab");
    }, Tu = "\\w", xu = '"\\\\w"', Ru = function() {
      return new Token("word");
    }, ju = "\\W", mu = '"\\\\W"', Gu = function() {
      return new Token("non-word");
    }, Ou = "\\c", Uu = '"\\\\c"', Qu = "any character", Fu = function(n) {
      return new ControlCharacter(n);
    }, Su = "\\", Bu = '"\\\\"', zu = /^[1-9]/, Lu = "[1-9]", Mu = function(n) {
      return new BackReference(n);
    }, Zu = "\\0", Eu = '"\\\\0"', Hu = /^[0-7]/, _u = "[0-7]", Pu = function(n) {
      return new Octal(n.join(""));
    }, $u = "\\x", qu = '"\\\\x"', Du = /^[0-9a-fA-F]/, Wu = "[0-9a-fA-F]", Iu = function(n) {
      return new Hex(n.join(""));
    }, Ju = "\\u", Ku = '"\\\\u"', Nu = function(n) {
      return new Unicode(n.join(""));
    }, Vu = "\\p{", Xu = '"\\\\p{"', Yu = /^[0-9a-zA-Z_]/, ne = "[0-9a-zA-Z_]", te = function(n) {
      return new UnicodeCategory(n.join(""));
    }, le = "\\P{", re = '"\\\\P{"', ue = function(n) {
      return new UnicodeCategory(n.join(""), !0);
    }, ee = function() {
      return new Token("null-character");
    }, oe = 0, ce = 0, ae = 0, ie = {
      line: 1,
      column: 1,
      seenCR: !1
    }, se = 0, fe = [], pe = 0;
    if ("startRule" in bt) {
      if (!(bt.startRule in At)) throw new Error("Can't start parsing from rule \"" + bt.startRule + '".');
      vt = At[bt.startRule];
    }
    if (Token.offset = r, Token.text = l, Ct = vt(), null !== Ct && oe === n.length) return Ct;
    throw o(fe), ce = Math.max(oe, se), new t(fe, ce < n.length ? n.charAt(ce) : null, ce, u(ce).line, u(ce).column);
  }
  return n(t, Error), {
    SyntaxError: t,
    parse: l
  };
}(), index = 1, cgs = {};

exports = module.exports = parse, exports.Token = Token, exports.Alternate = Alternate, 
Alternate.prototype = Object.create(Token.prototype), Alternate.prototype.constructor = Alternate, 
exports.Match = Match, Match.prototype = Object.create(Token.prototype), Match.prototype.constructor = Match, 
exports.Group = Group, Group.prototype = Object.create(Token.prototype), Group.prototype.constructor = Group, 
exports.CaptureGroup = CaptureGroup, CaptureGroup.prototype = Object.create(Group.prototype), 
CaptureGroup.prototype.constructor = CaptureGroup, exports.Quantified = Quantified, 
Quantified.prototype = Object.create(Token.prototype), Quantified.prototype.constructor = Quantified, 
exports.Quantifier = Quantifier, Quantifier.prototype = Object.create(Token.prototype), 
Quantifier.prototype.constructor = Quantifier, exports.CharSet = CharSet, CharSet.prototype = Object.create(Token.prototype), 
CharSet.prototype.constructor = CharSet, exports.CharacterRange = CharacterRange, 
CharacterRange.prototype = Object.create(Token.prototype), CharacterRange.prototype.constructor = CharacterRange, 
exports.CharacterClass = CharacterClass, CharacterClass.prototype = Object.create(Token.prototype), 
CharacterClass.prototype.constructor = CharacterClass, exports.Literal = Literal, 
Literal.prototype = Object.create(Token.prototype), Literal.prototype.constructor = Literal, 
exports.Unicode = Unicode, Unicode.prototype = Object.create(Token.prototype), Unicode.prototype.constructor = Unicode, 
exports.UnicodeCategory = UnicodeCategory, UnicodeCategory.prototype = Object.create(Token.prototype), 
UnicodeCategory.constructor = Unicode, exports.Hex = Hex, Hex.prototype = Object.create(Token.prototype), 
Hex.prototype.constructor = Hex, exports.Octal = Octal, Octal.prototype = Object.create(Token.prototype), 
Octal.prototype.constructor = Octal, exports.BackReference = BackReference, BackReference.prototype = Object.create(Token.prototype), 
BackReference.prototype.constructor = BackReference, exports.ControlCharacter = ControlCharacter, 
ControlCharacter.prototype = Object.create(Token.prototype), ControlCharacter.prototype.constructor = ControlCharacter;