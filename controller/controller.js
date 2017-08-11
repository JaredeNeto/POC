var serializer = require("node-serialize");
var ChaveLoginRepo = require("..\\data\\repository\\ChaveLogin.js");


module.exports = class Controller 
{
    
    constructor()
    {
        this.result=null;
        this.pageRQ = null;
        this.post = null;
        this.get = null;
        this.entity = null;
        this.result=function(){};
        this.execute=function(){};
    }
    
    run(req,res,precisaAutenticacao){

        this.result = res;

        this.pageRQ = JSON.parse(req.body);

        console.log("Iniciado controller " + this.entity);

        if(precisaAutenticacao)  
        {
            ChaveLoginRepo.getChaveById(this.pageRQ.chave,this, "executaSeLogado");
        }
        else
        {
            this.execute(this.pageRQ.request);
        }

    };

    executaSeLogado(chave){
        if(chave.length > 0)  
            this.execute(this.pageRQ);
        else
            this.ThrowException();
    };

    callback(retorno){
        var retorno = {Status:"OK",Response:retorno};
        this.result.json(serializer.serialize(retorno));
    };

    ThrowException()
    {
        var retorno = {Status:"Erro",Response:"Serviço indisponivel no momento"};
        this.result.json(serializer.serialize(retorno));
    };

}


