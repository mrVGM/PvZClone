var viewportSettings = {
    createInstance: function () {
        var instance = {
            params: {
                width: {
                    name: 'Width',
                    type: 'number',
                    value: 800,
                },
                height: {
                    name: 'Height',
                    type: 'number',
                    value: 600,
                },
            }
        };
        return instance;
    }
};

module.exports = viewportSettings;