const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    $scope.gameInProgress = false;

    $scope.positions = [
        {0: null, 1: 2, 2: null, 3: 2},
        {0: null, 1: null, 2: null, 3: null},
        {0: 2, 1: null, 2: 2, 3: null},
        {0: null, 1: null, 2: null, 3: null}
    ];

    $scope.startGame = () => {
        // for(i = 0; i < 2; i++) {
        //     $scope.positions[randomNum(4)][randomNum(4)] = randomNumTwoOrFour();
        // }
        $scope.gameInProgress = true;
    }

    $scope.userClick = (key) => {
        const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        
        if(key === 'Enter' && !$scope.gameInProgress) {
            $scope.startGame();
        }

        if($scope.gameInProgress && arrows.includes(key) && availabilityObserver()) {
            // generateNumberOnEmptyPosition();
            if (key === 'ArrowRight') {
                moveItemsRight();
            }
        }
    }

    const moveItemsRight = () => {
        let populatedPos = populatedPos($scope.positions);
    }

    const populatedPos = (positions) => {
        const length = $scope.positions.length;
        const numbersAt = [];
        
        for (i = 0; i < length; i++) { //loop pra ler e loop pra somar, isso está certo?
            for (j = 0; j < length; j++) {
                if (typeof(positions[i][j]) === 'number') {

                    numbersAt.push([i, j]);

                    // for (row = 0; row < length; row++) {
                    //     for (col = 0; col < length; col++) {
                    //         let secondLoopPos = [row, col];

                    //         if (arrayToPositionValue(currentLoopPos) === arrayToPositionValue(secondLoopPos) && col > j && arrayToPositionValue(currentLoopPos)) {
                    //             $scope.positions[row][col] = arrayToPositionValue(currentLoopPos) * 2; //números de diferentes linhas estão sendo somados, arrumar isso, parece que está propagando mais do que devia
                    //             $scope.positions[i][j] = null;
                    //             console.log(theresNumbersAt)
                    //             if(row == 3 || col == 3) {
                    //                 break;
                    //             }
                    //         }
                    //     }
                    // }

                }
            }
        }
        return numbersAt;
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

    const arrayToPositionValue = (array) => {
        return $scope.positions[array[0]][array[1]];
    }
})
