/*
 * gesso.js - A simple wrapper for html canvas streamlining.
 * (c) 2012 Russell Munson
 * http://github.com/fallenice/gesso
 */ 
 (function(global){
	var meth,
		og=document.createElement('canvas').getContext('2d'),
		interface={},
	cap = function(str){
		return str.charAt(0).toUpperCase() + str.substr(1);
	},
	ensureArray = function (obj){
		return obj = obj && (Array.isArray(obj) ? obj : [obj]) || [];
    },
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
	},
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
	};

	for(meth in og){
		interface[meth]=wrap(meth);
	}

	'shadow,line,text,line,fill,stroke'.replace(/(\w+)(?:,|$)/g,function($0,group){
		interface[group]=grouper(group);
	});

	gesso.prototype=interface;
	global.gesso=function(can){
		return new gesso(can);
	};
	og=null;
})(this);