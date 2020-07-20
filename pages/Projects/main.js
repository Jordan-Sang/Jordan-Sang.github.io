"use strict";

var source = document.getElementById('templated-content');
var sourceContent = source.innerHTML;
var template = Handlebars.compile(sourceContent);

var context = {
    projects: [{
        title: 'General Knowledge Quiz',
        date: 'July 5, 2020',
        description: 'A trivia quiz powered by the Handlebars.js library and vanilla JavaScript',
        link: 'project-folders/01 - General Knowledge Quiz/index.html'
    }, {
        title: 'Calculator',
        date: 'July 11, 2020',
        description: 'A simple calculator that operates with vanilla JavaScript',
        link: 'project-folders/02 - JavaScript Calculator/index.html'
    }]
};

var compiledHtml = template(context);
document.getElementById('projects').innerHTML = compiledHtml;