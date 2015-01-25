/*
* xmlcommon.js
* */

/**
 * XML Common Functions and Constants
 */
/**
 * @class XmlCommon
 * @constructor
 */
function XmlCommon() {
    //constants
    this.DOM_ELEMENT_NODE = 1;
    this.DOM_ATTRIBUTE_NODE = 2;
    this.DOM_TEXT_NODE = 3;
    this.DOM_CDATA_SECTION_NODE = 4;
    this.DOM_ENTITY_REFERENCE_NODE = 5;
    this.DOM_ENTITY_NODE = 6;
    this.DOM_PROCESSING_INSTRUCTION_NODE = 7;
    this.DOM_COMMENT_NODE = 8;
    this.DOM_DOCUMENT_NODE = 9;
    this.DOM_DOCUMENT_TYPE_NODE = 10;
    this.DOM_DOCUMENT_FRAGMENT_NODE = 11;
    this.DOM_NOTATION_NODE = 12;

    this.REGEXP_UNICODE = function() {
        var tests = [' ', '\u0120', -1,  // Konquerer 3.4.0 fails here.
            '!', '\u0120', -1,
            '\u0120', '\u0120', 0,
            '\u0121', '\u0120', -1,
            '\u0121', '\u0120|\u0121', 0,
            '\u0122', '\u0120|\u0121', -1,
            '\u0120', '[\u0120]', 0,  // Safari 2.0.3 fails here.
            '\u0121', '[\u0120]', -1,
            '\u0121', '[\u0120\u0121]', 0,  // Safari 2.0.3 fails here.
            '\u0122', '[\u0120\u0121]', -1,
            '\u0121', '[\u0120-\u0121]', 0,  // Safari 2.0.3 fails here.
            '\u0122', '[\u0120-\u0121]', -1];
        for (var i = 0; i < tests.length; i += 3) {
            if (tests[i].search(new RegExp(tests[i + 1])) != tests[i + 2]) {
                return false;
            }
        }
        return true;
    }();

    this.XML_S = '[ \t\r\n]+';
    this.XML_EQ = '(' + this.XML_S + ')?=(' + this.XML_S + ')?';
    this.XML_CHAR_REF = '&#[0-9]+;|&#x[0-9a-fA-F]+;';

    // XML 1.0 tokens.

    this.XML10_VERSION_INFO = this.XML_S + 'version' + this.XML_EQ + '("1\\.0"|' + "'1\\.0')";
    this.XML10_BASE_CHAR = (this.REGEXP_UNICODE) ?
    '\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff' +
    '\u0100-\u0131\u0134-\u013e\u0141-\u0148\u014a-\u017e\u0180-\u01c3' +
    '\u01cd-\u01f0\u01f4-\u01f5\u01fa-\u0217\u0250-\u02a8\u02bb-\u02c1\u0386' +
    '\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d6\u03da\u03dc' +
    '\u03de\u03e0\u03e2-\u03f3\u0401-\u040c\u040e-\u044f\u0451-\u045c' +
    '\u045e-\u0481\u0490-\u04c4\u04c7-\u04c8\u04cb-\u04cc\u04d0-\u04eb' +
    '\u04ee-\u04f5\u04f8-\u04f9\u0531-\u0556\u0559\u0561-\u0586\u05d0-\u05ea' +
    '\u05f0-\u05f2\u0621-\u063a\u0641-\u064a\u0671-\u06b7\u06ba-\u06be' +
    '\u06c0-\u06ce\u06d0-\u06d3\u06d5\u06e5-\u06e6\u0905-\u0939\u093d' +
    '\u0958-\u0961\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2' +
    '\u09b6-\u09b9\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a' +
    '\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36' +
    '\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d' +
    '\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9' +
    '\u0abd\u0ae0\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30' +
    '\u0b32-\u0b33\u0b36-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a' +
    '\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4' +
    '\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10' +
    '\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c85-\u0c8c' +
    '\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0-\u0ce1' +
    '\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61' +
    '\u0e01-\u0e2e\u0e30\u0e32-\u0e33\u0e40-\u0e45\u0e81-\u0e82\u0e84' +
    '\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5' +
    '\u0ea7\u0eaa-\u0eab\u0ead-\u0eae\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4' +
    '\u0f40-\u0f47\u0f49-\u0f69\u10a0-\u10c5\u10d0-\u10f6\u1100\u1102-\u1103' +
    '\u1105-\u1107\u1109\u110b-\u110c\u110e-\u1112\u113c\u113e\u1140\u114c' +
    '\u114e\u1150\u1154-\u1155\u1159\u115f-\u1161\u1163\u1165\u1167\u1169' +
    '\u116d-\u116e\u1172-\u1173\u1175\u119e\u11a8\u11ab\u11ae-\u11af' +
    '\u11b7-\u11b8\u11ba\u11bc-\u11c2\u11eb\u11f0\u11f9\u1e00-\u1e9b' +
    '\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d' +
    '\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc' +
    '\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec' +
    '\u1ff2-\u1ff4\u1ff6-\u1ffc\u2126\u212a-\u212b\u212e\u2180-\u2182' +
    '\u3041-\u3094\u30a1-\u30fa\u3105-\u312c\uac00-\ud7a3' :
        'A-Za-z';
    this.XML10_IDEOGRAPHIC = (this.REGEXP_UNICODE) ?
        '\u4e00-\u9fa5\u3007\u3021-\u3029' :
        '';
    this.XML10_COMBINING_CHAR = (this.REGEXP_UNICODE) ?
    '\u0300-\u0345\u0360-\u0361\u0483-\u0486\u0591-\u05a1\u05a3-\u05b9' +
    '\u05bb-\u05bd\u05bf\u05c1-\u05c2\u05c4\u064b-\u0652\u0670\u06d6-\u06dc' +
    '\u06dd-\u06df\u06e0-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0901-\u0903\u093c' +
    '\u093e-\u094c\u094d\u0951-\u0954\u0962-\u0963\u0981-\u0983\u09bc\u09be' +
    '\u09bf\u09c0-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3\u0a02' +
    '\u0a3c\u0a3e\u0a3f\u0a40-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a70-\u0a71' +
    '\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0b01-\u0b03' +
    '\u0b3c\u0b3e-\u0b43\u0b47-\u0b48\u0b4b-\u0b4d\u0b56-\u0b57\u0b82-\u0b83' +
    '\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44' +
    '\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c82-\u0c83\u0cbe-\u0cc4' +
    '\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0d02-\u0d03\u0d3e-\u0d43' +
    '\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1' +
    '\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39' +
    '\u0f3e\u0f3f\u0f71-\u0f84\u0f86-\u0f8b\u0f90-\u0f95\u0f97\u0f99-\u0fad' +
    '\u0fb1-\u0fb7\u0fb9\u20d0-\u20dc\u20e1\u302a-\u302f\u3099\u309a' :
        '';
    this.XML10_DIGIT = (this.REGEXP_UNICODE) ?
    '\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef' +
    '\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f' +
    '\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29' :
        '0-9';
    this.XML10_EXTENDER = (this.REGEXP_UNICODE) ?
    '\u00b7\u02d0\u02d1\u0387\u0640\u0e46\u0ec6\u3005\u3031-\u3035' +
    '\u309d-\u309e\u30fc-\u30fe' :
        '';
    this.XML10_LETTER = this.XML10_BASE_CHAR + this.XML10_IDEOGRAPHIC;
    this.XML10_NAME_CHAR = this.XML10_LETTER + this.XML10_DIGIT + '\\._:' +
    this.XML10_COMBINING_CHAR + this.XML10_EXTENDER + '-';
    this.XML10_NAME = '[' + this.XML10_LETTER + '_:][' + this.XML10_NAME_CHAR + ']*';

    this.XML10_ENTITY_REF = '&' + this.XML10_NAME + ';';
    this.XML10_REFERENCE = this.XML10_ENTITY_REF + '|' + this.XML_CHAR_REF;
    this.XML10_ATT_VALUE = '"(([^<&"]|' + this.XML10_REFERENCE + ')*)"|' +
    "'(([^<&']|" + this.XML10_REFERENCE + ")*)'";
    this.XML10_ATTRIBUTE =
        '(' + this.XML10_NAME + ')' + this.XML_EQ + '(' + this.XML10_ATT_VALUE + ')';

    // XML 1.1 tokens.

    this.XML11_VERSION_INFO = this.XML_S + 'version' + this.XML_EQ + '("1\\.1"|' + "'1\\.1')";
    this.XML11_NAME_START_CHAR = (this.REGEXP_UNICODE) ?
    ':A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d' +
    '\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff' +
    '\uf900-\ufdcf\ufdf0-\ufffd' :
        ':A-Z_a-z';
    this.XML11_NAME_CHAR = this.XML11_NAME_START_CHAR +
    ((this.REGEXP_UNICODE) ? '\\.0-9\u00b7\u0300-\u036f\u203f-\u2040-' : '\\.0-9-');
    this.XML11_NAME = '[' + this.XML11_NAME_START_CHAR + '][' + this.XML11_NAME_CHAR + ']*';

    this.XML11_ENTITY_REF = '&' + this.XML11_NAME + ';';
    this.XML11_REFERENCE = this.XML11_ENTITY_REF + '|' + this.XML_CHAR_REF;
    this.XML11_ATT_VALUE = '"(([^<&"]|' + this.XML11_REFERENCE + ')*)"|' +
    "'(([^<&']|" + this.XML11_REFERENCE + ")*)'";
    this.XML11_ATTRIBUTE =
        '(' + this.XML11_NAME + ')' + this.XML_EQ + '(' + this.XML11_ATT_VALUE + ')';

    // XML namespace tokens.
    // Used in XML parser and XPath parser.

    this.XML_NC_NAME_CHAR = this.XML10_LETTER + this.XML10_DIGIT + '\\._' +
    this.XML10_COMBINING_CHAR + this.XML10_EXTENDER + '-';
    this.XML_NC_NAME = '[' + this.XML10_LETTER + '_][' + this.XML_NC_NAME_CHAR + ']*';

    this.XML10_TAGNAME_REGEXP = new RegExp('^(' + this.XML10_NAME + ')');
    this.XML10_ATTRIBUTE_REGEXP = new RegExp(this.XML10_ATTRIBUTE, 'g');
    this.XML11_TAGNAME_REGEXP = new RegExp('^(' + this.XML11_NAME + ')');
    this.XML11_ATTRIBUTE_REGEXP = new RegExp(this.XML11_ATTRIBUTE, 'g');


}


//Escape XML special markup characters: tag delimiter < > and entity
//reference start delimiter &. The escaped string can be used in XML
//text portions (i.e. between tags).
XmlCommon.prototype.escapeText = function(s) {
    return ('' + s).replace(/&/g, '&amp;').replace(/</g, '&lt;').
        replace(/>/g, '&gt;');
};

//Escape XML special markup characters: tag delimiter < > entity
//reference start delimiter & and quotes ". The escaped string can be
//used in double quoted XML attribute value portions (i.e. in
//attributes within start tags).
XmlCommon.prototype.escapeAttr = function(s) {
    return this.xmlEscapeText(s).replace(/\"/g, '&quot;');
};

//Escape markup in XML text, but don't touch entity references. The
//escaped string can be used as XML text (i.e. between tags).
XmlCommon.prototype.escapeTags = function(s) {
    return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * @type {XmlCommon}
 */
var xmlCommon = new XmlCommon();

/*
 * util.js
 * */
// @constructor
function Set() {
    this.keys = [];
}

Set.prototype.size = function() {
    return this.keys.length;
};

// Adds the entry to the set, ignoring if it is present.
Set.prototype.add = function(key, opt_value) {
    var value = opt_value || 1;
    if (!this.contains(key)) {
        this[':' + key] = value;
        this.keys.push(key);
    }
};

// Sets the entry in the set, adding if it is not yet present.
Set.prototype.set = function(key, opt_value) {
    var value = opt_value || 1;
    if (!this.contains(key)) {
        this[':' + key] = value;
        this.keys.push(key);
    } else {
        this[':' + key] = value;
    }
};

// Increments the key's value by 1. This works around the fact that
// numbers are always passed by value, never by reference, so that we
// can't increment the value returned by get(), or the iterator
// argument. Sets the key's value to 1 if it doesn't exist yet.
Set.prototype.inc = function(key) {
    if (!this.contains(key)) {
        this[':' + key] = 1;
        this.keys.push(key);
    } else {
        this[':' + key]++;
    }
};

Set.prototype.get = function(key) {
    if (this.contains(key)) {
        return this[':' + key];
    } else {
        return null;
    }
};

// Removes the entry from the set.
Set.prototype.remove = function(key) {
    if (this.contains(key)) {
        delete this[':' + key];
        removeFromArray(this.keys, key, true);
    }
};

/**
 * Removes value from array. Returns the number of instances of value
 * that were removed from array.
 */
function removeFromArray (array, value, opt_notype) {
    var shift = 0;
    for (var i = 0; i < array.length; ++i) {
        if (array[i] === value || (opt_notype && array[i] == value)) {
            array.splice(i--, 1);
            shift++;
        }
    }
    return shift;
}


// Tests if an entry is in the set.
Set.prototype.contains = function(entry) {
    return typeof this[':' + entry] != 'undefined';
};

// Gets a list of values in the set.
Set.prototype.items = function() {
    var list = [];
    for (var i = 0; i < this.keys.length; ++i) {
        var k = this.keys[i];
        var v = this[':' + k];
        list.push(v);
    }
    return list;
};


// Invokes function f for every key value pair in the set as a method
// of the set.
Set.prototype.map = function(f) {
    for (var i = 0; i < this.keys.length; ++i) {
        var k = this.keys[i];
        f.call(this, k, this[':' + k]);
    }
};

Set.prototype.clear = function() {
    for (var i = 0; i < this.keys.length; ++i) {
        delete this[':' + this.keys[i]];
    }
    this.keys.length = 0;
};

/**
 * @class XmlUtil
 * @constructor
 */
function XmlUtil() {
    //
}

// Splits a string s at all occurrences of character c. This is like
// the split() method of the string object, but IE omits empty
// strings, which violates the invariant (s.split(x).join(x) == s).
// @param {String} s
// @param {String} c
// @returns Array
XmlUtil.prototype.stringSplit = function (s, c) {
    var a = s.indexOf(c);
    if (a == -1) {
        return [ s ];
    }
    var parts = [];
    parts.push(s.substr(0,a));
    while (a != -1) {
        var a1 = s.indexOf(c, a + 1);
        if (a1 != -1) {
            parts.push(s.substr(a + 1, a1 - a - 1));
        } else {
            parts.push(s.substr(a + 1));
        }
        a = a1;
    }
    return parts;
};


// Applies the given function to each element of the array, preserving
// this, and passing the index.
XmlUtil.prototype.mapExec = function(array, func) {
    for (var i = 0; i < array.length; ++i) {
        func.call(this, array[i], i);
    }
};

// Returns an array that contains the return value of the given
// function applied to every element of the input array.
XmlUtil.prototype.mapExpr = function(array, func) {
    var ret = [];
    for (var i = 0; i < array.length; ++i) {
        ret.push(func(array[i]));
    }
    return ret;
};



// Returns the representation of a node as XML text.
XmlUtil.prototype.xmlText = function(node, opt_cdata) {
    var buf = [];
    this.xmlTextR(node, buf, opt_cdata);
    return buf.join('');
};

XmlUtil.prototype.xmlTextR = function(node, buf, cdata) {
    if (node.nodeType == xmlCommon.DOM_TEXT_NODE) {
        buf.push(this.xmlEscapeText(node.nodeValue));

    } else if (node.nodeType == xmlCommon.DOM_CDATA_SECTION_NODE) {
        if (cdata) {
            buf.push(node.nodeValue);
        } else {
            buf.push('<![CDATA[' + node.nodeValue + ']]>');
        }

    } else if (node.nodeType == xmlCommon.DOM_COMMENT_NODE) {
        buf.push('<!--' + node.nodeValue + '-->');

    } else if (node.nodeType == xmlCommon.DOM_ELEMENT_NODE) {
        buf.push('<' + this.xmlFullNodeName(node));
        for (var i = 0; i < node.attributes.length; ++i) {
            var a = node.attributes[i];
            if (a && a.nodeName && a.nodeValue) {
                buf.push(' ' + this.xmlFullNodeName(a) + '="' +
                this.xmlEscapeAttr(a.nodeValue) + '"');
            }
        }

        if (node.childNodes.length == 0) {
            buf.push('/>');
        } else {
            buf.push('>');
            for (var i = 0; i < node.childNodes.length; ++i) {
                arguments.callee(node.childNodes[i], buf, cdata);
            }
            buf.push('</' + this.xmlFullNodeName(node) + '>');
        }

    } else if (node.nodeType == xmlCommon.DOM_DOCUMENT_NODE ||
        node.nodeType == xmlCommon.DOM_DOCUMENT_FRAGMENT_NODE) {
        for (var i = 0; i < node.childNodes.length; ++i) {
            arguments.callee(node.childNodes[i], buf, cdata);
        }
    }
};

XmlUtil.prototype.xmlFullNodeName = function(n) {
    if (n.prefix && n.nodeName.indexOf(n.prefix + ':') != 0) {
        return n.prefix + ':' + n.nodeName;
    } else {
        return n.nodeName;
    }
};

XmlUtil.prototype.isArray = function isArray(ar) {
    return Array.isArray(ar) ||
        (typeof ar === 'object' && Object.prototype.toString.call(ar) === '[object Array]');
};

XmlUtil.prototype.format = function(f) {
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
    var str = String(f).replace(formatRegExp, function(x) {
        if (x === '%%') return '%';
        if (i >= len) return x;
        switch (x) {
            case '%s': return String(args[i++]);
            case '%d': return Number(args[i++]);
            case '%j': return JSON.stringify(args[i++]);
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

XmlUtil.prototype._extend = function(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || typeof add !== 'object') return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
        origin[keys[i]] = add[keys[i]];
    }
    return origin;
};

// Escape XML special markup characters: tag delimiter < > and entity
// reference start delimiter &. The escaped string can be used in XML
// text portions (i.e. between tags).
XmlUtil.prototype.xmlEscapeText = function(s) {
    return ('' + s).replace(/&/g, '&amp;').replace(/</g, '&lt;').
        replace(/>/g, '&gt;');
};

// Escape XML special markup characters: tag delimiter < > entity
// reference start delimiter & and quotes ". The escaped string can be
// used in double quoted XML attribute value portions (i.e. in
// attributes within start tags).
XmlUtil.prototype.xmlEscapeAttr = function(s) {
    return this.xmlEscapeText(s).replace(/\"/g, '&quot;');
};

// Escape markup in XML text, but don't touch entity references. The
// escaped string can be used as XML text (i.e. between tags).
XmlUtil.prototype.xmlEscapeTags = function(s) {
    return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * @type {XmlUtil}
 */
var xmlUtil = new XmlUtil();

/*
 * xmltoken.js
 * */
var REGEXP_UNICODE = function() {
    var tests = [' ', '\u0120', -1,  // Konquerer 3.4.0 fails here.
        '!', '\u0120', -1,
        '\u0120', '\u0120', 0,
        '\u0121', '\u0120', -1,
        '\u0121', '\u0120|\u0121', 0,
        '\u0122', '\u0120|\u0121', -1,
        '\u0120', '[\u0120]', 0,  // Safari 2.0.3 fails here.
        '\u0121', '[\u0120]', -1,
        '\u0121', '[\u0120\u0121]', 0,  // Safari 2.0.3 fails here.
        '\u0122', '[\u0120\u0121]', -1,
        '\u0121', '[\u0120-\u0121]', 0,  // Safari 2.0.3 fails here.
        '\u0122', '[\u0120-\u0121]', -1];
    for (var i = 0; i < tests.length; i += 3) {
        if (tests[i].search(new RegExp(tests[i + 1])) != tests[i + 2]) {
            return false;
        }
    }
    return true;
}();

// Common tokens in XML 1.0 and XML 1.1.

var XML_S = '[ \t\r\n]+';
var XML_EQ = '(' + XML_S + ')?=(' + XML_S + ')?';
var XML_CHAR_REF = '&#[0-9]+;|&#x[0-9a-fA-F]+;';

// XML 1.0 tokens.

var XML10_VERSION_INFO = XML_S + 'version' + XML_EQ + '("1\\.0"|' + "'1\\.0')";
var XML10_BASE_CHAR = (REGEXP_UNICODE) ?
'\u0041-\u005a\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff' +
'\u0100-\u0131\u0134-\u013e\u0141-\u0148\u014a-\u017e\u0180-\u01c3' +
'\u01cd-\u01f0\u01f4-\u01f5\u01fa-\u0217\u0250-\u02a8\u02bb-\u02c1\u0386' +
'\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d6\u03da\u03dc' +
'\u03de\u03e0\u03e2-\u03f3\u0401-\u040c\u040e-\u044f\u0451-\u045c' +
'\u045e-\u0481\u0490-\u04c4\u04c7-\u04c8\u04cb-\u04cc\u04d0-\u04eb' +
'\u04ee-\u04f5\u04f8-\u04f9\u0531-\u0556\u0559\u0561-\u0586\u05d0-\u05ea' +
'\u05f0-\u05f2\u0621-\u063a\u0641-\u064a\u0671-\u06b7\u06ba-\u06be' +
'\u06c0-\u06ce\u06d0-\u06d3\u06d5\u06e5-\u06e6\u0905-\u0939\u093d' +
'\u0958-\u0961\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2' +
'\u09b6-\u09b9\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a' +
'\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36' +
'\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d' +
'\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9' +
'\u0abd\u0ae0\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30' +
'\u0b32-\u0b33\u0b36-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a' +
'\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4' +
'\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10' +
'\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c85-\u0c8c' +
'\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0-\u0ce1' +
'\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61' +
'\u0e01-\u0e2e\u0e30\u0e32-\u0e33\u0e40-\u0e45\u0e81-\u0e82\u0e84' +
'\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5' +
'\u0ea7\u0eaa-\u0eab\u0ead-\u0eae\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4' +
'\u0f40-\u0f47\u0f49-\u0f69\u10a0-\u10c5\u10d0-\u10f6\u1100\u1102-\u1103' +
'\u1105-\u1107\u1109\u110b-\u110c\u110e-\u1112\u113c\u113e\u1140\u114c' +
'\u114e\u1150\u1154-\u1155\u1159\u115f-\u1161\u1163\u1165\u1167\u1169' +
'\u116d-\u116e\u1172-\u1173\u1175\u119e\u11a8\u11ab\u11ae-\u11af' +
'\u11b7-\u11b8\u11ba\u11bc-\u11c2\u11eb\u11f0\u11f9\u1e00-\u1e9b' +
'\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d' +
'\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc' +
'\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec' +
'\u1ff2-\u1ff4\u1ff6-\u1ffc\u2126\u212a-\u212b\u212e\u2180-\u2182' +
'\u3041-\u3094\u30a1-\u30fa\u3105-\u312c\uac00-\ud7a3' :
    'A-Za-z';
var XML10_IDEOGRAPHIC = (REGEXP_UNICODE) ?
    '\u4e00-\u9fa5\u3007\u3021-\u3029' :
    '';
var XML10_COMBINING_CHAR = (REGEXP_UNICODE) ?
'\u0300-\u0345\u0360-\u0361\u0483-\u0486\u0591-\u05a1\u05a3-\u05b9' +
'\u05bb-\u05bd\u05bf\u05c1-\u05c2\u05c4\u064b-\u0652\u0670\u06d6-\u06dc' +
'\u06dd-\u06df\u06e0-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0901-\u0903\u093c' +
'\u093e-\u094c\u094d\u0951-\u0954\u0962-\u0963\u0981-\u0983\u09bc\u09be' +
'\u09bf\u09c0-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3\u0a02' +
'\u0a3c\u0a3e\u0a3f\u0a40-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a70-\u0a71' +
'\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0b01-\u0b03' +
'\u0b3c\u0b3e-\u0b43\u0b47-\u0b48\u0b4b-\u0b4d\u0b56-\u0b57\u0b82-\u0b83' +
'\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44' +
'\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c82-\u0c83\u0cbe-\u0cc4' +
'\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0d02-\u0d03\u0d3e-\u0d43' +
'\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1' +
'\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39' +
'\u0f3e\u0f3f\u0f71-\u0f84\u0f86-\u0f8b\u0f90-\u0f95\u0f97\u0f99-\u0fad' +
'\u0fb1-\u0fb7\u0fb9\u20d0-\u20dc\u20e1\u302a-\u302f\u3099\u309a' :
    '';
var XML10_DIGIT = (REGEXP_UNICODE) ?
'\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef' +
'\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f' +
'\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29' :
    '0-9';
var XML10_EXTENDER = (REGEXP_UNICODE) ?
'\u00b7\u02d0\u02d1\u0387\u0640\u0e46\u0ec6\u3005\u3031-\u3035' +
'\u309d-\u309e\u30fc-\u30fe' :
    '';
var XML10_LETTER = XML10_BASE_CHAR + XML10_IDEOGRAPHIC;
var XML10_NAME_CHAR = XML10_LETTER + XML10_DIGIT + '\\._:' +
    XML10_COMBINING_CHAR + XML10_EXTENDER + '-';
var XML10_NAME = '[' + XML10_LETTER + '_:][' + XML10_NAME_CHAR + ']*';

var XML10_ENTITY_REF = '&' + XML10_NAME + ';';
var XML10_REFERENCE = XML10_ENTITY_REF + '|' + XML_CHAR_REF;
var XML10_ATT_VALUE = '"(([^<&"]|' + XML10_REFERENCE + ')*)"|' +
    "'(([^<&']|" + XML10_REFERENCE + ")*)'";
var XML10_ATTRIBUTE =
    '(' + XML10_NAME + ')' + XML_EQ + '(' + XML10_ATT_VALUE + ')';

// XML 1.1 tokens.
// TODO: NameStartChar also includes \u10000-\ueffff.
// ECMAScript Language Specification defines UnicodeEscapeSequence as
// "\u HexDigit HexDigit HexDigit HexDigit" and we may need to use
// surrogate pairs, but any browser doesn't support surrogate pairs in
// character classes of regular expression, so avoid including them for now.

var XML11_VERSION_INFO = XML_S + 'version' + XML_EQ + '("1\\.1"|' + "'1\\.1')";
var XML11_NAME_START_CHAR = (REGEXP_UNICODE) ?
':A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d' +
'\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff' +
'\uf900-\ufdcf\ufdf0-\ufffd' :
    ':A-Z_a-z';
var XML11_NAME_CHAR = XML11_NAME_START_CHAR +
    ((REGEXP_UNICODE) ? '\\.0-9\u00b7\u0300-\u036f\u203f-\u2040-' : '\\.0-9-');
var XML11_NAME = '[' + XML11_NAME_START_CHAR + '][' + XML11_NAME_CHAR + ']*';

var XML11_ENTITY_REF = '&' + XML11_NAME + ';';
var XML11_REFERENCE = XML11_ENTITY_REF + '|' + XML_CHAR_REF;
var XML11_ATT_VALUE = '"(([^<&"]|' + XML11_REFERENCE + ')*)"|' +
    "'(([^<&']|" + XML11_REFERENCE + ")*)'";
var XML11_ATTRIBUTE =
    '(' + XML11_NAME + ')' + XML_EQ + '(' + XML11_ATT_VALUE + ')';

// XML Namespace tokens.
// Used in XML parser and XPath parser.

var XML_NC_NAME_CHAR = XML10_LETTER + XML10_DIGIT + '\\._' +
    XML10_COMBINING_CHAR + XML10_EXTENDER + '-';
var XML_NC_NAME = '[' + XML10_LETTER + '_][' + XML_NC_NAME_CHAR + ']*';
/*
* xpath.js
* */
/**
 * Shallow-copies an array to the end of another array
 * Basically Array.concat, but works with other non-array collections
 * @param {Array} dst
 * @param {Array} src
 * */
function copyArray (dst, src) {
    if (!src) return;
    var dstLength = dst.length;
    for (var i = src.length - 1; i >= 0; --i) {
        dst[i+dstLength] = src[i];
    }
};

/**
 * This is an optimization for copying attribute lists in IE. IE includes many
 * extraneous properties in its DOM attribute lists, which take require
 * significant extra processing when evaluating attribute steps. With this
 * function, we ignore any such attributes that has an empty string value.
 * @param Array dst
 * @param Array src
 */
function copyArrayIgnoringAttributesWithoutValue (dst, src) {
    if (!src) return;
    for (var i = src.length - 1; i >= 0; --i) {
        // this test will pass so long as the attribute has a non-empty string
        // value, even if that value is "false", "0", "undefined", etc.
        if (src[i].nodeValue) {
            dst.push(src[i]);
        }
    }
};

/**
 * Reverses the given array in place.
 * @param Array array
 */
function reverseInplace (array) {
    for (var i = 0; i < array.length / 2; ++i) {
        var h = array[i];
        var ii = array.length - i - 1;
        array[i] = array[ii];
        array[ii] = h;
    }
};



/**
 * @param String msg
 */
function xpathLog(msg)
{
    //console.log(msg);
};
/**
 * @param Boolean b
 */
function assert(b) {
    if (!b) {
        throw "Assertion failed";
    }
};


function xpathParse(expr) {
    xpathLog('parse ' + expr);
    xpathParseInit();

    var cached = xpathCacheLookup(expr);
    if (cached) {
        xpathLog(' ... cached');
        return cached;
    }

    // Optimize for a few common cases: simple attribute node tests
    // (@id), simple element node tests (page), variable references
    // ($address), numbers (4), multi-step path expressions where each
    // step is a plain element node test
    // (page/overlay/locations/location).

    if (expr.match(/^(\$|@)?\w+$/i)) {
        var ret = makeSimpleExpr(expr);
        xpathParseCache[expr] = ret;
        xpathLog(' ... simple');
        return ret;
    }

    if (expr.match(/^\w+(\/\w+)*$/i)) {
        var ret = makeSimpleExpr2(expr);
        xpathParseCache[expr] = ret;
        xpathLog(' ... simple 2');
        return ret;
    }

    var cachekey = expr; // expr is modified during parse

    var stack = [];
    var ahead = null;
    var previous = null;
    var done = false;

    var parse_count = 0;
    var lexer_count = 0;
    var reduce_count = 0;

    while (!done) {
        parse_count++;
        expr = expr.replace(/^\s*/, '');
        previous = ahead;
        ahead = null;

        var rule = null;
        var match = '';
        for (var i = 0; i < xpathTokenRules.length; ++i) {
            var result = xpathTokenRules[i].re.exec(expr);
            lexer_count++;
            if (result && result.length > 0 && result[0].length > match.length) {
                rule = xpathTokenRules[i];
                match = result[0];
                break;
            }
        }

        // Special case: allow operator keywords to be element and
        // variable names.

        // NOTE(mesch): The parser resolves conflicts by looking ahead,
        // and this is the only case where we look back to
        // disambiguate. So this is indeed something different, and
        // looking back is usually done in the lexer (via states in the
        // general case, called "start conditions" in flex(1)). Also,the
        // conflict resolution in the parser is not as robust as it could
        // be, so I'd like to keep as much off the parser as possible (all
        // these precedence values should be computed from the grammar
        // rules and possibly associativity declarations, as in bison(1),
        // and not explicitly set.

        if (rule &&
            (rule == TOK_DIV ||
            rule == TOK_MOD ||
            rule == TOK_AND ||
            rule == TOK_OR) &&
            (!previous ||
            previous.tag == TOK_AT ||
            previous.tag == TOK_DSLASH ||
            previous.tag == TOK_SLASH ||
            previous.tag == TOK_AXIS ||
            previous.tag == TOK_DOLLAR)) {
            rule = TOK_QNAME;
        }

        if (rule) {
            expr = expr.substr(match.length);
            xpathLog('token: ' + match + ' -- ' + rule.label);
            ahead = {
                tag: rule,
                match: match,
                prec: rule.prec ?  rule.prec : 0, // || 0 is removed by the compiler
                expr: makeTokenExpr(match)
            };

        } else {
            xpathLog('DONE');
            done = true;
        }

        while (xpathReduce(stack, ahead)) {
            reduce_count++;
            xpathLog('stack: ' + stackToString(stack));
        }
    }

    xpathLog('stack: ' + stackToString(stack));

    // DGF any valid XPath should "reduce" to a single Expr token
    if (stack.length != 1) {
        throw 'XPath parse error ' + cachekey + ':\n' + stackToString(stack);
    }

    var result = stack[0].expr;
    xpathParseCache[cachekey] = result;

    xpathLog('XPath parse: ' + parse_count + ' / ' +
    lexer_count + ' / ' + reduce_count);

    return result;
}

var xpathParseCache = {};

function xpathCacheLookup(expr) {
    return xpathParseCache[expr];
}

/*DGF xpathReduce is where the magic happens in this parser.
 Skim down to the bottom of this file to find the table of
 grammatical rules and precedence numbers, "The productions of the grammar".

 The idea here
 is that we want to take a stack of tokens and apply
 grammatical rules to them, "reducing" them to higher-level
 tokens.  Ultimately, any valid XPath should reduce to exactly one
 "Expr" token.

 Reduce too early or too late and you'll have two tokens that can't reduce
 to single Expr.  For example, you may hastily reduce a qname that
 should name a function, incorrectly treating it as a tag name.
 Or you may reduce too late, accidentally reducing the last part of the
 XPath into a top-level "Expr" that won't reduce with earlier parts of
 the XPath.

 A "cand" is a grammatical rule candidate, with a given precedence
 number.  "ahead" is the upcoming token, which also has a precedence
 number.  If the token has a higher precedence number than
 the rule candidate, we'll "shift" the token onto the token stack,
 instead of immediately applying the rule candidate.

 Some tokens have left associativity, in which case we shift when they
 have LOWER precedence than the candidate.
 */
function xpathReduce(stack, ahead) {
    var cand = null;

    if (stack.length > 0) {
        var top = stack[stack.length-1];
        var ruleset = xpathRules[top.tag.key];

        if (ruleset) {
            for (var i = 0; i < ruleset.length; ++i) {
                var rule = ruleset[i];
                var match = xpathMatchStack(stack, rule[1]);
                if (match.length) {
                    cand = {
                        tag: rule[0],
                        rule: rule,
                        match: match
                    };
                    cand.prec = xpathGrammarPrecedence(cand);
                    break;
                }
            }
        }
    }

    var ret;
    if (cand && (!ahead || cand.prec > ahead.prec ||
        (ahead.tag.left && cand.prec >= ahead.prec))) {
        for (var i = 0; i < cand.match.matchlength; ++i) {
            stack.pop();
        }

        xpathLog('reduce ' + cand.tag.label + ' ' + cand.prec +
        ' ahead ' + (ahead ? ahead.tag.label + ' ' + ahead.prec +
        (ahead.tag.left ? ' left' : '')
            : ' none '));

        var matchexpr = xmlUtil.mapExpr(cand.match, function(m) { return m.expr; });
        xpathLog('going to apply ' + cand.rule[3].toString());
        cand.expr = cand.rule[3].apply(null, matchexpr);

        stack.push(cand);
        ret = true;

    } else {
        if (ahead) {
            xpathLog('shift ' + ahead.tag.label + ' ' + ahead.prec +
            (ahead.tag.left ? ' left' : '') +
            ' over ' + (cand ? cand.tag.label + ' ' +
            cand.prec : ' none'));
            stack.push(ahead);
        }
        ret = false;
    }
    return ret;
}

function xpathMatchStack(stack, pattern) {

    // NOTE(mesch): The stack matches for variable cardinality are
    // greedy but don't do backtracking. This would be an issue only
    // with rules of the form A* A, i.e. with an element with variable
    // cardinality followed by the same element. Since that doesn't
    // occur in the grammar at hand, all matches on the stack are
    // unambiguous.

    var S = stack.length;
    var P = pattern.length;
    var p, s;
    var match = [];
    match.matchlength = 0;
    var ds = 0;
    for (p = P - 1, s = S - 1; p >= 0 && s >= 0; --p, s -= ds) {
        ds = 0;
        var qmatch = [];
        if (pattern[p] == Q_MM) {
            p -= 1;
            match.push(qmatch);
            while (s - ds >= 0 && stack[s - ds].tag == pattern[p]) {
                qmatch.push(stack[s - ds]);
                ds += 1;
                match.matchlength += 1;
            }

        } else if (pattern[p] == Q_01) {
            p -= 1;
            match.push(qmatch);
            while (s - ds >= 0 && ds < 2 && stack[s - ds].tag == pattern[p]) {
                qmatch.push(stack[s - ds]);
                ds += 1;
                match.matchlength += 1;
            }

        } else if (pattern[p] == Q_1M) {
            p -= 1;
            match.push(qmatch);
            if (stack[s].tag == pattern[p]) {
                while (s - ds >= 0 && stack[s - ds].tag == pattern[p]) {
                    qmatch.push(stack[s - ds]);
                    ds += 1;
                    match.matchlength += 1;
                }
            } else {
                return [];
            }

        } else if (stack[s].tag == pattern[p]) {
            match.push(stack[s]);
            ds += 1;
            match.matchlength += 1;

        } else {
            return [];
        }

        reverseInplace(qmatch);
        qmatch.expr = xmlUtil.mapExpr(qmatch, function(m) { return m.expr; });
    }

    reverseInplace(match);

    if (p == -1) {
        return match;

    } else {
        return [];
    }
}

function xpathTokenPrecedence(tag) {
    return (tag.prec || 2);
};

function xpathGrammarPrecedence(frame) {
    var ret = 0;

    if (frame.rule) { /* normal reduce */
        if (frame.rule.length >= 3 && frame.rule[2] >= 0) {
            ret = frame.rule[2];

        } else {
            for (var i = 0; i < frame.rule[1].length; ++i) {
                var p = xpathTokenPrecedence(frame.rule[1][i]);
                ret = Math.max(ret, p);
            }
        }
    } else if (frame.tag) { /* TOKEN match */
        ret = xpathTokenPrecedence(frame.tag);

    } else if (frame.length) { /* Q_ match */
        for (var j = 0; j < frame.length; ++j) {
            var p = xpathGrammarPrecedence(frame[j]);
            ret = Math.max(ret, p);
        }
    }

    return ret;
}

function stackToString(stack) {
    var ret = '';
    for (var i = 0; i < stack.length; ++i) {
        if (ret) {
            ret += '\n';
        }
        ret += stack[i].tag.label;
    }
    return ret;
}


// XPath expression evaluation context. An XPath context consists of a
// DOM node, a list of DOM nodes that contains this node, a number
// that represents the position of the single node in the list, and a
// current set of variable bindings. (See XPath spec.)
//
// The interface of the expression context:
//
//   Constructor -- gets the node, its position, the node set it
//   belongs to, and a parent context as arguments. The parent context
//   is used to implement scoping rules for variables: if a variable
//   is not found in the current context, it is looked for in the
//   parent context, recursively. Except for node, all arguments have
//   default values: default position is 0, default node set is the
//   set that contains only the node, and the default parent is null.
//
//     Notice that position starts at 0 at the outside interface;
//     inside XPath expressions this shows up as position()=1.
//
//   clone() -- creates a new context with the current context as
//   parent. If passed as argument to clone(), the new context has a
//   different node, position, or node set. What is not passed is
//   inherited from the cloned context.
//
//   setVariable(name, expr) -- binds given XPath expression to the
//   name.
//
//   getVariable(name) -- what the name says.
//
//   setNode(position) -- sets the context to the node at the given
//   position. Needed to implement scoping rules for variables in
//   XPath. (A variable is visible to all subsequent siblings, not
//   only to its children.)
//
//   set/isCaseInsensitive -- specifies whether node name tests should
//   be case sensitive.  If you're executing xpaths against a regular
//   HTML DOM, you probably don't want case-sensitivity, because
//   browsers tend to disagree about whether elements & attributes
//   should be upper/lower case.  If you're running xpaths in an
//   XSLT instance, you probably DO want case sensitivity, as per the
//   XSL spec.
/**
 *
 * @param {XNode} node
 * @param {Integer=} opt_position
 * @param {*=} opt_nodelist
 * @param {*=} opt_parent
 * @param {Boolean=} opt_caseInsensitive
 * @param {Boolean=} opt_ignoreAttributesWithoutValue
 * @constructor
 */
function ExprContext(node, opt_position, opt_nodelist, opt_parent, opt_caseInsensitive, opt_ignoreAttributesWithoutValue) {
    if (node===undefined)
        return;
    this.initialize(node, opt_position, opt_nodelist, opt_parent, opt_caseInsensitive, opt_ignoreAttributesWithoutValue);
    /**
     * @type {Array}
     * @private
     */
    this._functions = [];
}
/**
 *
 * @param {XNode} node
 * @param opt_position
 * @param opt_nodelist
 * @param opt_parent
 * @param opt_caseInsensitive
 * @param opt_ignoreAttributesWithoutValue
 */
ExprContext.prototype.initialize = function(node, opt_position, opt_nodelist, opt_parent, opt_caseInsensitive, opt_ignoreAttributesWithoutValue) {
    this.node = node;
    this.position = opt_position || 0;
    this.nodelist = opt_nodelist || [ node ];
    this.variables = {};
    this.parent = opt_parent || null;
    this.caseInsensitive = opt_caseInsensitive || false;
    this.ignoreAttributesWithoutValue = opt_ignoreAttributesWithoutValue || false;
    if (opt_parent) {
        this.root = opt_parent.root;
    } else if (this.node.nodeType == xmlCommon.DOM_DOCUMENT_NODE) {
        // NOTE: DOM Spec stipulates that the ownerDocument of a
        // document is null. Our root, however is the document that we are
        // processing, so the initial context is created from its document
        // node, which case we must handle here explcitly.
        this.root = node;
    } else {
        this.root = node.ownerDocument;
    }
};

/**
 * Resolves a function reference and returns an function representing the xslt function
 * */
ExprContext.prototype.resolveFunction = function(f)
{
    this.invokeFunction = f;
};

/**
 * Registers XPath function class based on the specified prefix e.g. ns:count, ns:resolve etc.
 * @param {String} prefix - The function context prefix
 * @param {Object} obj The object that contains the functions we want to register
 */
ExprContext.prototype.setFunctionContext = function(prefix, obj)
{
    var fn = null;
    if (typeof this._functions === 'undefined' || this._functions==null)
        this._functions = [];
    if (this._functions.length>0) {
        for (var i = 0; i < this._functions.length; i++) {
            if (this._functions[i].prefix==prefix) {
                fn = this._functions[i];
                break;
            }
        }
    }
    if (fn==null)
        this._functions.push({prefix: prefix, instance:obj });
    else
        fn.instance=obj;
};

ExprContext.prototype.getFunctionContext = function(prefix)
{
    if (typeof this._functions === 'undefined' || this._functions==null)
        return null;
    if (!xmlUtil.isArray(this._functions))
        return null;
    var fn = null;
    for (var i = 0; i < this._functions.length; i++) {
        if (this._functions[i].prefix==prefix) {
            fn = this._functions[i];
            break;
        }
    }
    if (fn==null)
        return null;
    return fn.instance;
}

ExprContext.prototype.clone = function(opt_node, opt_position, opt_nodelist) {
    return new ExprContext(
        opt_node || this.node,
        typeof opt_position != 'undefined' ? opt_position : this.position,
        opt_nodelist || this.nodelist, this, this.caseInsensitive,
        this.ignoreAttributesWithoutValue);
};

ExprContext.prototype.setVariable = function(name, value) {
    if (value instanceof StringValue || value instanceof BooleanValue ||
        value instanceof NumberValue || value instanceof NodeSetValue) {
        this.variables[name] = value;
        return;
    }
    if ('true' === value) {
        this.variables[name] = new BooleanValue(true);
    } else if ('false' === value) {
        this.variables[name] = new BooleanValue(false);
    } else if (TOK_NUMBER.re.test(value)) {
        this.variables[name] = new NumberValue(value);
    } else {
        // DGF What if it's null?
        this.variables[name] = new StringValue(value);
    }
};

ExprContext.prototype.getVariable = function(name) {
    if (typeof this.variables[name] != 'undefined') {
        return this.variables[name];

    } else if (this.parent) {
        return this.parent.getVariable(name);

    } else {
        return null;
    }
};

ExprContext.prototype.setNode = function(position) {
    this.node = this.nodelist[position];
    this.position = position;
};

ExprContext.prototype.contextSize = function() {
    return this.nodelist.length;
};

ExprContext.prototype.isCaseInsensitive = function() {
    return this.caseInsensitive;
};

ExprContext.prototype.setCaseInsensitive = function(caseInsensitive) {
    return this.caseInsensitive = caseInsensitive;
};

ExprContext.prototype.isIgnoreAttributesWithoutValue = function() {
    return this.ignoreAttributesWithoutValue;
};

ExprContext.prototype.setIgnoreAttributesWithoutValue = function(ignore) {
    return this.ignoreAttributesWithoutValue = ignore;
};
/**
 * Parses and then evaluates the given XPath expression.
 * @param {String} select An XPATH expression
 * @param {Array=} ns - An array of namespaces that are used by the given expression
 * @returns {Object} An object that represents the result of the given expression
 */
ExprContext.prototype.evaluate = function(select, ns)
{
    if (ns !== undefined)
        return xpathEval(select, this, ns);
    return xpathEval(select, this);
};

// XPath expression values. They are what XPath expressions evaluate
// to. Strangely, the different value types are not specified in the
// XPath syntax, but only in the semantics, so they don't show up as
// nonterminals in the grammar. Yet, some expressions are required to
// evaluate to particular types, and not every type can be coerced
// into every other type. Although the types of XPath values are
// similar to the types present in JavaScript, the type coercion rules
// are a bit peculiar, so we explicitly model XPath types instead of
// mapping them onto JavaScript types. (See XPath spec.)
//
// The four types are:
//
//   StringValue
//
//   NumberValue
//
//   BooleanValue
//
//   NodeSetValue
//
// The common interface of the value classes consists of methods that
// implement the XPath type coercion rules:
//
//   stringValue() -- returns the value as a JavaScript String,
//
//   numberValue() -- returns the value as a JavaScript Number,
//
//   booleanValue() -- returns the value as a JavaScript Boolean,
//
//   nodeSetValue() -- returns the value as a JavaScript Array of DOM
//   Node objects.
//

function StringValue(value) {
    this.value = value;
    this.type = 'string';
}

StringValue.prototype.stringValue = function() {
    return this.value;
}

StringValue.prototype.booleanValue = function() {
    return this.value.length > 0;
}

StringValue.prototype.numberValue = function() {
    return this.value - 0;
}

StringValue.prototype.nodeSetValue = function() {
    throw this;
}

function BooleanValue(value) {
    this.value = value;
    this.type = 'boolean';
}

BooleanValue.prototype.stringValue = function() {
    return '' + this.value;
}

BooleanValue.prototype.booleanValue = function() {
    return this.value;
}

BooleanValue.prototype.numberValue = function() {
    return this.value ? 1 : 0;
}

BooleanValue.prototype.nodeSetValue = function() {
    throw this;
}

function NumberValue(value) {
    this.value = value;
    this.type = 'number';
}

NumberValue.prototype.stringValue = function() {
    return '' + this.value;
}

NumberValue.prototype.booleanValue = function() {
    return !!this.value;
}

NumberValue.prototype.numberValue = function() {
    return this.value - 0;
}

NumberValue.prototype.nodeSetValue = function() {
    throw this;
}

function NodeSetValue(value) {
    this.value = value;
    this.type = 'node-set';
}

NodeSetValue.prototype.stringValue = function() {
    if (this.value.length == 0) {
        return '';
    } else {
        if (this.value[0].nodeType==1 || this.value[0].nodeType==9) {
            var s = '';
            for (var i = 0; i < this.value[0].childNodes.length; i++) {
                var child = this.value[0].childNodes[i];
                //if child node is a TEXT NODE
                if (child.nodeType==3) {
                    s += child.nodeValue;
                }
            }
            return s.replace(/(^\s*|\s*$)/g, '');
        }
        else
            return this.value[0].nodeValue;
    }
};

NodeSetValue.prototype.booleanValue = function() {
    return this.value.length > 0;
}

NodeSetValue.prototype.numberValue = function() {
    return this.stringValue() - 0;
}

NodeSetValue.prototype.nodeSetValue = function() {
    return this.value;
};

// XPath expressions. They are used as nodes in the parse tree and
// possess an evaluate() method to compute an XPath value given an XPath
// context. Expressions are returned from the parser. Teh set of
// expression classes closely mirrors the set of non terminal symbols
// in the grammar. Every non trivial nonterminal symbol has a
// corresponding expression class.
//
// The common expression interface consists of the following methods:
//
// evaluate(context) -- evaluates the expression, returns a value.
//
// toString() -- returns the XPath text representation of the
// expression (defined in xsltdebug.js).
//
// parseTree(indent) -- returns a parse tree representation of the
// expression (defined in xsltdebug.js).

function TokenExpr(m) {
    this.value = m;
}

TokenExpr.prototype.evaluate = function() {
    return new StringValue(this.value);
};

function LocationExpr() {
    this.absolute = false;
    this.steps = [];
}

LocationExpr.prototype.appendStep = function(s) {
    var combinedStep = this._combineSteps(this.steps[this.steps.length-1], s);
    if (combinedStep) {
        this.steps[this.steps.length-1] = combinedStep;
    } else {
        this.steps.push(s);
    }
}

LocationExpr.prototype.prependStep = function(s) {
    var combinedStep = this._combineSteps(s, this.steps[0]);
    if (combinedStep) {
        this.steps[0] = combinedStep;
    } else {
        this.steps.unshift(s);
    }
};

// DGF try to combine two steps into one step (perf enhancement)
LocationExpr.prototype._combineSteps = function(prevStep, nextStep) {
    if (!prevStep) return null;
    if (!nextStep) return null;
    var hasPredicates = (prevStep.predicates && prevStep.predicates.length > 0);
    if (prevStep.nodetest instanceof NodeTestAny && !hasPredicates) {
        // maybe suitable to be combined
        if (prevStep.axis == xpathAxis.DESCENDANT_OR_SELF) {
            if (nextStep.axis == xpathAxis.CHILD) {
                nextStep.axis = xpathAxis.DESCENDANT;
                return nextStep;
            } else if (nextStep.axis == xpathAxis.SELF) {
                nextStep.axis = xpathAxis.DESCENDANT_OR_SELF;
                return nextStep;
            }
        } else if (prevStep.axis == xpathAxis.DESCENDANT) {
            if (nextStep.axis == xpathAxis.SELF) {
                nextStep.axis = xpathAxis.DESCENDANT;
                return nextStep;
            }
        }
    }
    return null;
};

LocationExpr.prototype.evaluate = function(ctx) {
    var start;
    if (this.absolute) {
        start = ctx.root;

    } else {
        start = ctx.node;
    }

    var nodes = [];
    xPathStep(nodes, this.steps, 0, start, ctx);
    return new NodeSetValue(nodes);
};

function xPathStep(nodes, steps, step, input, ctx) {
    var s = steps[step];
    var ctx2 = ctx.clone(input);
    var nodelist = s.evaluate(ctx2).nodeSetValue();

    for (var i = 0; i < nodelist.length; ++i) {
        if (step == steps.length - 1) {
            nodes.push(nodelist[i]);
        } else {
            xPathStep(nodes, steps, step + 1, nodelist[i], ctx);
        }
    }
}

function StepExpr(axis, nodetest, opt_predicate) {
    this.axis = axis;
    this.nodetest = nodetest;
    this.predicate = opt_predicate || [];
}

StepExpr.prototype.appendPredicate = function(p) {
    this.predicate.push(p);
}

StepExpr.prototype.evaluate = function(ctx) {
    var input = ctx.node;
    var nodelist = [];
    var skipNodeTest = false;

    if (this.nodetest instanceof NodeTestAny) {
        skipNodeTest = true;
    }

    // NOTE(mesch): When this was a switch() statement, it didn't work
    // in Safari/2.0. Not sure why though; it resulted in the JavaScript
    // console output "undefined" (without any line number or so).

    if (this.axis ==  xpathAxis.ANCESTOR_OR_SELF) {
        nodelist.push(input);
        for (var n = input.parentNode; n; n = n.parentNode) {
            nodelist.push(n);
        }

    } else if (this.axis == xpathAxis.ANCESTOR) {
        for (var n = input.parentNode; n; n = n.parentNode) {
            nodelist.push(n);
        }

    } else if (this.axis == xpathAxis.ATTRIBUTE) {
        if (ctx.ignoreAttributesWithoutValue) {
            copyArrayIgnoringAttributesWithoutValue(nodelist, input.attributes);
        }
        else {
            copyArray(nodelist, input.attributes);
        }

    } else if (this.axis == xpathAxis.CHILD) {
        copyArray(nodelist, input.childNodes);

    } else if (this.axis == xpathAxis.DESCENDANT_OR_SELF) {
        if (this.nodetest.evaluate(ctx).booleanValue()) {
            nodelist.push(input);
        }
        var tagName = xpathExtractTagNameFromNodeTest(this.nodetest);
        xpathCollectDescendants(nodelist, input, tagName);
        if (tagName) skipNodeTest = true;

    } else if (this.axis == xpathAxis.DESCENDANT) {
        var tagName = xpathExtractTagNameFromNodeTest(this.nodetest);
        xpathCollectDescendants(nodelist, input, tagName);
        if (tagName) skipNodeTest = true;

    } else if (this.axis == xpathAxis.FOLLOWING) {
        for (var n = input; n; n = n.parentNode) {
            for (var nn = n.nextSibling; nn; nn = nn.nextSibling) {
                nodelist.push(nn);
                xpathCollectDescendants(nodelist, nn);
            }
        }

    } else if (this.axis == xpathAxis.FOLLOWING_SIBLING) {
        for (var n = input.nextSibling; n; n = n.nextSibling) {
            nodelist.push(n);
        }

    } else if (this.axis == xpathAxis.NAMESPACE) {
        alert('not implemented: axis namespace');

    } else if (this.axis == xpathAxis.PARENT) {
        if (input.parentNode) {
            nodelist.push(input.parentNode);
        }

    } else if (this.axis == xpathAxis.PRECEDING) {
        for (var n = input; n; n = n.parentNode) {
            for (var nn = n.previousSibling; nn; nn = nn.previousSibling) {
                nodelist.push(nn);
                xpathCollectDescendantsReverse(nodelist, nn);
            }
        }

    } else if (this.axis == xpathAxis.PRECEDING_SIBLING) {
        for (var n = input.previousSibling; n; n = n.previousSibling) {
            nodelist.push(n);
        }

    } else if (this.axis == xpathAxis.SELF) {
        nodelist.push(input);

    } else {
        throw 'ERROR -- NO SUCH AXIS: ' + this.axis;
    }

    if (!skipNodeTest) {
        // process node test
        var nodelist0 = nodelist;
        nodelist = [];
        for (var i = 0; i < nodelist0.length; ++i) {
            var n = nodelist0[i];
            if (this.nodetest.evaluate(ctx.clone(n, i, nodelist0)).booleanValue()) {
                nodelist.push(n);
            }
        }
    }

    // process predicates
    for (var i = 0; i < this.predicate.length; ++i) {
        var nodelist0 = nodelist;
        nodelist = [];
        for (var ii = 0; ii < nodelist0.length; ++ii) {
            var n = nodelist0[ii];
            if (this.predicate[i].evaluate(ctx.clone(n, ii, nodelist0)).booleanValue()) {
                nodelist.push(n);
            }
        }
    }

    return new NodeSetValue(nodelist);
};

function NodeTestAny() {
    this.value = new BooleanValue(true);
}

NodeTestAny.prototype.evaluate = function(ctx) {
    return this.value;
};

function NodeTestElementOrAttribute() {}

NodeTestElementOrAttribute.prototype.evaluate = function(ctx) {
    return new BooleanValue(
        ctx.node.nodeType == xmlCommon.DOM_ELEMENT_NODE ||
        ctx.node.nodeType == xmlCommon.DOM_ATTRIBUTE_NODE);
};

function NodeTestText() {}

NodeTestText.prototype.evaluate = function(ctx) {
    return new BooleanValue(ctx.node.nodeType == xmlCommon.DOM_TEXT_NODE);
};

function NodeTestComment() {}

NodeTestComment.prototype.evaluate = function(ctx) {
    return new BooleanValue(ctx.node.nodeType == xmlCommon.DOM_COMMENT_NODE);
};

function NodeTestPI(target) {
    this.target = target;
}

NodeTestPI.prototype.evaluate = function(ctx) {
    return new
        BooleanValue(ctx.node.nodeType == xmlCommon.DOM_PROCESSING_INSTRUCTION_NODE &&
    (!this.target || ctx.node.nodeName == this.target));
};

function NodeTestNC(nsprefix) {
    this.regex = new RegExp("^" + nsprefix + ":");
    this.nsprefix = nsprefix;
}

NodeTestNC.prototype.evaluate = function(ctx) {
    var n = ctx.node;
    return new BooleanValue(this.regex.match(n.nodeName));
};

function NodeTestName(name) {
    this.name = name;
    this.re = new RegExp('^' + name + '$', "i");
}

NodeTestName.prototype.evaluate = function(ctx) {
    var n = ctx.node;
    if (ctx.caseInsensitive) {
        if (n.nodeName.length != this.name.length) return new BooleanValue(false);
        return new BooleanValue(this.re.test(n.nodeName));
    } else {
        return new BooleanValue(n.nodeName == this.name);
    }
};

function PredicateExpr(expr) {
    this.expr = expr;
}

PredicateExpr.prototype.evaluate = function(ctx) {
    var v = this.expr.evaluate(ctx);
    if (v.type == 'number') {
        // NOTE(mesch): Internally, position is represented starting with
        // 0, however in XPath position starts with 1. See functions
        // position() and last().
        return new BooleanValue(ctx.position == v.numberValue() - 1);
    } else {
        return new BooleanValue(v.booleanValue());
    }
};

function FunctionCallExpr(name) {
    this.name = name;
    this.args = [];
}

FunctionCallExpr.prototype.appendArg = function(arg) {
    this.args.push(arg);
};
/**
 * @param {ExprContext} ctx
 * @param {Function=} callback
 * @returns {*}
 */
FunctionCallExpr.prototype.evaluate = function(ctx, callback) {
    var fn = '' + this.name.value;
    var f = this.xpathfunctions[fn];
    if (f)
    {
        if (callback)
            f.call(this, ctx, callback);
        else
            return f.call(this, ctx);
    } else {
        //first of all get function prefix and local name
        var prefix = '';
        var localName = fn;
        var ix = fn.indexOf(':');
        if (ix>0) {
            localName = fn.substr(ix+1);
            prefix = fn.substr(0,ix)
        }
        //try to find function context for the specified prefix
        var functionContext = ctx.getFunctionContext(prefix);
        if (functionContext) {
            var fn = functionContext[localName];
            if ( typeof fn === 'function') {
                if (typeof callback === 'function')
                    fn.call(this, ctx, this.args, callback);
                else
                    return fn.call(this, ctx, this.args);
            }
        }
        else {
            if (typeof ctx.invokeFunction === 'function') {
                if (callback)
                    ctx.invokeFunction.call(this, ctx, localName, this.args, callback);
                else
                    return ctx.invokeFunction.call(this, ctx, localName, this.args);
            }
        }
        if (callback)
            callback(null,  new BooleanValue(false));
        else
            return new BooleanValue(false);
    }
};

FunctionCallExpr.prototype.xpathfunctions = {
    'last': function(ctx) {
        assert(this.args.length == 0);
        // XPath position starts at 1.
        return new NumberValue(ctx.contextSize());
    },

    'position': function(ctx) {
        assert(this.args.length == 0);
        // NOTE(mesch): XPath position starts at 1.
        return new NumberValue(ctx.position + 1);
    },

    'count': function(ctx) {
        assert(this.args.length == 1);
        var v = this.args[0].evaluate(ctx);
        return new NumberValue(v.nodeSetValue().length);
    },

    'id': function(ctx) {
        assert(this.args.length == 1);
        var e = this.args[0].evaluate(ctx);
        var ret = [];
        var ids;
        if (e.type == 'node-set') {
            ids = [];
            var en = e.nodeSetValue();
            for (var i = 0; i < en.length; ++i) {
                var v = en[i].value.split(/\s+/);
                for (var ii = 0; ii < v.length; ++ii) {
                    ids.push(v[ii]);
                }
            }
        } else {
            ids = e.stringValue().split(/\s+/);
        }
        var d = ctx.root;
        for (var i = 0; i < ids.length; ++i) {
            var n = d.getElementById(ids[i]);
            if (n) {
                ret.push(n);
            }
        }
        return new NodeSetValue(ret);
    },

    'local-name': function(ctx) {
        alert('not implmented yet: XPath function local-name()');
    },

    'namespace-uri': function(ctx) {
        alert('not implmented yet: XPath function namespace-uri()');
    },

    'name': function(ctx) {
        assert(this.args.length == 1 || this.args.length == 0);
        var n;
        if (this.args.length == 0) {
            n = [ ctx.node ];
        } else {
            n = this.args[0].evaluate(ctx).nodeSetValue();
        }

        if (n.length == 0) {
            return new StringValue('');
        } else {
            return new StringValue(n[0].nodeName);
        }
    },

    'string':  function(ctx) {
        assert(this.args.length == 1 || this.args.length == 0);
        if (this.args.length == 0) {
            return new StringValue(new NodeSetValue([ ctx.node ]).stringValue());
        } else {
            return new StringValue(this.args[0].evaluate(ctx).stringValue());
        }
    },

    'concat': function(ctx) {
        var ret = '';
        for (var i = 0; i < this.args.length; ++i) {
            ret += this.args[i].evaluate(ctx).stringValue();
        }
        return new StringValue(ret);
    },

    'starts-with': function(ctx) {
        assert(this.args.length == 2);
        var s0 = this.args[0].evaluate(ctx).stringValue();
        var s1 = this.args[1].evaluate(ctx).stringValue();
        return new BooleanValue(s0.indexOf(s1) == 0);
    },

    'contains': function(ctx) {
        assert(this.args.length == 2);
        var s0 = this.args[0].evaluate(ctx).stringValue();
        var s1 = this.args[1].evaluate(ctx).stringValue();
        return new BooleanValue(s0.indexOf(s1) != -1);
    },

    'substring-before': function(ctx) {
        assert(this.args.length == 2);
        var s0 = this.args[0].evaluate(ctx).stringValue();
        var s1 = this.args[1].evaluate(ctx).stringValue();
        var i = s0.indexOf(s1);
        var ret;
        if (i == -1) {
            ret = '';
        } else {
            ret = s0.substr(0,i);
        }
        return new StringValue(ret);
    },

    'substring-after': function(ctx) {
        assert(this.args.length == 2);
        var s0 = this.args[0].evaluate(ctx).stringValue();
        var s1 = this.args[1].evaluate(ctx).stringValue();
        var i = s0.indexOf(s1);
        var ret;
        if (i == -1) {
            ret = '';
        } else {
            ret = s0.substr(i + s1.length);
        }
        return new StringValue(ret);
    },

    'substring': function(ctx) {
        // NOTE: XPath defines the position of the first character in a
        // string to be 1, in JavaScript this is 0 ([XPATH] Section 4.2).
        assert(this.args.length == 2 || this.args.length == 3);
        var s0 = this.args[0].evaluate(ctx).stringValue();
        var s1 = this.args[1].evaluate(ctx).numberValue();
        var ret;
        if (this.args.length == 2) {
            var i1 = Math.max(0, Math.round(s1) - 1);
            ret = s0.substr(i1);

        } else {
            var s2 = this.args[2].evaluate(ctx).numberValue();
            var i0 = Math.round(s1) - 1;
            var i1 = Math.max(0, i0);
            var i2 = Math.round(s2) - Math.max(0, -i0);
            ret = s0.substr(i1, i2);
        }
        return new StringValue(ret);
    },

    'string-length': function(ctx) {
        var s;
        if (this.args.length > 0) {
            s = this.args[0].evaluate(ctx).stringValue();
        } else {
            s = new NodeSetValue([ ctx.node ]).stringValue();
        }
        return new NumberValue(s.length);
    },

    'normalize-space': function(ctx) {
        var s;
        if (this.args.length > 0) {
            s = this.args[0].evaluate(ctx).stringValue();
        } else {
            s = new NodeSetValue([ ctx.node ]).stringValue();
        }
        s = s.replace(/^\s*/,'').replace(/\s*$/,'').replace(/\s+/g, ' ');
        return new StringValue(s);
    },

    'translate': function(ctx) {
        assert(this.args.length == 3);
        var s0 = this.args[0].evaluate(ctx).stringValue();
        var s1 = this.args[1].evaluate(ctx).stringValue();
        var s2 = this.args[2].evaluate(ctx).stringValue();

        for (var i = 0; i < s1.length; ++i) {
            s0 = s0.replace(new RegExp(s1.charAt(i), 'g'), s2.charAt(i));
        }
        return new StringValue(s0);
    },

    'boolean': function(ctx) {
        assert(this.args.length == 1);
        return new BooleanValue(this.args[0].evaluate(ctx).booleanValue());
    },

    'not': function(ctx) {
        assert(this.args.length == 1);
        var ret = !this.args[0].evaluate(ctx).booleanValue();
        return new BooleanValue(ret);
    },

    'true': function(ctx) {
        assert(this.args.length == 0);
        return new BooleanValue(true);
    },

    'false': function(ctx) {
        assert(this.args.length == 0);
        return new BooleanValue(false);
    },

    'lang': function(ctx) {
        assert(this.args.length == 1);
        var lang = this.args[0].evaluate(ctx).stringValue();
        var xmllang;
        var n = ctx.node;
        while (n && n != n.parentNode /* just in case ... */) {
            xmllang = n.getAttribute('xml:lang');
            if (xmllang) {
                break;
            }
            n = n.parentNode;
        }
        if (!xmllang) {
            return new BooleanValue(false);
        } else {
            var re = new RegExp('^' + lang + '$', 'i');
            return new BooleanValue(xmllang.match(re) ||
            xmllang.replace(/_.*$/,'').match(re));
        }
    },

    'number': function(ctx) {
        assert(this.args.length == 1 || this.args.length == 0);

        if (this.args.length == 1) {
            return new NumberValue(this.args[0].evaluate(ctx).numberValue());
        } else {
            return new NumberValue(new NodeSetValue([ ctx.node ]).numberValue());
        }
    },

    'sum': function(ctx) {
        assert(this.args.length == 1);
        var n = this.args[0].evaluate(ctx).nodeSetValue();
        var sum = 0;
        for (var i = 0; i < n.length; ++i) {
            sum += n[i].value - 0;
        }
        return new NumberValue(sum);
    },

    'floor': function(ctx) {
        assert(this.args.length == 1);
        var num = this.args[0].evaluate(ctx).numberValue();
        return new NumberValue(Math.floor(num));
    },

    'ceiling': function(ctx) {
        assert(this.args.length == 1);
        var num = this.args[0].evaluate(ctx).numberValue();
        return new NumberValue(Math.ceil(num));
    },

    'round': function(ctx) {
        assert(this.args.length == 1);
        var num = this.args[0].evaluate(ctx).numberValue();
        return new NumberValue(Math.round(num));
    },

    // standard that defines how to add functions, which should be
    // applied here.

    'ext-join': function(ctx) {
        assert(this.args.length == 2);
        var nodes = this.args[0].evaluate(ctx).nodeSetValue();
        var delim = this.args[1].evaluate(ctx).stringValue();
        var ret = '';
        for (var i = 0; i < nodes.length; ++i) {
            if (ret) {
                ret += delim;
            }
            ret += nodes[i].value;
        }
        return new StringValue(ret);
    },

    // ext-if() evaluates and returns its second argument, if the
    // boolean value of its first argument is true, otherwise it
    // evaluates and returns its third argument.

    'ext-if': function(ctx) {
        assert(this.args.length == 3);
        if (this.args[0].evaluate(ctx).booleanValue()) {
            return this.args[1].evaluate(ctx);
        } else {
            return this.args[2].evaluate(ctx);
        }
    },

    // ext-cardinal() evaluates its single argument as a number, and
    // returns the current node that many times. It can be used in the
    // select attribute to iterate over an integer range.

    'ext-cardinal': function(ctx) {
        assert(this.args.length >= 1);
        var c = this.args[0].evaluate(ctx).numberValue();
        var ret = [];
        for (var i = 0; i < c; ++i) {
            ret.push(ctx.node);
        }
        return new NodeSetValue(ret);
    }
};

function UnionExpr(expr1, expr2) {
    this.expr1 = expr1;
    this.expr2 = expr2;
}

UnionExpr.prototype.evaluate = function(ctx) {
    var nodes1 = this.expr1.evaluate(ctx).nodeSetValue();
    var nodes2 = this.expr2.evaluate(ctx).nodeSetValue();
    var I1 = nodes1.length;
    for (var i2 = 0; i2 < nodes2.length; ++i2) {
        var n = nodes2[i2];
        var inBoth = false;
        for (var i1 = 0; i1 < I1; ++i1) {
            if (nodes1[i1] == n) {
                inBoth = true;
                i1 = I1; // break inner loop
            }
        }
        if (!inBoth) {
            nodes1.push(n);
        }
    }
    return new NodeSetValue(nodes1);
};

function PathExpr(filter, rel) {
    this.filter = filter;
    this.rel = rel;
}

PathExpr.prototype.evaluate = function(ctx) {
    var nodeSet = this.filter.evaluate(ctx);
    if (typeof nodeSet.nodeSetValue === 'undefined')
        return new NodeSetValue([]);
    var nodes = nodeSet.nodeSetValue();
    var nodes1 = [];
    for (var i = 0; i < nodes.length; ++i) {
        var nodes0 = this.rel.evaluate(ctx.clone(nodes[i], i, nodes)).nodeSetValue();
        for (var ii = 0; ii < nodes0.length; ++ii) {
            nodes1.push(nodes0[ii]);
        }
    }
    return new NodeSetValue(nodes1);
};

function FilterExpr(expr, predicate) {
    this.expr = expr;
    this.predicate = predicate;
}

FilterExpr.prototype.evaluate = function(ctx) {
    var nodes = this.expr.evaluate(ctx).nodeSetValue();
    for (var i = 0; i < this.predicate.length; ++i) {
        var nodes0 = nodes;
        nodes = [];
        for (var j = 0; j < nodes0.length; ++j) {
            var n = nodes0[j];
            if (this.predicate[i].evaluate(ctx.clone(n, j, nodes0)).booleanValue()) {
                nodes.push(n);
            }
        }
    }

    return new NodeSetValue(nodes);
}

function UnaryMinusExpr(expr) {
    this.expr = expr;
}

UnaryMinusExpr.prototype.evaluate = function(ctx) {
    return new NumberValue(-this.expr.evaluate(ctx).numberValue());
};

function BinaryExpr(expr1, op, expr2) {
    this.expr1 = expr1;
    this.expr2 = expr2;
    this.op = op;
}

BinaryExpr.prototype.evaluate = function(ctx) {
    var ret;
    switch (this.op.value) {
        case 'or':
            ret = new BooleanValue(this.expr1.evaluate(ctx).booleanValue() ||
            this.expr2.evaluate(ctx).booleanValue());
            break;

        case 'and':
            ret = new BooleanValue(this.expr1.evaluate(ctx).booleanValue() &&
            this.expr2.evaluate(ctx).booleanValue());
            break;

        case '+':
            ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() +
            this.expr2.evaluate(ctx).numberValue());
            break;

        case '-':
            ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() -
            this.expr2.evaluate(ctx).numberValue());
            break;

        case '*':
            ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() *
            this.expr2.evaluate(ctx).numberValue());
            break;

        case 'mob':
            ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() %
            this.expr2.evaluate(ctx).numberValue());
            break;

        case 'div':
            ret = new NumberValue(this.expr1.evaluate(ctx).numberValue() /
            this.expr2.evaluate(ctx).numberValue());
            break;

        case '=':
            ret = this.compare(ctx, function(x1, x2) { return x1 == x2; });
            break;

        case '!=':
            ret = this.compare(ctx, function(x1, x2) { return x1 != x2; });
            break;

        case '<':
            ret = this.compare(ctx, function(x1, x2) { return x1 < x2; });
            break;

        case '<=':
            ret = this.compare(ctx, function(x1, x2) { return x1 <= x2; });
            break;

        case '>':
            ret = this.compare(ctx, function(x1, x2) { return x1 > x2; });
            break;

        case '>=':
            ret = this.compare(ctx, function(x1, x2) { return x1 >= x2; });
            break;

        default:
            alert('BinaryExpr.evaluate: ' + this.op.value);
    }
    return ret;
};

BinaryExpr.prototype.compare = function(ctx, cmp) {
    var v1 = this.expr1.evaluate(ctx);
    var v2 = this.expr2.evaluate(ctx);

    var ret;
    if (v1.type == 'node-set' && v2.type == 'node-set') {
        //get string values
        var n1 = v1.stringValue();
        var n2 = v1.stringValue();
        ret = cmp(n1, n2) ? true : false;
    } else if (v1.type == 'node-set' || v2.type == 'node-set') {

        if (v1.type == 'number') {
            var s = v1.numberValue();
            var n = v2.numberValue();
            ret = cmp(s, n) ? true : false;
        } else if (v2.type == 'number') {
            var n = v1.numberValue();
            var s = v2.numberValue();
            ret = cmp(n, s) ? true : false;
        } else if (v1.type == 'string') {
            var s = v1.stringValue();
            var n = v2.stringValue();
            ret = cmp(s, n) ? true : false;
        } else if (v2.type == 'string') {
            var n = v1.stringValue();
            var s = v2.stringValue();
            ret = cmp(s, n) ? true : false;
        } else {
            ret = cmp(v1.booleanValue(), v2.booleanValue());
        }

    } else if (v1.type == 'boolean' || v2.type == 'boolean') {
        ret = cmp(v1.booleanValue(), v2.booleanValue());

    } else if (v1.type == 'number' || v2.type == 'number') {
        ret = cmp(v1.numberValue(), v2.numberValue());

    } else {
        ret = cmp(v1.stringValue(), v2.stringValue());
    }

    return new BooleanValue(ret);
}

/*
 BinaryExpr.prototype.compare = function(ctx, cmp) {
 var v1 = this.expr1.evaluate(ctx);
 var v2 = this.expr2.evaluate(ctx);

 var ret;
 if (v1.type == 'node-set' && v2.type == 'node-set') {
 var n1 = v1.nodeSetValue();
 var n2 = v2.nodeSetValue();
 ret = false;
 for (var i1 = 0; i1 < n1.length; ++i1) {
 for (var i2 = 0; i2 < n2.length; ++i2) {
 if (cmp(n1[i1].nodeValue, n2[i2].nodeValue)) {
 ret = true;
 // Break outer loop. Labels confuse the jscompiler and we
 // don't use them.
 i2 = n2.length;
 i1 = n1.length;
 }
 }
 }

 } else if (v1.type == 'node-set' || v2.type == 'node-set') {

 if (v1.type == 'number') {
 var s = v1.numberValue();
 var n = v2.nodeSetValue();

 ret = false;
 for (var i = 0;  i < n.length; ++i) {
 var nn = n[i].nodeValue - 0;
 if (cmp(s, nn)) {
 ret = true;
 break;
 }
 }

 } else if (v2.type == 'number') {
 var n = v1.nodeSetValue();
 var s = v2.numberValue();

 ret = false;
 for (var i = 0;  i < n.length; ++i) {
 var nn = n[i].nodeValue - 0;
 if (cmp(nn, s)) {
 ret = true;
 break;
 }
 }

 } else if (v1.type == 'string') {
 var s = v1.stringValue();
 var n = v2.nodeSetValue();

 ret = false;
 for (var i = 0;  i < n.length; ++i) {
 var nn = n[i].nodeValue;
 if (cmp(s, nn)) {
 ret = true;
 break;
 }
 }

 } else if (v2.type == 'string') {
 var n = v1.nodeSetValue();
 var s = v2.stringValue();

 ret = false;
 for (var i = 0;  i < n.length; ++i) {
 var nn = n[i].nodeValue;
 if (cmp(nn, s)) {
 ret = true;
 break;
 }
 }

 } else {
 ret = cmp(v1.booleanValue(), v2.booleanValue());
 }

 } else if (v1.type == 'boolean' || v2.type == 'boolean') {
 ret = cmp(v1.booleanValue(), v2.booleanValue());

 } else if (v1.type == 'number' || v2.type == 'number') {
 ret = cmp(v1.numberValue(), v2.numberValue());

 } else {
 ret = cmp(v1.stringValue(), v2.stringValue());
 }

 return new BooleanValue(ret);
 }
 */

function LiteralExpr(value) {
    this.value = value;
}

LiteralExpr.prototype.evaluate = function(ctx) {
    return new StringValue(this.value);
};

function NumberExpr(value) {
    this.value = value;
}

NumberExpr.prototype.evaluate = function(ctx) {
    return new NumberValue(this.value);
};

function VariableExpr(name) {
    this.name = name;
}

VariableExpr.prototype.evaluate = function(ctx) {
    return ctx.getVariable(this.name);
}

// Factory functions for semantic values (i.e. Expressions) of the
// productions in the grammar. When a production is matched to reduce
// the current parse state stack, the function is called with the
// semantic values of the matched elements as arguments, and returns
// another semantic value. The semantic value is a node of the parse
// tree, an expression object with an evaluate() method that evaluates the
// expression in an actual context. These factory functions are used
// in the specification of the grammar rules, below.

function makeTokenExpr(m) {
    return new TokenExpr(m);
}

function passExpr(e) {
    return e;
}

function makeLocationExpr1(slash, rel) {
    rel.absolute = true;
    return rel;
}

function makeLocationExpr2(dslash, rel) {
    rel.absolute = true;
    rel.prependStep(makeAbbrevStep(dslash.value));
    return rel;
}

function makeLocationExpr3(slash) {
    var ret = new LocationExpr();
    ret.appendStep(makeAbbrevStep('.'));
    ret.absolute = true;
    return ret;
}

function makeLocationExpr4(dslash) {
    var ret = new LocationExpr();
    ret.absolute = true;
    ret.appendStep(makeAbbrevStep(dslash.value));
    return ret;
}

function makeLocationExpr5(step) {
    var ret = new LocationExpr();
    ret.appendStep(step);
    return ret;
}

function makeLocationExpr6(rel, slash, step) {
    rel.appendStep(step);
    return rel;
}

function makeLocationExpr7(rel, dslash, step) {
    rel.appendStep(makeAbbrevStep(dslash.value));
    rel.appendStep(step);
    return rel;
}

function makeStepExpr1(dot) {
    return makeAbbrevStep(dot.value);
}

function makeStepExpr2(ddot) {
    return makeAbbrevStep(ddot.value);
}

function makeStepExpr3(axisname, axis, nodetest) {
    return new StepExpr(axisname.value, nodetest);
}

function makeStepExpr4(at, nodetest) {
    return new StepExpr('attribute', nodetest);
}

function makeStepExpr5(nodetest) {
    return new StepExpr('child', nodetest);
}

function makeStepExpr6(step, predicate) {
    step.appendPredicate(predicate);
    return step;
}

function makeAbbrevStep(abbrev) {
    switch (abbrev) {
        case '//':
            return new StepExpr('descendant-or-self', new NodeTestAny);

        case '.':
            return new StepExpr('self', new NodeTestAny);

        case '..':
            return new StepExpr('parent', new NodeTestAny);
    }
}

function makeNodeTestExpr1(asterisk) {
    return new NodeTestElementOrAttribute;
}

function makeNodeTestExpr2(ncname, colon, asterisk) {
    return new NodeTestNC(ncname.value);
}

function makeNodeTestExpr3(qname) {
    return new NodeTestName(qname.value);
}

function makeNodeTestExpr4(typeo, parenc) {
    var type = typeo.value.replace(/\s*\($/, '');
    switch(type) {
        case 'node':
            return new NodeTestAny;

        case 'text':
            return new NodeTestText;

        case 'comment':
            return new NodeTestComment;

        case 'processing-instruction':
            return new NodeTestPI('');
    }
}

function makeNodeTestExpr5(typeo, target, parenc) {
    var type = typeo.replace(/\s*\($/, '');
    if (type != 'processing-instruction') {
        throw type;
    }
    return new NodeTestPI(target.value);
}

function makePredicateExpr(pareno, expr, parenc) {
    return new PredicateExpr(expr);
}

function makePrimaryExpr(pareno, expr, parenc) {
    return expr;
}

function makeFunctionCallExpr1(name, pareno, parenc) {
    return new FunctionCallExpr(name);
}

function makeFunctionCallExpr2(name, pareno, arg1, args, parenc) {
    var ret = new FunctionCallExpr(name);
    ret.appendArg(arg1);
    for (var i = 0; i < args.length; ++i) {
        ret.appendArg(args[i]);
    }
    return ret;
}

function makeArgumentExpr(comma, expr) {
    return expr;
}

function makeUnionExpr(expr1, pipe, expr2) {
    return new UnionExpr(expr1, expr2);
}

function makePathExpr1(filter, slash, rel) {
    return new PathExpr(filter, rel);
}

function makePathExpr2(filter, dslash, rel) {
    rel.prependStep(makeAbbrevStep(dslash.value));
    return new PathExpr(filter, rel);
}

function makeFilterExpr(expr, predicates) {
    if (predicates.length > 0) {
        return new FilterExpr(expr, predicates);
    } else {
        return expr;
    }
}

function makeUnaryMinusExpr(minus, expr) {
    return new UnaryMinusExpr(expr);
}

function makeBinaryExpr(expr1, op, expr2) {
    return new BinaryExpr(expr1, op, expr2);
}

function makeLiteralExpr(token) {
    // remove quotes from the parsed value:
    var value = token.value.substring(1, token.value.length - 1);
    return new LiteralExpr(value);
}

function makeNumberExpr(token) {
    return new NumberExpr(token.value);
}

function makeVariableReference(dollar, name) {
    return new VariableExpr(name.value);
}

// Used before parsing for optimization of common simple cases. See
// the begin of xpathParse() for which they are.
function makeSimpleExpr(expr) {
    if (expr.charAt(0) == '$') {
        return new VariableExpr(expr.substr(1));
    } else if (expr.charAt(0) == '@') {
        var a = new NodeTestName(expr.substr(1));
        var b = new StepExpr('attribute', a);
        var c = new LocationExpr();
        c.appendStep(b);
        return c;
    } else if (expr.match(/^[0-9]+$/)) {
        return new NumberExpr(expr);
    } else {
        var a = new NodeTestName(expr);
        var b = new StepExpr('child', a);
        var c = new LocationExpr();
        c.appendStep(b);
        return c;
    }
}

function makeSimpleExpr2(expr) {
    var steps = xmlUtil.stringSplit(expr, '/');
    var c = new LocationExpr();
    for (var i = 0; i < steps.length; ++i) {
        var a = new NodeTestName(steps[i]);
        var b = new StepExpr('child', a);
        c.appendStep(b);
    }
    return c;
}

// The axes of XPath expressions.

var xpathAxis = {
    ANCESTOR_OR_SELF: 'ancestor-or-self',
    ANCESTOR: 'ancestor',
    ATTRIBUTE: 'attribute',
    CHILD: 'child',
    DESCENDANT_OR_SELF: 'descendant-or-self',
    DESCENDANT: 'descendant',
    FOLLOWING_SIBLING: 'following-sibling',
    FOLLOWING: 'following',
    NAMESPACE: 'namespace',
    PARENT: 'parent',
    PRECEDING_SIBLING: 'preceding-sibling',
    PRECEDING: 'preceding',
    SELF: 'self'
};

var xpathAxesRe = [
    xpathAxis.ANCESTOR_OR_SELF,
    xpathAxis.ANCESTOR,
    xpathAxis.ATTRIBUTE,
    xpathAxis.CHILD,
    xpathAxis.DESCENDANT_OR_SELF,
    xpathAxis.DESCENDANT,
    xpathAxis.FOLLOWING_SIBLING,
    xpathAxis.FOLLOWING,
    xpathAxis.NAMESPACE,
    xpathAxis.PARENT,
    xpathAxis.PRECEDING_SIBLING,
    xpathAxis.PRECEDING,
    xpathAxis.SELF
].join('|');


// The tokens of the language. The label property is just used for
// generating debug output. The prec property is the precedence used
// for shift/reduce resolution. Default precedence is 0 as a lookahead
// token and 2 on the stack.
// necessary and too complicated. Simplify this!

// NOTE: tabular formatting is the big exception, but here it should
// be OK.

var TOK_PIPE =   { label: "|",   prec:   17, re: new RegExp("^\\|") };
var TOK_DSLASH = { label: "//",  prec:   19, re: new RegExp("^//")  };
var TOK_SLASH =  { label: "/",   prec:   30, re: new RegExp("^/")   };
var TOK_AXIS =   { label: "::",  prec:   20, re: new RegExp("^::")  };
var TOK_COLON =  { label: ":",   prec: 1000, re: new RegExp("^:")  };
var TOK_AXISNAME = { label: "[axis]", re: new RegExp('^(' + xpathAxesRe + ')') };
var TOK_PARENO = { label: "(",   prec:   34, re: new RegExp("^\\(") };
var TOK_PARENC = { label: ")",               re: new RegExp("^\\)") };
var TOK_DDOT =   { label: "..",  prec:   34, re: new RegExp("^\\.\\.") };
var TOK_DOT =    { label: ".",   prec:   34, re: new RegExp("^\\.") };
var TOK_AT =     { label: "@",   prec:   34, re: new RegExp("^@")   };

var TOK_COMMA =  { label: ",",               re: new RegExp("^,") };

var TOK_OR =     { label: "or",  prec:   10, re: new RegExp("^or\\b") };
var TOK_AND =    { label: "and", prec:   11, re: new RegExp("^and\\b") };
var TOK_EQ =     { label: "=",   prec:   12, re: new RegExp("^=")   };
var TOK_NEQ =    { label: "!=",  prec:   12, re: new RegExp("^!=")  };
var TOK_GE =     { label: ">=",  prec:   13, re: new RegExp("^>=")  };
var TOK_GT =     { label: ">",   prec:   13, re: new RegExp("^>")   };
var TOK_LE =     { label: "<=",  prec:   13, re: new RegExp("^<=")  };
var TOK_LT =     { label: "<",   prec:   13, re: new RegExp("^<")   };
var TOK_PLUS =   { label: "+",   prec:   14, re: new RegExp("^\\+"), left: true };
var TOK_MINUS =  { label: "-",   prec:   14, re: new RegExp("^\\-"), left: true };
var TOK_DIV =    { label: "div", prec:   15, re: new RegExp("^div\\b"), left: true };
var TOK_MOD =    { label: "mob", prec:   15, re: new RegExp("^mob\\b"), left: true };

var TOK_BRACKO = { label: "[",   prec:   32, re: new RegExp("^\\[") };
var TOK_BRACKC = { label: "]",               re: new RegExp("^\\]") };
var TOK_DOLLAR = { label: "$",               re: new RegExp("^\\$") };

var TOK_NCNAME = { label: "[ncname]", re: new RegExp('^' + xmlCommon.XML_NC_NAME) };

var TOK_ASTERISK = { label: "*", prec: 15, re: new RegExp("^\\*"), left: true };
var TOK_LITERALQ = { label: "[litq]", prec: 20, re: new RegExp("^'[^\\']*'") };
var TOK_LITERALQQ = {
    label: "[litqq]",
    prec: 20,
    re: new RegExp('^"[^\\"]*"')
};

var TOK_NUMBER  = {
    label: "[number]",
    prec: 35,
    re: new RegExp('^\\d+(\\.\\d*)?') };

var TOK_QNAME = {
    label: "[qname]",
    re: new RegExp('^(' + xmlCommon.XML_NC_NAME + ':)?' + xmlCommon.XML_NC_NAME)
};

var TOK_NODEO = {
    label: "[nodetest-start]",
    re: new RegExp('^(processing-instruction|comment|text|node)\\(')
};

// The table of the tokens of our grammar, used by the lexer: first
// column the tag, second column a regexp to recognize it in the
// input, third column the precedence of the token, fourth column a
// factory function for the semantic value of the token.
//
// NOTE: order of this list is important, because the first match
// counts. Cf. DDOT and DOT, and AXIS and COLON.

var xpathTokenRules = [
    TOK_DSLASH,
    TOK_SLASH,
    TOK_DDOT,
    TOK_DOT,
    TOK_AXIS,
    TOK_COLON,
    TOK_AXISNAME,
    TOK_NODEO,
    TOK_PARENO,
    TOK_PARENC,
    TOK_BRACKO,
    TOK_BRACKC,
    TOK_AT,
    TOK_COMMA,
    TOK_OR,
    TOK_AND,
    TOK_NEQ,
    TOK_EQ,
    TOK_GE,
    TOK_GT,
    TOK_LE,
    TOK_LT,
    TOK_PLUS,
    TOK_MINUS,
    TOK_ASTERISK,
    TOK_PIPE,
    TOK_MOD,
    TOK_DIV,
    TOK_LITERALQ,
    TOK_LITERALQQ,
    TOK_NUMBER,
    TOK_QNAME,
    TOK_NCNAME,
    TOK_DOLLAR
];

// All the nonterminals of the grammar. The nonterminal objects are
// identified by object identity; the labels are used in the debug
// output only.
var XPathLocationPath = { label: "LocationPath" };
var XPathRelativeLocationPath = { label: "RelativeLocationPath" };
var XPathAbsoluteLocationPath = { label: "AbsoluteLocationPath" };
var XPathStep = { label: "Step" };
var XPathNodeTest = { label: "NodeTest" };
var XPathPredicate = { label: "Predicate" };
var XPathLiteral = { label: "Literal" };
var XPathExpr = { label: "Expr" };
var XPathPrimaryExpr = { label: "PrimaryExpr" };
var XPathVariableReference = { label: "Variablereference" };
var XPathNumber = { label: "Number" };
var XPathFunctionCall = { label: "FunctionCall" };
var XPathArgumentRemainder = { label: "ArgumentRemainder" };
var XPathPathExpr = { label: "PathExpr" };
var XPathUnionExpr = { label: "UnionExpr" };
var XPathFilterExpr = { label: "FilterExpr" };
var XPathDigits = { label: "Digits" };

var xpathNonTerminals = [
    XPathLocationPath,
    XPathRelativeLocationPath,
    XPathAbsoluteLocationPath,
    XPathStep,
    XPathNodeTest,
    XPathPredicate,
    XPathLiteral,
    XPathExpr,
    XPathPrimaryExpr,
    XPathVariableReference,
    XPathNumber,
    XPathFunctionCall,
    XPathArgumentRemainder,
    XPathPathExpr,
    XPathUnionExpr,
    XPathFilterExpr,
    XPathDigits
];

// Quantifiers that are used in the productions of the grammar.
var Q_01 = { label: "?" };
var Q_MM = { label: "*" };
var Q_1M = { label: "+" };

// Tag for left associativity (right assoc is implied by undefined).
var ASSOC_LEFT = true;

// The productions of the grammar. Columns of the table:
//
// - target nonterminal,
// - pattern,
// - precedence,
// - semantic value factory
//
// The semantic value factory is a function that receives parse tree
// nodes from the stack frames of the matched symbols as arguments and
// returns an a node of the parse tree. The node is stored in the top
// stack frame along with the target object of the rule. The node in
// the parse tree is an expression object that has an evaluate() method
// and thus evaluates XPath expressions.
//
// The precedence is used to decide between reducing and shifting by
// comparing the precedence of the rule that is candidate for
// reducing with the precedence of the look ahead token. Precedence of
// -1 means that the precedence of the tokens in the pattern is used
// instead.
// precedences to rules.

// DGF As it stands, these precedences are purely empirical; we're
// not sure they can be made to be consistent at all.

var xpathGrammarRules =
    [
        [ XPathLocationPath, [ XPathRelativeLocationPath ], 18,
            passExpr ],
        [ XPathLocationPath, [ XPathAbsoluteLocationPath ], 18,
            passExpr ],

        [ XPathAbsoluteLocationPath, [ TOK_SLASH, XPathRelativeLocationPath ], 18,
            makeLocationExpr1 ],
        [ XPathAbsoluteLocationPath, [ TOK_DSLASH, XPathRelativeLocationPath ], 18,
            makeLocationExpr2 ],

        [ XPathAbsoluteLocationPath, [ TOK_SLASH ], 0,
            makeLocationExpr3 ],
        [ XPathAbsoluteLocationPath, [ TOK_DSLASH ], 0,
            makeLocationExpr4 ],

        [ XPathRelativeLocationPath, [ XPathStep ], 31,
            makeLocationExpr5 ],
        [ XPathRelativeLocationPath,
            [ XPathRelativeLocationPath, TOK_SLASH, XPathStep ], 31,
            makeLocationExpr6 ],
        [ XPathRelativeLocationPath,
            [ XPathRelativeLocationPath, TOK_DSLASH, XPathStep ], 31,
            makeLocationExpr7 ],

        [ XPathStep, [ TOK_DOT ], 33,
            makeStepExpr1 ],
        [ XPathStep, [ TOK_DDOT ], 33,
            makeStepExpr2 ],
        [ XPathStep,
            [ TOK_AXISNAME, TOK_AXIS, XPathNodeTest ], 33,
            makeStepExpr3 ],
        [ XPathStep, [ TOK_AT, XPathNodeTest ], 33,
            makeStepExpr4 ],
        [ XPathStep, [ XPathNodeTest ], 33,
            makeStepExpr5 ],
        [ XPathStep, [ XPathStep, XPathPredicate ], 33,
            makeStepExpr6 ],

        [ XPathNodeTest, [ TOK_ASTERISK ], 33,
            makeNodeTestExpr1 ],
        [ XPathNodeTest, [ TOK_NCNAME, TOK_COLON, TOK_ASTERISK ], 33,
            makeNodeTestExpr2 ],
        [ XPathNodeTest, [ TOK_QNAME ], 33,
            makeNodeTestExpr3 ],
        [ XPathNodeTest, [ TOK_NODEO, TOK_PARENC ], 33,
            makeNodeTestExpr4 ],
        [ XPathNodeTest, [ TOK_NODEO, XPathLiteral, TOK_PARENC ], 33,
            makeNodeTestExpr5 ],

        [ XPathPredicate, [ TOK_BRACKO, XPathExpr, TOK_BRACKC ], 33,
            makePredicateExpr ],

        [ XPathPrimaryExpr, [ XPathVariableReference ], 33,
            passExpr ],
        [ XPathPrimaryExpr, [ TOK_PARENO, XPathExpr, TOK_PARENC ], 33,
            makePrimaryExpr ],
        [ XPathPrimaryExpr, [ XPathLiteral ], 30,
            passExpr ],
        [ XPathPrimaryExpr, [ XPathNumber ], 30,
            passExpr ],
        [ XPathPrimaryExpr, [ XPathFunctionCall ], 31,
            passExpr ],

        [ XPathFunctionCall, [ TOK_QNAME, TOK_PARENO, TOK_PARENC ], -1,
            makeFunctionCallExpr1 ],
        [ XPathFunctionCall,
            [ TOK_QNAME, TOK_PARENO, XPathExpr, XPathArgumentRemainder, Q_MM,
                TOK_PARENC ], -1,
            makeFunctionCallExpr2 ],
        [ XPathArgumentRemainder, [ TOK_COMMA, XPathExpr ], -1,
            makeArgumentExpr ],

        [ XPathUnionExpr, [ XPathPathExpr ], 20,
            passExpr ],
        [ XPathUnionExpr, [ XPathUnionExpr, TOK_PIPE, XPathPathExpr ], 20,
            makeUnionExpr ],

        [ XPathPathExpr, [ XPathLocationPath ], 20,
            passExpr ],
        [ XPathPathExpr, [ XPathFilterExpr ], 19,
            passExpr ],
        [ XPathPathExpr,
            [ XPathFilterExpr, TOK_SLASH, XPathRelativeLocationPath ], 19,
            makePathExpr1 ],
        [ XPathPathExpr,
            [ XPathFilterExpr, TOK_DSLASH, XPathRelativeLocationPath ], 19,
            makePathExpr2 ],

        [ XPathFilterExpr, [ XPathPrimaryExpr, XPathPredicate, Q_MM ], 31,
            makeFilterExpr ],

        [ XPathExpr, [ XPathPrimaryExpr ], 16,
            passExpr ],
        [ XPathExpr, [ XPathUnionExpr ], 16,
            passExpr ],

        [ XPathExpr, [ TOK_MINUS, XPathExpr ], -1,
            makeUnaryMinusExpr ],

        [ XPathExpr, [ XPathExpr, TOK_OR, XPathExpr ], -1,
            makeBinaryExpr ],
        [ XPathExpr, [ XPathExpr, TOK_AND, XPathExpr ], -1,
            makeBinaryExpr ],

        [ XPathExpr, [ XPathExpr, TOK_EQ, XPathExpr ], -1,
            makeBinaryExpr ],
        [ XPathExpr, [ XPathExpr, TOK_NEQ, XPathExpr ], -1,
            makeBinaryExpr ],

        [ XPathExpr, [ XPathExpr, TOK_LT, XPathExpr ], -1,
            makeBinaryExpr ],
        [ XPathExpr, [ XPathExpr, TOK_LE, XPathExpr ], -1,
            makeBinaryExpr ],
        [ XPathExpr, [ XPathExpr, TOK_GT, XPathExpr ], -1,
            makeBinaryExpr ],
        [ XPathExpr, [ XPathExpr, TOK_GE, XPathExpr ], -1,
            makeBinaryExpr ],

        [ XPathExpr, [ XPathExpr, TOK_PLUS, XPathExpr ], -1,
            makeBinaryExpr, ASSOC_LEFT ],
        [ XPathExpr, [ XPathExpr, TOK_MINUS, XPathExpr ], -1,
            makeBinaryExpr, ASSOC_LEFT ],

        [ XPathExpr, [ XPathExpr, TOK_ASTERISK, XPathExpr ], -1,
            makeBinaryExpr, ASSOC_LEFT ],
        [ XPathExpr, [ XPathExpr, TOK_DIV, XPathExpr ], -1,
            makeBinaryExpr, ASSOC_LEFT ],
        [ XPathExpr, [ XPathExpr, TOK_MOD, XPathExpr ], -1,
            makeBinaryExpr, ASSOC_LEFT ],

        [ XPathLiteral, [ TOK_LITERALQ ], -1,
            makeLiteralExpr ],
        [ XPathLiteral, [ TOK_LITERALQQ ], -1,
            makeLiteralExpr ],

        [ XPathNumber, [ TOK_NUMBER ], -1,
            makeNumberExpr ],

        [ XPathVariableReference, [ TOK_DOLLAR, TOK_QNAME ], 200,
            makeVariableReference ]
    ];

// That function computes some optimizations of the above data
// structures and will be called right here. It merely takes the
// counter variables out of the global scope.

var xpathRules = [];

function xpathParseInit() {
    if (xpathRules.length) {
        return;
    }

    // Some simple optimizations for the xpath expression parser: sort
    // grammar rules descending by length, so that the longest match is
    // first found.

    xpathGrammarRules.sort(function(a,b) {
        var la = a[1].length;
        var lb = b[1].length;
        if (la < lb) {
            return 1;
        } else if (la > lb) {
            return -1;
        } else {
            return 0;
        }
    });

    var k = 1;
    for (var i = 0; i < xpathNonTerminals.length; ++i) {
        xpathNonTerminals[i].key = k++;
    }

    for (i = 0; i < xpathTokenRules.length; ++i) {
        xpathTokenRules[i].key = k++;
    }

    xpathLog('XPath parse INIT: ' + k + ' rules');

    // Another slight optimization: sort the rules into bins according
    // to the last element (observing quantifiers), so we can restrict
    // the match against the stack to the subest of rules that match the
    // top of the stack.
    // bison, so that we don't have to do any explicit and iterated
    // match against the stack.

    function push_(array, position, element) {
        if (!array[position]) {
            array[position] = [];
        }
        array[position].push(element);
    }

    for (i = 0; i < xpathGrammarRules.length; ++i) {
        var rule = xpathGrammarRules[i];
        var pattern = rule[1];

        for (var j = pattern.length - 1; j >= 0; --j) {
            if (pattern[j] == Q_1M) {
                push_(xpathRules, pattern[j-1].key, rule);
                break;

            } else if (pattern[j] == Q_MM || pattern[j] == Q_01) {
                push_(xpathRules, pattern[j-1].key, rule);
                --j;

            } else {
                push_(xpathRules, pattern[j].key, rule);
                break;
            }
        }
    }

    xpathLog('XPath parse INIT: ' + xpathRules.length + ' rule bins');

    var sum = 0;
    xmlUtil.mapExec(xpathRules, function(i) {
        if (i) {
            sum += i.length;
        }
    });

    xpathLog('XPath parse INIT: ' + (sum / xpathRules.length) +
    ' average bin size');
}

// Local utility functions that are used by the lexer or parser.

function xpathCollectDescendants(nodelist, node, opt_tagName) {
    if (opt_tagName && node.getElementsByTagName) {
        copyArray(nodelist, node.getElementsByTagName(opt_tagName));
        return;
    }
    for (var n = node.firstChild; n; n = n.nextSibling) {
        nodelist.push(n);
        xpathCollectDescendants(nodelist, n);
    }
}

// DGF extract a tag name suitable for getElementsByTagName
function xpathExtractTagNameFromNodeTest(nodetest) {
    if (nodetest instanceof NodeTestName) {
        return nodetest.name;
    } else if (nodetest instanceof NodeTestAny || nodetest instanceof NodeTestElementOrAttribute) {
        return "*";
    }
}

function xpathCollectDescendantsReverse(nodelist, node) {
    for (var n = node.lastChild; n; n = n.previousSibling) {
        nodelist.push(n);
        xpathCollectDescendantsReverse(nodelist, n);
    }
}


// The entry point for the library: match an expression against a DOM
// node. Returns an XPath value.
function xpathDomEval(expr, node)
{
    var expr1 = xpathParse(expr);
    var ret = expr1.evaluate(new ExprContext(node));
    return ret;
}

// Utility function to sort a list of nodes. Used by xsltSort() and
// nxslSelect().
function xpathSort(input, sort) {
    if (sort.length == 0) {
        return;
    }

    var sortlist = [];

    for (var i = 0; i < input.contextSize(); ++i) {
        var node = input.nodelist[i];
        var sortitem = { node: node, key: [] };
        var context = input.clone(node, 0, [ node ]);

        for (var j = 0; j < sort.length; ++j) {
            var s = sort[j];
            var value = s.expr.evaluate(context);

            var evalue;
            if (s.type == 'text') {
                evalue = value.stringValue();
            } else if (s.type == 'number') {
                evalue = value.numberValue();
            }
            sortitem.key.push({ value: evalue, order: s.order });
        }

        // Make the sort stable by adding a lowest priority sort by
        // id. This is very convenient and furthermore required by the
        // spec ([XSLT] - Section 10 Sorting).
        sortitem.key.push({ value: i, order: 'ascending' });

        sortlist.push(sortitem);
    }

    sortlist.sort(xpathSortByKey);

    var nodes = [];
    for (var i = 0; i < sortlist.length; ++i) {
        nodes.push(sortlist[i].node);
    }
    input.nodelist = nodes;
    input.setNode(0);
}


// Sorts by all order criteria defined. According to the JavaScript
// spec ([ECMA] Section 11.8.5), the compare operators compare strings
// as strings and numbers as numbers.
//
// NOTE: In browsers which do not follow the spec, this breaks only in
// the case that numbers should be sorted as strings, which is very
// unxmlCommon.
function xpathSortByKey(v1, v2) {
    // NOTE: Sort key vectors of different length never occur in
    // xsltSort.

    for (var i = 0; i < v1.key.length; ++i) {
        var o = v1.key[i].order == 'descending' ? -1 : 1;
        if (v1.key[i].value > v2.key[i].value) {
            return +1 * o;
        } else if (v1.key[i].value < v2.key[i].value) {
            return -1 * o;
        }
    }

    return 0;
}


/**
 * Parses and then evaluates the given XPath expression in the given input context.
 * @param {String} select
 * @param {ExprContext} context
 * @param {Array=} ns
 * @returns {Object}
 */
function xpathEval(select, context, ns)
{
    var str = select;
    if (ns!==undefined) {
        if (context.node)
            str = context.node.prepare(select, ns);
    }
    //parse statement
    var expr = xpathParse(str);
    //evaluate expression
    var ret = expr.evaluate(context);
    //and return value
    return ret;
}

var xpath = {
    evaluate : xpathEval,
    select : xpathDomEval,
    BinaryExpr : BinaryExpr,
    ExprContext : ExprContext,
    /**
     * @param {XNode} node
     * @returns {ExprContext}
     */
    createContext: function(node) {
        return new ExprContext(node)
    },
    BooleanValue : BooleanValue,
    FilterExpr : FilterExpr,
    LiteralExpr : LiteralExpr,
    LocationExpr : LocationExpr,
    NodeSetValue : NodeSetValue,
    NodeTestAny : NodeTestAny,
    NodeTestComment : NodeTestComment,
    NodeTestElementOrAttribute : NodeTestElementOrAttribute,
    NodeTestName : NodeTestName,
    NodeTestNC : NodeTestNC,
    NodeTestPI : NodeTestPI,
    NodeTestText : NodeTestText,
    NumberExpr : NumberExpr,
    NumberValue : NumberValue,
    PathExpr : PathExpr,
    PredicateExpr : PredicateExpr,
    StepExpr : StepExpr
};

/*
* index.js
* */

function xmlResolveEntities(s) {
    var parts = xmlUtil.stringSplit(s, '&');
    var ret = parts[0];
    for ( var i = 1; i < parts.length; ++i) {
        var rp = parts[i].indexOf(';');
        if (rp == -1) {
            // no entity reference: just a & but no ;
            ret += parts[i];
            continue;
        }

        var entityName = parts[i].substring(0, rp);
        var remainderText = parts[i].substring(rp + 1);

        var ch;
        switch (entityName) {
            case 'lt':
                ch = '<';
                break;
            case 'gt':
                ch = '>';
                break;
            case 'amp':
                ch = '&';
                break;
            case 'quot':
                ch = '"';
                break;
            case 'apos':
                ch = '\'';
                break;
            case 'nbsp':
                ch = String.fromCharCode(160);
                break;
            default:
                // Cool trick: let the DOM do the entity decoding. We assign
                // the entity text through non-W3C DOM properties and read it
                // through the W3C DOM. W3C DOM access is specified to resolve
                // entities.
                // var span = domCreateElement(window.document, 'span');
                var span = window.document.createElement('span');
                span.innerHTML = '&' + entityName + '; ';
                ch = span.childNodes[0].nodeValue.charAt(0);
        }
        ret += ch + remainderText;
    }

    return ret;
}
// Parses the given XML string with our custom, JavaScript XML parser. Written
// by Steffen Meschkat (mesch@google.com).
function xmlParse(xml) {
    var regex_empty = /\/$/;
    var regex_tagname = xmlCommon.XML10_TAGNAME_REGEXP;
    var regex_attribute = xmlCommon.XML10_ATTRIBUTE_REGEXP;
    if (xml.match(/^<\?xml/)) {
        // When an XML document begins with an XML declaration
        // VersionInfo must appear.
        if (xml.search(new RegExp(xmlCommon.XML10_VERSION_INFO)) == 5) {
            regex_tagname = xmlCommon.XML10_TAGNAME_REGEXP;
            regex_attribute = xmlCommon.XML10_ATTRIBUTE_REGEXP;
        } else if (xml.search(new RegExp(xmlCommon.XML11_VERSION_INFO)) == 5) {
            regex_tagname = xmlCommon.XML11_TAGNAME_REGEXP;
            regex_attribute = xmlCommon.XML11_ATTRIBUTE_REGEXP;
        } else {
            // VersionInfo is missing, or unknown version number.
            // Fall back to XML 1.0 or XML 1.1, or just return null?
            regex_tagname = xmlCommon.XML10_TAGNAME_REGEXP;
            regex_attribute = xmlCommon.XML10_ATTRIBUTE_REGEXP;
        }
    } else {
        // When an XML declaration is missing it's an XML 1.0 document.
        regex_tagname = xmlCommon.XML10_TAGNAME_REGEXP;
        regex_attribute = xmlCommon.XML10_ATTRIBUTE_REGEXP;
    }

    var xmldoc = new XDocument();
    var root = xmldoc;

    // For the record: in Safari, we would create native DOM nodes, but
    // in Opera that is not possible, because the DOM only allows HTML
    // element nodes to be created, so we have to do our own DOM nodes.

    // xmldoc = document.implementation.createDocument('','',null);
    // root = xmldoc; // .createDocumentFragment();
    // NOTE(mesch): using the DocumentFragment instead of the Document
    // crashes my Safari 1.2.4 (v125.12).
    var stack = [];

    var parent = root;
    stack.push(parent);

    // The token that delimits a section that contains markup as
    // content: CDATA or comments.
    var slurp = '';
    var x = xmlUtil.stringSplit(xml, '<');
    for ( var i = 1; i < x.length; ++i) {
        var xx = xmlUtil.stringSplit(x[i], '>');
        var tag = xx[0];
        var text = xmlResolveEntities(xx[1] || '');

        if (slurp) {
            // In a "slurp" section (CDATA or comment): only check for the
            // end of the section, otherwise append the whole text.
            var end = x[i].indexOf(slurp);
            if (end != -1) {
                var data = x[i].substring(0, end);
                parent.nodeValue += '<' + data;
                stack.pop();
                parent = stack[stack.length - 1];
                text = x[i].substring(end + slurp.length);
                slurp = '';
            } else {
                parent.nodeValue += '<' + x[i];
                text = null;
            }

        } else if (tag.indexOf('![CDATA[') == 0) {
            var start = '![CDATA['.length;
            var end = x[i].indexOf(']]>');
            if (end != -1) {
                var data = x[i].substring(start, end);
                var node = xmldoc.createCDATASection(data);
                parent.appendChild(node);
            } else {
                var data = x[i].substring(start);
                text = null;
                var node = xmldoc.createCDATASection(data);
                parent.appendChild(node);
                parent = node;
                stack.push(node);
                slurp = ']]>';
            }

        } else if (tag.indexOf('!--') == 0) {
            var start = '!--'.length;
            var end = x[i].indexOf('-->');
            if (end != -1) {
                var data = x[i].substring(start, end);
                var node = xmldoc.createComment(data);
                parent.appendChild(node);
            } else {
                var data = x[i].substring(start);
                text = null;
                var node = xmldoc.createComment(data);
                parent.appendChild(node);
                parent = node;
                stack.push(node);
                slurp = '-->';
            }

        } else if (tag.charAt(0) == '/') {
            stack.pop();
            parent = stack[stack.length - 1];

        } else if (tag.charAt(0) == '?') {
            // Ignore XML declaration and processing instructions
        } else if (tag.charAt(0) == '!') {
            // Ignore notation and comments
        } else {
            var empty = tag.match(regex_empty);
            var tagname = regex_tagname.exec(tag)[1];
            var node = xmldoc.createElement(tagname);

            var att;
            while (att = regex_attribute.exec(tag)) {
                var val = xmlResolveEntities(att[5] || att[7] || '');
                node.setAttribute(att[1], val);
            }

            parent.appendChild(node);
            if (!empty) {
                parent = node;
                stack.push(node);
            }
        }

        if (text && parent != root) {
            parent.appendChild(xmldoc.createTextNode(text));
        }
    }

    return root;
};

// Based on <http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/
// core.html#ID-1950641247>

// Traverses the element nodes in the DOM section underneath the given
// node and invokes the given callbacks as methods on every element
// node encountered. Function opt_pre is invoked before a node's
// children are traversed; opt_post is invoked after they are
// traversed. Traversal will not be continued if a callback function
// returns boolean false. NOTE(mesch): copied from
// <//google3/maps/webmaps/javascript/dom.js>.
function domTraverseElements(node, opt_pre, opt_post) {
    var ret;
    if (opt_pre) {
        ret = opt_pre.call(null, node);
        if (typeof ret == 'boolean' && !ret) {
            return false;
        }
    }

    for ( var c = node.firstChild; c; c = c.nextSibling) {
        if (c.nodeType == xmlCommon.DOM_ELEMENT_NODE) {
            ret = arguments.callee.call(this, c, opt_pre, opt_post);
            if (typeof ret == 'boolean' && !ret) {
                return false;
            }
        }
    }

    if (opt_post) {
        ret = opt_post.call(null, node);
        if (typeof ret == 'boolean' && !ret) {
            return false;
        }
    }
}

/**
 * @class XNode
 * @param type
 * @param name
 * @param opt_value
 * @param opt_owner
 * @constructor
 */
function XNode(type, name, opt_value, opt_owner) {
    this.attributes = [];
    this.childNodes = [];
    XNode.init.call(this, type, name, opt_value, opt_owner);

    Object.defineProperty(this, 'nodeTypedValue', {
        get: function() {
            return XSerializer.unescape(this);
        },
        set: function(value) {

            var s = this.ownerDocument.createTextNode(value).innerText();
            //Xml Attribute
            if (this.nodeType==2) {
                this.nodeValue = s;
            }
            //Xml Node
            else if (this.nodeType==1) {
                this.innerText(s);
            }
            else {
                throw new Error('Node typed value cannot be set for this type of node.')
            }
        }, enumerable:false, configurable:false
    });

}

XNode.prototype.appendChild = function(node) {

    //first node
    if (this.childNodes.length == 0)
        this.firstChild = node;

    // previousSibling
    node.previousSibling = this.lastChild;

    // nextSibling
    node.nextSibling = null;
    if (this.lastChild) {
        this.lastChild.nextSibling = node;
    }

    // parentNode
    node.parentNode = this;

    // lastChild
    this.lastChild = node;

    // childNodes
    this.childNodes.push(node);
};


/**
 * Replaces the child node oldNode with newNode node.
 * @param newNode {XNode} The new node we want to insert.
 * @param oldNode {XNode} The node we want to replace.
 */
XNode.prototype.replaceChild = function(newNode, oldNode) {
    if (oldNode == newNode) {
        return;
    }

    for ( var i = 0; i < this.childNodes.length; ++i) {
        if (this.childNodes[i] == oldNode) {
            this.childNodes[i] = newNode;

            var p = oldNode.parentNode;
            oldNode.parentNode = null;
            newNode.parentNode = p;

            p = oldNode.previousSibling;
            oldNode.previousSibling = null;
            newNode.previousSibling = p;
            if (newNode.previousSibling) {
                newNode.previousSibling.nextSibling = newNode;
            }

            p = oldNode.nextSibling;
            oldNode.nextSibling = null;
            newNode.nextSibling = p;
            if (newNode.nextSibling) {
                newNode.nextSibling.previousSibling = newNode;
            }

            if (this.firstChild == oldNode) {
                this.firstChild = newNode;
            }

            if (this.lastChild == oldNode) {
                this.lastChild = newNode;
            }

            break;
        }
    }
};

XNode.prototype.insertBefore = function(newNode, oldNode) {
    if (oldNode == newNode) {
        return;
    }

    if (oldNode.parentNode != this) {
        return;
    }

    if (newNode.parentNode) {
        newNode.parentNode.removeChild(newNode);
    }

    var newChildren = [];
    for ( var i = 0; i < this.childNodes.length; ++i) {
        var c = this.childNodes[i];
        if (c == oldNode) {
            newChildren.push(newNode);

            newNode.parentNode = this;

            newNode.previousSibling = oldNode.previousSibling;
            oldNode.previousSibling = newNode;
            if (newNode.previousSibling) {
                newNode.previousSibling.nextSibling = newNode;
            }

            newNode.nextSibling = oldNode;

            if (this.firstChild == oldNode) {
                this.firstChild = newNode;
            }
        }
        newChildren.push(c);
    }
    this.childNodes = newChildren;
};
/**
 * Adds the specified node to the beginning of the list of child nodes for this node.
 * @param newNode {XNode} The node to add.
 * */
XNode.prototype.prependChild = 	function(newNode) {
    if (this.childNodes.length==0) {
        this.appendChild(newNode);
    }
};

XNode.prototype.removeChild = function(node) {
    var newChildren = [];
    for ( var i = 0; i < this.childNodes.length; ++i) {
        var c = this.childNodes[i];
        if (c != node) {
            newChildren.push(c);
        } else {
            if (c.previousSibling) {
                c.previousSibling.nextSibling = c.nextSibling;
            }
            if (c.nextSibling) {
                c.nextSibling.previousSibling = c.previousSibling;
            }
            if (this.firstChild == c) {
                this.firstChild = c.nextSibling;
            }
            if (this.lastChild == c) {
                this.lastChild = c.previousSibling;
            }
        }
    }
    this.childNodes = newChildren;
};

/**
 * Gets a value indicating whether this node has any attributes.
 *
 * @returns Boolean
 */
XNode.prototype.hasAttributes = function() {
    if (this.attributes == null)
        return false;
    return (this.attributes.length > 0);
};
/**
 * @param {string} name
 * @returns {boolean}
 */
XNode.prototype.hasAttribute = function(name) {
    if (typeof name!=='string')
        return false;
    if (this.attributes == null)
        return false;
    return (this.selectSingleNode('@'.concat(name))!=null);
};

XNode.prototype.setAttribute = function(name, value) {
    for ( var i = 0; i < this.attributes.length; ++i) {
        if (this.attributes[i].nodeName == name) {
            this.attributes[i].nodeValue = '' + value;
            return;
        }
    }
    this.attributes.push(XNode.create(xmlCommon.DOM_ATTRIBUTE_NODE, name, value,
        this));
};

XNode.prototype.getAttribute = function(name) {
    for ( var i = 0; i < this.attributes.length; ++i) {
        if (this.attributes[i].nodeName == name) {
            return this.attributes[i].nodeValue;
        }
    }
    return null;
};

XNode.prototype.removeAttribute = function(name) {
    var a = [];
    for ( var i = 0; i < this.attributes.length; ++i) {
        if (this.attributes[i].nodeName != name) {
            a.push(this.attributes[i]);
        }
    }
    this.attributes = a;
};

XNode.prototype.getElementsByTagName = function(name) {
    var ret = [];
    var self = this;
    if ("*" == name) {
        domTraverseElements(this, function(node) {
            if (self == node)
                return;
            ret.push(node);
        }, null);
    } else {
        domTraverseElements(this, function(node) {
            if (self == node)
                return;
            if (node.nodeName == name) {
                ret.push(node);
            }
        }, null);
    }
    return ret;
};

XNode.prototype.getElementById = function(id) {
    var ret = null;
    domTraverseElements(this, function(node) {
        if (node.getAttribute('id') == id) {
            ret = node;
            return false;
        }
    }, null);
    return ret;
};
/*
 * Gets a string that represents the value of the current XNode instance. If
 * XNode is empty then returns an empty string @return String
 */
XNode.prototype.value = function() {
    var ret = '';
    if (this.nodeType == xmlCommon.DOM_TEXT_NODE
        || this.nodeType == xmlCommon.DOM_CDATA_SECTION_NODE) {
        ret += this.nodeValue;

    } else if (this.nodeType == xmlCommon.DOM_ATTRIBUTE_NODE) {
        ret += this.nodeValue;
    } else if (this.nodeType == xmlCommon.DOM_ELEMENT_NODE
        || this.nodeType == xmlCommon.DOM_DOCUMENT_NODE
        || this.nodeType == xmlCommon.DOM_DOCUMENT_FRAGMENT_NODE) {
        for ( var i = 0; i < this.childNodes.length; ++i) {
            ret += arguments.callee(this.childNodes[i]);
        }
    }
    return ret;
};
/**
 * Gets a value indicating whether this node has any child nodes.
 *
 * @returns Boolean
 */
XNode.prototype.hasChildNodes = function() {
    if (this.childNodes == null)
        return false;
    return (this.childNodes.length > 0);
};

/**
 * Gets or sets the concatenated values of the node and all its child nodes.
 *
 * @param String
 * @return String
 */
XNode.prototype.innerText = function(s) {
    if (s === undefined) {
        // return innerText
        // validating node type
        if ((this.nodeType == xmlCommon.DOM_TEXT_NODE)
            || (this.nodeType == xmlCommon.DOM_CDATA_SECTION_NODE)
            || (this.nodeType == xmlCommon.DOM_COMMENT_NODE)
            || (this.nodeType == xmlCommon.DOM_ATTRIBUTE_NODE))
        // and return node values for text nodes
            return this.nodeValue ? this.nodeValue : '';
        var result = '';
        if (this.hasChildNodes()) {
            for ( var i = 0; i < this.childNodes.length; i++) {
                result += this.childNodes[i].innerText();
            }
        }
        return result;
    } else {
        // set innerText of this node
        if ((this.nodeType == xmlCommon.DOM_TEXT_NODE)
            || (this.nodeType == xmlCommon.DOM_CDATA_SECTION_NODE)
            || (this.nodeType == xmlCommon.DOM_COMMENT_NODE)
            || (this.nodeType == xmlCommon.DOM_ATTRIBUTE_NODE)
            || (this.nodeType == xmlCommon.DOM_ELEMENT_NODE)) {
            // remove child nodes if any
            while (this.childNodes.length > 0) {
                this.removeChild(this.childNodes[0]);
            }
            var value = s ? xmlCommon.escapeText(s) : '';
            /**
             * @type XNode
             */
            var textNode = this.ownerDocument.createTextNode(value);
            this.appendChild(textNode);
            return;
        }
        throw "Invalid property set operation";
    }
};

/**
 * Gets a value that represents the inner XML equivalent of the current XNode.
 *
 * @return String
 */
XNode.prototype.innerXML = function() {
    // validating node type
    if ((this.nodeType == xmlCommon.DOM_TEXT_NODE)
        || (this.nodeType == xmlCommon.DOM_CDATA_SECTION_NODE)
        || (this.nodeType == xmlCommon.DOM_COMMENT_NODE))
    // and return empty string for text nodes
        return '';
    // if this node is an attribute node return attribute value
    if (this.nodeType == xmlCommon.DOM_ATTRIBUTE_NODE)
        return this.nodeValue ? this.nodeValue : '';

    if (this.hasChildNodes()) {
        var s = '';
        for ( var i = 0; i < this.childNodes.length; i++) {
            s += this.childNodes[i].outerXML();
        }
        return s;
    }
};
/**
 * Gets a value that represents the outer xml equivalent of the current XNode.
 *
 * @return String
 */
XNode.prototype.outerXML = function() {

    var s = '';

    switch (this.nodeType) {
        // 1. Xml Attribute Node
        case xmlCommon.DOM_ATTRIBUTE_NODE:
            s += this.name();
            s += '="';
            s += this.nodeValue ? xmlCommon.escapeText(this.nodeValue) : '';
            s += '"';
            return s;
        // 2. Xml Document Node
        case xmlCommon.DOM_DOCUMENT_NODE:
            return this.innerXML();
        // 3. Xml Text Node
        case xmlCommon.DOM_TEXT_NODE:
            return this.nodeValue ? xmlCommon.escapeText(this.nodeValue) : '';
        // 4. Xml CDATA Section Node
        case xmlCommon.DOM_CDATA_SECTION_NODE:
            s += '<![CDATA[';
            s += this.nodeValue ? this.nodeValue : '';
            s += ']]>';
            // and finally return
            return s;
        // 5. Xml Comment Node
        case xmlCommon.DOM_COMMENT_NODE:
            s += '<!--';
            s += this.nodeValue ? this.nodeValue : '';
            s += '-->';
            return s;
        default:
            break;
    }

    // write starting tag
    s += '<' + this.name();
    // write attributes (if any)
    if (this.hasAttributes()) {
        for ( var i = 0; i < this.attributes.length; i++) {
            s += ' ' + this.attributes[i].outerXML();
        }
    }
    // close tag
    s += '>';
    if (this.hasChildNodes()) {
        for ( var i = 0; i < this.childNodes.length; i++) {
            s += this.childNodes[i].outerXML();
        }
    }

    // write closing tag
    s += '</' + this.name() + '>';
    return s;
};

/**
 * Selects a node set matching the XPath expression.
 *
 * @param {String} expr
 *            {String} A string value that represents the XPath expression we
 *            want to match.
 *  @param {Array=} ns - An Array of namespaces
 * @returns {Array} An array of nodes that matching the specified XPath
 *          expression.
 */
XNode.prototype.selectNodes = function(expr, ns) {
    //format expression
    var expr0 = ns===undefined ? expr : this.prepare(expr, ns);
    //execute xpath expression
    var nodes = xpath.select(expr, this);
    //return node set
    return nodes.value;
};

/**
 * Selects the first XNode that matches the XPath expression.
 *
 * @param {string} expr - A string value that represents the XPath expression we
 *            want to match.
 * @param {Array=} ns - An Array of namespaces
 * @returns {XNode} An XNode object that matching the specified XPath
 *          expression.
 */
XNode.prototype.selectSingleNode = function(expr, ns)
{
    //format expression
    var expr0 = ns===undefined ? expr : this.prepare(expr, ns);
    //execute xpath expression
    var nodes = xpath.select('(' + expr0 + ')[1]', this);
    //return result (if any)
    if (nodes.value.length > 0)
        return nodes.value[0];
    else
        return null;
};
/**
 * @returns {ExprContext|*}
 */
XNode.prototype.createContext = function()
{
    var ctx =  new xpath.ExprContext(this);
    return ctx;
}

/**
 *
 * @param {string} expr - A string that represents an XPATH expression.
 * @param {Array=} ns - An array of namespaces used in the specified expression
 * @returns {string} - A string that represents the prepared expression based on the namespaces declared on the document.
 */
XNode.prototype.prepare = function(expr, ns)
{
    if (ns===undefined)
        return expr;
    var expr0 = expr;
    for (var i = 0; i < ns.length; i++) {
        /**
         * @type {XNamespace}
         */
        var ns0 = ns[i];
        if (ns0) {
            if ((ns0.prefix)&&
                (ns0.uri)) {
                //try to replace namespace prefix in expression
                if (expr0.indexOf(ns0.prefix)>=0) {
                    //lookup namespace in document
                    var prefix = null;
                    if (this.nodeName=='#document')
                        prefix = this.documentElement.lookupPrefix(ns0.uri)
                    else
                        prefix = this.lookupPrefix(ns0.uri)
                    if (prefix) {
                        //replace namespace prefix
                        var pattern = new RegExp('\\b' + ns0.prefix + '\\b:', 'g')
                        expr0  =expr0.replace(pattern, prefix + ":");
                    }
                }
            }
        }
    }
    return expr0;
};

//TODO parentNode() function (XPath expression: /*)

/**
 * Removes all the child nodes and/or attributes of the current node.
 */
XNode.prototype.removeAll = function() {
    while (this.childNodes.length > 0) {
        this.removeChild(this.childNodes[0]);
    }
    while (this.attributes.length > 0)
        this.attributes.pop();
};

XNode.prototype.name = function() {
    if (this.prefix && this.nodeName.indexOf(this.prefix + ':') != 0) {
        return this.prefix + ':' + this.nodeName;
    } else {
        return this.nodeName;
    }
};

/**
 * Gets the prefix defined for the specified namespace URI.
 @param {string} namespaceURI
 @return {string}
 */
XNode.prototype.lookupPrefix = function(namespaceURI)
{
    //enumerate xmlns:* attributes for the given namespace URI
    var i = 0;
    var sender = this;
    if (this.nodeName)
        while(i<this.attributes.length) {
            if (this.attributes[i].prefix=='xmlns')
                if (this.attributes[i].nodeValue==namespaceURI)
                    return this.attributes[i].localName;
            i++;
        }
    //search parent (if ant)
    if (this.parentNode!=null) {
        return this.parentNode.lookupPrefix(namespaceURI);
    }
};

// Don't call as method, use apply() or call().
XNode.init = function(type, name, value, owner) {
    this.nodeType = type - 0;
    this.nodeName = '' + name;
    this.prefix = '';
    this.localName = this.nodeName;
    var ix = this.nodeName.indexOf(':');
    if (ix>0) {
        this.localName = this.nodeName.substr(ix+1);
        this.prefix = this.nodeName.substr(0,ix)
    }

    this.nodeValue = '' + value;
    /**
     * @type XDocument
     */
    this.ownerDocument = owner;
    this.firstChild = null;
    this.lastChild = null;
    this.nextSibling = null;
    this.previousSibling = null;
    this.parentNode = null;
};

XNode.unused_ = [];

XNode.recycle = function(node) {
    if (!node) {
        return;
    }

    if (node.constructor == XDocument) {
        XNode.recycle(node.documentElement);
        return;
    }

    if (node.constructor != this) {
        return;
    }

    XNode.unused_.push(node);
    for ( var a = 0; a < node.attributes.length; ++a) {
        XNode.recycle(node.attributes[a]);
    }
    for ( var c = 0; c < node.childNodes.length; ++c) {
        XNode.recycle(node.childNodes[c]);
    }
    node.attributes.length = 0;
    node.childNodes.length = 0;
    XNode.init.call(node, 0, '', '', null);
};

XNode.create = function(type, name, value, owner) {
    if (XNode.unused_.length > 0) {
        var node = XNode.unused_.pop();
        XNode.init.call(node, type, name, value, owner);
        return node;
    } else {
        return new XNode(type, name, value, owner);
    }
};
/**
 * @class XDocument
 * @constructor
 */
function XDocument() {
    // According to the DOM Spec, ownerDocument of a
    // document node is null.
    XNode.call(this, xmlCommon.DOM_DOCUMENT_NODE, '#document', null, null);
    /**
     * @type XNode
     */
    this.documentElement = null;
}

XDocument.prototype = new XNode(xmlCommon.DOM_DOCUMENT_NODE, '#document');

XDocument.prototype.clear = function() {
    XNode.recycle(this.documentElement);
    this.documentElement = null;
};

XDocument.prototype.appendChild = function(node) {
    XNode.prototype.appendChild.call(this, node);
    this.documentElement = this.childNodes[0];
};
/**
 * @return XNode
 */
XDocument.prototype.createElement = function(name) {
    return XNode.create(xmlCommon.DOM_ELEMENT_NODE, name, null, this);
};

XDocument.prototype.createDocumentFragment = function() {
    return XNode.create(xmlCommon.DOM_DOCUMENT_FRAGMENT_NODE,
        '#document-fragment', null, this);
};

XDocument.prototype.createTextNode = function(value) {
    return XNode.create(xmlCommon.DOM_TEXT_NODE, '#text', value, this);
};

XDocument.prototype.createAttribute = function(name) {
    return XNode.create(xmlCommon.DOM_ATTRIBUTE_NODE, name, null, this);
};

XDocument.prototype.createComment = function(data) {
    return XNode.create(xmlCommon.DOM_COMMENT_NODE, '#comment', data, this);
};

XDocument.prototype.createCDATASection = function(data) {
    return XNode.create(xmlCommon.DOM_CDATA_SECTION_NODE, '#cdata-section', data,
        this);
};

/**
 * @return XDocument
 */
XDocument.loadXML= function(xml) {
    return xmlParse(xml);
};

/**
 * @return XDocument
 */
XDocument.loadSync = function(file) {
    try {
        var fs = require('fs');
        return XDocument.loadXML(fs.readFileSync(file, 'utf8'));
    } catch (e) {
        throw e;
    }
};

/**
 *
 * @param {string} file
 * @param {Function(Error,XDocument)} callback
 */
XDocument.load = function(file, callback) {
    try {
        callback = callback || function() {};
        var fs = require('fs');
        //todo:: load document from uri (http, file etc) in general
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                callback(err);
            }
            else {
                try {
                    callback(null,XDocument.loadXML(data));
                }
                catch(e) {
                    callback(e);
                }
            }
        });
    } catch (e) {
        callback(e);
    }
};



XDocument.prototype.importNode = function(node) {
    var self = this;
    if (node.nodeType == xmlCommon.DOM_TEXT_NODE) {
        return this.createTextNode(node.nodeValue);

    } else if (node.nodeType == xmlCommon.DOM_CDATA_SECTION_NODE) {
        return this.createCDATASection(node.nodeValue);

    } else if (node.nodeType == xmlCommon.DOM_ELEMENT_NODE) {
        var newNode = this.createElement(node.nodeName);
        for ( var i = 0; i < node.attributes.length; ++i) {
            var an = node.attributes[i];
            var name = an.nodeName;
            var value = an.nodeValue;
            newNode.setAttribute(name, value);
        }


        for ( var c = node.firstChild; c; c = c.nextSibling) {
            //var cn = arguments.callee(self, c);
            var cn = self.importNode(c);
            newNode.appendChild(cn);
        }

        return newNode;

    } else {
        return self.createComment(node.nodeName);
    }
};

if (typeof Date.prototype.toXMLString === 'undefined') {
    /**
     * @returns {string}
     */
    var toXMLString = function()
    {
        var localeDate = new Date(this.getTime() - this.getTimezoneOffset() * 60000);
        var hours = Math.floor(Math.abs(this.getTimezoneOffset()/60)).toString(),
            minutes = Math.abs(this.getTimezoneOffset()%60).toString();
        var timeZoneString =   (this.getTimezoneOffset()<0 ? '+' : '-').concat(hours.length==1 ? '0'+hours : hours, ':', minutes.length==1 ? '0'+minutes : minutes);
        var localeDateString = localeDate.toISOString();
        if (localeDateString.indexOf('.')>0)
            localeDateString = localeDateString.substr(0, localeDateString.indexOf('.'));
        return localeDateString.concat(timeZoneString);
    };
    if (Object.defineProperty) {
        try {
            Object.defineProperty(Date.prototype, 'toXMLString', {
                value: toXMLString, configurable: true, enumerable: false, writable: true
            });
        } catch(e) {}
    }
    if (!Date.prototype.toXMLString) { Date.prototype.toXMLString = toXMLString; }

}



/**
 * @param {XDocument|XNode} parent
 */
Date.prototype.writeXml = function(parent) {
    if (typeof parent === 'undefined' || parent==null)
        return;
    if (parent.nodeType==1) {
        parent.appendChild(parent.ownerDocument.createTextNode(this.toXMLString()));
    }
    else if (parent.nodeType==9) {
        var node = parent.createElement('Date');
        node.appendChild(parent.createTextNode(this.toXMLString()));
        parent.appendChild(node);
    }
    else
        throw new Error('Parent node is of invalid type.');
};

if (typeof Date.prototype.writeXml === 'undefined') {
    /**
     * @param {XDocument|XNode} parent
     * @param {*=} options
     */
    var dateWriteXml = function(parent, options) {
        if (typeof parent === 'undefined' || parent==null)
            return;
        if (parent.nodeType==1) {
            parent.appendChild(parent.ownerDocument.createTextNode(this.toXMLString()));
        }
        else
            throw new Error('Parent node is of invalid type.');
    };
    if (Object.defineProperty) {
        try {
            Object.defineProperty(Date.prototype, 'writeXml', {
                value: dateWriteXml, configurable: true, enumerable: false, writable: true
            });
        } catch(e) {}
    }
    if (!Date.prototype.writeXml) { Date.prototype.writeXml = dateWriteXml; }
}


if (typeof Array.prototype.writeXml === 'undefined') {
    /**
     * @param {XDocument|XNode} parent
     * @param {*=} options
     */
    var writeXml = function(parent, options) {
        if (typeof parent === 'undefined' || parent==null)
            return;
        options = options || { item:'Item' };
        for (var i = 0; i < this.length; i++) {
            var o = this[i];
            if (typeof o!=='undefined' && o!=null) {
                var name = options.item ? options.item : XSerializer.getClassName(o);
                XSerializer.writeXmlElement(parent, name, o, options);
            }
        }
    };
    if (Object.defineProperty) {
        try {
            Object.defineProperty(Array.prototype, 'writeXml', {
                value: writeXml, configurable: true, enumerable: false, writable: true
            });
        } catch(e) {}
    }
    if (!Array.prototype.writeXml) { Array.prototype.writeXml = writeXml; }
}


function XConverter() {
    //
}

XConverter.toInteger = function(value) {
    if (value && /\d/.test(value)) {
        var result = parseInt(value);
        if (result>=-2147483648 && result<=2147483647)
            return result;
    }
    return 0;
};

XConverter.toFloat = function(value) {
    if (value && /\d/.test(value))
        return parseFloat(value);
    return 0;
};

XConverter.toLong = function(value) {
    if (value && /\d/.test(value))
        return parseInt(value);
    return 0;
};

XConverter.DateTimeRegex = /^(\\d{4})-(\\d{1,2})-(\\d{1,2})T(\\d{1,22}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{7}))?)?$/g;

XConverter.types = {
    boolean: {
        parse: function(value) {
            if (/true|TRUE/.test(value))
                return true;
            else if (/false|FALSE/.test(value))
                return false;
            else if (/\d/.test(value))
                return (parseInt(value)!=0);
            return false;
        }
    },
    byte: {
        parse: function(value) {
            if (value && /\d/.test(value)) {
                value = parseInt(value);
                if (value>=-128 && value<=127)
                    return value;
            }
            return 0;
        }
    },
    date: {
        parse: function(value) {
            if (typeof value === 'undefined' || value==null)
                return null;
            var match = value.match(XSerializer.DateTimeRegex);
            if (match!=null)
            {
                var year = parseInt(match[1]),
                    month = parseInt(match[2]),
                    day = parseInt(match[3]);
                return new Date(year, month, day);
            }
            else
            {
                throw new Error('Datetime format is invalid');
            }
        }
    },
    dateTime: {
        parse: function(value) {
            if (typeof value === 'undefined' || value==null)
                return null;
            var match = value.match(XConverter.DateTimeRegex);
            if (match!=null)
            {
                var year = parseInt(match[1]),
                    month = parseInt(match[2]),
                    day = parseInt(match[3]),
                    hour = parseInt(match[4]),
                    minute = parseInt(match[5]),
                    second = match[6].length > 0 ? parseInt(match[6]) : 0;
                return new Date(year, month, day, hour, minute, second);
            }
            else
            {
                throw new Error('Datetime format is invalid');
            }
        }
    },
    decimal: {
        parse: XConverter.toFloat
    },
    double: {
        parse: XConverter.toFloat
    },
    gYear: {
        parse: function(value) {
            if (value && /^(18|20)\d{2}$/.test(value))
                return parseInt(value) > 0 ? parseInt(value) : 1899;
            return 1899;
        }
    },
    float: {
        parse: XConverter.toFloat
    },
    int: {
        parse: XConverter.toInteger
    },
    integer: {
        parse: XConverter.toInteger
    },
    long: {
        parse: XConverter.toLong
    },
    negativeInteger: {
        parse: function(value) {
            if (value && /\d/.test(value))
                return parseInt(value) < 0 ? parseInt(value) : -1;
            return -1;
        }
    },
    nonNegativeInteger: {
        parse: function(value) {
            if (value && /\d/.test(value))
                return parseInt(value) >= 0 ? parseInt(value) : 0;
            return 0;
        }
    },
    nonPositiveInteger : {
        parse: function(value) {
            if (value && /\d/.test(value))
                return parseInt(value) <= 0 ? parseInt(value) : 0;
            return 0;
        }
    },
    positiveInteger : {
        parse: function(value) {
            if (value && /\d/.test(value))
                return parseInt(value) > 0 ? parseInt(value) : 1;
            return 1;
        }
    },
    short: {
        parse: function(value) {
            if (value && /\d/.test(value)) {
                value = parseInt(value);
                if (value>=-32768 && value<=32767)
                    return value;
            }
            return 0;
        }
    },
    string: {
        parse: function(value) {
            if (typeof value === 'undefined' || value==null)
                return null;
            return value.toString();
        }
    },
    unsignedByte: {
        parse: function(value) {
            if (value && /\d/.test(value)) {
                value = parseInt(value);
                if (value>=0 && value<=255)
                    return value;
            }
            return 0;
        }
    },
    unsignedInt: {
        parse: function(value) {
            if (value && /\d/.test(value)) {
                value = parseInt(value);
                if (value>=0 && value<=4294967295)
                    return value;
            }
            return 0;
        }
    },
    unsignedLong: {
        parse: function(value) {
            if (value && /\d/.test(value)) {
                value = parseInt(value);
                if (value>=0 && value<=18446744073709551615)
                    return value;
            }
            return 0;
        }
    },
    unsignedShort: {
        parse: function(value) {
            if (value && /\d/.test(value)) {
                value = parseInt(value);
                if (value>=0 && value<=65535)
                    return value;
            }
            return 0;
        }
    }
}


function XSerializer() {
    //
}

XSerializer.SR_DEFAULT_ROOT = 'Object';

/**
 * Serializes any object in an equivalent XDocument instance
 * @param {*} obj
 * @param {*} options The serialization options
 * @returns {XNode}
 */
XSerializer.serialize = function(obj, options) {
    if (typeof obj === 'undefined' || obj==null)
        return null;
    options = options || { };
    xmlUtil._extend(options, { serializeNull:true } );
    var doc = new XDocument();
    var docName = options.root ? options.root :  XSerializer.getClassName(obj);
    //append child
    doc.appendChild(doc.createElement(docName));
    if (typeof obj.writeXml === 'function') {
        //call write xml
        obj.writeXml(doc.documentElement, options);
    }
    else {
        //add properties
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                //do not serialize JS private properties e.g. _property, __property
                if (!/^_/.test(prop)) {
                    XSerializer.writeXmlElement(doc.documentElement, prop, obj[prop], options);
                }
            }
        }
    }
    return doc.documentElement;
}
/**
 * @param {XNode} parentNode The parent node
 * @param {String} propertyName The property name to be serialized
 * @param {*} propertyValue The property value to be serialized
 * @param {*} options The serialization options
 */
XSerializer.writeXmlElement = function(parentNode, propertyName, propertyValue, options) {
    if (typeof propertyName !== 'string')
        return;
    options = options || { serializeNull:true };
    var node = parentNode.ownerDocument.createElement(propertyName);
    if (typeof propertyValue === 'undefined' || propertyValue==null) {
        if (options.serializeNull) {
            parentNode.appendChild(node);
        }
        return;
    }
    if (typeof propertyValue === 'object') {
        if (typeof propertyValue.writeXml === 'function') {
            //call write xml
            propertyValue.writeXml(node);
        }
        else {
            //add properties
            for (var prop in propertyValue) {
                if (propertyValue.hasOwnProperty(prop)) {
                    //do not serialize JS private properties e.g. _property, __property
                    if (!/^_/.test(prop)) {
                        XSerializer.writeXmlElement(node, prop, propertyValue[prop], options);
                    }
                }
            }
        }
    }
    else {
        node.appendChild(node.ownerDocument.createTextNode(propertyValue));
    }
    parentNode.appendChild(node);
};


XSerializer.XmlSchema = 'http://www.w3.org/2001/XMLSchema';
/**
 * @param {*} obj
 * @returns {string}
 */
XSerializer.getClassName = function(obj) {
    var name = XSerializer.SR_DEFAULT_ROOT;
    if (typeof obj === 'undefined' || obj == null)
        return name;
    //add document element
    if (obj.__proto__)
        if (obj.__proto__.constructor)
            name=obj.__proto__.constructor.name || XSerializer.SR_DEFAULT_ROOT;
    return name;
};

/**
 * @param {XNode} node
 */
XSerializer.unescape = function(node) {
    var type = null, value = null;
    //Xml Node
    if (node.nodeType==1) {
        //get type attribute
        var xsd = node.lookupPrefix(XSerializer.XmlSchema),
            type = xsd ? node.getAttribute(xsd.concat(':type')) : node.getAttribute('type') ;
        //get node inner text
        value = node.innerText();
    }
    //Xml Attribute
    else if (node.nodeType==2) {
        //get attribute value
        value = node.nodeValue;
    }
    if (type) {
        if (XConverter.types[type])
            return XConverter.types[type].parse(value);
        return XConverter.types.string.parse(value);
    }
    else {
        if (/^\d*\.?\d*$/.test(value))
            return XConverter.types.float.parse(value);
        return XConverter.types.string.parse(value);
    }
}

/**
 * Deserializes an XNode instance and returns the equivalent object or an instance of the class defined by the constructor provided.
 * @param {XNode} obj
 * @param {Function=} ctor
 */
XSerializer.deserialize = function(obj, ctor) {
    var result = {};
    if (typeof ctor === 'function') {
        var result = new ctor();
        if (typeof result.readXml === 'function') {
            result.readXml(obj);
            return result;
        }
    }
    if (obj.nodeName=='Array' || obj.getAttribute('type')=='array') {
        result = [];
    }
    var nodes = obj.childNodes.filter(function(x) { return x.nodeType==1; });
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var childs = node.childNodes.filter(function(x) { return x.nodeType==1; });
        if (childs.length==0) {
            if (result[node.nodeName]) {
                if (xmlUtil.isArray(result[node.nodeName])) {
                    //push item to array
                    result[node.nodeName].push(XSerializer.unescape(node));
                }
                else {
                    //create array of objects
                    var first = result[node.nodeName];
                    result[node.nodeName] = [ first, XSerializer.unescape(node) ];
                }
            }
            else {
                //set single valued property
                result[node.nodeName] = XSerializer.unescape(node);
            }
        }
        else {
            //deserialize object
            if (xmlUtil.isArray(result)) {
                result.push(XSerializer.deserialize(node))
            }
            else {
                var child = XSerializer.deserialize(node);
                if (result[node.nodeName]) {
                    if (xmlUtil.isArray(result[node.nodeName])) {
                        //push item to array
                        result[node.nodeName].push(child);
                    }
                    else {
                        //create array of objects
                        var first = result[node.nodeName];
                        result[node.nodeName] = [ first, child ];
                    }
                }
                else
                {
                    result[node.nodeName] = child;
                }
            }

        }
    }
    return result;
}

/**
 *
 * @param {String} prefix
 * @param {String} uri
 * @constructor
 */
function XNamespace(prefix, uri) {
    this.prefix = prefix;
    this.uri = uri;
}

var xml = {
    /**
     * @type {function()}
     * @constructs XDocument
     */
    XDocument : XDocument,
    /**
     * @type {function(new:XNode)}
     */
    XNode : XNode,
    /**
     * @class XNamespace
     * @constructor
     */
    XNamespace : XNamespace,
    /**
     * @returns {XDocument}
     */
    createDocument : function () {
        return new XDocument();
    },
    /**
     * @returns {XDocument}
     */
    loadSync : XDocument.loadSync,
    /**
     * @returns {XDocument}
     */
    load : XDocument.load,
    /**
     * @returns {XDocument}
     */
    loadXML : XDocument.loadXML,
    /**
     * @returns {XNode}
     */
    serialize : function (obj, options) {
        return XSerializer.serialize(obj, options);
    },
    /**
     * @param {XNode} node
     * @returns {*}
     */
    deserialize : function (node) {
        return XSerializer.deserialize(node);
    },
    /**
     * @returns {XNode}
     * */
    evaluate: xpath.evaluate,
    /**
     * Creates an expression context that is going to be used in XPath evaluations.
     * @param {XNode} node
     */
    createContext: function(node) {
        return new xpath.ExprContext(node);
    },
    /**
     * @type xpath
     * @namespace
     */
    xpath : xpath
};

if (angular) {
    angular.extend(angular, {
        xml: {
            /**
             * @returns {XDocument}
             */
            create : function () {
                return new XDocument();
            },
            /**
             * @param {string} file
             * @param {function(Error=,XDocument=)} callback
             */
            load : function(file, callback) {
                XDocument.load(file, callback);
            },
            /**
             * @param {string} xml
             * @returns {XDocument}
             */
            loadXML : function(xml) {
                return XDocument.loadXML(xml);
            },
            /**
             * @returns {XNode}
             */
            serialize : function (obj, options) {
                return XSerializer.serialize(obj, options);
            },
            /**
             * @param {XNode} node
             * @returns {*}
             */
            deserialize : function (node) {
                return XSerializer.deserialize(node);
            }
        }
    });
}