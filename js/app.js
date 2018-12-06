/*
 * Create a list that holds all of your cards
 */
var cards, cardArr, cardsDeck, cardSymbol, secondCardArr, moves, movesAfter;


moves = 0;
$('.moves').text(moves);


cardSymbol = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor', 
    'fa fa-bolt', 
    'fa fa-cube', 
    'fa fa-leaf', 
    'fa fa-bicycle',
    'fa fa-bomb'
];


function createGrid(){
    //criado as <li>
    for(var i = 1; i <= 8; i++) {
        
        // cria os <li>
        cards = $('<li><i></i></li>');

        // adiciona a class cards nos <li> e nos <i>
        cards.addClass('card');

        //coloca as <li> dentro da <ul> .deck
        $('.deck').prepend(cards);
    }

    cardArr = $('.card'); //pega todas <li> com a class .card e transforma em um array

    $('.card').children().each(function(randomIndex){ //adiciona o simbilo para cada children de .card com um index random
        $(this).addClass(cardSymbol[randomIndex]);
    })


    secondCardArr = cardArr.clone() //clona os <li> ja existentes com os símbolos formando o grid

    for(var i = 0; i < 8; i++) {
        $('.deck').prepend(secondCardArr[i]);
    }

    cardsDeck = $('.card').toArray(); //variavel com todos os cards
}
// END FUNCTION CREATE GRID
createGrid();



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}

console.log(cardsDeck);

cardsDeck = shuffle(cardsDeck);
$('.deck').prepend(cardsDeck);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) *[OK]*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) [OK]
 * 
 *  - if the list already has another card, check to see if the two cards match [OK]
 * 
 *   [OK] + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * 
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) [OK]
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


$('.card').bind('click', displayCardSymbol); //para cada clique no elemento com a class CARD executa a função *displayCardSymbol*

function displayCardSymbol() {
    cardClicado = $(this); // adiciona as class OPEN e SHOW
    cardClicado.addClass('open show');
    cardsOpen(cardClicado); //executa a função CARDSOPEN passando o elemento DOM como parâmetro
}


var listOfCardsOpen = [];
var cardAcertos = [];
var cardsErros = [];

function cardsOpen(card){

    listOfCardsOpen.push(card); //INSERE O elemento dentro do array *listOfCardsOpen*

    if(listOfCardsOpen.length == 2){ //se o tamanho do array for = 2 
        $('.card').unbind('click', displayCardSymbol);
        if($(listOfCardsOpen[0]).html() === $(listOfCardsOpen[1]).html()){ //se o html do array no indece 0 for = ao do indece 1
            cardAcertos = listOfCardsOpen; //insere dentro do array *cardAcertos*
            openPosition();
        }else{
            cardsErros = listOfCardsOpen;
            setTimeout(closeCards, 1200);
        }
    }
}


function openPosition(){
    listOfCardsOpen = [] //zera o array

    moves = moves + 1;
    $('.moves').text(moves);

    $('.card').bind('click', displayCardSymbol); //permite o click novamente nos cards
}

function closeCards(){
    $('.card').bind('click', displayCardSymbol);
    if($.inArray(cardsErros[0], cardAcertos) == -1 && $.inArray(cardsErros[1], cardAcertos) == -1){
        $(cardsErros[0]).removeClass('open show');
        $(cardsErros[1]).removeClass('open show');
        listOfCardsOpen = [];
        cardsErros = [];

        moves = moves + 1;
        $('.moves').text(moves);
    }
}





