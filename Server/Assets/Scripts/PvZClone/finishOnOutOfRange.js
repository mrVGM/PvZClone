var finishOnOutOfRange = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Finish On Out Of Range',
            params: {
                goToTrack: {
                    name: 'GO to track',
                    type: 'gameObject',
                    value: undefined
                },
                range: {
                    name: 'Range',
                    type: 'number',
                    value: 0
                }
            },
            interface: {
                getPos: function(inst) {
                    var tr = game.api.getComponent(inst.params.goToTrack.gameObjectRef, game.dev.transform);
                    var m = game.api.math;
                    return tr.interface.getWorldPosition(m.vector.create(0,0));
                },
                coroutine: function* (inst) {
                    yield;
                    var initialPos = inst.interface.getPos(inst);
                    var m = game.api.math;
                    var dist = 0;
                    do {
                        yield;
                        var tmp = m.vector.subtract(initialPos, inst.interface.getPos(inst));
                        dist = m.vector.magnitude(tmp);
                    } while (dist <= inst.params.range.value);
                }
            }
        };
        return inst;
    }
};

module.exports = finishOnOutOfRange;