describe('Colors service test', function() {

    var angular = require('angular');
        angular.module('app2048', [
        require('angular-mocks/angular-mocks'),
        require('angular-mocks/ngMock')
    ]); 

    // beforeEach(module('app2048'));
    // beforeEach(inject(function(_$rootScope_, _$compile_) {
    //     $scope = _$rootScope_;
    //     $compile = _$compile_;
    //   }));

    it('should return any color', function() {
        const greet = 'hello';
        const to = 'world';

        expect(greet + ' ' + to).toEqual('hello world');
    });
});