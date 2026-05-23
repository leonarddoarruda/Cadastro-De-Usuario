function togglePw() {
  const input = document.getElementById("senha");
  input.type = input.type === "password" ? "text" : "password";
}

document.getElementById("celular").addEventListener("input", function () {
  let v = this.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  else if (v.length > 0) v = `(${v}`;
  this.value = v;
});

function showAlert(mensagem, tipo) {
  const el = document.getElementById("alert");
  el.textContent = mensagem;
  el.className = `alert ${tipo}`;
  el.style.display = "block";
  setTimeout(() => {
    el.style.display = "none";
  }, 5000);
}

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const celular = document.getElementById("celular").value;
    const termos = document.getElementById("termos").checked;

    let valido = true;
    function setErro(id, mostrar) {
      document.getElementById(id).style.display = mostrar ? "block" : "none";
      if (mostrar) valido = false;
    }

    setErro("nomeErr", nome.length < 2);
    setErro("emailErr", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    setErro("senhaErr", senha.length < 8);

    if (!termos) {
      showAlert("Você precisa aceitar os Termos.", "error");
      return;
    }
    if (!valido) return;

    const btn = document.getElementById("btnCadastro");
    const spinner = document.getElementById("spinner");
    const texto = document.getElementById("btnTexto");
    btn.disabled = true;
    spinner.style.display = "block";
    texto.textContent = "Criando conta...";

    try {
      const resposta = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, celular }),
      });

      const dados = await resposta.json();

      if (dados.sucesso) {
        showAlert(`✅ ${dados.mensagem}`, "success");
        this.reset();
      } else {
        showAlert(`❌ ${dados.mensagem}`, "error");
      }
    } catch (erro) {
      showAlert("❌ Não foi possível conectar ao servidor.", "error");
      console.error(erro);
    } finally {
      btn.disabled = false;
      spinner.style.display = "none";
      texto.textContent = "Criar Conta";
    }
  });
