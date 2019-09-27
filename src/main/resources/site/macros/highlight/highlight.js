var portalLib = require('/lib/xp/portal');

var includedLanguages = [
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
    body: '<pre style="padding: 0;"><code class="' + language + '">' + stripCodeAndPreTags(context.body) + '</code></pre>',
    pageContributions: {
      headEnd: [
        '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github.min.css" integrity="sha384-snvkDYLVttT3SBWz8WVvdGfmManlusUoAT3Agqco/8yBV7/tlflWJCUmP2O9f9wF" crossorigin="anonymous">',
        '<link rel="stylesheet" href="' + portalLib.assetUrl({path: 'lib-highlight/style.css'}) + '"/>'
      ],
      bodyEnd: [
        '<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js" integrity="sha256-1zu+3BnLYV9LdiY85uXMzii3bdrkelyp37e0ZyTAQh0=" crossorigin="anonymous"></script>',
        getUrlIfNotIncluded(language),
        '<script src="//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.7.0/highlightjs-line-numbers.min.js" integrity="sha256-3f4oLge37B7QacI/ksfIIW3bPxh5xOli03/VKtvRWgU=" crossorigin="anonymous"></script>',
        '<script>hljs.initHighlightingOnLoad();hljs.initLineNumbersOnLoad();</script>'
      ]
    }
  }
};

function getUrlIfNotIncluded(language) {
  return (includedLanguages.indexOf(language) === -1)
    ? '<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/languages/' + language + '.min.js"></script>'
    : ''
}

function stripCodeAndPreTags(str) {
  return str.replace(/(<code>)|(<\/code>|<pre>|<\/pre>|<p>|<\/p>)/gm, "").trim();
}