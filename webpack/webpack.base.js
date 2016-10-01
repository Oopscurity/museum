const path = require('path');

module.exports = {
  CLIENT_JS_ENTRY: path.join(process.cwd(), 'src/index.jsx'),
  CLIENT_STYLE_ENTRY: path.join(process.cwd(), 'src/style/common.less'),
  CLIENT_OUTPUT: path.join(process.cwd(), 'public/assets'),
  SERVER_ENTRY: path.join(process.cwd(), 'src/server/index.js'),
  SERVER_OUTPUT: path.join(process.cwd(), 'build'),
  PUBLIC_PATH: '/assets/'
};
