// Librerías
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    main: './src/index.js',
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: true
  },
  optimization: {
    // Realizamos comprobaciones sore los exports utilizados
    usedExports: true,
    // Activamos sideEffects para ambos modos
    sideEffects: true,
    // Importamos todos los módulos desde un único runtime
    runtimeChunk: 'single',
    // Configuramos splitChunks
    splitChunks: {
      // Configuramos los grupos de chunks
      cacheGroups: {
        // Definimos un grupo vendor que contendrá las
        // librerías
        vendor: {
          // Apuntamos al entrypoint "vendor"
          test: 'vendor',
          // Le damos un nombre al chunk
          name: 'vendor',
          // Fuerza a Webpack a crear un chunk
          // de este grupo siempre
          enforce: true,
          // Selecciona todos los tipos de chunks,
          // síncronos y asíncronos
          chunks: 'all'
        }
      }
    }
  }
}

// Modificamos la configuración según el modo
module.exports = (env, argv) => {
  // Comprobamos si estamos en desarrollo
  const isDevelopment = argv.mode === 'development';

  if (isDevelopment) {
    config.devtool = 'eval-source-map';
  } else {
    config.devtool = 'source-map'; // o hidden-source-map
  }

  return config;
};
