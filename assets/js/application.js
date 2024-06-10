

const playerShuffle1 = document.getElementById('shuffle');

const playerDeal = document.getElementById('deal');
const playerHit = document.getElementById('hit');
const playerStay = document.getElementById('stay');
const playerDoubleDown = document.getElementById('doubleDown');
const playerSplit = document.getElementById('split');
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
    console.log(playerCards[j]);
    
    };
    localStorage.setItem('playerCards', JSON.stringify(playerCards));
    console.log(playerCards[0].code);
    renderPlayerCards();
};

const renderPlayerCards = function () {
    
    //showPlayerCards.empty();
        for (i=0; i < playerCards.length; i++) {
        
        const img = document.createElement('img');
        img.src = playerCards[i].image;
        img.alt = `This card is ${playerCards[i].code}`;
        img.class = 'card'
        showPlayerCards.appendChild(img);
    }
};
const renderDealerCards = function () {
    for (i=0; i <= dealerCards.length; i++) {
        const img2 = document.createElement('img2');
        img2.textContent = dealerCards[i].code;
        img.src = dealerCards[i].image;
        showDealerCards.appendChild(img2);
    }
};
/*const renderDealerCards = function () {
    for (i=0; i < dealerCards.length; i++) {
        const img = document.createElement('img');
        img.src = dealerCards[i].image;
        
        img.alt = `This card is ${dealerCards[i].code}`;
        img.textContent = dealerCards[i].code;
        console.log(`cards to be rendered: ${dealerCards[i].code}`);
        console.log(dealerCards.length);
        showDealerCards.appendChild(img);
    }
};*/
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


//localStorage.clear();
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
