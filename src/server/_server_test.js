// Copyright (c) 2013 gmarler.com. All rights reserved. See LICENSE.txt for details.
"use strict";

var server = require("./server.js");
var assert = require("assert");

exports.testNothing = function(test) {
    test.equals(3, server.number(), "number");
    test.done();
};