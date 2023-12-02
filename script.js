let maxRows = 100;
let maxCols = 26;

let addressColContainerElement = document.querySelector(".address-col-container");

let addressRowContainerElement = document.querySelector(".address-row-container");

let addressBarElement = document.querySelector(".address-bar");

for(let rowIndex=0; rowIndex < maxRows; rowIndex++) {
    let addressColElement = document.createElement("div");
    addressColElement.setAttribute("class", "address-col");
    addressColElement.innerText = rowIndex + 1;
    addressColContainerElement.appendChild(addressColElement);
}

for(let colIndex=0; colIndex < maxCols; colIndex++) {
    let addressRowElement = document.createElement("div");
    addressRowElement.setAttribute("class", "address-row");
    addressRowElement.innerText = String.fromCharCode(65 + colIndex);
    addressRowContainerElement.appendChild(addressRowElement);
}


let cellContainerElement = document.querySelector(".cells-container");

for(let rowIndex=0; rowIndex < maxRows; rowIndex++) {
    let rowElement = document.createElement("div");
    rowElement.setAttribute("class", "row-cell");
    for(let colIndex=0; colIndex < maxCols; colIndex++) {
        let colElement = document.createElement("div");
        colElement.setAttribute("class", "col-cell");
        colElement.setAttribute("contentEditable", true);
        rowElement.appendChild(colElement);
        addListenerForAddressBarDisplay(colElement, rowIndex, colIndex);
    }
    cellContainerElement.appendChild(rowElement);
}


function addListenerForAddressBarDisplay(colElement, rowIndex, colIndex) {
    colElement.addEventListener("click", (e) => {
        let rowId = rowIndex + 1;
        let colId = String.fromCharCode(65 + colIndex);
        addressBarElement.value = `${colId}${rowId}`;
    })
}