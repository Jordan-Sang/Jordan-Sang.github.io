var stations = {};

var els = {
    station: document.getElementsByClassName('station')[0],
    tablesContainer: document.getElementsByClassName('tables-container')[0],
    count: document.getElementById('count'),
    colors: document.getElementById('colors'),
    invert: document.getElementById('invert')
};

var buttons = {
    minus: function() {manageStations(-1);},
    plus: function() {manageStations(1);},
    reset: function() {resetStations();},
    invert: function() {invertColors();},
    list: function() {openWaitlist();},
    back: function() {nextStation(null, -1);},
    next: function() {nextStation(null, 1);},
};

var sortArr = (x, y) => x - y;

var setStations = function() {
    stations[6] = [{
        name: 'Front',
        rotate: false,
        tables: [20, 21, 22, 23, 30, 31, 32, 33]
    }, {
        name: 'Atrium',
        rotate: false,
        tables: [1, 2, 10, 11, 12, 13, 14, 15]
    }, {
        name: 'Back',
        rotate: false,
        tables: [3, 4, 5, 6, 40, 41]
    }, {
        name: 'Back',
        rotate: false,
        tables: [42, 43, 44, 45]
    }, {
        name: 'Back',
        rotate: true,
        tables: [50, 51, 52, 53]
    }, {
        name: 'Back',
        rotate: false,
        tables: [54, 55, 56, 60, 61]
    }, {
        name: 'Right Back',
        rotate: false,
        tables: [70, 71, 80, 81, 82, 83, 84, 85, 90, 91, 92, 93]
    }];
    
    stations[7] = [{
        name: 'Front',
        rotate: false,
        tables: [20, 21, 22, 23, 30, 31]
    }, JSON.parse(JSON.stringify(stations[6].slice(1, 2)[0])), {
        name: 'Back',
        rotate: false,
        tables: [32, 33, 40, 41, 50]
    }, {
        name: 'Back',
        rotate: false,
        tables: [3, 4, 5, 6]
    }, {
        name: 'Back',
        rotate: false,
        tables: [42, 43, 44, 45]
    }, {
        name: 'Back',
        rotate: true,
        tables: [51, 52, 53]
    }, JSON.parse(JSON.stringify(stations[6].slice(5, 6)[0])), JSON.parse(JSON.stringify(stations[6].slice(6, 7)[0]))];
    
    stations[8] = [stations[7][0], stations[7][1], stations[7][2], stations[7][3], stations[7][4], stations[7][5], stations[7][6], {
        name: 'Right Back',
        rotate: false,
        tables: [70, 71, 80, 81, 82, 83]
    }, {
        name: 'Right Back',
        rotate: false,
        tables: [84, 85, 90, 91, 92, 93]
    }];

    stations[5] = JSON.parse(JSON.stringify(stations[6].slice(0, -1)));

    stations[4] = [JSON.parse(JSON.stringify(stations[6].slice(0, 1)[0])), JSON.parse(JSON.stringify(stations[6].slice(1, 2)[0])), {
        name: 'Back',
        rotate: false,
        tables: [3, 4, 5, 6, 40, 41, 42, 43, 44, 45]
    }, {
        name: 'Back',
        rotate: false,
        tables: [50, 51, 52, 53, 54, 55, 56, 60, 61]
    }];

    stations[3] = [stations[4][0], stations[4][1], {
        name: 'Back',
        rotate: false,
        tables: [3, 4, 5, 6, 40, 41, 42, 43, 44, 45, 50, 51, 52, 53, 54, 55, 56, 60, 61]
    }];

    for (var i = 3; i <= 8; i++) {
        for (var j = 0; j < stations[i].length; j++) {
            stations[i][j].active = false;
            stations[i][j].id = j;
            stations[i][j].sat = [];
            console.log(i, j, stations[i][j].id);
        }

        stations[i][0].active = true;
    }

    stations.stations = !stations.count ? stations[6] : stations[count];
};

var toggleTable = function(e) {
    var el = e.target;
    var num = Number(e.target.innerText);
    
    var station;
    var index;

    var isEqual = (x) => x === num;
    var arrIndex = (length) => length ? length : 0;

    for (var i = 0; i < stations.stations.length; i++) {
        for (var j = 0; j < stations.stations[i].total; j++) {
            if (stations.stations[i].tables[j] === num) {
                index = [i, j];
            } else if (stations.stations[i].sat[j] === num) {
                index = [i, j];
            }
        }
    }

    station = stations.stations[index[0]]; 

    if (station.tables.findIndex(isEqual) !== -1) {
        if (station.active) {
            nextStation(station, 1);
        }

        station = stations.stations[index[0]];
        stations.stations.available -= 1;

        station.tables.splice(index[1], 1);
        station = station.sat;
        el.className = 'table clickable sat';
    } else {
        if (stations.stations.available === 0) {
            nextStation(station, 1);
        }

        stations.stations.available += 1;
        station.sat.splice(index[1], 1);
        station = station.tables;
        el.className = stations.stations[index[0]].active ? 'table clickable active' : 'table clickable';
    }

    station[arrIndex(station.length)] = num;
    station.sort(sortArr);
};

var setStation = function(station) {
    if (!station) {
        for (var i = 0; i < stations.stations.length; i++) {
            if (stations.stations[i].active) {
                return stations.stations[i];
            }
        }
    }

    return station;
};

var unselectStation = function(station) {
    station.active = false;
    stations.stations.active = station.id;

    for (var i = 0; i < station.total; i++) {
        var el = document.getElementsByClassName('table clickable active')[0];

        if (el) {
            el.className = el.classList.contains('sat') ? 'table clickable sat' : 'table clickable';
        }
    }
};

var rotateStation = function(station, index, pos) {
    var current;

    for (i = 1; i < stations.stations.length; i++) {
        console.log(index, i, pos);

        if ((index + (i * pos) < stations.stations.length) && (index + (i * pos) >= 0)) {
            current = stations.stations[Math.abs(index + (i * pos))];
        } else {
            current = stations.stations[stations.stations.length - Math.abs(index + (i * pos))];
        }

        if ((current !== undefined) && !(current.rotate) && (current.tables.length > 0)) {
            station = current;
            break;
        }
    }

    if ((station.tables.length === 0) || (!station)) {
        if (index === -1) {
            index = stations.stations.length - 1;
        }

        station = stations.stations[index];

        console.log(station.tables, station.tables.length);
    }

    activateStation(station);
};

var activateStation = function(station) {
    station.active = true;
    stations.stations.active = station.id;

    els.station.innerText = station.name;
    
    for (i = station.start; i < (station.total + station.start); i++) {
        var el = document.getElementsByClassName('table clickable')[i];
        el.className = el.classList.contains('sat') ? 'table clickable active sat' : 'table clickable active';
    }
};

var nextStation = function(station, pos) {
    var index;
    
    station = setStation(station);
    index = station.id;

    unselectStation(station);

    if ((!(stations.stations[index + 1])) && (pos > 0)) {
        for (var i = 0; i < stations.stations.length; i++) {
            if (stations.stations[i].tables.length !== 0) {
                station = stations.stations[i];
                index = (i === 0) ? -1 : index;
                break;
            } 
        }

        
    } else if ((index === 0) && (pos < 0)) {
        station = stations.stations[stations.length - 1];
        index = stations.stations.length;
    }
    
    rotateStation(station, index, pos);
};

var loadTables = function() {
    var active = false;
    var start = 0;

    stations.stations.available = 0;

    for (var i = 0; i < stations.stations.length; i++) {
        stations.stations[i].total = stations.stations[i].tables.length;
        stations.stations[i].start = start;
        active = stations.stations[i].active;

        if (active) {
            els.station.innerText = stations.stations[i].name;
        }
        
        for (var j = 0; j < stations.stations[i].tables.length; j++) {
            var el = document.createElement('p');
            el.className = active ? 'table clickable active' : 'table clickable';
            
            el.innerText = stations.stations[i].tables[j];
            el.onclick = toggleTable; 
        
            els.tablesContainer.appendChild(el);
        }

        start += j;
        stations.stations.available += j;
    }

    stations.stations.active = 0;
};

var manageStations = function(pos) {
    var count = Number(els.count.innerText);
    if ((count > 3) && (pos === -1) || (count <= 7) && (pos === 1)) {
        stations.count = count + pos;
        els.count.innerText = stations.count;
        stations.stations = stations[stations.count];
        resetStations();
    }
};

var resetStations = function() {
    while (els.tablesContainer.children.length > 0) {
        els.tablesContainer.removeChild(els.tablesContainer.children[0]);
    }

    for (var i = 0; i < stations.stations.length; i++) {
        stations.stations[i].active = false;
        stations.stations[i].tables = [...new Set([...stations.stations[i].tables, ...stations.stations[i].sat])].sort(sortArr);
    }

    stations.stations[0].active = true;
    stations.stations.active = 0;

    loadTables();
};

var invertColors = function() {
    if (els.invert.disabled) {
        els.invert.disabled = false;
        els.colors.disabled = true;
    } else {
        els.invert.disabled = true;
        els.colors.disabled = false;
    }
};

var openWaitlist = function() {
    window.open('http://connect.lrsus.com/', '_blank');
};

var keyListener = function(e) {
    switch (e.code) {
        case 'ArrowLeft':
            nextStation(null, -1);
            break;
        case 'ArrowRight':
            nextStation(null, 1);
            break;
        default:
            break;
    }
};

document.body.onload = function() { setStations(); loadTables(); };
document.body.onkeydown = keyListener;