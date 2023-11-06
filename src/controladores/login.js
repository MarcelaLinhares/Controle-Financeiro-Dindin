const pool = require("../conexao");
const senhaJwt = require("../senhaJwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginDoUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  try {
    const { rows } = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ mensagem: "Email ou senha inválida." });
    }

    const { senha: senhaUsuario, ...usuario } = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "Email ou senha inválida." });
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: "8h" });

    return res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = { loginDoUsuario };
