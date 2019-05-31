var customProgram = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Custom Program',
            stop: false,
            params: { },
            interface: {
                coroutine: function* (inst) {
                    for (var i = 0; i < 20; ++i) {
                        yield undefined;
                    }
                },
                finish: function* (inst) {
                    for (var i = 0; i < 20; ++i) {
                        yield undefined;
                    }
                },
            },
        };
        return inst;
    }
};

module.exports = customProgram;