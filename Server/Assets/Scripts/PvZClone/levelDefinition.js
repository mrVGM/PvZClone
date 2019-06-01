var levelDefinition = {
    createInstance: function() {
        var inst = {
            name: 'Level Definition',
            params: {
                prefabsToLoad: {
                    name: 'Prefabs To Load',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'fileObject',
                        value: undefined
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = levelDefinition;