define([
	'backbone'
], function(Backbone) {
	'use strict';

	var Workspace = Backbone.Router.extend({
		routes: {
			'': 'loadCommonElements',
			':level_1': 'loadCommonElements',
			':level_1/:level_2': 'loadCommonElements',
			'*404': 'load404'
		},

		loadCommonElements: function(level_1, level_2) {
			var that = this;

			require([
				'app/views/commons_view',
				'app/views/parent_view'
			], function(CommonsView, ParentView) {
				that.closeView();
				that.parent_view = that.parent_view || new ParentView();

				if (!that.current_view) {
					that.current_view = new CommonsView({
						level_1: level_1,
						level_2: level_2,
						router: that,
						parent_view: that.parent_view
					});
				} else {
					that.current_view.options.level_1 = level_1,
					that.current_view.options.level_2 = level_2,
					that.current_view.initialize();
				}
			});
			$('.modal').modal('hide');
		},

		load404: function() {
			console.log('Page not found');
		},

		// Router Utility Functions

		// objectManager is used to store the state of the following views:
		// - current_content_view: stores the content area view
		objectManager: {
			level_2: null
		},

		assignView: function(current_type, current_view) {
			this.objectManager[current_type] = current_view;
		},

		closeView: function(current_type) {
			if ( !! this.objectManager[current_type]) {
				this.objectManager[current_type].remove();
				this.objectManager[current_type].unbind();
				this.objectManager[current_type] = null;
			}
		}
	});

	return Workspace;
});