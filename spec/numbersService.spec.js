require('../node_modules/angular/angular.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../src/js/app');
require('../src/js/numbersService');
require('../src/js/collectionsFactory');

describe('Numbers service test', function() {

    let _numbersService;
    
    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((numbersService) => {
            _numbersService = numbersService;
        })
    });

    describe('Test randomNum method', function() {

        jest.spyOn(Math, 'random').mockReturnValue(0.45);

        it ('randomNum method should return a positive number', function() {
            const actual = _numbersService.randomNum(7);

            expect(actual).toBe(3);
            expect(actual).toBeGreaterThan(-1);
        })

        it ('Should throw randomNum method error if not number passed', function() {
            expect(() => _numbersService.randomNum('NaN passed')).toThrow('Wrong param type.');
        })
    });

    describe('Test randomNumTwoOrFour method', function() {

        it ('Should return 2 or 4', function() {
            const actual = _numbersService.randomNumTwoOrFour();
            expect([2, 4]).toContain(actual);
        })
    });

    describe('Test startNumbers method', function() { //todo melhorar teste

        let initialPositions = [
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null}
        ];

        let modify = [
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null}
        ];

        it ('Should positions populated', function() {
            const actual = _numbersService.startGameNumbers(modify);
            expect(actual).not.toEqual(initialPositions);
        })
    });

    const randomNumberPositionCases = [
        [0, [0,0]],
        [1, [0,1]],
        [2, [0,2]],
        [3, [0,3]],
        [4, [1,0]],
        [5, [1,1]],
        [6, [1,2]],
        [7, [1,3]],
        [8, [2,0]],
        [9, [2,1]],
        [10, [2,2]],
        [11, [2,3]],
        [12, [3,0]],
        [13, [3,1]],
        [14, [3,2]],
        [15, [3,3]]
    ];

    test.each(randomNumberPositionCases)('should return the write position according to the number', (number, expectedPosition) => {
        const actual = _numbersService.randomNumberPosition(number);
        expect(actual).toEqual(expectedPosition);
    });
});
