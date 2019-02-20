import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { CONSTANTS } from './constants';

// tslint:disable-next-line no-var-requires
const VENDOR_LIBS = Object.keys(require('../package.json').dependencies);

const config: webpack.Configuration = {
  entry: {
    app: CONSTANTS.APP_ENTRY,
    vendor: VENDOR_LIBS,
  },
  output: {
    filename: '[name].js',
    path: CONSTANTS.DOCS_DIR,
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.json', '.ts', '.js', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
                declaration: false,
              },
            },
          },
        ],
      },
      {
        test: /node_modules.*\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/,
        loader: 'file-loader',
      },
      {
        test: /\.less/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: CONSTANTS.HTML_TEMPLATE,
      chunksSortMode: 'dependency',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

// tslint:disable-next-line no-default-export
export default config;
