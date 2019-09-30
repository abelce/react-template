const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var webpackConfig = {
    mode: getMode(),
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        hot: true,
        port: 3010,
        contentBase: __dirname + '/build',
        historyApiFallback: true,
    },
    entry: {
        app: `${__dirname}/src/page/App.js`,
    },
    output: {
        path: `${__dirname}/build/`,
        publicPath: '/',
        filename: isDev() ? '[name].[hash].js' : '[name].[chunkhash].js',
    },
    module: {
        rules: [{
                test: /\.(png|woff|woff2|eot|ttf|svg|pdf|jpg)$/,
                loader: 'url-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                    limit: 8192,
                    context: 'src',
                },
            },
            {
                test: /\.css$/,
                use: [
                    isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\/src\/common\/assets\/style\//,
                use: [
                    isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: function () {
                                return [require('autoprefixer')];
                            },
                        },
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.jsx$|\.js$/,
                include: /src/,
                exclude: [/axios/, /node_modules/, /src\/common\/assets/],
                loader: 'babel-loader',
            },
        ],
        noParse: [require.resolve('lodash')],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/common/assets/index.ejs',
            minify: {
                collapseWhitespace: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.APP_ENV),
        }),
    ],
    resolve: {
        alias: {
            '@common': __dirname + '/src/common',
            '@page': __dirname + '/src/page',
            '@domain': __dirname + '/src/domain',
        },
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx', '.scss', '.css'],
    },
    optimization: {
        minimize: isDev() ? false : true,
        splitChunks: {
            chunks: 'initial',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                common: {
                    test: /.js$/,
                    name: 'common',
                    chunks: 'initial',
                    priority: 2,
                    minChunks: 2, // 最小引用次数
                    reuseExistingChunk: true,
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                },
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                exclude: /\.min\.js$/,
                cache: true,
                parallel: true,
                sourceMap: false,
                extractComments: false,
                uglifyOptions: {
                    compress: {
                        unused: true,
                        drop_debugger: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};

if (isDev()) {
    webpackConfig.plugins.push(
        new webpack.HashedModuleIdsPlugin()
    )
}

if (isProd()) {
    Reflect.deleteProperty(webpackConfig, 'devtool');
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
            chunkFilename: '[id].[chunkhash].css',
        })
    );
}

module.exports = webpackConfig;

function isDev() {
    return process.env.NODE_ENV === 'development';
}

function isProd() {
    return process.env.NODE_ENV === 'production';
}

function getMode() {
    return isDev() ? 'development' : 'production';
}