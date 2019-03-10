// express is the server that forms part of the nodejs program
var express = require('express');
var path = require("path");
var app = express(); 
 // add an http server to serve files to the Edge browser
 // due to certificate issues it rejects the https files if they are not
 // directly called in a typed URL
 var http = require('http');
 var httpServer = http.createServer(app);
 httpServer.listen(4480);
 app.get('/',function (req,res) {
 res.send("hello world from the HTTP server");
 });

 // adding functionality to log the requests of files
 app.use(function (req, res, next) {
 var filename = path.basename(req.url);
 var extension = path.extname(filename);
 console.log("The file " + filename + " was requested.");
 next();
 }); 

//cross-origin request-can make requests from this server via another server (PhoneGap)
 app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 next();
 }); 

//can request any file on the server e.g. in sub-directories and different directorys 
// serve static files - e.g. html, css
// this should always be the last line in the server file
app.use(express.static(__dirname)); 

