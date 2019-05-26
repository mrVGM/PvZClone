var site = {
    onLoad: function () {
        game.dev.site = site;
    },
    createInstance: function () {
        var inst = {
            name: 'Site',
            params: {
                level: {
                    name: 'Level',
                    type: 'number',
                    value: 0
                },
                levelDefinition: {
                    name: 'Level Definition',
                    type: 'fileObject',
                    value: undefined
                },
                pathBackwards: {
                    name: 'Path backwards',
                    type: 'gameObject',
                    value: undefined
                },
                pathForward: {
                    name: 'Path forward',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: { }
        };
        return inst;
    }
};
module.exports = site;