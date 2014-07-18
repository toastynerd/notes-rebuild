"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    simplemocha: {
      spec: {
        src: ['test/mocha/spec/*-test.js']
      }
    }
  });

  grunt.registerTask('default', ['simplemocha']);
}
