define( function (require) {

    /** Config */
    var config = require("app/config");

    /** Templates */
    var __submitRequest = require("text!./template/submit_request.template.html");

    return function (sandbox) {
        return {
            init: function () {
                this.$el = sandbox.getElement();
                this.render();
            },
            render: function () {
                this.$el.html(__submitRequest);
            },
            destroy: function () { }
        };
    };
});