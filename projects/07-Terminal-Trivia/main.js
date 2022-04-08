var data = {
    inputAdded: 1,
    attempt: 1,
    correct: 0,
    feedback: {
        r: -1,
        w: -1,
        d: -1,
        f: -1
    },
    showNums: false,
    question: {
        options: content.questions,
    },
    answer: {
        options: content.answers,
    },
    qAndA: content.qAndA,
    shuffleOptions: function () {
        for (var i = this.qAndA.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var option = this.qAndA[i];
            this.qAndA[i] = this.qAndA[j];
            this.qAndA[j] = option;
        }
    },
    updateNumQs: function () {
        while ((this.qAndA.length - 1) > content.numQs) {
            this.qAndA.pop();
        }
        
    },
    setQuestions: function () {
        this.question.is = undefined;
        this.answer.is = [undefined];

        if (content.isShuffled) {
	    this.shuffleOptions();
 	}

        if (content.numQs) {
	    this.updateNumQs();	
	}

	this.qAndA.push([content.messages.bye, this.answer.is]);
    },
};

var handleInput = function (input) {
    data.question.is = data.qAndA[data.inputAdded][0];
    data.answer.is = data.qAndA[data.inputAdded - 1][1];

    var qNum = data.showNums ? String(data.inputAdded) + '. ' : '';
    data.question.is = qNum + data.question.is;

    createNewPrompt(input, data.question.is, data.answer.is[0], data.answer.is[1], data.answer.is[2], data.answer.is[3], data.answer.is[4]);
    
    if (data.inputAdded >= data.qAndA.length) {
        document.body.removeChild(document.getElementsByClassName("msg")[document.getElementsByClassName("msg").length - 1]);
    }

    window.scrollTo(0, document.body.scrollHeight);
};

var getResponse = function (event) {
    if (event.which === 13) {
        var input = document.getElementsByTagName("input");
        input = input[input.length - 1];
        if (input.value !== '') {
	    input.readOnly = true;
            input.onkeydown = '';
            handleInput(input.value.toLowerCase());
        }
    }
};

var focusCursor = function (el) {
    if (el.selectionStart || el.selectionStart === 0) {
        el.focus();
        el.setSelectionRange(0, 0);
        return true;
    }
};

var createMsg = function (type, message = undefined) {
    var lastMsg = document.getElementsByClassName("msg")[document.getElementsByClassName("msg").length - 1];
    var div = document.createElement("div");
    var span = document.createElement("span");
    var divChild = document.createElement("div");
    var txtChild;

    if (type === "input") {
        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = "50";

        div.className = "input";
        txtChild = input;

        data.inputAdded++;
    } else {
        var p = document.createElement("p");
        p.innerText = message;

        div.className = "output";
        txtChild = p;
    }

    divChild.appendChild(txtChild);

    div.className += " msg";
    span.innerText = ">>";

    div.appendChild(span);
    div.appendChild(divChild);

    if (lastMsg) {
        lastMsg.insertAdjacentElement("afterend", div);
    } else {
        document.body.appendChild(div);
    }

    if (type === "input") {
        focusCursor(txtChild);
        txtChild.onkeydown = getResponse;
    }
};

var askQuestion = function (question, attempt) {
    if (data.inputAdded >= (data.qAndA.length - 1)) {
        if (content.isScored) {
            question += ' You got ' + data.correct + '/' + (data.qAndA.length - 2) + ' correct';
        }
    }

    if (attempt === 1) {
        createMsg('output', question);
    }
};

var checkAnswer = function (input, rightMessage, wrongMessage, lastAnswer1, lastAnswer2 = undefined, lastAnswer3 = undefined, lastAnswer4 = undefined, lastAnswer5 = undefined) {
    if (input === 'undefined' || input === '') {
        input = 0;
    } else {
        input = input.toLowerCase();
    }

    var answers = [lastAnswer1, lastAnswer2, lastAnswer3, lastAnswer4, lastAnswer5];
    var response;

    for (var i = 0; i < answers.length; i++) {
        if (answers[i] && typeof answers[i] === 'string') {
            answers[i] = answers[i].toLowerCase();
        }

        if (input === answers[i]) {
            response = rightMessage;
            if (data.attempt === 1 || content.nthAttempt) {
                data.correct++;
            }
            data.attempt = 1;
            return response;
        }
    }

    data.inputAdded--;
    data.attempt++;
    response = wrongMessage;

    if (data.attempt > content.maxAttempts) {
        response = (data.inputAdded !== content.numQs) ? generateFeedback('d') : generateFeedback('f');
        data.attempt = 1;
        data.inputAdded++;
        response += ' The correct answer was ' + data.qAndA[data.inputAdded - 1][1][0];
    }

    return response;
};

var generateFeedback = function (type) {
    var randNum = Math.floor(Math.random() * 5);
    var response;

    if (type.toLowerCase() === 'right' || type.toLowerCase() === 'r') {
        type = 'r';
    } else if (type.toLowerCase() === 'wrong' || type.toLowerCase() === 'w') {
        type = 'w';
    } else if (type.toLowerCase() === 'done' || type.toLowerCase() === 'd') {
        type = 'd';
    } else {
        type = 'f';
    }

    while (randNum === data.feedback[type]) {
        randNum = Math.floor(Math.random() * 5);
    }

    data.feedback[type] = randNum;

    var checkType = function(type, rMessage, wMessage, dMessage, fMessage) {
        if (type === 'r') {
            return rMessage;
        } else if (type === 'w') {
            return wMessage;
        } else if (type === 'd') {
            return dMessage;
        } else {
            data.feedback[type] = 1;
            return fMessage;
        }
    };

    response = checkType(type, content.feedback.right[randNum], content.feedback.wrong[randNum], content.feedback.done[randNum], content.feedback.final[0]);
    return response;
};

var createNewPrompt = function (input, question, lastAnswer1 = 0, lastAnswer2 = 0, lastAnswer3 = 0, lastAnswer4 = 0, lastAnswer5 = 0) {
    var response;
    if (input) {
        response = checkAnswer(input, generateFeedback('r'), generateFeedback('w'), lastAnswer1, lastAnswer2, lastAnswer3, lastAnswer4, lastAnswer5);
        createMsg('output', response);
    }
    
    askQuestion(question, data.attempt);
    createMsg('input');
};

var initializeTerminal = function () {
    data.setQuestions();
    createMsg('output', content.messages.welc1);
    createMsg('output', content.messages.welc2);
    handleInput();
};

document.body.onload = initializeTerminal;
window.onclick = function() { focusCursor(document.getElementsByTagName("input")[document.getElementsByTagName("input").length - 1]); };