(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ByteBeat = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ByteBeat = exports.ByteBeat = function () {
  function ByteBeat(context) {
    var _this = this;

    _classCallCheck(this, ByteBeat);

    var BUFFER_SIZE = 1024;

    this._context = context;
    this._processor = context.createScriptProcessor(BUFFER_SIZE, 1, 1);
    this._sampleRate = 8000;
    this._t = 0;
    this._step = 0;

    this.code = "Math.sin(t) * 127 + 127";

    this._processor.onaudioprocess = function (e) {
      var stepSize = _this._context.sampleRate / _this._sampleRate;
      var data = e.outputBuffer.getChannelData(0);
      data.forEach(function (v, i) {
        data[i] = _this.calc(_this._t);
        if (Math.floor(++_this._step % stepSize) === 0) {
          _this._t++;
        }
      });
    };
  }

  _createClass(ByteBeat, [{
    key: "connect",
    value: function connect(destination) {
      this._processor.connect(destination);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._processor.disconnect();
    }
  }, {
    key: "calc",
    value: function calc(t) {
      return ((this._fn(t) & 255) - 127) / 255;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._t = 0;
      this._step = 0;
    }
  }, {
    key: "code",
    set: function set(value) {
      this._code = value;
      this._fn = eval("(function(){return function(t){return " + value + ";}})()");
    },
    get: function get() {
      return this._code;
    }
  }, {
    key: "sampleRate",
    set: function set(value) {
      this._sampleRate = value;
    },
    get: function get() {
      return this._sampleRate;
    }
  }, {
    key: "t",
    get: function get() {
      return this._t;
    }
  }]);

  return ByteBeat;
}();

exports.default = ByteBeat;

},{}],2:[function(require,module,exports){
"use strict";

var _bytebeat = require("./bytebeat");

var _bytebeat2 = _interopRequireDefault(_bytebeat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = _bytebeat2.default;

},{"./bytebeat":1}]},{},[2])(2)
});