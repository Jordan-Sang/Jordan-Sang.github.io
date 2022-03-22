"use strict";

var source = document.getElementById('templated-content');
var sourceContent = source.innerHTML;
var template = Handlebars.compile(sourceContent);

var context = {
    projects: [{
        title: 'Grocery List',
        date: 'March 21, 2022',
        description: 'A versatile and minimalistic grocery list that utilizes vanilla JavaScript',
        link: './projects/07-Grocery-List/index.html'
    }, {
        title: 'Simple Table Generator',
        date: 'February 2, 2021',
        description: 'An easy-to-use online table generator powered by vanilla JavaScript',
        link: './projects/06-Simple-Table-Generator/index.html'
    }, {
        title: 'Simon Game',
        date: 'September 4, 2020',
        description: 'An online version of the classic game Simon, operated with vanilla JavaScript',
        link: './projects/05-Simon-Game/index.html'
    }, {
        title: 'Book Catalog',
        date: 'August 20, 2020',
        description: 'A book catalog powered by Node.js with the Express.js framework',
        link: './projects/04-Book-Catalog/index.html'
    }, {
        title: 'Login Page with React',
        date: 'August 2, 2020',
        description: 'A sample login page that utilizes React.js and LocalStorage',
        link: './projects/03-Login-Page-with-React/transpiled/index.html'
    }, {
        title: 'Calculator',
        date: 'July 11, 2020',
        description: 'A simple calculator that operates with vanilla JavaScript',
        link: './projects/02-JavaScript-Calculator/index.html'
    }, {
        title: 'General Knowledge Quiz',
        date: 'July 5, 2020',
        description: 'A trivia quiz powered by the Handlebars.js library and vanilla JavaScript',
        link: './projects/01-General-Knowledge-Quiz/index.html'
    }]
};

var compiledHtml = template(context);
document.getElementById('projects').innerHTML = compiledHtml;