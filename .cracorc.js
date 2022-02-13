
const path = require('path');
const CracoAliasPlugin = require('craco-alias');
const sassResourcesLoader = require('craco-sass-resources-loader');

const {
  PUBLIC_URL
} = process.env

module.exports = {
  eslint: {
    enable: true,
  },
  webpack: {
    configure: {
      output: {
        publicPath: PUBLIC_URL,
      },
      optimization: {
        splitChunks: {
          chunks: 'async',
          name: 'common',
          minChunks: 2
        }
      },
    },
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/prod/**': {
        target: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      },
    }
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: path.join(__dirname, './src/assets/scss/variables.scss'),
      },
    },
    {
      plugin: CracoAliasPlugin,
      options: {
        baseUrl: './',
        aliases: {
          "@": "./src"
        }
      }
    },
  ],
};
