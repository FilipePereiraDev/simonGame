
// Initial Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; // Current Click Pattern Of The Game
var userClickedPattern = []; // Current Click Pattern Of The User
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});
  
// Event Listener of the buttons
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);
    
    // Variables responsible for choosing a random colour from "buttonColours"
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    // Animates the button that needs to be clicked
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour + ".btn." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    // Plays the correct sound when a button is clicked
    var audioButton = new Audio("sounds/" + name + ".mp3");
    audioButton.play();
}

function animatePress(currentColour) {
    // Animates when a button is pressed
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}

function checkAnswer(currentLevel) {
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    
    
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 300);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("Wrong");
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}
