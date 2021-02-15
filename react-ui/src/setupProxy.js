const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    [
      "/users/history",
      "/users/get_user",
      "/users/show_history",
      "/users/create_user",
      "/users/delete_users",
      "/users/delete_history",
      "/users/transfer",
      "/users/transfer_money"
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: false,
    })
  );
};
