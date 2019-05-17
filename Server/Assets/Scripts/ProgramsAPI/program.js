var program = {
    onLoad: function () {
        if (!game.dev) {
            game.dev = {};
        }
        if (!game.dev.programs) {
            game.dev.programs = {};
        }
        game.dev.programs.program = program;
    },
    createInstance: function () {
        var inst = {
            name: 'Program',
            params: {
                updateTime: {
                    name: 'Update Time',
                    type: 'number',
                    value: 0,
                },
            },
            interface: {
                createCoroutine: function (inst) {
                    var counter = 0;
                    function crt() {
                        console.log(counter++);
                        if (counter < 20)
                            return crt;
                    }
                    return crt;
                }
            },
        };
        return inst;
    }
};

module.exports = program;