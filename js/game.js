var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var audio = new Audio();
var level = 0;
var currentLevel = 0;

// START GAME BY PRESSING ANY KEY//
$(document).keypress(function(){
    if(level == 0){                             //It works only at the beginning (when level == 0)
        nextSequence();
    }     
})

// ACTION WHEN BUTTON IS CLICKED //
$(".btn").click(function(){

    var userChosenColor = this.id;              // Memorizes the id of the button pressed
    userClickedPattern.push(userChosenColor);   // Puts the color in the player array

    if(checkPattern(userChosenColor)){          
        console.log("check pattern");
        animatePress(userChosenColor);          // Function that animates buttons
        playSound(userChosenColor);             // Function that plays sounds

        if(currentLevel == level+1){
            level ++;
            nextSequence();
        }
    }else{
        gameOver();
    }

})

// GETS A RANDOM COLOR AND ANIMATES THE BUTTON OF THAT COLOR //
function nextSequence(){
    $("#level-title").text("Level " + level);             // Changes text of title
    console.log("nextSequence");

    userClickedPattern = [];
    currentLevel = 0;

    var randomNumber = Math.floor(Math.random()*4);       // Creates a random number (0-3)
    var randomChosenColor = buttonColors[randomNumber];   // Saves the color whose position in the array checks with the random number
    gamePattern.push(randomChosenColor);                  // Puts the color in the game array

    setTimeout(function(){
        animatePress(randomChosenColor);
        playSound(randomChosenColor);
    }, 1000);
}

// FUNCTION THAT PLAYS SOUND //
function playSound(sound){
    audio.setAttribute("src", ("sounds/" + sound + ".mp3"));
    audio.play();
}

// FUNCTION THAT ANIMATES BUTTONS //
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");             // Adds class "pressed" to the button pressed

    setTimeout(function(){                                 // Makes class "pressed" be removed after 100ms
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkPattern(color){

    if(gamePattern[currentLevel] == color){
        currentLevel++;
        return true;
    }
}

function gameOver(){
    $("#level-title").text("GAME OVER!");
    $("body").addClass("game-over");
    level = 0;
    gamePattern = [];

    setTimeout(function(){
        $("body").removeClass("game-over");
        $("#level-title").text("Press any Key to Restart");
    }, 500);

    playSound("wrong");

    

}
