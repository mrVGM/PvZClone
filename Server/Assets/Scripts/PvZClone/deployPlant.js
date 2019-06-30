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
                },
                sunStoreTag: {
                    name: 'Sun Store Tag',
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
                    plantData = game.library[plantData].scriptableObject.component.instance;
                    var plantPrefab = game.library[plantData.params.plantPrefab.value];
                    var plant = game.api.instantiate(plantPrefab.prefabStr, selectedDeployTile.gameObject);
                    var actorComponent = game.api.getComponent(plant, game.dev.actor);
                    actorComponent.params.lane.value = selectedDeployTile.params.lane.value;

                    var plantCost = selectedPlantSlot.interface.getSunCost(selectedPlantSlot);
                    var sunStore = inst.context[inst.params.sunStoreTag.value];
                    sunStore.params.sunCollected.value -= plantCost;

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