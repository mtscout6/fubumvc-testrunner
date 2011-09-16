/*
* ----------------------------- JSTORAGE -------------------------------------
* Simple local storage wrapper to save data on the browser side, supporting
* all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
*
* Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
* Project homepage: www.jstorage.info
*
* Licensed under MIT-style license:
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/*
    Modified by Bob Pace, bob.pace@gmail.com
    Removed userdata as default storage for IE and replaced with Flash
*/

/**
* $.jStorage
* 
* USAGE:
*
* Methods:
*
* -set(key, value)
* $.jStorage.set(key, value) -> saves a value
*
* -get(key[, default])
* value = $.jStorage.get(key [, default]) ->
*    retrieves value if key exists, or default if it doesn't
*
* -deleteKey(key)
* $.jStorage.deleteKey(key) -> removes a key from the storage
*
* -flush()
* $.jStorage.flush() -> clears the cache
* 
* <value> can be any JSON-able value, including objects and arrays.
*
**/

define(['./iejson', './underscore'], function (json, _) {
    var exports = {},

    /* Actual browser storage (localStorage or globalStorage['domain']) */
        _storage_service = {},

    /* function to encode objects to JSON strings */
        json_encode = json.stringify,

    /* function to decode objects from JSON strings */
        json_decode = json.parse;

    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
    * Initialization function. Detects if the browser supports DOM Storage
    * @returns undefined
    */
    function _init() {
        /* Check if browser supports localStorage */
        if ("localStorage" in window) {
            try {
                if (window.localStorage) {
                    _storage_service = window.localStorage;
                }
            } catch (E3) { /* Firefox fails when touching localStorage and cookies are disabled */ }
        }
        /* Check if browser supports globalStorage */
        else if ("globalStorage" in window) {
            try {
                if (window.globalStorage) {
                    _storage_service = window.globalStorage[window.location.hostname];
                }
            } catch (E4) { /* Firefox fails when touching localStorage and cookies are disabled */ }
        }
    }

    /**
    * Function checks if a key is set and is string or numberic
    */
    function _checkKey(key) {
        if (!key || (typeof key !== "string" && typeof key !== "number")) {
            throw new TypeError('Key name must be string or numeric');
        }
        return true;
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////
    exports.version = "0.1.5.0";
    /**
    * Sets a key's value.
    * 
    * @param {String} key - Key to set. If this value is not set or not
    *              a string an exception is raised.
    * @param value - Value to set. This can be any value that is JSON
    *              compatible (Numbers, Strings, Objects etc.).
    * @returns the used value
    */
    exports.set = function (key, value) {
        _checkKey(key);
        _storage_service[key] = json_encode(value);
        return value;
    };
    /**
    * Looks up a key in cache
    * 
    * @param {String} key - Key to look up.
    * @param {mixed} def - Default value to return, if key didn't exist.
    * @returns the key value, default value or <null>
    */
    exports.get = function (key, def) {
        _checkKey(key);
        if (key in _storage_service) {
            return json_decode(_storage_service[key]);
        }
        return typeof def === 'undefined' ? null : def;
    };

    /**
    * Deletes a key from cache.
    * 
    * @param {String} key - Key to delete.
    * @returns true if key existed or false if it didn't
    */
    exports.deleteKey = function (key) {
        _checkKey(key);
        if (key in _storage_service) {
            delete _storage_service[key];
            return true;
        }
        return false;
    };

    /**
    * Deletes everything in cache.
    * 
    * @returns true
    */
    exports.flush = function () {
        try {
            _storage_service.clear();
        } catch (E8) { }
        return true;
    };

    _init();
    return exports;
});
