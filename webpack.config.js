const argv = require("yargs-parser")(process.argv.slice(2))
const merge = require("webpack-merge")
const mode = argv.mode || "development"
const _modeflag = (mode == "production" ? true : false)
const _mergeConfig = require(`./config/webpack.${mode}.js`)
const glob = require("glob")

let _entry = {}
let _plugins = []
const files = glob.sync("./src/webapp/views/**/*.entry.ts")
const HappyWebpackPlugin = require("./config/happpWebpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {join} = require("path")
const HtmlAfterWebpackPlugin = require("./config/htmlAfterWebpackPlugin")

for(let item of files){
  if(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.ts$)/g.test(item)){
    const entryKey = RegExp.$1
    _entry[entryKey] = item
    const [dist, template] = entryKey.split("-")
    _plugins.push(new HtmlWebpackPlugin({
      filename:`../views/${dist}/pages/${template}.html`,
      template:`src/webapp/views/${dist}/pages/${template}.html`,
      inject: false,
      chunks: [entryKey],
      minify: {
        collapseWhitespace: _modeflag,
        removeAttributeQuotes: _modeflag
      }
    }))
  }
}


let webpackConfig = {
  //本地配置
  entry:_entry,
  module:{
    rules:[{
      test:/\.ts?$/,
      use:'happypack/loader?id=happyTs'
    }]
  },
  output:{
    path: join(__dirname, './dist/assets'),
    publicPath:"/",
    filename: "scripts/[name].bundle.js"
  },
  plugins:[
    ..._plugins,
    ...HappyWebpackPlugin,
    new HtmlAfterWebpackPlugin()
  ],
  resolve:{
    extensions: [".ts", ".css"]
  }


}
module.exports = merge(webpackConfig, _mergeConfig)
