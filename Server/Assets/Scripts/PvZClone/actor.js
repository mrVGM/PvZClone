var actor = {
    onLoad: function() {
        game.dev.actor = actor;
    },
    createInstance: function() {
        var inst = {
            params: {
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