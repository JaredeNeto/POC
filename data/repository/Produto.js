var DataController = require("..\\..\\data.js");
ProdutoRepository = new DataController();

ProdutoRepository.entity = "Produto";

ProdutoRepository.consultar = function(consulta,callback)
{
    var command = "SELECT Produto.* " + 
    "FROM Produto "+
    "left JOIN Carrinho ON Produto.Id = Carrinho.Produto_Id ";
    
    if(consulta.request!=null && consulta.request.Clausula!=null)
    {
        command += "Where Produto.Nome LIKE '%" + consulta.request.Clausula + "%' ";
        command += "AND Carrinho.Id IS NULL ";
    }
    else
    {
        command += "Where Carrinho.Id IS NULL ";
    }
        
    command += "Group by Produto.Id ";

    console.log(command);

    ProdutoRepository.db.all(command, function(err, rows) {
        console.log(rows);
        callback(rows);
    });
};

ProdutoRepository.consultarProdutosNoCarrinho = function(email,callback)
{
    var command = "SELECT Produto.* " + 
    "FROM Produto "+
    "inner JOIN Carrinho ON Produto.Id = Carrinho.Produto_Id "+
    "where Carrinho.Email = '" + email + "' "+
    "Group by Produto.Id ";

    console.log(command);

    ProdutoRepository.db.all(command, function(err, rows) {
        callback(rows);
    });
};

ProdutoRepository.atualizar = function(produto,callback)
{
    var command = "UPDATE " + ProdutoRepository.entity +
                " SET Nome='" + produto.Nome + "'," +
                "Preco='" + produto.Preco + "' " +
                "Where Id='" + produto.Id+ "'";

    console.log(command);

    ProdutoRepository.db.run(command);

    callback();
};

ProdutoRepository.inserir = function(produto,callback)
{
    var command = "INSERT INTO " + ProdutoRepository.entity +
                " VALUES (null,'" + produto.Nome + "','" + produto.Preco + "')";

    console.log(command);

    ProdutoRepository.db.run(command);

    callback();
};

module.exports = ProdutoRepository;