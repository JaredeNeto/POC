init();

function onDeviceReady() {
    document.getElementById("BtnVamo").addEventListener("click", vai, false);
    
    $.ajax({
        url: "http://localhost:1010/Authentication/login",
        type: "POST",
        data: '{"Email":"admin","Senha":"admin"}',
        success: function(data) {
            alert(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + jqXHR.responseText);
        }
    });
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function vai()
{
    alert("asd");
}