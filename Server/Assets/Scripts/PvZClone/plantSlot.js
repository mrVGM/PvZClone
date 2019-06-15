var plantSlot = {
    onLoad: function () {
        game.dev.plantSlot = plantSlot;
    },
    createInstance: function () {
        var inst = {
            name: 'Plant Slot',
            lastSpawn: undefined,
            params: {
                plantData: {
                    name: 'Plant Data',
                    type: 'fileObject',
                    value: undefined
                },
                plantAvatar: {
                    name: 'Plant Avatar',
                    type: 'gameObject',
                    value: undefined
                },
                curtain: {
                    name: 'Curtain',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                start: function(inst) {
                    var avatar = inst.params.plantAvatar.gameObjectRef;
                    avatar = game.api.getComponent(avatar, game.dev.image);
                    var plantData = inst.interface.getPlantData(inst);
                    avatar.params.image.value = plantData.params.plantAvatarImage.value;

                    inst.lastSpawn = game.api.lastFrame;
                },
                getPlantData: function(inst) {
                    return game.library[inst.params.plantData.value].scriptableObject.component.instance;
                },
                getLoadStatus: function(inst) {
                    var plantData = inst.interface.getPlantData(inst);
                    if (plantData.params.framesToLoad == 0) {
                        return 1;
                    }
                    return Math.min(1, (game.api.lastFrame - inst.lastSpawn) / plantData.params.framesToLoad.value);
                },
                canSelect: function(inst) {
                    return inst.interface.getLoadStatus(inst) === 1;
                },
                update: function(inst) {
                    var curtainTransform = inst.params.curtain.gameObjectRef;
                    curtainTransform = game.api.getComponent(curtainTransform, game.dev.transform);
                    
                    var plantData = inst.interface.getPlantData(inst);
                    var loaded = inst.interface.getLoadStatus(inst);
                    curtainTransform.params.scaleY.value = 1 - loaded;
                }
            },
        };
        return inst;
    }
};

module.exports = plantSlot;