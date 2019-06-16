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
            },
            interface: {
                coroutine: function* (inst) {
                    if (typeof inst.context[inst.params.tagToCheck.value] !== 'undefined') {
                        return;
                    }
                    while (true) {
                        yield undefined;
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = waitIfNoContext;