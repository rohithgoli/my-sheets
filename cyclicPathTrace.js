
function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let [sourceRow, sourceCol] = cycleResponse;
    let visited = [];
    let dfsVisitedStackTrace = [];

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

    
    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, sourceRow, sourceCol, visited, dfsVisitedStackTrace);
    if (response === true) return Promise.resolve(true);
    
    return Promise.resolve(false);
}


async function dfsCycleDetectionTracePath(graphComponentMatrix, sourceRowNode, sourceColNode, visited, dfsVisitedStackTrace) {
    visited[sourceRowNode][sourceColNode] = true;
    dfsVisitedStackTrace[sourceRowNode][sourceColNode] = true;

    let cell = document.querySelector(`.col-cell[rId="${sourceRowNode}"][cId="${sourceColNode}"]`);    
    cell.style.backgroundColor = "lightblue";
    await colorPromise(); // 1sec finished

    for(let childrenIndex=0; childrenIndex < graphComponentMatrix[sourceRowNode][sourceColNode].length; childrenIndex++) {
        let [childRowId, childColId] = graphComponentMatrix[sourceRowNode][sourceColNode][childrenIndex];
        if(visited[childRowId][childColId] === false) {
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, childRowId, childColId, visited, dfsVisitedStackTrace);
            if (response === true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        }else if (visited[childRowId][childColId] === true && dfsVisitedStackTrace[childRowId][childColId] === true) {
            let cyclicCell = document.querySelector(`.col-cell[rId="${childRowId}"][cId="${childColId}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();
            
            cyclicCell.style.backgroundColor = "transparent";
            cell.style.backgroundColor = "transparent";
            await colorPromise();
            
            return Promise.resolve(true);
        }
    }

    dfsVisitedStackTrace[sourceRowNode][sourceColNode] = false;
    return Promise.resolve(false);
}