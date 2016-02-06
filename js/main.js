
    /*global require*/
    'use strict';

    // Require.js allows us to configure shortcut aliases
    require.config({
        // The shim config allows us to configure dependencies for
        // scripts that do not call define() to register a module
        // waitSeconds:0 prevents require from timing out on slow networks
        // waitSeconds: 0,

        shim: {
            underscore: {
                exports: '_'
            },
            backbone: {
                deps: [
                    'underscore',
                    'jquery'
                ],
                exports: 'Backbone'
            },
            handlebars: {
                exports: 'Handlebars'
            },
            bootstrap: {
                deps: [
                    'jquery'
                ],
                exports: 'bootstrap'
            }
        },
        paths: {
            jquery: 'vendor/jquery/jquery-1.11.2.min',
            jquery_prefilter: 'vendor/jquery/ajax_prefilter',
            underscore: 'vendor/underscore/underscore-1.8.3.min',
            handlebars: 'vendor/handlebars/handlebars-4.0.5.min',
            backbone: 'vendor/backbone/backbone-1.2.3.min',
            text: 'vendor/require/text-2.0.14.min',
            bootstrap: 'vendor/bootstrap/bootstrap.min'
        }
    });

    require([
        'backbone',
        'bootstrap',
        'app/helpers/handlebar_helpers',
        'app/router/router'
    ], function(Backbone, Bootstrap, HandlebarHelpers, Workspace) {
        'use strict';

        new Workspace();
        
        // Backbone.history.start({
        //     pushState: true,
        //     root: '/pub/w/'
        // });
		
		Backbone.history.start();

        $(document).on('click', 'a', function(evt) {
            // evt.preventDefault();
            if (!($(this).hasClass('js-bypass-link') || $(this).hasClass('js-third-party') || $(this).hasClass('navigatelinks'))) {
                // Get the anchor href and protcol
                var href = $(this).attr("href");
                var protocol = this.protocol + "//";

                // Ensure the protocol is not part of URL, meaning its relative.
                // Stop the event bubbling to ensure the link will not cause a page refresh.
                if(!!href){
	                if (href.slice(protocol.length) !== protocol) {
	                    evt.preventDefault();

	                    // Note by using Backbone.history.navigate, router events will not be
	                    // triggered.  If this is a problem, change this to navigate on your
	                    // router.
	                    Backbone.history.navigate(href, true);
	                }                	
                }
            } else if ($(this).hasClass('navigatelinks')) {
                evt.preventDefault();
                var id = $(evt.target).attr('href');
                document.getElementById(id).scrollIntoView();
            }
        });
    });
	
	// Globals
    var ENTER_KEY = 13;
    var ESC_KEY = 27;
    var TAB_KEY = 9;