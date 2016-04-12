var Handlebars = require('hbsfy/runtime');
var templates = {
	'root': require('../bloks/root.hbs'),
	'teaser': require('../bloks/teaser.hbs'),
};
var config = {
	container: '.small-teaser',
	spaceId: '39829',
	slug: 'de_austria',
	accessToken: ''
}

Handlebars.registerHelper('blok', function(data) {
	if (typeof templates[data.component] == 'undefined') {
		return new Handlebars.SafeString('Component ' + data.component + ' not found.');
	}

	var result = templates[data.component](data);
	result = data.blok + result;
	return new Handlebars.SafeString(result);
});

var renderEngine = {
	initialize: function() {
		storyblok.init({
			accessToken: config.accessToken
		});

		storyblok.on('change', function() {
			this.enterEditmode();
		}.bind(this));

		storyblok.on('published', function() {

			// Get the published version of the story
			storyblok.get({slug: config.slug, space: config.spaceId, version: 'published'}, function(data) {
				// Update server record here
			});

		}.bind(this));

		this.enterEditmode();
	},
	enterEditmode: function() {
		// Gets the draft version of the story
		storyblok.get({slug: config.slug, space: config.spaceId, version: 'draft'}, function(data) {
			// Renders the template into the container
			$(config.container).last().html(data.story.content.blok + templates.root(data.story.content));

			// Prevent clicks in editmode
			$(document).ready(function() {$('a').click(function(e) {e.preventDefault()})});

			// Communicates with editor to enter editmode
			storyblok.enterEditmode();
		});
	}
};

$(document).ready(function() {
	renderEngine.initialize();
});