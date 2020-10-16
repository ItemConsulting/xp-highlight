var config = require('../../highlight-config.json')
var utils = require("../../lib/service-utils")

exports.get = function (req) {
  var query = (req.params.query !== undefined)
    ? req.params.query.toLowerCase()
    : '';

  var hits = config.languageFiles
    .map(function(fileName) {
      return utils.createResponseItem(fileName.replace(".min.js", ""))
    })
    .filter(function(item) {
      return item.displayName.toLowerCase().indexOf(query) !== -1
    });

  return {
    status: 200,
    body: {
      total: config.languageFiles.length,
      count: hits.length,
      hits: hits
    }
  }
}
