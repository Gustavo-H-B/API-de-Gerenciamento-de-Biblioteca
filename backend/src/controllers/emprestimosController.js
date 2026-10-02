const emprestimosModel = require("../models/emprestimosModel");

const listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await emprestimosModel.listarEmprestimos();

        res.status(200).json(emprestimos);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdEmprestimo = async (req, res) => {
    try {
        const id = req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const emprestimo = await emprestimosModel.buscarIdEmprestimo(id);

        if(!emprestimo){
            return res.status(404).json({
                mensagem:"Id inválido, o id deve ser um número inteiro."
            });
        };
        
        res.status(200).json(emprestimo);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarEmprestimo = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarEmprestimo = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarEmprestimo = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarEmprestimos,
    buscarIdEmprestimo,
    cadastrarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo
};