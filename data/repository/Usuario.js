var DataController = require("..\\..\\data.js");
UsuarioRepository = new DataController();

UsuarioRepository.entity = "Usuario";

UsuarioRepository.getUsuarioByEmail = function(usuario,callback)
{
    var command = "SELECT * FROM " + UsuarioRepository.entity +
                " WHERE email='" + usuario.Email + "' AND " +
                "senha='" + usuario.Senha + "'";
    console.log(command);
    UsuarioRepository.db.all(command, function(err, rows) {
        callback(rows);
    });
};

UsuarioRepository.cadastrarUsuario = function(usuario,callback)
{
    var command = "INSERT INTO " + UsuarioRepository.entity +
                " VALUES('" + usuario.Email + "'," +
                "'" + usuario.Senha + "', 'cliente')";

    UsuarioRepository.db.all(command, function(err, rows) {
        callback(rows);
    });
};

module.exports = UsuarioRepository;