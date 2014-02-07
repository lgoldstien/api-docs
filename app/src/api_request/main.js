define( function (require) {

    /** Config */
    var config          = require("app/config");

    /** Templates */
    var __selectRequest = require("text!./template/select_request.template.html"),
        __requestForm   = require("text!./template/request_form.template.html");

    return function (sandbox) {
        var api,
            api_slug,
            api_url,
            api_method,
            request;

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

                /** If there is no request then load the select request template */
                if (!request) {
                    this.$el.html(__selectRequest);
                    return;
                }

                var methods = new Backbone.Collection(api.api_map);

                /** Get the request format from the API map */
                request = _.extend(request, {
                    sites: api.available_urls,
                    description: api.description,
                    method_map: methods.findWhere({ url: api_url }).get('methods')[api_method]
                });

                console.log(request);
                this.$el.html(_.template(__requestForm, { request: request }));

                this.$el.find("#submitRequest").click(this.submitRequest.bind(this));

            },
            loadRequest: function (req) {
                api_slug = req.slug;
                api_url = req.url;
                api_method = req.method;
                api = config.api[api_slug];
                request = req;

                /** Render the API request form */
                this.render(request);
            },
            submitRequest: function (ev) {
                var requestParams = "",
                    requestJSON = {};

                /** Prevent submission of the form */
                ev.preventDefault();

                /** Get the URL parameters into a serilized string */
                requestParams = this.$el.find("#requestForm .request_param").serialize();

                /** Get the json object populated */
                this.$el.find("#requestForm .request_json").each(function(){
                    
                });

                _.extend(request, {
                    params: requestParams,
                    json: requestJSON,
                    site: $("select[name='site']").val()
                })

                sandbox.publish({
                    topic: config.events.API_REQUEST_RUN,
                    data: request
                });
            },
            destroy: function () { }
        };
    };
});