var program = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Loop',
            params: { },
            interface: {
                coroutine: function (inst) {
                    var childProgram = inst.gameObject.children[0];
                    childProgram = game.api.getComponent(childProgram, game.dev.programs.program);
                    game.api.startProgram(childProgram, inst.context);

                    function crt() {
                        if (childProgram.finished) {
                            game.api.startProgram(childProgram, inst.context);
                        }
                        return crt;
                    }
                    return crt;
                },
                finish: function (inst) {
                    var childProgram = inst.gameObject.children[0];
                    childProgram = game.api.getComponent(childProgram, game.dev.programs.program);
                    childProgram.stop = true;

                    function crt() {
                        if (!childProgram.finished) {
                            return crt;
                        }
                    }
                    return crt;
                },
            }
        };
        return inst;
    }
};

module.exports = program;