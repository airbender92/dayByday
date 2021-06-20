// npm install -D webpack typescript ts-loader

// webpack.config.js
module.exports = {
    entry: {
    app: ['./src/'],
    },
    output: {
    path: __dirname,
    filename: './dist/[name].js',
    },
    resolve: {
    extensions: ['', '.js', '.ts'],
    },
    module: {
    loaders: [{
    test: /\.ts(x)$/, loaders: ['ts-loader'], exclude: /node_modules/
    }],
    }
   }