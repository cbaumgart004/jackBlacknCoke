

const playerShuffle1 = document.getElementById('shuffle');

const playerDeal = document.getElementById('deal');
const playerHit = document.getElementById('hit');
const playerStay = document.getElementById('stay');
const playerDoubleDown = document.getElementById('doubleDown');
const playerSplit = document.getElementById('split');
const playerClear = document.getElementById('clear');
//variables for cards to render to html
const showDealerCards = document.getElementById('dealerCards');
const showPlayerCards = document.getElementById('playerCards');

const deckId = localStorage.getItem('deckId');
const playerCards = JSON.parse(localStorage.getItem('playerCards'))||[];
//console.log(playerCards[0].code, playerCards[1].code);
const dealerCards = JSON.parse(localStorage.getItem('dealerCards'))||[];
//console.log(dealerCards[0].code, dealerCards[1].code);
//TODO: On open fetch request Deck of Cards API with a "New" and shuffle
//tokens expire after 2 weeks, this ensures a new token is created on game start
const apiCards = document.querySelectorAll('.api-card');
//TODO: fetch request to draw a card.  We will create a "deal" function later

const shuffleCards = function () {
    const shuffleUrl = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;

    fetch(shuffleUrl)
        .then (function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
                
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            console.log (data.deck_id);
            const deckId = data.deck_id;
            console.log(deckId);
            localStorage.setItem('deckId', deckId);
        })
        .catch(function() {
            alert (`Unable to connect to Deck of Cards API`);
        });
};

console.log(deckId);


const dealCards = function () {
    const dealUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`;

    fetch(dealUrl)
        .then (function (response) {
            if (response.ok) {
                
                return response.json();
                
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            for (i=0; i<=3; i++) {
            console.log (data.cards[i].code);
            };
            //dealerHand(data);
            playerHand(data);
        })
        .catch(function(error) {
            alert (`Unable to connect to Deck of Cards API`);
        });
};

const dealerHand = function(data) {
    for(i = 0; i <=1; i++) {
            dealerCards[i] = data.cards[i];
            console.log(dealerCards[i].image);
            }
            localStorage.setItem('dealerCards', JSON.stringify(dealerCards));
            renderDealerCards();
        };

const playerHand = function(data) {
    for(i = 2, j=0; i <=3, j<=1; i++, j++) {
    
    playerCards[j] = data.cards[i];
    //Turn card values into integers
    if (playerCards[j].value === "JACK"|| 
        playerCards[j].value === "QUEEN"|| 
        playerCards[j].value === "KING") {
        playerCards[j].value = parseInt(10);
    } else if (playerCards[j].value === "ACE"){
        playerCards[j].value = parseInt(11);
    } else {
    playerCards[j].value = parseInt(playerCards[j].value);
    };
    
    console.log(j);
    console.log(playerCards[j]);
    console.log(playerCards[j].value);
    
    };
    localStorage.setItem('playerCards', JSON.stringify(playerCards));
    console.log(playerCards[0].code);
    console.log(`Card 1: ${playerCards[0].value} + Card 2: ${playerCards[1].value} = `)
    let playerTotal = playerCards[0].value + playerCards[1].value;
    if (playerTotal === 21) {
        alert ('Blackjack');
    };
    console.log(playerTotal);
    renderPlayerCards();
};

const renderPlayerCards = function () {

    showPlayerCards.innerHTML = ''; // Clear previous cards
    for (let i = 0; i < playerCards.length; i++) {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-content">
                <section class="card-front">
                    <img src="${playerCards[i].image}" alt="This card is ${playerCards[i].code}" class="card-img">
                </section>
                <section class="card-back">
                    <p class="card-body"></p>
                </section>
            </div>`;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        showPlayerCards.appendChild(card);
    }
};


const renderDealerCards = function () {
    showDealerCards.innerHTML = ''; // Clear previous cards
    for (let i = 0; i < dealerCards.length; i++) {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-content">
                <section class="card-front">
                    <img src="${dealerCards[i].image}" alt="This card is ${dealerCards[i].code}" class="card-img">
                </section>
                <section class="card-back">
                    <p class="card-body"></p>
                </section>
            </div>`;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        showDealerCards.appendChild(card);
    }
};

apiCards.forEach(card => {
    card.classList.add('card-back'); // Add a CSS class
    // Alternatively, you can directly apply styles
     card.style.backgroundImage = "url('../assets/images/cardback.png')";
     card.style.backgroundSize = "cover";
     card.style.backgroundPosition = "center";
     card.style.borderRadius = "15px";
});
//TODO: Add event listener to buttons for gameplay
playerShuffle1.addEventListener('click', shuffleCards);

playerDeal.addEventListener('click', dealCards);


playerHit.addEventListener('click', function(){
    console.log('hit');
});

playerStay.addEventListener('click', function(){
    console.log('stay');
});

playerDoubleDown.addEventListener('click', function(){
    console.log('Double Down');
});

playerSplit.addEventListener('click', function(){
    console.log('split');
});