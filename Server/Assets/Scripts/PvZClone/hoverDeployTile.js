var hoverPlantSlot = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Hover DeployTile',
            hovered: undefined,
            params: {
                pointedTargetsTag: {
                    name: 'Pointed Targets Tag',
                    type: 'fileObject',
                    value: undefined
                },
                deployTileTag: {
                    name: 'Deploy Tile Tag',
                    type: 'fileObject',
                    value: undefined
                },
                tileMarker: {
                    name: 'Tile marker',
                    type: 'gameObject',
                    value: undefined
                },
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
                        var pointerTarget = getPointedTarget(pointed, inst.params.deployTileTag.value)
                        if (!pointerTarget) {
                            return;
                        }
                        var deployTile = game.api.getComponent(pointerTarget.gameObject, game.dev.deployTile);
                        if (!deployTile.interface.canDeploy(deployTile)) {
                            return;
                        }

                        var tr = game.api.getComponent(deployTile.gameObject, game.dev.transform);
                        var markerTr = inst.params.tileMarker.gameObjectRef;
                        markerTr = game.api.getComponent(markerTr, game.dev.transform);
                        var tilePos = tr.interface.getWorldPosition({x: 0, y: 0});
                        markerTr.interface.setWorldPosition(tilePos);
    
                        yield undefined;
                    }
                },
                finish: function* (inst) {
                    var tr = game.api.getComponent(inst.params.tileMarker.gameObjectRef, game.dev.transform);
                    tr.params.x.value = -1000;
                }
            }
        };
        return inst;
    }
};

module.exports = hoverPlantSlot;