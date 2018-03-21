let grid = document.getElementById("gameGrid");
let row = 3;
let usersChoice;
let CPUChoice;
let grid2DArray = [];
loadGrid();

function loadGrid(){
    initializeGridArray();
    createHTMlGrid();
    emptyStatusData();
    usersChoice = null;
    CPUChoice = null;
}

function emptyStatusData(){
    document.getElementById("status").innerHTML = "";
}

function initializeGridArray(){
    for(let i=0;i<row;i++){
        let grid1dArray = [];
        for(let j=0;j<row;j++){
            grid1dArray[j] = 0;
        }
        grid2DArray[i] = grid1dArray;
    }
}

function createHTMlGrid(){
    let gridStr="";
    let rowArray = [];
    for(let i=0;i<row;i++){
        let rowStr="<tr>";
        for(let j=0;j<row;j++){
            var tid = "td."+i+"."+j;
            var classes = 'text-center input-default';
            if(j!=row-1)
                  classes+= ' border-right-input';
            if(i!=row-1)
                  classes+= ' border-bottom-input';           
            rowStr = rowStr + "<td><input class='"+classes+"' id='"+tid+"' type='text'></td>";
        }
        gridStr = gridStr + rowStr+ "</tr>";
    }
    console.log(gridStr);
    grid.innerHTML = gridStr;
}

function disableElement(id){
    let domElement = document.getElementById(id);
    domElement.disabled = true;
}

function gameWinLoop(i,j){
    let value = grid2DArray[i][j];  
    // check for horizontal 
    for(var itr = 0;itr<row;itr++){
          if(grid2DArray[i][itr]!=value)
              break;
    }
    if(itr==row){
      return true;
    }  
    // check for vertical
    for(itr = 0;itr<row;itr++){
      if(grid2DArray[itr][j]!=value)
          break;
    }
    if(itr==row){
      return true;
    }
    // check for diagonal 
    if(checkStraightDiagonal(value) || checkReverseDiagonal(value))
        return true;
    return false;
  }

  function checkStraightDiagonal(value){
    for(var rowItr=0,colItr=0;rowItr<row;rowItr++,colItr++){
        if(grid2DArray[rowItr][colItr]!==value)
           break;
    }
    if(rowItr==row)
        return true;
    return false;    
  }

  function checkReverseDiagonal(value){
    for(var rowItr=0,colItr=row-1;rowItr<row;rowItr++,colItr--){
        if(grid2DArray[rowItr][colItr]!==value)
           break;
    }
    if(rowItr==row)
        return true;
     return false;   
  }

grid.addEventListener('change',function(event){
   let id = event.target.id;
   let inputs = id.split(".");
   let value = event.target.value;
   if(value!=="X" && value!=="O"){
       return;
   }
   if(!usersChoice)
     usersChoice = value;

   if(usersChoice!==value)
        return;  
     
   let i = inputs[1];
   let j = inputs[2];
   grid2DArray[i][j] = value;
   disableElement(id);
   if(gameWinLoop(i,j)){
        gameOver('U');
   }
   else{
    if(isGridFilled()){
        gameOver('F');
        return;
    }
    var generatedId = randomInsertion();
    var CpuInput = generatedId.split(".");
    if(isGridFilled()){
        gameOver('F');
        return;
    }
    if(gameWinLoop(CpuInput[1],CpuInput[2])){
        gameOver('C');
        return;
    }
   }

});

function isGridFilled(){
    for(let i=0;i<row;i++){
        for(let j=0;j<row;j++){
            if(grid2DArray[i][j]==0)
                return false;
        }

    }
    return true;
}

function randomInsertion(){
    if(!CPUChoice){
        CPUChoice = (usersChoice === 'O') ? 'X' : 'O';
    }
    var i = Math.floor(Math.random() * row);
    var j = Math.floor(Math.random() * row);   

    while(grid2DArray[i][j]!==0){
        i = Math.floor(Math.random() * row);
        j = Math.floor(Math.random() * row);   
    }
    grid2DArray[i][j] = CPUChoice;
    var tid = "td."+i+"."+j;
    document.getElementById(tid).value = CPUChoice;
    disableElement(tid);
    return tid;
}

function gameOver(status){
    var toShow = "";
    switch(status){
        case 'U': toShow = "User Wins";break;
        case 'C': toShow = "CPU Wins";  break;
        default: toShow = "Match Draw";
    }
    document.getElementById("status").innerHTML = toShow;
   /* grid.innerHTML = ""; */
   $("#gameGrid").find("input").attr("disabled", "disabled");
}

