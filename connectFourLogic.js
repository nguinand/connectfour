//var player1 = prompt("Enter Player One Name, You will be Blue");
var player1Color = "rgb(86, 151, 255)";

//var player2 = prompt("Enter Player Two Name, You will be Red");
var player2Color = "rgb(237, 45, 73)";
var player1Active = true;
var inactiveColor = "rgb(187, 187, 187)"
var elementColIndex;
var buttonRelease = true;
var lastIndex = 0;



$('button').mouseenter(function(){
    if($(this).attr('class') == 'start' && $(this).css('background-color') =='rgb(187, 187, 187)' ){
    $(this).css('background-color',"rgb(153,153,0");
    }
})

$('button').mouseleave(function(){
    if($(this).css('background-color') === "rgb(153, 153, 0)"){
        $(this).css('background-color',"rgb(187, 187, 187)");

    }
})



$('button').click(function(){
    // console.log($(this).attr('class'));
    elementColIndex = $('.start').index($(this));
    // console.log(elementColIndex);
    activeColor = (player1Active ? player1Color : player2Color);
    // console.log(elementColIndex);
    //Because we changed the background color to yellow, we have to move our mouse away to keep clicking
    if($(this).css('background-color') == 'rgb(153, 153, 0)' && $(this).attr('class') == 'start' && buttonRelease){
        
        //This async function is required to lock down multiple button clicks
        buttonRelease = false;
        cascadeDown($(this), elementColIndex, activeColor);
        async function asyncCall() {
            // console.log('calling');
            const result = await buttonResolver();
            // console.log(result);
            // expected output: 'resolved'
          }
        function buttonResolver() {
            return new Promise(resolve => {
              setTimeout(() => {
                //   console.log(lastIndex);
                verticalWinCheck(elementColIndex, activeColor);
                horizontalWinCheck(activeColor);
                diagnolWinCheck(activeColor)
                resolve('resolved');
                buttonRelease = true;
                
              }, 1700);
            });
          }
          asyncCall();

        
        player1Active = !player1Active;
    }
    else{
        console.log('else')
        console.log($(this).css('background-color') == 'rgb(153, 153, 0)');
        console.log($(this).attr('class') == 'start');
        console.log(buttonRelease);
    }
})

function diagnolWinCheck(color){
    console.log(elementColIndex);
    console.log(lastIndex);
    var button = $('tr')[lastIndex].cells[elementColIndex];
    // console.log(button);
    //The reason we put +1, is because we already know THAT CURRENT chip is the correct color.
    let x = elementColIndex;
    let y = lastIndex;
    let hit = 0;
    while(x >=0 && y >=0){
        let button = $('tr')[y].cells[x].children.button
        if($(button).css('background-color') == color){
            hit++;
        }
        else{
            hit =0;
        }
        if(hit ==4){
            alert("WINNER");
            location.reload();
        }
        x--;
        y--;
    }
    x = elementColIndex;
    y = lastIndex;
    while(y <=5 && x<=6){
        let button = $('tr')[y].cells[x].children.button
        if($(button).css('background-color') == color){
            hit++;
        }
        else{
            hit =0;
        }
        if(hit ==4){
            alert("WINNER");
            location.reload();
        }
        x++;
        y++;
    }
    console.log(hit);
}

function horizontalWinCheck(color){
    let hit = 0;

    var row = $('tr')[lastIndex].cells
    for (let item of row){
        let button = item.children.button;
        if($(button).css('background-color') == color){
            hit++;
        }
        else{
            hit = 0;
        }
        if(hit == 4){
            alert("WINNER");
            location.reload();
        }
    }
}

function verticalWinCheck(index, color){
    let hit = 0;
    $('tr').each(function(count){
        let row = this;
        let button = row.cells[index].children.button;
        if($(button).css('background-color') == color){
            hit++;
        }
        else{
            hit = 0;
        }
        if(hit === 4){
            alert("WINNER");
            location.reload();
        }
    })
}

function cascadeDown(element, index, playerColor){
    buttonRelease=false;
    $('tr').each(function(count){
        //We get the rows going down, get the button at that index and go grab that button
        let row = this;
        let colSize= row.cells.length
        // console.log(count);
        // console.log(row);
        // console.log(row.cells);
        // console.log(row.cells[index])
        // console.log(row.cells[index].children)
        // console.log(row.cells[index].children.button)
        let button = row.cells[index].children.button;
        // let buttonColor = $(button).css('background-color')
        
        try{
            let nextCell = $('tr')[count+1].cells[index].children.button
            // console.log(nextCell);
            if($(nextCell).css('background-color') == "rgb(187, 187, 187)"){
                setTimeout(function(){
                    $(nextCell).css('background-color', playerColor)
                    $(button).css('background-color', 'rgb(187, 187, 187)')
                    lastIndex = count +1
                }, 300*count)
            }
            else {
                $(element).css('background-color', playerColor);
                lastIndex=0

            }
        }
        catch(err){
            // $(button).css('background-color', playerColor)
            // console.log(err)
        }
        
    })
}

