const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    $scope.gameInProgress = false; //TODO improve the state management

    $scope.positions = [
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null}
    ];
    // $scope.positions = {
    //     0: {0: null, 1: null, 2: null, 3: null},
    //     1: {0: null, 1: null, 2: null, 3: null},
    //     2: {0: null, 1: null, 2: null, 3: null},
    //     3: {0: null, 1: null, 2: null, 3: null}
    // };

    $scope.startGame = () => {
        for(i = 0; i < 2; i++) {
            $scope.positions[randomNum(4)][randomNum(4)] = randomNumTwoOrFour();
        }
        $scope.gameInProgress = true;
    }

    function randomNum(limit) {
        return number = Math.floor(Math.random() * limit);
    }

    function randomNumTwoOrFour() {
        const numberArray = [2, 4]; 
        const random = Math.floor(Math.random() * 2);

        return numberArray[random];
    }
})
