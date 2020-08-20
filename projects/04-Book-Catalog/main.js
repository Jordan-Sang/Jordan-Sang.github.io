const main = document.getElementsByTagName('main')[0];

const searchBar = document.getElementById('search');
const searchButton = document.getElementById('search-button');

const browseAll = document.getElementById('browse-all');
const searchContainer = document.getElementsByClassName('search-container')[0];

const adminTools = document.getElementsByClassName('admin-tools')[0];

const resetCatalog = () => {
    while (main.lastChild.className !== 'search-container') {
        main.removeChild(main.lastChild);
    }

    searchBar.value = '';
    searchContainer.style.display = 'flex';
};

const resetAdminTools = () => {
    main.removeChild(main.lastChild);
    toggleActiveTool('admin-tools');

    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'text') {
            inputs[i].value = '';
        }
    }
};

const generateTools = (container, resetFunct, page) => {
    const tools = document.createElement('div');
    tools.className = 'tools';

    const back = document.createElement('img');
    back.classList.add('back', 'clickable');
    back.src = './images/back.png';

    tools.appendChild(back);

    const searchAgain = document.createElement('p');
    searchAgain.classList.add('search-again', 'clickable');
    searchAgain.innerText = (page === 'search' ? 'Search Again' : 'Return to Tools');
    
    tools.appendChild(searchAgain);
    document.getElementsByClassName(container)[0].appendChild(tools);

    document.getElementsByClassName('back')[0].addEventListener('click', resetFunct);
    document.getElementsByClassName('search-again')[0].addEventListener('click', resetFunct);
};

const generateResults = (jsonResponse, container) => {
    if (jsonResponse.length >= 1) {
        const results = document.createElement('div');
        results.className = 'results';

        main.appendChild(results);

        for (let i = 0; i < jsonResponse.length; i++) {
            let container = document.createElement('div');
            container.className = 'book';

            let title = document.createElement('p');
            title.classList.add('title', 'text');
            title.innerText = jsonResponse[i].title;

            container.appendChild(title);

            let author = document.createElement('p');
            author.classList.add('author', 'text');
            author.innerText = jsonResponse[i].author;

            container.appendChild(author);

            let image = document.createElement('img');
            image.className = 'image';
            image.src = jsonResponse[i].coverSrc;

            container.appendChild(image);

            document.getElementsByClassName('results')[0].appendChild(container);
        }

        generateTools('results', resetCatalog, 'search');

        container.style.display = 'none';
        document.getElementsByClassName('results')[0].style.display = 'flex';
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';

        main.appendChild(noResults);

        const error = document.createElement('p');
        error.className = 'message';
        error.innerText = 'No Results Found';

        document.getElementsByClassName('no-results')[0].appendChild(error);

        container.style.display = 'none';
        document.getElementsByClassName('no-results')[0].style.display = 'flex';

        generateTools('no-results', resetCatalog, 'search');
    }
};

const generateMessage = jsonResponse => {
    let displayMessage;

    if (jsonResponse.status < 400) {
        displayMessage = 'Success!';
    } else if (jsonResponse.status > 400) {
        displayMessage = 'Something went wrong...';
    }

    const messageContainer = document.createElement('div');
    messageContainer.className = 'no-results';

    main.appendChild(messageContainer);

    const message = document.createElement('p');
    message.className = 'message';
    message.innerText = displayMessage;

    main.lastChild.appendChild(message);

    toggleActiveTool('no-results');

    generateTools('no-results', resetAdminTools, 'admin');
};

const getAllBooks = () => {
    fetch(`http://localhost:4001/books`).then(response => response.json()).then(jsonResponse => {
        generateResults(jsonResponse, searchContainer);
    });      
};

const searchByQuery = () => {
    let search = searchBar.value.toLowerCase();

    if (search.length >= 1) {
        return fetch(`http://localhost:4001/books/${search}`).then(response => {
            if (response.ok && response.status < 400) {
                return response.json();
            } else {
                return response;
            }
        }).then(jsonResponse => {
            generateResults(jsonResponse, searchContainer);
        });
    }  
};

const addBook = () => {
    let title = document.getElementsByClassName('title')[0].value;
    let author = document.getElementsByClassName('author')[0].value;
    let altAuthorSpelling;

    if (author.includes('.')) {
        altAuthorSpelling = author.split('.').join('');
    } else {
        altAuthorSpelling = '';
    }

    let coverSrc = document.getElementsByClassName('img-link')[0].value;
    let id = Number(document.getElementsByClassName('id')[0].value);

    if (title !== '' && author !== '' && coverSrc !== '' && id !== '' && title !== ' ' && author !== ' ' && coverSrc !== ' ' && id !== ' ') {
        let newBook = {
            title: title,
            author: author,
            altAuthorSpelling: altAuthorSpelling,
            coverSrc: coverSrc,
            id: id
        };

        fetch(`http://localhost:4001/admin/add`, {
            method: 'POST',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        }).then(response => response.json()).then(jsonResponse => {
            generateMessage(jsonResponse);
        });
    }
};

const updateBook = () => {
    let title = document.getElementsByClassName('title')[1].value;
    let author = document.getElementsByClassName('author')[1].value;
    let altAuthorSpelling;

    if (author.includes('.')) {
        altAuthorSpelling = author.split('.').join('');
    } else {
        altAuthorSpelling = '';
    }

    let coverSrc = document.getElementsByClassName('img-link')[1].value;
    let id = Number(document.getElementsByClassName('id')[1].value);

    if (title !== '' && author !== '' && coverSrc !== '' && id !== '' && title !== ' ' && author !== ' ' && coverSrc !== ' ' && id !== ' ') {
        let updatedBook = {
            title: title,
            author: author,
            altAuthorSpelling: altAuthorSpelling,
            coverSrc: coverSrc,
            id: id
        };

        fetch(`http://localhost:4001/admin/update`, {
            method: 'PUT',
            type: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        }).then(response => response.json()).then(jsonResponse => {
            generateMessage(jsonResponse);
        });
    }
};

const deleteBook = () => {
    let id = Number(document.getElementsByClassName('id')[2].value);

    if (id !== '' && id !== ' ') {
        fetch(`http://localhost:4001/admin/delete`, {
            method: 'DELETE',
            type: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(response => response).then(jsonResponse => {
            generateMessage(jsonResponse);
        });
    }
};

const toggleActiveTool = async (className) => {
    adminTools.style.display = 'none';
    document.getElementsByClassName('add')[0].style.display = 'none';
    document.getElementsByClassName('update')[0].style.display = 'none';
    document.getElementsByClassName('delete')[0].style.display = 'none';

    document.getElementsByClassName(className)[0].style.display = 'flex';

    if (className === 'add') {
        const newId = await fetch(`http://localhost:4001/books`).then(response => response.json()).then(jsonResponse => jsonResponse.length + 1);

        document.getElementsByClassName('add')[0][3].value = newId;
        return true;
    }
};

if (searchContainer) {
    searchButton.addEventListener('click', searchByQuery);
    searchBar.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            searchButton.click();
        }
    });

    browseAll.addEventListener('click', getAllBooks);

    document.getElementById('catalog-search').addEventListener('click', resetCatalog);
} else {
    document.querySelectorAll('.tool').forEach(function(el) {
        el.addEventListener('click', function(element) {
            toggleActiveTool(el.id);
        });
    });

    document.querySelectorAll('.submit').forEach(function(el) {
        if (el.id === 'add-submit') {
            el.addEventListener('click', addBook);
        } else if (el.id === 'update-submit') {
            el.addEventListener('click', updateBook);
        } else if (el.id === 'delete-submit') {
            el.addEventListener('click', deleteBook);
        }
    });
}