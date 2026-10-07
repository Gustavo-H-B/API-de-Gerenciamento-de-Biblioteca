const db = require("../config/database");

const listarGeneros = async () => {
    const [generos] = await db.query(
        "SELECT * FROM generos;"
    );

    return generos;
};

const buscarIdGenero = async (id) => {
    const [generos] = await db.query(
        "SELECT * FROM generos WHERE id=?;",
        [id]
    );

    return generos[0];
};

const cadastrarGenero = async (nome) => {
    const genero = await db.query(
        "INSERT INTO generos (nome) VALUES (?);",
        [nome]
    );

    return {
        id : genero[0].insertId,
        nome
    };
};

const atualizarGenero = async (id, nome) => {
    await db.query(
        "UPDATE generos SET nome=? WHERE id=?;",
        [nome, id]
    );

    return {
        nome
    };
};

const deletarGenero = async (id) => {
    const genero = await db.query(
        "DELETE FROM generos WHERE id=?",
        [id]
    );

    return genero.affectedRows;
};

module.exports = {
    listarGeneros,
    buscarIdGenero,
    cadastrarGenero,
    atualizarGenero,
    deletarGenero
};