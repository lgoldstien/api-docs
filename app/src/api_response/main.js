define( function (require) {

    /** Config */
    var config = require("app/config");

    /** Templates */
    var __submitRequest  = require("text!./template/submit_request.template.html"),
        __requestLoading = require("text!./template/loading_request.template.html"),
        __requestFailed  = require("text!./template/failed_request.template.html");

    return function (sandbox) {
        return {
            init: function () {
                this.$el = sandbox.getElement();

                sandbox.subscribe({
                    topic: config.events.API_REQUEST_RUN,
                    callback: this.runRequest.bind(this)
                });

                this.render();
            },
            render: function () {
                this.$el.html(__submitRequest);
            },
            runRequest: function (request) {
                var _this = this,
                    url_params;
                this.$el.html(__requestLoading);

                console.log(request);

                // if (
                //     !request.method ||
                //     !request.api ||
                //     !request.url
                // ) {
                //     this.$el.html(_.template(__requestFailed, { message: "Some of the request details are not defined."}));
                //     return;
                // }

                if (request.params.length > 0) {
                    url_params = "?" + request.params;
                }

                $.ajax({
                    url: request.site + request.url + request.url_prefix + url_params,
                    method: request.method,
                    error: function (ev, status) {
                        _this.$el.html(_.template(__requestFailed, { message: ev.status}));
                    },
                    success: function () {

                    }
                });
            },
            destroy: function () { }
        };
    };
});