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
                coroutine: function (inst) {
                    var children = inst.gameObject.children;
                    var subPrograms = [];
                    for (var i = 0; i < children.length; ++i) {
                        var subProg = game.api.getComponent(children[i], game.dev.programs.program);
                        subPrograms.push(subProg);
                        game.api.startProgram(subProg, inst.context);
                    }

                    function crt() {
                        for (var i = 0; i < subPrograms.length; ++i) {
                            var cur = subPrograms[i];
                            if (!cur.finished) {
                                continue;
                            }

                            for (var j = 0; j < inst.params.considerToEnd.value.length; ++j) {
                                var curConsidered = inst.params.considerToEnd.value[j];
                                if (cur.gameObject.id === curConsidered.gameObjectRef.id) {
                                    inst.stop = true;
                                    break;
                                }
                            }
                        }
                        return crt;
                    }
                    return crt;
                },
                finish: function (inst) {
                    var children = inst.gameObject.children;
                    var subPrograms = [];
                    for (var i = 0; i < children.length; ++i) {
                        var subProg = game.api.getComponent(children[i], game.dev.program);
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