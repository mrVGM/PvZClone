var forwardMove = {
    createInstance: function() {
        var inst = {
            name: 'Move to Direction',
            params: {
                actorTag: {
                    name: 'Actor Tag',
                    type: 'fileObject',
                    value: undefined
                },
                abilityAnimation: {
                    name: 'Ability Animation',
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
            },
            interface: {
                coroutine: function* (inst, playerInst) {
                    var actor = playerInst.context[inst.params.actorTag.value];
                    actor = game.api.getComponent(actor, game.dev.actor);
                    var animator = actor.params.animator.gameObjectRef;
                    animator = game.api.getComponent(animator, game.dev.animation.animator);

                    var m = game.api.math;
                    var moving = false;

                    animator.interface.playAnimation(animator, inst.params.abilityAnimation.value);
                    
                    var tr = actor.gameObject;
                    tr = game.api.getComponent(tr, game.dev.transform);
                    var dir = m.vector.create(inst.params.dirX.value, inst.params.dirY.value);
                    var magn = m.vector.magnitude(dir);
                    if (magn > 0) {
                        dir = m.vector.multiply(inst.params.speed.value / magn, dir);
                    }

                    while (true) {    
                        tr.params.x.value += dir.x;
                        tr.params.y.value += dir.y;

                        yield undefined;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = forwardMove;
