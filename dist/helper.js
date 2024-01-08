"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require("./constants"),
  dbKeys = _require.dbKeys,
  RESPONSES_SHEET_ID = _require.RESPONSES_SHEET_ID,
  SCOPES = _require.SCOPES;
var _require2 = require("google-auth-library"),
  JWT = _require2.JWT;
var _require3 = require("google-spreadsheet"),
  GoogleSpreadsheet = _require3.GoogleSpreadsheet;
require("dotenv").config();
var CREDENTIALS = {
  type: "service_account",
  project_id: "able-memento-410214",
  private_key_id: "55c1daeb10e5711063ce48ffc3f6ba5858c7ed8e",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC++1/BK2vmEWZF\nvwqOLl2z0DugLmTpjOWBEOq38icqz+ynh7vL/hHcT+3dhgdHJqLFrUqxZla31J4y\nLthfmKYDA60ieA5ASOX26NIGj8rPVrp4e78HfGvbNCEwJGo7Uu77sIL7x2ODVdxL\nrg2hhRWUW1YgE/OhV8w+y1v/gHMmSNFkNuce/5ama7psLr/L5iPaGsK/P9ZZtSVY\nildmLNwVrXvAq5Fs7xffzka919/ZIG9lwz2GMTmlR0JNShRddkgykkWVpJxS63uQ\nzNrPiVE8VUpMzy9CC6L8lhYvkp0fJEDp9qxlfUPVlZ7R8iNK8/vasqclU4BHAn1K\nBmZKlcrJAgMBAAECggEAECSIQfgtHRvAZMnSlxUFN5M0zwPM5M7TgVbQOC8gL2a2\nzqxS69m0YcZhyTUwfUufO407wIXxc4Vlv8Ek6eOpuJyBcGXscnOW+IlSY1qZHnBq\nv49aJMRYC4W6/mo9jnkimSSg1a5TU4EY5061eT8aBVm5DGoTUEJvEam3w390fDpL\nBmo2hGsNyPVRIjHNbbIDj0prSjfhxZg/NYrESDAO/IP9n/R1p9ZNRLNIqOU7Xc3k\nq8I5rQFYZ8v6GCeoX9kc0AtDZ2lLsNAKPVm/21gNvX2tbnOE7f4UAxeif7Cpb2I3\nKreqVsngI7jwmVlyv2O7oIK0740RNEslD2DVb7rZrwKBgQDo9CrrnABpfJr+JTc7\nEgl1PrHWz6igLu4lQXF7oTiEaUNzu2meN8FcokrFHAfQQvlRLg9EyMzdOU+6O57u\nPr3qZJwjpg9eDXv9sAgnSIsIEM+YPAdLYV7kSo/JOav4G4AgZVhItNYekUNw0E+0\nO+EbQ8Ya/j37efYY78YgjS9JKwKBgQDR4Dgemtb2E4M7J+/63v9OrT/PmcOfjuXt\nIRp77K6wyvxKbpMMuh0osm58VRSDoInyZm4B4SMifIo3589+mHhsK3KuNYSaBfNW\nKZn3nmGqCBSLljmI59xSURW7U51YFvOQ19tpbDNiSZAFjmAupQmiQmJNVicFmsZo\niKeFpncZ2wKBgCVKaNB8kYhRXRJP7M507bSqC5fieBDkUlT+a+cpgL2ZiCWvm5Gr\nRTXJ+QQin5GUFwsKv4D4T+sd8IhUYPWsb4RlBKWkQJOCvxV2J2f6cd8hqcmp2lUT\nyjfrQ6cnp0K5TEJjVsWUxS3xfQVDI28rorZVnBHYHx3xgRau012EnEwvAoGAD4Mv\nIrP3J4ERthGhnz1USZBsov+OggCh5gEIYBiCYPbf5vB9Vfd7qEJoADCZr5DyIUSI\n5QKrAiWKYc90erryS6x6cX3rKyc9cSTqCG9gcJzgR+D2p7PbiQoNPSdU/enUXuRV\nh1lEAwPE7WQ0n737FE8rzOONRtDF0XwoRaykKPkCgYEAnSrTNNsw0mLInft/d41d\neIc5JZgzSDbDY5P1ABevJjVkTfvt7HvudKcAmKPugtllQQ4M5oaRcIJv9JHqAA1r\njmupQ/A7kaMywYVeTQNumaIKxtFerhBINRJiGGouUbPwA7p+8CbuL59WkW8TAON2\ngVQ2NSpeVoVXto0rf+87N4I=\n-----END PRIVATE KEY-----\n",
  client_email: "nest-359@able-memento-410214.iam.gserviceaccount.com",
  client_id: "100673792993612692273",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/nest-359%40able-memento-410214.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};
var jwt = new JWT({
  email: CREDENTIALS.client_email,
  key: CREDENTIALS.private_key,
  scopes: SCOPES
});
var sheetTitle = {
  appointment: 0,
  prescribes: 1,
  patient: 2,
  physician: 3
};
var createPatientObject = function createPatientObject(keys, values) {
  var patientObject = {};
  keys.forEach(function (key, index) {
    patientObject[key] = values[index];
  });
  return patientObject;
};
var updateRow = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(sheet, PatientID, updatedData) {
    var row;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return findRow(sheet, PatientID);
        case 2:
          row = _context.sent;
          row.assign(updatedData);
          _context.next = 6;
          return row.save();
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function updateRow(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var addRowToSheet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sheet, data) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return sheet.addRow(data);
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addRowToSheet(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllRows = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sheet) {
    var allRows, rowsArr;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return sheet.getRows();
        case 2:
          allRows = _context3.sent;
          rowsArr = [];
          allRows.forEach(function (row) {
            return rowsArr.push(createPatientObject(dbKeys, row._rawData));
          });
          return _context3.abrupt("return", rowsArr);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getAllRows(_x6) {
    return _ref3.apply(this, arguments);
  };
}();
var findRow = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(sheet, PatientID) {
    var rows, row;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return sheet.getRows();
        case 2:
          rows = _context4.sent;
          row = rows.find(function (row) {
            return row.get("PatientID") === PatientID;
          });
          return _context4.abrupt("return", row);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function findRow(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getGoogleSheet = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(sheetName) {
    var doc, sheet;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID, jwt);
          _context5.next = 4;
          return doc.loadInfo();
        case 4:
          sheet = doc.sheetsByIndex[sheetTitle[sheetName]];
          return _context5.abrupt("return", sheet);
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log("sheet not found", _context5.t0.message);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getGoogleSheet(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
var findRowByQuery = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(sheet, searchQuery) {
    var allRows, searchQueryLowerCase, resultRows, rowsArr;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return sheet.getRows();
        case 2:
          allRows = _context6.sent;
          searchQueryLowerCase = searchQuery.toLowerCase();
          resultRows = allRows.filter(function (row) {
            return row.get("PatientID").toLowerCase().includes(searchQueryLowerCase) || row.get("First_Name").toLowerCase().includes(searchQueryLowerCase) || row.get("Last_Name").toLowerCase().includes(searchQueryLowerCase) || row.get("Phone").toLowerCase().includes(searchQueryLowerCase) || row.get("Location").toLowerCase().includes(searchQueryLowerCase);
          });
          rowsArr = [];
          resultRows.forEach(function (row) {
            return rowsArr.push(createPatientObject(dbKeys, row._rawData));
          });
          return _context6.abrupt("return", rowsArr);
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function findRowByQuery(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  createPatientObject: createPatientObject,
  addRowToSheet: addRowToSheet,
  findRow: findRow,
  getGoogleSheet: getGoogleSheet,
  getAllRows: getAllRows,
  updateRow: updateRow,
  findRowByQuery: findRowByQuery
};