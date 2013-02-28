// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");
var server;


exports.start = function() {
    server = http.createServer();

    server.on("request", function(request, response) {
        // Don't forget to end the response
        response.end();
    });

    server.listen(8080);
};

exports.stop = function(callback) {
    server.close(callback);
};