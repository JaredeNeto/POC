var ControllerBase = require("./controller.js");
var produtoController = new ControllerBase();

var ProdutoRepo = require("..\\data\\repository\\Produto.js");
var ChaveLoginRepo = require("..\\data\\repository\\ChaveLogin.js");

produtoController.entity = 'produto';

produtoController.post = {
    "consultar":{
        "f":function(data){
            produtoController.consultar(data);
        },
        "precisaAutenticacao":true
    },
    "atualizar":{
        "f":function(data){
            produtoController.atualizar(data);
        },
        "precisaAutenticacao":true
    },
    "deletar":{
        "f":function(data){
            produtoController.deletar(data);
        },
        "precisaAutenticacao":true
    },
    "inserir":{
        "f":function(data){
            produtoController.inserir(data);
        },
        "precisaAutenticacao":true
    },
    "consultarProdutosNoCarrinho":{
        "f":function(data){
            produtoController.consultarProdutosNoCarrinho(data);
        },
        "precisaAutenticacao":true
    }
    
    
};

produtoController.consultarProdutosNoCarrinho = function(data){
    ChaveLoginRepo.getChaveByIdSpec(produtoController.pageRQ.chave,produtoController.consultarEmailConsultarProdutosNoCarrinhoCallback);
};

produtoController.consultarEmailConsultarProdutosNoCarrinhoCallback = function(chaves){
    if(chaves.length>0)
        ProdutoRepo.consultarProdutosNoCarrinho(chaves[0].Email,produtoController.ConsultarProdutosNoCarrinhoCallback);
    else
        ProdutoRepo.ThrowException();
};

produtoController.ConsultarProdutosNoCarrinhoCallback = function(produtos){
    produtoController.callback(produtos);
};

produtoController.consultar = function(data){
    ProdutoRepo.consultar(data,produtoController.consultarCallback);
};

produtoController.consultarCallback = function(produtos){
    produtoController.callback(produtos);
};

produtoController.atualizar = function(){
    ProdutoRepo.atualizar(produtoController.pageRQ.request,produtoController.atualizarCallback);
};

produtoController.atualizarCallback = function(){
    produtoController.callback();
};

produtoController.deletar = function(){
    ProdutoRepo.deletar(produtoController.pageRQ.request.Id,produtoController.deletarCallback);
};

produtoController.deletarCallback = function(){
    produtoController.callback();
};

produtoController.inserir = function(){
    ProdutoRepo.inserir(produtoController.pageRQ.request,produtoController.inserirCallback);
};

produtoController.inserirCallback = function(){
    produtoController.callback();
};

module.exports = produtoController;