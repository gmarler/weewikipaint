// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");
var server;


exports.start = function() {
    server = http.createServer();

    server.on("request", function(request, response) {
        // response.statusCode = 404;
        // Don't forget to end the response
        response.end("Hello World");
    });

    server.listen(8080);  // TODO: Remove duplication
};

exports.stop = function(callback) {
    server.close(callback);
};