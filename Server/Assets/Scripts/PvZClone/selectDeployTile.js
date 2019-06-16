var selectDeployTile = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Select DeployTile',
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
                selectedDeployTileTag: {
                    name: 'Selected Deploy Tile Tag',
                    type: 'fileObject',
                    value: undefined
                }
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
                        while (!game.input.mouseDown || game.input.mouseButton !== 0) {
                            yield undefined;
                        }
                        var pointedTargets = inst.events[inst.params.pointedTargetsTag.value];
                        var pointedTarget = getPointedTarget(pointedTargets, inst.params.deployTileTag.value);
                        
                        var pointedDeployTile = undefined;
                        if (pointedTarget) {
                            pointedDeployTile = game.api.getComponent(pointedTarget.gameObject, game.dev.deployTile);
                        }
                        if (!pointedDeployTile || !pointedDeployTile.interface.canDeploy(pointedDeployTile)) {
                            yield undefined;
                            continue;
                        }
                        while (game.input.mouseDown) {
                            yield undefined;
                        }
                        pointedTargets = inst.events[inst.params.pointedTargetsTag.value];
                        var target = getPointedTarget(pointedTargets, inst.params.deployTileTag.value);
                        if (target && target.id === pointedDeployTile.id) {
                            inst.context[inst.params.selectedDeployTileTag.value] = pointedDeployTile;
                            return;
                        }
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = selectDeployTile;