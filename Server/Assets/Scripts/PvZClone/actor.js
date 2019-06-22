var actor = {
    onLoad: function() {
        game.dev.actor = actor;
    },
    createInstance: function() {
        var inst = {
            name: 'Actor',
            params: {
                health: {
                    name: 'Health',
                    type: 'number',
                    value: 100,
                },
                animator: {
                    name: 'Animator',
                    type: 'gameObject',
                    value: undefined
                },
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = actor;