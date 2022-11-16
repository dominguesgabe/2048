const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    $scope.gameInProgress = false; //TODO improve the state management

    $scope.positions = [
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null}
    ];

    // $scope.positions = [
    //     {0: 'a', 1: 'b', 2: 'c', 3: 'd'},
    //     {0: 'e', 1: 'f', 2: 'g', 3: 'h'},
    //     {0: 'i', 1: 'j', 2: 'k', 3: 'l'},
    //     {0: 'm', 1: 'n', 2: 'o', 3: 'p'}
    // ];

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
