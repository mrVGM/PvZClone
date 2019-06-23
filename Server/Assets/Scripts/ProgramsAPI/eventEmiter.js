var eventEmitter = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        function findBrainIn(go) {
            var comp = game.api.getComponent(go, game.dev.programs.brain);
            if (comp) {
                return comp;
            }
            for (var i = 0; i < go.children.length; ++i) {
                comp = findBrainIn(go.children[i]);
                if (comp) {
                    return comp;
                }
            }
        }

        function findBrain() {
            for (var i = 0; i < game.api.baseStructures.liveObjects.length; ++i) {
                var br = findBrainIn(game.api.baseStructures.liveObjects[i]);
                if (br) {
                    return br;
                }
            }
        }

        var inst = {
            name: 'Event Emitter',
            params: {},
            interface: {
                coroutine: function*(inst) {
                    var brain = findBrain();
                    brain.eventEmitters.push(inst);

                    while (true) {
                        for (var prop in inst.events) {
                            for (var j = 0; j < brain.eventCatchers.length; ++j) {
                                inst.interface.dispatchEventToProgram(inst, prop, inst.events[prop], brain.eventCatchers[j]);
                            }
                        }
                        yield;
                    }
                },
                finish: function* (inst) {
                    var brain = findBrain();
                    var ind = -1;
                    for (var i = 0; i < brain.eventEmitters.length; ++i) {
                        var cur = brain.eventEmitters[i];
                        if (cur.gameObject.id === inst.gameObject.id) {
                            ind = i;
                            break;
                        }
                    }
                    if (ind >= 0) {
                        brain.eventEmitters.splice(ind, 1);
                    }
                }
            }
        };
        return inst;
    }
};
module.exports = eventEmitter;