var program = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Run Parallel',
            params: {
                considerToEnd: {
                    name: 'Consider to End',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'gameObject',
                        value: undefined
                    }
                }
            },
            interface: {
                coroutine: function* (inst) {
                    function anyFinished(subprograms) {
                        for (var i = 0; i < subprograms.length; ++i) {
                            if (subprograms[i].finished) {
                                return true;
                            }
                        }
                        return false;
                    }

                    function allFinished(subprograms) {
                        for (var i = 0; i < subprograms.length; ++i) {
                            if (!subprograms[i].finished) {
                                return false;
                            }
                        }
                        return true;
                    }

                    var children = inst.gameObject.children;
                    var subPrograms = [];
                    for (var i = 0; i < children.length; ++i) {
                        var subProg = game.api.getComponent(children[i], game.dev.programs.program);
                        subPrograms.push(subProg);
                        game.api.startProgram(subProg, inst.context);
                    }
                    
                    var considered = [];
                    for (var i = 0; i < inst.params.considerToEnd.value.length; ++i) {
                        var program = inst.params.considerToEnd.value[i].gameObjectRef;
                        program = game.api.getComponent(program, game.dev.programs.program);
                        considered.push(program);
                    }

                    while (!anyFinished(considered) && !allFinished(subPrograms)) {
                        yield undefined;
                    }
                },
                finish: function* (inst) {
                    function allFinished(subprograms) {
                        for (var i = 0; i < subprograms.length; ++i) {
                            if (!subprograms[i].finished) {
                                return false;
                            }
                        }
                        return true;
                    }

                    var children = inst.gameObject.children;
                    var subPrograms = [];
                    for (var i = 0; i < children.length; ++i) {
                        var subProg = game.api.getComponent(children[i], game.dev.programs.program);
                        subProg.stop = true;
                        subPrograms.push(subProg);
                    }

                    while (!allFinished(subPrograms)) {
                        yield undefined;
                    }
                },
            }
        };
        return inst;
    }
};

module.exports = program;