describe('appController', function () {
    beforeEach(module('app2048'));

    it('should creates a appModel', inject(function ($controller) {
        let test;
        const controller = $controller('appController', { $scope: test });

        expect(test).toBe('hi gab');
    }))
})