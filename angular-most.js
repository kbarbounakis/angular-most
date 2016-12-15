/**
 * MOST Web Framework
 * A JavaScript Web Framework
 * http://themost.io
 * Created by Kyriakos Barbounakis<k.barbounakis@gmail.com> on 2014-11-28.
 *
 * Copyright (c) 2014, Kyriakos Barbounakis k.barbounakis@gmail.com
 Anthi Oikonomou anthioikonomou@gmail.com
 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 * Neither the name of MOST Web Framework nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(window, angular) {

// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

// check for nodeJS
var hasModule = (typeof module !== 'undefined' && module && module.exports);

/**
 *
 * @constructor
 */
function TextUtils() {

}

/**
 * @param {string} s
 * @returns {*}
 */
TextUtils.toBase64 = function(s) {
    if (typeof s !== 'string') {
        return;
    }
    return Base64.encode(s);
};

/**
 *
 * @param {string} s
 * @returns {*}
 */
TextUtils.fromBase64 = function(s) {
    if (typeof s !== 'string') {
        return;
    }
    return Base64.decode(s);
};

TextUtils.isNotEmptyString = function(s) {
    if (typeof s === 'string') {
        return (s.length>0);
    }
    return false;
};

/**
 * @param {...*} f
 * @returns {string}
 */
TextUtils.format = function(f) {
    var i;
    if (typeof f !== 'string') {
        var objects = [];
        for (i  = 0; i < arguments.length; i++) {
            objects.push(arguments[i]);
        }
        return objects.join(' ');
    }
    i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(/%[sdj%]/g, function (x) {
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
            str += ' ' + x.toString();
        }
    }
    return str;
};

function Args() {
    //
}
/**
 * Checks the expression and throws an exception if the condition is not met.
 * @param {*} expr
 * @param {string} message
 */
Args.check = function(expr, message) {
    Args.notNull(expr,"Expression");
    if (typeof expr === 'function') {
        expr.call()
    }
    var res;
    if (typeof expr === 'function') {
        res = !(expr.call());
    }
    else {
        res = (!expr);
    }
    if (res) {
        var err = new Error(message);
        err.code = "ECHECK";
        throw err;
    }
};
/**
 *
 * @param {*} arg
 * @param {string} name
 */
Args.notNull = function(arg,name) {
    if (typeof arg === 'undefined' || arg == null) {
        var err = new Error(name + " may not be null or undefined");
        err.code = "ENULL";
        throw err;
    }
};

/**
 * @param {*} arg
 * @param {string} name
 */
Args.notString = function(arg, name) {
    if (typeof arg !== 'string') {
        var err = new Error(name + " must be a string");
        err.code = "EARG";
        throw err;
    }
};

/**
 * @param {*} arg
 * @param {string} name
 */
Args.notFunction = function(arg, name) {
    if (typeof arg !== 'function') {
        var err = new Error(name + " must be a function");
        err.code = "EARG";
        throw err;
    }
};

/**
 * @param {*} arg
 * @param {string} name
 */
Args.notNumber = function(arg, name) {
    if (typeof arg !== 'string') {
        var err = new Error(name + " must be number");
        err.code = "EARG";
        throw err;
    }
};
/**
 * @param {string|*} arg
 * @param {string} name
 */
Args.notEmpty = function(arg,name) {
    Args.notNull(arg,name);
    Args.notString(arg,name);
    if (arg.length == 0) {
        var err = new Error(name + " may not be empty");
        err.code = "EEMPTY";
        return err;
    }
};

/**
 * @param {number|*} arg
 * @param {string} name
 */
Args.notNegative = function(arg,name) {
    Args.notNumber(arg,name);
    if (arg<0) {
        var err = new Error(name + " may not be negative");
        err.code = "ENEG";
        return err;
    }
};

/**
 * @param {number|*} arg
 * @param {string} name
 */
Args.positive = function(arg,name) {
    Args.notNumber(arg,name);
    if (arg<=0) {
        var err = new Error(name + " may not be negative or zero");
        err.code = "EPOS";
        return err;
    }
};

angular.extend(angular, {
    /**
     * Inherit the prototype methods from one constructor into another.
     * @param {Function} ctor Constructor function which needs to inherit the prototype.
     * @param {Function} superCtor Constructor function to inherit prototype from.
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
    isNullOrUndefined: function(obj) {
        return (typeof obj === 'undefined' || obj === null);
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
        var locale = window.locales[localeSet];
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
            for (var k = 0; i < arguments.length; k++) {
                objects.push(inspect(arguments[k]));
            }
            return objects.join(' ');
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(/%[sdj%]/g, function (x) {
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
    /**
     * @param {*} object
     * @param prefix
     * @returns {string}
     */
    toParam: function (object, prefix) {
        var stack = [];
        var value;
        var key;
        if (typeof object === 'string') {
            prefix = prefix || 'data';
            return 'data=' + encodeURIComponent(object);
        }
        if (angular.isArray(object)) {
            if (object.length==0)
                return  encodeURIComponent(key) + '=';
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
        return s.replace(/(^\s*|\s*$)/g, '').replace(/(\.|\s)+(.)?/g, function(mathc, sep, c) {
            return (c ? c.toUpperCase() : '');
        });
    },
    camelize: function(s) {
        if (typeof s !== 'string')
            return s;
        return s.replace(/(^\s*|\s*$)/g, '').replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {
            return (c ? c.toUpperCase() : '');
        });
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
    },
    isInteger: function(value) {
        if ((undefined === value) || (null === value)) {
            return false;
        }
        return value % 1 == 0;
    },
    isFloat: function(value) {
        if ((undefined === value) || (null === value)) {
            return false;
        }
        if (typeof value == 'number') {
            return true;
        }
        return !isNaN(value - 0);
    }
});

if (typeof Array.isArray !== 'function') {
    Array.isArray = function (ar) {
        return (typeof ar === 'object' && Object.prototype.toString.call(ar) === '[object Array]');
    }
}

function UrlPropertyDescriptor(obj) {
    return {
        get: function() {
            if (typeof obj === 'undefined' || obj == null) { return; }
            return (typeof obj.url === 'function') ? obj.url() : (obj.url || obj.$url);
        }
    }
}

function ModelPropertyDescriptor(obj) {
    return {
        get: function() {
            if (typeof obj === 'undefined' || obj == null) { return; }
            return (typeof obj.model === 'function') ? obj.model() : (obj.model || obj.$model);
        }
    }
}

/**
 * JSON DATE PARSER
 */
var REG_DATETIME_ISO = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?([+-](\d+):(\d+))?$/;
function dateParser(key, value) {
    if ((typeof value === 'string') && REG_DATETIME_ISO.test(value)) {
        return new Date(value);
    }
    return value;
}

/**
 * @param $http
 * @param $q
 * @constructor
 */
function ClientDataService($http, $q) {
    var self = this;

    this.$http = $http;
    this.$q = $q;
    this.base = "/";

    self.getBase = function() {
        if (angular.isNotEmptyString(self.base)) {
            if (/\/$/.test(self.base))
                return self.base;
            else
                return self.base.concat("/");
        }
        return "/";
    };
    /**
     * @param s
     * @returns {*}
     */
    self.resolveUrl = function(s) {
        if (angular.isNotEmptyString(s)) {
            if (/^\//.test(s))
                return self.getBase() + s.substr(1);
            else
                return self.getBase() + s;
        }
        throw  new Error("Invalid argument. Expected not empty string.");
    };
}

/**
 * @param {{method:string,url:string,data:*,headers:*}|*} options
 * @returns {Promise|*}
 */
ClientDataService.prototype.execute = function(options) {

    var self = this,
        $injector = angular.element(document.body).injector(),
        $http = $injector.get("$http"),
        $q = $injector.get("$q"),
        deferred = $q.defer();
    setTimeout(function() {
        try {
            //options defaults
            options.method = options.method || "GET";
            options.headers = options.headers || { };
            //set content type
            options.headers["Content-Type"] = "application/json";
            //validate options URL
            Args.notNull(options.url,"Request URL");
            //validate URL format
            Args.check(!/^https?:\/\//i.test(options.url),"Request URL may not be an absolute URI");
            //validate request method
            Args.check(/^GET|POST|PUT|DELETE$/i.test(options.method),"Invalid request method. Expected GET, POST, PUT or DELETE.");
            var url_ = self.resolveUrl(options.url);
            var o = {
                method: options.method,
                url: url_,
                headers:options.headers,
                transformResponse:function(data, headers, status) {
                    if (typeof data === 'undefined' || data == null) {
                        return;
                    }
                    if (/^application\/json/.test(headers("Content-Type"))) {
                        if (data.length == 0) {
                            return;
                        }
                        return JSON.parse(data, dateParser);
                    }
                    return data;
                }
            };
            if (/^GET$/i.test(o.method)) {
                o.params = options.data;
            }
            else {
                o.data = options.data;
            }
            $http(o).then(function (response) {
                deferred.resolve(response.data);
            }, function (err) {
                deferred.reject(err);
            });
        }
        catch(e) {
            deferred.reject(e);
        }
    }, 0);
    return deferred.promise;
};

ClientDataService.prototype.schema = function(name, callback) {
    var $http = this.$http, $q = this.$q;
    callback = callback || function() {};
    $http({
        method: "GET",
        cache: true,
        url: this.resolveUrl(angular.format("/%s/schema.json",name))
    }).then(function (response) {
        callback(null, response.data);
    }, function (err) {
        callback(err)
    });
};


ClientDataService.prototype.items = function(options, callback) {
    var $http = this.$http,
        $q = this.$q,
        url = UrlPropertyDescriptor(options).get() || "/%s/index.json".replace(/%s/ig, ModelPropertyDescriptor(options).get());
    //delete $url if any
    delete options.$url;
    callback = callback || function() {};
    $http({
        method: "GET",
        url: this.resolveUrl(url),
        params: options
    }).then(function (response) {
        callback(null, response.data);
    }, function (err) {
        console.log(err);
        callback(new Error('Internal Server Error'));
    });
};

ClientDataService.prototype.get = function(options) {
    var $http = this.$http,
        url = UrlPropertyDescriptor(options).get() || "/%s/index.json".replace(/%s/ig, ModelPropertyDescriptor(options).get());
    //delete $url if any
    delete options.$url;
    return $http({
        method: "GET",
        url: this.resolveUrl(url),
        params: options
    }).then(function (response) {
        return response.data;
    }, function (err) {
        console.log(err);
        return new Error('Internal Server Error');
    });
};

/**
 *
 * @param {*} obj
 * @param {*} options
 * @param {Function} callback
 */
ClientDataService.prototype.save = function(obj, options, callback) {
    var $http = this.$http;
    var url = UrlPropertyDescriptor(options).get() || "/%s/index.json".replace(/%s/ig, ModelPropertyDescriptor(options).get());
    $http.put(this.resolveUrl(url), obj).success(function (data) {
        callback(null, data);
    }).error(function (err, status, headers) {
        var er;
        if (headers("X-Status-Description"))
            er = new Error(headers("X-Status-Description"));
        else
            er =new Error(err);
        er.status = status;
        callback(er);
    });
};

/**
 *
 * @param {*} obj
 * @param {*} options
 * @param {Function=} callback
 */
ClientDataService.prototype.new = function(obj, options, callback) {
    if (angular.isArray(obj)) {
        //set internal state
        obj.forEach(function(x) {
            if (angular.isObject(x))
                x.$state = 1;
        });
    }
    else if (angular.isObject(obj)) {
        //set internal state
        obj.$state = 1;
    }
    return this.save(obj, options, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (angular.isArray(obj)) {
            //set internal state
            obj.forEach(function(x) {
                if (angular.isObject(x))
                    delete x.$state;
            });
        }
        else if (angular.isObject(obj)) {
            //set internal state
            delete obj.$state;
        }
        return callback(null, result);
    });
};

ClientDataService.prototype.remove = function(item, options, callback) {
    var $http = this.$http,
        url = UrlPropertyDescriptor(options).get() || "/%s/index.json".replace(/%s/ig, ModelPropertyDescriptor(options).get());
    $http({
        method:'DELETE',
        url: this.resolveUrl(url),
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
 * @param {string} name
 * @param {ClientDataService|*} service
 * @constructor
 */
function ClientDataModel(name, service) {
    /**
     * Gets a string which represents the name of this model
     * @returns {string}
     */
    this.getName = function() {
        return name;
    };
    /**
     * Gets an instance of ClientDataService which represents the current data service
     * @returns {ClientDataService|*}
     */
    this.getService = function() {
        return service;
    };

    //set default url
    var url_ = angular.format("/%s/index.json", this.getName());
    /**
     * Gets a string which represents the URL of the current model context.
     * @returns {string}
     */
    this.getUrl = function() {
        return url_;
    };
    /**
     * Sets a string which represents the URL of the current model context.
     * @param value
     * @returns {ClientDataModel}
     */
    this.setUrl = function(value) {
        if (/^\//.test(value)) {
            url_ = value;
        }
        else {
            url_ = "/" + this.getName() + "/" + value;
        }
        return this;
    };
}
/**
 * Sets a string which represents the URL of the current model context.
 * @deprecated This method is deprecated and will be removed. Use ClientDataModel.setUrl(string) instead.
 * @param {string} value
 * @returns {ClientDataModel}
 */
ClientDataModel.prototype.url = function(value) {
    return this.setUrl(value);
};

/**
 * Gets a JSON schema associated with the current model
 * @returns {Promise|*}
 */
ClientDataModel.prototype.schema = function() {
    var self = this,
        $injector = angular.element(document.body).injector(),
        $q = $injector.get("$q"),
        deferred = $q.defer();
    setTimeout(function() {
        self.getService().schema(self.getName(), function(err, result) {
            if (err) { return deferred.reject(err); }
            return deferred.resolve(result);
        });
    }, 0);
    return deferred.promise;
};

/**
 * Gets an instance of ClientDataQueryable based on the current model
 * @returns {ClientDataQueryable|*}
 */
ClientDataModel.prototype.asQueryable = function() {
    return new ClientDataQueryable(this.getName(), this.getService());
};


    /**
     * Sets the number of levels of the expandable attributes.
     * @param {number=} value
     * @returns {ClientDataQueryable|*}
     */
    ClientDataModel.prototype.levels = function(value) {
        var result = new ClientDataQueryable(this.getName(), this.getService());
        return result.levels(value);
    };

/**
 * Inserts or updates the given object or array of objects
 * @param {*} obj
 * @returns {Promise|*}
 */
ClientDataModel.prototype.save = function(obj) {

    var self = this,
        $injector = angular.element(document.body).injector(),
        $q = $injector.get("$q"),
        deferred = $q.defer();
    setTimeout(function() {
        self.getService().save(obj, { url: self.getUrl() }, function(err, result) {
            if (err) { return deferred.reject(err); }
            return deferred.resolve(result);
        });
    }, 0);
    return deferred.promise;
};

/**
 * Deletes the given object or array of objects
 * @param {*} obj
 * @returns {Promise|*}
 */
ClientDataModel.prototype.remove = function(obj) {
    var self = this,
        $injector = angular.element(document.body).injector(),
        $q = $injector.get("$q"),
        deferred = $q.defer();
    setTimeout(function() {
        self.getService().remove(obj, { url:self.getUrl() }, function(err, result) {
            if (err) { return deferred.reject(err); }
            return deferred.resolve(result);
        });
    }, 0);
    return deferred.promise;
};

/**
 * @param {string} attr
 * @returns {ClientDataQueryable}
 */
ClientDataModel.prototype.where = function(attr) {
    return this.asQueryable().where(attr);
};

    /**
     * @param {string} text
     * @returns {ClientDataQueryable}
     */
    ClientDataModel.prototype.search = function(text) {
        return this.asQueryable().search(text);
    };

/**
 * @returns {Promise|*}
 */
ClientDataModel.prototype.getItems = function() {
    return this.asQueryable().getItems();
};

/**
 * @returns {Promise|*}
 */
ClientDataModel.prototype.getItem = function() {
    return this.asQueryable().getItem();
};

/**
 * @param {...string} attr
 * @returns {ClientDataQueryable}
 */
ClientDataModel.prototype.select = function(attr) {
    return ClientDataQueryable.prototype.select.apply(this.asQueryable(),arguments);
};

/**
 * @params {number|*} val
 * @returns {ClientDataQueryable|*}
 */
ClientDataModel.prototype.skip = function(val) {
    return this.asQueryable().skip(val);
};

/**
 * @params {number|*} val
 * @returns {ClientDataQueryable}
 */
ClientDataModel.prototype.take = function(val) {
    return this.asQueryable().take(val);
};

/**
 * @param {string} attr
 * @returns {ClientDataQueryable}
 */
ClientDataModel.prototype.orderBy = function(attr) {
    return ClientDataQueryable.prototype.orderBy.call(this.asQueryable(),attr);
};

/**
 * @param {string} attr
 * @returns {ClientDataQueryable}
 */
ClientDataModel.prototype.orderByDescending = function(attr) {
    return ClientDataQueryable.prototype.orderByDescending.call(this.asQueryable(),attr);
};

/**
 * @class ClientDataContext
 * @param {ClientDataService} service
 * @constructor
 */
function ClientDataContext(service) {

    /**
     * Gets an instance of DataQueryable class associated with the model provided
     * @param {string} name
     * @methodOf $context
     * @return {ClientDataModel}
     */
    this.model = function(name) {
        return new ClientDataModel(name, service);
    }
    /**
     * @returns {ClientDataService}
     */
    this.getService = function() {
        return service;
    };
    /**
     * @param {ClientDataService|*} value
     */
    this.setService = function(value) {
        service = value;
    };

}

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise|*}
 */
ClientDataContext.prototype.authenticate = function(username,password) {
    return this.getService().execute({
        method:"GET",
        url:"/User/index.json",
        data: {
            $filter:"id eq me()"
        },
        headers: {
            Authorization:"Basic " + TextUtils.toBase64(username + ":" + password)
        }
    });
};



/**
 * @class
 * @deprecated MostDataField class is deprecated and it will be removed at the next major update
 * @param name
 * @constructor
 */
function MostDataField(name) {
    if (typeof name !== 'string') {
        throw new Error('Invalid argument type. Expected string.')
    }
    this.name = name;
}

/**
 * @returns {MostDataField}
 */
MostDataField.prototype.as = function(s) {
    if (typeof s === 'undefined' || s==null) {
        delete this.$as;
        return this;
    }
    this.$as = s;
    return this;
};

/**
 * Returns the alias expression, if any.
 * @returns {string}
 * @private
 */
MostDataField.prototype._as = function() {
    return angular.isNotEmptyString(this.$as) ? ' as ' + this.$as : '';
};

MostDataField.prototype.toString = function() {
    return this.name + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.max = function() {
    return String.prototype.format('max(%s)', this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.min = function() {
    return String.prototype.format('min(%s)', this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.count = function() {
    return String.prototype.format('count(%s)', this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.average = function() {
    return String.prototype.format('avg(%s)', this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.length = function() {
    return String.prototype.format('length(%s)', this.name) + this._as();
};

/**
 * @param {String} s
 * @returns {string}
 */
MostDataField.prototype.indexOf = function(s) {
    return String.prototype.format('indexof(%s,%s)', this.name, ClientDataQueryable.escape(s)) + this._as();
};

/**
 * @param {number} pos
 * @param {number} length
 * @returns {string}
 */
MostDataField.prototype.substr = function(pos, length) {
    return String.prototype.format('substring(%s,%s,%s)',this.name, pos, length) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.floor = function() {
    return String.prototype.format('floor(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.round = function() {
    return String.prototype.format('round(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.getYear = function() {
    return String.prototype.format('year(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.getDay = function() {
    return String.prototype.format('day(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.getMonth = function() {
    return String.prototype.format('month(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.getMinutes = function() {
    return String.prototype.format('minute(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.getHours = function() {
    return String.prototype.format('hour(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.getSeconds = function() {
    return String.prototype.format('second(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.getDate = function() {
    return String.prototype.format('date(%s)',this.name) + this._as();
};

///**
// * @returns {string}
// */
//MostDataField.prototype.ceil = function() {
//    return String.prototype.format('ceil(%s)',this.name);
//};

/**
 * @returns {string}
 */
MostDataField.prototype.toLocaleLowerCase = function() {
    return String.prototype.format('tolower(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.toLowerCase = function() {
    return String.prototype.format('tolower(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.toLocaleUpperCase = function() {
    return String.prototype.format('toupper(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.toUpperCase = function() {
    return String.prototype.format('toupper(%s)',this.name) + this._as();
};

/**
 * @returns {string}
 */
MostDataField.prototype.trim = function() {
    return String.prototype.format('trim(%s)',this.name) + this._as();
};

/**
 * @param {*} s0
 * @returns {string}
 */
MostDataField.prototype.concat = function(s0) {
    var res = 'concat(' + this.name;
    for (var i = 0; i < arguments.length; i++) {
        res += ',' + ClientDataQueryable.escape(s);
    }
    res += ')';
    return res;
};

/**
 * @param {*} s
 * @returns {string}
 */
MostDataField.prototype.endsWith = function(s) {
    return String.prototype.format('endswith(%s,%s)',this.name, ClientDataQueryable.escape(s)) + this._as();
};

/**
 * @param {*} s
 * @returns {string}
 */
MostDataField.prototype.startsWith = function(s) {
    return String.prototype.format('startswith(%s,%s)',this.name, ClientDataQueryable.escape(s)) + this._as();
};

if (typeof String.prototype.fieldOf === 'undefined')
{
    /**
     * @deprecated This method is deprecated and it will be removed at the next major update
     * @returns {MostDataField}
     */
    var fieldOf = function() {
        if (this == null) {
            throw new TypeError('String.prototype.fieldOf called on null or undefined');
        }
        return new MostDataField(this);
    };
    if (!String.prototype.fieldOf) { String.prototype.fieldOf = fieldOf; }
}

if (typeof String.prototype.format === 'undefined')
{
    /**
     * @returns {*}
     */
    var format = function(f) {
        var i;
        if (typeof f !== 'string') {
            var objects = [];
            for (i  = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
        }
        i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(/%[sdj%]/g, function (x) {
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
    };
    if (!String.prototype.format) { String.prototype.format = format; }
}

/**
 * @deprecated FieldSelector class is deprecated and it will be removed at the next major update
 * @class
 * @param {string} name
 * @constructor
 */
function FieldSelector(name) {
    this.name = name;
}
/**
 * @param {string} name
 * @returns {FieldSelector}
 */
FieldSelector.select = function(name) {
    return new FieldSelector(name);
};

/**
 * @param {string} name
 * @returns {FieldSelector}
 */
FieldSelector.count = function(name) {
    return new FieldSelector(String.format("count(%s)", name));
};

/**
 * @param {string} name
 * @returns {FieldSelector}
 */
FieldSelector.sum = function(name) {
    return new FieldSelector(String.format("sum(%s)", name));
};

/**
 * @param {string} name
 * @returns {FieldSelector}
 */
FieldSelector.max = function(name) {
    return new FieldSelector(String.format("max(%s)", name));
};

/**
 * @param {string} name
 * @returns {FieldSelector}
 */
FieldSelector.min = function(name) {
    return new FieldSelector(String.format("min(%s)", name));
};

/**
 * @param {string} name
 * @returns {FieldSelector}
 */
FieldSelector.average = function(name) {
    return new FieldSelector(String.format("avg(%s)", name));
};

/**
 * @param {string} name
 * @returns {FieldSelector}
 */
FieldSelector.date = function(name) {
    return new FieldSelector(String.format("date(%s)", name));
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.getFullYear = function() {
    this.name = String.format("year(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.getDay = function() {
    this.name = String.format("day(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.getMonth = function() {
    this.name = String.format("month(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.getHours = function() {
    this.name = String.format("hour(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.getMinutes = function() {
    this.name = String.format("minute(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.getSeconds = function() {
    this.name = String.format("second(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.length = function() {
    this.name = String.format("length(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.floor = function() {
    this.name = String.format("floor(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.round = function() {
    this.name = String.format("round(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.toLocaleLowerCase = function() {
    this.name = String.format("tolower(%s)", this.name);
    return this;
};

/**
 * @returns {FieldSelector}
 */
FieldSelector.prototype.toLocaleUpperCase = function() {
    this.name = String.format("toupper(%s)", this.name);
    return this;
};


/**
 * @param {string} alias
 */
FieldSelector.prototype.as = function(alias) {
    this.as = alias;
};

/**
 * @returns {string}
 */
FieldSelector.prototype.toString = function() {
    if (this.as) {
        return this.name + " as " + this.as;
    }
    else {
        return this.name;
    }
};

/**
 * @deprecated FieldExpression class is deprecated and it will be removed at the next major update
 * @param {string} expr
 * @constructor
 */
function FieldExpression(expr) {
    this.expr = expr;
}

FieldExpression.prototype.toString = function() {
    return this.expr;
};

/**
 * @param {string} expr
 * @returns {FieldExpression}
 */
FieldExpression.create = function(expr) {
    return new FieldExpression(expr);
};

/**
 * @param {string} model - The target model
 * @param {*=} service - The underlying data service
 * @property {string} url - Gets or sets a string that represents the base service url
 * @property {Array} items -A collection of object that represents the current dynamic items
 * @property {Array} item - An object that represents the current dynamic item
 * @property {ClientDataService} service - An object that represents the current client data service
 * @property {*} schema - An object that represents the underlying model's schema
 * @constructor
 */
function ClientDataQueryable(model, service) {
    /**
     * Gets or sets a string that represents the target model
     * @private
     * @type {String}
     */
    this.$model = model;
    /**
     * @private
     */
    this.privates_ = { };
    var svc;
    svc = service;
    Object.defineProperty(this, 'service', {
        get: function() { return svc;  },
        set: function(value) { svc = value; },
        configurable:false,
        enumerable: false
    });
    var self = this, __items, __item;
    self.privates_ = function() {};

    Object.defineProperty(self, 'items', {
        get: function() {
            if (typeof __items === 'undefined') {
                var deferred = self.service.$q.defer();
                __items =  deferred.promise;
                var copy = self.getParams();
                delete copy.privates_;
                self.service.items(copy, function(err, result) {
                    if (err) {
                        console.log(err);
                        __items = null;
                        deferred.reject(err);
                    }
                    else {
                        __items = result;
                        deferred.resolve(result);
                    }
                });
            }
            return __items;
        },
        set: function(value) {
            __items = value;
        }
    });

    Object.defineProperty(self, 'item', {
        get: function() {
            if (typeof __item === 'undefined') {
                var deferred = self.service.$q.defer();
                __item =  deferred.promise;
                var copy = self.first().getParams();
                delete copy.privates_;
                self.service.items(copy, function(err, result) {
                    if (err) {
                        console.log(err);
                        __item = null;
                        deferred.reject(err);
                    }
                    else {
                        __item = result[0];
                        deferred.resolve(result[0]);
                    }
                });
            }
            return __item;
        },
        set: function(value) { __item = value; }
    });

    /**
     * Gets a dynamic object instance that represents the target model
     * @type {*}
     */
    Object.defineProperty(self, 'schema', {
        get: function() {
            if (typeof self.privates_.schema === 'undefined') {
                self.privates_.schema = self.service.schema(self.$model, function(err, result) {
                    self.privates_.schema = result;
                });
            }
            return self.privates_.schema;
        },
        set: function(value) { self.privates_.schema = value; }
    });

    /**
     * @private
     * @type {string}
     */
    self.$url = angular.format("/%s/index.json", self.$model);
    /**
     * Gets a string which represents the URL of the current model context.
     * @returns {string}
     */
    this.getUrl = function() {
        return self.$url;
    };
    /**
     * Sets a string which represents the URL of the current model context.
     * @param value
     * @returns {ClientDataQueryable}
     */
    this.setUrl = function(value) {
        if (/^\//.test(value)) {
            self.$url = value;
        }
        else {
            self.$url = "/" + self.$model + "/" + value;
        }
        return this;
    };

}

/**
 * @deprecated - This method is deprecated and will be removed. User ClientDataQueryable.setUrl(string) instead.
 * @param {string} s
 * @returns {ClientDataQueryable|string}
 */
ClientDataQueryable.prototype.url = function(s) {
    if (typeof s === 'undefined') { return this.$url; }
    if (typeof s !== 'string') {
        throw new Error('Invalid argument type. Expected string.');
    }
    this.$url = s;
    delete this.$model;
    return this;
};
/**
 * @deprecated This method is deprecated and will be removed in next major release.
 * Use ClientDataQueryable.getItems() or ClientDataQueryable.getItem() instead
 * @returns {*}
 */
ClientDataQueryable.prototype.data = function() {
    var self = this;
    var deferred = self.service.$q.defer(), options = self.getParams();
    delete options.privates_;
    self.service.items(options, function(err, result) {
        if (err) {
            console.log(err);
            deferred.reject(err);
        }
        else {
            deferred.resolve(result);
        }
    });
    return deferred.promise;
};
/**
 * @returns {Promise|*}
 */
ClientDataQueryable.prototype.getItems = function() {
    var self = this,
        deferred = self.service.$q.defer();
    setTimeout(function() {
        var copy = self.getParams();
        self.service.execute({
            method: "GET",
            url: self.getUrl(),
            data: copy
        }).then(function(result) {
            deferred.resolve(result);
        }).catch(function(err) {
            console.log(err);
            deferred.reject(err);
        });
    }, 0);
    return deferred.promise;
};
/**
 * @returns {Promise|*}
 */
ClientDataQueryable.prototype.getItem = function() {
    var self = this,
        deferred = self.service.$q.defer();
    setTimeout(function() {
        var copy = self.first().getParams();
        self.service.execute({
            method: "GET",
            url: self.getUrl(),
            data: copy
        }).then(function(result) {
            deferred.resolve(result[0]);
        }).catch(function(err) {
            console.log(err);
            deferred.reject(err);
        });
    }, 0);
    return deferred.promise;
};

ClientDataQueryable.prototype.reset = function() {
    this.items = (function(){})(); this.item=(function(){})();
    return this;
};

/**
 * @deprecated This method is deprecated and will be removed. Use use ClientDataQueryable.getParams()  instead.
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.copy = function() {
    var self = this, result = new ClientDataQueryable();
    var keys = Object.keys(this);
    keys.forEach(function(key) { if (key.indexOf('$')==0) {
        result[key] = self[key];
    }
    });
    if (result.$prepared) {
        if (result.$filter)
            /**
             * @private
             * @type {string}
             */
            result.$filter = angular.format('(%s) and (%s)', result.$prepared, result.$filter);
        else
            result.$filter = result.$prepared;
        delete result.$prepared;
    }
    return result;
};
/**
 * Returns a native object which represents the specified query parameters
 * @returns {*}
 */
ClientDataQueryable.prototype.getParams = function() {
    var self = this, result = { };
    var keys = Object.keys(this);
    keys.forEach(function(key) {
        if (key.indexOf('$')==0) {
            if ((typeof self[key] !== 'undefined') && (self[key] != null))
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
};


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
        //format timezone
        var offset = (new Date()).getTimezoneOffset(),
            timezone = (offset>=0 ? '+' : '') + ClientDataQueryable.zeroPad(Math.floor(offset/60),2) + ':' + ClientDataQueryable.zeroPad(offset%60,2);
        val = "'" + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '.' + millisecond + timezone + "'";
        return val;
    }

    if (typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]') {
        var values = [];
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
};

ClientDataQueryable.zeroPad = function(number, length) {
    number = number || 0;
    var res = number.toString();
    while (res.length < length) {
        res = '0' + res;
    }
    return res;
};

/**
 * @private
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.append = function() {

    var self = this, exprs;
    if (self.privates_.left) {
        var expr = null;

        if (self.privates_.op=='in') {
            if (Array.isArray(self.privates_.right)) {
                //expand values
                exprs = [];
                self.privates_.right.forEach(function(x) {
                    exprs.push(self.privates_.left + ' eq ' + ClientDataQueryable.escape(x));
                });
                if (exprs.length>0)
                    expr = '(' + exprs.join(' or ') + ')';
            }
        }
        else if (self.privates_.op=='nin') {
            if (Array.isArray(self.privates_.right)) {
                //expand values
                exprs = [];
                self.privates_.right.forEach(function(x) {
                    exprs.push(self.privates_.left + ' ne ' + ClientDataQueryable.escape(x));
                });
                if (exprs.length>0)
                    expr = '(' + exprs.join(' and ') + ')';
            }
        }
        else
            expr = self.privates_.left + ' ' + self.privates_.op + ' ' + ClientDataQueryable.escape(self.privates_.right);
        if (expr) {
            if (typeof self.$filter === 'undefined' || self.$filter == null)
                self.$filter = expr;
            else {
                self.privates_.lop = self.privates_.lop || 'and';
                self.privates_._lop = self.privates_._lop || self.privates_.lop;
                if (self.privates_._lop == self.privates_.lop)
                    self.$filter = self.$filter + ' ' + self.privates_.lop + ' ' + expr;
                else
                    self.$filter = '(' + self.$filter + ') ' + self.privates_.lop + ' ' + expr;
                self.privates_._lop = self.privates_.lop;
            }
        }
    }
    delete self.privates_.lop;delete self.privates_.left; delete self.privates_.op; delete self.privates_.right;
    return this;
};
/**
 *
 * @param {string} name
 * @returns {ClientDataQueryable|string}
 */
ClientDataQueryable.prototype.model = function(name) {
    if (typeof name === 'undefined') { return this.$model; }
    if (typeof name !== 'string') {
        throw new Error('Invalid argument type. Expected string.');
    }
    this.$model = name;
    delete this.$url;
    return this;
};
/**
 *
 * @param {Boolean|*=} value
 * @returns {ClientDataQueryable}
 * @deprecated This function is deprecated. Use ClientDataQueryable.list() instead.
 */
ClientDataQueryable.prototype.inlineCount = function(value) {
    if (typeof value === 'undefined')
        /**
         * @private
         * @type {boolean}
         */
        this.$inlinecount = true;
    else
        this.$inlinecount = value;
    return this;
};
/**
 *
 * @param {boolean|*=} value
 * @returns {ClientDataQueryable}
 * @deprecated This function is deprecated. Use ClientDataQueryable.list() instead.
 */
ClientDataQueryable.prototype.paged = function(value) {
    return this.inlineCount(value);
};

/**
 * @param {Boolean} value
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.asArray = function(value) {
    /**
     * @private
     * @type {Boolean}
     */
    this.$array = value;
    return this;
};

/**
 * @param {string|FieldSelector...} attr
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.select = function(attr) {
    var arr = [];
    delete this.$select;
    if (typeof attr === 'undefined' || attr == null) { return this; }
    //backward compatibility (version <1.20)
    if (attr instanceof Array) {
        return ClientDataQueryable.prototype.select.apply(this, attr);
    }
    var arg = Array.prototype.slice.call(arguments);
    for (var i = 0; i < arg.length; i++) {
        if (typeof arg[i] === 'string')
            arr.push(arg[i]);
        else if (arg[i] instanceof FieldSelector)
            arr.push(arg[i].toString());
        else
            throw new Error("Invalid argument. Expected string.");
    }
    if (arr.length >0) {
        /**
         * @private
         * @type {string}
         */
        this.$select = arr.join(",");
    }
    return this;
};

/**
 * @param {string|FieldSelector...} attr
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.groupBy = function(attr) {
    var arr = [];
    delete this.$groupby;
    if (typeof attr === 'undefined' || attr == null) { return this; }
    //backward compatibility (version <1.20)
    if (attr instanceof Array) {
        return ClientDataQueryable.prototype.groupBy.apply(this, attr);
    }
    var arg = Array.prototype.slice.call(arguments);
    for (var i = 0; i < arg.length; i++) {
        if (typeof arg[i] === 'string')
            arr.push(arg[i]);
        else if (arg[i] instanceof FieldSelector)
            arr.push(arg[i].toString());
        else
            throw new Error("Invalid argument. Expected string.");
    }
    if (arr.length >0) {
        /**
         * @private
         * @type {string}
         */
        this.$groupby = arr.join(",");
    }
    return this;
};

/**
 * @param {string|FieldSelector...} attr
 * @returns ClientDataQueryable
 * @deprecated This method is deprecated and will be removed. Use ClientDataQueryable.groupBy() instead.
 */
ClientDataQueryable.prototype.group = function(attr) {
    return this.groupBy.apply(this, arguments);
};

/**
 * @param {...string} attr
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.expand = function(attr) {
    var arr = [];
    delete this.$expand;
    if (typeof attr === 'undefined' || attr == null) { return this; }
    //backward compatibility (version <1.20)
    if (attr instanceof Array) {
        return ClientDataQueryable.prototype.expand.apply(this, attr);
    }
    var arg = Array.prototype.slice.call(arguments);
    for (var i = 0; i < arg.length; i++) {
        if (typeof arg[i] === 'string')
            arr.push(arg[i]);
        else
            throw new Error("Invalid argument. Expected string.");
    }
    if (arr.length >0) {
        /**
         * @private
         * @type {string}
         */
        this.$expand = arr.join(",")
    }
    return this;
};


    /**
     * Converts a ClientDataQueryable instance to a string which is going to be used as parameter in ClientDataQueryable.expand() method
     *  @param {String} attr - A string which represents the attribute of a model which is going to be expanded with the options specified in this instance of ClientDataQueryable.
     */
    ClientDataQueryable.prototype.toExpand = function(attr) {
        Args.notEmpty(attr,'Expandable attribute');
        var params = this.getParams(), s = "";
        for(var key in params) {
            if (params.hasOwnProperty(key)) {
                if (typeof params[key] !== 'undefined' && params[key] != null) {
                    s += ";" + key + "=" + params[key];
                }
            }
        }
        if (s.length>0) {
            return attr + "(" + s.substr(1) + ")"
        }
        else {
            return attr;
        }
    };


/**
 * @param {String} s
 */
ClientDataQueryable.prototype.filter = function(s) {
    var self = this;
    delete this.$filter;
    //clear in-process expression privates_
    var p = self.privates_;
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
            /**
             * @private
             * @type {string}
             */
            this.$prepared = this.$filter;
        }
        else {
            this.$prepared = angular.format('(%s) and (%s)', this.$prepared, this.$filter);
        }
        delete this.$filter;
    }
    return this;
};


ClientDataQueryable.prototype.toFilter = function() {
    if (typeof this.$filter !== 'undefined' && this.$filter != null) {
        if (typeof this.$prepared === 'undefined' || this.$prepared === null) {
            return this.$filter;
        }
        else {
            return angular.format('(%s) and (%s)', this.$prepared, this.$filter);
        }
    }
    else if(typeof this.$prepared !== 'undefined' && this.$prepared != null) {
        return this.$prepared;
    }
};

/**
 *
 * @param {string} attr
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.andAlso = function(attr) {
    var self = this;
    Args.notEmpty(name,"The left operand of a logical expression");
    if (self.$filter) {
        self.$filter = "(" + self.$filter + ")";
    }
    self.privates_.left = attr;
    self.privates_.lop = 'and';
    return self;
};

/**
 *
 * @param {string} attr
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.orElse = function(attr) {
    var self = this;
    Args.notEmpty(name,"The left operand of a logical expression");
    if (self.$filter) {
        self.$filter = "(" + self.$filter + ")";
    }
    self.privates_.left = attr;
    self.privates_.lop = 'or';
    return self;
};

/**
 * @param {number} val
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.take = function(val) {
    /**
     * @private
     * @type {number}
     */
    this.$top = val;
    return this;
};
/**
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.all = function() {
    this.$top = -1;
    return this;
};
/**
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.first = function() {
    /**
     * @private
     * @type {number}
     */
    this.$top = 1;
    /**
     * @private
     * @type {number}
     */
    this.$skip = 0;
    return this;
};

/**
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.list = function() {
    this.$inlinecount = true;
    return this;
};

/**
 * @param {number} val
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.skip = function(val) {
    /**
     * @private
     * @type {number}
     */
    this.$skip = val;
    return this;
};

/**
 * @param {string|FieldSelector} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.orderBy = function(name) {
    if (typeof name !=='undefined' || name!=null)
        /**
         * @private
         * @type {string}
         */
        this.$orderby = name.toString();
    return this;
};

/**
 * @param {string|FieldSelector} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.orderByDescending = function(name) {
    if (typeof name !=='undefined' || name!=null)
        this.$orderby = name.toString() + ' desc';
    return this;
};

/**
 * @param {string|FieldSelector} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.thenBy = function(name) {
    if (typeof name !=='undefined' || name!=null) {
        this.$orderby += (this.$orderby ? ',' + name.toString() : name.toString());
    }
    return this;
};

/**
 * @param {string|FieldSelector} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.thenByDescending = function(name) {
    if (typeof name !=='undefined' || name!=null) {
        this.$orderby += (this.$orderby ? ',' + name.toString() : name.toString()) + ' desc';
    }
    return this;
};

/**
 * @param {string} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.where = function(name) {
    delete this.$filter;
    this.privates_.left = name;
    return this;
};


    /**
     * @param {string} text
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.search = function(text) {
        this.$search = text;
        delete self.privates_.lop;delete self.privates_.left; delete self.privates_.op; delete self.privates_.right;
        return this;
    };

/**
 * @param {string=} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.and = function(name) {
    this.privates_.lop = 'and';
    if (typeof name !== 'undefined')
        this.privates_.left = name;
    return this;
};

/**
 * @param {String=} name
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.or = function(name) {
    this.privates_.lop = 'or';
    if (typeof name !== 'undefined')
        this.privates_.left = name;
    return this;
};

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.equal = function(value) {
    this.privates_.op = Array.isArray(value) ? 'in' : 'eq';
    this.privates_.right = value; return this.append();
};

/**
 * @param name
 * @returns {{$name: *}}
 * @deprecated This function is deprecated. Use FieldSelector.create() instead.
 */
ClientDataQueryable.prototype.field = function(name) {
    return { "$name":name }
};

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.notEqual = function(value) {
    this.privates_.op = Array.isArray(value) ? 'nin' : 'ne';
    this.privates_.right = value; return this.append();
};


/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.greaterThan = function(value) {
    this.privates_.op = 'gt';this.privates_.right = value; return this.append();
};

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.greaterOrEqual = function(value) {
    this.privates_.op = 'ge';this.privates_.right = value; return this.append();
};

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.lowerThan = function(value) {
    this.privates_.op = 'lt';this.privates_.right = value; return this.append();
};

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.lowerOrEqual = function(value) {
    this.privates_.op = 'le';this.privates_.right = value; return this.append();
};

/**
 * @param {*} value
 * @returns ClientDataQueryable
 */
ClientDataQueryable.prototype.contains = function(value) {
    this.privates_.op = 'ge';
    this.privates_.left = angular.format('indexof(%s,%s)', this.privates_.left, ClientDataQueryable.escape(value));
    this.privates_.right = 0;
    return this.append();
};

/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.getDate = function() {
    this.privates_.left = String.prototype.format('date(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.getDay = function() {
    this.privates_.left = String.prototype.format('day(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.getMonth = function() {
    this.privates_.left = String.prototype.format('month(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.getYear = function() {
    this.privates_.left = String.prototype.format('year(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.getHours = function() {
    this.privates_.left = String.prototype.format('hour(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.getMinutes = function() {
    this.privates_.left = String.prototype.format('minute(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.getSeconds = function() {
    this.privates_.left = String.prototype.format('second(%s)',this.privates_.left);
    return this;
};
/**
 * @param {string} s
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.indexOf = function(s) {
    this.privates_.left = String.prototype.format('indexof(%s,%s)', this.privates_.left, ClientDataQueryable.escape(s));
    return this;
};
/**
 * @param {number} pos
 * @param {number} length
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.substr = function(pos, length) {
    this.privates_.left = String.prototype.format('substring(%s,%s,%s)',this.privates_.left, pos, length);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.floor = function() {
    this.privates_.left = String.prototype.format('floor(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.round = function() {
    this.privates_.left = String.prototype.format('round(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.length = function() {
    this.privates_.left = String.prototype.format('length(%s)',this.privates_.left);
    return this;
};

/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.toLocaleLowerCase = function() {
    this.privates_.left = String.prototype.format('tolower(%s)',this.privates_.left);
    return this;
};

/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.toLowerCase = function() {
    this.privates_.left = String.prototype.format('tolower(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.toUpperCase = function() {
    this.privates_.left = String.prototype.format('toupper(%s)',this.privates_.left);
    return this;
};
/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.toLocaleUpperCase = function() {
    this.privates_.left = String.prototype.format('toupper(%s)',this.privates_.left);
    return this;
};

/**
 * @param {string} s
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.startsWith = function(s) {
    this.privates_.left = String.prototype.format('startswith(%s,%s)',this.privates_.left, ClientDataQueryable.escape(s));
    return this;
};

/**
 * @param {string} s
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.endsWith = function(s) {
    this.privates_.left = String.prototype.format('endswith(%s,%s)',this.privates_.left, ClientDataQueryable.escape(s));
    return this;
};

/**
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.trim = function() {
    this.privates_.left = String.prototype.format('trim(%s)',this.privates_.left);
    return this;
};

/**
 * @param {*...} s0
 * @returns {ClientDataQueryable}
 */
ClientDataQueryable.prototype.concat = function(s0) {
    var res = 'concat(' + this.privates_.left;
    for (var i = 0; i < arguments.length; i++) res += ',' + ClientDataQueryable.escape(s0);
    res += ')';
    this.privates_.left = res;
    return this;
};


    /**
     * Sets the number of levels of the expandable attributes.
     * @param {number=} value
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.levels = function(value) {
        if (typeof value === 'number')
            /**
             * @private
             * @type {boolean}
             */
            this.$levels = value;
        else
            throw new Error("Expandable levels must a number");
        return this;
    };


function QueryableController($scope, $svc)
{
    //$scope.init = function(options) { $scope.options = options };
    $scope.query = new ClientDataQueryable();
    $scope.query.service = $svc;
}

function CommonController($scope, $q, $location, $window, $shared) {

    //find first element with ng-scope (root element)
    var $route,
        $context,
        $routeParams,
        $stateParams,
        $rootElement = angular.element(document.querySelector('.ng-scope')), $injector = $rootElement.injector();
    if ($injector) {
        //ensure application services
        if ($injector.has('$q'))
            $q = $q || $injector.get('$q');
        if ($injector.has('$location'))
            $location = $location || $injector.get('$location');
        if ($injector.has('$window'))
            $window = $window || $injector.get('$window');
        if ($injector.has('$routeParams'))
            $routeParams = $injector.get('$routeParams');
        //ui.router params
        if ($injector.has('$stateParams'))
            $stateParams = $injector.get('$stateParams');
        if ($injector.has('$route'))
            $route = $injector.get('$route');
        if ($injector.has('$shared'))
            $shared = $shared || $injector.get('$shared');
        if ($injector.has('$context'))
            $context = $injector.get('$context');
    }

    /**
     * Gets an instance of ClientDataContext service.
     * @returns {ClientDataContext}
     */
    $scope.getContext = function() {
        Args.notNull($context, "MOST Data Context Service");
        return $context;
    };

    //register broadcast emitter
    $scope.broadcast = function(name, args) {
        if (typeof $shared === 'undefined')
            return;
        $shared.broadcast(name, args);
    };
    /**
     * Gets an object that represents the client parameters, if any.
     * @type {Object}
     */
    $scope.client = { route : ( $routeParams || $stateParams || {}) };
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
    };

    $scope.location = $location;
    $scope.location.encodedUrl = function() {
        return encodeURIComponent('#' + $location.url())
    };
    $scope.location.encodedAbsUrl = function() {
        return encodeURIComponent($location.absUrl())
    };

    $scope.back = function(err) {
        if (err) {
            //do nothing
        }
        else {
            var returnURL = $scope["returnUrl"] || $scope["return"];
            if (returnURL) {
                $window.location.href = returnURL;
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
 * @constructor
 */
function DataController($scope, $q, $location, $svc, $window, $shared)
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
                var returnURL = $scope["returnUrl"] || $scope["return"];
                if (returnURL) {
                    $window.location.href = returnURL;
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
                var returnURL = $scope["returnUrl"] || $scope["return"];
                if (returnURL) {
                    $window.location.href = returnURL;
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
                var returnURL = $scope["returnUrl"] || $scope["return"];
                if (returnURL) {
                    $window.location.href = returnURL;
                }
            }
        });
    };

}

function MostSharedService($rootScope, $location, $injector)
{
    this.$root = $rootScope;
    //set default referrer
    this.$root.referrer = "/";
    //register location change listener
    var self = this;

    var $routeParams;
    if ($injector && $injector.has('$routeParams'))
        $routeParams = $injector.get('$routeParams');

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
            if ($routeParams) {
                var action = $routeParams.action, controller = $routeParams.controller;
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

function ItemController($scope, $q, $location, $svc, $window, $shared)
{
    //find first element with ng-scope (root element)
    var $routeParams,
        $rootElement = angular.element(document.querySelector('.ng-scope')), $injector = $rootElement.injector();
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
            $routeParams = $injector.get('$routeParams');
    }
    //inherits CommonController
    CommonController($scope);

    $scope.broadcast = function(name, args) {
        if (typeof $shared === 'undefined')
            return;
        $shared.broadcast(name, args);
    };

    $scope.$watch('item', function(value) {
        if (angular.isDefined($scope.state) && angular.isDefined($scope.model)) {
            //if state is new
            if ($scope.state=='new') {
                //validate item
                $scope.item = $scope.item || {};
                //get model schema
                $svc.schema($scope.model, function(err, result) {
                   if (err) { return; }
                    var schema = result,
                        params = {};
                    //copy client route
                    for(var key in $scope.client.route)
                        params[key]=$scope.client.route[key];
                    //append server route params
                    for(var key in $scope.server.route) {
                        if ($scope.server.route.hasOwnProperty(key) && params.hasOwnProperty(key)==false)
                            params[key]=$scope.server.route[key];
                    }

                    var resolveAssociatedObject = function(attr, associatedValue) {
                        /**
                         * @type {{parentModel:string},{childModel:string,childField:string,parentField:string,associationType:string}}
                         */
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
                    };
                    var resolveJunctionObject = function(attr, value) {
                        /**
                         * @type {{parentModel:string},{childModel:string,childField:string,parentField:string,associationType:string}}
                         */
                        var mapping=attr.mapping;
                        var q = new ClientDataQueryable(mapping.childModel);
                        q.service = $svc;
                        var deferred = $q.defer();
                        //store property name to deferred
                        $scope.item[attr.property||attr.name] = deferred.promise;
                        q.where(mapping.childField).equal(value).item.then(function(result) {
                            $scope.item[attr.property||attr.name]=[result];
                            deferred.resolve([result]);
                        }, function(reason) {
                            $scope.item[attr.property||attr.name]=null;
                            deferred.resolve(null);
                            console.log('Failed to get junction object with reason:' + reason);
                        });
                    };

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
                                            else
                                            {
                                                if (attr.mapping.associationType==='junction') {
                                                    if (typeof value==='string'){
                                                        if (value.length>0)
                                                            resolveJunctionObject(attr, value);
                                                    }
                                                }
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
        if (!angular.isDefined(newValue)) {
            $scope.item = null;
            return;
        }
        if (newValue!==oldValue ||  $scope.item==null) {
            var q = new ClientDataQueryable();
            q.service = $svc;
            //todo::load current model
            var item = q.model($scope.model).where('id').equal($scope.id).expand($scope.expand).first().item;
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
        var returnURL = $scope["returnUrl"] || $scope["return"];
        if (returnURL) {
            $window.location.href = returnURL;
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

    $scope.removeWithConfirmation = function(message, callback)
    {
        message = message || 'You are going to delete this item. Do you want to proceed?';
        if (confirm(message)) {
            $scope.remove(callback);
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
                if ($scope.redirection==false)
                    return;
                //if current scope has a return url
                var returnURL = $scope["returnUrl"] || $scope["return"];
                if (typeof returnURL === "string") {
                    //redirect to this url
                    $window.location.href = returnURL;
                }
            }
        });
    };


    $scope.save = function(callback) {
        $svc.save($scope.item, { model:$scope.model }, function(err, result) {
            if (err) {
                $scope.submitted = false;
                $scope.messages=angular.localized(err.message);
                //invoke callback with error
                if (typeof callback === 'function') {
                    return callback(err);
                }
                else {
                    //raise error event
                    if ($shared) {
                        $scope.state = $scope.state || 'save';
                        $shared.broadcast('item.error', { model:$scope.model, data:$scope.item, error:err });
                    }
                }
            }
            else {
                $scope.showNew = false;
                $scope.submitted = true;
                $scope.item = result;
                //invoke callback
                if (typeof callback === 'function') {
                    return callback(null, result);
                }
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
                var returnURL = $scope["returnUrl"] || $scope["return"];
                if (returnURL) {
                    //redirect to this url
                    $window.location.href = returnURL;
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
                        if ($scope.$root.referrer!=$location.path() || $scope.$root.paths.length==1) {
                            var iy=$scope.$root.referrer.indexOf('?');
                            if (iy< 0)
                            {
                                $location.path ($scope.$root.referrer);
                            }
                            else
                            {
                                $location.path($scope.$root.referrer.substr(0,iy)).search($scope.$root.referrer.substr(iy+1)) ;
                            }
                        }
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

function MostVariableDirective($timeout) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            if (attrs.ngValue) {
                return scope.$eval(attrs.name + "=" + attrs.ngValue + ";");
            }
            function set_(value) {
                if (scope.$$phase === '$digest' || scope.$$phase === '$apply') {
                    $timeout(function() {
                        scope[attrs.name] = value;
                    });
                }
                else {
                    scope[attrs.name] = value;
                }
            }
            scope.$watch(attrs.value, function(newValue) {
                set_(newValue);
            });
        }
    };
}

function MostParamDirective($window) {
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
                $window.route = $window.route || { };
                for (var name in params) {
                    if (params.hasOwnProperty(name)) {
                        scope.$watch(params[name], function(newValue) {
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
                var $element = angular.element(iElement);
                $element.find("label").html(iAttrs.title);
                var attributes = $element.prop("attributes");
                var $input = $element.find("input");
                if (angular.isArray(attributes)) {
                    for (var i = 0; i < attributes.length; i++) {
                        var obj = attributes[i];
                        if (obj.name !== "class") { $input.attr(obj.name, obj.value); }
                    }
                }
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
                var $element = angular.element(iElement);
                $element.find("label").html(iAttrs.title);
                var attributes = $element.prop("attributes");
                var $input = $element.find("input");
                if (angular.isArray(attributes)) {
                    for (var i = 0; i < attributes.length; i++) {
                        var obj = attributes[i];
                        if (obj.name !== "class") { $input.attr(obj.name, obj.value); }
                    }
                }
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
        compile: function compile() {
            return function (scope, iElement, iAttrs) {
                var $element = angular.element(iElement);
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

                if (angular.isArray(attributes)) {
                    for (var k = 0; i < attributes.length; k++) {
                        var obj = attributes[k];
                        if (obj.name === "placeholder") {
                            $input.attr(obj.name,angular.localized(obj.value));
                        }
                        else if (obj.name !== "class") {
                            $input.attr(obj.name, obj.value);
                        }
                    }
                }
                //set type ahead properties
                var field = iAttrs['field'], dataFilter=null;
                var value = iAttrs['value'] || "x";
                var typeaheadAttr = angular.format('%s as x.%s for x in %s($viewValue)',value, field, dataName);
                var limit = parseInt(iAttrs['limit']) || 10;
                //set typeahead attribute
                $input.attr("uib-typeahead", typeaheadAttr);
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
                if (iAttrs['filter']) {
                    dataFilter=angular.format("%s and (%s))", iAttrs["filter"],dataFilter);
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
                };
                $compile($element)(scope);
            };
        }
    };
}

function MostDataInstanceDirective($svc, $parse) {
    return {
        restrict: 'E',
        scope: { model:'@', filter:'@',  select:'@', group:'@', order:'@', top:'@', inlinecount:'@', paged:'@', skip:'@', expand:'@', prepared:'@', url:'@' },
        link: function(scope, element, attrs) {
            if (typeof scope.model === 'undefined')
                return;
            scope.route = window.route;
            var q = new ClientDataQueryable(scope.model), arr = [];
            q.service = $svc;
            if (angular.isNotEmptyString(scope.url)) {
                q.setUrl(scope.url);
            }
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
            if (/^true$/i.test(scope.inlinecount)) {
                q.paged(true);
            }
            if (/^true$/i.test(scope.paged)) {
                q.paged(true);
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

                var getter = $parse(attrs.name), setter;
                if (getter)
                    setter = getter.assign;
                if (typeof setter === 'function') {
                    setter(scope.$parent, (q.$top == 1) ? result[0] : result);
                }
                //scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
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

            //register for filter change
            scope.$on('page.change', function(event, args)
            {
                if (typeof args === 'object') {
                    if (args.name==attrs.name) {
                        if (typeof args.page !== 'undefined') {
                            var page = parseInt(args.page), size = parseInt(scope.top);
                            if (size<=0) { return; }
                            q.reset().skip((page-1)*size).items.then(function(result) {
                                scope.$parent[attrs.name] = (q.$top == 1) ? result[0] : result;
                            });
                        }
                    }
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


function MostFloatDirective($filter) {
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
            ctrl.$formatters.unshift(function(value) {
                return $filter('number')(value);
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

function ControllerInitDirective(){
    return {
        priority: 1000,
        compile: function () {
            return {
                pre: function (scope, element, attrs) {
                    if (attrs["ctrlInit"])
                        scope.$eval(attrs["ctrlInit"]);
                }
            };
        }
    };
}

//most module
var most = angular.module('most', []);
//MODULE SERVICES
most.factory('$shared',function ($rootScope, $location, $injector) {
        return new MostSharedService($rootScope, $location, $injector);
    });
most.provider('$svc', function ClientDataServiceProvider() {
    this.defaults = { base:"/" };
    this.$get = function ($http, $q) {
        var res = new ClientDataService($http, $q);
        res.base = this.defaults.base || "/";
        return res;
    };
});

/**
 * @ngdoc service
 * @name $context
 * @description
 * Use `$context` to access MOST Data Services.
 * */
/**
 *
 */
most.provider("$context", function ClientDataContextProvider() {
    this.defaults = { base:"/" };
    this.$get = function ($http, $q) {
        //init new service instance
        var service = new ClientDataService($http, $q);
        service.base = this.defaults.base || "/";
        return new ClientDataContext(service);
    };
});
//MODULE CONTROLLERS
most.controller('DataController', DataController)
    .controller('ItemController', ItemController)
    .controller('CommonController', CommonController);
//MODULE DIRECTIVES
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
//MODULE FILTERS
most.filter('loc', MostLocalizedFilter);

if (window) {
    //export prototypes
    window.ClientDataQueryable = ClientDataQueryable;
    window.ClientDataService = ClientDataService;
    window.ClientDataModel = ClientDataModel;
    window.MostDataField = MostDataField;
    //export controllers
    window.CommonController = CommonController;
    window.DataController = DataController;
    window.ItemController = ItemController;
    window.QueryableController = QueryableController;
}
})(window, angular);

