"use strict";

var ncp = require('ncp').ncp;
var fs = require('fs');

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
  var source = "auto-build-script/gradle";
  var destination = "platforms/android";
  ncp(source, destination, function (err) {
    if (err) 
    {
      return console.error(err);
    }
    updateGitIgnore();
    console.log('copy Android build script done!');
  });
};