function playGame() {
    playSound();
    window.location.href = '/game';
}

function showInfo() {
    playSound();
    window.location.href = '/info';
}

function playSound() {
    let audio = new Audio('/sound/click.mp3');
    audio.play();
}
