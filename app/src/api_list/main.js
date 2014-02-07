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
                            url: $(this).data('api_url'),
                            method: $(this).data('api_method'),
                            slug: $(this).data('api_slug')
                        }
                    });
                });

                this.$el.find('.tooltipped').tooltip();
            },

            destroy: function () { }
        };
    };
});