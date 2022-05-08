const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      // 配置JS在线代码编辑器monaco-editor的辅助文件
      new MonacoWebpackPlugin(),
    ],
  },
};
