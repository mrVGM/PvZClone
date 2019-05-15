var input = {
    onLoad: function () {
        if (!game.dev) {
            game.dev = {};
        }
        game.dev.input = input;
    },
    createInstance: function () {
        var inst = {
            name: 'Collider',
            params: { },
            interface: {
                update: function (dt) {
                    if (document.game.inputEvents.length > 0) {
                        console.log(document.game.inputEvents);
                    }
                }
            },
        };
        return inst;
    },
};

module.exports = input;