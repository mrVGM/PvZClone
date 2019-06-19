var programPlayer = {
    onLoad: function() {
        game.dev.programs.programPlayer = programPlayer;
    },
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Program Player',
            params: {
                portableProgramTag: {
                    name: 'Portable Program Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function*(inst) {
                    var portableProgram = inst.context[inst.params.portableProgramTag.value];
                    if (!portableProgram) {
                        return;
                    }

                    var crt = portableProgram.interface.coroutine(portableProgram, inst);
                    var tmp = crt.next();
                    while (!tmp.done) {
                        yield tmp.value;
                        tmp = crt.next();
                    }
                },
                finish: function*(inst) {
                    var portableProgram = inst.context[inst.params.portableProgramTag.value];
                    if (!portableProgram || !portableProgram.interface.finish) {
                        return;
                    }
                    var crt = portableProgram.interface.finish(portableProgram, inst);
                    var tmp = crt.next();
                    while (!tmp.done) {
                        yield tmp.value;
                        tmp = crt.next();
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = programPlayer;