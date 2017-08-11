var urlServidor = "http://localhost:1010/";

var master =
{
    request:function(config,callback,rq)
    {

        var req = {chave:master.getCookie("chave"),request:rq};

        $.ajax({
            url: config.Url,
            type: config.Type,
            data: JSON.stringify(req),
            success: function(data) {
                var response = JSON.parse(data);
                if(response.Status == "OK")
                    callback(response);
                else
                {
                    alert(response.Response);
                    window.location.href = "login.html";
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus + jqXHR.responseText);
            }
        });
    },

    setCookie:function(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + ";path=/";
    },

    getCookie:function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

function ImAdm(){
    return master.getCookie("perfil") == "admin";
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function RequestModel(type,url)
{
    this.Type = type;
    this.Url = url;
}

var type = {GET:"GET",POST:"POST"};

var RequestConfig = 
{
    Login : new RequestModel(type.POST,urlServidor+"Authentication/login"),
    Logout : new RequestModel(type.POST,urlServidor+"Authentication/logout"),
    CadastrarUsuario : new RequestModel(type.POST,urlServidor+"Authentication/register"),
    ConsultarProduto : new RequestModel(type.POST,urlServidor+"produto/consultar"),
    ConsultarProdutosNoCarrinho : new RequestModel(type.POST,urlServidor+"produto/consultarProdutosNoCarrinho"),
    AtualizarProduto : new RequestModel(type.POST,urlServidor+"produto/atualizar"),
    DeletarProduto : new RequestModel(type.POST,urlServidor+"produto/deletar"),
    InserirProduto : new RequestModel(type.POST,urlServidor+"produto/inserir"),
    InserirCarrinho : new RequestModel(type.POST,urlServidor+"carrinho/inserir"),
    LimparCarrinho : new RequestModel(type.POST,urlServidor+"carrinho/limparCarrinho"),
    RetirarProdutoCarrinho : new RequestModel(type.POST,urlServidor+"carrinho/retirarProdutoCarrinho")
}