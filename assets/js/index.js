document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
          closeModal($modal);
        });
      }
    
      // Add a click event on buttons to open a specific modal
      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
    
        $trigger.addEventListener('click', () => {
          openModal($target);
        });
      });
    
      // Add a click event on various child elements to close the parent modal
      (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
    
        $close.addEventListener('click', () => {
          closeModal($target);
        });
      });
    
      // Add a keyboard event to close all modals
      document.addEventListener('keydown', (event) => {
        if(event.key === "Escape") {
          closeAllModals();
        }
      });
    });

    // Define variables from HTML
    const usernameInput = document.getElementById('#username');
    const passwordInput = document.getElementById('#password');
    const numberOfDecks = document.getElementById('#numberOfDecks');
    const loginButton = document.getElementById('#loginBtn');
    const firstNameInputEl = document.getElementById('#first-name');
    const lastNameInputEl = document.getElementById('#last-name');
    const createUserNameInput = document.getElementById('#create-username');
    const createPasswordInput = document.getElementById('#create-password')
    const submitButton = document.getElementById('#submitBtn');

    //let userArray = JSON.parse(localStorage.getItem('userArray'))||[];

    const userArray = [
        {
            username: "username",
            firstName: "first-name",
            lastName: "last-name",
            deckNum: "numberOfDecks",
            password: "password",
            createUserName: "create-username",
            createPassword: "create-password",
        }
    ];

    function saveUserInformationToStorage(userArray) {
        localStorage.setItem('userArray', JSON.stringify(userArray));
    }







    //loginButton.addEventListener('click', function (event) {
        //event.preventDefault();

        //const username = usernameInput.value;
        //const password = passwordInput.value;
        //const decks = numberOfDecks.value;

        //if (username === '') {
            //displayMessage('error', 'username cannot be blank');
        //} else if (password === '') {
            //displayMessage('error', 'password cannot be blank');
        //} else if (decks === '') {
            //displayMessage('error', 'please select number of decks');
        //} else {
            //this.displayMessage('success', 'Enjoy your game!')

            //localStorage.setItem('username', username);
            //localStorage.setItem('password', password);
        //}

    //});




