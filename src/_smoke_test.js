// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.

// launch the server in the same way it happens in production
// get a page
// confirm we got something

// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var child_process = require("child_process");
    var http          = require("http");
    var child;

    exports.setUp = function(done) {
        runServer(done);
    };

    exports.tearDown = function(done) {
        child.on("exit", function(code, signal) {
            done();
        });
        child.kill();
    };

    exports.test_canGetHomePage = function (test) {
        httpGet("http://localhost:8080", function (response, receivedData) {
            var foundHomePage = receivedData.indexOf("WeeWikiPaint home page") !== -1;
            test.ok(foundHomePage, "home page should have contained test marker");
            test.done();
        });
    };

    exports.test_canGet404Page = function(test) {
        httpGet("http://localhost:8080/nonexistent.html", function (response, receivedData) {
            var foundHomePage = receivedData.indexOf("WeeWikiPaint 404 page") !== -1;
            test.ok(foundHomePage, "404 page should have contained test marker");
            test.done();
        });
    };

    function runServer(callback) {
        child = child_process.spawn("node", ["src/server/weewikipaint", "8080"]);
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", function(chunk) {
            if (chunk.trim() === "Server started") callback();
        });
    }

    function httpGet(url, callback) {
        var request = http.get(url);
        request.on("response", function (response) {
            var receivedData = "";
            response.setEncoding("utf8"); // To ensure chunk is a string

            response.on("data", function (chunk) {
                receivedData += chunk;
            });
            response.on("end", function () {
                callback(response, receivedData);
            });
        });
    }

}());