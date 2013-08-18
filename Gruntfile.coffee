module.exports = (grunt) ->

    grunt.loadNpmTasks('grunt-contrib-handlebars')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-less')

    config =
        paths:
            app: 'client',
            dist: 'dist'

    grunt.initConfig
        config: config,

        watch:
            browserify:
                files: ["./client/scripts/**/*.coffee"]
                tasks: ["browserify"]
            handlebars:
                files: ["./client/templates/*.hbs"]
                tasks: ["handlebars"]


        clean:
            dist:
                files: [
                    dot: true,
                    src: ['.tmp']
                ]
        handlebars:
            dist:
                options:
                    processName : (filePath) ->
                        pieces = filePath.split("/");
                        filename = pieces[pieces.length - 1];
                        filename.substring(0, filename.length - ".hbs".length)

                files:
                    ".tmp/templates.js" : "<%= config.paths.app %>/templates/*.hbs"

        browserify:
            dist:
                src: "./client/scripts/app.coffee"
                dest: "./.tmp/app.js"
                options:
                    transform: ['coffeeify']
                    debug: true
                    shim:
                        jquery: { path: './client/bower_components/jquery/jquery.js',  exports: '$' }
                        underscore: { path: './client/bower_components/underscore/underscore.js',  exports: '_' }
                        backbone: {
                            path: './client/bower_components/backbone/backbone.js',
                            exports: 'Backbone',
                            depends: { jquery: '$', underscore: '_' }
                        }
                        marionette : {
                            path: "./client/bower_components/backbone.marionette/lib/backbone.marionette.js",
                            exports : 'Marionette',
                            depends: { backbone: 'Backbone' }
                        }

        less:
            dist:
                src: "./client/styles/bootstrap.less"
                dest:"./.tmp/style.css"


    grunt.registerTask('build', [
        'clean:dist',
        'coffee:dist'
    ]);

    grunt.registerTask('default', ['build']);

