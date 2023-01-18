require('../node_modules/angular/angular.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../src/js/app');
require('../src/js/numbersService');

describe('Numbers service test', function() { //Todo testar service (ele gera números aleatórios)

    let _numbersService;
    
    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((numbersService) => {
            _numbersService = numbersService;
        })
    });

});
