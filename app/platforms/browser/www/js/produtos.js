function onDeviceReady() {
    document.getElementById("BtnConsultar").addEventListener("click", BtnConsultarClick, false);
    document.getElementById("BtnLogout").addEventListener("click", Logout, false);
    document.getElementById("BtnFinalizarCompra").addEventListener("click", FinalizarCarrinho, false);
    
    
    if(ImAdm())
    {
        document.getElementById("LbCar").style.display = "none";
        document.getElementById("TbCar").style.display = "none";
        document.getElementById("BtnFinalizarCompra").style.display = "none";
    }
        

    ConsultarProdutos();
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function BtnConsultarClick()
{
    var request = new BuscaModel(document.getElementById("TxtConsulta").value);
    ConsultarProdutos(request);
}

function Logout()
{
    master.request(RequestConfig.Logout,LogoutCallback);
}

function LogoutCallback()
{
    window.location.href = "login.html";  
}

function atualizarGridProduto(produtos,perfil)
{
    document.getElementById('TbProdutos').innerHTML = "";

    if(ImAdm())
    {
        
        document.getElementById('TbProdutos').innerHTML += "<tr><th scope='row'><input type='text' id='TxtNomeProdutoCriar'></input></th><td><input type='text' id='TxtPrecoProdutoCriar'></input></td><td><button class='btn btn-primary' type='button' onclick='criarProduto()'><span class='glyphicon glyphicon-plus'></span></button></td></tr>";

        for(var produto in produtos)
        {
            document.getElementById('TbProdutos').innerHTML += "<tr id='"+produtos[produto].Id+"'><th scope='row'><input type='text' onblur='alterarProduto("+produtos[produto].Id+")' id='TxtNomeProduto"+produtos[produto].Id+"'></input></th><td><input type='text'  onblur='alterarProduto("+produtos[produto].Id+")' id='TxtPrecoProduto"+produtos[produto].Id+"'></input></td><td></td></tr>";
        } 
        
        for(var produto in produtos)
        {
            document.getElementById("TxtNomeProduto"+produtos[produto].Id).value = produtos[produto].Nome;
            document.getElementById("TxtPrecoProduto"+produtos[produto].Id).value = produtos[produto].Preco;
        } 
    }
    else
    {
        for(var produto in produtos)
        {
            document.getElementById('TbProdutos').innerHTML += "<tr id='"+produtos[produto].Id+"'><th scope='row'>"+produtos[produto].Nome+"</th><td>"+produtos[produto].Preco+"</td><td><button class='btn btn-primary' type='button' onclick='AdicionarProdutoNoCarrinho(" + JSON.stringify(produtos[produto]) + ")'><span class='glyphicon glyphicon-shopping-cart'></span></button></td></tr>";
        } 
    }  

}

function alterarProduto(id){
    var produto = new ProdutoModel(id,
        document.getElementById("TxtNomeProduto"+id).value,
        document.getElementById("TxtPrecoProduto"+id).value)
    
    master.request(RequestConfig.AtualizarProduto,alterarProdutoCallback,produto);
}

function alterarProdutoCallback()
{
    ConsultarProdutos();
}

function retirarProdutoCarrinho(produto)
{
    master.request(RequestConfig.RetirarProdutoCarrinho,retirarProdutoCarrinhoCallback,produto);
}

function retirarProdutoCarrinhoCallback()
{
    ConsultarProdutos();
}

function criarProduto(){
    if(document.getElementById("TxtNomeProdutoCriar").value == "" ||
        document.getElementById("TxtPrecoProdutoCriar").value == "")
        {
            alert("Preencha os campos Nome e Preço para adicionar um produto");
            return;
        }
    else if(isNaN(document.getElementById("TxtPrecoProdutoCriar").value))
        {
            alert("Preencha o campo Preço com um valor numerico para adicionar um produto");
            return;
        }
        

    var produto = new ProdutoModel(null,
        document.getElementById("TxtNomeProdutoCriar").value,
        document.getElementById("TxtPrecoProdutoCriar").value)
    
    master.request(RequestConfig.InserirProduto,criarProdutoCallback,produto);
}

function criarProdutoCallback()
{
    ConsultarProdutos();
}


function atualizarGridCarrinho(produtos,perfil)
{
    document.getElementById('TbCarrinho').innerHTML = "";

    if(!ImAdm())
    {
        for(var produto in produtos)
        {
            document.getElementById('TbCarrinho').innerHTML += "<tr id='"+produtos[produto].Id+"'><td>"+produtos[produto].Nome+"</td><td>"+produtos[produto].Preco+"</td><td><button class='btn btn-danger' type='button' onclick='retirarProdutoCarrinho("+JSON.stringify(produtos[produto])+")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
        } 
    }
}


function FinalizarCarrinho()
{
    master.request(RequestConfig.LimparCarrinho,AdicionarNoCarrinhoCallback);
}

function FinalizarCarrinhoCallback()
{
    ConsultarProdutos();
}

function AdicionarProdutoNoCarrinho(produto)
{
    master.request(RequestConfig.InserirCarrinho,AdicionarNoCarrinhoCallback,produto);
}

function AdicionarNoCarrinhoCallback()
{
    ConsultarProdutos();
}

function ConsultarProdutosNoCarrinho()
{
    master.request(RequestConfig.ConsultarProdutosNoCarrinho,ConsultarProdutosNoCarrinhoCallback);
}

function ConsultarProdutosNoCarrinhoCallback(response)
{
    atualizarGridCarrinho(response.Response);
}

function ConsultarProdutos(clausula)
{
    master.request(RequestConfig.ConsultarProduto,ConsultarProdutosCallback,clausula);
}

function ConsultarProdutosCallback(response)
{
    atualizarGridProduto(response.Response);
    ConsultarProdutosNoCarrinho();
}