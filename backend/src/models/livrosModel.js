const db = require("../config/database");

const listarLivros = async () => {
    const [livros] = await db.query(
        "SELECT * FROM livros;"
    );

    return livros;
};

const buscarIdLivro = async (id) => {
    const [livros] = await db.query(
        "SELECT * FROM livros WHERE id=?;",
        [id]
    );

    return livros[0];
};

const cadastrarLivro = async (titulo, isbn, ano_publicado, numero_paginas, sinopse) => {
    const livro = await db.query(
        "INSERT INTO livros (titulo, isbn, ano_publicado, numero_paginas, sinopse) VALUES (?, ?, ?, ?, ?)",
        [titulo, isbn, ano_publicado, numero_paginas, sinopse]
    );

    return {
        id: livro[0].insertId,
        titulo,
        isbn,
        ano_publicado,
        numero_paginas,
        sinopse
    };
};

const atualizarLivro = async (id, titulo, isbn, ano_publicado, numero_paginas, sinopse) => {
    await db.query(
        "UPDATE livros SET titulo=?, isbn=?, ano_publicado=?, numero_paginas=?, sinopse=? WHERE id=?",
        [titulo, isbn, ano_publicado, numero_paginas, sinopse, id]
    );

    return {
        titulo,
        isbn,
        ano_publicado,
        numero_paginas,
        sinopse
    };
};

const deletarLivro = async (id) => {
    const livro = await db.query(
        "DELETE FROM livros WHERE id=?",
        [id]
    );

    return livro.affectedRows;
};

module.exports = {
    listarLivros,
    buscarIdLivro,
    cadastrarLivro,
    atualizarLivro,
    deletarLivro
};