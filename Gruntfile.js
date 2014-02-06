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
        }
    });


    grunt.registerTask('default',['jshint','build:css']);
    grunt.registerTask('build:css',['less']);

};
