define( function (require) {

    /** Config */
    var config = require("app/config");

    /** Templates */
    var __apiList = require("text!./template/api_list.template.html");

    return function (sandbox) {
        return {
            init: function () {
                this.$el = sandbox.getElement();
                this.render();
            },
            render: function () {
                this.$el.html(_.template(__apiList, { apis: config.api }));
                this.$el.find(".methodLink").click(function() {
                    sandbox.publish({
                        topic: config.events.API_REQUEST_LOAD,
                        data: {
                            url: $(this).data('url'),
                            method: $(this).data('method'),
                            api: $(this).data('api'),
                            version: $(this).data('version'),
                            url_prefix: $(this).data('url-prefix')
                        }
                    });
                });
                this.$el.find('.tooltipped').tooltip();
            },

            destroy: function () { }
        };
    };
});