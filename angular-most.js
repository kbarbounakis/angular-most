/**
 * Angular extensions
 */
angular.extend(angular, {
    /**
     * Inherit the prototype methods from one constructor into another.
     * @param {function} ctor Constructor function which needs to inherit the prototype.
     * @param {function} superCtor Constructor function to inherit prototype from.
     */
    inherits: function (ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    },
    isNotEmptyString: function(value) {
        if (typeof value === 'string') {
            return (value.length>0);
        }
        return false;
    },
    randomStr: function(length) {
        var chars = "abcdefghklmnopqursuvwxzABCDEFHJKLMNOPQURSTUVWXYZ";
        var str = "";
        for(var i = 0; i < length; i++) {
            str += chars.substr(this.randomInt(0, chars.length-1),1);
        }
        return str;
    },
    randomInt: function(min, max) {
        return Math.floor(Math.random()*max) + min;
    },
    randomColor: function() {
        var res = '#';
        for (var i = 0; i < 6; i++) {
            res += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)];
        }
        return res;
    },
    /**
     * @param {String} text The string to be translated.
     * @param {String=} localeSet An optional string that represents the locale set that contains the translated output. The default value is global.
     */
    localized: function (text, localeSet) {
        window.locales = window.locales || {};
        localeSet = localeSet || 'global';
        if (typeof text !== 'string')
            return text;
        if (text.length == 0)
            return text;
        var locale = window.locales[localeSet]
        if (locale) {
            var out = locale[text];
            if (out)
                return out;
        }
        return text;
    },
    loc:function(text, localeSet) {
        return this.localized(text, localeSet);
    },
    format: function (f) {
        if (typeof f !== 'string') {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') return '%';
            if (i >= len) return x;
            switch (x) {
                case '%s':
                    return String(args[i++]);
                case '%d':
                    return Number(args[i++]);
                case '%j':
                    return JSON.stringify(args[i++]);
                default:
                    return x;
            }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
            if (x === null || typeof x !== 'object') {
                str += ' ' + x;
            } else {
                str += ' ' + inspect(x);
            }
        }
        return str;
    },
    toParam: function (object, prefix) {
        var stack = [];
        var value;
        var key;
        if (typeof object === 'string') {
            prefix = prefix || 'data';
            return 'data=' + encodeURIComponent(object);
        }
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                value = object[ key ];
                key = prefix ? prefix + '[' + key + ']' : key;
                if (typeof value==='undefined' || value == null) {
                    value = encodeURIComponent(key) + '=';
                } else if (value instanceof Date) {
                    value = encodeURIComponent(key) + '=' + encodeURIComponent(ClientDataQueryable.escape(value));
                } else if (typeof( value ) !== 'object') {
                    value = encodeURIComponent(key) + '=' + encodeURIComponent(value);
                } else {
                    value = angular.toParam(value, key);
                }
                stack.push(value);
            }
        }
        return stack.join('&');
    },
    dasherize:function(s) {
        if (typeof s !== 'string')
            return s;
        return s.replace(/(^\s*|\s*$)/g, '').replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
    },
    idify: function(s) {
        if (typeof s !== 'string')
            return s;
        var s1 = s.replace(/(^\s*|\s*$)/g, '').replace(/(\.|\s)+(.)?/g, function(mathc, sep, c) {
            return (c ? c.toUpperCase() : '');
        });
        return s1;
    },
    camelize: function(s) {
        if (typeof s !== 'string')
            return s;
        var s1 = s.replace(/(^\s*|\s*$)/g, '').replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {
            return (c ? c.toUpperCase() : '');
        });
        return s1;
    },
    bracketize: function(s) {
        if (typeof s !== 'string')
            return s;
        return s.replace(/\.(\w+)/ig, '[$1]');
    },
    bootstrapDevice: function() {
        var sizes = ['lg', 'md', 'sm', 'xs'];
        for (var i = sizes.length - 1; i >= 0; i--) {
            var $el = angular.element('<div id="sizeTest" class="hidden-'+sizes[i]+'">&nbsp;</div>');
            $el.appendTo(angular.element('body'));
            if ($el.is(':hidden')) {
                $el.remove();
                return sizes[i];
            }
            else {
                $el.remove();
            }
        }
    }
});

if (typeof Array.isArray !== 'function') {
    Array.isArray = function (ar) {
        return (typeof ar === 'object' && Object.prototype.toString.call(ar) === '[object Array]');
    }
}
var formatRegExp = /%[sdj%]/g;
if (typeof String.format !== 'function') {
    String.format = function (f) {
        if (typeof f !== 'string') {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') return '%';
            if (i >= len) return x;
            switch (x) {
                case '%s':
                    return String(args[i++]);
                case '%d':
                    return Number(args[i++]);
                case '%j':
                    return JSON.stringify(args[i++]);
                default:
                    return x;
            }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
            if (x === null || typeof x !== 'object') {
                str += ' ' + x;
            } else {
                str += ' ' + inspect(x);
            }
        }
        return str;
    }
}

function ClientDataService($http, $q) {
    this.$http = $http;
    this.$q = $q;
}

ClientDataService.prototype.schema = function(name, callback) {
    var $http = this.$http, $q = this.$q;
    callback = callback || function() {};
    var deferred = $q.defer();
    $http({
        method: "GET",
        cache: true,
        url: "/%s/schema.json".replace(/%s/ig, name)
    }).then(function (response) {
        callback(null, response.data);
    }, function (err) {
        callback(new Error('Internal Server Error'))
    });
    return deferred.promise;
};

ClientDataService.prototype.items = function(options, callback) {
    var $http = this.$http, $q = this.$q;
    var deferred = $q.defer();
    callback = callback || function() {};
    $http({
        method: "GET",
        url: "/%s/index.json".replace(/%s/ig, options.$model),
        params: options
    }).then(function (response) {
        callback(null, response.data);
    }, function (err) {
        callback(new Error('Internal Server Error'));
    });
    return deferred.promise;
};

ClientDataService.prototype.get = function(options) {
    var $http = this.$http;
    return $http({
        method: "GET",
        url: "/%s/index.json".replace(/%s/ig, options.$model),
        params: options
    }).then(function (response) {
        return response.data;
    }, function (err) {
        return new Error('Internal Server Error');
    });
};

ClientDataService.prototype.save = function(item, options, callback) {
    var $http = this.$http, $q = this.$q;
    $http({
        method: options.method || 'POST',
        url: String.format("/%s/edit.json", options.model),
        data: angular.toParam(item, 'data'),  // pass in data as strings
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        callback(null, data);
    }).error(function (err, status, headers) {
        if (headers("X-Status-Description"))
            callback(new Error(headers("X-Status-Description")));
        else
            callback(new Error(err));
    });
};

ClientDataService.prototype.new = function(item, options, callback) {
    var $http = this.$http, $q = this.$q;
    $http({
        method: options.method || 'POST',
        url: String.format("/%s/new.json", options.model),
        data: angular.toParam(item, 'data'),  // pass in data as strings
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        callback(null, data);
    }).error(function (err, status, headers) {
        if (headers("X-Status-Description"))
            callback(new Error(headers("X-Status-Description")));
        else
            callback(new Error(err));
    });
};

ClientDataService.prototype.remove = function(item, options, callback) {
    var $http = this.$http;
    $http({
        method:'POST',
        url: String.format("/%s/remove.json", options.model),
        data: angular.toParam(item, 'data'),  // pass in data as strings
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (data) {
        callback(null, data);
    }).error(function (err, status, headers) {
        if (headers("X-Status-Description"))
            callback(new Error(headers("X-Status-Description")));
        else
            callback(new Error(err));
    });
};


/**
 * @class ClientDataQueryable
 * @param {String=} model the target model
 * @property {Array} items -A collection of object that represents the current dynamic items
 * @property {Array} item - An object that represents the current dynamic item
 * @property {ClientDataService} service - An object that represents the current client data service
 * @property {*} schema - An object that represents the underlying model's schema
 * @constructor
 */
function ClientDataQueryable(model) {
    /**
     * Gets or sets a string that represents the target model
     * @type {String}
     */
    this.$model = model;
    /**
     * @type {String}
     */
    this.$filter = undefined;
    /**
     * @type {String}
     */
    this.$prepared = undefined;
    /**
     * @type {number}
     */
    this.$top = undefined;
    /**
     * @type {number}
     */
    this.$skip = undefined;
    /**
     * @type {Boolean}
     */
    this.$array = false;
    /**
     * @private
     */
    this.privates = function() {};
    var svc;
    Object.defineProperty(this, 'service', {
        get: function() { return svc;  },
        set: function(value) { svc = value; },
        configurable:false,
        enumerable: false
    });
    var self = this;
    self.privates = function() {};

    Object.defineProperty(self, 'items', {
        get: function() {
            if (typeof self.privates.items === 'undefined') {
                var deferred = self.service.$q.defer();
                self.privates.items =  deferred.promise;
                self.service.items(angular.isDefined(self.$prepared) ? self.copy() : self, function(err, result) {
                    if (err) {
                        console.log(err);
                        self.privates.items = null;
                        deferred.reject(err);
                    }
                    else {
                        self.privates.items = result;
                        deferred.resolve(result);
                    }
                });
            }
            return self.privates.items;
        },
        set: function(value) { self.privates.items = value; }
    });

    Object.defineProperty(self, 'item', {
        get: function() {
            if (typeof self.privates.item === 'undefined') {
                var deferred = self.service.$q.defer();
                self.privates.item =  deferred.promise;
                self.service.items(angular.isDefined(self.$prepared) ?  self.first().copy() : self.first(), function(err, result) {
                    if (err) {
                        console.log(err);
                        self.privates.item = null;
                        deferred.reject(err);
                    }
                    else {
                        self.privates.item = result[0];
                        deferred.resolve(result[0]);
                    }
                });
            }
            return self.privates.item;
        },
        set: function(value) { self.privates.item = value; }
    });

    /**
     * Gets a dynamic object instance that represents the target model
     * @type {*}
     */
    Object.defineProperty(self, 'schema', {
        get: function() {
            if (typeof self.privates.schema === 'undefined') {
                self.privates.schema = self.service.schema(self.$model, function(err, result) {
                    self.privates.schema = result;
                });
            }
            return self.privates.schema;
        },
        set: function(value) { self.privates.schema = value; }
    });

}

ClientDataQueryable.prototype.data = function() {
    var self = this;
    var deferred = self.service.$q.defer();
    self.service.items(angular.isDefined(self.$prepared) ? self.copy() : self, function(err, result) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        }
        else {
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

ClientDataQueryable.prototype.reset = function() {
    delete this.privates.items; delete this.privates.item;
    return this;
}

ClientDataQueryable.prototype.copy = function() {
    var self = this, result = new ClientDataQueryable();
    var keys = Object.keys(this);
    keys.forEach(function(key) { if (key.indexOf('$')==0) {
        result[key] = self[key];
    }
    });
    if (result.$prepared) {
        if (result.$filter)
            result.$filter = angular.format('(%s) and (%s)', result.$prepared, result.$filter);
        else
            result.$filter = result.$prepared;
        delete result.$prepared;
    }
    return result;
}

ClientDataQueryable.escape = function(val)
{
    if (val === undefined || val === null) {
        return 'null';
    }

    switch (typeof val) {
        case 'boolean': return (val) ? 'true' : 'false';
        case 'number': return val+'';
    }

    if (val instanceof Date) {
        var dt = new Date(val);
        var year   = dt.getFullYear();
        var month  = ClientDataQueryable.zeroPad(dt.getMonth() + 1, 2);
        var day    = ClientDataQueryable.zeroPad(dt.getDate(), 2);
        var hour   = ClientDataQueryable.zeroPad(dt.getHours(), 2);
        var minute = ClientDataQueryable.zeroPad(dt.getMinutes(), 2);
        var second = ClientDataQueryable.zeroPad(dt.getSeconds(), 2);
        var millisecond = ClientDataQueryable.zeroPad(dt.getMilliseconds(), 3);
        val = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '.' + millisecond;
        return val;
    }

    if (typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]') {
        var values = []
        val.forEach(function(x) {
            ClientDataQueryable.escape(x);
        });
        return values.join(',');
    }

    if (typeof val === 'object') {
        if (val.hasOwnProperty('$name'))
        //return field identifier
            return val['$name'];
        else
            return this.escape(val.valueOf())
    }

    val = val.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(s) {
        switch(s) {
            case "\0": return "\\0";
            case "\n": return "\\n";
            case "\r": return "\\r";
            case "\b": return "\\b";
            case "\t": return "\\t";
            case "\x1a": return "\\Z";
            default: return "\\"+s;
        }
    });
    return "'"+val+"'";
}

ClientDataQueryable.zeroPad = function(number, length) {
    number = number || 0;
    var res = number.toString();
    while (res.length < length) {
        res = '0' + res;
    }
    return res;
}

/**
 * @private
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.append = function() {

    var self = this;
    if (self.privates.left) {
        var expr = null;

        if (self.privates.op=='in') {
            if (Array.isArray(self.privates.right)) {
                //expand values
                var exprs = [];
                self.privates.right.forEach(function(x) {
                    exprs.push(self.privates.left + ' eq ' + ClientDataQueryable.escape(x));
                });
                if (exprs.length>0)
                    expr = '(' + exprs.join(' or ') + ')';
            }
        }
        else if (self.privates.op=='nin') {
            if (Array.isArray(self.privates.right)) {
                //expand values
                var exprs = [];
                self.privates.right.forEach(function(x) {
                    exprs.push(self.privates.left + ' ne ' + ClientDataQueryable.escape(x));
                });
                if (exprs.length>0)
                    expr = '(' + exprs.join(' and ') + ')';
            }
        }
        else
            expr = self.privates.left + ' ' + self.privates.op + ' ' + ClientDataQueryable.escape(self.privates.right);
        if (expr) {
            if (typeof self.$filter === 'undefined' || self.$filter == null)
                self.$filter = expr;
            else {
                self.privates.lop = self.privates.lop || 'and';
                self.privates._lop = self.privates._lop || self.privates.lop;
                if (self.privates._lop == self.privates.lop)
                    self.$filter = self.$filter + ' ' + self.privates.lop + ' ' + expr;
                else
                    self.$filter = '(' + self.$filter + ') ' + self.privates.lop + ' ' + expr;
                self.privates._lop = self.privates.lop;
            }
        }
    }
    delete self.privates.lop;delete self.privates.left; delete self.privates.op; delete self.privates.right;
    return this;
};

ClientDataQueryable.prototype.model = function(name) {
    if (typeof name !== 'undefined' && name !=null)
        this.$model = name;
    return this;
}
/**
 *
 * @param {Boolean=|*=} value
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.inlineCount = function(value) {
    if (typeof value === 'undefined')
        this.$inlinecount = true;
    else
        this.$inlinecount = value;
    return this;
};
/**
 *
 * @param {boolean=|*=} value
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.paged = function(value) {
    return this.inlineCount(value);
};

/**
 * @param {Boolean} value
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.asArray = function(value) {
    this.$array = value
    return this;
}

/**
 * @param {Array|String} attr
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.select = function(attr) {
    if (Array.isArray(attr)) {
        this.$select = attr.join(',');
    }
    else
        this.$select = attr;
    return this;
}

/**
 * @param {Array|String} attr
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.group = function(attr) {
    if (Array.isArray(attr)) {
        this.$groupby = attr.join(',');
    }
    else
        this.$groupby = attr;
    return this;
}

/**
 * @param {Array|String} entities
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.expand = function(entities) {
    if (Array.isArray(entities)) {
        this.$expand = entities.join(',');
    }
    else
        this.$expand = entities;
}


/**
 * @param {String} s
 */
ClientDataQueryable.prototype.filter = function(s) {
    var self = this;
    delete this.$filter;
    //clear in-process expression privates
    var p = self.privates;
    delete p.left; delete p.right; delete p.op; delete p.lop; delete p._lop;
    if (typeof s !== 'string')
        return this;
    if (s.length==0)
        return this;
    //set filter
    this.$filter = s;
    return this;
};

ClientDataQueryable.prototype.prepare = function() {
    if (this.$filter) {
        if (typeof this.$prepared === 'undefined' || this.$prepared === null) {
            this.$prepared = this.$filter;
        }
        else {
            this.$prepared = angular.format('(%s) and (%s)', this.$prepared, this.$filter);
        }
    }
    return this;
};

/**
 *
 * @param s
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.andAlso = function(s) {
    var self = this;
    if (typeof s !== 'string')
        return self;
    if (s.length==0)
        return self;
    //clear in-process expression privates
    if (self.$filter) {
        self.$filter = '(' + self.$filter + ') and (' + s + ')';
    }
    var p = self.privates;
    p._lop = 'and';
    delete p.left; delete p.right; delete p.op;
    return self;
}

/**
 *
 * @param s
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.orElse = function(s) {
    var self = this;
    if (typeof s !== 'string')
        return self;
    if (s.length==0)
        return self;
    //clear in-process expression privates
    if (self.$filter)
        self.$filter = '(' + self.$filter + ') or (' + s + ')';
    else
        self.$filter = S;
    var p = self.privates;
    p._lop = 'or';
    delete p.left; delete p.right; delete p.op;
    return self;
}

/**
 * @param {number} val
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.take = function(val) {
    this.$top = val;
    return this;
}
/**
 * @param {number} val
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.first = function() {
    this.$top = 1;
    this.$skip = 0;
    return this;
}
/**
 * @param {number} val
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.skip = function(val) {
    this.$skip = val;
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.orderBy = function(name) {
    if (typeof name !=='undefined' || name!=null)
        this.$orderby = name.toString();
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.orderByDescending = function(name) {
    if (typeof name !=='undefined' || name!=null)
        this.$orderby = name.toString() + ' desc';
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.thenBy = function(name) {
    if (typeof name !=='undefined' || name!=null) {
        this.$orderby += (this.$orderby ? ',' + name.toString() : name.toString());
    }
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.thenByDescending = function(name) {
    if (typeof name !=='undefined' || name!=null) {
        this.$orderby += (this.$orderby ? ',' + name.toString() : name.toString()) + ' desc';
    }
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.where = function(name) {
    delete this.$filter;
    this.privates.left = name;
    return this;
}

/**
 * @param {String=} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.and = function(name) {
    this.privates.lop = 'and';
    if (typeof name !== 'undefined')
        this.privates.left = name;
    return this;
}

/**
 * @param {String=} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.or = function(name) {
    this.privates.lop = 'or';
    if (typeof name !== 'undefined')
        this.privates.left = name;
    return this;
}

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.equal = function(value) {
    this.privates.op = Array.isArray(value) ? 'eq' : 'eq';
    this.privates.right = value; return this.append();
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.indexOf = function(name, s) {
    this.privates.left = 'indexof(' + name + ', ' + ClientDataQueryable.escape(s) +')';
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.andIndexOf = function(name, s) {
    this.privates.lop = 'and';
    return this.indexOf(name, s);
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.orIndexOf = function(name, s) {
    this.privates.lop = 'or';
    return this.indexOf(name, s);
}

/**
 * @param {*} name
 * @param {*} s
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.endsWith = function(name, s) {
    this.privates.left = String.format('endswith(%s,%s)',name,ClientDataQueryable.escape(s));
    return this;
}

/**
 * @param {*} name
 * @param {*} s
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.startsWith = function(name, s) {
    this.privates.left = String.format('startswith(%s,%s)',name,ClientDataQueryable.escape(s));
    return this;
}

/**
 * @param {*} name
 * @param {*} s
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.substringOf = function(name, s) {
    this.privates.left = String.format('substringof(%s,%s)',name,ClientDataQueryable.escape(s));
    return this;
}

/**
 * @param {*} name
 * @param {number} pos
 * @param {number} length
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.substring = function(name, pos, length) {
    this.privates.left = String.format('substring(%s,%s,%s)',name,pos,length);
    return this;
}

/**
 * @param {*} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.length = function(name) {
    this.privates.left = String.format('length(%s)',name);
    return this;
}

/**
 * @param {*} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.toLower = function(name) {
    this.privates.left = String.format('tolower(%s)',name);
    return this;
}

/**
 * @param {*} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.toUpper = function(name) {
    this.privates.left = String.format('toupper(%s)',name);
    return this;
}

/**
 * @param {*} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.trim = function(name) {
    this.privates.left = String.format('trim(%s)',name);
    return this;
}

/**
 * @param {*} s0
 * @param {*} s1
 * @param {*=} s2
 * @param {*=} s3
 * @param {*=} s4
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.concat = function(s0, s1, s2, s3, s4) {
    this.privates.left = 'concat(' + ClientDataQueryable.escape(s0) + ',' + ClientDataQueryable.escape(s1);
    if (typeof s2 !== 'undefined')
        this.privates.left +=',' + ClientDataQueryable.escape(s2);
    if (typeof s3 !== 'undefined')
        this.privates.left +=',' + ClientDataQueryable.escape(s3)
    if (typeof s4 !== 'undefined')
        this.privates.left +=',' + ClientDataQueryable.escape(s4)
    this.privates.left +=')';
    return this;
}

ClientDataQueryable.prototype.field = function(name) {
    return { "$name":name }
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.day = function(name) {
    this.privates.left = String.format('day(%s)',name);
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.day = function(name) {
    this.privates.left = String.format('hour(%s)',name);
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.minute = function(name) {
    this.privates.left = String.format('minute(%s)',name);
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.month = function(name) {
    this.privates.left = String.format('month(%s)',name);
    return this;
}


/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.second = function(name) {
    this.privates.left = String.format('second(%s)',name);
    return this;
}


/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.year = function(name) {
    this.privates.left = String.format('year(%s)',name);
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.round = function(name) {
    this.privates.left = String.format('round(%s)',name);
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.floor = function(name) {
    this.privates.left = String.format('floor(%s)',name);
    return this;
}

/**
 * @param {String} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.ceiling = function(name) {
    this.privates.left = util.ceiling('floor(%s)',name);
    return this;
}

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.notEqual = function(value) {
    this.privates.op = Array.isArray(value) ? 'nin' : 'ne';
    this.privates.right = value; return this.append();
}


/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.greaterThan = function(value) {
    this.privates.op = 'gt';this.privates.right = value; return this.append();
}

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.greaterOrEqual = function(value) {
    this.privates.op = 'ge';this.privates.right = value; return this.append();
}

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.lowerThan = function(value) {
    this.privates.op = 'lt';this.privates.right = value; return this.append();
}

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.lowerOrEqual = function(value) {
    this.privates.op = 'le';this.privates.right = value; return this.append();
}

function QueryableController($scope, $svc)
{
    //$scope.init = function(options) { $scope.options = options };
    $scope.query = new ClientDataQueryable();
    $scope.query.service = $svc;
}

function CommonController($scope, $q, $location, $window, $routeParams, $shared, $route) {

    //find first element with ng-scope (root element)
    var $rootElement = angular.element(document.querySelector('.ng-scope')), $injector = $rootElement.injector();
    if ($injector) {
        //ensure application services
        if ($injector.has('$q'))
            $q = $q || $injector.get('$q');
        if ($injector.has('$location'))
            $location = $location || $injector.get('$location');
        if ($injector.has('$window'))
            $window = $window || $injector.get('$window');
        if ($injector.has('$routeParams'))
            $routeParams = $routeParams || $injector.get('$routeParams');
        if ($injector.has('$shared'))
            $shared = $shared || $injector.get('$shared');
    }
    //register broadcast emitter
    $scope.broadcast = function(name, args) {
        if (typeof $shared === 'undefined')
            return;
        $shared.broadcast(name, args);
    }
    /**
     * Gets an object that represents the client parameters, if any.
     * @type {Object}
     */
    $scope.client = { route : ($routeParams || {}) };
    //get static params (from $route)
    if ($injector.has('$route'))
        $route = $route || $injector.get('$route');
    //set static current route
    $scope.client.route.current = { };
    if ($route) {
    	if (angular.isDefined($route.current)) {
    		var $$route = $route.current.$$route;
	        if (typeof $$route !=='undefined' && $$route !==null) {
	            $scope.client.route.current = $$route;
	        }	
    	}
    }

    /**
     * Gets an object that represents the server parameters, if any.
     * @type {Object}
     */
    $scope.server = { route: ($window.route || {}) };

    $scope.today = function() {
        var res =  (new Date());
        return new Date(res.getFullYear(), res.getMonth(), res.getDate());
    };

    $scope.random = {
        color:function() {
            return angular.randomColor();
        }
    };

    /**
     * @param {string=} path
     */
    $scope.reload =function(path) {
        if (typeof path === 'undefined')
            $window.location.reload();
        else
            $location.path(path);
    };

    $scope.now = function() {
        return  (new Date());
    };

    $scope.redirect = function(path) {
        $window.location.href = path;
    }

    $scope.back = function(err) {
        if (err) {
            //do nothing
        }
        else {
            if ($scope.returnUrl) {
                $window.location.href = $scope.returnUrl;
            }
            else if (typeof $scope.client.route.r !== 'undefined') {
                var url = $window.location.search ? $window.location.pathname.concat('?', $window.location.search) : $window.location.pathname;
                $window.location.href = $scope.client.route.r == '/' ? url : $scope.client.route.r;
            }
            else if ($scope.$root.referrer) {
                //redirect to $location.path
                $window.location.href = '#'.concat($scope.$root.referrer);
            }
        }
    }

}

/**
 *
 * @param $scope
 * @param $q
 * @param $location
 * @param $svc
 * @param $window
 * @param $shared
 * @param $routeParams
 * @constructor
 */
function DataController($scope, $q, $location, $svc, $window, $shared, $routeParams)
{
    //find first element with ng-scope (root element)
    var $rootElement = angular.element(document.querySelector('.ng-scope')), $injector = $rootElement.injector();
    if ($injector) {
        //ensure application services
        if ($injector.has('$q'))
            $q = $q || $injector.get('$q');
        if ($injector.has('$location'))
            $location = $location || $injector.get('$location');
        if ($injector.has('$window'))
            $window = $window || $injector.get('$window');
        if ($injector.has('$routeParams'))
            $routeParams = $routeParams || $injector.get('$routeParams');
        if ($injector.has('$shared'))
            $shared = $shared || $injector.get('$shared');
        if ($injector.has('$svc'))
            $svc = $svc || $injector.get('$svc');
    }
    //inherits CommonController
    CommonController($scope);
    //inherits QueryableController
    QueryableController($scope, $svc);

    $scope.route = $window.route;

    $scope.reloadData = function() {
        if (!angular.isDefined($scope.query.$model))
            return;
        $scope.query.items = null;
        $svc.items($scope.query, function(err, result) {
            if (err) {
                $scope.query.items = null;
            }
            else {
                $scope.query.items = result;
            }
        });
    };

    if ($shared) {
        //register for item.new event
        $scope.$on('item.new', function(event, args) {
            args = args || {};
                if (args.model==$scope.model) { $scope.reloadData(); }
        });
        //register for item.delete event
        $scope.$on('item.delete', function(event, args) {
            args = args || {};
            if (args.model==$scope.model) { $scope.reloadData(); }
        });
        $scope.$on('item.save', function(event, args) {
            args = args || {};
            if (args.model==$scope.model) { $scope.reloadData(); }
        });
    }

    $scope.save = function() {
        $svc.save($scope.item, { model:$scope.model }, function(err, result) {
            if (err) {
                $scope.submitted = false;
                $scope.messages=angular.localized(err.message);
            }
            else {
                $scope.showNew = false;
                $scope.submitted = true;
                if ($scope.returnUrl) {
                    $window.location.href = $scope.returnUrl;
                }
                else {
                    $window.location.href = angular.format('/%s/%s/show.html', $scope.model, result.id);
                }
            }
        });
    };
    $scope.saveItems = function() {
        $svc.save($scope.query.items, { model:$scope.model }, function(err, result) {
            if (err) {
                $scope.submitted = false;
                $scope.messages=angular.localized(err.message);
            }
            else {
                $scope.submitted = true;
                if ($scope.returnUrl) {
                    $window.location.href = $scope.returnUrl;
                }
                else {
                    $window.location.href = angular.format('/%s/%s/show.html', $scope.model, result.id);
                }
            }
        });
    };
    $scope.remove = function(item,callback)
    {
        callback = callback || function() {};
        $svc.remove(item, { model:$scope.model }, function(err, result) {
            if (err) {
                $scope.submitted = false;
                $scope.messages=angular.localized(err.message);
                //invoke callback with error
                callback(err);
            }
            else {
                $scope.submitted = true;
                callback(null, result);
                //broadcast item.delete event
                if ($shared) {
                    $shared.broadcast('item.delete', { model:$scope.model, data:item });
                }
            }
        });
    };

}

function MostSharedService($rootScope, $location, $routeParams)
{
    this.$root = $rootScope;
    //set default referrer
    this.$root.referrer = "/";
    //register location change listener
    var self = this;
    /*self.$root.$on('$locationChangeStart', function ( ev, newPath, oldPath ) {
        // The down side of this method is that we get the whole url, but we are only interested in the
        // path part. So we have to parse it.
        var path = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/.exec(oldPath);
        if( path[5] ) {
            path = path[5].substr(path[5].indexOf('\/'));
        } else {
            path = '/';
        }
        self.$root.referrer = path;
    });*/

    self.$root.paths = self.$root.paths || [];
    self.$root.$on('$routeChangeSuccess', function (event, current, previous) {
        //get current route
        var $$route = current['$$route'];
        if (typeof $$route === 'undefined') {
            self.$root.paths = [];
            self.$root.$broadcast('$routeScopePathsChange', self.$root.paths);
            return;
        }
        else if ($$route.title) {
            self.$root.title = angular.localized($$route.title);
        }
        else {
            var action = $routeParams['action'], controller = $routeParams['controller'];
            var title = [];
            if (angular.isDefined(controller)) {
                title.push(angular.localized(controller));
            }
            if (angular.isDefined(action)) {
                title.push(angular.localized(action));
            }
            if (title.length>0)
                self.$root.title = title.join(' - ');
        }
        //if path already exists

        var locationPath =$location.url();
        self.$root.paths.filter(function(x) { return x.active; }).forEach(function(x) { x.active=false; });
        var ix = self.$root.paths.findIndex(function(x) { return x.href == locationPath; });
        if (ix>=0) {
            self.$root.paths.splice(ix+1);
            self.$root.paths[ix].active = true;
        }
        else
            self.$root.paths.push({ title:self.$root.title, href:locationPath, active:true});
        //set referrer
        if (self.$root.paths.length>1) {
            self.$root.referrer = self.$root.paths[self.$root.paths.length-2].href;
        }
        self.$root.$broadcast('$routeScopePathsChange', self.$root.paths);

    });

}
/**
 *
 * @param {string} name
 * @param {...*} args
 */
MostSharedService.prototype.broadcast = function(name, args) {
    var self = this;
    self.$root.$broadcast(name, args);
};

function NoopController($scope, $rootScope)
{
    $scope = $rootScope.$new();
}

function ItemController($scope, $q, $location, $svc, $window, $shared, $routeParams)
{
    //find first element with ng-scope (root element)
    var $rootElement = angular.element(document.querySelector('.ng-scope')), $injector = $rootElement.injector();
    if ($injector) {
        //ensure application services
        if ($injector.has('$q'))
            $q = $q || $injector.get('$q');
        if ($injector.has('$location'))
            $location = $location || $injector.get('$location');
        if ($injector.has('$svc'))
            $svc = $svc || $injector.get('$svc');
        if ($injector.has('$window'))
            $window = $window || $injector.get('$window');
        if ($injector.has('$shared'))
            $shared = $shared || $injector.get('$shared');
        if ($injector.has('$routeParams'))
            $routeParams = $routeParams || $injector.get('$routeParams');
    }
    //inherits CommonController
    CommonController($scope);

    $scope.broadcast = function(name, args) {
        if (typeof $shared === 'undefined')
            return;
        $shared.broadcast(name, args);
    }

    $scope.$watch('item', function(value) {
        if (angular.isDefined($scope.state) && angular.isDefined($scope.model)) {
            //if state is new
            if ($scope.state=='new') {
                //validate item
                $scope.item = $scope.item || {};
                //get model schema
                $svc.schema($scope.model, function(err, result) {
                   if (err) { return; }
                    //process schema
                    var schema = result;
                    //1. enumerate client routing properties
                    var params = {};
                    //copy client route
                    for(var key in $scope.client.route)
                        params[key]=$scope.client.route[key];
                    //append server route params
                    for(var key in $scope.server.route) {
                        if ($scope.server.route.hasOwnProperty(key) && params.hasOwnProperty(key)==false)
                            params[key]=$scope.server.route[key];
                    }

                    var resolveAssociatedObject = function(attr, associatedValue) {
                        var mapping=attr.mapping;
                        var q = new ClientDataQueryable(mapping.parentModel);
                        q.service = $svc;
                        var deferred = $q.defer();
                        //store property name to deferred
                        $scope.item[mapping.childField] = deferred.promise;
                        q.where(mapping.parentField).equal(associatedValue).item.then(function(result) {
                            $scope.item[attr.property||attr.name]=result;
                            deferred.resolve(result);
                        }, function(reason) {
                            $scope.item[attr.property||attr.name]=null;
                            deferred.resolve(null);
                            console.log('Failed to get associated object with reason:' + reason);
                        });
                    }

                    for(var key in params) {
                        if (params.hasOwnProperty(key)) {
                            //check if this property belongs to target schema
                            var attr = schema.attributes.filter(function(x) { return (x.name==key) || (x.property==key); })[0];
                            if (attr && !attr.primary) {
                                var value = params[key];
                                if (!angular.isDefined($scope.item[key])) {
                                    if (attr.mapping) {
                                        if (typeof value === 'object') {
                                            $scope.item[key]=value;
                                        }
                                        else {
                                            //query associated model
                                            if (attr.mapping.associationType==='association' && attr.mapping.childModel === $scope.model) {
                                                resolveAssociatedObject(attr, value);
                                            }
                                        }
                                    }
                                    else {
                                        $scope.item[key] = value;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    });

    $scope.redirection = true;

    $scope.route = $window.route;
    //load item
    $scope.$watch('id', function(newValue, oldValue) {
        if ($scope.state=='new')
            return;
        if (newValue!==oldValue ||  $scope.item==null) {
            var q = new ClientDataQueryable();
            q.service = $svc;
            //todo::load current model
            var item = q.model($scope.model).where('id').equal($scope.id).first().item;
            item.then(function(result) {
                $scope.item = result;
            }, function(reason) {
                console.log(reason);
                $scope.item = null;
            });
        }
    });

    $scope.cancel = function()
    {
        if ($scope.returnUrl) {
            $window.location.href = $scope.returnUrl;
        }
         else if (typeof $scope.client.route.r !== 'undefined') {
             var url = $window.location.search ? $window.location.pathname.concat('?', $window.location.search) : $window.location.pathname;
             $window.location.href = $scope.client.route.r == '/' ? url : $scope.client.route.r;
         }
        else if ($scope.$root.referrer) {
            //redirect to $location.path
            $window.location.href = '#'.concat($scope.$root.referrer);
        }
    };

    $scope.show = function() {
        //todo:: get primary key name
        var key = "id";
        if ($scope.item) {
            if ($scope.item[key])
                $window.location.href =angular.format('/%s/%s/show.html', $scope.model, $scope.item[key]);
        }
    };

    $scope.remove = function(callback)
    {
        callback = callback || function() {};
        var item = $scope.item;
        $svc.remove(item, { model:$scope.model }, function(err, result) {
            if (err) {
                $scope.submitted = false;
                $scope.messages=angular.localized(err.message);
                //invoke callback with error
                callback(err);
            }
            else {
                $scope.submitted = true;
                callback(null, result);
                //broadcast item.new event
                if ($shared) {
                    $shared.broadcast('item.delete', { model:$scope.model, data:item });
                }
            }
        });
    };


    $scope.save = function(callback) {
        callback = callback || function() {};
        $svc.save($scope.item, { model:$scope.model }, function(err, result) {
            if (err) {
                $scope.submitted = false;
                $scope.messages=angular.localized(err.message);
                //invoke callback with error
                callback(err);
            }
            else {
                $scope.showNew = false;
                $scope.submitted = true;
                $scope.item = result;
                //invoke callback
                callback(null, result);

                //broadcast item.new event
                if ($shared) {
                    $scope.state = $scope.state || 'save';
                    $shared.broadcast('item.'.concat($scope.state), { model:$scope.model, data:result });
                }

                if ($scope.redirection==false)
                    return;

                /**
                 * @ngdoc
                 * @name $scope#returnUrl
                 * @type {string}
                 */
                //if current scope has a return url
                if ($scope.returnUrl) {
                    //redirect to this url
                    $window.location.href = $scope.returnUrl;
                }
                else if (typeof $scope.client.route.r !== 'undefined') {
                    var url =  $window.location.search ? $window.location.pathname.concat('?', $window.location.search) : $window.location.pathname;
                    $window.location.href = $scope.client.route.r=='/' ? url : $scope.client.route.r;
                }
                else {
                    //otherwise
                    //validate $rootScope.referrer
                    if ($scope.$root.referrer) {
                        //redirect to $location.path
                        if ($scope.$root.referrer!=$location.path() || $scope.$root.paths.length==1)
                            $location.path($scope.$root.referrer);
                        else {
                            //find prev if any
                            var ix = $scope.$root.paths.findIndex(function(x) { return x.href == $location.path(); });
                            if (ix>0 && ix>=$scope.$root.paths.length-1) {
                                var prevUrl=$scope.$root.paths[ix - 1].href;
                                //remove items after index
                                $scope.$root.paths.splice(ix);
                                $window.location.href = '#'.concat(prevUrl);
                                //$location.path(prevUrl);
                            }
                            else {
                                $window.location.href = '#'.concat($scope.$root.referrer);
                            }
                        }
                    }
                    else {
                        //redirect to model index page
                        $window.location.href = angular.format('/%s/%s/index.html', $scope.model, result.id);
                    }
                }
            }
        });
    };
    $scope.$back = function() {
        window.history.back();
    };
}



/**
 * MOST Framework Directives
 */

function MostLocalizedDirective() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (attrs.title)
                element.attr('title', angular.localized(attrs.title, attrs['mostLoc']));
            if (attrs.placeholder)
                element.attr('placeholder', angular.localized(attrs.placeholder, attrs['mostLoc']));
        }
    };
}

function MostLocalizedHtmlDirective() {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var text = angular.localized(element.html(), attrs['mostLocHtml']);
            if (text)
                element.html(text);
        }
    };
}

function MostLocalizedFilter() {
    return function(input, localeSet) {
        return angular.localized(input, localeSet);
    };
}

function MostItemDirective($q, $parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            scope.route = window.route;
            var item = scope.$eval(attrs['mostItem']);
            item.then(function(result) {
                scope.item = result;
            }, function(reason) {
                console.log(reason);
                scope.item = null;
            });
        }
    };
}

function MostVariableDirective($q, $parse) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.value, function(newValue) {
                scope[attrs.name] = newValue;
            });
        }
    };
}

function MostParamDirective($parse, $window) {
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
            scope.route = $window.route;
            if (attrs['mostParam']) {
                var values = attrs['mostParam'].split(';');
                var params = { };
                for (var i = 0; i < values.length; i++) {
                    var value = values[i].split('=');
                    if (value.length==2)
                        params[value[0]] = value[1];
                }
                for (var name in params) {
                    if (params.hasOwnProperty(name)) {
                        scope.$watch(params[name], function(newValue) {
                            $window.route = $window.route || { };
                            $window.route[name] = newValue;
                        });
                    }
                }
            }
            else {
                scope.$watch(attrs.value, function(newValue) {
                    $window.route = $window.route || { };
                    $window.route[attrs.name] = newValue;
                });
            }

        }
    };
}


function MostEmailDirective($compile) {
    return {
        restrict: 'E',
        templateUrl:'/templates/directives/email.html',
        replace:true,
        compile: function compile(tElement, tAttrs) {
            return function (scope, iElement, iAttrs) {
                var $element = $(iElement);
                $element.find("label").html(iAttrs.title);
                var attributes = $element.prop("attributes");
                var $input = $element.find("input");
                $.each(attributes, function () {
                    if (this.name !== "class") { $input.attr(this.name, this.value); }
                });
                $compile($element)(scope);
            };
        }
    };
}

function MostStringDirective($compile) {
    return {
        restrict: 'E',
        templateUrl:'/templates/directives/string.html',
        replace:true,
        compile: function compile(tElement, tAttrs) {
            return function (scope, iElement, iAttrs) {
                var $element = $(iElement);
                $element.find("label").html(iAttrs.title);
                var attributes = $element.prop("attributes");
                var $input = $element.find("input");
                $.each(attributes, function () {
                    if (this.name !== "class") { $input.attr(this.name, this.value); }
                });
                $compile($element)(scope);
            };
        }
    };
}

function MostTypeaheadDirective($compile, $svc) {
    return {
        restrict: 'E',
        template:'<div><label loc-html></label><input autocomplete="off"  typeahead-editable="false" type="text" class="form-control"/></div>',
        replace:true,
        compile: function compile(tElement, tAttrs) {
            return function (scope, iElement, iAttrs) {
                var $element = $(iElement);
                //set label
                if (typeof iAttrs.title!=='undefined')
                    $element.find("label").html(iAttrs.title);
                else
                    $element.find("label").remove();
                //set scope property name
                var dataName = iAttrs.name.concat('Data');
                //set model
                var dataModel = iAttrs.model;
                var attributes = $element.prop("attributes");
                var $input = $element.find("input");
                $.each(attributes, function () {
                    if (this.name === "placeholder") {
                        $input.attr(this.name,angular.localized(this.value));
                    }
                    else {
                        if (this.name !== "class") {
                            $input.attr(this.name, this.value);
                        }
                    }
                });
                //set typeahead properties
                var field = iAttrs['field'], dataFilter=null;
                var typeaheadAttr = angular.format('x as x.%s for x in %s($viewValue)', field, dataName);
                var limit = parseInt(iAttrs['limit']) || 10;
                //set typeahead attribute
                $input.attr("typeahead", typeaheadAttr);
                //set typeahead-on-select attribute
                if (iAttrs['onselect']) {
                    $input.attr("typeahead-on-select", iAttrs['onselect']);
                }
                if (iAttrs['search']) {
                    var search = iAttrs['search'].split(',');
                    for (var i = 0; i < search.length; i++) {
                        var str = search[i];
                        search[i] = angular.format("indexof(%s,'%s') gt 0", str);
                    }
                    dataFilter = search.join(' or ');
                }
                else {
                    dataFilter = angular.format("indexof(%s,'%s') gt 0", field);
                }

                //set scope get function
                scope.route = window.route;
                scope[dataName] = function(filter) {
                    var q = new ClientDataQueryable(dataModel);
                    var s = dataFilter;
                    while (s.indexOf('%s')>=0)
                        s = angular.format(s, filter);
                    q.filter(s).take(limit);
                    return $svc.get(q);
                }

                $compile($element)(scope);
            };
        }
    };
}

function MostDataInstanceDirective($svc, $shared) {
    return {
        restrict: 'E',
        scope: { model:'@', filter:'@',  select:'@', group:'@', order:'@', top:'@', skip:'@', expand:'@', prepared:'@' },
        link: function(scope, element, attrs) {
            if (typeof scope.model === 'undefined')
                return;

            scope.route = window.route;
            var q = new ClientDataQueryable(scope.model), arr = [];
            q.service = $svc;
            //apply select (if any)
            if (scope.select)
            {
                arr = scope.select.split(',');
                //apply as array expression if we have only one field
                if (arr.length==1)
                    q.asArray(true);
                q.select(arr);
            }
            if (scope.group) {
                if (angular.isArray(scope.group))
                    q.group(scope.group);
                else if (angular.isNotEmptyString(scope.group))
                    q.group(scope.group.split(','));
            }
            if (scope.order) {
                arr = [];
                if (angular.isArray(scope.order))
                    arr = scope.order;
                else if (angular.isNotEmptyString(scope.order))
                    arr = scope.order.split(',');
                for (var i = 0; i < arr.length; i++) {
                    var str = arr[i];
                    var matches = /(.*?) desc$/i.exec(str);
                    if (matches) {
                        q.orderByDescending(matches[1]);
                    }
                    else {
                        matches = /(.*?) asc$/i.exec(str);
                        if (matches) {
                            q.orderBy(matches[1]);
                        }
                        else {
                            q.orderBy(str);
                        }
                    }
                }
            }
            if (parseInt(scope.skip)>0) {
                q.skip(parseInt(scope.skip));
            }
            if (parseInt(scope.top)>0) {
                q.take(parseInt(scope.top));
            }
            if (angular.isNotEmptyString(scope.filter)) {
                q.filter(scope.filter);
                if (scope.prepared=='true')
                    q.prepare();
            }

            if (angular.isNotEmptyString(scope.expand)) {
                q.expand(scope.expand.split(','));
            }
            //set queryable
            q.items.then(function(result) {
                scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
            });

            //register for order change
            scope.$on('order.change', function(event, args)
            {
                if (typeof args === 'string')
                {
                    if (args.length==0) {
                        delete q.$orderby;
                        q.reset().items.then(function(result) {
                            scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                        });
                    }
                    else {
                        var orders = args.split(',');
                        if (orders.length==1) {
                            if (typeof q.$orderby !== 'undefined') {
                                var previousOrders= q.$orderby.split(',');
                                if (previousOrders.length==1) {
                                    var arr1 = orders[0].split(' '), arr2 = previousOrders[0].split(' ');
                                    if (typeof arr1[1] === 'undefined') {
                                        if (arr1[0]===arr2[0]) {
                                            if ((typeof arr2[1] === 'undefined') || (arr2[1] === 'asc')) {
                                                arr1.push('desc');
                                                orders[0] = arr1.join(' ');
                                            }
                                            else{
                                                arr1.push('asc');
                                                orders[0] = arr1.join(' ');
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        q.reset().orderBy(orders.join(',')).items.then(function(result) {
                            scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                        });
                    }

                }

            });

            //register for filter change
            scope.$on('filter.change', function(event, args)
            {
                if (typeof args === 'object') {
                    if (args.name==attrs.name) {
                        if (typeof args.filter === 'string') {
                            q.reset().filter(args.filter).items.then(function(result) {
                                scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                            });
                        }
                    }
                }
                else if (typeof args === 'string') {
                    q.reset().filter(args).items.then(function(result) {
                        scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                    });
                }

            });

            var dataReload = function(event, args)
            {
                if (typeof args === 'object') {
                    if (args.name==attrs.name) {
                        q.reset().items.then(function(result) {
                            scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                        });
                    }
                }
                else if (typeof args === 'string') {
                    if (args===attrs.name) {
                        q.reset().items.then(function(result) {
                            scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                        });
                    }
                }

            };
            var dataRefresh = function(event, args)
            {
                if (typeof args === 'object') {
                    if (args.model== q.$model) {
                        q.reset().items.then(function(result) {
                            scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                        });
                    }
                }

            };
            //register for data reload
            scope.$on('data.reload', dataReload);
            //register for data refresh
            scope.$on('item.new', dataRefresh);
            //register for data refresh
            scope.$on('item.save', dataRefresh);
            //register for data refresh
            scope.$on('item.delete', dataRefresh);

        }
    };
}


function MostFloatDirective() {
    return {
        priority:401,
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (typeof viewValue === 'undefined' || null) {
                    ctrl.$setValidity('float', true);
                    return viewValue;
                }
                if (viewValue.length==0) {
                    ctrl.$setValidity('float', true);
                    return viewValue;
                }
                if (MostFloatDirective.FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
}

MostFloatDirective.FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;

function MostRequiredDirective() {
    return {
        priority:400,
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (typeof viewValue === 'undefined' || viewValue==null) {
                    ctrl.$setValidity('required', false);
                    return undefined;
                }
                if (typeof viewValue === 'string') {
                    if (viewValue.length==0) {
                        ctrl.$setValidity('required', false);
                        return undefined;
                    }
                }
                ctrl.$setValidity('required', true);
                return viewValue;
            });
        }
    };
}

function MostEventDirective($timeout) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            //get event name
            var name = element.attr('name') || attrs['event'], action = attrs['eventAction'];
            if (name) {
                scope.$on(name, function(event, args) {
                    if (action) {
                        $timeout(function(){
                            scope.$args = args;
                            try {
                                scope.$apply(action);
                            }
                            catch(e) {
                                console.log(e);
                            }
                            scope.$args = null;
                        });
                    }
                });
            }
        }
    };
}
/**
 * @return {*}
 * @constructor
 */
function MostWatchDirective() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            //get event name
            var name = element.attr('name') || attrs['event'], args = attrs['eventArgs'];
            if (name) {
                if (typeof scope.broadcast === 'function') {
                    scope.$watch(args, function (value) {
                        scope.broadcast(name, value);
                    });
                }
                else {
                    scope.$watch(args, function (value) {
                        scope.emit(name, value);
                    });
                }
            }
        }
    };
}


function MostConfirmDirective() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function(e) {
                /**
                 * @ngdoc property
                 * @name attrs#mostConfirm
                 * @propertyOf attrs
                 * @returns {string}
                 */
               var answer = confirm(angular.localized(attrs.mostConfirm));
               if(!answer) {
                   e.preventDefault();
               }
                else {
                   /**
                    * @ngdoc property
                    * @name attrs#mostConfirmAction
                    * @propertyOf attrs
                    * @returns {string}
                    */
                   scope.$apply(attrs.mostConfirmAction);
               }
            });
        }
    };
}

function IncludeReplaceDirective() {
    return {
        require: 'ngInclude',
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.replaceWith(element.children());
        }
    };
}



function MostSubmitDirective() {
    return {
        restrict: 'A',
        scope: { mostSubmit: '=' },
        link: function(scope, element, attrs) {
            //get current element
            var $element = angular.element(element);
            //hold parsley form
            var $form = $element.parsley();
            //initialize parsley form and bind submit
            $element.bind('submit', function (e) {
                //validate form
                $form.validate();
                //if form is invalid
                if (!$form.isValid())
                //prevent default event
                    e.preventDefault();
                else
                //otherwise submit form
                    scope.mostSubmit();
            });
        }
    };
}

function ControllerInitDirective(){
    return {
        priority: 1000,
        compile: function () {
            return {
                pre: function (scope, element, attrs, ctrl) {
                    scope.$eval(attrs.ctrlInit);
                }
            };
        }
    };
}



//register module
var most = angular.module('most', ['ngRoute']);
//constants
//
//services
most.factory('$svc', function ($http, $q) {
        return new ClientDataService($http, $q);
    }).factory('$shared',function ($rootScope, $location, $routeParams) {
        return new MostSharedService($rootScope, $location, $routeParams);
    });
//controllers
most.controller('DataController', DataController)
    .controller('ItemController', ItemController)
    .controller('CommonController', CommonController);
//directives
most.directive('loc',MostLocalizedDirective)
    .directive('locHtml',MostLocalizedHtmlDirective)
    .directive('mostItem',MostItemDirective)
    .directive('mostEvent',MostEventDirective)
    .directive('mostWatch',MostWatchDirective)
    .directive('mostString',MostStringDirective)
    .directive('mostTypeahead',MostTypeaheadDirective)
    .directive('mostData',MostDataInstanceDirective)
    .directive('mostVariable',MostVariableDirective)
    .directive('mostParam',MostParamDirective)
    .directive('mostFloat',MostFloatDirective)
    .directive('mostRequired',MostRequiredDirective)
    .directive('includeReplace',IncludeReplaceDirective)
    .directive('mostConfirm',MostConfirmDirective)
    .directive('ctrlInit',ControllerInitDirective)
    .directive('mostEmail',MostEmailDirective);
//filters
most.filter('loc', MostLocalizedFilter);

