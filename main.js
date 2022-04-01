const btnTimerSubmit = document.getElementById("btn-timer-submit");
// let setTimerInterval;

btnTimerSubmit.addEventListener('click', () => {
    const timerTextInput = document.getElementById("timer-text-input").value;
    const setTimerInterval = Number(timerTextInput);

    if (isNaN(setTimerInterval) || setTimerInterval == 0) {
        console.log('Try again')
    } else {
        console.log('is a number');
    }
});