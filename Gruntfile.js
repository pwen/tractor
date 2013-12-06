module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest:{
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      source: {
        src: ['src/*.js']
      },
      test: {
        src: ['test/*.js']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  // Default task.
  grunt.registerTask('default', ['jshint','mochaTest']);

};
