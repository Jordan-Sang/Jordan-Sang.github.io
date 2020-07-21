"use strict";

var source = document.getElementById('templated-content');
var sourceContent = source.innerHTML;
var template = Handlebars.compile(sourceContent);

var context = {
    questions: [{
        num: undefined,
        question: 'How many molecules of oxygen does ozone have?',
        options: ['1', '2', '3', '6'],
        correctAnswer: '3'
    }, {
        num: undefined,
        question: 'Which Jamaican runner is an 11-time world champion and holds the world record in the 100 and 200-meter race?',
        options: ['Michael Johnson', 'Paula Radcliffe', 'Usain Bolt', 'Wilson Kipsang Kiprotich'],
        correctAnswer: 'Usain Bolt'
    }, {
        num: undefined,
        question: 'Which country invented tea?',
        options: ['India', 'United Kingdom', 'Malyasia', 'China'],
        correctAnswer: 'China'
    }, {
        num: undefined,
        question: 'Where is the femur located?',
        options: ['leg', 'arm', 'neck', 'foot'],
        correctAnswer: 'leg'
    }, {
        num: undefined,
        question: 'What is the name of Beyoncé\'s husband?',
        options: ['Kanye West', 'Jay-Z', 'Snoop Dog', 'Drake'],
        correctAnswer: 'Jay-Z'
    }, {
        num: undefined,
        question: 'Which animal can be found on the Porsche logo?',
        options: ['dog', 'cow', 'cat', 'horse'],
        correctAnswer: 'horse'
    }, {
        num: undefined,
        question: 'What is the symbol for potassium?',
        options: ['P', 'K', 'Pt', 'C'],
        correctAnswer: 'K'
    }, {
        num: undefined,
        question: 'What is the shortcut to copy text on most computers?',
        options: ['Ctrl + A', 'Ctrl + V', 'Ctrl + C', 'Ctrl + R'],
        correctAnswer: 'Ctrl + C'
    }, {
        num: undefined,
        question: 'Which city in India is the Taj Mahal located in?',
        options: ['Agra', 'New Delhi', 'Mumbai', 'Bangalore'],
        correctAnswer: 'Agra'
    }, {
        num: undefined,
        question: 'How many eyes does a bee have?',
        options: ['2', '5', '8', '10'],
        correctAnswer: '5'
    }, {
        num: undefined,
        question: 'In what year was the first ever Wimbledon tennis tournament held?',
        options: ['1857', '1877', '1897', '1917'],
        correctAnswer: '1877'
    }, {
        num: undefined,
        question: 'From the people listed below, who was NOT involved in the founding of Apple?',
        options: ['Steve Jobs', 'Larry Page', 'Steve Wozniak', 'Ronald Wayne'],
        correctAnswer: 'Larry Page'
    }, {
        num: undefined,
        question: 'Which type of natural disaster is measured with the Richter scale?',
        options: ['Earthquakes', 'Tsunamis', 'Hurricanes', 'Tornadoes'],
        correctAnswer: 'Earthquakes'
    }, {
        num: undefined,
        question: 'Which car company owns Bugatti, Lamborghini, Audi, Porsche, and Ducati?',
        options: ['Honda', 'Ford', 'Volkswagen', 'BMW'],
        correctAnswer: 'Volkswagen'
    }, {
        num: undefined,
        question: 'Which country produces the most coffee in the world?',
        options: ['Uruguay', 'Panama', 'Brazil', 'Bolivia'],
        correctAnswer: 'Brazil'
    }, {
        num: undefined,
        question: 'About how many taste buds does the average human tongue have?',
        options: ['5,000', '10,000', '15,000', '20,000'],
        correctAnswer: '10,000'
    }, {
        num: undefined,
        question: 'What is the world\'s longest river?',
        options: ['The Nile River', 'The Amazon River', 'The Yangtze River', 'The Mississippi-Missouri River'],
        correctAnswer: 'The Nile River'
    }, {
        num: undefined,
        question: 'How many keys can be found on a piano?',
        options: ['68', '78', '88', '98'],
        correctAnswer: '88'
    }, {
        num: undefined,
        question: 'Which film was the first that Disney produced?',
        options: ['Snow White and the Seven Dwarfs', 'Pinocchio', 'Fantasia', 'Dumbo'],
        correctAnswer: 'Snow White and the Seven Dwarfs'
    }, {
        num: undefined,
        question: 'Which animal has the longest lifespan?',
        options: ['Blue Whale', 'Locust', 'Elephant', 'Giant Tortoise'],
        correctAnswer: 'Giant Tortoise'
    }]
};

var shuffle = function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

shuffle(context.questions);
context.questions = context.questions.splice(0, 10);

for (var i = 0; i < context.questions.length; i++) {
    context.questions[i].num = i + 1;
    var containsNumber = false;

    for (var j = 0; j < context.questions[i].options.length; j++) {
        if (!isNaN(Number(parseFloat(context.questions[i].options[j].replace(/[,\/]/g, ''))))) {
            containsNumber = true;
        }
    }

    if (!containsNumber) {
        context.questions[i].options = shuffle(context.questions[i].options);
    }
}

var compiledHtml = template(context);
document.getElementById('quiz').innerHTML = compiledHtml;

var answers = document.getElementsByClassName('answers');
var img = document.getElementsByTagName('img');

var submit = document.getElementById('submit');
var results = document.getElementById('results');

var resetQuiz = function resetQuiz() {
    for (let i = 0; i < context.questions.length; i++) {
        for (let j = 0; j < context.questions[i].options.length; j++) {
            if (answers[i].children[j].children[0].checked) {
                answers[i].children[j].children[0].checked = false;
            }
        }
    }

    for (let i = 0; i < context.questions.length; i++) {
        for (let j = 0; j < context.questions[i].options.length; j++) {
            answers[i].children[j].children[0].disabled = false;
        }
    }

    for (var i = 0; i < img.length; i++) {
        img[i].src = '';
        img[i].style.display = 'none';
    }

    results.style.display = 'none';
    results.innerHTML = '';

    submit.innerHTML = 'Submit';
    submit.removeEventListener('click', resetQuiz);
    submit.addEventListener('click', checkAnswers);

    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = 0;
};

var checkAnswers = function checkAnswers() {
    var correctSrc = './correct.png';
    var incorrectSrc = './incorrect.png';

    var isCorrectStatus = [];
    var correctCount = 0;

    for (let i = 0; i < context.questions.length; i++) {
        for (let j = 0; j < context.questions[i].options.length; j++) {
            if (answers[i].children[j].children[0].checked) {
                if (answers[i].children[j].children[1].innerHTML === context.questions[i].correctAnswer) {
                    isCorrectStatus.push(true);  
                } else {
                    isCorrectStatus.push(false);
                }
            }

            answers[i].children[j].children[0].disabled = true;
        }

        if (!answers[i].children[0].children[0].checked && !answers[i].children[1].children[0].checked && !answers[i].children[2].children[0].checked && !answers[i].children[3].children[0].checked) {
            isCorrectStatus.push(false);
        }
    }

    var _i = 0;

    while (_i < isCorrectStatus.length) {
        for (var j = 0; j < img.length; j++) {
            img[j].style.display = 'inline-block';

            if (isCorrectStatus[_i]) {
                img[j].src = correctSrc;
                correctCount++;
            } else {
                img[j].src = incorrectSrc;
            }

            _i++;
        }
    }

    results.style.display = 'grid';
    results.innerHTML = 'Your score: ' + correctCount + '/' + isCorrectStatus.length;

    if (correctCount <= 5) {
        results.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    } else {
        results.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
    }

    submit.innerHTML = 'Try again?';
    submit.removeEventListener('click', checkAnswers);
    submit.addEventListener('click', resetQuiz);

    
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
};

submit.addEventListener('click', checkAnswers);