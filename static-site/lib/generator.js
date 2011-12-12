var marked = require('marked'),
    utils = require('./utils');

var Generator = exports.Generator = function (options) {
  this.logger = options.logger || require('winston');
}

Generator.prototype.generate = function (doc) {
  if (doc.readme) {
    var pID = (doc._id + '/' + utils.vID(doc)).grey;

    this.logger.silly('Generated README for ' + pID);
    try {
      return marked(doc.readme);
    }
    catch (ex) {
      this.logger.error('Error while generating README for ' + pID);
      this.logger.error(ex);
    }
  }
  return doc._id;
}

