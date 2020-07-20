"use strict";

//Variables

var output = document.getElementById('output');

var addition = document.getElementById('addition');
var subtraction = document.getElementById('subtraction');
var multiplication = document.getElementById('multiplication');
var division = document.getElementById('division');

var zero = document.getElementById('zero');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var eight = document.getElementById('eight');
var nine = document.getElementById('nine');

var decimal = document.getElementById('decimal');
var equals = document.getElementById('equals');
var clear = document.getElementById('clear');

var operations = [addition, subtraction, multiplication, division];
var wholeNumbers = [one, two, three, four, five, six, seven, eight, nine];
var specials = [zero, decimal];

var activeDecimal = false;
var newEq = true;

//Functions

var checkOutputContent = function checkOutputContent() {
    if (output.innerHTML === '' || output.innerHTML === ' ') {
        output.style.height = '9.375vh';
    } else {
        output.style.height = 'initial';
    }
};

var resetOperationBgColors = function resetOperationBgColors() {
    addition.style.backgroundColor = 'lightgrey';
    subtraction.style.backgroundColor = 'lightgrey';
    multiplication.style.backgroundColor = 'lightgrey';
    division.style.backgroundColor = 'lightgrey';
};

var checkLength = function checkLength() {
    if (output.innerHTML.length > 20) {
        output.innerHTML = output.innerHTML.split('').splice(0, 20).join('');
    }
};

var operationFunct = function operationFunct() {
    var value = this.innerHTML;

    resetOperationBgColors();

    if (output.innerHTML !== 'Error' && output.innerHTML !== 'undefined' && output.innerHTML !== 'Infinity') {
        if (output.innerHTML.length !== 0 && (output.innerHTML[output.innerHTML.length - 2] !== '+' && output.innerHTML[output.innerHTML.length - 2] !== '−' && output.innerHTML[output.innerHTML.length - 2] !== '×' && output.innerHTML[output.innerHTML.length - 2] !== '÷')) {
            if (value === '+') {
                addition.style.backgroundColor = 'darkgrey';
            } else if (value === '−') {
                subtraction.style.backgroundColor = 'darkgrey';
            } else if (value === '×') {
                multiplication.style.backgroundColor = 'darkgrey';
            } else if (value === '÷') {
                division.style.backgroundColor = 'darkgrey';
            }

            output.innerHTML += ' ' + value + ' ';
            activeDecimal = false;
        }
    }

    checkLength();

    newEq = false;
};

var wholeNumberFunct = function wholeNumberFunct() {
    resetOperationBgColors();

    if (newEq) {
        clearFunct();
    }

    var value = this.innerHTML;

    if (output.innerHTML !== 'Error' && output.innerHTML !== 'undefined' && output.innerHTML !== 'Infinity') {
        if (output.innerHTML[output.innerHTML.length - 1] === '0') {
            if (!activeDecimal && (output.innerHTML[output.innerHTML.length - 2] === ' ' || output.innerHTML.length === 1)) {
                var splitStr = output.innerHTML.split('');
                splitStr[output.innerHTML.length - 1] = value;
                output.innerHTML = splitStr.join('');
            } else {
                output.innerHTML += value;
            }
        } else {
            output.innerHTML += value;
        }
    }
    
    checkOutputContent();
    checkLength();

    newEq = false;
};

var specialsFunct = function specialsFunct() {
    resetOperationBgColors();

    if (newEq) {
        clearFunct();
    }

    var value = this.innerHTML;

    if (output.innerHTML !== 'Error' && output.innerHTML !== 'undefined' && output.innerHTML !== 'Infinity') {
        if (value === zero.innerHTML) {
            output.innerHTML += value;
        } else if (value === decimal.innerHTML) {
            activeDecimal = true;
            
            if (output.innerHTML[output.innerHTML.length - 1] === ' ' || output.innerHTML.length === 0) {
                output.innerHTML += '0' + value;
            } else {
                output.innerHTML += value;
            }
        }
    }

    checkOutputContent();
    checkLength();

    newEq = false;
};

var clearFunct = function clearFunct() {
    resetOperationBgColors();

    output.innerHTML = '';
    checkOutputContent();
    checkLength();
};

var equalsFunct = function equalsFunct() {
    resetOperationBgColors();

    if (output.innerHTML.length !== 0 && output.innerHTML !== 'Error' && output.innerHTML !== 'undefined' && output.innerHTML !== 'Infinity') {
        var toSolve = output.innerHTML.split('');

        for (var i = 0; i < toSolve.length; i++) {
            if (toSolve[i] === ' ') {
                toSolve[i] = '';
            } else if (toSolve[i] === '−') {
                toSolve[i] = '-';
            } else if (toSolve[i] === '×') {
                toSolve[i] = '*';
            } else if (toSolve[i] === '÷') {
                toSolve[i] = '/';
            }
        }

        toSolve = toSolve.join('');

        if (!isNaN(eval(toSolve))) {
            output.innerHTML = Math.round(eval(toSolve) * Math.pow(10, 15)) / Math.pow(10, 15);
        } else if (isNaN(eval(toSolve))) {
            output.innerHTML = 'undefined';
        }
    } else if (output.innerHTML.length === 0) {
        output.innerHTML = '';
    } else if (output.innerHTML === 'Error') {
        output.innerHTML = 'Error';
    }

    newEq = true;
};

// Event Listeners

checkOutputContent();

for (var i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', operationFunct);
}

for (var i = 0; i < wholeNumbers.length; i++) {
    wholeNumbers[i].addEventListener('click', wholeNumberFunct);
}

for (var i = 0; i < specials.length; i++) {
    specials[i].addEventListener('click', specialsFunct);
}

clear.addEventListener('click', clearFunct);
equals.addEventListener('click', equalsFunct);