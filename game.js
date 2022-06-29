
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
//returns random item from array

$(document).on("keypress", () => {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);

    }
});



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeOut(150).fadeIn(150);
    console.log(randomColor);
    playSound(randomColor);

}

$(".btn").click(function () {
    var userChoosenColour = this.id;
    userClickedPattern.push(userChoosenColour)
    playSound(userChoosenColour);
    animatePress(userChoosenColour)
    // console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    //console.log(gamePattern);
    //console.log(userClickedPattern);

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        playSound("Wrong")
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

