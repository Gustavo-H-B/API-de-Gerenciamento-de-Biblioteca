const db = require("../config/database");

const listarUsuarios = async () => {
    const [usuarios] = await db.query(
        "SELECT * FROM usuarios;"
    );

    return usuarios;
};

const buscarIdUsuario = async (id) => {
    const [usuarios] = await db.query(
        "SELECT * FROM usuarios WHERE id=?;",
        [id]
    );

    return usuarios[0];
};

const cadastrarUsuario = async ({nome_completo, cpf, cpf_iv, cpf_tag, email, telefone, senha_hash, senha_salt, data_nascimento}) => {
    const [usuario] = await db.query (
    "INSERT INTO usuarios (nome_completo, cpf, cpf_iv, cpf_tag, email, telefone, senha_hash, senha_salt, data_nascimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [nome_completo, cpf, cpf_iv, cpf_tag, email, telefone, senha_hash, senha_salt, data_nascimento]
    );

    return usuario;
};

const atualizarUsuario = async (id, dados) => {
    const camposPermitidos = [
        "nome_completo",
        "cpf", 
        "cpf_iv", 
        "cpf_tag", 
        "email", 
        "telefone", 
        "senha_hash", 
        "senha_salt", 
        "data_nascimento"
    ];

    const campos = Object.keys(dados);

    if(campos.length === 0 || campos.some(campo => !camposPermitidos.includes(campo))) {
        throw new Error("Dados para atualização inválidos");
    };

    const atribuicoes = campos.map(campo => `${campo} = ?`).join(", ");
    const valores = campos.map(campo => dados[campo]);
    const sql = `
        UPDATE usuarios
        SET ${atribuicoes}
        WHERE id = ?;
    `;

    console.log(sql);
    const [resultado] = await db.execute(sql, [...valores, id]);

    return resultado;
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