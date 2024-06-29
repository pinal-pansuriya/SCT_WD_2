let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        lapButton.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startTime = null;
    updatedTime = null;
    difference = null;
    display.innerHTML = "00:00:00.00";
    laps = [];
    lapsContainer.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    if (running) {
        laps.push(display.innerHTML);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerText = `Lap ${laps.length}: ${display.innerHTML}`;
        lapsContainer.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
                        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                        (seconds < 10 ? "0" + seconds : seconds) + "." + 
                        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

// Functions are implemented to control the stopwatch:
// start(): Starts the stopwatch.
// pause(): Pauses the stopwatch.
// reset(): Resets the stopwatch.
// recordLap(): Records lap times.
// getShowTime() updates the display with the current elapsed time.