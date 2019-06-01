var levelStarter = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            params: {
                selectedSiteTag: {
                    name: "Selected Site Tag",
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var selectedSite = inst.context[inst.params.selectedSiteTag.value];
                    var levelDefinition = selectedSite.params.levelDefinition.value;
                    levelDefinition = game.library[levelDefinition].scriptableObject;
                    levelDefinition = levelDefinition.component.instance;

                    game.api.destroyAllLiveObjects();
                    for (var i = 0; i < levelDefinition.params.prefabsToLoad.value.length; ++i) {
                        var curPrefab = levelDefinition.params.prefabsToLoad.value[i].value;
                        var prefab = game.library[curPrefab];
                        game.api.instantiate(prefab.prefabStr);
                    }
                    console.log(levelDefinition);
                }
            }
        };
        return inst;
    }
};

module.exports = levelStarter;