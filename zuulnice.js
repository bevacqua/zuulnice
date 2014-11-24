'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var convert = require('convert-source-map');
var yaml = require('yamljs');
var file = path.join(process.cwd(), '.zuul.yml');
var config = fs.existsSync(file) ? yaml.parse(read(file)) : {};
var bro = config.browserify;

function read (file) {
  return fs.readFileSync(file, 'utf8');
}

function configure (bundler) {
  ['plugin', 'external', 'ignore', 'exclude', 'transform', 'add', 'require'].forEach(registerable);

  function registerable (type) {
    _.where(bro, type).forEach(register.bind(null, type));
  }

  function register (type, o) {
    bundler[type](o[type], _.omit(o, type));
  }
}

module.exports = function (files, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt;
    opt = {};
  }
  if (!opt) {
    opts = {};
  }
  opt.debug = true;

  var browserifyOptions = _.find(bro, 'options');
  var bundler = browserify(browserifyOptions ? _.assign({}, opt, browserifyOptions.options) : opt);

  if (bro) {
    configure(bundler);
  }

  files.forEach(function(file) {
    bundler.require(file, { entry: true });
  });

  bundler.bundle(function(err, buf) {
    if (err) {
      return cb(err);
    }

    var src = buf.toString();
    var srcmap = convert.fromSource(src);
    var map = undefined;
    src = convert.removeComments(src);

    if (srcmap) {
      map = srcmap.toObject();
    }

    cb(null, src, map);
  });
};
