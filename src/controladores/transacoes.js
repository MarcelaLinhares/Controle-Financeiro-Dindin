const pool = require("../conexao");

const listarTransacoes = async (req, res) => {
  const usuarioId = req.usuario.id;

  if (req.query.filtro) {
    return filtrarTransacoesPorCategoria(req, res);
  }

  try {
    const { rows } = await pool.query(
      `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
             from transacoes t
             join categorias c on t.categoria_id = c.id
             where t.usuario_id = $1`,
      [usuarioId]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharTransacao = async (req, res) => {
  const transacaoId = req.params.id;
  const usuarioId = req.usuario.id;

  try {
    const { rows, rowCount } = await pool.query(
      `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome 
      from transacoes t left 
      join categorias c on t.categoria_id = c.id 
      where t.id = $1 and t.usuario_id = $2`,
      [transacaoId, usuarioId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    const transacao = rows[0];

    const resposta = {
      id: transacao.id,
      tipo: transacao.tipo,
      descricao: transacao.descricao,
      valor: transacao.valor,
      data: transacao.data,
      usuario_id: transacao.usuario_id,
      categoria_id: transacao.categoria_id,
      categoria_nome: transacao.categoria_nome,
    };

    return res.status(200).json(resposta);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const cadastrarTransacao = async (req, res) => {
  const usuarioId = req.usuario.id;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const { rows: categoriaRows, rowCount: categoriaRowCount } =
      await pool.query("select * from categorias where id = $1", [
        categoria_id,
      ]);

    if (categoriaRowCount === 0) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    const categoriaNome = categoriaRows[0].descricao;

    const { rows } = await pool.query(
      `insert into transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) 
      values ($1, $2, $3, $4, $5, $6) returning *`,
      [descricao, valor, data, categoria_id, tipo, usuarioId]
    );

    const transacao = rows[0];

    const resposta = {
      id: transacao.id,
      tipo: transacao.tipo,
      descricao: transacao.descricao,
      valor: transacao.valor,
      data: transacao.data,
      usuario_id: usuarioId,
      categoria_id: categoria_id,
      categoria_nome: categoriaNome,
    };

    return res.status(201).json(resposta);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const atualizarTransacao = async (req, res) => {
  const usuarioId = req.usuario.id;
  const transacaoId = req.params.id;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const { rowCount: transacaoRowCount } = await pool.query(
      `select * from transacoes 
      where id = $1 and usuario_id = $2`,
      [transacaoId, usuarioId]
    );

    if (transacaoRowCount === 0) {
      return res.status(404).json({
        mensagem: "Transação não encontrada ou não pertence ao usuário logado.",
      });
    }

    const { rowCount: categoriaRowCount } = await pool.query(
      "select * from categorias where id = $1",
      [categoria_id]
    );

    if (categoriaRowCount === 0) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    await pool.query(
      `update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 
      where id = $6`,
      [descricao, valor, data, categoria_id, tipo, transacaoId]
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const removerTransacao = async (req, res) => {
  const transacaoId = req.params.id;
  const usuarioId = req.usuario.id;

  try {
    const { rowCount } = await pool.query(
      `delete from transacoes 
      where id = $1 and usuario_id = $2`,
      [transacaoId, usuarioId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const obterExtratoDeTransacoes = async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const { rows } = await pool.query(
      `select tipo, sum(valor) as total from transacoes 
      where usuario_id = $1 group by tipo`,
      [usuarioId]
    );

    const transacoes = {
      entrada: rows.find((row) => row.tipo === "entrada")?.total || 0,
      saida: rows.find((row) => row.tipo === "saida")?.total || 0,
    };

    return res.status(200).json(transacoes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const filtrarTransacoesPorCategoria = async (req, res) => {
  const usuarioId = req.usuario.id;
  const nomesCategorias = req.query.filtro.map(
    (nome) => nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase()
  );

  if (!nomesCategorias || nomesCategorias.length === 0) {
    return res
      .status(400)
      .json({ mensagem: "Ao menos uma categoria deve ser fornecida." });
  }

  try {
    const { rows } = await pool.query(
      `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
       from transacoes t
       join categorias c on t.categoria_id = c.id
       where t.usuario_id = $1 and c.descricao = any($2::text[])`,
      [usuarioId, nomesCategorias]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: "Nenhuma transação encontrada para estas categorias.",
      });
    }

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  listarTransacoes,
  detalharTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  removerTransacao,
  obterExtratoDeTransacoes,
};
