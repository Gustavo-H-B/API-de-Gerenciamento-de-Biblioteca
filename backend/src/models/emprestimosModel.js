const db = require("../config/database");

const listarEmprestimos = async () => {
    const [emprestimos] = await db.query(
        `SELECT emprestimos.id, emprestimos.data_emprestimo, emprestimos.data_devolucao, livros.titulo as "Titulo da Obra", autores.nome_completo as "Autor", usuarios.nome_completo as "Usuário", usuarios.cpf
        FROM emprestimos
        INNER JOIN usuarios ON emprestimos.id_usuario = usuarios.id
        INNER JOIN livros ON emprestimos.id_livro = livros.id
        INNER JOIN autores_livros ON autores_livros.id_livro = livros.id
        INNER JOIN autores ON autores_livros.id_autor = autores.id;`
    );

    return emprestimos;
};

const buscarIdEmprestimo = async (id) => {
    const [emprestimos] = await db.query(
        `SELECT emprestimos.id, emprestimos.data_emprestimo, emprestimos.data_devolucao, livros.titulo as "Titulo da Obra", autores.nome_completo as "Autor", usuarios.nome_completo as "Usuário", usuarios.cpf
        FROM emprestimos
        INNER JOIN usuarios ON emprestimos.id_usuario = usuarios.id
        INNER JOIN livros ON emprestimos.id_livro = livros.id
        INNER JOIN autores_livros ON autores_livros.id_livro = livros.id
        INNER JOIN autores ON autores_livros.id_autor = autores.id
        WHERE emprestimos.id=?;`,
        [id]
    );

    return emprestimos[0];
};

const cadastrarEmprestimo = async (data_emprestimo, data_devolucao, id_livro, id_usuario) => {
    const emprestimo = await db.query(
        "INSERT INTO emprestimos (data_emprestimo, data_devolucao, id_livro, id_usuario) VALUES (?, ?, ?, ?);",
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
        "UPDATE emprestimos SET data_emprestimo=?, data_devolucao=?, id_livro=?, id_usuario=? WHERE id=?;",
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
        "DELETE FROM emprestimos WHERE id=?;",
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