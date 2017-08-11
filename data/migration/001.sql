CREATE TABLE Usuario (
	Email nvarchar(32) not null Primary key,
	Senha nvarchar(32) not null,
	Perfil nvarchar(32) not null
);

CREATE TABLE Produto (
	Id INTEGER not null Primary key,
    Nome nvarchar(32) not null,
    Preco INTEGER not null
);

CREATE TABLE Carrinho (
    Id INTEGER not null Primary key,
    Email nvarchar(32),
    Produto_Id INTEGER,
    FOREIGN KEY(Email) REFERENCES Usuario(Email),
    FOREIGN KEY(Produto_Id) REFERENCES Produto(Id)
);

CREATE TABLE ChaveLogin (
    Id nvarchar(32) not null Primary key,
	DataExpiracao nvarchar(32),
    Email nvarchar(32),
    FOREIGN KEY(Email) REFERENCES Usuario(Email)
);


INSERT INTO Usuario VALUES ('admin', 'admin', 'admin');
INSERT INTO Produto VALUES (null, 'Apple watch', 3000);
INSERT INTO Produto VALUES (null, 'Moto 360', 1600);