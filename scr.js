var field = document.querySelector('#field');
field.width = 4;
field.height = 4;

var cells = [];

function Process(e){

	console.log(e.keyCode);
	if(e.keyCode == 37 ) 
		{if(!moveLeft())return;}
	else if(e.keyCode == 38 )
		{if(!moveUp()) return;}
	else if(e.keyCode == 39 )
		{if(!moveRight())return;}
	else if(e.keyCode == 40)
		{if(!moveDown()) return;}
	else return;

	for(var i=0;i<cells.length;i++)
		cells[i].comp = false;

	createCell();

	draw();
}

function startGame(){
	createCell(2);
	createCell(2);
	createCell(4);
	cells[0].x = 1; cells[0].y = 0;

	cells[1].x = 2; cells[1].y = 0;

	cells[2].x = 0; cells[2].y = 0;
	addEventListener("keydown",function(e){
		Process(e);
	});

	draw();
}

function gameOver(){

}

function createCell(n){
	if (n== undefined) n = (Math.random()<0.25)? 4 : 2;
	if(cells.length == 16)	gameOver();
	var x,y;
	a1: while(true){
		x = Math.floor(Math.random()*4);
		y = Math.floor(Math.random()*4);
		for(var i=0;i<cells.length;i++)
			if(cells[i].x == x && cells[i].y == y)
				continue a1;
		break;
	}

	var cell = document.createElement('div');
	cell.className = 'cell';
	field.appendChild(cell);
	cell.x = x;
	cell.y = y;
	cell.comp = false;
	cell.value = n;
	cells.push(cell);

	return cell;
}

function moveLeft(){
	var flag = false;
	cells.sort(compareX);
	a1:for(var i=0;i<cells.length;i++){
		while (true){
			if(cells[i].x == 0) continue a1;
			for(var j=0;j<i;j++)
				if(cells[i].x-1 == cells[j].x && cells[i].y == cells[j].y){
					if(cells[i].value == cells[j].value && !cells[j].comp)
					{
						compound(j,i--);
						flag = true;
					}
					continue a1;
				}
			cells[i].x--;
			flag = true;
		}
	}
	return flag;
}

function moveRight(){
	var flag = false;
	cells.sort(compareX);
	a1:for(var i=cells.length-1;i>=0;i--){
		while (true){
			if(cells[i].x == field.width - 1) continue a1;
			for(var j=i+1; j<cells.length; j++)
				if(cells[i].x+1 == cells[j].x && cells[i].y == cells[j].y){
					if(cells[i].value == cells[j].value && !cells[j].comp)
					{
						compound(j,i);
						flag = true;
					}
					continue a1;
				}
			cells[i].x++;
			flag = true;
		}
	}
	return flag;
}

function moveUp(){
	var flag = false;
	cells.sort(compareY);
	a1:for(var i=0;i<cells.length;i++){
		while (true){
			if(cells[i].y == 0) continue a1;
			for(var j=0;j<i;j++)
				if(cells[i].y-1 == cells[j].y && cells[i].x == cells[j].x){
					if(cells[i].value == cells[j].value && !cells[j].comp)
					{	
						compound(j,i--);
						flag = true;
					}
					continue a1;
				}
			cells[i].y--;
			flag = true;
		}
	}
	return flag;
}

function moveDown(){
	var flag = false;
	cells.sort(compareY);
	a1:for(var i=cells.length-1;i>=0;i--){
		while (true){
			if(cells[i].y == field.height - 1) continue a1;
			for(var j=i+1; j<cells.length; j++)
				if(cells[i].y+1 == cells[j].y && cells[i].x == cells[j].x){
					if(cells[i].value == cells[j].value && !cells[j].comp)
					{
						compound(j,i);
						flag = true;
					}
					continue a1;
				}
			cells[i].y++;
			flag = true;
		}
	}
	return flag;
}


function compound(i,j){
	cells[i].value += cells[j].value;
	cells[i].comp = true;
	field.removeChild(cells[j]);
	cells.splice(j,1);
}
function compareX(a,b){
	if(a.x < b.x)	return -1;
	if(a.x > b.x)	return 1;
	return 0;
}

function compareY(a,b){
	if(a.y < b.y)	return -1;
	if(a.y > b.y)	return 1;
	return 0;
}

function draw(){
	for(var i=0;i<cells.length;i++){
		cells[i].style.left = cells[i].x*cells[i].offsetWidth + 'px';
		cells[i].style.top = cells[i].y*cells[i].offsetHeight + 'px';
		cells[i].innerHTML = cells[i].value;
		if(cells[i].value == 2) cells[i].style.background = "rgba(165,165,165,0.1)";
		if(cells[i].value == 4) cells[i].style.background = "rgba(49,53,51,0.1)";
		if(cells[i].value == 8) cells[i].style.background = "rgba(255,200,0,0.2)";
		if(cells[i].value == 16) cells[i].style.background = "rgba(255,165,0,0.3)";
		if(cells[i].value == 32) cells[i].style.background = "rgba(226,220,31,0.48)";
		if(cells[i].value == 64) cells[i].style.background = "rgba(51,171,37,0.5)";
		if(cells[i].value == 128) cells[i].style.background = "rgba(46,107,0,0.4)";
		if(cells[i].value == 256) cells[i].style.background = "rgba(1,46,173,0.2)";
		if(cells[i].value == 512) cells[i].style.background = "rgba(3,2,33,0.37)";
		if(cells[i].value == 1024) cells[i].style.background = "rgba(7,56,53,0.6)";
		if(cells[i].value == 2048) cells[i].style.background = "rgba(7,47,53,0.0)";
		if(cells[i].value > 2048) cells[i].style.background = "rgba(0,0,0,0.7)";
	}
}

startGame();