var ControllerBase = require("./controller.js");
var carrinhoController = new ControllerBase();

var ChaveLoginRepo = require("..\\data\\repository\\ChaveLogin.js");
var CarrinhoRepo = require("..\\data\\repository\\Carrinho.js");

carrinhoController.entity = 'Carrinho';

carrinhoController.post = {
    "inserir":{
        "f":function(data){
            carrinhoController.inserir(data);
        },
        "precisaAutenticacao":true
    },
    "limparCarrinho":{
        "f":function(data){
            carrinhoController.limparCarrinho(data);
        },
        "precisaAutenticacao":true
    },
    "retirarProdutoCarrinho":{
        "f":function(data){
            carrinhoController.retirarProdutoCarrinho(data);
        },
        "precisaAutenticacao":true
    }
    
};

carrinhoController.inserir = function(){
    ChaveLoginRepo.getChaveByIdSpec(carrinhoController.pageRQ.chave,carrinhoController.getChaveByIdCallback);
};

carrinhoController.getChaveByIdCallback = function(chaves){
    if(chaves.length>0)
        CarrinhoRepo.inserir(chaves[0].Email,
                                carrinhoController.pageRQ.request.Id,
                                carrinhoController.inserirCarrinhoCallback);
    else
        CarrinhoRepo.ThrowException();
};

carrinhoController.inserirCarrinhoCallback = function(chaves){
    carrinhoController.callback();
};

carrinhoController.limparCarrinho = function()
{
    ChaveLoginRepo.getChaveByIdSpec(carrinhoController.pageRQ.chave,carrinhoController.getEmailLimparCarrinhoCallback);
}

carrinhoController.getEmailLimparCarrinhoCallback = function(chaves)
{
        if(chaves.length>0)
            CarrinhoRepo.finalizarCarrinho(chaves[0].Email,
                                carrinhoController.finalizarCarrinhoCallback);
        else
            CarrinhoRepo.ThrowException();
}

carrinhoController.finalizarCarrinhoCallback = function(chaves){
    carrinhoController.callback();
};

carrinhoController.retirarProdutoCarrinho = function(){
    CarrinhoRepo.retirarProdutoCarrinho(carrinhoController.pageRQ.request,carrinhoController.retirarProdutoCarrinhoCallback);
};

carrinhoController.retirarProdutoCarrinhoCallback = function(){
    carrinhoController.callback();
};




module.exports = carrinhoController;