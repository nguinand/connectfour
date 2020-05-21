//var player1 = prompt("Enter Player One Name, You will be Blue");
var player1Color = "rgb(86, 151, 255)";

//var player2 = prompt("Enter Player Two Name, You will be Red");
var player2Color = "rgb(237, 45, 73)";
var player1Active = true;
var inactiveColor = "rgb(187, 187, 187)"
var elementColIndex;
var buttonRelease = true;



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
    activeColor = (player1Active ? player1Color : player2Color);
    // console.log(elementColIndex);
    //Because we changed the background color to yellow, we have to move our mouse away to keep clicking
    if($(this).css('background-color') == 'rgb(153, 153, 0)' && $(this).attr('class') == 'start' && buttonRelease){
        
        //This async function is required to lock down multiple button clicks
        buttonRelease = false;
        async function asyncCall() {
            // console.log('calling');
            const result = await buttonResolver();
            // console.log(result);
            // expected output: 'resolved'
          }
        function buttonResolver() {
            return new Promise(resolve => {
              setTimeout(() => {
                let check = verticalWinCheck(elementColIndex, activeColor);
                resolve('resolved');
                if(check){
                    console.log("WINNER");
                }else{
                   buttonRelease =true; 
                }
                
              }, 1700);
            });
          }
          asyncCall();

        cascadeDown($(this), elementColIndex, activeColor);
        player1Active = !player1Active;
    }
    else{
        console.log('else')
        console.log($(this).css('background-color') == 'rgb(153, 153, 0)');
        console.log($(this).attr('class') == 'start');
        console.log(buttonRelease);
    }
})

function verticalWinCheck(index, color){
    let hit = 0;
    $('tr').each(function(count){
        let row = this;
        let button = row.cells[index].children.button;
        if($(button).css('background-color') == color){
            hit++;
            console.log(hit);
        }
        else{
            hit = 0;
        }
        if(hit === 4){
            console.log("WINNER")
            return;
        }
    })
    if(hit === 4){
        return true;
    }
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

                }, 300*count)
            }
            else {
                $(element).css('background-color', playerColor);
            }
        }
        catch(err){
            // $(button).css('background-color', playerColor)
            // console.log(err)
        }
        
    })
}

