const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const textVitoria = document.querySelector("[data-message-text]");
const divTextVitoria = document.querySelector("[data-message]");
const btnReiniciarJogo = document.querySelector("[data-message-btn]");

let isCircleTurn

//inicia o jogo setando o x como proximo jogador
const incioJogo = () =>{
    isCircleTurn = false;

    for (const cell of cellElements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true});
    }

    setClassePadraoJogador();
    divTextVitoria.classList.remove("mensagemResultado-mudanca");
}

//verifica se foi vitoria ou empate e chama a mensagem de fim de jogo
const fimJogo = (foiEmpate) =>{
    if(foiEmpate){
        textVitoria.innerText = "Empate";
    }else{
        textVitoria.innerText =  isCircleTurn ? "O Venceu!" : "X Venceu!";
    }

    divTextVitoria.classList.add("mensagemResultado-mudanca")
}

//adiciona o x ou o circulo na celula
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

//condições possiveis de vitoria
const condicaoVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const condicaoEmpate = () => {
    return[...cellElements].every((cell) =>{
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

const setClassePadraoJogador = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if(isCircleTurn){
        board.classList.add("circle");
    }else{
        board.classList.add("x");
    }
}

//troca o turno e seta o proximo a jogar
const trocaTurno = () => {
    isCircleTurn = !isCircleTurn;

    setClassePadraoJogador();
}

//verifica a vitoria atraves das combinações possiveis
const verificaVitoria = (jogadorAtual) => {
    return condicaoVitoria.some((combinacao) =>{
        return combinacao.every((index) => {
            return cellElements[index].classList.contains(jogadorAtual)
        })
    })
}

//reconhece o clique
const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : 'x';

    placeMark(cell, classToAdd);

    const foiVitoria = verificaVitoria(classToAdd);
    const foiEmpate = condicaoEmpate();

    if (foiVitoria){
        fimJogo(false);
    }else if(foiEmpate){
        fimJogo(true); 
    }else{
        trocaTurno();
    }  
}
for (const cell of cellElements){
    cell.addEventListener("click", handleClick, {once: true});
}

incioJogo();
btnReiniciarJogo.addEventListener("click", incioJogo);