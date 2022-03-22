var selected = [];
var available = [{
    	id: "grapes",
        name: "Grapes",
        src: "https://images.albertsons-media.com/is/image/ABS/184100012"
    }, {
    	id: "apples",
        name: "Apples",
        src: "https://m.media-amazon.com/images/I/918YNa3bAaL._SX425_.jpg"
    }, {
    	id: "blueberries",
        name: "Blueberries",
        src: "https://5.imimg.com/data5/CR/CJ/MY-3040698/blueberry-fruit-500x500.jpg"
    }, {
    	id: "oranges",
        name: "Oranges",
        src: "http://think360.in/iRestaurant/wp-content/uploads/2018/04/orange.jpg"
    }, {
    	id: "cookie",
        name: "Cookie",
        src: "https://images.squarespace-cdn.com/content/v1/58bee49e579fb3f6f0f52caf/1586311793952-S4U3ACW3WQF4YSOQ49UJ/cookie.png"
    }, {
    	id: "cake",
        name: "Cake",
        src: "https://images.squarespace-cdn.com/content/v1/538500e4e4b0fa9e95efc7b9/1474396722095-Z3PFWKHLRBKM4QASI7UN/adj_SoGoodChocCake.png"
    }, {
    	id: "broccoli",
        name: "Broccoli",
        src: "https://www.dudafresh.com/hubfs/images-2017/p-main-broccoli.png"
    }, {
    	id: "milk",
        name: "Milk",
        src: "https://alexandrefamilyfarm.com/wp-content/uploads/48oz_Whole_Web_Rect_Compressed.png"
    }, {
    	id: "bread",
        name: "Bread",
        src: "https://michiganbread.com/wp-content/uploads/2018/09/Deli-Breads.png"
    }, {
    	id: "steak",
        name: "Steak",
        src: "https://eatmightymeals.com/wp-content/uploads/2019/05/web_layers_0000_19.png"
    }, {
    	id: "eggs",
        name: "Eggs",
        src: "https://www.fda.gov/files/Egg-Split-In-Halfe.png"
    }, {
    	id: "flour",
        name: "Flour",
        src: "https://d2aam04nmhpdf8.cloudfront.net/images/images/000/036/053/xlarge/1026.png?1589766858"
    }, {
    	id: "cheese",
        name: "Cheese",
        src: "https://www.sargento.com/assets/00165_SL_Swss_7oz_Frnt.png"
    }, {
    	id: "pasta",
        name: "Pasta",
        src: "https://www.buitoni.com/wp-content/uploads/2020/01/9oz-Angel-Hair-V2.png"
    }, {
    	id: "chicken",
        name: "Chicken",
        src: "https://www.tyson.com/static/c78d8277a2e25309a1752f903b7d3164/82c3a/tyson-fresh-chicken-fresh-split-chicken-breasts-980x768.png"
    }, {
    	id: "cereal",
        name: "Cereal",
        src: "https://s3.r29static.com/bin/entry/40c/x/1757660/image.png"
    }, {
    	id: "spinach",
        name: "Spinach",
        src: "https://www.freshexpress.com/wp-content/uploads/2021/09/FEX_TenderLeaf_Spinach_Bag_8oz_86106_US_FRONT-322x400.png"
    }, {
    	id: "garlic",
        name: "Garlic",
        src: "https://spiceworldinc.com/wp-content/uploads/2020/01/Fresh-Garlic-Product-Page-Feature.png"
    }, {
    	id: "onion",
        name: "Onion",
        src: "https://mezeh.com/wp-content/uploads/2019/10/Pickled-onion.png"
    }, {
    	id: "soup",
        name: "Soup",
        src: "https://www.liptonkitchens.com/wp-content/uploads/sites/119/2018/12/Noodle-Soup-Soup-Mix-with-Real-Chicken-Broth_Desktop-379x396-old.png.png?x38047"
    }
];
var els = {
	selected: document.getElementsByClassName("groceries")[0],
    available: document.getElementsByClassName("groceries")[1],
    selectedParent: document.getElementsByClassName("selected")[0],
    availableParent: document.getElementsByClassName("available")[0]
};

function createItem() {
	var div = document.createElement("div");
    var h3 = document.createElement("h3");
    var img = document.createElement("img");
    var addR = document.createElement("div");
    
    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(addR);
    
    return div;
}

function alphabetizeItems() {
	selected.sort((a, b) => (a.id > b.id ? 1 : -1));
    available.sort((a, b) => (a.id > b.id ? 1 : -1));
}

function moveItems() {
	var id = event.target.parentElement.id;
    var index;
    if (selected.findIndex(x => x.id === id) === -1) {
    	index = available.findIndex(x => x.id === id);
        selected.push(available[index]);
        available.splice(index, 1);
    } else {
    	index = selected.findIndex(x => x.id === id);
        available.push(selected[index]);
        selected.splice(index, 1);
    }
}

function updateQuantities() {
	els.selectedParent.children[0].innerText = 'Selected Items – ' + selected.length;
    els.availableParent.children[0].innerText = 'Available Items – ' + available.length;
}

function clearLists() {
	els.selected.innerHTML = '';
    els.available.innerHTML = '';
}

function storeLists() {
	localStorage.setItem('selected', JSON.stringify(selected));
    localStorage.setItem('available', JSON.stringify(available));
}

function downloadLists() {
    if (!(localStorage.getItem('selected') && localStorage.getItem('available'))) {
    	alphabetizeItems();
    	storeLists();
        updateQuantities();
    } else {
    	selected = JSON.parse(localStorage.getItem('selected'));
        available = JSON.parse(localStorage.getItem('available'));
        updateQuantities();
    }
}

function outputLists() {
    var div, i;

	if (selected.length === 0) {
    	els.selectedParent.style.display = 'none';
    } else {
        els.selectedParent.style.display = 'initial';
        for (i = 0; i < selected.length; i++) {
            div = createItem();
            div.id = selected[i].id;
            div.children[0].innerText = selected[i].name;
            div.children[1].src = selected[i].src;
            div.children[2].innerText = "–";
            div.children[2].onclick = updateLists;
            els.selected.appendChild(div);
        }
    }
    
    if (available.length === 0) {
    	els.availableParent.style.display = 'none';
    } else {
    	els.availableParent.style.display = 'initial';
    	for (i = 0; i < available.length; i++) {
        	div = createItem();
            div.id = available[i].id;
            div.children[0].innerText = available[i].name;
            div.children[1].src = available[i].src;
            div.children[2].innerText = "+";
            div.children[2].onclick = updateLists;
            els.available.appendChild(div);
        }
    }
}

function loadLists() {
	downloadLists();
    outputLists();
}

function updateLists() {
	moveItems();
    alphabetizeItems();
    clearLists();
    storeLists();
    loadLists();
}

window.onload = loadLists();