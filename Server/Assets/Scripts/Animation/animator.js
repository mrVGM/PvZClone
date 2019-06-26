var animator = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    onLoad: function () {
        game.dev.animation.animator = animator;
    },
    createInstance: function () {
        var inst = {
            name: 'Animator',
            params: {
                defaultAnimation: {
                    name: 'Default Animation',
                    type: 'fileObject',
                    value: undefined
                },
                playAnimationAtStart: {
                    name: 'Play Animation at Start',
                    type: 'number',
                    value: 0
                }
            },
            interface: {
                currentAnimation: undefined,
                currentAnimationID: undefined,
                animationProgress: 0,
                toChange: undefined,
                playAnimation: function (inst, animation) {
                    inst.interface.toChange = animation;
                },
                coroutine: function* (inst) {
                    function moveOnInsideComponentProperties(param, propName) {
                        var res = param;

                        if (res.type === 'custom') {
                            res = res.value;
                        }
                        var key = parseInt(paramPath[j]);
                        if (isNaN(key)) {
                            key = paramPath[j];
                        }
                        res = res[key];
                        
                        return res;
                    }

                    while (true) {
                        if (inst.interface.toChange) {
                            inst.interface.currentAnimationID = inst.interface.toChange;
                            var anim = game.library[inst.interface.currentAnimationID].scriptableObject.component.instance;
                            inst.interface.currentAnimation = anim;
                            inst.interface.animationProgress = 0;
                        }

                        inst.interface.toChange = undefined;

                        if (inst.interface.currentAnimation && inst.interface.currentAnimation.interface.getDuration(inst.interface.currentAnimation) < inst.interface.animationProgress) {
                            if (inst.interface.currentAnimation.params.looped.value === 0) {
                                inst.interface.currentAnimation = undefined;
                                inst.interface.currentAnimationID = undefined;
                            }
                            inst.interface.animationProgress = 0;
                        }

                        if (!inst.interface.currentAnimation) {
                            yield;
                            continue;
                        }

                        var animationProperties = inst.interface.currentAnimation.params.properties.value;
                        for (var i = 0; i < animationProperties.length; ++i) {
                            var curProp = animationProperties[i];
                            var go = inst.gameObject;
                            if (curProp.value.goPath.value !== '') {
                                var path = curProp.value.goPath.value.split(',');
                                for (var j = 0; j < path.length; ++j) {
                                    go = go.children[parseInt(path[j])];
                                }
                            }
                            var component = curProp.value.component;
                            component = game.scripts[component.value];

                            component = game.api.getComponent(go, component);

                            var paramPath = curProp.value.propertyPath.value;
                            paramPath = paramPath.split('.');
                            var param = component.params;

                            for (var j = 0; j < paramPath.length; ++j) {
                                param = moveOnInsideComponentProperties(param, paramPath[j]);
                            }
                            var anim = curProp.value.propertyAnimation.value;
                            anim = game.library[anim].scriptableObject.component.instance;
                            param.value = anim.interface.getValue(anim, inst.interface.animationProgress);
                        }

                        if (inst.interface.currentAnimation && inst.interface.currentAnimation.params.events.value.script.value) {
                            var eventReceiverComponent = inst.interface.currentAnimation.params.events.value.script.value;
                            eventReceiverComponent = game.library[eventReceiverComponent];
                            eventReceiverComponent = game.api.getComponent(inst.gameObject, eventReceiverComponent);

                            if (eventReceiverComponent) {
                                for (var i = 0; i < inst.interface.currentAnimation.params.events.value.eventsToRaise.value.length; ++i) {
                                    var cur = inst.interface.currentAnimation.params.events.value.eventsToRaise.value[i].value;
                                    if (cur.keyNumber.value === inst.interface.animationProgress) {
                                        eventReceiverComponent.interface.addEvent(eventReceiverComponent, cur.data.value);
                                    }
                                }
                            }
                        }

                        ++inst.interface.animationProgress;
                        yield;
                    }
                },
                start: function(inst) {
                    game.api.startProgram(inst, {});
                    if (inst.params.playAnimationAtStart.value === 1) {
                        inst.interface.playAnimation(inst, inst.params.defaultAnimation.value);
                    }
                }
            }
        };
        return inst;
    },
};

module.exports = animator;