const tableData = {
    el: document.getElementsByClassName('container')[0],
    columns: 1,
    rows: 1
};

function modifyTable(direction) {
    const table = tableData.el;

    const cell = document.createElement('td');
    
    const textarea = document.createElement('textarea');
    cell.appendChild(textarea);

    if (direction === 'row') {
        if (tableData.rows <= 4) {
            for (let i = 0; i < 1; i++) {
                table.appendChild(document.createElement('tr'));
                for (let j = 0; j < tableData.columns; j++) {
                    let cell = document.createElement('td');
                    let textarea = document.createElement('textarea');
                    cell.appendChild(textarea);

                    table.lastChild.appendChild(cell);
                }
            }

            tableData.rows++;
        }
    } else {
        if (tableData.columns <= 8) {
            for (let i = 0; i < tableData.rows * 1; i++) {
                let cell = document.createElement('td');
                let textarea = document.createElement('textarea');
                cell.appendChild(textarea);

                table.getElementsByTagName('tr')[i].appendChild(cell);
            }

            tableData.columns++;
        }
    }

    table.style.height = 'height: 80vh';
    table.style.width = 'calc(100vw - 2vh)';
}

function resetTable() {
    const table = tableData.el;

    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    }

    while (table.firstElementChild.children.length > 1) {
        table.firstElementChild.removeChild(table.firstElementChild.lastChild);
    }

    table.firstElementChild.firstElementChild.firstElementChild.value = '';

    tableData.columns = 1;
    tableData.rows = 1;
}