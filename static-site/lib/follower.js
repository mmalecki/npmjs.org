var fs = require('fs'),
    path = require('path'),
    nconf = require('nconf'),
    mkdirp = require('mkdirp'),
    follow = require('follow'),
    colors = require('colors'),
    winston = require('winston'),
    utils = require('./utils'),
    generator = require('./generator');

var logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({ colorize: true, level: 'silly' })
  ]
});

nconf.argv().env().file({ file: 'config.json' });

var registry = nconf.get("registry"),
    out = nconf.get("out") || "public",
    gen = new generator.Generator({ logger: logger });

follow({ db: registry, include_docs: true }, function (err, change) {
  var doc = change.doc,
      revID = doc._rev;

  logger.info('Got change for ' + change.id.grey + ' with rev ' + revID.grey);

  // XXX path traversal
  mkdirp(path.join(out, change.id, utils.vID(doc)), 0755, function () {
    fs.writeFile(path.join(p, 'index.html'), gen.generate(doc));
  });
});

