/*
 * @Author: wangyunbo
 * @Date: 2021-07-01 17:41:36
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-01 17:48:04
 * @Description: file content
 * @FilePath: \dayByday\nodejs\basicRouter.js
 */
// The most basic example of this would be to check if (request.url === 'some/path/here'), and then call a
// function that responds with a new file

const http = require('http');
function index (request, response) {
 response.writeHead(200);
 response.end('Hello, World!');
}
http.createServer(function (request, response) {
 
 if (request.url === '/') {
 return index(request, response);
 }
 response.writeHead(404);
 response.end(http.STATUS_CODES[404]);
}).listen(1337);

// ===========================================routes object=================================================================================
//  let's store all of our routes in an object:
var routes = {
 '/': function index (request, response) {
 response.writeHead(200);
 response.end('Hello, World!');
 },
 '/foo': function foo (request, response) {
 response.writeHead(200);
 response.end('You are now viewing "foo"');
 }
}
http.createServer(function (request, response) {
 
 if (request.url in routes) {
 return routes[request.url](request, response);
 }
 response.writeHead(404);
 response.end(http.STATUS_CODES[404]);
}).listen(1337);


// =====================================process.env.PORT=====================================================================================
 // if you would like to access this offline while debugging, you can use this:
http.createServer(function(request, response) {
 // your server code
}).listen(process.env.PORT || 3000);
