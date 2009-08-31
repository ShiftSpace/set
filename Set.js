(function() {
  
var $encoder;
// the following is commented out until the Native JSON parse in FireFox becomes more lax - David 8/19/09
/*
if((Browser.Engine.gecko && Browser.Engine.version) >= 19 ||
   (Browser.Engine.webkit && Browser.Engine.version >= 525)) {
  // remove MooTools JSON
  delete Hash.prototype.toJSON;
  delete Array.prototype.toJSON;
  delete String.prototype.toJSON;
  delete Number.prototype.toJSON;
  delete window.JSON;
  $encoder = JSON.encode = JSON.stringify;
  $decoder = JSON.decode = JSON.parse;
} else {*/
  $encoder = JSON.encode;
  $decoder = JSON.decoder;
//}
  
function $normalize(v) {
  if($type(v) == "array") return v.normalize();
  if($type(v) == "hash") v = v.getClean();
  if($type(v) == "object") {
    var result = [];
    var sortArray = [];
    for(var k in v) sortArray.push(k);
    sortArray.sort();
    for(var i = 0, l = sortArray.length; i < l; i++) {
      var k = sortArray[i];
      result.push([k, $normalize(v[k])]);
    }
    return result;
  }
  return v;
}

window.$hash = function(v) {
  return $encoder($normalize(v));
};

Array.implement({
  normalize: function() {
    var result = [];
    for(var i = 0, l = this.length; i < l; i++) result.push($normalize(this[i]));
    return result;
  }
});

window.Set = new Class({
  initialize: function(ary) {
    this.isset = true;
    this.rep = {};
    if(ary && !ary.isset) {
      for(var i = 0, len = ary.length; i < len; i++) this.rep[$hash(ary[i])] = ary[i];
    } else if(ary) {
      this.rep = ary.rep;
    }
  },
  
  put: function(v) {
    this.rep[$hash(v)] = v;
  },
  
  get: function(v) {
    return this.rep[$hash(v)];
  },
  
  remove: function(v) {
    delete this.rep[$hash(v)];
  },
  
  intersection: function(set) {
    var result = new Set();
    set = new Set(set);
    for(var k in this.rep) {
      var v = this.rep[k], hashed = $hash(v);
      if(set.rep[hashed]) result.rep[hashed] = v;
    }
    return result;
  },
  
  aintersection: function(set){ return this.intersection(set).toArray(); },

  difference: function(set) {
    var result = new Set();
    set = new Set(set);
    for(var k in this.rep) {
      var v = this.rep[k], hashed = $hash(v);
      if(!set.rep[hashed]) result.rep[hashed] = v;
    }
    for(var k in set.rep) {
      var v = set.rep[k], hashed = $hash(v);
      if(!this.rep[hashed]) result.rep[hashed] = v;
    }
    return result;
  },
  
  adifference: function(set){ return this.difference(set).toArray(); },
  
  union: function(set) {
    var result = new Set();
    set = new Set(set);
    for(var k in this.rep) result.rep[k] = this.rep[k];
    for(var k in set.rep) result.rep[k] = set.rep[k];
    return result;
  },
  
  aunion: function(set) { return this.union(set).toArray(); },
  
  toArray: function() {
    var result = [];
    for(var k in this.rep) result.push(this.rep[k]);
    return result;
  },
  
  isEqual: function(set) {
    set = new Set(set);
    for(var k in this.rep) if(!set.rep[k]) return false;
    return true;
  },

  each: function(fn, bind) {
    for(var k in this.rep) fn.call(bind, this.rep[k], this);
  },

  map: function (fn, bind) {
    var result = new Set();
    for(var k in this.rep) {
      var v = fn.call(bind, this.rep[k], this);
      result.rep[$hash(v)] = v;
    }
    return result;
  },

  filter: function(fn, bind) {
    var result = new Set();
    for(var k in this.rep) {
      var v = this.rep[k];
      var bool = fn.call(bind, v, this);
      if(bool) result.rep[k] = v;
    }
    return result;
  }
});

})()