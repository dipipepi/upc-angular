/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

'use strict';

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('grunt-task-loader')(grunt);

    var cwd = 'dist/';
    // var jscsdkPath = 'assets/libs/jscsdk/';
    // var node_modules = './node_modules/';
    //
    // var third_party_src = [
    //     node_modules + 'jquery/dist/jquery.min.js',
    //
    //     cwd + 'assets/libs/third_party/xmlToJSON.min.js',
    //     cwd + 'assets/libs/third_party/unorm.min.js',
    //     cwd + 'assets/libs/third_party/base64.js',
    //     cwd + 'assets/libs/third_party/jszip.min.js',
    //     cwd + 'assets/libs/third_party/mime-js.min.js',
    //     cwd + 'assets/libs/jscsdk/avayaMeetingManagementClient.js',
    //     cwd + 'assets/libs/jscsdk/avayaUserClient.js',
    //     cwd + 'assets/libs/jscsdk/avayaRecordingClient.js',
    //     cwd + 'assets/libs/jscsdk/AvayaClientServices.min.js',
    //     cwd + 'assets/libs/jsplayerclient/jsPlayerClient.js',
    //
    //     node_modules + 'angular/angular.min.js',
    //     node_modules + 'angular-touch/angular-touch.min.js',
    //     node_modules + 'angular-sanitize/angular-sanitize.min.js',
    //     node_modules + 'angular-animate/angular-animate.min.js',
    //     node_modules + 'angular-aria/angular-aria.min.js',
    //     node_modules + 'angular-messages/angular-messages.min.js',
    //     node_modules + 'angular-cookies/angular-cookies.min.js',
    //     node_modules + 'angular-resizable/angular-resizable.min.js',
    //     node_modules + 'angular-uuid/angular-uuid.js',
    //     node_modules + 'angular-ui-router/release/angular-ui-router.min.js',
    //     node_modules + 'angular-translate/dist/angular-translate.min.js',
    //     node_modules + 'angular-translate-once/src/translate-once.js', //There is no minified version
    //     node_modules + 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
    //     node_modules + 'angular-dynamic-locale/tmhDynamicLocale.min.js',
    //     node_modules + 'ng-dialog/js/ngDialog.min.js',
    //     node_modules + 'clipboard/dist/clipboard.min.js',
    //     node_modules + 'moment/min/moment-with-locales.min.js',
    //     node_modules + 'moment-duration-format/lib/moment-duration-format.js', //There is no minified version
    //     node_modules + 're-tree/re-tree.min.js',
    //     node_modules + 'ng-device-detector/ng-device-detector.min.js',
    //     node_modules + 'angularjs-scroll-glue/src/scrollglue.js', //There is no minified version
    //     node_modules + 'blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
    //     node_modules + 'ngdraggable/ngDraggable.js'
    // ];

    grunt.initConfig({
      clean: {
        all: [
          'dist/*.js',
          'dist/*.css',
          'dist/*.js.map',
          'dist/*.css.map',
          'dist/*.jpg'
        ],
        artifacts: [
          'dist/'
        ]
      },

      copy: {
        main: {
          files: [
            {
              expand: true,
              cwd: 'dist',
              src: ['*.js', '*.js.map', '*.css', '*.css.map', '*.jpg'],
              dest: 'dist/assets'
            },
            {
              expand: true,
              cwd: 'dist/assets',
              src: [
                'favicon.ico'
              ],
              dest: '/dist/assets/icons'
            }]
        }
      },

      "merge-json": {
        "i18n": {
          files: {
            "src/assets/i18n/en.json": ["src/app/**/en-US.json"],
            "src/assets/i18n/ru-RU.json": ["src/app/webapp/app/**/ru-RU.json"],
            "src/assets/i18n/de-DE.json": ["src/app/webapp/app/**/de-DE.json"],
            "src/assets/i18n/es-XL.json": ["src/app/webapp/app/**/es-XL.json"],
            "src/assets/i18n/fr-FR.json": ["src/app/webapp/app/**/fr-FR.json"],
            "src/assets/i18n/it-IT.json": ["src/app/webapp/app/**/it-IT.json"],
            "src/assets/i18n/ja-JP.json": ["src/app/webapp/app/**/ja-JP.json"],
            "src/assets/i18n/ko-KR.json": ["src/app/webapp/app/**/ko-KR.json"],
            "src/assets/i18n/pt-BR.json": ["src/app/webapp/app/**/pt-BR.json"],
            "src/assets/i18n/zh-CN.json": ["src/app/webapp/app/**/zh-CN.json"],
            "src/assets/i18n/zh-TW.json": ["src/app/webapp/app/**/zh-TW.json"],
            "src/assets/i18n/pl-PL.json": ["src/app/webapp/app/**/pl-PL.json"],
            "src/assets/i18n/cs-CZ.json": ["src/app/webapp/app/**/cs-CZ.json"]
          }
        }
      }

    });

    grunt.registerTask('dev-deploy', ['copy:main', 'clean:all']);
};
