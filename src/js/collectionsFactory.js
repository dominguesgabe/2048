angular.module("app2048").factory("collectionsFactory", function () {
    function positions() {
        return [
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null},
            {0: null, 1: null, 2: null, 3: null}
        ];
    }

    function stateChanged() {
        return {
            up: null,
            down: null,
            left: null,
            right: null
        };
    }

    return {
        positions,
        stateChanged
    };
})