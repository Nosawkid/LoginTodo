const userCredentials = {
  userName: "admin",
  password: "12345",
};

const verifyUser = (e) => {
  e.preventDefault();
  const userEmail = document.querySelector("#email").value;
  const userPassword = document.querySelector("#password").value;
  const invalidMessage = document.querySelector("#invalid-message");
  invalidMessage.classList.add("d-none");

  if (
    userEmail !== userCredentials.userName ||
    userPassword !== userCredentials.password
  ) {
    invalidMessage.classList.remove("d-none");
  } else {
    window.location.href = "./todo.html";
  }
};

const form = document.querySelector("#login-form");
form.addEventListener("submit", verifyUser);
