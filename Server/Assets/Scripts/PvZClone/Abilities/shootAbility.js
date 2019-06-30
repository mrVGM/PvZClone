var shootAbility = {
    extendsFrom: "Assets\\Scripts\\PvZClone\\Abilities\\ability.js",
    createInstance: function() {
        var inst = {
            name: 'Shoot Ability',
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
                abilityAnimation: {
                    name: 'Ability Animation',
                    type: 'fileObject',
                    value: undefined
                },
                shootInterval: {
                    name: 'Shoot Interval',
                    type: 'number',
                    value: undefined
                },
                lastShootTag: {
                    name: 'Last Shoot Tag',
                    type: 'fileObject',
                    value: undefined
                },
                projectile: {
                    name: 'Projectile',
                    type: 'fileObject',
                    value: undefined
                },
                animationEventsTag: {
                    name: 'Animation Events Tag',
                    type: 'fileObject',
                    value: undefined
                },
                shootTag: {
                    name: 'Shoot Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                isEnabledImpl: function(inst, playerInst) {
                    var lastShoot = playerInst.context[inst.params.lastShootTag.value];
                    if (!lastShoot) {
                        return true;
                    }
                    var animation = game.library[inst.params.abilityAnimation.value].scriptableObject.component.instance;
                    var duration = animation.interface.getDuration(animation);
                    var frameOffset = game.api.lastFrame - lastShoot;

                    return frameOffset < duration || frameOffset >= inst.params.shootInterval.value;
                },
                coroutine: function* (inst, playerInst) {
                    var actor = playerInst.context[inst.params.actorTag.value];
                    actor = game.api.getComponent(actor, game.dev.actor);
                    var animator = actor.params.animator.gameObjectRef;
                    animator = game.api.getComponent(animator, game.dev.animation.animator);

                    var componentScript = inst.params.componentScript.value;
                    componentScript = game.scripts[componentScript];
                    var component = game.api.getComponent(actor.gameObject, componentScript);

                    animator.interface.playAnimation(animator, inst.params.abilityAnimation.value);
                    playerInst.context[inst.params.lastShootTag.value] = game.api.lastFrame;

                    if (inst.params.shootTag.value) {
                        while (true) {
                            var events = playerInst.events[inst.params.animationEventsTag.value];
                            if (!events) {
                                yield;
                                continue;
                            }
                            var shootEventReceived = false;
                            for (var i = 0; i < events.length; ++i) {
                                if (events[i] === inst.params.shootTag.value) {
                                    shootEventReceived = true;
                                    break;
                                }
                            }
                            if (shootEventReceived) {
                                break;
                            }
                            yield;
                        }
                    }

                    var shootPointTr = component.params.shootTransform.gameObjectRef;
                    shootPointTr = game.api.getComponent(shootPointTr, game.dev.transform);
                    var shootPointPos = shootPointTr.interface.getWorldPosition({x: 0, y: 0});

                    var prefab = game.library[inst.params.projectile.value];

                    prefab = game.api.instantiate(prefab.prefabStr);
                    var prefabTr = game.api.getComponent(prefab, game.dev.transform);
                    prefabTr.interface.setWorldPosition(shootPointPos);

                    var prefabActor = game.api.getComponent(prefab, game.dev.actor);
                    if (prefabActor) {
                        prefabActor.params.lane.value = actor.params.lane.value;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = shootAbility;
