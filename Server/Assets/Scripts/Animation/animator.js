var animator = {
    onLoad: function () {
        game.dev.animation.animator = animator;
    },
    createInstance: function () {
        var inst = {
            name: 'Animator',
            currentAnimation: undefined,
            currentAnimationID: undefined,
            animationProgress: 0,
            toChange: undefined,
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
                playAnimation: function (inst, animation) {
                    inst.toChange = animation;
                },
                update: function (inst, dt) {
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

                    if (inst.toChange) {
                        inst.currentAnimationID = inst.toChange;
                        var anim = game.library[inst.currentAnimationID].scriptableObject.component.instance;
                        inst.currentAnimation = anim;
                        inst.animationProgress = 0;
                    }

                    inst.toChange = undefined;

                    if (inst.currentAnimation && inst.currentAnimation.interface.getDuration(inst.currentAnimation) < inst.animationProgress) {
                        if (inst.currentAnimation.params.looped.value === 0) {
                            inst.currentAnimation = undefined;
                            inst.currentAnimationID = undefined;
                        }
                        inst.animationProgress = 0;
                    }

                    if (!inst.currentAnimation) {
                        return;
                    }

                    var animationProperties = inst.currentAnimation.params.properties.value;
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
                        param.value = anim.interface.getValue(anim, inst.animationProgress);
                    }

                    if (inst.currentAnimation && inst.currentAnimation.params.events.value.script.value) {
                        var eventReceiverComponent = inst.currentAnimation.params.events.value.script.value;
                        eventReceiverComponent = game.library[eventReceiverComponent];
                        eventReceiverComponent = game.api.getComponent(inst.gameObject, eventReceiverComponent);

                        if (eventReceiverComponent) {
                            for (var i = 0; i < inst.currentAnimation.params.events.value.eventsToRaise.value.length; ++i) {
                                var cur = inst.currentAnimation.params.events.value.eventsToRaise.value[i].value;
                                if (cur.keyNumber.value === inst.animationProgress) {
                                    eventReceiverComponent.interface.addEvent(eventReceiverComponent, cur.data.value);
                                }
                            }
                        }
                    }

                    ++inst.animationProgress;
                },
                start: function(inst) {
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