var program = {
    onLoad: function () {
        console.log('ProgramLoaded');
        game.dev.programs.program = program;
    },
    createInstance: function () {
        var inst = {
            name: 'Program',
            stop: false,
            started: false,
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
                    name: "Subscribe to",
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
                coroutine: function* (inst) { },
                finish: function* (inst) { },
                createCoroutine: function* (inst) {
                    var c = inst.interface.coroutine(inst);
                    var res = c.next();
                    while (!res.done && !inst.stop) {
                        inst.events = {};
                        yield undefined;
                        res = c.next();
                    }
                    var f = inst.interface.finish(inst);
                    res = f.next();
                    while (!res.done) {
                        inst.events = {};
                        yield undefined;
                        res = f.next();
                    }
                    inst.events = {};
                    inst.finished = true;
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
                receiveEvent: function(inst, tag, data) {
                    inst.events[tag] = data;
                },
                dispatchEventToProgram: function(inst, tag, data, program) {
                    program.interface.receiveEvent(program, tag, data);
                },
                dispatchEvent: function (inst, tag, data) {
                    var subscribedPrograms = inst.subscribers[tag];

                    if (!subscribedPrograms)
                        return;

                    for (var i = 0; i < subscribedPrograms.length; ++i) {
                        var cur = subscribedPrograms[i];
                        inst.interface.dispatchEventToProgram(inst, tag, data, cur);
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = program;