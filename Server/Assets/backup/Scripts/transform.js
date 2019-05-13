var transform = {
    createInstance: function () {
        var instance = {
            name: 'Transform',
            params: {
                x: {
                    name: 'x',
                    type: 'number',
                    value: 0
                },
                y: {
                    name: 'y',
                    type: 'number',
                    value: 0
                },
                z: {
                    name: 'z',
                    type: 'number',
                    value: 0
                },
                rotation: {
                    name: 'rotation',
                    type: 'number',
                    value: 0
                },
                scaleX: {
                    name: 'scaleX',
                    type: 'number',
                    value: 1
                },
                scaleY: {
                    name: 'scaleY',
                    type: 'number',
                    value: 1
                }
            },
        }
        return instance;
    },
};

module.exports = transform;