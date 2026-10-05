const db = require("../config/database");

const listarUsuarios = async () => {
    const [usuarios] = await db.query(
        "SELECT * FROM usuarios;"
    );

    return usuarios;
};

const buscarIdUsuario = async (id) => {
    const [usuarios] = await db.query(
        "SELECT * FROM usuarios WHERE id=?;"
        [id]
    );

    return usuarios[0];
};

const cadastrarUsuario = async (nome_completo, cpf, email, telefone, data_nascimento) => {
    const usuario = await db.query (
    "INSERT INTO usuarios (nome_completo, cpf, email, telefone, data_nascimento) VALUES (?, ?, ?, ?, ?);"
    [nome_completo, cpf, email, telefone, data_nascimento]
    );

    return {
        id : usuario.insertId,
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    };
};

const atualizarUsuario = async (id, nome_completo, cpf, email, telefone, data_nascimento) => {
    await db.query(
        "UPDATE usuarios SET nome_completo=?, cpf=?, email=?, telefone=?, data_nascimento=? WHERE id=?;"
        [nome_completo, cpf, email, telefone, data_nascimento, id]
    );

    return {
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    };
};

const deletarUsuario = async (id) => {
    const usuario = await db.query(
        "DELETE FROM usuarios WHERE id=?;"
        [id]
    );

    return usuario.affectedRows;
};

module.exports = {
    listarUsuarios,
    buscarIdUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
};