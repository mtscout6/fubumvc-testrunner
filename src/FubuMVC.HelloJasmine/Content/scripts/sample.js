define(['lib/jstorage'], function (storage) {
    var exports = {
        name: "Hello, World!"
    };

    exports.persist = function () {
        storage.set("sample", this);
    };

    return exports;
});
