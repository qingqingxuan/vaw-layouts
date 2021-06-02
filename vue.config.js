module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/vaw-layouts/dist',
  devServer: {
    hot: true,
    port: 8080,
    open: true
  }
}
