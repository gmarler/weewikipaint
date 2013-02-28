// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
"use strict";

var http = require("http");


exports.start = function() {
    var http = require("http");

    var server = http.createServer();

    server.on("request", function(request, response) {

    });

    server.listen(8080);

    console.log("Server started");
};