var moveCharacter = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Move character',
            params: {
                character: {
                    name: 'Character',
                    type: 'gameObject',
                    value: undefined
                },
                uiToHide: {
                    name: 'UI to hide',
                    type: 'gameObject',
                    value: undefined
                },
                selectedSiteTag: {
                    name: 'Selected site tag',
                    type: 'fileObject',
                    value: undefined
                },
                moveAnimation: {
                    name: 'Move animation',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var character = inst.params.character.gameObjectRef;
                    var positionToGo = inst.context[inst.params.selectedSiteTag.value];
                    var siteToGo = positionToGo;
                    if (!positionToGo) {
                        return;
                    }
                    positionToGo = game.api.getComponent(positionToGo.gameObject, game.dev.transform);
                    var m = game.api.math;
                    positionToGo = positionToGo.interface.getWorldPosition(m.vector.create(0, 0));
                    var characterTransform = game.api.getComponent(character, game.dev.transform);

                    var charComponent = game.api.getComponent(character, game.dev.character);
                    var curSite = charComponent.interface.getSite(charComponent);

                    var levelOffset = siteToGo.params.level.value - curSite.params.level.value;

                    if (levelOffset === 0) {
                        return;
                    }

                    if (Math.abs(levelOffset) > 1) {
                        characterTransform.interface.setWorldPosition(positionToGo);
                        return;
                    }

                    var uiToHideTransform = game.api.getComponent(inst.params.uiToHide.gameObjectRef, game.dev.transform);
                    uiToHideTransform.params.x.value = -1000;

                    var animProgress = 0;
                    var curve = curSite.params.pathForward.gameObjectRef;
                    var weightFunc = function (w) {
                        return w;
                    };
                    if (levelOffset < 0) {
                        curve = curSite.params.pathBackwards.gameObjectRef;
                        weightFunc = function (w) {
                            return 1 - w;
                        };
                    }
                    curve = game.api.getComponent(curve, game.dev.bezierCurve);

                    var animation = game.library[inst.params.moveAnimation.value].scriptableObject;
                    animation = animation.component.instance;
                    var animDuration = animation.interface.getDuration(animation);
                    
                    while (animProgress <= animDuration) {
                        var t = weightFunc(animProgress / animDuration);
                        var pos = curve.interface.getPosition(curve, t);
                        characterTransform.interface.setWorldPosition(pos);
                        ++animProgress;
                        yield undefined;
                    }

                    uiToHideTransform.params.x.value = 0;
                },
                finish: function*(inst) {
                    var character = inst.params.character.gameObjectRef;
                    var characterTransform = game.api.getComponent(character, game.dev.transform);
                    game.api.baseStructures.saveGame.characterPosition = { x: characterTransform.params.x.value, y: characterTransform.params.y.value };
                }
            }
        };
        return inst;
    }
};

module.exports = moveCharacter;