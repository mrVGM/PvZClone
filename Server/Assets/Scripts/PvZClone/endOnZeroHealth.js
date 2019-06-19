var endOnZeroHealth = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'End On Zero Health',
            params: {
                tag: {
                    name: 'Actor Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var actor = inst.context[inst.params.tag.value];
                    actor = game.api.getComponent(actor, game.dev.actor);
                    while(actor.params.health.value > 0) {
                        yield;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = endOnZeroHealth;