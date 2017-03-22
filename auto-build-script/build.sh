#!/bin/bash

build_ios()
{
  echo "###############################begin build iOS $1###############################"
  ionic platform remove ios
  ionic platform add ios@4.3.0
  ionic build ios --prod --release --generateSourceMap false
  cd platforms/ios
  fastlane ios $1 comments:"$CHANGE_LOG" --verbose
  cd ../..
  echo "###############################end build iOS $1###############################"
  osascript -e 'display notification "Build & Upload iOS $1 Successfully!" with title "iOS"'
}

build_android()
{
  echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~begin build Android~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  ionic platform remove android
  ionic platform add android@6.1.0
  ionic build android --prod --release --generateSourceMap false
  # # platforms/android/gradlew assembleRelease
  curl -F "file=@platforms/android/build/outputs/apk/android-release.apk" -F "uKey=cccf7c031dae4a3c59998e6e58531d42" -F "_api_key=6e1cd102d89637c2e436c92762f2592a" -F "updateDescription=$CHANGE_LOG" http://www.pgyer.com/apiv1/app/upload
  echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~end build Android~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  osascript -e 'display notification "Build & Upload Android Successfully!" with title "Android"'
}

build_help()
{
  echo "################### Usage begin ###################"
  echo "$0"
  echo "$0 android"
  echo "$0 ios"
  echo "$0 ios appstore"
  echo "################### Usage end ###################"
}

build_help

export CHANGE_LOG=$(git log --pretty=format:"%s" -1 $describe)

npm install ncp@2.0.0 --registry=https://registry.npm.taobao.org
npm install --registry=https://registry.npm.taobao.org
mkdir -p www

if [ $# == 0 ]
then
  build_ios "adhoc"
  build_android
elif [ $1 == "ios" ]
then
  if [ $# == 1 ]
  then
    build_ios "adhoc"
  else
    build_ios $2
  fi
elif [ $1 == "android" ]
then
  build_android
fi