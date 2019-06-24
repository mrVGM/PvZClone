var waitForEventWithGO = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Wait for Event With GO',
            params: {
                tag: {
                    name: 'Tag',
                    type: 'fileObject',
                    value: undefined
                },
                go: {
                    name: 'GO',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    while (true) {
                        var gos = inst.events[inst.params.tag.value];
                        if (!gos) {
                            yield;
                            continue;
                        }
                        for (var i = 0; i < gos.length; ++i) {
                            if (gos[i].id === inst.params.go.gameObjectRef.id) {
                                return;
                            }
                        }
                        yield;
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = waitForEventWithGO;