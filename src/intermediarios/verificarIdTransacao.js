const verificarIdTransacao = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID de transação inválido." });
  }

  next();
};

module.exports = {
  verificarIdTransacao,
};
