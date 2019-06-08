var startLevelFromDefinition = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Start Level from Definition',
            params: {
                levelDefinition: {
                    name: "Level Definition",
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var levelDefinition = inst.params.levelDefinition.value;
                    levelDefinition = game.library[levelDefinition].scriptableObject;
                    levelDefinition = levelDefinition.component.instance;

                    game.api.destroyAllLiveObjects();
                    for (var i = 0; i < levelDefinition.params.prefabsToLoad.value.length; ++i) {
                        var curPrefab = levelDefinition.params.prefabsToLoad.value[i].value;
                        var prefab = game.library[curPrefab];
                        game.api.instantiate(prefab.prefabStr);
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = startLevelFromDefinition;