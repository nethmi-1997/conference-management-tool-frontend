const path = require("path");

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js",
        sourceMapFilename: "main.js.map"
    },
    devtool: "source-map",

    target: "node",
    devServer: {
        port: "9500",
        contentBase:["./public"],
        open: true
    },

    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}