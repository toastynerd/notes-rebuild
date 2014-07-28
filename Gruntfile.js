"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    simplemocha: {
      spec: {
        src: ['test/mocha/spec/*-test.js']
      }
    },

    clean: {
      dist: {
        src: ['dist/*']
      }
    },

    copy: {
      dist: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.css'],
        dest: 'dist/',
        filter: 'isFile' 
      }
    },

    browserify: {
      dist: {
        src: ['app/js/**/*.js'],
        dest: 'dist/client.js',
        options: {
          transform: ['debowerify']
        }
      }
    } 
  });

  grunt.registerTask('default', ['simplemocha']);
  grunt.registerTask('build', ['clean:dist', 'copy:dist', 'browserify:dist']);
}
