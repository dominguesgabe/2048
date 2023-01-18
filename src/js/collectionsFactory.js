angular.module("app2048").factory("collectionsFactory", function () {
    function positions() {
        return [
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null}
        ];
    }

    function initialState() {
        return {
            'ArrowUp': null,
            'ArrowDown': null,
            'ArrowLeft': null,
            'ArrowRight': null
        };
    }

    return {
        positions,
        initialState
    };
})