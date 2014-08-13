/*
 * gesso.js - "Canvas and canvas context wrapper.  Supplies a chainable api of canvas methods, and command grouping."
 * (c) 2012 Russell Munson
 * http://github.com/rmunson/gesso
 */ 

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            return factory();
        });
    } else{
    	root.gesso=factory();
    }
})(this,function(){
	'use strict'
	var meth,
		can=window.document && document.createElement('canvas'),
		og=can && can.getContext && can.getContext('2d')||{},
		proto={},

	cap = function(str){
		return str.charAt(0).toUpperCase() + str.substr(1);
	},
	ensureArray = function (obj){
		return obj = obj && (Array.isArray(obj) ? obj : [obj]) || [];
    },

    	/* used in constructing api (free to clear) */
	wrap=function(_meth){
		return typeof og[_meth]==="function" ? function(){
				//Return value if available, or chain.
			return this._ctx_[_meth] && this._ctx_[_meth].apply(this._ctx_,arguments) || this;
		} : function(val){
			this._ctx_[_meth]=val;
			return this;
		};
	},
		/* used in constructing api (free to clear) */
	grouper = function(item){
		var og=proto[item],
			run=function(props){
				for(var key in props){
					this[item+cap(key)] && this[item+cap(key)].apply(this,ensureArray(props[key]));
				}
			return this
		};
		return og ? function(props){
			return !props ? og.call(this) : run.call(this,props);
		} : run
	};
		
	for(meth in og){
		proto[meth]=wrap(meth);
	}

	'shadow,line,text,fill,stroke'.split(',').forEach(function(group){
		proto[group]=grouper(group);
	});

	proto.getContext = function(){
		return this._ctx_;
	};
	proto.getCanvas = function(){
		return this._ctx_.canvas;
	};

	function gesso( can ){
		if(!(this instanceof gesso)){
			return new gesso(can);
		}
		this._ctx_=can && can.getContext && can.getContext('2d')||{};
	};


	gesso.prototype=proto;

	/* clear out garbage */
	can=og=wrap=grouper=meth=null;

 	/**
 	 * Expose gesso for CommonJS, AMD, or non-require environments.
 	 * Use available define method or attach to exports if present. Otherwise
 	 * assign to window.gesso.
 	 * @param  {function} g Closure function to handle setup.
 	 */
 	return gesso;
});