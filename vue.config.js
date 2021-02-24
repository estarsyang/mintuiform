//不熟悉配置的可官网查看 https://cli.vuejs.org/zh/config/#pages
module.exports = {
  lintOnSave: true,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  productionSourceMap: false
}