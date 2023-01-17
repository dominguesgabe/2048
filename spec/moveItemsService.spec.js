require('../node_modules/angular/angular.min.js');
require('../node_modules/angular-mocks/angular-mocks.js');
require('../src/js/app');
require('../src/js/moveItemsService');

describe('Move items up test', function() {

    let _moveItemsService;

    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((moveItemsService) => {
            _moveItemsService = moveItemsService;
        })
    });

    const cases = [
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 8, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
    ];

    test.each(cases)('should test positions up side moves possibility: %#', (inputPositions, expectedOutput) => {
        const actual = _moveItemsService.moveItemsUp(inputPositions);
        expect(actual[0]).toEqual(expectedOutput); //todo alterar esse teste quando eu resolver a responsabilidade múltipla dos moveItems
    });

});

describe('Move items down test', function() {

    let _moveItemsService;

    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((moveItemsService) => {
            _moveItemsService = moveItemsService;
        })
    });

    const cases = [
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": 8, "1": null, "2": null, "3": null},
                {"0": 2, "1": null, "2": null, "3": null}
            ]
        ],
    ];

    test.each(cases)('should test positions down side moves possibility: %#', (inputPositions, expectedOutput) => {
        const actual = _moveItemsService.moveItemsDown(inputPositions);
        expect(actual[0]).toEqual(expectedOutput); //todo alterar esse teste quando eu resolver a responsabilidade múltipla dos moveItems
    });

});

describe('Move items left test', function() {

    let _moveItemsService;

    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((moveItemsService) => {
            _moveItemsService = moveItemsService;
        })
    });

    const cases = [
        [
            [
                {"0": 2, "1": null, "2": null, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 2, "2": 2, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": 4, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": null, "1": null, "2": null, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 4, "2": 2, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": 4, "2": 4, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 4, "2": 2, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": 4, "2": 2, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 2, "2": null, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": 2, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": null, "1": 2, "2": 2, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 4, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 4, "2": 4, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": 8, "2": 2, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
    ];

    test.each(cases)('should test positions left side moves possibility: %#', (inputPositions, expectedOutput) => {
        const actual = _moveItemsService.moveItemsLeft(inputPositions);
        expect(actual[0]).toEqual(expectedOutput); //todo alterar esse teste quando eu resolver a responsabilidade múltipla dos moveItems
    });

});

describe('Move items right test', function() {

    let _moveItemsService;

    beforeEach(function() {
        angular.module('app2048');
        angular.mock.module('app2048');

        inject((moveItemsService) => {
            _moveItemsService = moveItemsService;
        })
    });

    const cases = [
        [
            [
                {"0": 2, "1": null, "2": null, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 2, "2": 2, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": 4, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 4, "2": 2, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": 2, "2": 4, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 4, "2": 2, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": 2, "1": 4, "2": 2, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 2, "2": null, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": 2, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": null, "1": 2, "2": 2, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": null, "2": null, "3": 4},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
        [
            [
                {"0": 2, "1": 4, "2": 4, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ],
            [
                {"0": null, "1": 2, "2": 8, "3": 2},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null},
                {"0": null, "1": null, "2": null, "3": null}
            ]
        ],
    ];

    test.each(cases)('should test positions left side moves possibility: %#', (inputPositions, expectedOutput) => {
        const actual = _moveItemsService.moveItemsRight(inputPositions);
        expect(actual[0]).toEqual(expectedOutput); //todo alterar esse teste quando eu resolver a responsabilidade múltipla dos moveItems
    });

});