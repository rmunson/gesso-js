/*!
 * gesso.js - A simple wrapper for html canvas streamlining.
 * (c) 2012 Russell Munson
 * http://github.com/fallenice/gesso.js
 */ 
 (function(global){
	var i=0,
		meth,
		og=document.createElement('canvas').getContext('2d'),
		interface={},
		wrap=function(meth){
			return typeof og[meth]==="function" ? function(val){
				this._ctx_[meth](val);
				return this;
			} : function(val){
				this._ctx_[meth]=val;
				return this;
			};
		};

	for(meth in og){
		interface[meth]=wrap(meth);
	}

	global.gesso=function(can){
		var inst=Object.create(interface);
		inst._ctx_=can && can.getContext && can.getContext('2d');
		return inst;
	};
	og=null;
})(this)