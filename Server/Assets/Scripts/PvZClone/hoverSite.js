var hoverSite = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Hover Site',
            hovered: undefined,
            mouseDown: false,
            params: {
                character: {
                    name: 'Character',
                    type: 'gameObject',
                    value: undefined
                },
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
                hoverAnimation: {
                    name: 'Hover animation',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    function getPointedSite(pointed, targetType) {
                        if (!pointed) {
                            return undefined;
                        }
                        for (var i = 0; i < pointed.length; ++i) {
                            var curTarget = pointed[i];
                            if (curTarget.params.targetType.value === targetType) {
                                return game.api.getComponent(curTarget.gameObject, game.dev.site);
                            }
                        }
                    }

                    while (true) {
                        var pointed = inst.events[inst.params.pointedTargetsTag.value];
                        var pointedSite = getPointedSite(pointed, inst.params.siteTag.value)
                        if (!pointedSite) {
                            return;
                        }

                        if (game.api.baseStructures.saveGame.levelCompleted + 1 < pointedSite.params.level.value) {
                            return;
                        }
                        
                        if (!inst.hovered) {
                            var animator = game.api.getComponent(pointedSite.gameObject, game.dev.animation.animator);
                            
                            var character = inst.params.character.gameObjectRef;
                            character = game.api.getComponent(character, game.dev.character);
                            var curSite = character.interface.getSite(character);

                            var isCurrentSelected = false;
                            if (curSite.params.level.value === pointedSite.params.level.value)
                                isCurrentSelected = true;
                            
                            var anim = inst.params.hoverAnimation.value;
                            if (!isCurrentSelected && animator.currentAnimationID !== anim) {
                                animator.interface.playAnimation(animator, anim);
                            }
                        }

                        inst.hovered = pointedSite.gameObject;
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