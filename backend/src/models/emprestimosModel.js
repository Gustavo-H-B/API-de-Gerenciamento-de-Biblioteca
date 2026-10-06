const db = require("../config/database");

const listarEmprestimos = async () => {
    const [emprestimos] = await db.query(
        //fazer em join
    );

    return emprestimos;
};

const buscarIdEmprestimo = async (id) => {
    const [emprestimos] = await db.query(
        //fazer em join
    );

    return emprestimos;
};

const cadastrarEmprestimo = async (data_emprestimo, data_devolucao, id_livro, id_usuario) => {
    const emprestimo = await db.query(
        "INSERT INTO emprestimos (data_emprestimo, data_devolucao, id_livro, id_usuario) VALUES (?, ?, ?, ?);"
        [data_emprestimo, data_devolucao, id_livro, id_usuario]
    );

    return {
        id : emprestimo.insertId,
        data_emprestimo,
        data_devolucao,
        id_livro,
        id_usuario
    };
};

const atualizarEmprestimo = async (id, data_emprestimo, data_devolucao, id_livro, id_usuario) => {
    await db.query(
        "UPDATE emprestimos SET data_emprestimo=?, data_devolucao=?, id_livro=?, id_usuario=? WHERE id=?;"
        [data_emprestimo, data_devolucao, id_livro, id_usuario, id]
    );

    return {
        data_emprestimo,
        data_devolucao,
        id_livro,
        id_usuario
    };
};

const deletarEmprestimo = async (id) => {
    const emprestimo = await db.query(
        "DELETE FROM emprestimos WHERE id=?;"
        [id]
    );

    return emprestimo.affectedRows;
};

module.exports = {
    listarEmprestimos,
    buscarIdEmprestimo,
    cadastrarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo
};