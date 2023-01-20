require('../node_modules/angular/angular.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../src/js/app');
require('../src/js/numbersService');

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

        it ('randomNum method should return a positive number', function() {
            const actual = _numbersService.randomNum(2);
            expect(actual).toBeGreaterThan(-1);
        })

        it ('Should throw randomNum method error if not number passed', function() {
            expect(() => _numbersService.randomNum('coringa')).toThrow('Wrong param type.');
        })
    });

    describe('Test randomNumTwoOrFour method', function() {

        it ('Should return 2 or 4', function() {
            const actual = _numbersService.randomNumTwoOrFour();
            expect([2, 4]).toContain(actual);
        })
    });

    // describe('Test generateNumberOnEmptyPosition method', function() {

    //     jest.mock('../src/js/numbersService', () => {
    //         return [3,2];
    //     });

    //     const positions = [
    //         {0: null, 1: null, 2: null, 3: null},
    //         {0: null, 1: null, 2: null, 3: null},
    //         {0: null, 1: null, 2: null, 3: null},
    //         {0: null, 1: null, 2: null, 3: null}
    //     ];

    //     it ('Should generate a number on a empyt position', function() {
    //         const actualPositions = _numbersService.generateNumberOnEmptyPosition([...positions], 0);
    //         expect(actualPositions).not.toEqual(positions);
    //     })
    // });
});

describe('Test mock randomNum', function(){

    beforeEach(function(){

        angular.module('numbersService', []);
        angular.mock.module('numbersService');

        angular.mock.module(function($provide) {
            $provide.service('numbersService', function(){
                    return {
                        randomNum: function(x){
                            return 11;
                        }
                    };
                });
            });
        });
  
    let _numbersService;
  
    beforeEach(inject((numbersService) => {
      _numbersService = numbersService;
    }));
  
    it('Should work', function(){
      var actual = _numbersService.randomNum('a');
      expect(actual).toEqual(13);
    });
});