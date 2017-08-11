var DataController = require("..\\..\\data.js");
CarrinhoRepository = new DataController();

CarrinhoRepository.entity = "Carrinho";

CarrinhoRepository.inserir = function(email,produtoId,callback)
{
    var command = "INSERT INTO " + CarrinhoRepository.entity +
                " VALUES (null,'" + email + "','" + produtoId + "')";

    console.log(command);

    CarrinhoRepository.db.run(command);

    callback();
};



CarrinhoRepository.finalizarCarrinho = function(email,callback)
{

    var command = "SELECT * FROM " + CarrinhoRepository.entity +
        " WHERE Email='" + email + "'";

    console.log(command);
    CarrinhoRepository.db.all(command,function(err,rows){

        var listaIdProduto = "";

        for(var produto in rows)
        {
            listaIdProduto += "'"+rows[produto].Id+"',";
        }
        
        listaIdProduto = listaIdProduto.substring(0,listaIdProduto.lastIndexOf(","))

        var cmd = "DELETE FROM " + CarrinhoRepository.entity +
            " WHERE Produto_Id  IN (" + listaIdProduto + "); "+
            "DELETE FROM Produto " +
            "WHERE Id  IN (" + listaIdProduto + ")";
        
        console.log("SQL ma " + cmd);

        CarrinhoRepository.db.exec(cmd);

        callback();
    });
    
};

CarrinhoRepository.retirarProdutoCarrinho = function(produto,callback)
{
    console.log(produto);
    
    var command = "DELETE FROM " + CarrinhoRepository.entity +
                " WHERE Produto_Id='" + produto.Id + "'";
    
    console.log(command);

    CarrinhoRepository.db.run(command);

    callback();
};

module.exports = CarrinhoRepository;