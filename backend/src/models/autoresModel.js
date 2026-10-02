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

const cadastrarAutor = async (nome_completo, nacionalidade, data_nascimento) => {
    const autor = await db.query(
        "INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES (?, ?, ?)",
        [nome_completo, nacionalidade, data_nascimento]
    );

    return {
        id: autor.insertId,
        nome_completo,
        nacionalidade,
        data_nascimento
    };
};

const atualizarAutor = async (id, nome_completo, nacionalidade, data_nascimento) => {
    await db.query(
        "UPDATE autores SET nome_completo=?, nacionalidade=?, data_nascimento=? WHERE id=?",
        [nome_completo, nacionalidade, data_nascimento, id]
    );

    return {
        nome_completo,
        nacionalidade,
        data_nascimento
    };
};

const deletarAutor = async (id) => {
    const autor = await db.query(
        "DELETE FROM autores WHERE id=?",
        [id]
    );

    return autor.affectedRows;
};

module.exports = {
    listarAutores,
    buscarIdAutor,
    cadastrarAutor,
    atualizarAutor,
    deletarAutor
};