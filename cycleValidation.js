// Storage

let graphComponentMatrix = [];

for (let rowIndex=0; rowIndex < maxRows; rowIndex++) {
    let row = [];
    for (let colIndex=0; colIndex < maxCols; colIndex++) {
        // As children may be more than one, hence maintaining an array to include those
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

function isGraphCyclic() {
    return true;
}