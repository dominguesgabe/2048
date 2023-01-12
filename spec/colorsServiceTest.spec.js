const {describe, beforeEach, it, expect, jasmine, inject} = require('jasmine-core').noGlobals();

// describe('Module', function () {
//     var $window;

//     // beforeEach(inject(function(_$window_) {
//     //     $window = _$window_;
//     //     spyOn($window, 'whateverFn');

//     //     module('Module');
//     // }));

//     beforeEach(inject((colorsService) => {
//         colorsServiceMock = colorsService;
//     }))

//     it('Should check if colorsService does exist', () => {
//         expect(4).toEqual(5);
//     })

// });

var colorsService;

// Wrap the parameter in underscores
beforeEach( inject( function(_colorsService_){
    colorsService = _colorsService_;
}));

// Use myService in a series of tests.
it('makes use of myService', function() {
  let value = myService.itemColor(2);
  expect(value).toEqual('value');
});