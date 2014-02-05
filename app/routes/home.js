define(function (require) {

    var Navigation      = require('app/src/navigation'),
        symposia        = require('symposia'),

        config          = require('app/config');

    var sandbox = symposia.sandbox.create();

    symposia.router.addRoute(config.routes.home, function () {
        symposia.modules.create({
            'navigation': {
                creator: Navigation
            }
        }).startAll();
    });
});
