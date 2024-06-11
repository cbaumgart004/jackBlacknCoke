

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
console.log(`page open dealer cards: ${dealerCards}` )
//console.log (dealerCards[0].image);
//console.log(dealerCards[0].code, dealerCards[1].code);
//TODO: On open fetch request Deck of Cards API with a "New" and shuffle
//tokens expire after 2 weeks, this ensures a new token is created on game start

//TODO: fetch request to draw a card.  We will create a "deal" function later

const shuffleCards = function () {
    if (!deckId) {
    let shuffleUrl = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
} else {
    shuffleUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`;
}
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
    const dealDealerUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
    const dealPlayerUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    fetch(dealDealerUrl)
        .then (function (response) {
            if (response.ok) {
                
                return response.json();
                
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            for (i=0; i<=1; i++) {
            
            };
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
            
            };
            
            playerHand(data);
        })
        .catch(function(error) {
            console.log(error);
            alert (`Unable to connect to Deck of Cards API`);
        });
};

const dealerHand = function(data) {
    for(i = 0; i <=1; i++) {
            dealerCards[i] = data.cards[i];
            if (dealerCards[i].value === "JACK"|| 
                dealerCards[i].value === "QUEEN"|| 
                dealerCards[i].value === "KING") {
                dealerCards[i].value = parseInt(10);
            } else if (dealerCards[i].value === "ACE"){
                dealerCards[i].value = parseInt(11);
            } else {
            dealerCards[i].value = parseInt(dealerCards[i].value);
            };
            
            }
            dealerCards[1].state = 'faceDown';
            localStorage.setItem('dealerCards', JSON.stringify(dealerCards));
            
            renderDealerCards();
        };

const playerHand = function(data) {
    for(i=0; i<=1; i++) {
    
    playerCards[i] = data.cards[i];
    //Turn card values into integers
    if (playerCards[i].value === "JACK"|| 
        playerCards[i].value === "QUEEN"|| 
        playerCards[i].value === "KING") {
        playerCards[i].value = parseInt(10);
    } else if (playerCards[i].value === "ACE"){
        playerCards[i].value = parseInt(11);
    } else {
    playerCards[i].value = parseInt(playerCards[i].value);
    };
    
    };
    localStorage.setItem('playerCards', JSON.stringify(playerCards));
    
    
    let playerTotal = playerCards[0].value + playerCards[1].value;
    if (playerTotal === 21) {
        alert ('Blackjack');
    };
    console.log(`Player Shows ${playerTotal}`);
    renderPlayerCards();
};

const renderPlayerCards = function () {
    
    //showPlayerCards.empty();
        //wipe the board
        /*const childrenElements = showPlayerCards.children;
        for (i = 0; i < childrenElements.length; i++) {
            console.log(childrenElements.length);
            childrenElements[i].innerHTML = '';
        };*/
        //Set the cards
        for (i=0; i < playerCards.length; i++) {
    
        const img = document.createElement('img');
        img.setAttribute('id', `playerCard${i}`);
        img.src = playerCards[i].image;
        img.alt = `This card is ${playerCards[i].code}`;
        img.classList.add('card');
        showPlayerCards.appendChild(img);
    }
    
};
const renderDealerCards = function () {
    for (i=0; i < dealerCards.length; i++) {
        const img = document.createElement('img');
        img.setAttribute('id', `dealerCard${i}`);
        if (i===1){
            img.src = 'https://www.deckofcardsapi.com/static/img/back.png';
        }else {
            img.src = dealerCards[i].image;
        }
        
        img.classList.add('card');
        showDealerCards.appendChild(img);
        
    };
    let dealerTotal = dealerCards[0].value + dealerCards[1].value;
    console.log(`Dealer Shows ${dealerTotal}`);
};

/*const playerHit = function () {
    const hitUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    fetch(dealUrl)
        .then (function (response) {
            if (response.ok) {
                
                return response.json();
                
            } else {
                alert(`Error: ${response.statusText}`);
            }
        }).then (function (data) {
            playerHand.push(data);
            //dealerHand(data);
            playerHand(data);
        })
        .catch(function(error) {
            alert (`Unable to connect to Deck of Cards API`);
        });
};*/
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

const tableClear = function () {
    for (i=0; i < playerCards.length; i++) {
        let childElement = document.getElementById(`playerCard${i}`);
        console.log(childElement.id);
        childElement.innerHTML = "";
    }

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
                    <p class="card-body">Card back</p>
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
                    <p class="card-body">Card back</p>
                </section>
            </div>`;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        showDealerCards.appendChild(card);
    }
};
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

playerClear.addEventListener('click', tableClear);


//localStorage.clear();
/*document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const card2 = document.getElementById('card2');
    
    card2.addEventListener('click', () => {
        card2.classList.toggle('flipped');
    });
});*/

