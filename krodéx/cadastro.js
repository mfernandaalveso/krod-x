document.getElementById("btnCadastrar").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some(user => user.email === email);

  if (userExists) {
    alert("Este email já está cadastrado.");
    return;
  }

  // Criptografar a senha antes de salvar
  const encryptedPassword = CryptoJS.SHA256(password).toString();

  users.push({ email, password: encryptedPassword });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
});
