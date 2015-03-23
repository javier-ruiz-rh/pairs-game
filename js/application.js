/**
 * aplication
 */

var num_pairs = 24;
var
    has_active_card = false,
    first_card = null,
    second_card = null,
    active_click = true,
    pairs_completed = 0,
    cards = []

function randOrd() {
    return (Math.round(Math.random()) - 0.5);
}


function generate_cards() {
    var new_cards = [];
    for (i = 1; i <= num_pairs; i++) {
        new_cards.push(i);
        new_cards.push(i);
    }
    cards = new_cards;

    //desordenamos
    cards.sort(randOrd);

    for (i = 0; i < cards.length; i++) {
        element = "<div class='flip-container' data-num='" + i + "' data-card=" + cards[i] + "><div class='flipper'><div class='front'></div><div class='back'></div></div></div>";
        $('.container').append(element);
    }
}


$('document').ready(function () {

    generate_cards();

    jugar();

    $('.new-game').click(function(){
        volver_a_jugar();
    });


});

function show_card(card) {
    card.addClass('visible');
}

function hide_card(card) {
    card.removeClass('visible');
}


function is_completed(card) {
    return card.hasClass('completed');
}


function hide_cards(first_card, second_card) {
    hide_card(first_card);
    hide_card(second_card);
    has_active_card = false;
}


function show_first_card(card) {
    has_active_card = true;
    first_card = card;
    show_card(first_card);
}


function show_second_card(card) {
    //cuando se muestra la segunda carta se desactiva los click hasta resolver si está completada o no
    active_click = false;
    second_card = card;
    show_card(second_card);
}


function card_completed() {
    //los click estarán desactivados hasta completar la animación
    active_click = false;
    //una vez completada la pareja de cartas, deja de haber cartas activas
    has_active_card = false;
    //ponemos las cartas como completadas
    first_card.addClass('completed');
    second_card.addClass('completed');
    setTimeout(function () {

//       despues de la animación activamos de nuevo los click
        active_click = true;
    }, 900);
    pairs_completed += 1;
    console.log(pairs_completed);
    if (pairs_completed == num_pairs) {
        parar();
        lanzar_mensaje();
    }
}


function card_incorrect() {
    setTimeout(function () {
        //ocultamos las cartas
        hide_cards(first_card, second_card);
    }, 600);
    setTimeout(function () {
        //los click vuelven a estar activos después de la animación
        active_click = true;
    }, 900);
}

function lanzar_mensaje() {
    var tiempo = $('#reloj').text();
    $('.panel-info p span').append(tiempo);
    $('.panel-info').fadeIn();
    $('.overlay').fadeIn();
}

function volver_a_jugar(){
    reset_variables();
    $('.container').html('');
    generate_cards();
    $('.panel-info p span').html('');
    $('.panel-info').fadeOut();
    $('.button').fadeIn();
    jugar();
}

function jugar() {

    $('.flip-container').click(function () {
        // si no hay ninguna carta activa
        if (active_click) {
            //carta sobre la que se ha pinchado
            var card = $(this);

            // si se ha pinchado en una carta que no está completada
            if (is_completed(card) == false) {

                //si  se ha princhado en la primera carta
                if (has_active_card == false) {
                    show_first_card(card)
                }

                //si se ha pinchando en la segunda carta
                else {
                    //mostramos la segunda carta
                    if (first_card.data('num') != card.data('num')) {
                        show_second_card(card);

                        //si es la pareja las cartas pasan a completadas
                        if (first_card.data('card') == second_card.data('card')) {
                            card_completed();
                        }
                        //si no es igual, ocultamos las cartas y deja de haber cartas activas
                        else {
                            card_incorrect();
                        }
                    }
                }
            }
        }

    });
}

function reset_variables(){
        has_active_card = false;
        first_card = null;
        second_card = null;
        active_click = true;
        pairs_completed = 0;
        cards = null;
}