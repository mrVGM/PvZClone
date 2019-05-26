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
                coroutine: function (inst) {
                    var character = inst.params.character.gameObjectRef;
                    var siteToGo = inst.context[inst.params.selectedSiteTag.value];
                    if (!siteToGo) {
                        return;
                    }
                    siteToGo = game.api.getComponent(siteToGo.gameObject, game.dev.transform);
                    var m = game.api.math;
                    siteToGo = siteToGo.interface.getWorldPosition(m.vector.create(0, 0));
                    var characterTransform = game.api.getComponent(character, game.dev.transform);

                    characterTransform.interface.setWorldPosition(siteToGo);
                }
            }
        };
        return inst;
    }
};

module.exports = moveCharacter;