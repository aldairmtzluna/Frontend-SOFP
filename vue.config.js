const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  outputDir: '../sofp2/static/',
  publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
};