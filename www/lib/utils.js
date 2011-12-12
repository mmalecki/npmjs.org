exports.vID = function (doc) {
  return (doc['dist-tags'] && doc['dist-tags'].latest) || doc._rev;
}

