/**
 * Created by taocong on 2017/1/19.
 */
module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
    dest: '{{BUILD}}'
  },
  // copySwToolbox: {
  //   src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
  //   dest: '{{BUILD}}'
  // },
  copyThirdLibs: {
    src: ['{{SRC}}/libs/**/*'],
    dest: '{{BUILD}}'
  },
}
