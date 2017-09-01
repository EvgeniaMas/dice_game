var selectedCards = [],
    unusedCards = [],
 rollDice = function () {
    var dice = Math.floor(Math.random() * (6 - 1) + 1),

        dice2 = Math.floor(Math.random() * (6 - 1) + 1);


    return [dice, dice2];
},

diceRoller = function () {
    var diceValues = rollDice(),
        die1 = diceValues[0],
        die2 = diceValues[1];
    totalRoll = diceValues[0] + diceValues[1];


    $('.die1').text(diceValues[0]);
    $('.die2').text(diceValues[1]);

    return totalRoll;
},
diceTotal = function(){
    var totalDiceSum = diceRoller();
    $('#roll-total').text(totalRoll);
},
add = function(a,b) {

                return a + b;

},
resetGame = function(){
    selectedCards.length = 0;
    unusedCards.length = 0;
    $('#card-flips').children('div').removeClass();
    $('#roll-total').text('');
    $('.die1').text('');
    $('.die2').text('');
    $('#roll-dice').attr('disabled', false);
    $('#end-game').attr('disabled', true);
    $('#end-turn').attr('disabled', true);
    $('#rules').removeClass('rule_visible');
};

$(document).ready(function(){


  $('#roll-dice').on('click', function(){
     $('#rules').addClass('rule_visible');
    diceRoller();
    diceTotal();
    
    $(this).attr('disabled', true);
    $('#end-turn').attr('disabled', false);
    if($('#card-flips').children('div').hasClass('shut')){
        return false;
    } else {
        $('#card-flips').children('div').addClass('selectable');
    }
  });


  $('#card-flips div').on('click', function(){

    if ($(this).hasClass('selectable') && !$(this).hasClass('shut')){

        $(this).toggleClass('selected');

    } else {
        return false;
    }

  });
  $('#end-turn').on('click', function(){
    $('.selected').each(function(){
        var cardVal = $(this).children('span:first-child').text();
        selectedCards.push(Number(cardVal));

    });
    var sum = selectedCards.reduce(add, 0);



        if (sum === totalRoll){
            $('.selected').removeClass().addClass('shut');
            selectedCards.length = 0;

            $('#roll-dice').attr('disabled', false);
            $(this).attr('disabled', true);
            $('#end-game').attr('disabled', false);

        } else {
        	$('#results').text('Selected cards are not equal to total sum, try again!').fadeIn(3000).fadeOut(2000).end().remove();           
            $('.selected').removeClass('selected');
            selectedCards.length = 0;
        }

    });
  $('#end-game').on('click', function(){
    $('.selectable').each(function(i){
        var unusedVal = $(this).text();
            unusedCards.push(Number(unusedVal));

    });

    var endSum = unusedCards.reduce(add, 0);


    $('#results').text('Game Over: You did not win.\nYour end score was: ' + endSum).fadeIn(2000).fadeOut(2000).end().remove();
    resetGame();
  });


});
