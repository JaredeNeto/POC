var DataController = require("./data.js");
var service = require("./service.js");
var config = require("./config.js");
var fs = require('fs');

if(fs.existsSync(config.DBPath))
    fs.unlinkSync(config.DBPath);

var dataController = new DataController();

dataController.createDb();

service.start();