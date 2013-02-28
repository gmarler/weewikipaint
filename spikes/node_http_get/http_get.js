// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.


// This spike shows how to get a URL using Node's HTTP module.
"use strict";

var http = require("http");

http.get("http://www.google.com/index.html", function(res) {
    console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
        console.log("Got error: " + e.message);
    });