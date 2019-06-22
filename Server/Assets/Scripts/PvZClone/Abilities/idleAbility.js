var idleAbility = {
    createInstance: function() {
        var inst = {
            name: 'Idle Ability',
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
            },
            interface: {
                isEnabled: function(inst, playerInst) {
                    return true;
                },
                coroutine: function* (inst, playerInst) {
                    var actor = playerInst.context[inst.params.actorTag.value];
                    actor = game.api.getComponent(actor, game.dev.actor);
                    var animator = actor.params.animator.gameObjectRef;
                    animator = game.api.getComponent(animator, game.dev.animation.animator);
                    animator.interface.playAnimation(animator, inst.params.abilityAnimation.value);
                }
            },
        };
        return inst;
    }
};

module.exports = idleAbility;
