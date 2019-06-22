var shootComponent = {
    createInstance: function() {
        var inst = {
            name: 'ShootComponent',
            params: {
                shootTransform: {
                    name: 'ShootTransform',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = shootComponent;