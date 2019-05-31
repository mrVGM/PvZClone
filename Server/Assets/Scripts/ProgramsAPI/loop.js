var program = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Loop',
            params: { },
            interface: {
                coroutine: function* (inst) {
                    var childProgram = inst.gameObject.children[0];
                    childProgram = game.api.getComponent(childProgram, game.dev.programs.program);
                    game.api.startProgram(childProgram, inst.context);
                    var startedAt = game.api.lastFrame;

                    while (true) {
                        while (!childProgram.finished) {
                            yield undefined;
                        }
                        if (game.api.lastFrame === startedAt) {
                            yield undefined;
                        }
                        game.api.startProgram(childProgram, inst.context);
                        startedAt = game.api.lastFrame;
                    }
                },
                finish: function* (inst) {
                    var childProgram = inst.gameObject.children[0];
                    childProgram = game.api.getComponent(childProgram, game.dev.programs.program);
                    childProgram.stop = true;

                    while(!childProgram.finished) {
                        yield undefined;
                    }
                },
            }
        };
        return inst;
    }
};

module.exports = program;