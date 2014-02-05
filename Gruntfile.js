module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            app: [
                'app/**/**/*.js',
                'app/**/*.js'
            ]
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {
                src: '<%= meta.app %>'
            }
        },
        less: {
            production: {
                options: {
                    compress: true
                },
                files: {
                    'style/api.css': 'style/api.less'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: ".",
                    name: 'app/main',
                    mainConfigFile: 'require.conf.js',
                    stubModules: ['text', 'json'],
                    insertRequire: ['app/main']
                }
            }
        }
    });


    grunt.registerTask('default',['jshint','build:vendor','build:app','build:css']);
    grunt.registerTask('build:vendor',['concat:vendor','uglify:vendor']);
    grunt.registerTask('build:app',['requirejs','uglify:app']);
    grunt.registerTask('build:css',['less']);

};
