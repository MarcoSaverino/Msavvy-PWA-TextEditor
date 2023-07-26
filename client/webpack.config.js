// configuring the webpack's behavior and building process. 

const HtmlWebpackPlugin = require('html-webpack-plugin'); //simplifies the creation of HTML files that serve as entry points
const WebpackPwaManifest = require('webpack-pwa-manifest'); // generates a web app manifest file
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file.


module.exports = () => {
  return {
    mode: 'development', //enables the additional development-specific features
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ //generates HTML files for the application. 
        title: 'Webpack plugin'
      }),
      new InjectManifest({ //provided by the Workbox library. It generates a service worker file
        swSrc: './src/src-sw.js',
        swDest: 'sw.js'
      }),
      new WebpackPwaManifest({ //generates a web app manifest file (manifest.json) for the PWA. 
        name: 'JATE(Text-editor)',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024',
            destination: path.join('assets', 'icons'),
            purpose: 'maskable'
          }
        ],
      })
    ],


// Add CSS loaders and babel to webpack.

    module: { // module property defines rules for transforming and processing different types of files in the application
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, //first rule handles image files
          type: 'asset/resource' //the matched image files will be emitted as separate files in the output directory and their URLs will be added to the JavaScript code dynamically
        },
        {
          test: /\.css$/i, //second rule handles CSS files
          use: ['style-loader', 'css-loader'], // the use property is an array of loaders that will be applied in reverse order. In this case, the 'css-loader' is used to handle CSS imports, and the 'style-loader' is used to inject the CSS into the HTML as <style> tags
        },
        {
          test: /\.m?js$/, // third rule handles JavaScript files 
          exclude: /node_modules/,
          use: { // specifies the loader to be used for JavaScript: babel-loader
            loader: 'babel-loader', // to make sure that the code is readable by all browsers, we need a tool like babel to transpile our code to normal readable code for browsers
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }] //
              ]
            }
          }
        } 
      ],
    },
  };
};
