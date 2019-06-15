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
                abilityAnimation: {
                    name: 'Ability Animation',
                    type: 'fileObject',
                    value: undefined
                },
                idleAnimation: {
                    name: 'Idle Animation',
                    type: 'fileObject',
                    value: undefined
                },
                animator: {
                    name: 'Animator',
                    type: 'gameObject',
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
                        var command = undefined;
                        if (typeof inst.events[inst.params.activateMovingTag.value] !== 'undefined') {
                            command = inst.events[inst.params.activateMovingTag.value];
                        }
                        if (command && moving != command) {
                            var animator = inst.params.animator.gameObjectRef;
                            animator = game.api.getComponent(animator, game.dev.animation.animator);
                            if (command) {
                                animator.interface.playAnimation(animator, inst.params.abilityAnimation.value);
                            } else {
                                animator.interface.playAnimation(animator, inst.params.idleAnimation.value);
                            }
                            moving = command;
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