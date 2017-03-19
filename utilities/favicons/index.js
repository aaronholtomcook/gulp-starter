'use strict';

const jimp = require('jimp');
const jsonxml = require('jsontoxml');
const mkdirp = require('mkdirp');
const {error} = require('util');
const {writeFile} = require('fs');
const {dirname, extname, join} = require('path');
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
          sizes: '36x36',
          src: join(base, 'android-chrome-36x36.png'),
          type: 'image/png'
        }, {
          sizes: '48x48',
          src: join(base, 'android-chrome-48x48.png'),
          type: 'image/png'
        }, {
          sizes: '72x72',
          src: join(base, 'android-chrome-72x72.png'),
          type: 'image/png'
        }, {
          sizes: '96x96',
          src: join(base, 'android-chrome-96x96.png'),
          type: 'image/png'
        }, {
          sizes: '144x144',
          src: join(base, 'android-chrome-144x144.png'),
          type: 'image/png'
        }, {
          sizes: '192x192',
          src: join(base, 'android-chrome-192x192.png'),
          type: 'image/png'
        }, {
          sizes: '256x256',
          src: join(base, 'android-chrome-256x256.png'),
          type: 'image/png'
        }, {
          sizes: '384x384',
          src: join(base, 'android-chrome-384x384.png'),
          type: 'image/png'
        }, {
          sizes: '512x512',
          src: join(base, 'android-chrome-512x512.png'),
          type: 'image/png'
        }],
        name: config.app.name,
        'theme_color': config.app.theme
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

  const metaData = {
    android: [{
      app: false,
      template: `<meta name="application-name" content="${config.app.name}">`
    }, {
      app: true,
      template: `<meta name="mobile-web-app-capable" content="yes">`
    }, {
      app: false,
      template: `<meta name="theme-color" content="${config.app.theme}">`
    }, {
      app: false,
      template: `<link rel="manifest" href="${join(base, 'manifest.json')}">`
    }],
    apple: [{
      app: true,
      template: `<meta name="apple-mobile-web-app-capable" content="yes">`
    }, {
      app: true,
      template: `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
    }, {
      app: true,
      template: `<meta name="apple-mobile-web-app-title" content="${config.app.name}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="114x114" href="${join(base, 'apple-touch-icon-114x114.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="120x120" href="${join(base, 'apple-touch-icon-120x120.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="144x144" href="${join(base, 'apple-touch-icon-144x144.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="152x152" href="${join(base, 'apple-touch-icon-152x152.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="180x180" href="${join(base, 'apple-touch-icon-180x180.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="57x57" href="${join(base, 'apple-touch-icon-57x57.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="60x60" href="${join(base, 'apple-touch-icon-60x60.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="72x72" href="${join(base, 'apple-touch-icon-72x72.png')}">`
    }, {
      app: false,
      template: `<link rel="apple-touch-icon" sizes="76x76" href="${join(base, 'apple-touch-icon-76x76.png')}">`
    }],
    favicons: [{
      app: false,
      template: `<link rel="icon" type="image/png" sizes="16x16" href="${join(base, 'favicon-16x16.png')}">`
    }, {
      app: false,
      template: `<link rel="icon" type="image/png" sizes="32x32" href="${join(base, 'favicon-32x32.png')}">`
    }, {
      app: false,
      template: `<link rel="shortcut icon" href="${join(base, 'favicon.ico')}">`
    }],
    windows: [{
      app: false,
      template: `<meta name="msapplication-TileColor" content="${config.app.theme}">`
    }, {
      app: false,
      template: `<meta name="msapplication-TileImage" content="${join(base, 'mstile-144x144.png')}">`
    }, {
      app: false,
      template: `<meta name="msapplication-config" content="${join(base, 'browserconfig.xml')}">`
    }]
  };

  // Promises store
  const promises = [];

  // Create manifest utility
  function createManifests (platform) {
    for (const manifest in manifests[platform]) {
      if (manifests[platform].hasOwnProperty(manifest)) {
        let contents;

        switch (extname(manifest)) {
          case '.json':
            contents = JSON.stringify(manifests[platform][manifest], null, '\t');
            break;
          case '.xml':
            contents = jsonxml(manifests[platform][manifest], {
              prettyPrint: true,
              xmlHeader: true
            });
            break;
          default:
        }

        promises.push(
          new Promise(
            (resolve, reject) => mkdirp(
              config.output.icons,
              (err) => err ? reject(err) : writeFile(
                join(config.output.icons, manifest),
                contents,
                (err) => err ? reject(err) : resolve(contents)
              )
            )
          )
        );
      }
    }
  }

  // Create meta data utility
  function createMetaData () {
    let output = '';

    for (const platform in metaData) {
      if (metaData.hasOwnProperty(platform)) {
        metaData[platform].forEach((tag) => {
          if ((tag.app && config.appEnabled) || !tag.app) {
            output += `${tag.template}
`;
          }
        });
      }
    }

    promises.push(
      new Promise(
        (resolve, reject) => mkdirp(
          dirname(paths.src.favicons.output),
          (err) => err ? reject(err) : writeFile(
              paths.src.favicons.output,
              output,
              (err) => err ? reject(err) : resolve(output)
            )
        )
      )
    );
  }

  // Create manifests
  for (const platform in manifests) {
    if (manifests.hasOwnProperty(platform) && config.platforms[platform]) {
      createManifests(platform);
    }
  }

  // Create meta data
  createMetaData();

  return Promise.all(promises)
    .catch(
      (err) => {
        error(err);

        process.exit(1);
      }
    );
};
