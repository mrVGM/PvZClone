var moveToDirectionComponent = {
    createInstance: function() {
        var inst = {
            params: {
                front: {
                    name: 'Front',
                    type: 'gameObject',
                    value: undefined
                },
                back: {
                    name: 'Back',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {}
        };
        return inst;
    }
};

module.exports = moveToDirectionComponent;