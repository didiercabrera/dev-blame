module.exports = function(grunt) {
// NO USAR ESTE ARCHIVO, EL QUE SIRVE ES GRUNT.JS
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/* \n * <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n */'
		},
		concat:{
			app:{
				src:['public/app/*/*.js','public/app/**/*.js'],
				dest:"public/javascripts/app.js"
			},
			libs:{
				src:[
				'public/bower_components/angular/angular.min.js'
				],
				dest:"public/javascripts/libs.js"
			}
		},
		jshint: {
			files: ['app/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				forin: true,
				browser: true,
				devel: true, //TODO: Remove this in production.
				globals: {
					angular:true,
					GlobalPortal:true,
					Home:true,
					exports: true,
					module: false,
					can: true,
					$: true,
					Modernizr: true,
					Helpers: true,
					FayeClient:true,
					Clients:true,
					Models: true,
					Controllers: true,
					Directives:true,
					Services:true,
                    Components: true,
					ActiveXObject: true,
					flowplayer: true,
					BrowserDetect: true,
					Zenbox: true,
					FB: true,
					MaintenanceScreen:true,
					getActualDateTimeFormat: true,//, //recordar quitar esto...
					formatAMPM: true,
					Faye: true,
					_gaq: true,
					ga:true,
					qq: true,
					kWidget: true,
					respond: true,
					Pixastic: true,
					YT: true,
					onYouTubeIframeAPIReady: true,
					jwplayer: true,
					yourls: true,
					escape: true,
					ZeroClipboard: true,
					demand: true,
					moment: true,
					ga: true,
					AmCharts: true,
                    EJS: true
				},
			}
		},
		watch: {
		      files: ['app/**/*.js'],
    		  tasks: ['jshint', 'concat'],
    		  options:{
    		  	interrupt:true,
    		  	globals: {
    		  		GlobalPortal:true,
    		  		Home:true,
					exports: true,
					module: false,
					can: true,
					$: true,
					Modernizr: true,
					Helpers: true,
					Models: true,
					Controllers: true,
                    Components: true,
					ActiveXObject: true,
					flowplayer: true,
					BrowserDetect: true,
					Zenbox: true,
					FB: true,
					MaintenanceScreen:true,
					getActualDateTimeFormat: true,//, //recordar quitar esto...
					formatAMPM: true,
					Faye: true,
					_gaq: true,
					ga:true,
					qq: true,
					kWidget: true,
					respond: true,
					Pixastic: true,
					YT: true,
					onYouTubeIframeAPIReady: true,
					jwplayer: true,
					yourls: true,
					escape: true,
					ZeroClipboard: true,
					demand: true,
					moment: true,
					ga: true
				}
    		  }
		},
		uglify: {
			options: {
				compress: {
					drop_console: true,
                    evaluate: false,
                    properties: false,
                    unused: false
				},
				mangle: false
			},
			build:{
				files:[{
					expand:true,
					src:'js/*.js',
					dest:'min',
				}]
			}
		},
		connect: {
		    watch: {
		      options: {
	        	port: 3000,
	        	base: '.'
		      }
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	// Default task.
	grunt.registerTask('default', ['concat']);
    grunt.registerTask('dev-clean', ['concat','strip']);
	grunt.registerTask('dev', ['concat']);
	grunt.registerTask('production', ['concat','uglify']);
	grunt.registerTask('production:dist', ['concat','uglify','copy']);
	grunt.registerTask('server:watch',['concat','connect','watch','jshint']);
	grunt.registerTask('test', ['qunit']);
};
