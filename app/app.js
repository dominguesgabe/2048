const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    $scope.gameInProgress = false; //TODO improve the state management

    $scope.positions = [
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null},
        {0: null, 1: null, 2: null, 3: null}
    ];

    $scope.startGame = () => {
        for(i = 0; i < 2; i++) {
            $scope.positions[randomNum(4)][randomNum(4)] = randomNumTwoOrFour();
        }
        $scope.gameInProgress = true;
    }

    $scope.userClick = (key) => {
        if($scope.gameInProgress) {
            generateNumberOnEmptyPosition();
        }
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
            case 256:position
                return 'purple-item';
        }
    }

    const randomNum = (limit, allowZero = true) => {
        let number = Math.floor(Math.random() * limit);

        if (number == 0 && allowZero == false) {
            number = randomNum(limit);
        }

        return number;
    }

    const randomNumTwoOrFour = () => {
        const numberArray = [2, 4]; 
        const random = Math.floor(Math.random() * 2);

        return numberArray[random];
    }

    const generateNumberOnEmptyPosition = () => {
        let randomPosition = randomNum(16);

        console.log(randomPosition);

        // if (randomPosition <= 16 && randomPosition > 12) {
        //     switch(randomPosition) {
        //         case 13:
        //             randomPosition = [3,0]
        //         case 14:
        //             randomPosition = [3,1]
        //         case 15:
        //             randomPosition = [3,2]
        //         case 16:
        //             randomPosition = [3,3]
        //     }
        // } else if (randomPosition <= 12 && randomPosition > 8) {
        //     switch(randomPosition) {
        //         case 9:
        //             randomPosition = [2,0]
        //         case 10:
        //             randomPosition = [2,1]
        //         case 11:
        //             randomPosition = [2,2]
        //         case 12:
        //             randomPosition = [2,3]
        //     }
        // } else if (randomPosition <= 8 && randomPosition > 4) {
        //     switch(randomPosition) {
        //         case 5:
        //             randomPosition = [1,0]
        //         case 6:
        //             randomPosition = [1,1]
        //         case 7:
        //             randomPosition = [1,2]
        //         case 8:
        //             randomPosition = [1,3]
        //     }
        // } else if (randomPosition <=  4) {
        //     switch(randomPosition) {
        //         case 1:
        //             randomPosition = [1,0]
        //         case 2:
        //             randomPosition = [1,1]
        //         case 3:
        //             randomPosition = [1,2]
        //         case 4:
        //             randomPosition = [1,3]
        //     }
        // }

        switch (randomPosition) {
            case
        }

        console.log(randomPosition);
        
        // for(i = 0; i < 4; i++) {
        //     for(j = 0; j < 4; j++) {
        //         if($scope.positions[i][j] == null) {
        //             $scope.positions[i][j] = randomNumTwoOrFour()
        //             return;
        //         } else {
        //             generateNumberOnEmptyPosition();
        //         }

        //     }
        // }
    }
})
