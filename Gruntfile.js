module.exports = function(grunt) {

  grunt.initConfig({
    critical: {
      extract: {
        options: {
          base: './',
          width: 1024,
          height: 768,
          minify: true
        },
        src: 'index.html',
        dest: 'result.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-critical');
  grunt.registerTask('default', ['critical']);

};