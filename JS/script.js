let order = [];
let clickedOrder = [];
let score = 1;
let lastScore = 0;

document.getElementById("scoreNumber").innerHTML = score;
document.getElementById("scoreLast").innerHTML = score;

//0 - green
//1 - red
//2 - yellow
//3 - blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//ordem aleatória de cores
let shuffledOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(order[i], elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (color, element, number) => {
    number = number * 700;
    setTimeout(() => {
        element.classList.add('selected');
        soundColorPlay(color);
    }, number - 450);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 50);
}

//checa se os botões clicados são os mesmo da ordem gerada
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            score = 1;
            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`You got it! Get ready for the next level!`);
        nextLevel();
    }
}

//função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    soundColorPlay(color);

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1){
        return red;
    } else if(color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}

//função para próximo nível de jogo

let nextLevel = () => {
    score++;
    document.getElementById("scoreNumber").innerHTML = score;
    shuffledOrder();
}

//função para fim de jogo
let gameOver = () => {
    
    if (lastScore < score){
    lastScore = score;
    document.getElementById("scoreLast").innerHTML = lastScore;
    }

    let audioGameOver = new Audio('AUDIO/gameOver.wav');
    audioGameOver.play();
    alert(`Game Over!\nClick OK to start again`);

    order = [];
    clickedOrder = [];

    playGame();
}

//iniciar o jogo
let playGame = () => {
    alert(`Click "Ok" to start the game.`);
    score = 0;

    nextLevel();
}

// som da cor clicada
let soundColorPlay = (color) => {
    if ((color == 0) || (color == 'green')) {
        let audio = new Audio('./AUDIO/green.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 1) || (color == 'red')) {
        let audio = new Audio('./AUDIO/red.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 2) || (color == 'yellow')) {
        let audio = new Audio('./AUDIO/yellow.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 3) || (color == 'blue')) {
        let audio = new Audio('./AUDIO/blue.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    }
}

green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();