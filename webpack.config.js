const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const path = require('path')

module.exports = {
    entry: "./src/main.tsx",
    mode: process.env.ENV,
    devtool: process.env.ENV === "production" ? false : "source-map",
    output: {
        clean: true,
        filename: './js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "assets/[name].[hash:8][ext]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].[chunkhash:8].css',
        })
    ],
    devServer: {
        hot: true,
        // open: true,
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".less"],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, // 只进行编译
                            allowTsInNodeModules: true,
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            filename: '[name].[chunkhash].css',
                            insert: 'top'
                        }
                    }, 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        modules: {
                            auto: true
                        }
                    }
                }, {
                    loader: "less-loader",
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                        }
                    }
                }]
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true
                            }
                        }
                    }, "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource'
            }
        ],
    },
    optimization: {
        minimize : true,
        concatenateModules: true,
        minimizer: [
            new CssMinimizerPlugin(),
            '...'
        ],
        usedExports: true,
        splitChunks: {
            chunks: 'async',
            minSize: 2000,
            minChunks: 1,
            maxSize: 200000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    }
}