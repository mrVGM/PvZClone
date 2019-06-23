var waitIfNoContext = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Wait If No Context',
            params: {
                tagToCheck: {
                    name: 'Tag To Check',
                    type: 'fileObject',
                    value: undefined
                },
                framesToWait: {
                    name: 'Frames To Wait',
                    type: 'number',
                    value: -1
                }
            },
            interface: {
                coroutine: function* (inst) {
                    if (typeof inst.context[inst.params.tagToCheck.value] !== 'undefined') {
                        return;
                    }
                    if (inst.params.framesToWait.value >= 0) {
                        for (var i = 0; i < inst.params.framesToWait.value; ++i) {
                            yield;
                        }
                        return;
                    }
                    while (true) {
                        yield;
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = waitIfNoContext;