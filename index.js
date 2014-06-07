function parse(n) {
  if ("string" != typeof n) {
    var t = new TypeError("The regexp to parse must be represented as a string.");
    throw t;
  }
  return index = 1, cgs = {}, parser.parse(n);
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
  Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index++), 
  this.body = n, t && (this.name = t);
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

function Literal(n) {
  Token.call(this, "literal"), this.body = n, this.escaped = this.body != this.text;
}

function Unicode(n) {
  Token.call(this, "unicode"), this.code = n.toUpperCase();
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
    function r() {
      this.constructor = n;
    }
    r.prototype = t.prototype, n.prototype = new r();
  }
  function t(n, t, r, l, e) {
    function u(n, t) {
      function r(n) {
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
      var l, e;
      switch (n.length) {
       case 0:
        l = "end of input";
        break;

       case 1:
        l = n[0];
        break;

       default:
        l = n.slice(0, -1).join(", ") + " or " + n[n.length - 1];
      }
      return e = t ? '"' + r(t) + '"' : "end of input", "Expected " + l + " but " + e + " found.";
    }
    this.expected = n, this.found = t, this.offset = r, this.line = l, this.column = e, 
    this.name = "SyntaxError", this.message = u(n, t);
  }
  function r(n) {
    function r() {
      return n.substring(ee, le);
    }
    function l() {
      return ee;
    }
    function e(t) {
      function r(t, r, l) {
        var e, u;
        for (e = r; l > e; e++) u = n.charAt(e), "\n" === u ? (t.seenCR || t.line++, t.column = 1, 
        t.seenCR = !1) : "\r" === u || "\u2028" === u || "\u2029" === u ? (t.line++, t.column = 1, 
        t.seenCR = !0) : (t.column++, t.seenCR = !1);
      }
      return ue !== t && (ue > t && (ue = 0, oe = {
        line: 1,
        column: 1,
        seenCR: !1
      }), r(oe, ue, t), ue = t), oe;
    }
    function u(n) {
      ce > le || (le > ce && (ce = le, ae = []), ae.push(n));
    }
    function o(n) {
      var t = 0;
      for (n.sort(); t < n.length; ) n[t - 1] === n[t] ? n.splice(t, 1) : t++;
    }
    function c() {
      var t, r, l, e, o;
      return t = le, r = a(), null !== r ? (l = le, 124 === n.charCodeAt(le) ? (e = dt, 
      le++) : (e = null, 0 === ie && u(Ct)), null !== e ? (o = c(), null !== o ? (e = [ e, o ], 
      l = e) : (le = l, l = pt)) : (le = l, l = pt), null === l && (l = ht), null !== l ? (ee = t, 
      r = vt(r, l), null === r ? (le = t, t = r) : t = r) : (le = t, t = pt)) : (le = t, 
      t = pt), t;
    }
    function a() {
      var n, t, r, l, e;
      if (n = le, t = s(), null === t && (t = ht), null !== t) if (r = le, ie++, l = h(), 
      ie--, null === l ? r = ht : (le = r, r = pt), null !== r) {
        for (l = [], e = p(), null === e && (e = i()); null !== e; ) l.push(e), e = p(), 
        null === e && (e = i());
        null !== l ? (e = f(), null === e && (e = ht), null !== e ? (ee = n, t = At(t, l, e), 
        null === t ? (le = n, n = t) : n = t) : (le = n, n = pt)) : (le = n, n = pt);
      } else le = n, n = pt; else le = n, n = pt;
      return n;
    }
    function i() {
      var n;
      return n = T(), null === n && (n = S(), null === n && (n = E())), n;
    }
    function s() {
      var t, r;
      return t = le, 94 === n.charCodeAt(le) ? (r = kt, le++) : (r = null, 0 === ie && u(bt)), 
      null !== r && (ee = t, r = yt()), null === r ? (le = t, t = r) : t = r, t;
    }
    function f() {
      var t, r;
      return t = le, 36 === n.charCodeAt(le) ? (r = wt, le++) : (r = null, 0 === ie && u(xt)), 
      null !== r && (ee = t, r = Tt()), null === r ? (le = t, t = r) : t = r, t;
    }
    function p() {
      var n, t, r;
      return n = le, t = i(), null !== t ? (r = h(), null !== r ? (ee = n, t = gt(t, r), 
      null === t ? (le = n, n = t) : n = t) : (le = n, n = pt)) : (le = n, n = pt), n;
    }
    function h() {
      var n, t, r;
      return ie++, n = le, t = d(), null !== t ? (r = w(), null === r && (r = ht), null !== r ? (ee = n, 
      t = Gt(t, r), null === t ? (le = n, n = t) : n = t) : (le = n, n = pt)) : (le = n, 
      n = pt), ie--, null === n && (t = null, 0 === ie && u(Rt)), n;
    }
    function d() {
      var n;
      return n = C(), null === n && (n = v(), null === n && (n = A(), null === n && (n = k(), 
      null === n && (n = b(), null === n && (n = y()))))), n;
    }
    function C() {
      var t, r, l, e, o, c;
      return t = le, 123 === n.charCodeAt(le) ? (r = Ot, le++) : (r = null, 0 === ie && u(mt)), 
      null !== r ? (l = x(), null !== l ? (44 === n.charCodeAt(le) ? (e = Qt, le++) : (e = null, 
      0 === ie && u(jt)), null !== e ? (o = x(), null !== o ? (125 === n.charCodeAt(le) ? (c = Ft, 
      le++) : (c = null, 0 === ie && u(St)), null !== c ? (ee = t, r = Ut(l, o), null === r ? (le = t, 
      t = r) : t = r) : (le = t, t = pt)) : (le = t, t = pt)) : (le = t, t = pt)) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function v() {
      var t, r, l, e;
      return t = le, 123 === n.charCodeAt(le) ? (r = Ot, le++) : (r = null, 0 === ie && u(mt)), 
      null !== r ? (l = x(), null !== l ? (n.substr(le, 2) === Bt ? (e = Bt, le += 2) : (e = null, 
      0 === ie && u(Lt)), null !== e ? (ee = t, r = Mt(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt)) : (le = t, t = pt), t;
    }
    function A() {
      var t, r, l, e;
      return t = le, 123 === n.charCodeAt(le) ? (r = Ot, le++) : (r = null, 0 === ie && u(mt)), 
      null !== r ? (l = x(), null !== l ? (125 === n.charCodeAt(le) ? (e = Ft, le++) : (e = null, 
      0 === ie && u(St)), null !== e ? (ee = t, r = Et(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt)) : (le = t, t = pt), t;
    }
    function k() {
      var t, r;
      return t = le, 43 === n.charCodeAt(le) ? (r = Ht, le++) : (r = null, 0 === ie && u(zt)), 
      null !== r && (ee = t, r = Zt()), null === r ? (le = t, t = r) : t = r, t;
    }
    function b() {
      var t, r;
      return t = le, 42 === n.charCodeAt(le) ? (r = $t, le++) : (r = null, 0 === ie && u(_t)), 
      null !== r && (ee = t, r = qt()), null === r ? (le = t, t = r) : t = r, t;
    }
    function y() {
      var t, r;
      return t = le, 63 === n.charCodeAt(le) ? (r = Dt, le++) : (r = null, 0 === ie && u(Pt)), 
      null !== r && (ee = t, r = Wt()), null === r ? (le = t, t = r) : t = r, t;
    }
    function w() {
      var t;
      return 63 === n.charCodeAt(le) ? (t = Dt, le++) : (t = null, 0 === ie && u(Pt)), 
      t;
    }
    function x() {
      var t, r, l;
      if (t = le, r = [], It.test(n.charAt(le)) ? (l = n.charAt(le), le++) : (l = null, 
      0 === ie && u(Jt)), null !== l) for (;null !== l; ) r.push(l), It.test(n.charAt(le)) ? (l = n.charAt(le), 
      le++) : (l = null, 0 === ie && u(Jt)); else r = pt;
      return null !== r && (ee = t, r = Kt(r)), null === r ? (le = t, t = r) : t = r, 
      t;
    }
    function T() {
      var t, r, l, e;
      return t = le, 40 === n.charCodeAt(le) ? (r = Nt, le++) : (r = null, 0 === ie && u(Vt)), 
      null !== r ? (l = G(), null === l && (l = O(), null === l && (l = m(), null === l && (l = Q(), 
      null === l && (l = j(), null === l && (l = R(), null === l && (l = g())))))), null !== l ? (41 === n.charCodeAt(le) ? (e = Xt, 
      le++) : (e = null, 0 === ie && u(Yt)), null !== e ? (ee = t, r = nr(l), null === r ? (le = t, 
      t = r) : t = r) : (le = t, t = pt)) : (le = t, t = pt)) : (le = t, t = pt), t;
    }
    function g() {
      var n, t;
      return n = le, t = c(), null !== t && (ee = n, t = tr(t)), null === t ? (le = n, 
      n = t) : n = t, n;
    }
    function R() {
      var t, r, l;
      return t = le, n.substr(le, 2) === rr ? (r = rr, le += 2) : (r = null, 0 === ie && u(lr)), 
      null !== r ? (l = c(), null !== l ? (ee = t, r = er(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function G() {
      var t, r, l;
      return t = le, n.substr(le, 2) === ur ? (r = ur, le += 2) : (r = null, 0 === ie && u(or)), 
      null !== r ? (l = c(), null !== l ? (ee = t, r = cr(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function O() {
      var t, r, l;
      return t = le, n.substr(le, 2) === ar ? (r = ar, le += 2) : (r = null, 0 === ie && u(ir)), 
      null !== r ? (l = c(), null !== l ? (ee = t, r = sr(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function m() {
      var t, r, l;
      return t = le, n.substr(le, 3) === fr ? (r = fr, le += 3) : (r = null, 0 === ie && u(pr)), 
      null !== r ? (l = c(), null !== l ? (ee = t, r = hr(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function Q() {
      var t, r, l;
      return t = le, n.substr(le, 3) === dr ? (r = dr, le += 3) : (r = null, 0 === ie && u(Cr)), 
      null !== r ? (l = c(), null !== l ? (ee = t, r = vr(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function j() {
      var t, r, l, e, o, a;
      if (t = le, r = F(), null !== r) {
        if (l = le, Ar.test(n.charAt(le)) ? (e = n.charAt(le), le++) : (e = null, 0 === ie && u(kr)), 
        null !== e) {
          for (o = [], br.test(n.charAt(le)) ? (a = n.charAt(le), le++) : (a = null, 0 === ie && u(yr)); null !== a; ) o.push(a), 
          br.test(n.charAt(le)) ? (a = n.charAt(le), le++) : (a = null, 0 === ie && u(yr));
          null !== o ? (e = [ e, o ], l = e) : (le = l, l = pt);
        } else le = l, l = pt;
        null !== l ? (62 === n.charCodeAt(le) ? (e = wr, le++) : (e = null, 0 === ie && u(xr)), 
        null !== e ? (o = c(), null !== o ? (ee = t, r = Tr(l, o), null === r ? (le = t, 
        t = r) : t = r) : (le = t, t = pt)) : (le = t, t = pt)) : (le = t, t = pt);
      } else le = t, t = pt;
      return t;
    }
    function F() {
      var t;
      return n.substr(le, 3) === gr ? (t = gr, le += 3) : (t = null, 0 === ie && u(Rr)), 
      null === t && (n.substr(le, 2) === Gr ? (t = Gr, le += 2) : (t = null, 0 === ie && u(Or))), 
      t;
    }
    function S() {
      var t, r, l, e, o;
      if (ie++, t = le, 91 === n.charCodeAt(le) ? (r = Qr, le++) : (r = null, 0 === ie && u(jr)), 
      null !== r) if (94 === n.charCodeAt(le) ? (l = kt, le++) : (l = null, 0 === ie && u(bt)), 
      null === l && (l = ht), null !== l) {
        for (e = [], o = U(), null === o && (o = B()); null !== o; ) e.push(o), o = U(), 
        null === o && (o = B());
        null !== e ? (93 === n.charCodeAt(le) ? (o = Fr, le++) : (o = null, 0 === ie && u(Sr)), 
        null !== o ? (ee = t, r = Ur(l, e), null === r ? (le = t, t = r) : t = r) : (le = t, 
        t = pt)) : (le = t, t = pt);
      } else le = t, t = pt; else le = t, t = pt;
      return ie--, null === t && (r = null, 0 === ie && u(mr)), t;
    }
    function U() {
      var t, r, l, e;
      return ie++, t = le, r = B(), null !== r ? (45 === n.charCodeAt(le) ? (l = Lr, le++) : (l = null, 
      0 === ie && u(Mr)), null !== l ? (e = B(), null !== e ? (ee = t, r = Er(r, e), null === r ? (le = t, 
      t = r) : t = r) : (le = t, t = pt)) : (le = t, t = pt)) : (le = t, t = pt), ie--, 
      null === t && (r = null, 0 === ie && u(Br)), t;
    }
    function B() {
      var n, t;
      return ie++, n = M(), null === n && (n = L()), ie--, null === n && (t = null, 0 === ie && u(Hr)), 
      n;
    }
    function L() {
      var t, r;
      return t = le, zr.test(n.charAt(le)) ? (r = n.charAt(le), le++) : (r = null, 0 === ie && u(Zr)), 
      null !== r && (ee = t, r = $r(r)), null === r ? (le = t, t = r) : t = r, t;
    }
    function M() {
      var n;
      return n = $(), null === n && (n = tt(), null === n && (n = D(), null === n && (n = P(), 
      null === n && (n = W(), null === n && (n = I(), null === n && (n = J(), null === n && (n = K(), 
      null === n && (n = N(), null === n && (n = V(), null === n && (n = X(), null === n && (n = Y(), 
      null === n && (n = nt(), null === n && (n = lt(), null === n && (n = et(), null === n && (n = ut(), 
      null === n && (n = ot(), null === n && (n = ct()))))))))))))))))), n;
    }
    function E() {
      var n;
      return n = H(), null === n && (n = Z(), null === n && (n = z())), n;
    }
    function H() {
      var t, r;
      return t = le, 46 === n.charCodeAt(le) ? (r = _r, le++) : (r = null, 0 === ie && u(qr)), 
      null !== r && (ee = t, r = Dr()), null === r ? (le = t, t = r) : t = r, t;
    }
    function z() {
      var t, r;
      return ie++, t = le, Wr.test(n.charAt(le)) ? (r = n.charAt(le), le++) : (r = null, 
      0 === ie && u(Ir)), null !== r && (ee = t, r = $r(r)), null === r ? (le = t, t = r) : t = r, 
      ie--, null === t && (r = null, 0 === ie && u(Pr)), t;
    }
    function Z() {
      var n;
      return n = _(), null === n && (n = q(), null === n && (n = tt(), null === n && (n = D(), 
      null === n && (n = P(), null === n && (n = W(), null === n && (n = I(), null === n && (n = J(), 
      null === n && (n = K(), null === n && (n = N(), null === n && (n = V(), null === n && (n = X(), 
      null === n && (n = Y(), null === n && (n = nt(), null === n && (n = rt(), null === n && (n = lt(), 
      null === n && (n = et(), null === n && (n = ut(), null === n && (n = ot(), null === n && (n = ct()))))))))))))))))))), 
      n;
    }
    function $() {
      var t, r;
      return t = le, n.substr(le, 2) === Jr ? (r = Jr, le += 2) : (r = null, 0 === ie && u(Kr)), 
      null !== r && (ee = t, r = Nr()), null === r ? (le = t, t = r) : t = r, t;
    }
    function _() {
      var t, r;
      return t = le, n.substr(le, 2) === Jr ? (r = Jr, le += 2) : (r = null, 0 === ie && u(Kr)), 
      null !== r && (ee = t, r = Vr()), null === r ? (le = t, t = r) : t = r, t;
    }
    function q() {
      var t, r;
      return t = le, n.substr(le, 2) === Xr ? (r = Xr, le += 2) : (r = null, 0 === ie && u(Yr)), 
      null !== r && (ee = t, r = nl()), null === r ? (le = t, t = r) : t = r, t;
    }
    function D() {
      var t, r;
      return t = le, n.substr(le, 2) === tl ? (r = tl, le += 2) : (r = null, 0 === ie && u(rl)), 
      null !== r && (ee = t, r = ll()), null === r ? (le = t, t = r) : t = r, t;
    }
    function P() {
      var t, r;
      return t = le, n.substr(le, 2) === el ? (r = el, le += 2) : (r = null, 0 === ie && u(ul)), 
      null !== r && (ee = t, r = ol()), null === r ? (le = t, t = r) : t = r, t;
    }
    function W() {
      var t, r;
      return t = le, n.substr(le, 2) === cl ? (r = cl, le += 2) : (r = null, 0 === ie && u(al)), 
      null !== r && (ee = t, r = il()), null === r ? (le = t, t = r) : t = r, t;
    }
    function I() {
      var t, r;
      return t = le, n.substr(le, 2) === sl ? (r = sl, le += 2) : (r = null, 0 === ie && u(fl)), 
      null !== r && (ee = t, r = pl()), null === r ? (le = t, t = r) : t = r, t;
    }
    function J() {
      var t, r;
      return t = le, n.substr(le, 2) === hl ? (r = hl, le += 2) : (r = null, 0 === ie && u(dl)), 
      null !== r && (ee = t, r = Cl()), null === r ? (le = t, t = r) : t = r, t;
    }
    function K() {
      var t, r;
      return t = le, n.substr(le, 2) === vl ? (r = vl, le += 2) : (r = null, 0 === ie && u(Al)), 
      null !== r && (ee = t, r = kl()), null === r ? (le = t, t = r) : t = r, t;
    }
    function N() {
      var t, r;
      return t = le, n.substr(le, 2) === bl ? (r = bl, le += 2) : (r = null, 0 === ie && u(yl)), 
      null !== r && (ee = t, r = wl()), null === r ? (le = t, t = r) : t = r, t;
    }
    function V() {
      var t, r;
      return t = le, n.substr(le, 2) === xl ? (r = xl, le += 2) : (r = null, 0 === ie && u(Tl)), 
      null !== r && (ee = t, r = gl()), null === r ? (le = t, t = r) : t = r, t;
    }
    function X() {
      var t, r;
      return t = le, n.substr(le, 2) === Rl ? (r = Rl, le += 2) : (r = null, 0 === ie && u(Gl)), 
      null !== r && (ee = t, r = Ol()), null === r ? (le = t, t = r) : t = r, t;
    }
    function Y() {
      var t, r;
      return t = le, n.substr(le, 2) === ml ? (r = ml, le += 2) : (r = null, 0 === ie && u(Ql)), 
      null !== r && (ee = t, r = jl()), null === r ? (le = t, t = r) : t = r, t;
    }
    function nt() {
      var t, r;
      return t = le, n.substr(le, 2) === Fl ? (r = Fl, le += 2) : (r = null, 0 === ie && u(Sl)), 
      null !== r && (ee = t, r = Ul()), null === r ? (le = t, t = r) : t = r, t;
    }
    function tt() {
      var t, r, l;
      return t = le, n.substr(le, 2) === Bl ? (r = Bl, le += 2) : (r = null, 0 === ie && u(Ll)), 
      null !== r ? (n.length > le ? (l = n.charAt(le), le++) : (l = null, 0 === ie && u(Ml)), 
      null !== l ? (ee = t, r = El(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function rt() {
      var t, r, l;
      return t = le, 92 === n.charCodeAt(le) ? (r = Hl, le++) : (r = null, 0 === ie && u(zl)), 
      null !== r ? (Zl.test(n.charAt(le)) ? (l = n.charAt(le), le++) : (l = null, 0 === ie && u($l)), 
      null !== l ? (ee = t, r = _l(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    function lt() {
      var t, r, l, e;
      if (t = le, n.substr(le, 2) === ql ? (r = ql, le += 2) : (r = null, 0 === ie && u(Dl)), 
      null !== r) {
        if (l = [], Pl.test(n.charAt(le)) ? (e = n.charAt(le), le++) : (e = null, 0 === ie && u(Wl)), 
        null !== e) for (;null !== e; ) l.push(e), Pl.test(n.charAt(le)) ? (e = n.charAt(le), 
        le++) : (e = null, 0 === ie && u(Wl)); else l = pt;
        null !== l ? (ee = t, r = Il(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
        t = pt);
      } else le = t, t = pt;
      return t;
    }
    function et() {
      var t, r, l, e;
      if (t = le, n.substr(le, 2) === Jl ? (r = Jl, le += 2) : (r = null, 0 === ie && u(Kl)), 
      null !== r) {
        if (l = [], Nl.test(n.charAt(le)) ? (e = n.charAt(le), le++) : (e = null, 0 === ie && u(Vl)), 
        null !== e) for (;null !== e; ) l.push(e), Nl.test(n.charAt(le)) ? (e = n.charAt(le), 
        le++) : (e = null, 0 === ie && u(Vl)); else l = pt;
        null !== l ? (ee = t, r = Xl(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
        t = pt);
      } else le = t, t = pt;
      return t;
    }
    function ut() {
      var t, r, l, e;
      if (t = le, n.substr(le, 2) === Yl ? (r = Yl, le += 2) : (r = null, 0 === ie && u(ne)), 
      null !== r) {
        if (l = [], Nl.test(n.charAt(le)) ? (e = n.charAt(le), le++) : (e = null, 0 === ie && u(Vl)), 
        null !== e) for (;null !== e; ) l.push(e), Nl.test(n.charAt(le)) ? (e = n.charAt(le), 
        le++) : (e = null, 0 === ie && u(Vl)); else l = pt;
        null !== l ? (ee = t, r = te(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
        t = pt);
      } else le = t, t = pt;
      return t;
    }
    function ot() {
      var t, r;
      return t = le, n.substr(le, 2) === ql ? (r = ql, le += 2) : (r = null, 0 === ie && u(Dl)), 
      null !== r && (ee = t, r = re()), null === r ? (le = t, t = r) : t = r, t;
    }
    function ct() {
      var t, r, l;
      return t = le, 92 === n.charCodeAt(le) ? (r = Hl, le++) : (r = null, 0 === ie && u(zl)), 
      null !== r ? (n.length > le ? (l = n.charAt(le), le++) : (l = null, 0 === ie && u(Ml)), 
      null !== l ? (ee = t, r = $r(l), null === r ? (le = t, t = r) : t = r) : (le = t, 
      t = pt)) : (le = t, t = pt), t;
    }
    var at, it = arguments.length > 1 ? arguments[1] : {}, st = {
      regexp: c
    }, ft = c, pt = null, ht = "", dt = "|", Ct = '"|"', vt = function(n, t) {
      return t ? new Alternate(n, t[1]) : n;
    }, At = function(n, t, r) {
      return new Match([ n ].concat(t).concat([ r ]));
    }, kt = "^", bt = '"^"', yt = function() {
      return new Token("start");
    }, wt = "$", xt = '"$"', Tt = function() {
      return new Token("end");
    }, gt = function(n, t) {
      return new Quantified(n, t);
    }, Rt = "Quantifier", Gt = function(n, t) {
      return t && (n.greedy = !1), n;
    }, Ot = "{", mt = '"{"', Qt = ",", jt = '","', Ft = "}", St = '"}"', Ut = function(n, t) {
      return new Quantifier(n, t);
    }, Bt = ",}", Lt = '",}"', Mt = function(n) {
      return new Quantifier(n, 1/0);
    }, Et = function(n) {
      return new Quantifier(n, n);
    }, Ht = "+", zt = '"+"', Zt = function() {
      return new Quantifier(1, 1/0);
    }, $t = "*", _t = '"*"', qt = function() {
      return new Quantifier(0, 1/0);
    }, Dt = "?", Pt = '"?"', Wt = function() {
      return new Quantifier(0, 1);
    }, It = /^[0-9]/, Jt = "[0-9]", Kt = function(n) {
      return +n.join("");
    }, Nt = "(", Vt = '"("', Xt = ")", Yt = '")"', nr = function(n) {
      return n;
    }, tr = function(n) {
      return new CaptureGroup(n);
    }, rr = "?:", lr = '"?:"', er = function(n) {
      return new Group("non-capture-group", n);
    }, ur = "?=", or = '"?="', cr = function(n) {
      return new Group("positive-lookahead", n);
    }, ar = "?!", ir = '"?!"', sr = function(n) {
      return new Group("negative-lookahead", n);
    }, fr = "?<=", pr = '"?<="', hr = function(n) {
      return new Group("positive-lookbehind", n);
    }, dr = "?<!", Cr = '"?<!"', vr = function(n) {
      return new Group("negative-lookbehind", n);
    }, Ar = /^[A-Za-z_]/, kr = "[A-Za-z_]", br = /^[A-Za-z0-9_]/, yr = "[A-Za-z0-9_]", wr = ">", xr = '">"', Tr = function(n, t) {
      return new CaptureGroup(t, n);
    }, gr = "?P<", Rr = '"?P<"', Gr = "?<", Or = '"?<"', mr = "CharacterSet", Qr = "[", jr = '"["', Fr = "]", Sr = '"]"', Ur = function(n, t) {
      return new CharSet(!!n, t);
    }, Br = "CharacterRange", Lr = "-", Mr = '"-"', Er = function(n, t) {
      return new CharacterRange(n, t);
    }, Hr = "Character", zr = /^[^\\\]]/, Zr = "[^\\\\\\]]", $r = function(n) {
      return new Literal(n);
    }, _r = ".", qr = '"."', Dr = function() {
      return new Token("any-character");
    }, Pr = "Literal", Wr = /^[^|\\\/.[()?+*$\^]/, Ir = "[^|\\\\\\/.[()?+*$\\^]", Jr = "\\b", Kr = '"\\\\b"', Nr = function() {
      return new Token("backspace");
    }, Vr = function() {
      return new Token("word-boundary");
    }, Xr = "\\B", Yr = '"\\\\B"', nl = function() {
      return new Token("non-word-boundary");
    }, tl = "\\d", rl = '"\\\\d"', ll = function() {
      return new Token("digit");
    }, el = "\\D", ul = '"\\\\D"', ol = function() {
      return new Token("non-digit");
    }, cl = "\\f", al = '"\\\\f"', il = function() {
      return new Token("form-feed");
    }, sl = "\\n", fl = '"\\\\n"', pl = function() {
      return new Token("line-feed");
    }, hl = "\\r", dl = '"\\\\r"', Cl = function() {
      return new Token("carriage-return");
    }, vl = "\\s", Al = '"\\\\s"', kl = function() {
      return new Token("white-space");
    }, bl = "\\S", yl = '"\\\\S"', wl = function() {
      return new Token("non-white-space");
    }, xl = "\\t", Tl = '"\\\\t"', gl = function() {
      return new Token("tab");
    }, Rl = "\\v", Gl = '"\\\\v"', Ol = function() {
      return new Token("vertical-tab");
    }, ml = "\\w", Ql = '"\\\\w"', jl = function() {
      return new Token("word");
    }, Fl = "\\W", Sl = '"\\\\W"', Ul = function() {
      return new Token("non-word");
    }, Bl = "\\c", Ll = '"\\\\c"', Ml = "any character", El = function(n) {
      return new ControlCharacter(n);
    }, Hl = "\\", zl = '"\\\\"', Zl = /^[1-9]/, $l = "[1-9]", _l = function(n) {
      return new BackReference(n);
    }, ql = "\\0", Dl = '"\\\\0"', Pl = /^[0-7]/, Wl = "[0-7]", Il = function(n) {
      return new Octal(n.join(""));
    }, Jl = "\\x", Kl = '"\\\\x"', Nl = /^[0-9a-fA-F]/, Vl = "[0-9a-fA-F]", Xl = function(n) {
      return new Hex(n.join(""));
    }, Yl = "\\u", ne = '"\\\\u"', te = function(n) {
      return new Unicode(n.join(""));
    }, re = function() {
      return new Token("null-character");
    }, le = 0, ee = 0, ue = 0, oe = {
      line: 1,
      column: 1,
      seenCR: !1
    }, ce = 0, ae = [], ie = 0;
    if ("startRule" in it) {
      if (!(it.startRule in st)) throw new Error("Can't start parsing from rule \"" + it.startRule + '".');
      ft = st[it.startRule];
    }
    if (Token.offset = l, Token.text = r, at = ft(), null !== at && le === n.length) return at;
    throw o(ae), ee = Math.max(le, ce), new t(ae, ee < n.length ? n.charAt(ee) : null, ee, e(ee).line, e(ee).column);
  }
  return n(t, Error), {
    SyntaxError: t,
    parse: r
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
exports.Literal = Literal, Literal.prototype = Object.create(Token.prototype), Literal.prototype.constructor = Literal, 
exports.Unicode = Unicode, Unicode.prototype = Object.create(Token.prototype), Unicode.prototype.constructor = Unicode, 
exports.Hex = Hex, Hex.prototype = Object.create(Token.prototype), Hex.prototype.constructor = Hex, 
exports.Octal = Octal, Octal.prototype = Object.create(Token.prototype), Octal.prototype.constructor = Octal, 
exports.BackReference = BackReference, BackReference.prototype = Object.create(Token.prototype), 
BackReference.prototype.constructor = BackReference, exports.ControlCharacter = ControlCharacter, 
ControlCharacter.prototype = Object.create(Token.prototype), ControlCharacter.prototype.constructor = ControlCharacter;