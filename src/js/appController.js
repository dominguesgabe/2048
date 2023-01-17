app2048.controller("appController", function ($scope, $window, colorsService, collectionsFactory, moveItemsService, numbersService) {

    $scope.itemColor = colorsService.itemColor;
    $scope.gameInProgress = false;
    $scope.positionsDOM = new collectionsFactory.positions();

    let stateChanged = new collectionsFactory.stateChanged();
    let ocuppiedPositions;

    $scope.startGame = () => {
        $scope.gameInProgress = true;
        $scope.positionsDOM = new collectionsFactory.positions();

        if(availabilityObserver()) { //eu tô usando esse método pra gerar números aleatórios no começo do jogo mas talvez os outeros métodos já façam isso
            for(i = 0; i < 2; i++) {
                let row = numbersService.randomNum(4);
                let col = numbersService.randomNum(4);
                if (!$scope.positionsDOM[row][col]) {
                    $scope.positionsDOM[row][col] = numbersService.randomNumTwoOrFour();
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
                    const [upPositionsDOM, moveUpChanged] = moveItemsService.moveItemsUp($scope.positionsDOM); //o objeto do escopo segue sendo alterado
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
            const positionsWithNewRandom = numbersService.generateNumberOnEmptyPosition($scope.positionsDOM, ocuppiedPositions); //positionsDOM é passado por inteiro
            // $scope.positionsDOM = positionsWithNewRandom;
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
  
    const stateChangedObserver = () => {

        if (Object.values(stateChanged).includes(true)) {
            stateChanged = new collectionsFactory.stateChanged();
        }

        if (!Object.values(stateChanged).includes(null)) {
            endGame('lose');
        }
    }
});