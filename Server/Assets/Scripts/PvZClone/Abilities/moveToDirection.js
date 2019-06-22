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
                componentScript: {
                    name: 'Component Script',
                    type: 'fileObject',
                    value: undefined
                },
                notWalkableTag: {
                    name: 'Not walkable',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'fileObject',
                        value: undefined
                    }
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
                isEnabled: function(inst, playerInst) {
                    if (inst.params.notWalkableTag.value.length === 0) {
                        return true;
                    }

                    var actor = playerInst.context[inst.params.actorTag.value];
                    actor = game.api.getComponent(actor, game.dev.actor);
                    var componentScript = inst.params.componentScript.value;
                    componentScript = game.scripts[componentScript];
                    var component = game.api.getComponent(actor.gameObject, componentScript);
                    
                    var front = component.params.front.gameObjectRef;
                    front = game.api.getComponent(front, game.dev.transform);
                    
                    var back = component.params.back.gameObjectRef;
                    back = game.api.getComponent(back, game.dev.transform);

                    var cols = game.api.getAllComponents(game.dev.collider);
                    for (var i = 0; i < cols.length; ++i) {
                        var taggedComponent = game.api.getComponent(cols[i].gameObject, game.dev.taggedComponent);
                        if (!taggedComponent) {
                            continue;
                        }
                        var notWalkable = false;
                        for (var j = 0; j < inst.params.notWalkableTag.value.length; ++j) {
                            var curTag = inst.params.notWalkableTag.value[j].value;
                            if (taggedComponent.params.tag.value === curTag) {
                                notWalkable = true;
                                break;
                            }
                        }
                        if (!notWalkable) {
                            continue;
                        }
                        
                        if (cols[i].interface.isInside(cols[i], front.interface.getWorldPosition({x: 0, y: 0}))) {
                            return false;
                        }
                        if (cols[i].interface.isInside(cols[i], back.interface.getWorldPosition({x: 0, y: 0}))) {
                            return false;
                        }
                    }
                    return true;
                },
                coroutine: function* (inst, playerInst) {
                    var actor = playerInst.context[inst.params.actorTag.value];
                    actor = game.api.getComponent(actor, game.dev.actor);
                    var animator = actor.params.animator.gameObjectRef;
                    animator = game.api.getComponent(animator, game.dev.animation.animator);

                    var componentScript = inst.params.componentScript.value;
                    componentScript = game.scripts[componentScript];
                    var component = game.api.getComponent(actor.gameObject, componentScript);

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

                    while (inst.interface.isEnabled(inst, playerInst)) {
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
