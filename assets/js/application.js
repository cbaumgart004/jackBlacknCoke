

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

let deckId = localStorage.getItem('deckId');
let playerCards = JSON.parse(localStorage.getItem('playerCards'))||[];
//console.log(playerCards[0].code, playerCards[1].code);
let dealerCards = JSON.parse(localStorage.getItem('dealerCards'))||[];
console.log(`page open dealer cards: ${dealerCards}` )
//console.log (dealerCards[0].image);
//console.log(dealerCards[0].code, dealerCards[1].code);
//TODO: On open fetch request Deck of Cards API with a "New" and shuffle
//tokens expire after 2 weeks, this ensures a new token is created on game start

//TODO: fetch request to draw a card.  We will create a "deal" function later

const shuffleCards = function () {
    localStorage.getItem('deckId', 'deckId')
    let shuffleUrl;
    if (!deckId) {
    shuffleUrl = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=7`;
} else {
    shuffleUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=7`;
};
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
            deckId = data.deck_id;
            console.log(deckId);
            localStorage.setItem('deckId', deckId);
        })
        .catch(function(error) {
            console.log(error);
            alert (`Unable to connect to Deck of Cards API`);
        });
};

console.log(deckId);


const dealCards = function () {
    const dealDealerUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
    const dealPlayerUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    fetch(dealDealerUrl)
        .then (function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
                
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            for (i=0; i<=1; i++) {
                dealerCards[i] = data.cards[i];
                
            };
            console.log(data);
            dealerHand(data);
            
        })
        .catch(function(error) {
            console.log(error);
            alert (`Unable to connect to Deck of Cards API`);
        });

        fetch(dealPlayerUrl)
        .then (function (response) {
            if (response.ok) {
                
                return response.json();
                
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            for (i=0; i<=1; i++) {
                playerCards[i] = data.cards[i];
                console.log(playerCards[i]);
            };
            
            playerHand(data);
        })
        .catch(function(error) {
            console.log(error);
            alert (`Unable to connect to Deck of Cards API`);
        });
};
//pass all cards through to give them numeric values
const calculateCardValue = function(card) {
    if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
        return 10;
    } else if (card.value === "ACE") {
        return 11;
    } else {
        return parseInt(card.value);
    }
};

const calculateTotalAndSave = function(cards, totalKey) {
    let total = 0;
    for (let i = 0; i < cards.length; i++) {
        cards[i].value = calculateCardValue(cards[i]);
        total += cards[i].value;
    }

    localStorage.setItem(totalKey, total);
    localStorage.setItem(totalKey.replace('Total', 'Cards'), JSON.stringify(cards));
    
    return total;
};

const dealerHand = function(data) {
    let dealerTotal = calculateTotalAndSave(dealerCards, 'dealerTotal');
    dealerCards[0].state = 'faceDown';
    console.log(`Dealer Shows ${dealerTotal}`);
    renderDealerCards();
};

const playerHand = function(data) {
    let playerTotal = calculateTotalAndSave(playerCards, 'playerTotal');
    
    if (playerTotal === 21) {
        alert('Blackjack');
    }
    
    console.log(`Player Shows ${playerTotal}`);
    console.log(`Player has ${playerCards.length} cards`);
    renderPlayerCards();
    checkForBust(playerTotal);
};
//render cards function reduces repeated code
const renderCards = function(cards, container, cardType) {
    for (let i = 0; i < cards.length; i++) {
        const img = document.createElement('img');
        img.setAttribute('id', `${cardType}Card${i}`);
        
        if (cardType === 'dealer' && i === 0 && cards[0].state === 'faceDown') {
            img.src = 'https://www.deckofcardsapi.com/static/img/back.png';
        } else {
            img.src = cards[i].image;
        }
        
        img.alt = `This card is ${cards[i].code}`;
        img.classList.add('card');
        
        // Check if the card is already displayed
        if (!document.getElementById(`${cardType}Card${i}`)) {
            container.appendChild(img);
        } else {
            const existingImg = document.getElementById(`${cardType}Card${i}`);
            existingImg.src = img.src; // Update the src attribute for face-up cards
        }
    }
};

const renderPlayerCards = function() {
    renderCards(playerCards, showPlayerCards, 'player');
};

const renderDealerCards = function() {
    renderCards(dealerCards, showDealerCards, 'dealer');
};

const hitCard = function (playerType) {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

    fetch(url).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            alert(`Error: ${response.statusText}`);
        }
    }).then(function (data) {
        console.log(data.cards);
        if (playerType === 'player') {
            playerCards.push(data.cards[0]);
            localStorage.setItem('playerCards', JSON.stringify(playerCards));
            console.log(`player has ${playerCards.length} cards`);
            console.log(`player cards: ${playerCards}`);
            playerHand(data);
        } else if (playerType === 'dealer') {
            dealerCards.push(data.cards[0]);
            localStorage.setItem('dealerCards', JSON.stringify(dealerCards));
            console.log(`dealer has ${dealerCards.length} cards`);
            console.log(`dealer cards: ${dealerCards}`);
            dealerHand(data);
        }
    })
    .catch(function (error) {
        console.log(error);
        alert(`Unable to connect to Deck of Cards API`);
    });
}; 

const checkForBust = function(playerTotal) {
    if (playerTotal > 21) {
        playerTotal = 0;
        for (let i = 0; i < playerCards.length; i++) {
            if (playerCards[i].value === 11) {
                playerCards[i].value = 1;
                console.log(`Ace at index ${i} is now worth 1`);
            }
            playerTotal += playerCards[i].value
        }
        localStorage.setItem('playerTotal', playerTotal);
        console.log(playerTotal);
        if(playerTotal > 21) {
            alert('Player went bust');
        }
        
    }
};

const tableClear = function () {
    dealerCards = [];
    playerCards = [];
    localStorage.setItem('playerCards', JSON.stringify(playerCards));
    localStorage.setItem('dealerCards', JSON.stringify(dealerCards));
    showPlayerCards.innerHTML = ''; // Clear previous cards
    showDealerCards.innerHTML = '';
};

//TODO: Add event listener to buttons for gameplay
playerShuffle1.addEventListener('click', shuffleCards);

playerDeal.addEventListener('click', dealCards);

playerHit.addEventListener('click', function () {
    hitCard('player');
});

playerStay.addEventListener('click', function(){
    console.log('stay');
    dealerCards[0].state = 'faceUp';
    renderDealerCards();
    let dealerTotal = localStorage.getItem('dealerTotal', 'dealerTotal')
    console.log(`Dealer shows ${dealerTotal}`);
    hitCard('dealer');
        /*while (dealerTotal < 17) {
            dealerHitCard();
            dealerTotal = parseInt(localStorage.getItem('dealerTotal'));
            console.log(`Dealer shows ${dealerTotal}`);
        }*/
});

playerDoubleDown.addEventListener('click', function(){
    console.log('Double Down');
});

playerSplit.addEventListener('click', function(){
    console.log('split');
});

playerClear.addEventListener('click', tableClear);


