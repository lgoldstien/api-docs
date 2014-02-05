define(function (require) {

    var symposia        = require('symposia');
    var config          = require('app/config');

    require('app/routes/home');

    if (config.debug) {
        symposia.bus.addWireTap(function (d, e) {
            console.log('Message sent on channel "'+ e.channel +'" with topic "'+ e.topic +'" at '+ e.timeStamp);
            console.log(d);
        });
    }

    $(document).ready(function () {
        var sandbox         = symposia.sandbox.create();
    });

    symposia.router.parse(document.location.pathname);

});
