// path: ./src/api/<api-name>/routes/<router-name>.js

module.exports = {
  routes: [

    {
      method: "POST",
      path: "/payments",
      handler: "payment-controller.yocopay"
    }
  ]
}
