"use strict";
var fs = require('fs');
var ncp = require('ncp').ncp;

var srcDir = "auto-build-script/fastlane";
var destDir = "platforms/ios/fastlane";
var defaultTarget = "QYTravelV3";
var defaultBundleId = "com.isoftstone.QinYanTravel";

function updateFastlaneScript()
{
  // update bundle id/app name begin
  fs.readFile("config.xml", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var bundleId = data.match(/\s+id=\"(.+?)\"/i)[1];
    var name = data.match(/<name>(.+?)<\/name>/i)[1];
    if(bundleId == undefined || name == undefined)
    {
      return console.error('can\'t read iOS bundle id and app name!');
    }
    var appFilePath = destDir + '/Appfile';
    fs.readFile(appFilePath,'utf-8',function(err,data){
      data = data.replace(defaultBundleId, bundleId);
      fs.writeFile(appFilePath, data,function(e){
        console.log("update iOS bundle id to : " + bundleId);
      });
    });

    var fastfilePath = destDir + '/Fastfile';
    fs.readFile(fastfilePath,'utf-8',function(err,data){
      data = data.replace(defaultTarget, name);
      fs.writeFile(fastfilePath, data,function(e){
        console.log("update iOS app target/scheme to : " + name);
      });
    });
  });
  // update bundle id/app name end
}

function updateGitIgnore()
{
  var filePath = ".gitignore";
  fs.readFile(filePath,'utf-8',function(err,data){
    var newData = data.replace(/\nhooks/i, '\n# hooks');
    if(data == newData)
    {
      return;
    }
    fs.writeFile(filePath, newData, function(e){
      console.log(".gitignore successfully");
    });
  });
}

module.exports = function(context) 
{
  ncp(srcDir, destDir, function (err) {
    if (err) 
    {
      return console.error(err);
    }
    updateFastlaneScript();
    updateGitIgnore();
    console.log('copy iOS build script done!');
  });
};