(function() {
  var http, server;

  var qs = require('querystring');
  http = require('http');

  server = http.createServer().listen(process.env.PORT || 5000);

  server.on('request', function(request, response) {
    var callback, callbackName, options, querystring,latitude,longitude;
    querystring = require('url').parse(request.url, true);
    callbackName = querystring.query['callback'];
    longitude = querystring.query['lng'];
    latitude = querystring.query['lat'];
    options = {
      host: 'data.police.uk',
      path: '/api/crimes-street/all-crime?lat=' + latitude + '&lng=' + longitude
    };
    callback = function(rsp) {
      response.write("" + callbackName + "(");
      rsp.on('data', function(chunk) {
        return response.write(chunk.toString());
      });
      console.log(callbackName);
      return rsp.on('end', function() {
        return response.end(')');
      });
    };
    console.log(longitude);
    console.log(latitude);
    return http.request(options, callback).end();
  });

}).call(this);