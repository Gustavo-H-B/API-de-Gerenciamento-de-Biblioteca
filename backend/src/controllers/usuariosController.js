const usuariosModel = require("../models/usuariosModel");

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.listarUsuarios();

        res.status(200).json(usuarios);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdUsuario = async (req, res) => {
    try {
        const id = req.params.id;

        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };
        
        const usuario = await usuariosModel.buscarIdUsuario(id);
        
        if (!usuario){
            return res.status(404).json({
                mensagem:"Usuário não encontrado."
            });
        };
        
        res.status(200).json(usuario);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarUsuario = async (req, res) => {
    try {
        const {nome_completo, cpf, email, telefone, data_nascimento} = req.body;

        if (!nome_completo || nome_completo.trim() === 0){
            return res.status(400).json({
                mensagem: "O nome completo é obrigatório e não pode ficar vazio."
            });
        };

        if (nome_completo.length > 150){
            return res.status(400).json({
                mensagem: "O nome completo não pode exceder 150 caracteres."
            });
        };

        if (!cpf || cpf.trim() === 0){
            return res.status(400).json({
                mensagem: "O cpf é obrigatório e não pode ficar vazio."
            });
        };

        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
            return res.status(400).json({
                mensagem: "Formato do cpf inválido. Use xxx.xxx.xxx-xx."
            });
        };

        if (!email || email.trim() === 0){
            return res.status(400).json({
                mensagem: "O email é obrigatório e não pode ficar vazio."
            });
        };

        if (email.length > 150){
            return res.status(400).json({
                mensagem: "O email não pode exceder 150 caracteres."
            });
        };

        if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone)) {
            return res.status(400).json({
                mensagem: "Formato do telefone inválido. Use (xx) xxxxx-xxxx ou (xx) xxxx-xxxx."
            });
        };

        if (!data_nascimento || data_nascimento.trim().length === 0) {
            return res.status(400).json({
                mensagem: "A data de nascimento é obrigatória."
            });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)) {
            return res.status(400).json({
                mensagem: "Formato de data inválido. Use AAAA-MM-DD."
            });
        };

        const novoUsuario = await usuariosModel.cadastrarUsuario(nome_completo, cpf, email, telefone, data_nascimento);

        return res.status(201).json(novoUsuario);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarUsuario = async (req, res) => {
    try {
        const id = await req.params.id;

        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const usuario = await usuariosModel.buscarIdUsuario(id);

        if (!usuario){
            return res.status(404).json({
                mensagem:"Usuário não encontrado."
            });
        };

        const {nome_completo, cpf, email, telefone, data_nascimento} = req.body;

        if (!nome_completo || nome_completo.trim() === 0){
            return res.status(400).json({
                mensagem: "O nome completo é obrigatório e não pode ficar vazio."
            });
        };

        if (nome_completo.length > 150){
            return res.status(400).json({
                mensagem: "O nome completo não pode exceder 150 caracteres."
            });
        };

        if (!cpf || cpf.trim() === 0){
            return res.status(400).json({
                mensagem: "O cpf é obrigatório e não pode ficar vazio."
            });
        };

        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
            return res.status(400).json({
                mensagem: "Formato do cpf inválido. Use xxx.xxx.xxx-xx."
            });
        };

        if (!email || email.trim() === 0){
            return res.status(400).json({
                mensagem: "O email é obrigatório e não pode ficar vazio."
            });
        };

        if (email.length > 150){
            return res.status(400).json({
                mensagem: "O email não pode exceder 150 caracteres."
            });
        };

        if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone)) {
            return res.status(400).json({
                mensagem: "Formato do telefone inválido. Use (xx) xxxxx-xxxx ou (xx) xxxx-xxxx."
            });
        };

        if (!data_nascimento || data_nascimento.trim().length === 0) {
            return res.status(400).json({
                mensagem: "A data de nascimento é obrigatória."
            });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)) {
            return res.status(400).json({
                mensagem: "Formato de data inválido. Use AAAA-MM-DD."
            });
        };

        const usuarioAtualiado = await usuariosModel.atualizarUsuario(nome_completo, cpf, email, telefone, data_nascimento);

        res.status(200).json({
            mensagem: "Cadastro do usuário atualizado.",
            usuario: usuarioAtualiado
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarUsuario = async (req, res) => {
    try {
        const id = await req.params.id;

        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const usuario = await usuariosModel.buscarIdUsuario(id);

        if (!usuario){
            return res.status(404).json({
                mensagem:"Usuário não encontrado."
            });
        };

        await usuariosModel.deletarUsuario(id);

        res.status(200).json({
            mensagem: `O usuario do id: ${id} foi deletado com sucesso.`
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarUsuarios,
    buscarIdUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
};