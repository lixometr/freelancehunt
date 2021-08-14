const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const production = process.env.NODE_ENV === "production";
module.exports = {
  mode: "production",
  entry: {
    scripts: "./src/js/scripts.js",
    styles: "./src/css/styles.css",
    dark: "./src/css/dark.css",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "esbuild-loader",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: production,
    minimizer: [
      new ESBuildMinifyPlugin({
        css: true,
      }),
    ],
  },
  plugins: [
    production ? new CleanWebpackPlugin() : false,
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    }),

    new HandlebarsPlugin({
      // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
      entry: path.join(process.cwd(), "src", "*.hbs"),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), "dist", "[name].html"),
      // you can also add a [path] variable, which will emit the files with their relative path, like
      // output: path.join(process.cwd(), "build", [path], "[name].html"),

      // globbed path to partials, where folder/filename is unique
      partials: [path.join(process.cwd(), "src", "partials", "*.hbs")],
    }),
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/img"),
          to: "img",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
  ].filter(Boolean),

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
  },
  devtool: production ? "eval" : 'source-map',
  mode: production ? "production" : "development",
};
