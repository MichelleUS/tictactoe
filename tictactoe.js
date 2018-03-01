var TicTacToe = {
  winner : "undefined",
  winnerStrike : "undefined",
  counter: 0,
  winOptions: [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]],
  board: [0,1,2,3,4,5,6,7,8],
  checkWinner: function(board = this.board){  
    for(var i=0; i<this.winOptions.length;i++){     
      if((board[this.winOptions[i][0]] == "X"|| board[this.winOptions[i][0]] == "O") &&  (board[this.winOptions[i][0]] === board[this.winOptions[i][1]]) &&                 (board[this.winOptions[i][1]] === board[[this.winOptions[i][2]]])){
        return i;
      }      
    }
  },
  updateWinner: function(winOptionIndex){
    this.winnerStrike=[this.winOptions[winOptionIndex][0],
                             this.winOptions[winOptionIndex][1],
                              this.winOptions[winOptionIndex][2]];
    this.winner = this.board[this.winOptions[winOptionIndex][0]]; //X or O
  },
  availableSpots: function(board = this.board){
    var availbleSpotArray = [];
    for(var i=0;i<9;i++){
      if((board[i] !== "X")&&(board[i] !== "O")){
        availbleSpotArray.push(i);
      }
    }
     return availbleSpotArray;
  },
  reset: function(){
    this.board = [0,1,2,3,4,5,6,7,8];
    this.winner = undefined;
    this.winnerStrike = undefined;
    this.counter = 0;
  },
  print: function(board){
   for(var j=0; j< board.length;j++){
        console.log(board[j]);
    }
  }
};
function Point(x,y){
  this.x = x;
  this.y = y;
};
var getMiddlePoint = function(array){
  var middleX = ((array[2]-array[0])/8) + parseInt(array[0]);
  var middleY = ((array[3]-array[1])/8) + parseInt(array[1]);
  return new Point(middleX,middleY);
};
var showBoard = function(){
   $(".start").css("display","none");
   $(".board").css("display","block");
};
var hideBoard = function(){
   $(".start").css("display","inline");
   $(".board").css("display","none");
};
var showNewGameButton = function(){
  $("#newGame").css("display","inline");  
}
var hideNewGameButton = function(){
  $("#newGame").css("display","none");  
}
var announceWinner = function(){
  for(var i = 0; i< 3; i++){  
        var id = "#b" + TicTacToe.winnerStrike[i];
        console.log(id);
        $(id).css("background-color","gray");
      }
  $(".message").fadeIn(1000).children("p").text(TicTacToe.winner+" wins!!");
     /*alert("The winner is " + TicTacToe.winner);
      $("#blink").css("animation", "blink 1s");
      $("#blink").css("animation-iteration-count","infinite");*/
};
var announceDraw = function(){
  $(".message").fadeIn(1000).children("p").text("Draw!!");
};
var putSignInSelectedSquare = function(squar,player){
  //if is already sign, skip
     if((TicTacToe.board[squar] == "X") ||(TicTacToe.board[squar] == "O"))
       return false;
     
     //get position
     var squarId = "#"+squar;
     var coords =  $(squarId).attr('coords').split(',');
     var middle_point = getMiddlePoint(coords);
   
     //get the sign
     {
     var sign = document.createElement("img");
     sign.id = "b" + squar;
    
     if(player === "X"){ 
        sign.src = 'https://raw.githubusercontent.com/MichelleUS/tictactoe/first-phase/red-x.png';
        TicTacToe.board[squar] = "X";
     }
     else{https:
       sign.src = 'https://raw.githubusercontent.com/MichelleUS/tictactoe/first-phase/black-o.png';
       TicTacToe.board[squar] = "O";
     }
     }
     //position the sign
     {
     sign.style.display = "inline";
     sign.style.left = middle_point.x+"px";
     sign.style.top =  middle_point.y+"px";  
     sign.style.width = "50px";
     sign.style.position = "absolute";
    
     var images = document.getElementById("imges");
     images.appendChild(sign);
     }
  //increase game sign counter
  TicTacToe.counter++;
}
var removeAllSigns = function(){
   var images = document.getElementById("imges");
   while (images.hasChildNodes()) {
        images.removeChild(images.lastChild);
   }
   $(".message").fadeOut();
}
var twoPlayers = function(){
   var turn = 1;//1 = X , -1 = O
   
  $("area").unbind().click(function() {
     var id = $(this).attr('id');
      console.log("two players count " + TicTacToe.counter); 
     var player = (turn == 1)? "X":"O"; 
     putSignInSelectedSquare(id,player);
   
     turn *= -1;
  
  if(TicTacToe.counter > 4)//only after 5 moves there can be a winner
  { 
    var winning = TicTacToe.checkWinner();
    console.log("the winning combination is :"+ winning);
    if(winning !== undefined ){
      TicTacToe.updateWinner(winning);
      announceWinner();
      showNewGameButton();
    }
    else if(TicTacToe.counter == 9){
      console.log("two players winning not defined count " + TicTacToe.counter); 
      announceDraw();
      //still winner undefined and game over  
      showNewGameButton();
    }
 }
}
)};

// human
var huPlayer = "O";
// ai
var aiPlayer = "X";

function winning(board, player){
  var winComb = TicTacToe.checkWinner(board);
  if(winComb === undefined)
    return false;
 
  if(player === board[TicTacToe.winOptions[winComb][0]])
    return true;
  else
    return false;
}
// the main minimax function
function minimax(newBoard, player){
  //available spots
  var availSpots = TicTacToe.availableSpots(newBoard);
  
  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

   
    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;
    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}
var onePlayer = function(){ 
  $("area").unbind().click(function() {
     var id = $(this).attr('id');
     putSignInSelectedSquare(id,huPlayer);
     console.log("one player count " + TicTacToe.counter); 
    var bestSpot = {};
    if(TicTacToe.counter==1)
    {
      var availSpots = TicTacToe.availableSpots();
      bestSpot.index = Math.floor(Math.random()*availSpots.length);
    }
    else{
    // finding the ultimate play on the game that favors the computer
    var winning = TicTacToe.checkWinner();
    if(winning !== undefined ){
      console.log("the winning combination is :"+ winning); 
      TicTacToe.updateWinner(winning);
      announceWinner();
      showNewGameButton();
    }
    else{ 
      var available = TicTacToe.availableSpots().length;
      console.log("still undefine and available spot is "+ available);
      if (available == 0){
          announceDraw();
          //still winner undefined and game over  
          showNewGameButton();
    }}
    
    console.log("call minmax with X"); 
    bestSpot = minimax(TicTacToe.board, aiPlayer);
    }
     putSignInSelectedSquare(bestSpot.index,aiPlayer);  
    //loging the results
    if(TicTacToe.counter  > 4)
    { 
    var winning = TicTacToe.checkWinner();
    
    if(winning != undefined ){
      console.log("the winning combination is :"+ winning);
      TicTacToe.updateWinner(winning);
      announceWinner();
      showNewGameButton();
    }
    else{ 
      var available = TicTacToe.availableSpots().length;
      console.log("still undefine and available spot is "+ available);
      if (available == 0){
          announceDraw();
          //still winner undefined and game over  
          showNewGameButton();
    }}
 }
})};
                
$(document).ready(function(){
   
  $("#one_player").click(function(){
    showBoard();
    onePlayer();
  });
  $("#two_players").click(function(){
    showBoard();
    twoPlayers();
  });
  $("#newGame").click(function(){
    TicTacToe.reset();
    removeAllSigns();
    hideBoard();
    hideNewGameButton();
  });

  $(".start").fadeIn(500).children("p").text("choose your game");
});
