var colors = [];
var pickedColor;
var numSquares = 6;

var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.getElementsByClassName("mode");

init();

function init()
{
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpSquares() 
{
    for (let i = 0; i < squares.length; i++) 
    {
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.backgroundColor;
            //Compare color to clicked color:
            if (clickedColor === pickedColor) {
                message.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColours(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }
            else {
                this.style.backgroundColor = "#232323";
                message.textContent = "Wrong!";
            }
        });
    }
}

function setUpModeButtons() 
{
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            //Calculate how many squares to show
            if (this.textContent === "Easy") {
                numSquares = 3;
            }
            else {
                numSquares = 6;
            }
            reset();
        });
    }
}

function reset()
{
     //Generate new colours
     colors = generateRandomColours(numSquares);
     //Pick new random colours
     pickedColor = pickColour();
     //Change colour display to match picked colour
     colorDisplay.textContent = pickedColor;
     resetButton.textContent = "New Colours";
     message.textContent = "";
     //Change colours of squares
     for (let i = 0; i < squares.length; i++) 
     {
         if(colors[i])
         {
             squares[i].style.display = "block";
            //Add initial colours to squares
            squares[i].style.backgroundColor = colors[i];
         }
         else
         {
            squares[i].style.display = "none";
         }   
     }
     h1.style.backgroundColor = "#4682b4"; 
}

resetButton.addEventListener("click", function()
{
        reset();
});

function changeColours(color)
{
    for (let i = 0; i < squares.length; i++) 
    {
        squares[i].style.backgroundColor = color;
    }
}
function pickColour()
{
    //Generate a random number and truncate fractional part: 
    var random =  Math.floor(Math.random() * colors.length);
    return colors[random];
}
function generateRandomColours(num)
{
    //Make Array
    var arr= [];
    //Add num random colours to array
    for (let i = 0; i < num; i++) 
    {
       //Get random colour and push into array:
        arr.push(getRandomColour());
    }
    //Return array
    return arr;
}

function getRandomColour()
{
    //pick a red from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a green from 0 - 255
    var g = Math.floor(Math.random() * 256);
    //pick a blue from 0 - 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}