const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../database");

router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha, celular } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({
          sucesso: false,
          mensagem: "Nome, e-mail e senha são obrigatórios.",
        });
    }

    if (senha.length < 8) {
      return res
        .status(400)
        .json({
          sucesso: false,
          mensagem: "A senha deve ter pelo menos 8 caracteres.",
        });
    }

    const emailExiste = await pool.query(
      "SELECT id FROM usuarios WHERE email = $1",
      [email],
    );

    if (emailExiste.rows.length > 0) {
      return res
        .status(409)
        .json({ sucesso: false, mensagem: "Este e-mail já está cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, celular)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, email, criado_em`,
      [nome, email, senhaHash, celular],
    );

    return res.status(201).json({
      sucesso: true,
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro no cadastro:", erro.message);
    return res
      .status(500)
      .json({ sucesso: false, mensagem: "Erro interno do servidor." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ sucesso: false, mensagem: "E-mail e senha são obrigatórios." });
    }

    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email],
    );

    if (resultado.rows.length === 0) {
      return res
        .status(401)
        .json({ sucesso: false, mensagem: "E-mail ou senha incorretos." });
    }

    const usuario = resultado.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res
        .status(401)
        .json({ sucesso: false, mensagem: "E-mail ou senha incorretos." });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: `Bem-vindo, ${usuario.nome}!`,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (erro) {
    console.error("Erro no login:", erro.message);
    return res
      .status(500)
      .json({ sucesso: false, mensagem: "Erro interno do servidor." });
  }
});

module.exports = router;
