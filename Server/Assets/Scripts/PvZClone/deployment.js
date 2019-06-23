var deployment = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
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
                },
                deployingTag: {
                    name: 'DeployingTag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                getDeploymentForFrame: function(inst, frame) {
                    for (var i = 0; i < inst.params.spawnData.value.length; ++i) {
                        if (frame === inst.params.spawnData.value[i].value.spawnFrame.value) {
                            return inst.params.spawnData.value[i].value;
                        }
                    }
                },
                coroutine: function*(inst) {
                    yield;

                    inst.interface.dispatchEvent(inst, inst.params.deployingTag.value, 1);

                    var initFrame = game.api.lastFrame;
                    var latest = 0;
                    for (var i = 0; i < inst.params.spawnData.value.length; ++i) {
                        if (latest < inst.params.spawnData.value[i].value.spawnFrame.value) {
                            latest = inst.params.spawnData.value[i].value.spawnFrame.value;
                        }
                    }

                    while (game.api.lastFrame - initFrame <= latest) {
                        var depl = inst.interface.getDeploymentForFrame(inst, game.api.lastFrame - initFrame);
                        if (depl) {
                            var prefab = depl.actorPrefab.value;
                            prefab = game.library[prefab];
                            game.api.instantiate(prefab.prefabStr, inst.gameObject);
                        }
                        yield;
                    }
                },
                finish: function*(inst) {
                    yield;
                    inst.interface.dispatchEvent(inst, inst.params.deployingTag.value, -1);
                },
            }
        };
        return inst;
    }
};

module.exports = deployment;