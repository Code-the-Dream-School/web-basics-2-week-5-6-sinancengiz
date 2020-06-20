
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to 
//store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

board_size  = 4
//this is a function to create empty game board
function create_board_rows(size){
  var game_board_list= [];
  for (var i = 0; i < size; i++){
    dummy_list = []
     for (var j = 0; j < size; j++){
       dummy_list.push(0)
     }
     game_board_list.push(dummy_list)
  }
  return game_board_list
}

//a function to get total ship amount on game_board
function get_total_ship_amount(board,size){
  total_ships = 0
  for (var i = 0; i < board.length ; i++){
    
      for (var j = 0; j < board[i].length; j++){
      total_ships += board[i][j]
      }
      
  }
  return total_ships
}

// Generate  Ships with random values and add into a gameboard
function fill_board_with_ships(game_board, size){
  dummy_list = game_board
do
{
  dummy_list[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)] = 1
  
}while( get_total_ship_amount(dummy_list,board_size) < size);
return dummy_list
}

//function to make players shoot
function shoot(board,x,y){
  if (board[x][y] == 1){
    alert("You hit the ship' Good Job!")
    board[x][y] = 0
  }else{
    alert("You missed, Be more careful!")
  }
  return board
}


function game_function_1(){

//create players emty borads
emty_player_1_board = create_board_rows(board_size)
emty_player_2_board = create_board_rows(board_size)
//fill boards with ships
player_1_board = fill_board_with_ships(emty_player_1_board, board_size)
player_2_board = fill_board_with_ships(emty_player_2_board, board_size)

//get names from user
player_1_name = prompt("Player 1 Enter Your Name:" )
player_2_name = prompt("Player 2 Enter Your Name:" )

//set players names
p_1_n_element = document.getElementById("name_player1");
p_1_n_element.innerHTML = player_1_name
p_2_n_element = document.getElementById("name_player2");
p_2_n_element.innerHTML = player_2_name

}



function game_function_2(){

//set lives in html element
p_1_lives_element = document.getElementById("ships_player1");
p_1_lives_element.innerHTML = get_total_ship_amount(player_1_board,board_size)
p_2_lives_element = document.getElementById("ships_player2");
p_2_lives_element.innerHTML = get_total_ship_amount(player_2_board,board_size)

//set turn player
turn_element = document.getElementById("turn_player");
turn_player.innerHTML = player_1_name+"s turn to play"
turn = player_1_name;
game_contunies = true;

const board_Player1 = document.getElementById('board_player1');


for (var x = 0; x < 4; x++) {

    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell

      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
        if (turn == player_2_name){
          let cell = e.target; // get the element clicked
          console.log( cell.textContent) //display the coordinates in the console
          cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
          var x = parseInt(cell.textContent.charAt(0))
          var y = parseInt(cell.textContent.charAt(2))
          player_1_board = shoot(player_1_board,x,y)
          turn = player_1_name;
          turn_player.innerHTML = player_1_name+"'s turn to play"
          p_1_lives_element.innerHTML = get_total_ship_amount(player_1_board,board_size)

          console.log(player_1_board);
          console.log(inital_board_1)

          if (get_total_ship_amount(player_1_board,board_size) == 0){
            alert(player_2_name + " winn the game")
            turn_player.innerHTML = "Congragulations "+ player_2_name+ " won the game"
            turn = "game_finished"
          }
        }
      });

      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player1.appendChild(li); //adding each row into the board
}


const board_Player2 = document.getElementById('board_player2');

for (var x = 0; x < 4; x++) {

    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell

      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
        if (turn == player_1_name){
          let cell = e.target; // get the element clicked
          console.log( cell.textContent) //display the coordinates in the console
          cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
          //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
          var x = parseInt(cell.textContent.charAt(0))
          var y = parseInt(cell.textContent.charAt(2))
          player_2_board = shoot(player_2_board,x,y)
          p_2_lives_element.innerHTML = get_total_ship_amount(player_2_board,board_size)
          turn = player_2_name;
          turn_player.innerHTML = player_2_name+"'s turn to play"
          if (get_total_ship_amount(player_2_board,board_size) == 0){
            alert(player_1_name + " winn the game")
            turn_player.innerHTML = "Congragulations "+ player_1_name+ " won the game"
            turn = "game_finished"
          }
        }
      });

      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player2.appendChild(li); //adding each row into the board
}


}



var reset_button = document.createElement("BUTTON");
reset_button.innerHTML = "Reset Game"

var new_game_button = document.createElement("BUTTON");
new_game_button.innerHTML = "New Game"


new_game_button.onclick = function (){
  document.getElementById("board_player1").innerHTML = "";
  document.getElementById("board_player2").innerHTML = "";
  console.log("this is new game button")
  game_function_1()
  inital_board_1= JSON.parse(JSON.stringify(player_1_board))
  inital_board_2= JSON.parse(JSON.stringify(player_2_board))
  game_function_2()
}

reset_button.onclick = function (){
  document.getElementById("board_player1").innerHTML = "";
  document.getElementById("board_player2").innerHTML = "";
  console.log("this is reset button")
  player_1_board = JSON.parse(JSON.stringify(inital_board_1))
  player_2_board = JSON.parse(JSON.stringify(inital_board_2))
  game_function_2()

}

game_function_1()
game_function_2()

inital_board_1= JSON.parse(JSON.stringify(player_1_board))
inital_board_2= JSON.parse(JSON.stringify(player_2_board))

var buttons_element = document.getElementById("buttons");
buttons_element.appendChild(reset_button)
buttons_element.appendChild(new_game_button)

