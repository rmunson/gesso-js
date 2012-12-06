/*
 * gesso.js - A simple wrapper for html canvas streamlining.
 * (c) 2012 Russell Munson
 * http://github.com/fallenice/gesso
 */ 
 (function(global,define){

	var meth,
		og=this.document && document.createElement('canvas').getContext('2d'),
		interface={},

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
			return this._ctx_[_meth].apply(this._ctx_,arguments) || this;
		} : function(val){
			this._ctx_[_meth]=val;
			return this;
		};
	},
		/* used in constructing api (free to clear) */
	grouper = function(item){
		var og=interface[item],
			run=function(props){
				for(var key in props){
					this[item+cap(key)] && this[item+cap(key)].apply(this,ensureArray(props[key]));
				}
			return this
		};
		return og ? function(props){
			return !props ? og.call(this) : run.call(this,props);
		} : run
	},
		
	gesso = function(can){
		this._ctx_=can && can.getContext && can.getContext('2d');
	};

	for(meth in og){
		interface[meth]=wrap(meth);
	}

	'shadow,line,text,fill,stroke'.split(',').forEach(function(group){
		interface[group]=grouper(group);
	});
	gesso.prototype=interface;

 	/**
 	 * Expose Gesso for CommonJS, AMD, or non-require environments.
 	 * Use available define method or attach to exports if present. Otherwise
 	 * assign to window.gesso.
 	 * @param  {function} g Closure function to handle setup.
 	 */
 	global.gesso=define(function(){
		return function(can){
			console.log(can);
			return new gesso(can);
		};
	});
	/* clear out garbage */
	og=wrap=grouper=meth=null;
})(this, this.require && this.define || function(g){
	if(typeof module!=='undefined' && module.exports){
		module.exports=g();
	} else{
		return g();
	}
});