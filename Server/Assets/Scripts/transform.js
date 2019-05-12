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
            getLocalPosition: function () {
                var res = { x: instance.params.x.value, y: instance.params.y.value, z: instance.params.z.value };
                return res;
            },
            getWorldPosition: function () {
                function getLocationInParent(tr) {
                    var res = tr.instance.getLocalPosition();

                    var parentTr = findParentTransform(tr);
                    if (!parentTr) {
                        return res;
                    }

                    var rot = 2.0 * Math.PI * parentTr.instance.params.rot / 360.0;
                    var x = { x: Math.cos(rot), y: Math.sin(rot) };
                    var y = { x: -x.y, y: x.x };

                    res.x = res.x * x.x + res.y * y.x;
                    res.y = res.x * x.y + res.y * y.y;

                    return res;
                }

                function findParentTransform(tr) {
                    var parent = tr.gameObject.parent;
                    while (parent && !document.game.api.getComponent(parent, 'Transform')) {
                        parent = parent.parent;
                    }
                    if (!parent) {
                        return;
                    }
                    var parentTransform = document.game.api.getComponent(parent, 'Transform');
                    return parentTransform;
                }

                var res = instance.getLocalPosition();
                var go = instance.gameObject.parent;
                while (go) {
                    for (var i = 0; i < go.components.length; ++i) {
                        if (go.components[i].instance.name === 'Transform') {
                            var loc = getLocationInParent(go.components[i]);
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
        };
        return instance;
    },
};

module.exports = transform;