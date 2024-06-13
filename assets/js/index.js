document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }
<<<<<<< HEAD
=======

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
  function closeModal($el) {
    $el.classList.remove("is-active");
  }
  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }
<<<<<<< HEAD
=======

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
<<<<<<< HEAD
=======

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });
<<<<<<< HEAD
=======

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");
<<<<<<< HEAD
=======

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });
<<<<<<< HEAD
=======

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});
<<<<<<< HEAD
=======

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
// Define variables from HTML
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const numberOfDecks = document.getElementById("numberOfDecks");
const loginButton = document.getElementById("loginBtn");
const firstNameInputEl = document.getElementById("first_name");
const lastNameInputEl = document.getElementById("last_name");
const createUserNameInput = document.getElementById("create_username");
const createPasswordInput = document.getElementById("create_password");
const submitButton = document.getElementById("submitBtn");
<<<<<<< HEAD
//let userArray = JSON.parse(localStorage.getItem('userArray'))||[];
localStorage.clear("current_user");
=======

//let userArray = JSON.parse(localStorage.getItem('userArray'))||[];
localStorage.clear("current_user");

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
// const userArray = [
//   {
//     username: "username",
//     firstName: "first-name",
//     lastName: "last-name",
//     deckNum: "numberOfDecks",
//     password: "password",
//     createUserName: "create-username",
//     createPassword: "create-password",
//   },
// ];
<<<<<<< HEAD
// const userArrayString = JSON.stringify(userArray);
// localStorage.setItem("user", userArrayString);
=======

// const userArrayString = JSON.stringify(userArray);
// localStorage.setItem("user", userArrayString);

>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce
const displayMessage = (type, message) => {
  const messageEl = document.getElementById("message");
  messageEl.textContent = message;
};
<<<<<<< HEAD
loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const decks = numberOfDecks.options[numberOfDecks.selectedIndex].value;
  if (username === "") {
    displayMessage("error", "username cannot be blank");
  } else if (password === "") {
    displayMessage("error", "password cannot be blank");
  } else if (decks === "") {
    displayMessage("error", "please select number of decks");
  } else {
    let users = localStorage.getItem("users");
    users = JSON.parse(users);
    const user = users.find((user) => {
      return user.username == username && user.password == password;
    });
    if (user) {
      localStorage.setItem("current_user", JSON.stringify(user));
      localStorage.setItem("number_decks", decks);
      window.location = "application.html";
    } else {
      displayMessage("error", "username or password was incorrect");
    }
    // displayMessage('success', 'Play Game!')
    // localStorage.setItem('username', username);
    // localStorage.setItem('password', password);
  }
});
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const user = {
    username: createUserNameInput.value,
    password: createPasswordInput.value,
    firstName: firstNameInputEl.value,
    lastName: lastNameInputEl.value,
  };
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  if (users == null) users = [];
  const duplicateUser = users.find((user) => {
    return user.username == username;
  });
  if (duplicateUser) {
    displayMessage("error", "user already exists");
    return;
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  displayMessage("success", "user account created successfully");
  createUserNameInput.value = "";
  createPasswordInput.value = "";
  firstNameInputEl.value = "";
  lastNameInputEl.value = "";
});

=======

loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const decks = numberOfDecks.options[numberOfDecks.selectedIndex].value;
>>>>>>> 1faddb04b51fcb9ee2957316eb2a27195858a3ce

  if (username === "") {
    displayMessage("error", "username cannot be blank");
  } else if (password === "") {
    displayMessage("error", "password cannot be blank");
  } else if (decks === "") {
    displayMessage("error", "please select number of decks");
  } else {
    let users = localStorage.getItem("users");
    users = JSON.parse(users);
    const user = users.find((user) => {
      return user.username == username && user.password == password;
    });
    if (user) {
      localStorage.setItem("current_user", JSON.stringify(user));
      localStorage.setItem("number_decks", decks);
      window.location = "application.html";
    } else {
      displayMessage("error", "username or password was incorrect");
    }
    // displayMessage('success', 'Play Game!')

    // localStorage.setItem('username', username);
    // localStorage.setItem('password', password);
  }
});
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const user = {
    username: createUserNameInput.value,
    password: createPasswordInput.value,
    firstName: firstNameInputEl.value,
    lastName: lastNameInputEl.value,
  };
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  if (users == null) users = [];
  const duplicateUser = users.find((user) => {
    return user.username == username;
  });
  if (duplicateUser) {
    displayMessage("error", "user already exists");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  displayMessage("success", "user account created successfully");
  createUserNameInput.value = "";
  createPasswordInput.value = "";
  firstNameInputEl.value = "";
  lastNameInputEl.value = "";
});
