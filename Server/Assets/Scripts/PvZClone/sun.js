var sun = {
    onLoad: function() {
        game.dev.sun = sun;
    },
    createInstance: function() {
        var inst = {
            name: 'Sun',
            params: {
                sunAmount: {
                    name: 'Sun Amount',
                    type: 'number',
                    value: 100,
                }
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = sun;