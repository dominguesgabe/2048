require('../node_modules/angular/angular.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../src/js/app');
require('../src/js/colorsService');

describe('Colors service test', function(){
    
    let _colorsService;
    
    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((colorsService) => {
            _colorsService = colorsService;
        });
    });

    const cases = [
        [2, 'purple-item'],
        [32, 'purple-item'],
        [512, 'purple-item'],
        [4, 'blue-item'],
        [64, 'blue-item'],
        [1024, 'blue-item'],
        [8, 'orange-item'],
        [128, 'orange-item'],
        [2048, 'orange-item'],
        [16, 'green-item'],
        [256, 'green-item']
    ]

    test.each(cases)('should return the write color according to the number', (number, expectedColor) => {
        const numberColor = _colorsService.itemColor(number);
        expect(numberColor).toEqual(expectedColor);
    });
});
