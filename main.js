// User Interface variables

const btnTimerSubmit = document.getElementById('btn-timer-submit');
const btnHaltResume = document.getElementById('btn-timer-halt-resume');
const btnNumberInInput = document.getElementById('btn-number-in-input');
const btnNumberInQuit = document.getElementById('btn-number-in-quit');
const timerInputError = document.getElementById('timer-input-error');
const numberInInputError = document.getElementById('number-in-input-error');
const setIntervalDiv = document.getElementById('set-interval');
const displayTimerDiv = document.getElementById('display-timer-wrapper');
const numberInDiv = document.getElementById('number-in');
const displayDiv = document.getElementById('display');
const displayTimer = document.getElementById('display-timer');
const displayOutputDiv = document.getElementById('display-output');
let intervalInMS;
let uiIntervalTimer;
let count = 1;
// Program logic variables

const numberFactory = (number, frequency) => ({ number, frequency });
let isTimerRunning = false;
let programIntervalTimer;
let numberRepository = [];

function programCleanUp() {
  numberRepository = [];
}

function isFibonacci(num) {
  if (num === 0) { return true; }
  const fibNumbers = [0, 1];
  const limit = 50000;
  const maxSequence = 1000;
  for (let i = 2; i < limit; i += 1) {
    if (fibNumbers.length < maxSequence) {
      const arrLength = fibNumbers.length;
      const n1 = fibNumbers[arrLength - 1];
      const n2 = fibNumbers[arrLength - 2];
      const newFibNum = n1 + n2;
      fibNumbers.push(newFibNum);
      if (num === newFibNum) {
        return true;
      }
    }
  }
  return false;
}

// uiOutput: receive output from Program Logic, add html & display on webpage

function uiOutput(para) {
  const newParaElement = document.createElement('p');
  const originParaElement = displayDiv.querySelector('p');
  newParaElement.textContent = para;
  displayOutputDiv.insertBefore(newParaElement, originParaElement);
}

function programOutput(para) {
  if (para === 'printSortedOutput') {
    const sortedRepository = numberRepository.sort((a, b) => {
      if (a.frequency > b.frequency) { return -1; }
      if (a.frequency < b.frequency) { return 1; }
      return 0;
    });
    let printStr;
    // build printStr:
    sortedRepository.forEach((element) => {
      if (printStr === undefined) {
        printStr = `${element.number}:${element.frequency}`;
      } else {
        printStr += `, ${element.number}:${element.frequency}`;
      }
    });
    uiOutput(printStr);
  } else if (para === 'printFib') {
    uiOutput('FIB');
  }
}

function numberCollection(num) {
  if (Number.isNaN(num) || typeof (num) === 'string') {
    throw new Error('Is not a number');
  } else {
    if (isFibonacci(num)) {
      programOutput('printFib');
    }
    // search repo for number and return array index if exists, otherwise returns -1.
    const indexOfNumber = numberRepository.findIndex((element) => element.number === num);
    if (indexOfNumber === -1) {
      // number doesn't exist, create new object and push it to the repo
      const newNumber = numberFactory(num, 1);
      numberRepository.push(newNumber);
    } else if (indexOfNumber >= 0) {
      // number exists, get objects index and update value by +1;
      numberRepository[indexOfNumber].frequency += 1;
    }
  }
}

function programTimer(command, time) {
  if (command === 'start' || command === 'resume') {
    isTimerRunning = true;
    programIntervalTimer = setInterval(() => {
      programOutput('printSortedOutput');
    }, time);
    isTimerRunning = true;
  } else {
    clearInterval(programIntervalTimer);
    isTimerRunning = false;
  }
}

// USER INTERFACE

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
}

// finalCleanUp is called within quit() with 5 sec delay. this allows to display
// the final output string of numbers/frequencies and the farewell message before
// final clean up of variables and html elements.

function uiFinalCleanUp() {
  toggleIntervalDisplay();
  displayTimer.textContent = '1';
  while (displayOutputDiv.firstChild) {
    displayOutputDiv.removeChild(displayOutputDiv.firstChild);
  }
  const newParaElement = document.createElement('p');
  displayOutputDiv.append(newParaElement);
}
// Timer for the UI.

function uiTimer(command) {
  if (command === 'start' || command === 'resume') {
    clearInterval(uiIntervalTimer);
    uiIntervalTimer = setInterval(() => {
      displayTimer.textContent = count;
      count += 1;
    }, 1000);
  } else {
    clearInterval(uiIntervalTimer);
  }
}

function uiQuit() {
  uiTimer('quit');
  programTimer('quit');
  programOutput('printSortedOutput');
  uiOutput('Farewell, this output will disappear in 5 seconds.');
  programCleanUp();
  setTimeout(uiFinalCleanUp, 5000);
  const timerTextInput = document.getElementById('timer-text-input');
  timerTextInput.value = '';
  const numberInTextInput = document.getElementById('number-in-input');
  numberInTextInput.value = '';
  count = 1;
}

btnNumberInQuit.addEventListener('click', () => {
  uiQuit();
});

btnNumberInInput.addEventListener('click', () => {
  const numberInTextInput = document.getElementById('number-in-input').value;
  const inComingNumber = Number(numberInTextInput);

  if (Number.isNaN(inComingNumber) || numberInTextInput === '') {
    numberInInputError.classList.remove('hide');
  } else {
    // if incorrect interval input previously, hide error message
    if (!numberInInputError.classList.contains('hide')) {
      numberInInputError.classList.toggle('hide');
    }

    try {
      numberCollection(inComingNumber);
    } catch (e) {
      numberInInputError.classList.remove('hide');
    }
  }
});

btnHaltResume.addEventListener('click', () => {
  if (isTimerRunning) {
    uiTimer('halt');
    programTimer('halt', intervalInMS);
    btnHaltResume.textContent = 'Resume Timer';
  } else {
    uiTimer('resume');
    programTimer('resume', intervalInMS);
    btnHaltResume.textContent = 'Halt Timer';
  }
});

btnTimerSubmit.addEventListener('click', () => {
  const timerTextInput = document.getElementById('timer-text-input').value;
  const setTimerInterval = Number(timerTextInput);

  if (Number.isNaN(setTimerInterval) || setTimerInterval === 0) {
    timerInputError.classList.remove('hide');
  } else {
    intervalInMS = setTimerInterval * 1000;
    // if incorrect interval input previously, hide error message
    if (!timerInputError.classList.contains('hide')) {
      timerInputError.classList.toggle('hide');
    }
    // start interval timers
    programTimer('start', intervalInMS);
    uiTimer('start');
    // hide set-interval div, show display-timer div
    toggleIntervalDisplay();
  }
});
