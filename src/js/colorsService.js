angular.module("app2048").service("colorsService", function () {
    function itemColor(item) {
        switch (item) {
            case 2:
            case 32:
            case 512:
                return 'purple-item';

            case 4:
            case 64:
            case 1024:
                return 'blue-item';

            case 8:
            case 128:
            case 2048:
                return 'orange-item';

            case 16:
            case 256:
                return 'green-item';
        }
    }

    return {
        itemColor
    };
})