var hoverSite = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Hover Site',
            hovered: undefined,
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
                hoverAnimation: {
                    name: 'Hover animation',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function (inst) {
                    function crt() {
                        var pointed = inst.events[inst.params.pointedTargetsTag.value];
                        if (pointed) {
                            for (var i = 0; i < pointed.length; ++i) {
                                var pointerTarget = game.api.getComponent(pointed[i].gameObject, game.dev.pointerTarget);
                                if (pointerTarget && pointerTarget.params.targetType.value === inst.params.siteTag.value) {
                                    if (!inst.hovered) {
                                        var animator = game.api.getComponent(pointed[i].gameObject, game.dev.animation.animator);

                                        var anim = inst.params.hoverAnimation.value;
                                        anim = game.library[anim].scriptableObject.component.instance;

                                        animator.interface.playAnimation(animator, anim);
                                    }
                                    inst.hovered = pointed[i].gameObject;
                                    return crt;
                                }
                            }
                        }
                    }
                    return crt;
                },
                finish: function (inst) {
                    if (!inst.hovered)
                        return;

                    inst.hovered = undefined;
                }
            }
        };
        return inst;
    }
};

module.exports = hoverSite;