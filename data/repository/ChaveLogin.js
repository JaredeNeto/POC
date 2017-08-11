var DataController = require("..\\..\\data.js");
ChaveLoginRepository = new DataController();

ChaveLoginRepository.entity = "ChaveLogin";

ChaveLoginRepository.getChaveById = function(chave,obj,func)
{
    var command = "SELECT * FROM " + ChaveLoginRepository.entity +
                " WHERE Id='" + chave + "'";

    ChaveLoginRepository.db.all(command, function(err, rows) {
        ex(obj,func,rows);
    });
};

ChaveLoginRepository.getChaveByIdSpec = function(chave,callback)
{
    var command = "SELECT * FROM " + ChaveLoginRepository.entity +
                " WHERE Id='" + chave + "'";

    ChaveLoginRepository.db.all(command, function(err, rows) {
        callback(rows);
    });
};

ChaveLoginRepository.cadastrarChave = function(usuario,callback)
{
    var token = Math.random().toString(36);
    
    var date = new Date();
    date.setMinutes(date.getMinutes() + 30);

    var command = "INSERT INTO " + ChaveLoginRepository.entity +
                " VALUES('" + token + "','"
                 + JSON.stringify(date) + "', '" + usuario.Email + "')";

    ChaveLoginRepository.db.run(command);
    
    
    callback({"Chave":token,"Perfil":usuario.Perfil});
};

ChaveLoginRepository.deletechave = function(chave,callback)
{

    var command = "DELETE FROM " + ChaveLoginRepository.entity +
                " WHERE Id='" + chave + "'";

    ChaveLoginRepository.db.run(command);

    callback();
};

function ex(obj, func,param) {
    if (obj[func] && obj[func] instanceof Function) {
        obj[func](param);
    }
}

module.exports = ChaveLoginRepository;