const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");


//create the unit
const box =32;

// load image
const ground = new Image();
ground.src="img/ground.png";

const foodImg = new Image();
foodImg.src="img/food5.png";

const foodImg2 = new Image();
foodImg2.src="img/food4.png";

const ship1 = new Image();
ship1.src="img/ship1.png";

const ship2 = new Image();
ship2.src="img/ship2.png";

//create the snake
let snake = [];
snake[0]={ x : 10 * box , 
		  y : 10 * box }
snake[1]={ x : 10 * box , 
		  y : 10 * box }

//create the food  
let i =Math.floor(Math.random() * 2) + 1;

let food = {
	x : Math.floor(Math.random()*17+1)*box,
	y : Math.floor(Math.random()*15+3)*box
}
//create the audio
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

//create the score
let score = 0 ;


//control	e the snake

let d;
document.addEventListener("keydown",direction);

function direction(event){
	if(event.keyCode == 37 && d != "RIGHT"){
        d ="LEFT";
        left.play();}
	else if(event.keyCode == 38 && d != "DOWN"){
        d ="UP"; 
        up.play();}
	else if(event.keyCode == 39 && d != "LEFT"){
        d ="RIGHT";
        right.play();}
	else if(event.keyCode == 40 && d != "UP"){
        d ="DOWN"; 
        down.play();}
}
//create collision function

function collision(head,array){
    for(let i = 1; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


// draw evrerything to the canves
 function draw(){
	 ctx.drawImage(ground,0,0);
	/*  for (let i = 0; i < snake.length ; i++){
		 ctx.fillStyle = (i==0)? "green" :"yellow";
		 ctx.fillRect(snake[i].x,snake[i].y,box,box);
		 ctx.strokeStyle="red";
		 ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	 } */

	 
	 i==1?ctx.drawImage(foodImg2,food.x,food.y):ctx.drawImage(foodImg,food.x,food.y);
	 
	 
	 //old head position
	 
	 let snakex = snake[0].x
	 let snakey = snake[0].y
	 
	
	 
	 
	 //wich direction
	 
	 if (d =="LEFT") {snakex -= box ;
		ctx.drawImage(ship1,snake[0].x,snake[0].y);
                    }
     
	 if (d =="UP") {snakey -= box;
		ctx.drawImage(ship2,snake[0].x,snake[0].y);
                  }
     
	 if (d =="RIGHT") {snakex += box;
		ctx.drawImage(ship1,snake[0].x,snake[0].y);
                      }
     
	 if (d =="DOWN") {snakey += box;
		ctx.drawImage(ship2,snake[0].x,snake[0].y);
                    }
	 
	 //if the snake eat the food
	 if(snakex==food.x && snakey==food.y || snakex==food.x-box && snakey==food.y-box)
		 {

			 score +=1;

             eat.play();

			 food.x=Math.floor(Math.random()*17+1)*box;
			 food.y=Math.floor(Math.random()*15+3)*box;
			 i =Math.floor(Math.random() * 2) + 1;

			
		 }
	 else{ 
		 // remove the tail
	 	snake.pop();

	
	}
     
      
     
 

 
	  if(snakex<box) snakex=17*box;
	  if(snakex>17*box) snakex= box;
	  if(snakey< 3*box) snakey=17*box;
	  if(snakey>17*box) snakey=3*box;
     
	let newHead ={
		 x :snakex,
		 y :snakey }
    
    	/*  if(collision(newHead,snake)){
		 clearInterval(game);
         dead.play();
	 }*/ 
    
     
	 
	 snake.unshift(newHead);
	 
	 ctx.fillStyle="white";
	 ctx.font="45px Changa One";
	 ctx.fillText(score,2*box,1.6*box);
	 
}


	// call draw function every 100 ms
 	let game = setInterval(draw,100);
	

 

