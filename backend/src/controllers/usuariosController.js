const usuariosModel = require("../models/usuariosModel");
const { gerarHashSenha, verificarHashSenha } = require("../utils/crypto/hash");
const { criptografar, descriptografar } = require("../utils/crypto/criptografia");

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.listarUsuarios();
        
        if (!usuarios || usuarios.length === 0){
            return res.status(404).json({
                mensagem: "Nenhum usuário encontrado."
            });
        };

        const usuariosFormatados = usuarios.map(usuario => {
            const cpfDescriptografado = descriptografar({
                ivArmazenado: usuario.cpf_iv, 
                tagArmazenada: usuario.cpf_tag, 
                valorArmazenado: usuario.cpf
            });
            
            return {
                id: usuario.id,
                cpf: cpfDescriptografado,
                nomeCompleto: usuario.nome_completo,
                dataAniversario: usuario.data_aniversario,
                email: usuario.email,
                telefone: usuario.telefone
            };
        });
        
        res.status(200).json(usuariosFormatados);

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

        const cpf = descriptografar({
            ivArmazenado: usuario.cpf_iv, 
            tagArmazenada: usuario.cpf_tag, 
            valorArmazenado: usuario.cpf
        });
        
        res.status(200).json({
            id: usuario.id,
            cpf: cpf,
            nomeCompleto: usuario.nome_completo,
            dataAniversario: usuario.data_aniversario,
            email: usuario.email,
            telefone: usuario.telefone
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarUsuario = async (req, res) => {
    try {
        const {nome_completo, cpf, email, telefone, senha, data_nascimento} = req.body;
        const { salt, hash } = await gerarHashSenha(senha);
        const { iv, tag, valorCriptografado } = criptografar(cpf);

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

        if (!telefone) {
            return res.status(400).json({
                mensagem: "Um número de telefone é obrigatório"
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
        
        await usuariosModel.cadastrarUsuario({
            nome_completo,
            cpf: valorCriptografado, 
            cpf_iv: iv, 
            cpf_tag: tag, 
            email, 
            telefone, 
            senha_hash: hash, 
            senha_salt: salt,
            data_nascimento
        });

        return res.status(201).json({
            mensagem: "Usuário criado com sucesso."
        });

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
        const usuario = await usuariosModel.buscarIdUsuario(id);

        if(!usuario){
            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });
        };

        const {nome_completo, cpf, email, telefone, senha, data_nascimento} = req.body;
        const dadosAtualizados = {};

        if(nome_completo !== undefined) {
            dadosAtualizados.nome_completo = nome_completo;
        };

        if(email !== undefined) {
            dadosAtualizados.email = email;
        };

        if(telefone !== undefined) {
            dadosAtualizados.telefone = nomeCompleto;
        };

        if(data_nascimento !== undefined) {
            dadosAtualizados.data_nascimento = data_nascimento;
        };

        if(cpf !== undefined) {
            const {iv: cpf_iv, tag: cpf_tag, valorCriptografado: cpfCriptografado} = criptografar(cpf)
            dadosAtualizados.cpf = cpfCriptografado;
            dadosAtualizados.cpf_iv = cpf_iv;
            dadosAtualizados.cpf_tag = cpf_tag;
        };

        if(senha !== undefined) {
            const {salt: senha_salt, hash: senha_hash} = gerarHashSenha(senha);
            dadosAtualizados.senha_salt = senha_salt;
            dadosAtualizados.senha_hash =senha_hash;
        };

        await usuariosModel.atualizarUsuario(id, dadosAtualizados);
        return res.status(202).json({
            mensagem: "Usuário editado com sucesso."
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