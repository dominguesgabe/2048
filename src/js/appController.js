app2048.controller("appController", function ($scope, colorsService, collectionsFactory, moveItemsService, numbersService) {

    $scope.itemColor = colorsService.itemColor;
    $scope.gameInProgress = false;
    $scope.positionsDOM = new collectionsFactory.positions();

    let stateChanged = new collectionsFactory.initialState();
    let ocuppiedPositions = 0;

    $scope.startGame = () => {
        $scope.gameInProgress = true;
        $scope.positionsDOM = new collectionsFactory.positions();

        numbersService.startGameNumbers($scope.positionsDOM);
    }

    $scope.userClick = (key) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

        if (key === 'Enter' && !$scope.gameInProgress) {
            $scope.startGame();
        }

        if($scope.gameInProgress && keys.includes(key)) {
            let caller;

            switch(key) {
                case 'ArrowUp':
                    caller = key;
                    const [upPositionsDOM, moveUpChanged] = moveItemsService.moveItemsUp($scope.positionsDOM);
                    $scope.positionsDOM = upPositionsDOM;
                    stateChanged.ArrowUp = moveUpChanged;
                    break;
                case 'ArrowDown':
                    caller = key;
                    const [downPositionsDOM, moveDownChanged] = moveItemsService.moveItemsDown($scope.positionsDOM);
                    $scope.positionsDOM = downPositionsDOM;
                    stateChanged.ArrowDown = moveDownChanged;
                    break;
                case 'ArrowLeft':
                    caller = key;
                    const [leftPositionsDOM, moveLeftChanged] = moveItemsService.moveItemsLeft($scope.positionsDOM);
                    $scope.positionsDOM = leftPositionsDOM;
                    stateChanged.ArrowLeft = moveLeftChanged;
                    break;
                case 'ArrowRight':
                    caller = key;
                    const [rightPositionsDOM, moveRightChanged] = moveItemsService.moveItemsRight($scope.positionsDOM);
                    $scope.positionsDOM = rightPositionsDOM;
                    stateChanged.ArrowRight = moveRightChanged;
                    break;  
            }

            stateChangedObserver();

            if (stateChanged[caller] || stateChanged[caller] === null) {
                generateNumberOnEmptyPosition($scope.positionsDOM, ocuppiedPositions);
                ocuppiedPositions = ocuppiedPositionsCounter($scope.positionsDOM);
            }
        }   
    }

    const victoryWatch = (newPositions) => {
        newPositions.forEach(row => {
            if (Object.values(row).includes(2048)) {
                return endGame("victory");
            }
        });
    }
    $scope.$watch('positionsDOM', victoryWatch, true);
    
    const endGame = (status) => {
        if (status === "victory") {
            alert("Congrats, you win!");
        } else if (status === "lose") {
            alert("Sorry, you lost. But don't be shy, you can try again!");
        }

        return false;
    }

    const ocuppiedPositionsCounter = (positionsDOM) => {
        let allPositionsValue = [];
        
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                if (typeof($scope.positionsDOM[i][j]) === 'number') {
                    allPositionsValue.push(positionsDOM[i][j]);
                }
            }
        }

        return allPositionsValue.length;
    }

    const stateChangedObserver = () => {
        if (Object.values(stateChanged).includes(true)) {
            stateChanged = new collectionsFactory.initialState();
        }

        if (!Object.values(stateChanged).includes(null)) {
            endGame("lose");
        }
    }

    const generateNumberOnEmptyPosition = (positionsDOM, ocuppiedPositions) => {
        const randomNum = numbersService.randomNum(16);
        const randomPosition = numbersService.randomNumberPosition(randomNum);
        
        if (ocuppiedPositions < 16) {
            if(positionsDOM[randomPosition[0]][randomPosition[1]] == null) {
                positionsDOM[randomPosition[0]][randomPosition[1]] = 2;
                return positionsDOM;
            } else {
                generateNumberOnEmptyPosition(positionsDOM);
            }
        }
    };
});