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

    test.each(cases)('should test positions upside moves possibility: %#', (inputPositions, expectedOutput) => {
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

    test.each(cases)('should test positions upside moves possibility: %#', (inputPositions, expectedOutput) => {
        const actual = _moveItemsService.moveItemsDown(inputPositions);
        expect(actual[0]).toEqual(expectedOutput); //todo alterar esse teste quando eu resolver a responsabilidade múltipla dos moveItems
    });

});
