function UsuarioModel(email,senha)
{
    this.Email = email;
    this.Senha = senha;
}

function ProdutoModel(id,nome,preco)
{
    this.Id = id
    this.Nome = nome;
    this.Preco = preco;
}

function BuscaModel(clausula)
{
    this.Clausula = clausula;
}
