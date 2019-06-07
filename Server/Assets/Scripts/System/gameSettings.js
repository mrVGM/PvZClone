var gameSettings = {
    onLoad: function () {
        game.dev.gameSettings = gameSettings;
    },
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

module.exports = gameSettings;