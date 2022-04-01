
// User Interface

const btnTimerSubmit = document.getElementById("btn-timer-submit");
const timerInputError = document.getElementById("timer-input-error");
const setIntervalDiv = document.getElementById("set-interval");
const displayTimerDiv = document.getElementById('display-timer-wrapper');
const numberInDiv = document.getElementById('number-in');
const displayDiv = document.getElementById('display');
const displayTimer = document.getElementById('display-timer');

btnTimerSubmit.addEventListener('click', () => {
    const timerTextInput = document.getElementById("timer-text-input").value;
    const setTimerInterval = Number(timerTextInput);

    // Check if not a number or 0 was set and show error.
    if (isNaN(setTimerInterval) || setTimerInterval == 0) {
        timerInputError.classList.remove('hide');
    } else {
        // if incorrect interval input previously, hide error message
        if (!timerInputError.classList.contains('hide')) { timerInputError.classList.toggle('hide') };
        // start interval timer
        timer(setTimerInterval);
        uiTimer();
        // hide set-interval div, show display-timer div
        toggleIntervalDisplay();
    }
});

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

function uiTimer() {
    let count = 0;
    let uiCounter = setInterval(function () {
        console.log(count);
        displayTimer.textContent = count;
        count++;
    }, 1000);
}

// outputController: receive output from Core Logic, add html & display on webpage

// Core logic

function timer(para) {
    const intervalInMS = para * 1000;
    // console.log(`start interval timer is this interval: ${intervalInMS}ms`);
    let timerId = setInterval(function () { console.log('hello') }, intervalInMS);
    timerId;
};

