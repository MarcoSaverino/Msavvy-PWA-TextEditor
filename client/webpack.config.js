// configuring webpack's behavior and building process. It sets the mode, defines entry points, specifies output settings, configures plugins for HTML generation, service worker generation, and PWA manifest generation. It also defines rules for processing different types of files, such as images, CSS, and JavaScript, using loaders. The exported configuration object is used by webpack to build the application

const HtmlWebpackPlugin = require('html-webpack-plugin'); //simplifies the creation of HTML files that serve as entry points
const WebpackPwaManifest = require('webpack-pwa-manifest'); // generates a web app manifest file
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file.


module.exports = () => {
  return {
    entry: './client/src/js/index.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // Add necessary rules for handling JavaScript, CSS, and other assets.
    ],
  },
  devServer: { },
    mode: 'development', //enables additional development-specific features like source maps and readable output
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ //used to generate HTML files for the application. It takes a template file (index.html) and injects the necessary script tags for the bundled JavaScript files
        template: './index.html',
        title: 'Webpack plugin'
      }),
      new InjectManifest({ //provided by the Workbox library. It generates a service worker file based on the specified source file (src-sw.js) and destination (sw.js). The service worker is responsible for caching assets and enabling offline functionality (So here it is happening the RIA: Registration, Installation and Activation)
        swSrc: './src/src-sw.js',
        swDest: 'sw.js'
      }),
      new WebpackPwaManifest({ //used to generate a web app manifest file (manifest.json) for the PWA. It allows you to specify various properties such as the app's name, description, icons, colors, and starting URL. The manifest file will be used by browsers and platforms to understand and treat the web app as an installable PWA. It enables features like adding the app to the home screen, launching it in a standalone window, and controlling how the app appears when launched
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
