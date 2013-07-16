module.exports = function(grunt) {
	'use strict';

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {

			styles: {
				files: ['scss/**/*.{scss,sass}'],
				tasks: ['compile-css'],
				options: {
					debounceDelay: 500
				}
			},

			scripts: {
				files: ['js/source/**/*.js', 'js/vendor/**/*.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					debounceDelay: 500
				}
			},

			livereload: {
				options: {
					livereload: true
				},
				files: [
					'style.css',
					'js/*.js',
					'*.html',
					'*.php',
					'images/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				'force': true
			},
			gruntfile: ['Gruntfile.js'],
			source: ['js/source/**/*.js']
		},

		uglify: {

			plugins: {
				options: {
					sourceMap: 'js/map/source-map-plugins.js.map'
				},
				files: {
					'js/plugins.min.js': [
						'js/source/plugins.js',
						'js/vendor/**/*.js',
						'!js/vendor/modernizr*.js'
					]
				}
			},

			main: {
				options: {
					sourceMap: 'js/map/source-map-main.js.map'
				},
				files: {
					'js/main.min.js': [
						'js/source/main.js'
					]
				}
			}
		},

		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},

		/**
		 * Fix the relative URLs and copy the CSS files into
		 * the theme root
		 */
		replace: {
			css: {
				src: ['css/style.css', 'css/editor-style.css'],
				dest: './',
				replacements: [{
					from: '../',
					to: ''
				}]
			}
		},

		/**
		 * Remove the duplicate CSS
		 */
		clean: {
			css: {
				src: ['<%= replace.css.src %>']
			}
		},

		/**
		 * Minify style.css to be compatible with SCRIPT_DEBUG
		 */
		cssmin: {
			dist: {
				files: {
					'style.min.css': ['style.css']
				}
			}
		},

		imagemin: {
		    dist: {
		        options: {
		            optimizationLevel: 7,
		            progressive: true
		        },
		        files: [{
		            expand: true,
		            cwd: 'images/',
		            src: '**/*',
		            dest: 'images/'
		        }]
		    }
		}

	});

	grunt.registerTask('compile-css', ['compass', 'replace:css', 'clean:css', 'cssmin'] );
	grunt.registerTask('default', ['jshint', 'uglify', 'compile-css'] );
};
