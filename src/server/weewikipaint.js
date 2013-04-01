// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var server = require("./server.js");
    server.start("homepage.html", "404.html", 8080);

    console.log("Server started");
}());