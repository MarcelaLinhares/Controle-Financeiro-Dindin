const express = require("express");
const { cadastrarUsuario, detalharUsuario, atualizarUsuario } = require("./controladores/usuarios");
const { loginDoUsuario } = require("./controladores/login");
const { listarCategorias } = require("./controladores/categorias");
const { listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    removerTransacao,
    obterExtratoDeTransacoes } = require("./controladores/transacoes");
const { verificarLogin } = require("./intermediarios/autenticacao");
const { verificarCamposObrigatoriosUsuario, verificarCamposObrigatoriosTransacao } = require("./intermediarios/verificarCamposObrigatorios");
const { verificarEmailExistente } = require("./intermediarios/verificarEmailExistente");
const { criptografarSenha } = require("./intermediarios/criptografarSenha");
const { verificarIdTransacao } = require("./intermediarios/verificarIdTransacao");

const rotas = express();

rotas.post("/usuario", verificarCamposObrigatoriosUsuario, criptografarSenha, verificarEmailExistente, cadastrarUsuario);
rotas.post("/login", loginDoUsuario);

rotas.use(verificarLogin);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", verificarCamposObrigatoriosUsuario, criptografarSenha, verificarEmailExistente, atualizarUsuario);

rotas.get("/categoria", listarCategorias);

rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/extrato", obterExtratoDeTransacoes);
rotas.get("/transacao/:id", verificarIdTransacao, detalharTransacao);
rotas.post("/transacao", verificarCamposObrigatoriosTransacao, cadastrarTransacao);
rotas.put("/transacao/:id", verificarIdTransacao, verificarCamposObrigatoriosTransacao, atualizarTransacao);
rotas.delete("/transacao/:id", verificarIdTransacao, removerTransacao);

module.exports = rotas;
