const pool = require("../conexao");
const senhaJwt = require("../senhaJwt");
const jwt = require("jsonwebtoken");

const verificarLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, senhaJwt);

    const { rows, rowCount } = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ mensagem: "Token inválido." });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensagem: "Token expirado." });
    }
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = { verificarLogin };
