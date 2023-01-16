require('../node_modules/angular/angular.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../src/js/app');
require('../src/js/colorsService');

describe('Colors service test', function(){

    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');


    });

    let _colorsService;

    beforeEach(inject((colorsService) => {
        _colorsService = colorsService;
    }));

    it('should return the purple color to the purple numbers', function(){
        const number2 = _colorsService.itemColor(2);
        const number32 = _colorsService.itemColor(32);
        const number512 = _colorsService.itemColor(512);

        expect(number2).toEqual('purple-item');
        expect(number32).toEqual('purple-item');
        expect(number512).toEqual('purple-item');
    });

    it('should return the blue color to the blue numbers', function(){
        const number4 = _colorsService.itemColor(4);
        const number64 = _colorsService.itemColor(64);
        const number1024 = _colorsService.itemColor(1024);

        expect(number4).toEqual('blue-item');
        expect(number64).toEqual('blue-item');
        expect(number1024).toEqual('blue-item');
    });

    it('should return the orange color to the orange numbers', function(){
        const number8 = _colorsService.itemColor(8);
        const number128 = _colorsService.itemColor(128);
        const number2048 = _colorsService.itemColor(2048);

        expect(number8).toEqual('orange-item');
        expect(number128).toEqual('orange-item');
        expect(number2048).toEqual('orange-item');
    });

    it('should return the green color to the green numbers', function(){
        const number16 = _colorsService.itemColor(16);
        const number256 = _colorsService.itemColor(256);

        expect(number16).toEqual('green-item');
        expect(number256).toEqual('green-item');
    });
});
