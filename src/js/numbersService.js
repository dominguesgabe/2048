angular.module("app2048").service("numbersService", function () {
    
    const generateNumberOnEmptyPosition = (positionsDOM, ocuppiedPositions) => { //ainda está alterando o objeto do escopo, mas eu não entendo poque

        const randomPosition = this.randomNumberPosition();

        if (ocuppiedPositions < 16) {
            if(positionsDOM[randomPosition[0]][randomPosition[1]] == null) {
                positionsDOM[randomPosition[0]][randomPosition[1]] = 2;
                return positionsDOM;
            } else {
                generateNumberOnEmptyPosition(positionsDOM);
            }
        }
    }

    this.randomNumberPosition = () => {
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

    const randomNum = (limit) => {
        return Math.floor(Math.random() * limit);
    }

    const randomNumTwoOrFour = () => {
        const twoAndFour = [2, 4]; 
        const random = Math.floor(Math.random() * 2);

        return twoAndFour[random];
    }

    return {
        generateNumberOnEmptyPosition,
        randomNumTwoOrFour,
        randomNum
    };
})