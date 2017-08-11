var ControllerBase = require("./controller.js");
var authenticationController = new ControllerBase();

var ChaveLoginRepo = require("..\\data\\repository\\ChaveLogin.js");
var UsuarioRepo = require("..\\data\\repository\\Usuario.js");

authenticationController.entity = 'Authentication';

authenticationController.post = {
    "login":{
        "f":function(data){
            authenticationController.login(data);
        },
        "precisaAutenticacao":false
    },
    "register":{
        "f":function(data){
            authenticationController.CadastrarUsuario(data);
        },
        "precisaAutenticacao":false
    },
    "logout":{
        "f":function(data){
            authenticationController.logout(data);
        },
        "precisaAutenticacao":true
    }
};

authenticationController.logout = function(data){
    ChaveLoginRepo.deletechave(data.chave,authenticationController.logoutCallback);
};

authenticationController.logoutCallback = function(data){
    authenticationController.callback();
};

authenticationController.login = function(data){
    UsuarioRepo.getUsuarioByEmail(data,authenticationController.loginCallback);
};

authenticationController.loginCallback = function(Usuario){
    if(Usuario.length > 0)
    {
        ChaveLoginRepo.cadastrarChave(Usuario[0], authenticationController.cadastrarChaveCallback);
    }
    else
        authenticationController.ThrowException();
};

authenticationController.cadastrarChaveCallback = function(chave){
    authenticationController.callback(chave);
};


authenticationController.CadastrarUsuario = function(data){
    UsuarioRepo.cadastrarUsuario(data,authenticationController.CadastrarUsuarioCallback);
};

authenticationController.CadastrarUsuarioCallback = function(data){
    authenticationController.callback();
};

module.exports = authenticationController;