const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/1/upload",
    createProxyMiddleware({
      target: "https://api.imgbb.com",
      changeOrigin: true,
      pathRewrite: {
        "^/1/upload": "/1/upload",
      },
    })
  );
};
