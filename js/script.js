// <------------------------------------------------------>
const winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let symStat = null;
const cells = document.querySelectorAll("td");
const gameBoard = document.querySelector(".gameBoard");
let winner = document.getElementById("winner");
let turn = 0;
// <------------------------------------------------------>

const player = (playerName) =>{
    let marked = [];
    const emptyMarked = () => marked = [];
    const onclick = (cell) => marked.push(cell);
    const show = () => marked;
    return {playerName,onclick,emptyMarked,show};
};
const player_1 = player('Player-1');
const player_2 = player('Player-2');

let play = () =>{
    symStat = true;
    gameBoard.addEventListener("click",(e)=>{
        let item = document.getElementById(e.target.id);
        if(symStat){
            player_1.onclick(Number(e.target.id));
            item.classList.add("no-click");
        }
        else{
            player_2.onclick(Number(e.target.id));
            item.classList.add("no-click");
        }
        if(symStat){
            item.textContent = "X";
        }
        else{
            item.textContent = "O";
        }
        symStat = !symStat; 
        turn++;
        checkWinner(player_1);
        checkWinner(player_2);
        console.log(turn);
        if(turn == 9){
            gameBoard.classList.add("no-click");
        }
    });
}
play()
let startGame = () =>{
    symStat = true;
    turn = 0;
    cells.forEach(item=>{
        item.textContent = "";
        toggleClick(item);
    })
    toggleClick(gameBoard);
    winner.textContent = "";
    player_1.emptyMarked();
    player_2.emptyMarked();
};
let checkWinner = (player)=>{
    for (let index = 0; index < winCombination.length; index++) {
        let len = player.show().length;
        let count = 0;
        for (let jindex = 0; jindex < len; jindex++) {
            if(winCombination[index].includes(player.show()[jindex])){
                count++;
            }
        }
        if(count == 3){
            winner.textContent =`${player.playerName} wins`;
            gameBoard.classList.add("no-click");
        }
        else{
            count = 0;
        }
    }
}
let toggleClick = (element) =>{
    if(element.classList.contains("no-click")){
        element.classList.remove("no-click");
    }
}

