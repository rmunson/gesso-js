/*
 * gesso.js - "Canvas and canvas context wrapper.  Supplies a chainable api of canvas methods, and command grouping."
 * (c) 2012 Russell Munson
 * http://github.com/rmunson/gesso
 */ 

(function (factory, root) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else{
        var undef = undefined;
        var root = typeof window !== undef ? window : typeof global !== undef ? global : this; 
    	root.gesso = factory();
    }
})(function () {
	'use strict'
    var TWOD = '2d';
    var FUNC = 'function';

	var meth;
    var can = window.document && document.createElement('canvas');
    var og = can && can.getContext && can.getContext(TWOD) || {};
    var proto={};
    var isArray = Array.isArray;

	var cap = function (str) {
		return str.charAt(0).toUpperCase() + str.substr(1);
	};

	var ensureArray = function (obj) {
		return obj && (isArray(obj) ? obj : [obj]) || [];
    };
    	/* used in constructing api (free to clear) */
	var wrap = function (_meth) {
		return typeof og[_meth] === FUNC ? function () {
            var ctxMethod = this._ctx_[_meth];
				//Return value if available, or chain.
			return ctxMethod && ctxMethod.apply(this._ctx_,arguments) || this;
		} : function (val) {
			this._ctx_[_meth]=val;
			return this;
		};
	};
		/* used in constructing api (free to clear) */
	var grouper = function (item) {
		var og = proto[item];
        var run = function (props) {
            var key;
            var capKey;
			for (key in props) {
                capKey = item + cap(key);
				this[capKey] && this[capKey].apply(this, ensureArray(props[key]));
			}
			return this
		};

		return og ? function (props) {
			return !props ? og.call(this) : run.call(this,props);
		} : run
	};
		
	for (meth in og) {
		proto[meth] = wrap(meth);
	}

	['shadow', 'line', 'text', 'fill', 'stroke'].forEach(function (group) {
		proto[group] = grouper(group);
	});

	proto.getContext = function () {
		return this._ctx_;
	};
	proto.getCanvas = function () {
		return this._ctx_.canvas;
	};

	function gesso ( can ) {
		if (!(this instanceof gesso)) {
			return new gesso(can);
		}
		this._ctx_ = can && can.getContext && can.getContext(TWOD) || {};
	};

	gesso.prototype=proto;

	/* clear out garbage */
	can = og = wrap = grouper = meth = null;

 	/**
 	 * Expose gesso for CommonJS, AMD, or non-require environments.
 	 * Use available define method or attach to exports if present. Otherwise
 	 * assign to window.gesso.
 	 * @param  {function} g Closure function to handle setup.
 	 */
 	return gesso;
});