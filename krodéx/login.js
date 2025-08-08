document.getElementById("btnLogin").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Criptografar a senha digitada para comparar com a salva
  const encryptedPassword = CryptoJS.SHA256(password).toString();

  const userFound = users.find(user => user.email === email && user.password === encryptedPassword);

  if (userFound) {
    localStorage.setItem("loggedUser", JSON.stringify(userFound));
    window.location.href = "pokedex.html";
  } else {
    alert("Email ou senha incorretos.");
  }
});

