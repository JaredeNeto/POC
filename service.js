var config = require("./config.js")
var express = require('express');
var cors = require('cors');

function Service()
{
    this.app = express();

    this.start = function(){
        
        this.app.listen(config.WebAPIPort);
        
        var mapper = require("./controller\\mapper.js");
        mapper.forEach(function(cont) {

            Keys = Object.keys(cont.post);

            Keys.forEach(function(key) {
                console.log("iniciado serviço " + '/' + cont.entity + '/' + key);
                this.app.post('/' + cont.entity + '/' + key,cors(), function(req,res){
                    cont.execute = cont.post[key].f;
                    
                    req.on('data', function (data) 
                    {
                        req.body = '' + data; 
                        cont.run(req,res,cont.post[key].precisaAutenticacao);
                    });
                })        
            }, this);



        }, this);    
    };
}

module.exports = new Service();




