define( function (require) {

    /** Config */
    var config = require("app/config");

    return function (sandbox) {
        return {
            init: function () {
                this.render();
            },
            render: function () {
            },
            destroy: function () { }
        };
    };
});