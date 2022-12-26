const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    
    $scope.gameInProgress = false;
    $scope.positionsDOM = [
        {0: null, 1: 2, 2: null, 3: 4},
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
                    moveItemsUp();
                    break;
                case 'ArrowDown':
                    moveItemsDown();
                    break;
                case 'ArrowLeft':
                    moveItemsLeft();
                    break;
                case 'ArrowRight':
                    moveItemsRight();
                    break;
            }

        // generateNumberOnEmptyPosition();
        }   
    }

    const moveItemsLeft = () => {
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (positions[i][j]) {
                    leftSum(i, j);
                    leftMove(i, j);
                }
            }
        }

        $scope.positionsDOM = positions;
    }

    const moveItemsRight = () => {
        
        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                if (positions[i][j]) {
                    rightSum(i, j);
                    rightMove(i, j);
                }
            }
        }

        $scope.positionsDOM = positions;
    }

    const leftSum = (actualRow, actualIndex) => {
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
                    break;
                } else if (positions[actualRow][actualIndex] === positions[actualRow][actualIndex + 1] && (actualIndex + 1) < 4) {
                    positions[actualRow][actualIndex] = positions[actualRow][actualIndex] * 2;
                    positions[actualRow][actualIndex + 1] = null;
                    break;
                }
            }
        }
    }

    const leftMove = (actualRow, actualIndex) => {
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
        }
    }

    const rightSum = (actualRow, actualIndex) => {
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
                    break;
                } else if (positions[actualRow][lineLoop] === positions[actualRow][lineLoop + 1] && (lineLoop + 1) < 4) {
                    positions[actualRow][actualIndex] = positions[actualRow][actualIndex] * 2;
                    positions[actualRow][lineLoop] = null;
                    break;
                }
            }
        }
    }

    const rightMove = (actualRow, actualIndex) => {
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

    const randomNumberPosition = () => { //todo refazer
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
