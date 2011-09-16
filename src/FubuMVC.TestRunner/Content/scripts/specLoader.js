define(['lib/underscore'], function (_) {
    var exports = {},
        registry = {},
        jasmineEnv = jasmine.getEnv(),
        trivialReporter = new jasmine.TrivialReporter();

    jasmineEnv.updateInterval = 1000;
    jasmineEnv.addReporter(trivialReporter);

    jasmineEnv.specFilter = function (spec) {
        return trivialReporter.specFilter(spec);
    };

    exports.register = function (name) {
        registry[name] = false;
    };

    exports.completed = function (name) {
        var allComplete;

        registry[name] = true;

        allComplete = _.all(registry, function (value) {
            return value;
        });

        if (allComplete) {
            jasmineEnv.execute();
        }
    };

    return exports;
});
