// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.

// launch the server in the same way it happens in production
// get a page
// confirm we got something

// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
(function() {
    "use strict";

    var child_process = require("child_process");

    exports.test_for_smoke = function(test) {
        var command = "node weewikipaint 8080";
        child_process.exec(command, function(error, stdout, stderr) {
            if (error !== null) {
                console.log(stdout);
                console.log(stderr);
                throw error;
            }
            test.done();
        });
    };


    /*function httpGet(url, callback) {    // TODO: duplicated with _server_test.js
        server.start(TEST_HOME_PAGE, TEST_404_PAGE, 8080);
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
    }*/


}());