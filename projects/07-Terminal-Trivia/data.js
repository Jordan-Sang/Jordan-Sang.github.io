/*
Customizable properties (* are optional):
qAndA: [[question1, [ans1, *ans2, ... *ans5]], *[question2, [...]]]
    - nested arrays with question and between 1-5 answers
feedback.right: [rFeedback1, rFeedback2, rFeedback3, rFeedback4, rFeedback5]
    - responses on correct answer
feedback.wrong: [wFeedback1, wFeedback2, wFeedback3, wFeedback4, wFeedback5]
    - responses on incorrect answer
feedback.done: [dFeedback1, dFeedback2, dFeedback3, dFeedback4, dFeedback5]
    - responses after maxAttempts reached
feedback.final: [fFeedback]
    - responses after maxAttempts reached on final question
messages: 'message'
    - two initial messages, one message after questions
numQs: num/false (min: 1)
    - number of questions to display/runs all Qs
maxAttempts: num
    - number of attempts per question (min: 1)
isShuffled: true/false
    - shows initial/shuffled question order
isScored: true/false
    - shows/hides score at end
nthAttempt: true/false
    - gives points on correct answers after first try
*/

var content = {
    qAndA: [
        ['How many molecules of oxygen does ozone have?', ['3', 'three']],
        ['Which Jamaican runner is an 11-time world champion and holds the world record in the 100 and 200-meter race?', ['Usain Bolt', 'Bolt']],
        ['Which country invented tea?', ['China']],
        ['Where is the femur located?', ['leg']],
        ['What is the name of Beyoncé\'s husband?', ['Jay-Z', 'Jay Z', 'JayZ']],
        ['Which animal can be found on the Porsche logo?', ['horse']],
        ['What is the symbol for potassium?', ['K']],
        ['What is the shortcut to copy text on most computers?', ['Ctrl + C', 'Ctrl C', 'CtrlC', 'Control + C', 'Control C']],
        ['Which city in India is the Taj Mahal located in?', ['Agra', 'Taj Nagari']],
        ['How many eyes does a bee have?', ['5', 'five']],
        ['In what year was the first ever Wimbledon tennis tournament held?', ['1877']],
        ['What tech company did Larry Page co-found?', ['Google', 'Alphabet', 'Alphabet Inc', 'Alphabet Inc.']],
        ['Which type of natural disaster is measured with the Richter scale?', ['Earthquake', 'Earthquakes']],
        ['Which car company owns Bugatti, Lamborghini, Audi, Porsche, and Ducati?', ['Volkswagen']],
        ['Which country produces the most coffee in the world?', ['Brazil', 'Brasil']],
        ['About how many taste buds does the average human tongue have?', ['10,000', 'ten thousand', '10000']],
        ['What is the world\'s longest river?', ['The Nile River', 'The Nile', 'Nile', 'Nile River']],
        ['How many keys can be found on a piano?', ['88']],
        ['Which film was the first that Disney produced?', ['Snow White and the Seven Dwarfs', 'Snow White', 'Snow White and the Seven Dwarves', 'SnowWhite']],
        ['Which animal has the longest lifespan?', ['Giant Tortoise', 'Tortoise', 'Turtle']]
    ],
    feedback: {
        right: ['You got it!', 'Nice work!', 'That\'s right!', 'Wow, keep it up!', 'Great job!'],
        wrong: ['Maybe try another approach!', 'Keep going!', 'I believe in you!', 'Not quite... try again!', 'Maybe you typed it in wrong?', 'Give it another shot!'],
        done: ['Let\'s move on.', 'How about another one?', 'That was embarassing...', 'Suddenly I\'m blind...', 'Time for a new question.'],
        final: ['You gave it your all.']
    },
    messages: {
        welc1: 'Welcome to the trivia quiz!',
        welc2: 'Let\'s begin...',
        bye: 'Thanks for playing!'
    },
    numQs: 10,
    maxAttempts: 3,
    isShuffled: true,
    isScored: true,
    nthAttempt: false,
    questions: [],
    answers: [],
    getQs: function() {
        for (var i = 0; i < this.qAndA.length; i++) {
            this.questions.push(this.qAndA[i][0]);
        }
    },
    getAs: function() {
        for (var i = 0; i < this.qAndA.length; i++) {
            this.answers.push(this.qAndA[i][1]);
        }
    },
    setQandA: function() {
        this.getQs();
        this.getAs();
    }
};

content.setQandA();