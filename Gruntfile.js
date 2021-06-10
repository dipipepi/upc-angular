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
            "src/assets/i18n/en-US.json": ["src/app/**/en-US.json"],
            "src/assets/i18n/ru-RU.json": ["src/app/**/**/ru-RU.json"],
            "src/assets/i18n/de-DE.json": ["src/app/**/**/de-DE.json"],
            "src/assets/i18n/es-XL.json": ["src/app/**/**/es-XL.json"],
            "src/assets/i18n/fr-FR.json": ["src/app/**/**/fr-FR.json"],
            "src/assets/i18n/it-IT.json": ["src/app/**/**/it-IT.json"],
            "src/assets/i18n/ja-JP.json": ["src/app/**/**/ja-JP.json"],
            "src/assets/i18n/ko-KR.json": ["src/app/**/**/ko-KR.json"],
            "src/assets/i18n/pt-BR.json": ["src/app/**/**/pt-BR.json"],
            "src/assets/i18n/zh-CN.json": ["src/app/**/**/zh-CN.json"],
            "src/assets/i18n/zh-TW.json": ["src/app/**/**/zh-TW.json"],
            "src/assets/i18n/pl-PL.json": ["src/app/**/**/pl-PL.json"],
            "src/assets/i18n/cs-CZ.json": ["src/app/**/**/cs-CZ.json"]
          }
        }
      }

    });

    grunt.registerTask('dev-deploy', ['copy:main', 'clean:all']);
};
