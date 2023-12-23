// Storage --> 2D Array

let graphComponentMatrix = [];

for (let rowIndex=0; rowIndex < maxRows; rowIndex++) {
    let row = [];
    for (let colIndex=0; colIndex < maxCols; colIndex++) {
        // As children may be more than one, hence maintaining an array to include those
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

function isGraphCyclic(graphComponentMatrix) {
    // Dependency --> visited, dfsVisitedStackTrace --> 2D Array
    let visited = []; // Node visit trace
    let dfsVisitedStackTrace = []; // Stack visit trace

    for(let rowIndex=0; rowIndex < maxRows; rowIndex++) {
        let visitedRow = [];
        let dfsVisitedStackTraceRow = [];
        
        for(let colIndex=0; colIndex < maxCols; colIndex++) {
            visitedRow.push(false);
            dfsVisitedStackTraceRow.push(false);
        }

        visited.push(visitedRow);
        dfsVisitedStackTrace.push(dfsVisitedStackTraceRow);
    }

    for(let rowIndexNode=0; rowIndexNode < maxRows; rowIndexNode++) {
        for(let colIndexNode=0; colIndexNode < maxCols; colIndexNode++) {
            if (visited[rowIndexNode][colIndexNode] === false) {
                let response = dfsCycleDetection(graphComponentMatrix, rowIndexNode, colIndexNode, visited, dfsVisitedStackTrace);
                if (response === true) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Start --> visited(true), dfsVisited(true)
// end --> dfsVisited(false)
// if visited[rowNode][colNode] === true --> path is already explored so discontinue it and proceed with other
// cycleDetectionCondition --> visited[rowNode][colNode] === true && dfsVisited[rowNode][colNode] === true --> cycle
// returns --> true/false
function dfsCycleDetection(graphComponentMatrix, sourceRowNode, sourceColNode, visited, dfsVisitedStackTrace) {
    visited[sourceRowNode][sourceColNode] = true;
    dfsVisitedStackTrace[sourceRowNode][sourceColNode] = true;

    // A1 --> [ [0, 1], [1, 0], [5, 10], ....]
    for (let childrenIndex=0; childrenIndex < graphComponentMatrix[sourceRowNode][sourceColNode].length; childrenIndex++) {
        let [childRowId, childColId] = graphComponentMatrix[sourceRowNode][sourceColNode][childrenIndex];
        if (visited[childRowId][childColId] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, childRowId, childColId, visited, dfsVisitedStackTrace);
            if (response === true) return true; // cycle detected, no further path exploration required
        } else if (visited[childRowId][childColId] === true && dfsVisitedStackTrace[childRowId][childColId] === true) {
            return true;    // cycle detected, no further path exploration required
        }
    }

    dfsVisitedStackTrace[sourceRowNode][sourceColNode] = false;
    return false;
}