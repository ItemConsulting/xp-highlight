var portalLib = require('/lib/xp/portal');

var LANGUAGES_INCLUDED = [
  "apache",
  "bash",
  "cs",
  "cpp",
  "css",
  "coffeescript",
  "diff",
  "xml",
  "http",
  "ini",
  "json",
  "java",
  "javascript",
  "makefile",
  "markdown",
  "nginx",
  "objectivec",
  "php",
  "perl",
  "properties",
  "python",
  "ruby",
  "sql",
  "shell",
  "yaml"
];

exports.macro = function (context) {
  var language = context.params.language || 'javascript';

  return {
    body: wrapInPreAndCodeTags(language, stripCodeAndPreTags(context.body)),
    pageContributions: {
      headEnd: [
        styleElementFromAssetPath('highlightjs/10.1.2/styles/' + getStylesheet()),
        styleElementFromAssetPath('lib-highlight/style.css')
      ],
      bodyEnd: [
        scriptElementFromAssetPath('highlightjs/10.1.2/highlight.min.js'),
        getUrlIfNotIncluded(language),
        scriptElementFromAssetPath('github-com-wcoder-highlightjs-line-numbers-js/2.7.0/highlightjs-line-numbers.min.js'),
        '<script>hljs.initHighlightingOnLoad();hljs.initLineNumbersOnLoad();</script>'
      ]
    }
  }
};

function wrapInPreAndCodeTags(language, body) {
  return '<pre style="padding: 0;"><code class="' + language + '">' + body + '</code></pre>';
}

function stripCodeAndPreTags(str) {
  return str.replace(/(<code>)|(<\/code>|<pre>|<\/pre>|<p>|<\/p>)/gm, "").trim();
}

function getStylesheet() {
  var siteConfig = portalLib.getSiteConfig();
  var stylesheet = siteConfig.stylesheet;

  return (!stylesheet|| stylesheet === '')
    ? 'default.css'
    : stylesheet;
}

function styleElementFromAssetPath(href) {
  return '<link rel="stylesheet" href="' + portalLib.assetUrl({ path: href }) + '"/>';
}

function scriptElementFromAssetPath(src) {
  return '<script src="' + portalLib.assetUrl({ path: src }) + '"></script>';
}

function getUrlIfNotIncluded(language) {
  return (LANGUAGES_INCLUDED.indexOf(language) === -1)
    ? scriptElementFromAssetPath('highlightjs/10.1.2/languages/' + language + '.min.js')
    : ''
}
