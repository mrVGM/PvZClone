var hoverSite = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Hover Site',
            hovered: undefined,
            mouseDown: false,
            params: {
                pointedTargetsTag: {
                    name: 'PointedTargetsTag',
                    type: 'fileObject',
                    value: undefined
                },
                siteTag: {
                    name: 'Site Tag',
                    type: 'fileObject',
                    value: undefined
                },
                selectedSiteTag: {
                    name: 'Selected Site Tag',
                    type: 'fileObject',
                    value: undefined
                },
                hoverAnimation: {
                    name: 'Hover animation',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    function getPointedTarget(pointed, targetType) {
                        if (!pointed) {
                            return undefined;
                        }
                        for (var i = 0; i < pointed.length; ++i) {
                            var pointerTarget = game.api.getComponent(pointed[i].gameObject, game.dev.pointerTarget);
                            if (pointerTarget && pointerTarget.params.targetType.value === targetType) {
                                return pointerTarget;
                            }
                        }
                    }

                    while (true) {
                        var pointed = inst.events[inst.params.pointedTargetsTag.value];
                        var pointerTarget = getPointedTarget(pointed, inst.params.siteTag.value)
                        if (!pointerTarget) {
                            return;
                        }
                        
                        if (!inst.hovered) {
                            var animator = game.api.getComponent(pointerTarget.gameObject, game.dev.animation.animator);

                            var site = game.api.getComponent(pointerTarget.gameObject, game.dev.site);
                            var selectedSite = inst.context[inst.params.selectedSiteTag.value];

                            var isCurrentSelected = false;
                            if (selectedSite && selectedSite.params.level === site.params.level)
                                isCurrentSelected = true;
                            
                            var anim = inst.params.hoverAnimation.value;
                            if (!isCurrentSelected && animator.currentAnimationID !== anim) {
                                animator.interface.playAnimation(animator, anim);
                            }
                        }

                        inst.hovered = pointerTarget.gameObject;

                        if (game.input.mouseDown) {
                            inst.mouseDown = true;
                        }
                        if (inst.mouseDown && !game.input.mouseDown) {
                            inst.context[inst.params.selectedSiteTag.value] = game.api.getComponent(inst.hovered, game.dev.site);
                            return;
                        }

                        yield undefined;
                    }
                },
                finish: function* (inst) {
                    inst.hovered = undefined;
                    inst.mouseDown = false;
                    return;
                }
            }
        };
        return inst;
    }
};

module.exports = hoverSite;