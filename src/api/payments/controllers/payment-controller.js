"use strict";


module.exports = {

  "yocopay": async (ctx) => {

    const axios = require('axios');
    let response = {'status': '', 'data' : ''};
    let body = JSON.parse(ctx.request.body);
    let token = body.token;
    let amount = body.amount;

    // Anonymous test key. Replace with your key.
    const SECRET_KEY = 'sk_live_9614cf01gE13NoPc9804f85b1d7d'

    await axios.post(
      'https://online.yoco.com/v1/charges/',

        {
          'token': token,
          'amountInCents': amount,
          'currency': 'ZAR',
        },
        {
          headers: {
            'X-Auth-Secret-Key': SECRET_KEY,
          },
        },

    )
    .then(res => {

      response.data = res.data;
      response.status = res.status;
      ctx.response.status = res.status;
      ctx.response.body = res.data
      return response;
    })
    .catch(error => {
      // handle errors
      response.data  = { "message" : "Internal Server Error"};
      response.status = 500;
      ctx.response.status = { "message" : "Internal Server Error"};
      ctx.response.body = 500
      return response;
    });
    console.log(ctx.response.body);
    return ctx.response.body;
  }

}
