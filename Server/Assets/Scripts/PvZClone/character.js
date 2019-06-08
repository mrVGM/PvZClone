var character = {
    onLoad: function () {
        game.dev.character = character;
    },
    createInstance: function () {
        var inst = {
            name: 'Character',
            params: {
                defaultAnimation: {
                    name: 'Default Animation',
                    type: 'fileObject',
                    value: undefined
                },
                playButton: {
                    name: 'Play Button',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                getSite: function (inst) {
                    var colliders = game.api.getAllComponents(game.dev.collider);
                    var tmp = [];
                    for (var i = 0; i < colliders.length; ++i) {
                        if (game.api.getComponent(colliders[i].gameObject, game.dev.site)) {
                            tmp.push(colliders[i]);
                        }
                    }
                    colliders = tmp;
                    var m = game.api.math;
                    var tr = game.api.getComponent(inst.gameObject, game.dev.transform);
                    var pos = tr.interface.getWorldPosition(m.vector.create(0, 0));
                    for (var i = 0; i < colliders.length; ++i) {
                        var cur = colliders[i];
                        if (cur.interface.isInside(cur, pos)) {
                            return game.api.getComponent(cur.gameObject, game.dev.site);
                        }
                    }
                },
                start: function(inst) {
                    var animator = game.api.getComponent(inst.gameObject, game.dev.animation.animator);
                    animator.interface.playAnimation(animator, inst.params.defaultAnimation.value);
                    if (game.api.baseStructures.saveGame.characterPosition) {
                        var tr = game.api.getComponent(inst.gameObject, game.dev.transform);
                        tr.params.x.value = game.api.baseStructures.saveGame.characterPosition.x;
                        tr.params.y.value = game.api.baseStructures.saveGame.characterPosition.y;
                    }
                    if (inst.interface.getSite(inst).params.level.value === 0) {
                        var tr = game.api.getComponent(inst.params.playButton.gameObjectRef, game.dev.transform);
                        tr.params.x.value = -1000;
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = character;