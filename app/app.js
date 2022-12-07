const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    
    $scope.gameInProgress = false;
    $scope.positions = [
        {0: null, 1: 2, 2: 2, 3: 2},
        {0: 2, 1: 2, 2: null, 3: null},
        {0: 2, 1: null, 2: null, 3: 2},
        {0: 64, 1: null, 2: 2, 3: 8}
    ];
    const positions = [...$scope.positions];
    const posLength = $scope.positions.length;

    $scope.startGame = () => {
        // for(i = 0; i < 2; i++) {
        //     $scope.positions[randomNum(4)][randomNum(4)] = randomNumTwoOrFour();
        // }
        $scope.gameInProgress = true;
    }

    $scope.userClick = (key) => {
        const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        
        if (key === 'Enter' && !$scope.gameInProgress) {
            $scope.startGame();
        }

        if($scope.gameInProgress && arrows.includes(key) && availabilityObserver()) {
            // generateNumberOnEmptyPosition();
            switch(key) {
                case 'ArrowUp':
                    moveItemsRight();
                case 'ArrowDown':
                    moveItemsRight();
                case 'ArrowLeft':
                    moveItemsRight();
                case 'ArrowRight':
                    moveItemsRight();
            }
        }   
    }

    const moveItemsRight = () => {
        let neverEnteredRow = true;
        const rowsWithEqualValues = [];
        // let rowEqualValues;
        
        for (let row = 0; row < posLength; row++) {
            for (let col = 0; col < posLength; col++) {
                
                if ($scope.positions[row][col] && neverEnteredRow) {
                    rowsWithEqualValues.push(verifySameValueInRow(row, $scope.positions[row][col]));

                    neverEnteredRow = false;
                }
                
            }
            neverEnteredRow = true;
        }
        sumIfPossible('right', rowsWithEqualValues);
    }

    const verifySameValueInRow = (row, positionValue) => {
        let rowsWithEqualValues = [];

        for (let i = 0; i < posLength; i++) {
            if (celValue([row, i]) === positionValue) {
                rowsWithEqualValues.push(i);
            }
        }
        return rowsWithEqualValues;
    }

    const celValue = ([row, col]) => {
        return $scope.positions[row][col];
    }

    const sumIfPossible = (key, rowsWithEqualValues) => {
        switch(key) {
            case 'up':
                sumUp(rowsWithEqualValues);
            case 'down':
                sumDown(rowsWithEqualValues);
            case 'left':
                sumLeft(rowsWithEqualValues);
            case 'right':
                sumRight(rowsWithEqualValues);
        }
    }

    const sumRight = (rowsWithEqualValues) => {

    }
    

    $scope.itemColor = (item) => {
        switch (item) {
            case 2:
            case 32:
            case 512:
                return 'orange-item';

            case 4:
            case 64:
            case 1024:
                return 'blue-item';

            case 8:
            case 128:
            case 2048:
                return 'green-item';

            case 16:
            case 256:
                return 'purple-item';
        }
    }

    const availabilityObserver = () => {
        let allPositions = [];
        for (i = 0; i < $scope.positions.length; i++) {
            for (j = 0; j < $scope.positions.length; j++) {
                allPositions.push($scope.positions[i][j]);
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

        if($scope.positions[randomPosition[0]][randomPosition[1]] == null) {
            $scope.positions[randomPosition[0]][randomPosition[1]] = 2;
            return;
        } else {
            generateNumberOnEmptyPosition();
        }

    }
})
