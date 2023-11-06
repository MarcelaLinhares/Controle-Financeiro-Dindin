const pool = require("../conexao");

const listarCategorias = async (req, res) => {
  try {
    const { rows } = await pool.query("select * from categorias");

    const categorias = rows;
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  listarCategorias,
};
