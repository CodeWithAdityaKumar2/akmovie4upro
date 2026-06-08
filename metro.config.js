
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  rewriteRequestUrl: (url) => {
    if (url.includes('&transform.routerRoot=') && url.startsWith('/node_modules/expo-router/entry.bundle')) {
        const projectRoot = __dirname;
        const routerRoot = url.split('&transform.routerRoot=')[1];
        return url.replace(
            '/node_modules/expo-router/entry.bundle',
            `${projectRoot}/${routerRoot}/_layout`
        );
    }
    return url;
  },
  // This is the important part
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
