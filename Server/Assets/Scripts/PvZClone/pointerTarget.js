var pointerTarget = {
    onLoad: function () {
        game.dev.pointerTarget = pointerTarget;
    },
    createInstance: function () {
        var inst = {
            name: 'Pointer Target',
            params: {
                targetType: {
                    name: 'Target type',
                    type: 'fileObject',
                    value: undefined
                },
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = pointerTarget;