const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    
    $scope.gameInProgress = false;
    $scope.positionsDOM = [
        {0: 2, 1: 2, 2: 4, 3: 4}, //todo arrumar essa regra
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null}
    ];
    let positions;

    $scope.startGame = () => {
        // for(i = 0; i < 2; i++) {
        //     $scope.positions[randomNum(4)][randomNum(4)] = randomNumTwoOrFour();
        // }
        $scope.gameInProgress = true;
        positions = JSON.parse(angular.toJson($scope.positionsDOM));
    }

    $scope.userClick = (key) => {
        const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        
        if (key === 'Enter' && !$scope.gameInProgress) {
            $scope.startGame();
        }

        if($scope.gameInProgress && arrows.includes(key) && availabilityObserver()) {
            switch(key) {
                case 'ArrowUp':
                    // moveItemsRight();
                case 'ArrowDown':
                    // moveItemsRight();
                case 'ArrowLeft':
                    // moveItemsRight();
                case 'ArrowRight':
                    moveItemsRight();
            }
        }   
    }

    const moveItemsRight = () => {
        for (let j = 3; j >= 0; j--) {
            if (positions[0][j]) {
                if(positions[0][j] == positions[0][j - 1]) { //todo criar um checker automático como o farthestIndex
                    positions[0][j] = positions[0][j] * 2;
                    positions[0][j - 1] = null;
                } else if (positions[0][j] == positions[0][j - 2] && !positions[0][j - 1]) {
                    positions[0][j] = positions[0][j] * 2;
                    positions[0][j - 2] = null;
                } else if (positions[0][j] == positions[0][j - 3] && !positions[0][j - 1]) {
                    positions[0][j] = positions[0][j] * 2;
                    positions[0][j - 3] = null;
                }
            }
        }

        checkMoveRightNoSum();
        $scope.positionsDOM = positions;
        // generateNumberOnEmptyPosition();
    }

    const checkMoveRightNoSum = () => {
        let cornerNearest;
        for (let j = 3; j >= 0; j--) {
            if (positions[0][j] && positions[0][j + 3] === null) { //loop que move os valores restantes para próximo da parede 
                cornerNearest = j + 3;

            } else if (positions[0][j] && positions[0][j + 2] === null) {
                cornerNearest = j + 2;

            } else  if (positions[0][j] && positions[0][j + 1] === null) {
                cornerNearest = j + 1;
            }
            
            if (cornerNearest) {
                positions[0][j + cornerNearest] = positions[0][j];
                positions[0][j] = null;
            }
        }
    }

    const farthestIndex = (actualIndex) => {
        let farthestIndex;

        for (let i = actualIndex; i < 4; i++) {
            if (!positions[0][i]) {
                farthestIndex = i;
            }
        }
        console.log(farthestIndex)
        return farthestIndex;
    }

    const verifySameValueInRow = (row, positionValue) => {
        const rowsWithEqualValues = {};

        for (let i = 0; i < 4; i++) {
            if (celValue([row, i]) === positionValue) {
                rowsWithEqualValues[row] = i;
            }
        }

        if (rowsWithEqualValues.length < 2) {
            rowsWithEqualValues.pop();
        }
        
        return rowsWithEqualValues;
    }

    const celValue = ([row, col]) => {
        return $scope.positions[row][col];
    }

    const sumDirection = (key, rowsWithEqualValues) => {
        switch(key) {
            case 'up':
                sumUp(rowsWithEqualValues);
            case 'down':
                sumDown(rowsWithEqualValues);
            case 'left':
                sumLeft(rowsWithEqualValues);
            case 'right':
                sumRight();
        }
    }

    $scope.itemColor = (item) => {
        switch (item) {
            case 2:
            case 32:
            case 512:
                return 'purple-item';

            case 4:
            case 64:
            case 1024:
                return 'blue-item';

            case 8:
            case 128:
            case 2048:
                return 'orange-item';

            case 16:
            case 256:
                return 'green-item';
        }
    }

    const availabilityObserver = () => {
        let allPositions = [];
        for (i = 0; i < $scope.positionsDOM.length; i++) {
            for (j = 0; j < $scope.positionsDOM.length; j++) {
                allPositions.push($scope.positionsDOM[i][j]);
            }
        }
        
        if(!allPositions.includes(null)) {
            return false;
        }
        return true;
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

        switch (randomNumberOfPosition) { //unidimensional positions
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

        if(!availabilityObserver()) {
            return false;
        }

        const randomPosition = randomNumberPosition();

        if($scope.positionsDOM[randomPosition[0]][randomPosition[1]] == null) {
            $scope.positionsDOM[randomPosition[0]][randomPosition[1]] = 2;
            return;
        } else {
            generateNumberOnEmptyPosition();
        }

    }

    const generateNumOnEmptyPosition = () => {
        for(i = 0; i < 2; i++) {
            positions[randomNum(4)][randomNum(4)] = randomNumTwoOrFour();
        }
    }
})
