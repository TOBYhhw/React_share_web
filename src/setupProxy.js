const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://119.23.54.229:8082',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '^/api': '' }
        })
    )
}