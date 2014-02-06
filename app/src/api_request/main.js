define( function (require) {

    /** Config */
    var config          = require("app/config");

    /** Templates */
    var __selectRequest = require("text!./template/select_request.template.html"),
        __requestForm   = require("text!./template/request_form.template.html");

    return function (sandbox) {
        var apiMap,
            apiInfo;

        return {
            init: function () {
                this.$el = sandbox.getElement();
                sandbox.subscribe({
                    topic: config.events.API_REQUEST_LOAD,
                    callback: this.loadRequest.bind(this)
                });
                this.render();
            },
            render: function (request) {
                var requestFormat;

                /** If there is a request then load it */
                if (request) {
                    /** Get the request format from the API map */
                    requestFormat = config.api[request.api].api_map;

                    this.$el.html(_.template(__requestForm, { request: request }));

                    this.$el.find("#submitRequest").click(this.submitRequest.bind(this));

                    return;
                }

                this.$el.html(__selectRequest);

                
            },
            loadRequest: function (request) {
                apiMap  = new Backbone.Collection(config.api[request.api].api_map);
                apiInfo = apiMap.findWhere({ url: request.url });

                /** Extend the request with the API method map */
                request = _.extend(request, {
                    method_map: apiMap.findWhere({ url: request.url }).get('methods')[request.method]
                });

                /** Render the API request form */
                this.render(request);
            },
            submitRequest: function (ev) {
                var requestParams,
                    requestJSON;

                /** Prevent submission of the form */
                ev.preventDefault();

                /** Get the URL parameters into a serilized string */
                requestParams = this.$el.find("#requestForm .request_param").serialize();

                /** Get the json object populated */
                // requestJSON
                this.$el.find("#requestForm .request_json").each(function(){
                    console.log(arguments);
                });

                sandbox.publish({
                    topic: config.events.API_REQUEST_RUN,
                    data: {
                        api: apiInfo,
                        params: requestParams,
                        json: {}
                    }
                });
            },
            destroy: function () { }
        };
    };
});