// User Interface variables

const btnTimerSubmit = document.getElementById("btn-timer-submit");
const btnHaltResume = document.getElementById('btn-timer-halt-resume');
const timerInputError = document.getElementById("timer-input-error");
const setIntervalDiv = document.getElementById("set-interval");
const displayTimerDiv = document.getElementById('display-timer-wrapper');
const numberInDiv = document.getElementById('number-in');
const displayDiv = document.getElementById('display');
const displayTimer = document.getElementById('display-timer');
let intervalInMS;
let uiIntervalTimer;
let count = 1;

// Core logic variables

let isTimerRunning = false;
let coreIntervalTimer;

// User Interface

btnTimerSubmit.addEventListener('click', () => {
    const timerTextInput = document.getElementById("timer-text-input").value;
    const setTimerInterval = Number(timerTextInput);

    // Check if not a number or 0 was set and show error.
    if (isNaN(setTimerInterval) || setTimerInterval == 0) {
        timerInputError.classList.remove('hide');
    } else {
        intervalInMS = setTimerInterval * 1000;
        // if incorrect interval input previously, hide error message
        if (!timerInputError.classList.contains('hide')) { timerInputError.classList.toggle('hide') };
        // start interval timer
        coreTimer('start', intervalInMS);
        uiTimer('start');
        // hide set-interval div, show display-timer div
        toggleIntervalDisplay();
    }
});

btnHaltResume.addEventListener('click', () => {
    if (isTimerRunning) {
        uiTimer('halt');
        coreTimer('halt', intervalInMS);
        btnHaltResume.textContent = 'Resume Timer';
    } else {
        uiTimer('resume');
        coreTimer('resume', intervalInMS);
        btnHaltResume.textContent = 'Halt Timer';
    }
})

// will show only the Set-Interval Section or the Display-Timer, Number-In & Output Sections

function toggleIntervalDisplay() {
    if (setIntervalDiv.classList.contains('hide')) {
        setIntervalDiv.classList.remove('hide');
        displayTimerDiv.classList.add('hide');
        numberInDiv.classList.add('hide');
        displayDiv.classList.add('hide');
    } else {
        setIntervalDiv.classList.add('hide');
        displayTimerDiv.classList.remove('hide');
        numberInDiv.classList.remove('hide');
        displayDiv.classList.remove('hide');
    }
};

// Timer for the UI.

function uiTimer(command) {
    // let count = 1;
    if (command === 'start' || command === 'resume') {
        clearInterval(uiIntervalTimer);
        uiIntervalTimer = setInterval(function () {
            console.log(count);
            displayTimer.textContent = count;
            count++;
        }, 1000);
    } else {
        clearInterval(uiIntervalTimer);
    }

}

// outputController: receive output from Core Logic, add html & display on webpage

// Core logic

function coreTimer(command, time) {
    if (command === 'start' || command === 'resume') {
        // clearInterval(coreIntervalTimer);
        isTimerRunning = true;
        coreIntervalTimer = setInterval(function () {

            console.log('hello')
        }, time);
    } else {
        clearInterval(coreIntervalTimer);
        isTimerRunning = false;
    }
};

