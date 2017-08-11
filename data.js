//var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var config = require("./config.js");

module.exports = class Data
{
    constructor()
    {
        this.sqlite3 = require('sqlite3').verbose();
        this.db = null;

        //if(fs.existsSync(config.DBPath))
        //    this.db = this.sqlite3.connect(config.DBPath); 
        //else
        this.db = new this.sqlite3.Database(config.DBPath);

        this.entity = null;
    }

    createDb()
    {
        fs.readdirSync(config.MigrationPath).filter(f => this.runFileScript(config.MigrationPath + f));
    };
    
    get(callback)
    {
        var command = "SELECT * FROM " + this.entity;

        this.db.all(command, function(err, rows) {
            callback(rows);
        });
    };

    deletar(chave,callback)
    {
        var command = "DELETE FROM " + this.entity +
                    " WHERE Id='" + chave + "'";

        ChaveLoginRepository.db.run(command);

        callback();
    };

    runFileScript(arquivo)
    {
        console.log("Executando script "+ arquivo);
        var command = fs.readFileSync(arquivo,'utf8');
        this.db.exec(command);
    }

}
    
