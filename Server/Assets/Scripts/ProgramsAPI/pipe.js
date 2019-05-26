var program = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Pipe',
            params: { },
            interface: {
                coroutine: function (inst) {
                    var curProgramIndex = 0;
                    var children = inst.gameObject.children;
                    var curProgram = undefined;

                    curProgram = game.api.getComponent(children[curProgramIndex], game.dev.programs.program);
                    game.api.startProgram(curProgram, inst.context);

                    function crt() {
                        if (!curProgram.finished) {
                            return crt;
                        }

                        ++curProgramIndex;
                        if (curProgramIndex === children.length)
                            return undefined;

                        curProgram = game.api.getComponent(children[curProgramIndex], game.dev.programs.program);
                        game.api.startProgram(curProgram, inst.context);

                        return crt;
                    }
                    return crt;
                },
                finish: function (inst) {
                    var children = inst.gameObject.children;
                    var subPrograms = [];
                    for (var i = 0; i < children.length; ++i) {
                        var subProg = game.api.getComponent(children[i], game.dev.programs.program);
                        subProg.stop = true;
                        subPrograms.push(subProg);
                    }

                    function crt() {
                        for (var i = 0; i < subPrograms.length; ++i) {
                            if (subPrograms[i].started && !subPrograms[i].finished) {
                                return crt;
                            }
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