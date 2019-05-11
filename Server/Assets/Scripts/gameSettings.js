var image = {
    createInstance: function () {
        var instance = {
            name: 'GameSettings',
            params: {
                initialPrefab: {
                    name: 'Initial Prefab',
                    type: 'fileObject',
                    value: undefined,
                },
            },
        }
        return instance;
    },
};

module.exports = image;