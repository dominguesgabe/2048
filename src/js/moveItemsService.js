angular.module("app2048").service("moveItemsService", function () {
    const moveItemsUp = (positionsDOM) => {
        // let positionsDOM = angular.copy(scopePositionsDOM); //voltei a usar o param por referência pois o desempenho foi muito afetado, TODO analisar
        let stateChanged = false;

        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                if (positionsDOM[i][j]) {
                    let [summedPositions, upSumChanged] = upSum(i, j, positionsDOM);
                    positionsDOM = summedPositions;

                    let [movedPositions, upSumMoved] = upMove(i, j, positionsDOM);
                    positionsDOM = movedPositions;
                    
                    if (upSumChanged || upSumMoved) {
                        stateChanged = true;
                    }
                }
            }
        }
        
        return [
            positionsDOM,
            stateChanged
        ];
    };

    const upSum = (actualIndex, actualCol, positionsDOM) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex + 1; lineLoop < 4; lineLoop++) {
            if (positionsDOM[lineLoop][actualCol] && positionsDOM[lineLoop][actualCol] === positionsDOM[actualIndex][actualCol]) {
                let isPossibleSumFar;

                for (let counter = lineLoop - 1; counter >= 0; counter--) {

                    if (positionsDOM[counter][actualCol]) {
                        break;
                    }

                    isPossibleSumFar = true;
                }


                if (isPossibleSumFar) {
                    positionsDOM[actualIndex][actualCol] = positionsDOM[actualIndex][actualCol] * 2;
                    positionsDOM[lineLoop][actualCol] = null;

                    stateChanged = true;
                    break;
                } else if (positionsDOM[actualIndex][actualCol] && positionsDOM[actualIndex][actualCol] === positionsDOM[actualIndex + 1][actualCol]) {
                    positionsDOM[actualIndex][actualCol] = positionsDOM[actualIndex][actualCol] * 2;
                    positionsDOM[actualIndex + 1][actualCol] = null;

                    stateChanged = true;
                    break;
                }
            }
        };

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const upMove = (actualIndex, actualCol, positionsDOM) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex - 1; i >= 0; i--) {
            if (positionsDOM[i][actualCol]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positionsDOM[availableCornerNearest][actualCol] = positionsDOM[actualIndex][actualCol];
            positionsDOM[actualIndex][actualCol] = null; 

            stateChanged = true;
        }

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const moveItemsDown = (positionsDOM) => {
        // let positionsDOM = angular.copy(scopePositionsDOM);
        let stateChanged = false;

        for (let j = 0; j < 4; j++) {
            for (let i = 3; i >= 0; i--) {
                if (positionsDOM[i][j]) {
                    let [summedPositions, downSumChanged] = downSum(i, j, positionsDOM);
                    positionsDOM = summedPositions;

                    let [movedPositions, downSumMoved] = downMove(i, j, positionsDOM);
                    positionsDOM = movedPositions;
                    
                    if (downSumChanged || downSumMoved) {
                        stateChanged = true;
                    }
                }
            }
        }

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const downSum = (actualIndex, actualCol, positionsDOM) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex - 1; lineLoop >= 0; lineLoop--) {
            if (positionsDOM[lineLoop][actualCol] && positionsDOM[lineLoop][actualCol] === positionsDOM[actualIndex][actualCol] && (lineLoop + 1) < 4) {

                let isPossibleSumFar;

                for (let counter = lineLoop + 1; counter < 4; counter++) {
                    if (positionsDOM[counter][actualCol]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    positionsDOM[actualIndex][actualCol] = positionsDOM[actualIndex][actualCol] * 2;
                    positionsDOM[lineLoop][actualCol] = null;

                    stateChanged = true;
                    break;
                } else if (positionsDOM[actualIndex][actualCol] === positionsDOM[actualIndex - 1][actualCol] && positionsDOM[lineLoop][actualCol]) {
                    positionsDOM[actualIndex][actualCol] = positionsDOM[actualIndex][actualCol] * 2; 
                    positionsDOM[actualIndex - 1][actualCol] = null; 

                    stateChanged = true;
                    break;
                }
            }
        }

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const downMove = (actualIndex, actualCol, positionsDOM) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex + 1; i < 4; i++) {
            if (positionsDOM[i][actualCol]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positionsDOM[availableCornerNearest][actualCol] = positionsDOM[actualIndex][actualCol];
            positionsDOM[actualIndex][actualCol] = null;

            stateChanged = true;
        }

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const moveItemsLeft = (positionsDOM) => {
        // let positionsDOM = angular.copy(scopePositionsDOM);

        let stateChanged = false;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (positionsDOM[i][j]) {
                    let [summedPositions, leftSumChanged] = leftSum(i, j, positionsDOM);
                    positionsDOM = summedPositions;

                    let [movedPositions, leftSumMoved] = leftMove(i, j, positionsDOM);
                    positionsDOM = movedPositions;
                    
                    if (leftSumChanged || leftSumMoved) {
                        stateChanged = true;
                    }
                }
            }
        }

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const leftSum = (actualRow, actualIndex, positionsDOM) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex + 1; lineLoop < 4; lineLoop++) {
            
            if (positionsDOM[actualRow][lineLoop] && positionsDOM[actualRow][actualIndex] === positionsDOM[actualRow][lineLoop]) {
                let isPossibleSumFar;
                
                for (let counter = lineLoop - 1; counter > 0; counter--) {
                    if (positionsDOM[actualRow][counter]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    positionsDOM[actualRow][actualIndex] = positionsDOM[actualRow][actualIndex] * 2;
                    positionsDOM[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                } else if (positionsDOM[actualRow][actualIndex] === positionsDOM[actualRow][actualIndex + 1] && (actualIndex + 1) < 4) {
                    positionsDOM[actualRow][actualIndex] = positionsDOM[actualRow][actualIndex] * 2;
                    positionsDOM[actualRow][actualIndex + 1] = null;

                    stateChanged = true;
                    break;
                }
            }
        }

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const leftMove = (actualRow, actualIndex, positionsDOM) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex - 1; i >= 0; i--) {
            if (positionsDOM[actualRow][i]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positionsDOM[actualRow][availableCornerNearest] = positionsDOM[actualRow][actualIndex];
            positionsDOM[actualRow][actualIndex] = null; 

            stateChanged = true;
        }

        return [
            positionsDOM,
            stateChanged
        ];
    };

    const moveItemsRight = (positionsDOM) => {
        // let positionsDOM = angular.copy(scopePositionsDOM);
        let stateChanged = false;

        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                if (positionsDOM[i][j]) {
                    let [summedPositions, rightSumChanged] = rightSum(i, j, positionsDOM);
                    positionsDOM = summedPositions;

                    let [movedPositions, rightMoveChanged] = rightMove(i, j, positionsDOM);
                    positionsDOM = movedPositions;
                    
                    if (rightSumChanged || rightMoveChanged) {
                        stateChanged = true;
                    }
                }
            }
        }

        return [
            positionsDOM,
            stateChanged
        ];
    }

    const rightSum = (actualRow, actualIndex, positionsDOM) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex; lineLoop >= 0; lineLoop--) {
            
            if (lineLoop < actualIndex && positionsDOM[actualRow][lineLoop] && (lineLoop + 1) < 4 && positionsDOM[actualRow][actualIndex] === positionsDOM[actualRow][lineLoop]) {
                let isPossibleSumFar;
                
                for (let counter = lineLoop + 1; counter < actualIndex; counter++) {
                    if (positionsDOM[actualRow][counter]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    positionsDOM[actualRow][actualIndex] = positionsDOM[actualRow][actualIndex] * 2;
                    positionsDOM[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                } else if (positionsDOM[actualRow][lineLoop] === positionsDOM[actualRow][lineLoop + 1] && (lineLoop + 1) < 4) {
                    positionsDOM[actualRow][actualIndex] = positionsDOM[actualRow][actualIndex] * 2;
                    positionsDOM[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                }
            }
        }

        return [
            positionsDOM,
            stateChanged
        ];
    }

    const rightMove = (actualRow, actualIndex, positionsDOM) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex + 1; i < 4; i++) {

            if (positionsDOM[actualRow][i]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positionsDOM[actualRow][availableCornerNearest] = positionsDOM[actualRow][actualIndex];
            positionsDOM[actualRow][actualIndex] = null;

            stateChanged = true;
        }

        return [
            positionsDOM,
            stateChanged
        ];
    }

    
    return {
        moveItemsUp,
        moveItemsDown,
        moveItemsLeft,
        moveItemsRight
    };
})