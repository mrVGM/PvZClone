var proxy = {
    onLoad: function() {
        game.dev.proxy = proxy;
    },
    createInstance: function() {
        var inst = {
            name: 'Proxy',
            params: {
                gameObject: {
                    name: 'Game Object',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = proxy;