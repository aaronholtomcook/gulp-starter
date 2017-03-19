'use strict';

const jimp = require('jimp');
const jsonxml = require('jsontoxml');
const {writeFile} = require('fs');
const {extname, join} = require('path');
const paths = require('../../config/paths');

module.exports = (config) => {
  const base = config.output.icons.replace(paths.dest.base, '');

  const icons = {
    android: {
      'android-chrome-144x144.png': {
        height: 144,
        width: 144
      },
      'android-chrome-192x192.png': {
        height: 192,
        width: 192
      },
      'android-chrome-256x256.png': {
        height: 256,
        width: 256
      },
      'android-chrome-36x36.png': {
        height: 36,
        width: 36
      },
      'android-chrome-384x384.png': {
        height: 384,
        width: 384
      },
      'android-chrome-48x48.png': {
        height: 48,
        width: 48
      },
      'android-chrome-512x512.png': {
        height: 512,
        width: 512
      },
      'android-chrome-72x72.png': {
        height: 72,
        width: 72
      },
      'android-chrome-96x96.png': {
        height: 96,
        width: 96
      }
    },
    apple: {
      'apple-touch-icon-114x114.png': {
        height: 114,
        width: 114
      },
      'apple-touch-icon-120x120.png': {
        height: 120,
        width: 120
      },
      'apple-touch-icon-144x144.png': {
        height: 144,
        width: 144
      },
      'apple-touch-icon-152x152.png': {
        height: 152,
        width: 152
      },
      'apple-touch-icon-167x167.png': {
        height: 167,
        width: 167
      },
      'apple-touch-icon-180x180.png': {
        height: 180,
        width: 180
      },
      'apple-touch-icon-57x57.png': {
        height: 57,
        width: 57
      },
      'apple-touch-icon-60x60.png': {
        height: 60,
        width: 60
      },
      'apple-touch-icon-72x72.png': {
        height: 72,
        width: 72
      },
      'apple-touch-icon-76x76.png': {
        height: 76,
        width: 76
      },
      'apple-touch-icon-precomposed.png': {
        height: 180,
        width: 180
      },
      'apple-touch-icon.png': {
        height: 180,
        width: 180
      }
    },
    favicons: {
      'favicon-16x16.png': {
        height: 180,
        width: 180
      },
      'favicon-32x32.png': {
        height: 180,
        width: 180
      },
      'favicon.ico': {
        sizes: [{
          height: 16,
          width: 16
        }, {
          height: 24,
          width: 24
        }, {
          height: 32,
          width: 32
        }, {
          height: 48,
          width: 48
        }, {
          height: 64,
          width: 64
        }]
      }
    },
    windows: {
      'mstile-144x144.png': {
        height: 144,
        width: 144
      },
      'mstile-150x150.png': {
        height: 270,
        width: 270
      },
      'mstile-310x150.png': {
        height: 270,
        width: 558
      },
      'mstile-310x310.png': {
        height: 558,
        width: 558
      },
      'mstile-70x70.png': {
        height: 128,
        width: 128
      }
    }
  };

  const manifests = {
    android: {
      'manifest.json': {
        background_color: config.app.background,
        display: 'standalone',
        icons: [{
          src: join(base, 'android-chrome-36x36.png'),
          sizes: '36x36',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-48x48.png'),
          sizes: '48x48',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-72x72.png'),
          sizes: '72x72',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-96x96.png'),
          sizes: '96x96',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-144x144.png'),
          sizes: '144x144',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-192x192.png'),
          sizes: '192x192',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-256x256.png'),
          sizes: '256x256',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-384x384.png'),
          sizes: '384x384',
          type: 'image/png'
        }, {
          src: join(base, 'android-chrome-512x512.png'),
          sizes: '512x512',
          type: 'image/png'
        }],
        name: config.app.name,
        theme_color: config.app.theme
      }
    },
    windows: {
      'browserconfig.xml': [{
        name: 'browserconfig',
        children: [{
          name: 'msapplication',
          children: [{
            name: 'tile',
            children: [{
              name: 'square70x70logo',
              attrs: {
                src: join(base, 'mstile-70x70.png')
              }
            }, {
              name: 'square150x150logo',
              attrs: {
                src: join(base, 'mstile-150x150.png')
              }
            }, {
              name: 'wide310x150logo',
              attrs: {
                src: join(base, 'mstile-310x150.png')
              }
            }, {
              name: 'square310x310logo',
              attrs: {
                src: join(base, 'mstile-310x310.png')
              }
            }, {
              name: 'TileColor',
              text: config.app.theme
            }]
          }]
        }]
      }]
    }
  };

  const meta = {
    android: {},
    apple: {},
    favicons: {},
    windows: {}
  };

  function createManifests (platform) {
    const promises = [];

    for (const manifest in manifests[platform]) {
      if (manifests[platform].hasOwnProperty(manifest)) {
        let contents;

        switch (extname(filename)) {
          case '.json':
            contents = JSON.stringify(manifests[platform][manifest], null, '\t');
            break;
          case '.xml':
            contents = jsonxml(manifests[platform][manifest], {
              prettyPrint: true,
              xmlHeader: true,
              indent: '  '
            });
            break;
          default:
        }

        promises.push(
          new Promise(
            (resolve, reject) => writeFile(
              join(config.output.icons, manifest), contents, (err) => {
                if (err) {
                  reject(err);
                }

                resolve(contents);
              }
            )
          )
        );
      }
    }

    return Promise.all(promises);
  }

  // Promises
  const promises = [];

  // Create manifests
  for (const platform in manifests) {
    if (manifests.hasOwnProperty(platform) && config.platforms[platform]) {
      promises.push(
        createManifests(platform)
      );
    }
  }

  return Promise.all(promises);
};
