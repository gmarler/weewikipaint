// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var server = require("./server.js");
    var http   = require("http");
    var fs = require("fs");
    var assert = require("assert");

    var TEST_FILE = "generated/test/test.html";

    exports.tearDown = function(done) {
        if (fs.existsSync(TEST_FILE)) {
            fs.unlinkSync(TEST_FILE);
            assert.ok(!fs.existsSync(TEST_FILE), "could not delete test file: [" + TEST_FILE + "]");
        }
        done();
    };

    exports.test_ServesHomePageFromFile = function(test) {
        var testDir = "generated/test";
        var expectedData = "This is served from a file";

        fs.writeFileSync(TEST_FILE, expectedData);
        httpGet("http://localhost:8080", function(response,responseData) {
            test.equals(200, response.statusCode, "status code");
            test.equals(expectedData, responseData, "response text");
            test.done();
        });
    };

    exports.test_Returns404ForEverythingExceptHomePage = function(test) {
        httpGet("http://localhost:8080/bargle", function(response, responseData) {
            test.equals(404, response.statusCode, "status code");
            test.done();
        });
    };

    exports.test_ReturnsHomePageWhenAskedForIndex = function(test) {
        var testDir = "generated/test";
        fs.writeFileSync(TEST_FILE, "foo");

        httpGet("http://localhost:8080/index.html", function(response,responseData) {
            test.equals(200, response.statusCode, "status code");
            test.done();
        });

    };

    exports.test_RequiresFileParameter = function(test) {
        test.throws(function() {
            server.start();
        });
        test.done();
    };

    exports.test_RequiresPortNumber = function(test) {
        test.throws(function() {
            server.start(TEST_FILE);
        });
        test.done();
    };

    exports.test_RunsCallbackWhenStopCompletes = function(test) {
        server.start(TEST_FILE, 8080);
        server.stop(function() {
            test.done();
        });
    };

    exports.test_stopThrowsExceptionWhenNotRunning = function(test) {
        test.throws(function() {
            server.stop();
        });
        test.done();
    };

    function httpGet(url, callback) {
        server.start(TEST_FILE, 8080);
        var request = http.get(url);
        request.on("response", function (response) {
            var receivedData = "";
            response.setEncoding("utf8"); // To ensure chunk is a string

            response.on("data", function (chunk) {
                receivedData += chunk;
            });
            response.on("end", function () {
                server.stop(function () {
                    callback(response, receivedData);
                });
            });
        });
    }

}());