var program = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Pipe',
            params: { },
            interface: {
                coroutine: function* (inst) {
                    var children = inst.gameObject.children;
                    
                    for (var i = 0; i < children.length; ++i) {
                        var curProgram = game.api.getComponent(children[i], game.dev.programs.program);
                        game.api.startProgram(curProgram, inst.context);
                        while (!curProgram.finished) {
                            yield undefined;
                        }
                    }
                },
                finish: function* (inst) {
                    function anyUnfinished(subPrograms) {
                        for (var i = 0; i < subPrograms.length; ++i) {
                            if (!subPrograms[i].finished) {
                                return true;
                            }
                        }
                        return false;
                    }

                    var children = inst.gameObject.children;
                    var subPrograms = [];
                    for (var i = 0; i < children.length; ++i) {
                        var subProg = game.api.getComponent(children[i], game.dev.programs.program);
                        subProg.stop = true;
                        subPrograms.push(subProg);
                    }

                    while (anyUnfinished(subPrograms)) {
                        yield undefined;
                    }
                },
            }
        };
        return inst;
    }
};

module.exports = program;