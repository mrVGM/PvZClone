var deployment = {
    createInstance: function() {
        var inst = {
            name: 'Deployment',
            initFrame: 0,
            params: {
                spawnData: {
                    name: 'Spawn Data',
                    type: 'array',
                    value: [], 
                    defaultElement: {
                        type: 'custom',
                        value: {
                            spawnFrame: {
                                name: 'Spawn Frame',
                                type: 'number',
                                value: 0
                            },
                            actorPrefab: {
                                name: 'Actor Prefab',
                                type: 'fileObject',
                                value: undefined
                            }
                        }
                    }
                }
            },
            interface: {
                update: function(inst) {
                    var frame = game.api.lastFrame - inst.initFrame;
                    for (var i = 0; i < inst.params.spawnData.value.length; ++i) {
                        var cur = inst.params.spawnData.value[i].value;
                        if (cur.spawnFrame.value === frame) {
                            var prefab = cur.actorPrefab.value;
                            prefab = game.library[prefab];
                            game.api.instantiate(prefab.prefabStr, inst.gameObject);
                        }
                    }
                },
                start: function(inst) {
                    inst.initFrame = game.api.lastFrame;
                }
            }
        };
        return inst;
    }
};

module.exports = deployment;