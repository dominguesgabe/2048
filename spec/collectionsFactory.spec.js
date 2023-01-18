require('../node_modules/angular/angular.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../src/js/app');
require('../src/js/collectionsFactory');

describe('Collections factory test', function(){

    let _collectionsFactory;
    
    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((collectionsFactory) => {
            _collectionsFactory = collectionsFactory;
        })
    });

    it('should return a new positions array', function(){
        const positions = _collectionsFactory.positions();
        const expected = [
            {"0": null, "1": null, "2": null, "3": null},
            {"0": null, "1": null, "2": null, "3": null},
            {"0": null, "1": null, "2": null, "3": null},
            {"0": null, "1": null, "2": null, "3": null}
        ];

        expect(positions).toEqual(expected);
    });

    it('should return a new state changed object', function(){
        const initialState = _collectionsFactory.initialState();
        const expected = {
            'ArrowUp': null,
            'ArrowDown': null,
            'ArrowLeft': null,
            'ArrowRight': null
        };

        expect(initialState).toEqual(expected);
    });

});
