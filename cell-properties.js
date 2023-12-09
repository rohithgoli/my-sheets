let sheetDB = [];

for(let rowIndex=0; rowIndex < maxRows; rowIndex++) {
    let sheetRow = [];
    for(let colIndex=0; colIndex < maxCols; colIndex++) {
        let cellProperty = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "sans-serif",
            fontSize: "14",
            fontColor: "#000000",
            bgColor: ""
        };
        sheetRow.push(cellProperty);
    }
    sheetDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");

let fontColor = document.querySelector(".font-color-property");
let bgColor = document.querySelector(".background-color-property");

let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let addressBar = document.querySelector(".address-bar");

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// cell interactivity with 2-way binding
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProperties(address);

    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProperties(address);
    
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProperties(address);

    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProperties(address);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProperties(address);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProperties(address);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

bgColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProperties(address);

    cellProp.bgColor = bgColor.value;
    cell.style.backgroundColor = cellProp.bgColor;
    bgColor.value = cellProp.bgColor;
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getActiveCellAndProperties(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;

        switch(alignValue) {
            case 'left':
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'center':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'right':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

let cells = document.querySelectorAll(".col-cell");
for(let cellIndex=0; cellIndex < cells.length; cellIndex++) {
    addListenerToAttachCellProperties(cells[cellIndex]);
}

function addListenerToAttachCellProperties(cell) {
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rowId, colId] = extractRowIdColIdFromAddress(address);
        let cellProp = sheetDB[rowId][colId];

        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.bgColor;
        cell.style.textAlign = cellProp.alignment;

        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        bgColor.value = cellProp.bgColor;

        switch(cellProp.alignment) {
            case 'left':
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'center':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case 'right':
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
}

function getActiveCellAndProperties(address) {
    let [rowId, colId] = extractRowIdColIdFromAddress(address);
    let cell = document.querySelector(`.col-cell[rId="${rowId}"][cId="${colId}"]`);
    let cellProp = sheetDB[rowId][colId];
    return [cell, cellProp]
}

function extractRowIdColIdFromAddress(address) {
    let rowId = parseInt(address.slice(1)-1);
    let colId = parseInt(address.charCodeAt(0))-65;
    return [rowId, colId];
}