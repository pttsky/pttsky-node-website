module.exports = function (grunt) {
    /**
     * This Grunt file is written in manner of minimalism. No more complexity than required.
     */

    grunt.initConfig({

        path: 'public/styles/',

        sass: {
            dist: {
                options: {
                    lineNumbers: true,
                    sourcemap: 'none',
                    style: 'compressed' // Can be nested, compact, compressed, expanded
                },
                src: '<%= path %>sass/main.scss',
                dest: '<%= path %>css/main.min.css'
            },
            debug: {
                options: {
                    lineNumbers: true,
                    style: 'nested' // Can be nested, compact, compressed, expanded
                },
                src: '<%= path %>sass/main.scss',
                dest: '<%= path %>css/main.css'
            }
        },

        watch: {
            files:'<%= path %>sass/main.scss',
            tasks: ['sass']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'watch');

};