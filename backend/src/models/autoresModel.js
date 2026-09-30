const db = require("../config/database");

const listarAutores = async () => {
    const [autores] = await db.query(
        "SELECT * FROM autores;"
    );

    return autores;
};

const buscarIdAutor = async (id) => {
    const [autores] = await db.query(
        "SELECT * FROM autores WHERE id = ?;",
        [id]
    );

    return autores[0];
};

const cadastrarAutor = async (nome, nacionalidade, nascimento) => {
    const autor = await db.query(
        "INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES (?, ?, ?)",
        [nome, nacionalidade, nascimento]
    );

    return {
        id: autor.insertId,
        nome,
        nacionalidade,
        nascimento
    };
};

const atualizarAutor = async (id, nome, nacionalidade, nascimento) => {
    
};

const deletarAutor = async (id) => {
    
};

module.exports = {
    listarAutores,
    buscarIdAutor,
    cadastrarAutor,
    atualizarAutor,
    deletarAutor
};