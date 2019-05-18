var bezierCurve = {
    createInstance: function () {
        var inst = {
            params: {
                controlPoints: {
                    name: 'Control Points',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        name: 'Control Point',
                        type: 'custom',
                        value: {
                            weight: {
                                name: 'Weight',
                                type: 'number',
                                value: 0,
                            },
                            point: {
                                name: 'Point',
                                type: 'gameObject',
                                value: undefined
                            },
                            leftHandle: {
                                name: 'Left Handle',
                                type: 'gameObject',
                                value: undefined
                            },
                            rightHandle: {
                                name: 'Right Handle',
                                type: 'gameObject',
                                value: undefined
                            },
                        }
                    }
                },
            },
            interface: {},
        };
        return inst;
    },
};

module.exports = bezierCurve;