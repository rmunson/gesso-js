/*!
 * gesso.js - A simple wrapper for html canvas streamlining.
 * (c) 2012 Russell Munson
 * http://github.com/fallenice/gesso
 */ 
 (function(global){
	var meth,
		og=document.createElement('canvas').getContext('2d'),
		interface={},
		wrap=function(_meth){
			return typeof og[_meth]==="function" ? function(){
					//Return value if available, or chain.
				return this._ctx_[_meth].apply(this._ctx_,arguments) || this;
			} : function(val){
				this._ctx_[_meth]=val;
				return this;
			};
		},
		gesso = function(can){
			this._ctx_=can && can.getContext && can.getContext('2d');
		};

	for(meth in og){
		interface[meth]=wrap(meth);
	}
	gesso.prototype=interface;
	global.gesso=function(can){
		return new gesso(can);
	};
	og=null;
})(this);