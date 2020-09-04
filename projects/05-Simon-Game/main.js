const colorContainers = [document.getElementsByClassName('green')[0], document.getElementsByClassName('red')[0], document.getElementsByClassName('yellow')[0], document.getElementsByClassName('blue')[0]];
const powerButton = document.getElementsByClassName('button')[0];

const gameOver = document.getElementsByClassName('game-over')[0];
const gameOverX = document.getElementsByClassName('x')[0];

const score = document.getElementsByClassName('score')[0];
const highScore = document.getElementsByClassName('highscore')[0];

const colors = {
    green: '#17D66F',
    red: '#D31C00',
    yellow: '#EED725',
    blue: '#1D99D9',
    greenHighlighted: '#36FA01',
    redHighlighted: '#FA4301',
    yellowHighlighted: '#FAF601',
    blueHighlighted: '#01B8fA',
};

const sounds = {
    green: new Audio('./media/audio/green.mp3'),
    red: new Audio('./media/audio/red.mp3'),
    yellow: new Audio('./media/audio/yellow.mp3'),
    blue: new Audio('./media/audio/blue.mp3'),
    end: new Audio('./media/audio/end.mp3')
};

const game = {
    score: 0,
    highScore: 0,
    playing: false,
    currentIncrement: 0,
    runningPattern: false,
    currentPattern: []
};

const setHighScore = () => {
    if (window.localStorage.getItem('highScore')) {
        game.highScore = Number(window.localStorage.getItem('highScore'));
        highScore.innerHTML = game.highScore;
    } else {
        window.localStorage.setItem('highScore', game.highScore);
    }
};

setHighScore();

const handleColorClick = colorContainer => {
    const color = colorContainer.classList[2];

    if (!game.runningPattern && game.playing) {
        sounds[color].play();
        colorContainer.style.backgroundColor = colors[color + 'Highlighted'];

        if (color === game.currentPattern[game.currentIncrement]) {
            game.currentIncrement++;

            if (game.currentIncrement === game.currentPattern.length) {
                game.currentIncrement = 0;

                game.score++;
                score.innerHTML = game.score;

                if (game.score > game.highScore) {
                    game.highScore = game.score;
                    highScore.innerHTML = game.highScore;

                    if (window.localStorage.getItem('highScore')) {
                        window.localStorage.removeItem('highScore');
                        window.localStorage.setItem('highScore', game.highScore);
                    }
                }

                setTimeout(() => {
                    setPattern();
                }, 1000);
            }

            setTimeout(() => {
                colorContainer.style.backgroundColor = colors[color];
            }, 450);
        } else {
            setTimeout(() => {
                gameOver.style.display = 'flex';
                
                sounds.end.play();

                colorContainers[0].style.backgroundColor = colors.green;
                colorContainers[1].style.backgroundColor = colors.red;
                colorContainers[2].style.backgroundColor = colors.yellow;
                colorContainers[3].style.backgroundColor = colors.blue;

                game.playing = false;
                game.currentIncrement = 0;
                game.runningPattern = false;
                game.currentPattern = [];

                game.score = 0;
                score.innerHTML = game.score;
            }, 200);
        }
    }
};

const runPattern = () => {
    game.runningPattern = true;

    for (let i = 0; i < game.currentPattern.length; i++) {
        if (i > 0) {
            setTimeout(() => {
                let currentColorContainer = document.getElementsByClassName(game.currentPattern[i])[0];
                let color = game.currentPattern[i];
    
                sounds[game.currentPattern[i]].play();
                currentColorContainer.style.backgroundColor = colors[color + 'Highlighted'];
    
                setTimeout(() => {
                    currentColorContainer.style.backgroundColor = colors[color];
                }, i * 300);
            }, i * 800);
        } else {
            let currentColorContainer = document.getElementsByClassName(game.currentPattern[i])[0];
            let color = game.currentPattern[i];

            sounds[game.currentPattern[i]].play();
            currentColorContainer.style.backgroundColor = colors[color + 'Highlighted'];

            setTimeout(() => {
                currentColorContainer.style.backgroundColor = colors[color];
            }, 800);
        }
    }

    game.runningPattern = false;
};

const setPattern = () => {
    const randomValue = Math.ceil(Math.random() * 4);
    let randomColor;

    if (randomValue === 1) {
        randomColor = 'green';
    } else if (randomValue === 2) {
        randomColor = 'red';
    } else if (randomValue === 3) {
        randomColor = 'yellow';
    } else if (randomValue === 4) {
        randomColor = 'blue';
    }

    game.currentPattern.push(randomColor);
    runPattern();
};

const startGame = () => {
    if (!game.playing) {
        game.playing = true;
        setPattern();
    }
};

const removePopup = () => {
    gameOver.style.display = 'none';
};

colorContainers.forEach(function(colorContainer) {
    colorContainer.addEventListener('click', function() {
        handleColorClick(colorContainer);
    });
});

powerButton.addEventListener('click', startGame);
gameOverX.addEventListener('click', removePopup);

window.addEventListener('resize', () => {
    if (document.body.clientWidth < 315) {
        gameOver.style.display = 'none';
    }
});