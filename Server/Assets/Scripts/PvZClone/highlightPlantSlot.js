var highlightPlantSlot = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Highlight PlantSlot',
            hovered: undefined,
            params: {
                selectedPlantSlotTag: {
                    name: 'Selected Plant Slot Tag',
                    type: 'fileObject',
                    value: undefined
                },
                marker: {
                    name: 'Marker',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var plantSlot = inst.context[inst.params.selectedPlantSlotTag.value];
                    if (!plantSlot) {
                        return;
                    }
                    var plantSlotTr = game.api.getComponent(plantSlot.gameObject, game.dev.transform);
                    var markerTransform = inst.params.marker.gameObjectRef;
                    markerTransform = game.api.getComponent(markerTransform, game.dev.transform);
                    var posToGo = plantSlotTr.interface.getWorldPosition({x: 0, y: 0});
                    markerTransform.interface.setWorldPosition(posToGo);
                    while (true) {
                        yield undefined;
                    }
                },
                finish: function* (inst) {
                    var markerTransform = inst.params.marker.gameObjectRef;
                    markerTransform = game.api.getComponent(markerTransform, game.dev.transform);
                    markerTransform.params.x.value = -1000;
                }
            }
        };
        return inst;
    }
};

module.exports = highlightPlantSlot;