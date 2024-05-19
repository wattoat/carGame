// follow for more Develped by Atul Rajput ( Tarzan Racing Car Game With )

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const backgroundMusic = document.getElementById('backgroundMusic');
const collisionSound = document.getElementById('collisionSound');
const boostSound = document.getElementById('boostSound');

startScreen.addEventListener('click', start);

let player = { speed: 6, score: 0, boost: false, boostTimer: 0 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    keys[e.key] = true;
    e.preventDefault();
}

function keyUp(e) {
    keys[e.key] = false;
    e.preventDefault();
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {
        if (item.y > 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function endGame() {
    player.start = false;

    if (player.score >= 2500) {
        let playerName = prompt("Congratulations! You've scored over 2500 points. Please enter your Name :");
        if (playerName) {
            localStorage.setItem('playerName', playerName);
        }
    }
    else if (player.score >= 2500) {
        alert("You are in learning phase !!")
    }
    else if (player.score > 2500 && player.score <= 5000) {
        alert("You Can drive on Highways Also !!")
    }
    else if (player.score > 5000 && player.score >= 7500) {
        alert("You are Heavy Driver !!")
    } else if (player.score > 7500 && player.score > 10000) {
        alert("Congo! You are a heavy driver & you be able to do drift !!")
    }

    let playerName = localStorage.getItem('playerName') || 'Dear Player';
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `Game Over <br> Congratulations! ${playerName} Your Score is ${player.score} <br> Click Me`;

    backgroundMusic.pause();
    collisionSound.volume = 0.3;
    collisionSound.play();

    startScreen.addEventListener('click', reloadPage);
}

function reloadPage() {
    window.location.reload();
}

function resetGame() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = "&ensp;Follow me Shane_atul";
    player.start = true;
    player.score = 0;
    player.boost = false;
    player.boostTimer = 0;
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();
    window.requestAnimationFrame(gamePlay);

    for (let x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (let x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = Math.ceil(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

    for (let x = 0; x < 2; x++) {
        let boostItem = document.createElement('div');
        boostItem.setAttribute('class', 'boost');
        boostItem.y = ((x + 1) * 500) * -1;
        boostItem.style.top = boostItem.y + "px";
        boostItem.style.left = Math.ceil(Math.random() * 350) + "px";
        gameArea.appendChild(boostItem);
    }
}

function moveEnemy(car) {
    let enemies = document.querySelectorAll('.enemy');

    enemies.forEach(function (item) {
        if (isCollide(car, item)) {
            endGame();
        }

        if (item.y > 750) {
            item.y = -300;
            item.style.left = Math.ceil(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function moveBoost(car) {
    let boosts = document.querySelectorAll('.boost');
    boosts.forEach(function (item) {
        if (isCollide(car, item)) {
            boostSound.volume = 0.2;
            boostSound.play();
            item.remove();
            activateBoost();
        }
        if (item.y > 750) {
            item.y = -500;
            item.style.left = Math.ceil(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function activateBoost() {
    player.boost = true;
    player.speed *= 2;
    player.boostTimer = 100;
}

function deactivateBoost() {
    player.boost = false;
    player.speed /= 2;
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if (player.start) {
        moveLines();
        moveEnemy(car);
        moveBoost(car);

        if (keys.ArrowUp && player.y > (road.top + 100)) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < (road.bottom - 90)) { player.y += player.speed; }
        if (keys.ArrowLeft && player.x > 10) { player.x -= player.speed; }
        if (keys.ArrowRight && player.x < (road.width - 75)) { player.x += player.speed; }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        if (player.boost) {
            player.boostTimer--;
            if (player.boostTimer <= 0) {
                deactivateBoost();
            }
        }

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerHTML = "Score is " + player.score;

        if (player.score % 1000 === 0) {
            player.speed++;
        }
    }
}

function start() {
    resetGame();
}
document.addEventListener('DOMContentLoaded', function () {
    const images = [
        './media/avenger-modified.jpg',
        './media/carwalpaper1.jpg',
        './media/carwalpaper2.jpg',
        './media/carwalpaper.jpg',
        './media/bCar6.png',
        './media/bCar5.png',
    ];

    const intervalTime = 10000;
    let index = 1;

    function changeBackground() {
        document.querySelector('.carGame').style.backgroundImage = `url(${images[index]})`;
        index = (index + 1) % images.length;
    }

    changeBackground();
    setInterval(changeBackground, intervalTime);
});





function checkMobile() {
    // Regular expression to match common mobile devices
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(navigator.userAgent);
}

window.onload = function () {
    if (checkMobile()) {
        // If accessing from a mobile device, display the message
        const warningElement = document.createElement('div');
        warningElement.className = 'mobile-warning';
        warningElement.innerText = " Hey, Sorry for the inconvenience. Please open in desktop mode for the better experience. Mobile Version is Coming Soon!!!";
        document.body.appendChild(warningElement);
    }
};