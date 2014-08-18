var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// consts
const PLUGIN_NAME = 'gulp-css-minify-url';

var startReg  = /^(\s*)<!--\s*htmlbuild:([a-zA-Z]*)\s*/,
    endReg    = /\s*endbuild\s*-->/,
    MIN_PRE    = '/min/f=';
var startNum, endNum;

function extractCss(line) {
    var matched = /(\s*)<link.+href=['"]([^"']+)["']/.exec(line);
    if (matched) {
        return matched[2];
    }
}
function templateCss(path) {
    return '<link rel="stylesheet" href="'+path+'"/>'
}

// plugin level function (dealing with files)
function minifyUrl() {
  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
    	// remove first
        var str = String(file.contents).replace(/(\s*)<link.+href=['"](\/min\/f=[^"']+)["']\/>/g, "");
        var lines = str.split('\n');
        for(var i = 0, len = lines.length; i < len; i++){
            if(startReg.test(lines[i]) && typeof startNum === 'undefined'){
                startNum = i;
            }
            if(endReg.test(lines[i]) && typeof endNum === 'undefined'){
                endNum = i;
            }
        }
        // No match
        if(typeof startNum ==='undefined' || typeof endNum === 'undefined'){
        	return cb();
        }
        // minify url
        var minifyFormat = [], url;
        if(startNum < endNum){
            for(var j = startNum + 1; j < endNum; j++){
                url = extractCss(lines[j]);
                if(url && minifyFormat.indexOf(url) < 0){
                    minifyFormat.push(url);
                }
            }
            minifyFormat = templateCss(MIN_PRE + minifyFormat.join(','));
            lines.splice(endNum + 1, 0 , minifyFormat);
        }
        file.contents = new Buffer(lines.join('\n'));
       console.log('build success: ' + file.path);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
module.exports = minifyUrl;