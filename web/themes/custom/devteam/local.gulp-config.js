/* globals module */

(function () {
  'use strict';

  var themeDir = './';
  var paths = {
    js: themeDir + '/components/_patterns/00-base/global/*.js',
    styleguide_js: [
      themeDir + '/js/**/*.js',
      themeDir + '/components/_patterns/**/*.js'
    ],
    dist_js: themeDir + '/dist',
    sass: themeDir,
    img: themeDir + '/images',
    dist_css: themeDir + '/dist/css',
    dist_img: themeDir + '/dist/img',
    pattern_lab: themeDir + '/pattern-lab/public'
  };

  module.exports = {
    host: 'http://127.0.0.1:8888/',
    themeDir: themeDir,
    paths: paths,
    sassOptions: {
      outputStyle: 'expanded',
      eyeglass: {
        enableImportOnce: false
      }
    },
    cssConfig: {
      enabled: true,
      src: themeDir + '/components/styles.scss',
      dest: themeDir + '/dist/',
      flattenDestOutput: true,
      lint: {
        enabled: false,
        failOnError: true
      },
      sourceComments: false,
      sourceMapEmbed: false,
      outputStyle: 'expanded',
      autoPrefixerBrowsers: [
        'last 2 versions',
        '- IE >= 9'
      ],
      includePaths: (['./node_modules']),
      sassdoc: {
        enabled: true,
        dest: themeDir + '/dist/sassdoc',
        verbose: false,
        sort: [
          'file',
          'group',
          'line'
        ]
      }
    },
    iconConfig: {
      shape: {
        dimension: {
          maxWidth: 15,
          maxHeight: 15
        },
        spacing: {         // Add padding
          padding: 10
        }
      },
      mode: {
        css: {
          bust: false,
          dest: '../../dist',
          prefix: '@mixin sprite-%s',
          render: {
            scss: {
              dest: '../components/_patterns/01-atoms/05-icons/_icon_sprite.scss',
              template: 'node_modules/emulsify-gulp/gulp-tasks/svg-icons/sprite.scss.handlebars'
            }
          }
        }
      }
    },
    patternLab: {
      enabled: true,
      configFile: themeDir + 'pattern-lab/config/config.yml',
      watchedExtensions: (['twig', 'json', 'yaml', 'yml', 'md', 'jpg', 'jpeg', 'png']),
      scssToJson: [
        {
          src: themeDir + '/components/_base/_colors.scss',
          dest: themeDir + '/components/_patterns/00-base/global/colors.json',
          lineStartsWith: '$',
          allowVarValues: false
        }
      ]
    },
    browserSync: {
      ui: false,
      enabled: true,
      baseDir: './',
      startPath: themeDir + 'pattern-lab/public/',
      // Uncomment below if using a specific local url
      domain: 'devteam.vm',
      openBrowserAtStart: true,
      browser: "google chrome",
      reloadDelay: 50,
      reloadDebounce: 750
    },
    wpt: {
      // WebPageTest API key https://www.webpagetest.org/getkey.php
      // key:
    }
  };
})();