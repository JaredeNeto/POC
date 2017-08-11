function onDeviceReady() {
    document.getElementById("BtnCadastrar").addEventListener("click", BtnCadastrarClick, false);
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function BtnCadastrarClick()
{

    if(!validateEmail(document.getElementById("TxtUsuario").value))
    {
        alert("Digite um email valido");
        return;
    }
    else if(document.getElementById("TxtSenha").value != null &&
            document.getElementById("TxtSenha").value.length < 6)
    {
        alert("A senha deve ter no minimo seis caracteres");
        return;
    }

    var usuarioParaCadastro = new UsuarioModel(
        document.getElementById("TxtUsuario").value,
        document.getElementById("TxtSenha").value
    );
    master.request(RequestConfig.CadastrarUsuario,BtnCadastrarClickCallback,usuarioParaCadastro);
}

function BtnCadastrarClickCallback(response)
{
        window.location.href = "login.html";  
}