var storyblok = '<script type="text/javascript" src="//www.storyblok.com/storyblok.js"></script>' +
                '<script type="text/javascript" src="/public/render-engine-build.js"></script>';

var bs = require('browser-sync').create();

bs.init({
  port: 3500,
  proxy: '',
  ghostMode: false,
  serveStatic: ['.'],
  rewriteRules: [
    {
      match: /<\/body>/g,
      fn: function (match) {
        return storyblok + '</body >';
      }
    }
  ]
});