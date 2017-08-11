function onDeviceReady() {
    document.getElementById("BtnLogin").addEventListener("click", BtnLoginClick, false);
    document.getElementById("BtnCadastrar").addEventListener("click", BtnCadadstrarClick, false);
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function BtnCadadstrarClick()
{
    window.location.href = "cadastrocliente.html";  
}

function BtnLoginClick()
{
    var usuarioParaLogin = new UsuarioModel(
        document.getElementById("TxtUsuario").value,
        document.getElementById("TxtSenha").value
    );
    master.request(RequestConfig.Login,BtnLoginClickCallback,usuarioParaLogin);

}

function BtnLoginClickCallback(response)
{
        master.setCookie("chave",response.Response.Chave);
        master.setCookie("perfil",response.Response.Perfil);
        window.location.href = "produtos.html";
          
}