#!/usr/bin/env node
 
module.exports = function (context) {
  var
    fs = context.requireCordovaModule('fs')
    ,path = context.requireCordovaModule('path')
    ,rootDir = context.opts.plugin.dir
    ,Q = context.requireCordovaModule('q')
    ,deferral = new Q.defer()
  ;
  if (context.opts.cordova.platforms.indexOf('android') >= 0) {
    var androidFolders = [
      'drawable-hdpi',
      'drawable-ldpi',
      'drawable-mdpi',
      'drawable-xhdpi',
      'drawable-xxhdpi',
      'drawable-xxxhdpi'
    ];
    androidFolders.forEach(function (folderName) {
      var srcfile = path.join(rootDir, 'res', 'ic_notifications_none_white_18dp', 'android', folderName, 'ic_notifications_none_white_18dp.png');
      var destfile = path.join(context.opts.projectRoot, 'platform', 'android', 'res', folderName, 'ic_notifications_none_white_18dp.png');
      // console.log("copying "+srcfile+" to "+destfile);
      var destdir = path.dirname(destfile);
      if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
          fs.createReadStream(srcfile).pipe(
             fs.createWriteStream(destfile));
      }
    })
  } else {
    deferral.resolve();
  }
  
  return deferral.promise;
}
