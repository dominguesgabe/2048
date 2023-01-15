app2048.controller("appController", function ($scope, $window, colorsService, collectionsFactory, moveItemsService) {

    $scope.itemColor = colorsService.itemColor;
    $scope.gameInProgress = false;
    $scope.positionsDOM = new collectionsFactory.positions();

    let stateChanged = new collectionsFactory.stateChanged();
    let ocuppiedPositions;

    $scope.startGame = () => {
        $scope.gameInProgress = true;
        $scope.positionsDOM = new collectionsFactory.positions();

        if(availabilityObserver()) {
            for(i = 0; i < 2; i++) {
                let row = randomNum(4);
                let col = randomNum(4);
                if (!$scope.positionsDOM[row][col]) {
                    $scope.positionsDOM[row][col] = randomNumTwoOrFour();
                }
            }
        }
    }

    $scope.userClick = (key) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

        if (key === 'Enter' && !$scope.gameInProgress) {
            $scope.startGame();
        }

        if($scope.gameInProgress && availabilityObserver() && keys.includes(key)) {
            
            switch(key) {
                case 'ArrowUp':
                    const [positionsDOM, moveUpChanged] = moveItemsService.moveItemsUp($scope.positionsDOM);
                    $scope.positionsDOM = positionsDOM;
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
        }   
    }

    const moveItemsDown = () => {
        let stateChanged = false;

        for (let j = 0; j < 4; j++) {
            for (let i = 3; i >= 0; i--) {
                if ($scope.positionsDOM[i][j]) {
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
                if ($scope.positionsDOM[i][j]) {
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
                if ($scope.positionsDOM[i][j]) {
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

    const downSum = (actualIndex, actualCol) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex - 1; lineLoop >= 0; lineLoop--) {
            if ($scope.positionsDOM[lineLoop][actualCol] && $scope.positionsDOM[lineLoop][actualCol] === $scope.positionsDOM[actualIndex][actualCol] && (lineLoop + 1) < 4) {

                let isPossibleSumFar;

                for (let counter = lineLoop + 1; counter < 4; counter++) {
                    if ($scope.positionsDOM[counter][actualCol]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    $scope.positionsDOM[actualIndex][actualCol] = $scope.positionsDOM[actualIndex][actualCol] * 2;
                    $scope.positionsDOM[lineLoop][actualCol] = null;

                    stateChanged = true;
                    break;
                } else if ($scope.positionsDOM[actualIndex][actualCol] === $scope.positionsDOM[actualIndex - 1][actualCol] && $scope.positionsDOM[lineLoop][actualCol]) {
                    $scope.positionsDOM[actualIndex][actualCol] = $scope.positionsDOM[actualIndex][actualCol] * 2; 
                    $scope.positionsDOM[actualIndex - 1][actualCol] = null; 

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
            if ($scope.positionsDOM[i][actualCol]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            $scope.positionsDOM[availableCornerNearest][actualCol] = $scope.positionsDOM[actualIndex][actualCol];
            $scope.positionsDOM[actualIndex][actualCol] = null;

            stateChanged = true;
        }

        return stateChanged;
    }

    const leftSum = (actualRow, actualIndex) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex + 1; lineLoop < 4; lineLoop++) {
            
            if ($scope.positionsDOM[actualRow][lineLoop] && $scope.positionsDOM[actualRow][actualIndex] === $scope.positionsDOM[actualRow][lineLoop]) {
                let isPossibleSumFar;
                
                for (let counter = lineLoop - 1; counter > 0; counter--) {
                    if ($scope.positionsDOM[actualRow][counter]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    $scope.positionsDOM[actualRow][actualIndex] = $scope.positionsDOM[actualRow][actualIndex] * 2;
                    $scope.positionsDOM[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                } else if ($scope.positionsDOM[actualRow][actualIndex] === $scope.positionsDOM[actualRow][actualIndex + 1] && (actualIndex + 1) < 4) {
                    $scope.positionsDOM[actualRow][actualIndex] = $scope.positionsDOM[actualRow][actualIndex] * 2;
                    $scope.positionsDOM[actualRow][actualIndex + 1] = null;

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
            if ($scope.positionsDOM[actualRow][i]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            $scope.positionsDOM[actualRow][availableCornerNearest] = $scope.positionsDOM[actualRow][actualIndex];
            $scope.positionsDOM[actualRow][actualIndex] = null; 

            stateChanged = true;
        }

        return stateChanged;
    }

    const rightSum = (actualRow, actualIndex) => {
        let stateChanged = false;

        for (let lineLoop = actualIndex; lineLoop >= 0; lineLoop--) {
            
            if (lineLoop < actualIndex && $scope.positionsDOM[actualRow][lineLoop] && (lineLoop + 1) < 4 && $scope.positionsDOM[actualRow][actualIndex] === $scope.positionsDOM[actualRow][lineLoop]) {
                let isPossibleSumFar;
                
                for (let counter = lineLoop + 1; counter < actualIndex; counter++) {
                    if ($scope.positionsDOM[actualRow][counter]) {
                        break;
                    }
                    
                    isPossibleSumFar = true;
                }

                if (isPossibleSumFar) {
                    $scope.positionsDOM[actualRow][actualIndex] = $scope.positionsDOM[actualRow][actualIndex] * 2;
                    $scope.positionsDOM[actualRow][lineLoop] = null;

                    stateChanged = true;
                    break;
                } else if ($scope.positionsDOM[actualRow][lineLoop] === $scope.positionsDOM[actualRow][lineLoop + 1] && (lineLoop + 1) < 4) {
                    $scope.positionsDOM[actualRow][actualIndex] = $scope.positionsDOM[actualRow][actualIndex] * 2;
                    $scope.positionsDOM[actualRow][lineLoop] = null;

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

            if ($scope.positionsDOM[actualRow][i]) {
                continue;
            }
            availableCornerNearest = i;
        }

        if (typeof(availableCornerNearest) === 'number') {
            $scope.positionsDOM[actualRow][availableCornerNearest] = $scope.positionsDOM[actualRow][actualIndex];
            $scope.positionsDOM[actualRow][actualIndex] = null;

            stateChanged = true;
        }

        return stateChanged;
    }

    const availabilityObserver = () => {
        let allPositionsValue = [];
        
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
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
            $window.alert('Congrats, you win!');
        } else if (status === "lose") {
            $window.alert('Sorry, you lost. But don\'t be shy, you can try again!');
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
            stateChanged = new collectionsFactory.stateChanged();
        }

        if (!Object.values(stateChanged).includes(null)) {
            endGame('lose');
        }
    }
});