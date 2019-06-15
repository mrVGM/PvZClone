var selectPlantSlot = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Select PlantSlot',
            hovered: undefined,
            params: {
                pointedTargetsTag: {
                    name: 'Pointed Targets Tag',
                    type: 'fileObject',
                    value: undefined
                },
                plantSlotTag: {
                    name: 'Plant Slot Tag',
                    type: 'fileObject',
                    value: undefined
                },
                selectPlantSlotTag: {
                    name: 'Selected Plant Slot Tag',
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
                        var pointedTarget = getPointedTarget(pointedTargets, inst.params.plantSlotTag.value);
                        
                        var pointedPlantSlot = undefined;
                        if (pointedTarget) {
                            pointedPlantSlot = game.api.getComponent(pointedTarget.gameObject, game.dev.plantSlot);
                        }
                        if (!pointedPlantSlot || !pointedPlantSlot.interface.canSelect(pointedPlantSlot)) {
                            yield undefined;
                            continue;
                        }
                        while (game.input.mouseDown) {
                            yield undefined;
                        }
                        pointedTargets = inst.events[inst.params.pointedTargetsTag.value];
                        var target = getPointedTarget(pointedTargets, inst.params.plantSlotTag.value);
                        if (target && target.id === pointedTarget.id) {
                            inst.context[inst.params.selectPlantSlotTag.value] = pointedPlantSlot;
                            return;
                        }
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = selectPlantSlot;