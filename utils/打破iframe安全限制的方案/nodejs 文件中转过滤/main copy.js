const express = require('express'); //1
const server = express(); //2
const request = require('request');

server.get('/test', (req, res) => {
  //3

  request(
    {
      url:
        'https://org.modao.cc/app/21eea413995215e75dcf59f6c461fdf124895b82?simulator_type=device&sticky',
      method: 'get',
      // json: true,
      headers: {
        'Host': 'org.modao.cc'
      }
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); 
        res.send(body)
      }
    }
  );

  // res.redirect(
  //   'https://org.modao.cc/app/21eea413995215e75dcf59f6c461fdf124895b82?simulator_type=device&sticky'
  // );
});

server.listen(3000); //4
