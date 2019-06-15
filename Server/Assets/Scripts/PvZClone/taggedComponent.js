var taggedComponent = {
    onLoad: function() {
        game.dev.taggedComponent = taggedComponent;
    },
    createInstance: function() {
        var inst = {
            name: 'Tagged Component',
            params: {
                tag: {
                    name: 'Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = taggedComponent;