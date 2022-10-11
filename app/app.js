const app2048 = angular.module('app2048', []);

app2048.controller('appController', function appController($scope) {
    $scope.title = '2048';

    $scope.positionsX = ['x0', 'x1', 'x2', 'x3'];
    $scope.positionsY = ['y0', 'y1', 'y2', 'y3'];

})