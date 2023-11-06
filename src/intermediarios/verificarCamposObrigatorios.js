const verificarCamposObrigatoriosUsuario = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  next();
};

const verificarCamposObrigatoriosTransacao = (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(400).json({
      mensagem: "Todos os campos obrigatórios devem ser informados.",
    });
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.status(400).json({
      mensagem: "O campo 'tipo' deve ser 'entrada' ou 'saida'.",
    });
  }

  next();
};

module.exports = {
  verificarCamposObrigatoriosUsuario,
  verificarCamposObrigatoriosTransacao,
};
