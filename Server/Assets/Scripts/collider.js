var collider = {
    onLoad: function () {
        if (!game.dev) {
            game.dev = {};
        }
        game.dev.collider = collider;
    },
    createInstance: function () {
        var inst = {
            name: 'Collider',
            params: {
                width: {
                    name: 'Width',
                    type: 'number',
                    value: 100,
                },
                height: {
                    name: 'Height',
                    type: 'number',
                    value: 100,
                }
            },
            interface: {
                isInside: function (inst, p) {
                },
            },
        };
        return inst;
    },
};

module.exports = collider;