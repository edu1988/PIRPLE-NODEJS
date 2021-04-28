/*
 * Primary file for API
 * Author: Eduardo Pérez (With Pirple Help)
 */

// Dependencies
var http = require('http');
var url = require('url');

// Configure the server to respond to all requests with a string
var server = http.createServer(function (req, res) {

    // Parse the url
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');


    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    var data = 'nothing';
    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {

        // Use the status code returned from the handler, or set the default status code to 200
        statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

        // Use the payload returned from the handler, or set the default payload to an empty object
        payload = typeof (payload) == 'object' ? payload : {
            'response': '404 not found'
        };

        // Convert the payload to a string
        var payloadString = JSON.stringify(payload);

        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

    });
});

// Start the server
server.listen(2000, function () {
    console.log('The server is up and running on port 2000');
});

// Define all the handlers
var handlers = {};

// Sample handler
handlers.hello = function (data, callback) {
    callback(200, {
        'Welcome Message': 'Hi, wellcome to this great Master Class of Node Js. You\'ll be so gratefull'
    });
};

// Not found handler
handlers.notFound = function (data, callback) {
    callback(404);
};

// Define the request router
var router = {
    'hello': handlers.hello
};