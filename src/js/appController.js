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
                    const [upPositionsDOM, moveUpChanged] = moveItemsService.moveItemsUp($scope.positionsDOM);
                    $scope.positionsDOM = upPositionsDOM;
                    stateChanged.up = moveUpChanged;

                    break;
                case 'ArrowDown':
                    const [downPositionsDOM, moveDownChanged] = moveItemsService.moveItemsDown($scope.positionsDOM);
                    $scope.positionsDOM = downPositionsDOM;
                    stateChanged.down = moveDownChanged;

                    break;
                case 'ArrowLeft':
                    const [leftPositionsDOM, moveLeftChanged] = moveItemsService.moveItemsLeft($scope.positionsDOM);
                    $scope.positionsDOM = leftPositionsDOM;
                    stateChanged.left = moveLeftChanged;

                    break;
                case 'ArrowRight':
                    const [rightPositionsDOM, moveRightChanged] = moveItemsService.moveItemsRight($scope.positionsDOM);
                    $scope.positionsDOM = rightPositionsDOM;
                    stateChanged.right = moveRightChanged;
                    
                    break;  
            }

            stateChangedObserver(); //todo não adicionar estado caso o último movimento não tenha alterrado em nada o objeto
            generateNumberOnEmptyPosition();
        }   
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