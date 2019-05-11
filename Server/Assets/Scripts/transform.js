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
                }
            },
            getLocalPosition: function() {
                var res = { x: instance.params.x.value, y: instance.params.y.value, z: instance.params.z.value };
                return res;
            },
            getWorldPosition: function() {
                var res = instance.getLocalPosition();
                var go = instance.gameObject.parent;
                while (go) {
                    for (var i = 0; i < go.components.length; ++i) {
                        if (go.components[i].instance.name === 'Transform') {
                            var loc = go.components[i].instance.getLocalPosition();
                            res = {
                                x: res.x + loc.x,
                                y: res.y + loc.y,
                                z: res.z + loc.z,
                            };
                            break;
                        }
                    }
                }
                return res;
            },
        }
        return instance;
    },
};

module.exports = transform;