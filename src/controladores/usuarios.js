const pool = require("../conexao");

const cadastrarUsuario = async (req, res) => {
  const { nome, email } = req.body;

  try {
    const senhaCriptografada = req.senhaCriptografada;

    const novoUsuario = await pool.query(
      `insert into usuarios (nome, email, senha) 
        values ($1, $2, $3) returning *`,
      [nome, email, senhaCriptografada]
    );

    const resposta = {
      id: novoUsuario.rows[0].id,
      nome: novoUsuario.rows[0].nome,
      email: novoUsuario.rows[0].email,
    };

    return res.status(201).json(resposta);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharUsuario = async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const { rows, rowCount } = await pool.query(
      `select id, nome, email from usuarios 
      where id = $1`,
      [usuarioId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    const usuario = rows[0];
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email } = req.body;
  const usuarioId = req.usuario.id;

  try {
    const senhaCriptografada = req.senhaCriptografada;

    await pool.query(
      `update usuarios set nome = $1, email = $2, senha = $3 
      where id = $4`,
      [nome, email, senhaCriptografada, usuarioId]
    );

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarUsuario,
  atualizarUsuario,
  detalharUsuario,
};
