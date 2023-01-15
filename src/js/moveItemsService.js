angular.module("app2048").service("moveItemsService", function () {
    function moveItemsUp(positionsDOM) {
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
    }

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

    return {
        moveItemsUp
    };
})