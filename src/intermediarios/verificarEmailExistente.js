const pool = require("../conexao");

const verificarEmailExistente = async (req, res, next) => {
  const { email } = req.body;

  if (req.user) {
    const userId = req.user.id;
    let comando = `select * from usuarios where email = $1 and id != $2`;
    let valores = [email, userId];
    let { rowCount: quantidadeUsuariosEncontradosComMesmoEmail } =
      await pool.query(comando, valores);

    if (quantidadeUsuariosEncontradosComMesmoEmail > 0) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }
  } else {
    let comando = `select * from usuarios where email = $1`;
    let valores = [email];
    let { rowCount: quantidadeUsuariosEncontradosComMesmoEmail } =
      await pool.query(comando, valores);

    if (quantidadeUsuariosEncontradosComMesmoEmail > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }
  }

  next();
};

module.exports = {
  verificarEmailExistente,
};
