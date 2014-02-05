define( function (require) {

    /** Config */
    var config = require("app/config");

    /** Templates */
    var __navMenu = require('text!./template/menu.template.html');

    return function (sandbox) {
        return {
            init: function () {
                this.$el = sandbox.getElement();
                this.render();
            },
            render: function () {
                this.$el.html(_.template(__navMenu, { apis: config.api, viewing: "" }));
            },
            destroy: function () { }
        };
    };
});