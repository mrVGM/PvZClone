var deployPlant = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Deploy Plant',
            params: {
                selectedDeployTileTag: {
                    name: 'Selected Deploy Tile Tag',
                    type: 'fileObject',
                    value: undefined
                },
                selectedPlantSlotTag: {
                    name: 'Selected Plant Slot Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function*(inst) {
                    var selectedDeployTile = inst.context[inst.params.selectedDeployTileTag.value];
                    var selectedPlantSlot = inst.context[inst.params.selectedPlantSlotTag.value];
                    console.log(selectedDeployTile, selectedPlantSlot);
                    var plantData = selectedPlantSlot.params.plantData.value;
                    plantData = game.library[plantData].scriptableObject;
                    var plantPrefab = game.library[plantData.component.instance.params.plantPrefab.value];
                    game.api.instantiate(plantPrefab.prefabStr, selectedDeployTile.gameObject);

                    selectedPlantSlot.lastSpawn = game.api.lastFrame;

                    inst.context[inst.params.selectedDeployTileTag.value] = undefined;
                    inst.context[inst.params.selectedPlantSlotTag.value] = undefined;
                }
            },
        };
        return inst;
    }
};

module.exports = deployPlant;