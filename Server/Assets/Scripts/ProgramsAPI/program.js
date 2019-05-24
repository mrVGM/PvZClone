var program = {
    onLoad: function () {
        console.log('ProgramLoaded');
        game.dev.programs.program = program;
    },
    createInstance: function () {
        var inst = {
            name: 'Program',
            stop: false,
            finished: false,
            subscribers: {},
            events: {},
            params: {
                updateTime: {
                    name: 'Update Time',
                    type: 'number',
                    value: 0,
                },
                subscribeTo: {
                    name: "Subscribe to:",
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: "custom",
                        value: {
                            tag: {
                                name: 'Tag',
                                type: 'fileObject',
                                value: undefined
                            },
                            program: {
                                name: 'Program',
                                type: 'gameObject',
                                value: undefined
                            }
                        }
                    }
                }
            },
            interface: {
                coroutine: function (inst) { },
                finish: function (inst) { },
                createCoroutine: function (inst) {
                    var c = inst.interface.coroutine(inst);
                    var f = inst.interface.finish;
                    var permanentStop = false;
                    function crt() {
                        if (!permanentStop && !inst.stop && c) {
                            c = c();
                            inst.events = {};
                            return crt;
                        }
                        if (!permanentStop) {
                            f = f(inst);
                        }
                        permanentStop = true;
                        if (f) {
                            f = f();
                            if (!f) {
                                inst.finished = true;
                            }
                            inst.events = {};
                            return crt;
                        }
                        inst.finished = true;
                    }
                    return crt;
                },
                start: function (inst) {
                    for (var i = 0; i < inst.params.subscribeTo.value.length; ++i) {
                        var cur = inst.params.subscribeTo.value[i];
                        var program = game.api.getComponent(cur.value.program.gameObjectRef, game.dev.programs.program);
                        if (!program.subscribers[cur.value.tag.value]) {
                            program.subscribers[cur.value.tag.value] = [];
                        }
                        program.subscribers[cur.value.tag.value].push(inst);
                    }
                },
                dispatchEvent: function (inst, tag, data) {
                    var subscribedPrograms = inst.subscribers[tag];

                    if (!subscribedPrograms)
                        return;

                    for (var i = 0; i < subscribedPrograms.length; ++i) {
                        var cur = subscribedPrograms[i];
                        cur.events[tag] = data;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = program;