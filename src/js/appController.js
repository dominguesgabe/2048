app2048.controller("appController", function ($scope, $window, colorsService, collectionsFactory, moveItemsService, numbersService) {

    $scope.itemColor = colorsService.itemColor;
    $scope.gameInProgress = false;
    $scope.positionsDOM = new collectionsFactory.positions();

    let stateChanged = new collectionsFactory.initialState();
    let ocuppiedPositions;

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

        availabilityObserver(); //melhorar para que ele seja chamado toda vez que o $positionsDOM mude

        if($scope.gameInProgress && keys.includes(key)) {
            let caller;

            switch(key) {
                case 'ArrowUp':
                    caller = key;

                    const [upPositionsDOM, moveUpChanged] = moveItemsService.moveItemsUp($scope.positionsDOM);
                    // $scope.positionsDOM = upPositionsDOM;
                    stateChanged.ArrowUp = moveUpChanged;
                    break;
                case 'ArrowDown':
                    caller = key;

                    const [downPositionsDOM, moveDownChanged] = moveItemsService.moveItemsDown($scope.positionsDOM);
                    // $scope.positionsDOM = downPositionsDOM;
                    stateChanged.ArrowDown = moveDownChanged;
                    break;
                case 'ArrowLeft':
                    caller = key;

                    const [leftPositionsDOM, moveLeftChanged] = moveItemsService.moveItemsLeft($scope.positionsDOM);
                    // $scope.positionsDOM = leftPositionsDOM;
                    stateChanged.ArrowLeft = moveLeftChanged;
                    break;
                case 'ArrowRight':
                    caller = key;

                    const [rightPositionsDOM, moveRightChanged] = moveItemsService.moveItemsRight($scope.positionsDOM);
                    // $scope.positionsDOM = rightPositionsDOM;
                    stateChanged.ArrowRight = moveRightChanged;
                    break;  
            }

            stateChangedObserver();

            if (stateChanged[caller] !== false) {
                numbersService.generateNumberOnEmptyPosition($scope.positionsDOM, ocuppiedPositions);
            }
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
    }

    const endGame = (status) => { //melhorar interação de fim de jogo, manter nesse controller
        if (status === "victory") {
            $window.alert('Congrats, you win!');
        } else if (status === "lose") {
            $window.alert('Sorry, you lost. But don\'t be shy, you can try again!');
        }

        $scope.gameInProgress = false;
    }
  
    const stateChangedObserver = () => {

        if (Object.values(stateChanged).includes(true)) {
            stateChanged = new collectionsFactory.initialState();
        }

        if (!Object.values(stateChanged).includes(null)) {
            endGame('lose');
        }
    }
});