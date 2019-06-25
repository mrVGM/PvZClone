var hoverPlantSlot = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Hover PlantSlot',
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
                selectedPlantSlotTag: {
                    name: 'Selected Plant Slot Tag',
                    type: 'fileObject',
                    value: undefined
                },
                sunStoreTag: {
                    name: 'Sun Store Tag',
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

                    var sunStore = inst.context[inst.params.sunStoreTag.value];
                    while (true) {
                        var pointed = inst.events[inst.params.pointedTargetsTag.value];
                        var pointerTarget = getPointedTarget(pointed, inst.params.plantSlotTag.value)
                        if (!pointerTarget) {
                            return;
                        }
                        var plantSlot = game.api.getComponent(pointerTarget.gameObject, game.dev.plantSlot);
                        var curSelected = inst.context[inst.params.selectedPlantSlotTag.value];
                        if (curSelected && curSelected.gameObject.id === plantSlot.gameObject.id) {
                            return;
                        }
                        if (!plantSlot.interface.canSelect(plantSlot, sunStore.params.sunCollected.value)) {
                            return;
                        }
                        if (inst.hovered && inst.hovered.gameObject.id !== pointerTarget.gameObject.id) {
                            return;
                        }
                        if (!inst.hovered) {
                            inst.hovered = pointerTarget;
                            var tr = game.api.getComponent(pointerTarget.gameObject, game.dev.transform);
                            tr.params.scaleX.value = 1.1;
                            tr.params.scaleY.value = 1.1;
                        }
                        yield undefined;
                    }
                },
                finish: function* (inst) {
                    if (!inst.hovered) {
                        return;
                    }
                    var tr = game.api.getComponent(inst.hovered.gameObject, game.dev.transform);
                    tr.params.scaleX.value = 1.0;
                    tr.params.scaleY.value = 1.0;
                    inst.hovered = undefined;
                }
            }
        };
        return inst;
    }
};

module.exports = hoverPlantSlot;