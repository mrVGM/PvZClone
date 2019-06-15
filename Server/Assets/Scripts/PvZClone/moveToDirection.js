var forwardMove = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Move to Direction',
            params: {
                activateMovingTag: {
                    name: 'Activate Moving Tag',
                    type: 'fileObject',
                    value: undefined
                },
                dirX: {
                    name: 'Dir X',
                    type: 'number',
                    value: 0
                },
                dirY: {
                    name: 'Dir Y',
                    type: 'number',
                    value: 0
                },
                speed: {
                    name: 'Speed',
                    type: 'number',
                    value: 0
                },
                moveTransform: {
                    name: 'MoveTransform',
                    type: 'gameObject',
                    value: undefined
                },
            },
            interface: {
                coroutine: function* (inst) {
                    var m = game.api.math;
                    var moving = false;
                    while (true) {
                        if (typeof inst.events[inst.params.activateMovingTag.value] !== 'undefined') {
                            moving = inst.events[inst.params.activateMovingTag.value];
                        }
                        if (moving) {
                            var tr = inst.params.moveTransform.gameObjectRef;
                            tr = game.api.getComponent(tr, game.dev.transform);
                            var dir = m.vector.create(inst.params.dirX.value, inst.params.dirY.value);
                            var magn = m.vector.magnitude(dir);
                            if (magn > 0) {
                                dir = m.vector.multiply(inst.params.speed.value / magn, dir);
                                tr.params.x.value += dir.x;
                                tr.params.y.value += dir.y;
                            }
                        }
                        yield undefined;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = forwardMove;