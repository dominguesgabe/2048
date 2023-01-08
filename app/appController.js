app2048.controller("appController", function ($scope, colorsService) {

    $scope.itemColor = colorsService.itemColor;
    $scope.gameInProgress = false;
    $scope.positionsDOM = [
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null}
    ];

    let positions;
    let stateChanged = {
        up: null,
        down: null,
        left: null,
        right: null
    };
    let ocuppiedPositions;

    $scope.startGame = () => {
        $scope.gameInProgress = true;

        $scope.positionsDOM = [
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null}
        ];
        
        positions = $scope.positionsDOM;

        if(availabilityObserver()) {
            for(i = 0; i < 1; i++) {
                let row = randomNum(4);
                let col = randomNum(4);
                if (!$scope.positionsDOM[row][col]) {
                    $scope.positionsDOM[row][col] = randomNumTwoOrFour();
                }
            }
        }
    }

    $scope.userClick = (key) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

        if (key === 'Enter' && !$scope.gameInProgress) {
            $scope.startGame();
        }

        if($scope.gameInProgress && availabilityObserver() && keys.includes(key)) {
            
            switch(key) {
                case 'ArrowUp':
                    let moveUpChanged = moveItemsUp();
                    stateChanged.up = moveUpChanged;

                    break;
                case 'ArrowDown':
                    let moveDownChanged = moveItemsDown();
                    stateChanged.down = moveDownChanged;

                    break;
                case 'ArrowLeft':
                    let moveLeftChanged = moveItemsLeft();
                    stateChanged.left = moveLeftChanged;

                    break;
                case 'ArrowRight':
                    let moveRightChanged = moveItemsRight();
                    stateChanged.right = moveRightChanged;
                    
                    break;  
            }

            stateChangedObserver();
            generateNumberOnEmptyPosition();
            $scope.positionsDOM = positions;
        }   
    }

    const moveItemsUp = () => {
        let stateChanged = false;

        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                if (positions[i][j]) {
                    let upSumChanged = upSum(i, j);
                    let upSumMoved = upMove(i, j);
                    
                    if (upSumChanged || upSumMoved) {
                        stateChanged = true;
                    }
                }
            }
        }
        
        return stateChanged;
    }

    const moveItemsDown = () => {
        let stateChanged = false;

        for (let j = 0; j < 4; j++) {
            for (let i = 3; i >= 0; i--) {
                if (positions[i][j]) {
                    let downSumChanged = downSum(i, j);
                    let downSumMoved = downMove(i, j);

                    if(downSumChanged || downSumMoved) {
                        stateChanged = true;
                    }
                }
            }
        }

        return stateChanged;
    }

    const moveItemsLeft = () => {
        let stateChanged = false;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (positions[i][j]) {
                    let leftSumChanged = leftSum(i, j);
                    let leftMoveChanged = leftMove(i, j);

                    if(leftSumChanged || leftMoveChanged) {
                        stateChanged = true;
                    }
                }
            }
        }

        return stateChanged;
    }

    const moveItemsRight = () => {
        let stateChanged = false;

        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                if (positions[i][j]) {
                    let rightSumChanged = rightSum(i, j);
                    let rightMoveChanged = rightMove(i, j);

                    if(rightSumChanged || rightMoveChanged) {
                        stateChanged = true;
                    }
                }
            }
        }

        return stateChanged;
    }

    const upSum = (actualIndex, actualCol) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex + 1; lineLoop < 4; lineLoop++) {
            if (positions[lineLoop][actualCol] && positions[lineLoop][actualCol] === positions[actualIndex][actualCol]) {
                let isPossibleSumFar;

                for (let counter = lineLoop - 1; counter >= 0; counter--) {

                    if (positions[counter][actualCol]) {
                        break;
                    }

                    isPossibleSumFar = true;
                }


                if (isPossibleSumFar) {
                    positions[actualIndex][actualCol] = positions[actualIndex][actualCol] * 2;
                    positions[lineLoop][actualCol] = null;

                    stateChanged = true;
                    break;
                } else if (positions[actualIndex][actualCol] && positions[actualIndex][actualCol] === positions[actualIndex +1][actualCol]) {
                    positions[actualIndex][actualCol] = positions[actualIndex][actualCol] * 2;
                    positions[actualIndex +1][actualCol] = null;

                    stateChanged = true;
                    break;
                }
            }
        }

        return stateChanged;
    }

    const upMove = (actualIndex, actualCol) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex - 1; i >= 0; i--) {
            if (positions[i][actualCol]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positions[availableCornerNearest][actualCol] = positions[actualIndex][actualCol];
            positions[actualIndex][actualCol] = null; 

            stateChanged = true;
        }

        return stateChanged;
    }

    const downSum = (actualIndex, actualCol) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex - 1; lineLoop >= 0; lineLoop--) {
            if (positions[lineLoop][actualCol] && positions[lineLoop][actualCol] === positions[actualIndex][actualCol] && (lineLoop + 1) < 4) {

                let isPossibleSumFar;

                for (let counter = lineLoop + 1; counter < 4; counter++) {
                    if (positions[counter][actualCol]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    positions[actualIndex][actualCol] = positions[actualIndex][actualCol] * 2;
                    positions[lineLoop][actualCol] = null;

                    stateChanged = true;
                    break;
                } else if (positions[actualIndex][actualCol] === positions[actualIndex - 1][actualCol] && positions[lineLoop][actualCol]) {
                    positions[actualIndex][actualCol] = positions[actualIndex][actualCol] * 2; 
                    positions[actualIndex - 1][actualCol] = null; 

                    stateChanged = true;
                    break;
                }
            }
        }

        return stateChanged;
    }

    const downMove = (actualIndex, actualCol) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex + 1; i < 4; i++) {
            if (positions[i][actualCol]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positions[availableCornerNearest][actualCol] = positions[actualIndex][actualCol];
            positions[actualIndex][actualCol] = null;

            stateChanged = true;
        }

        return stateChanged;
    }

    const leftSum = (actualRow, actualIndex) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex + 1; lineLoop < 4; lineLoop++) {
            
            if (positions[actualRow][lineLoop] && positions[actualRow][actualIndex] === positions[actualRow][lineLoop]) {
                let isPossibleSumFar;
                
                for (let counter = lineLoop - 1; counter > 0; counter--) {
                    if (positions[actualRow][counter]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    positions[actualRow][actualIndex] = positions[actualRow][actualIndex] * 2;
                    positions[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                } else if (positions[actualRow][actualIndex] === positions[actualRow][actualIndex + 1] && (actualIndex + 1) < 4) {
                    positions[actualRow][actualIndex] = positions[actualRow][actualIndex] * 2;
                    positions[actualRow][actualIndex + 1] = null;

                    stateChanged = true;
                    break;
                }
            }
        }

        return stateChanged;
    }

    const leftMove = (actualRow, actualIndex) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex - 1; i >= 0; i--) {
            if (positions[actualRow][i]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positions[actualRow][availableCornerNearest] = positions[actualRow][actualIndex];
            positions[actualRow][actualIndex] = null; 

            stateChanged = true;
        }

        return stateChanged;
    }

    const rightSum = (actualRow, actualIndex) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex; lineLoop >= 0; lineLoop--) {
            
            if (lineLoop < actualIndex && positions[actualRow][lineLoop] && (lineLoop + 1) < 4 && positions[actualRow][actualIndex] === positions[actualRow][lineLoop]) {
                let isPossibleSumFar;
                
                for (let counter = lineLoop + 1; counter < actualIndex; counter++) {
                    if (positions[actualRow][counter]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    positions[actualRow][actualIndex] = positions[actualRow][actualIndex] * 2;
                    positions[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                } else if (positions[actualRow][lineLoop] === positions[actualRow][lineLoop + 1] && (lineLoop + 1) < 4) {
                    positions[actualRow][actualIndex] = positions[actualRow][actualIndex] * 2;
                    positions[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                }
            }
        }

        return stateChanged;
    }

    const rightMove = (actualRow, actualIndex) => {
        let stateChanged = false;
        let availableCornerNearest;

        for (let i = actualIndex + 1; i < 4; i++) {

            if (positions[actualRow][i]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            positions[actualRow][availableCornerNearest] = positions[actualRow][actualIndex];
            positions[actualRow][actualIndex] = null;

            stateChanged = true;
        }

        return stateChanged;
    }

    const availabilityObserver = () => {
        let allPositionsValue = [];
        
        for (i = 0; i < $scope.positionsDOM.length; i++) {
            for (j = 0; j < $scope.positionsDOM.length; j++) {
                if (typeof($scope.positionsDOM[i][j]) === 'number') {
                    allPositionsValue.push($scope.positionsDOM[i][j]);
                }

                if ($scope.positionsDOM[i][j] === 2048) {
                    endGame("victory")
                }
            }
        }

        ocuppiedPositions = allPositionsValue.length;
        return true;
    }

    const endGame = (status) => {
        if (status === "victory") {
            alert('Congrats, you win!');
        } else if (status === "lose") {
            alert('Sorry, you lost. But don\'t be shy, you can try again!');
        }
        $scope.gameInProgress = false;
    }

    const randomNum = (limit) => {
        return Math.floor(Math.random() * limit);
    }

    const randomNumTwoOrFour = () => {
        const numberArray = [2, 4]; 
        const random = Math.floor(Math.random() * 2);

        return numberArray[random];
    }

    const randomNumberPosition = () => {
        let randomNumberOfPosition = randomNum(16);
        let randomPosition = [];

        switch (randomNumberOfPosition) {
            case 0:
                randomPosition = [0,0];
                break;
            case 1:
                randomPosition = [0,1];
                break;
            case 2:
                randomPosition = [0,2];
                break;
            case 3:
                randomPosition = [0,3];
                break;
            case 4:
                randomPosition = [1,0];
                break;
            case 5:
                randomPosition = [1,1];
                break;
            case 6:
                randomPosition = [1,2];
                break;
            case 7:
                randomPosition = [1,3];
                break;
            case 8:
                randomPosition = [2,0];
                break;
            case 9:
                randomPosition = [2,1];
                break;
            case 10:
                randomPosition = [2,2];
                break;
            case 11:
                randomPosition = [2,3];
                break;
            case 12:
                randomPosition = [3,0];
                break;
            case 13:
                randomPosition = [3,1];
                break;
            case 14:
                randomPosition = [3,2];
                break;
            case 15:
                randomPosition = [3,3];
                break;
        }

        return randomPosition;
    }

    const generateNumberOnEmptyPosition = () => {

        const randomPosition = randomNumberPosition();

        if (ocuppiedPositions < 16) {
            if($scope.positionsDOM[randomPosition[0]][randomPosition[1]] == null) {
                $scope.positionsDOM[randomPosition[0]][randomPosition[1]] = 2;
                return;
            } else {
                generateNumberOnEmptyPosition();
            }
        }
    }

    const stateChangedObserver = () => {

        if (Object.values(stateChanged).includes(true)) {
            stateChanged = {
                up: null,
                down: null,
                left: null,
                right: null
            }
        }

        if (!Object.values(stateChanged).includes(null)) {
            endGame('lose');
        }
    }
})