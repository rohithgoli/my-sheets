let formulaBarElement = document.querySelector(".formula-bar");

for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
    for(let colIndex = 0; colIndex < maxCols; colIndex++) {
        let cell = document.querySelector(`.col-cell[rId="${rowIndex}"][cId="${colIndex}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [cell, cellProp] = getActiveCellAndProperties(address);
            let enteredData = cell.innerText;
            // console.log(enteredData, cellProp.value);
            // if(enteredData === cellProp.value) return;
            cellProp.value = enteredData;
            /* ToDO: Handle If formula is removed and value is directly typed by user */

            // removeChildFromParent(cellProp.formula);
            // cellProp.formula = "";
            // updateChildrenCells(address);
        })
    }
}

formulaBarElement.addEventListener("keydown", (event) => {
    let inputFormula = formulaBarElement.value;
    if(event.key === "Enter" && inputFormula) {
        
        // For different formula, remove Old Parent-child relation & evaluate new formula, add new Parent-child relation
        let address = addressBar.value;
        let [cell, cellProp] = getActiveCellAndProperties(address);
        if(inputFormula !== cellProp.formula) {
            removeChildFromParent(cellProp.formula);
        }

        addChildToGraphComponent(inputFormula, address);
        // check formula for cyclic condition before evaluation
        let isCyclic = isGraphCyclic();
        if (isCyclic === true) {
            alert("Your Formula is Cyclic !!!");
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }
        
        let evaluatedValue = evaluateFormula(inputFormula);

        setEvaluatedFormulaValueToCellUIAndCellProp(address, evaluatedValue, inputFormula);
        addChildToParent(inputFormula);
        updateChildrenCells(address);
    }
})


function addChildToGraphComponent(formula, childAddress) {
    let [childRowId, childColId] = extractRowIdColIdFromAddress(childAddress);

    let encodedFormula = formula.split(" ");
    for(let index=0; index < encodedFormula.length; index++) {
        let asciiValueFirstIndex = encodedFormula[index].charCodeAt(0);
        if (asciiValueFirstIndex >= 65 && asciiValueFirstIndex <= 90) {
            let [parentRowId, parentColId] = extractRowIdColIdFromAddress(encodedFormula[index]);
            // B1 = A1 + 30
            // Here, A1 is parent & B1 is child
            graphComponentMatrix[parentRowId][parentColId].push([childRowId, childColId]);
        }
    }
}


function removeChildFromGraphComponent(formula, childAddress) {
    let [childRowId, childColId] = extractRowIdColIdFromAddress(childAddress);

    let encodedFormula = formula.split(" ");
    for(let index=0; index < encodedFormula.length; index++) {
        let asciiValueFirstIndex = encodedFormula[index].charCodeAt(0);
        if(asciiValueFirstIndex >= 65 && asciiValueFirstIndex <= 90) {
            let [parentRowId, parentColId] = extractRowIdColIdFromAddress(encodedFormula[index]);
            graphComponentMatrix[parentRowId][parentColId].pop();
        }
    }
}


function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getActiveCellAndProperties(parentAddress);
    let children = parentCellProp.children;

    for(let index=0; index < children.length; index++) {
        let childAddress = children[index];
        let [childCell, childCellProp] = getActiveCellAndProperties(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setEvaluatedFormulaValueToCellUIAndCellProp(childAddress, evaluatedValue, childFormula);
        updateChildrenCells(childAddress);
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" "); // UI criteria that formula entered should be space separated eg: A10 * B2
    for(let index = 0; index < encodedFormula.length; index++) {
        let asciiValue = encodedFormula[index].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getActiveCellAndProperties(encodedFormula[index]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let index=0; index < encodedFormula; index++) {
        let asciiValue = encodedFormula[index].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getActiveCellAndProperties(encodedFormula[index]);
            let indexToRemove = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(indexToRemove, 1);
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for(let index=0; index < encodedFormula.length; index++) {
        let asciiValueAtFirstIndex = encodedFormula[index].charCodeAt(0);
        if (asciiValueAtFirstIndex >= 65 && asciiValueAtFirstIndex <= 90) {
            let [cell, cellProp] = getActiveCellAndProperties(encodedFormula[index]);
            encodedFormula[index] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setEvaluatedFormulaValueToCellUIAndCellProp(address, evaluatedValue, formula) {
    let [cell, cellProp] = getActiveCellAndProperties(address);

    cell.innerText = evaluatedValue;
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}