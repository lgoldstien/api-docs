require.config({
    basePath: '.',
    packages: [
        'app/src/navigation',
        'app/src/api_list',
        'app/src/api_request',
        'app/src/api_response'
    ],
    shim: {
        'app/main'          : ['underscore', 'bootstrap'],
        'bootstrap'         : ['jquery']
    },
    paths: {
        text                : '/vendor/requirejs-plugins/lib/text',
        json                : '/vendor/requirejs-plugins/src/json',
        symposia            : '/vendor/symposia/dist/symposia',
        underscore          : '/vendor/lodash/dist/lodash.min',
        jquery              : '/vendor/jquery/jquery',
        alertify            : '/vendor/alertify/alertify.min',
        bootstrap           : '/vendor/bootstrap/dist/js/bootstrap'
    }
});

require(['app/main']);
