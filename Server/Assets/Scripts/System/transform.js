var transform = {
    onLoad: function () {
        game.dev.transform = transform;
    },
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
                    name: 'Scale x',
                    type: 'number',
                    value: 1
                },
                scaleY: {
                    name: 'Scale y',
                    type: 'number',
                    value: 1
                },
            },
            interface: {
                getWorldPosition: function (p) {
                    function findParentTransform(go) {
                        if (!go) {
                            return;
                        }
                        var tr = game.api.getComponent(go, game.dev.transform);
                        if (tr) {
                            return tr;
                        }
                        return findParentTransform(go.parent);
                    }

                    var m = game.api.math;

                    var curGo = instance.gameObject;

                    var res = p;

                    while (curGo) {
                        var tr = findParentTransform(curGo);
                        if (tr) {
                            res = m.transform(tr, res);
                            curGo = tr.gameObject.parent;
                        } else {
                            return res;
                        }
                    }

                    return res;
                },
                setWorldPosition: function (p) {
                    var transforms = [];
                    var curGo = instance.gameObject.parent;

                    while (curGo) {
                        var tr = game.api.getComponent(curGo, game.dev.transform);
                        if (curGo) {
                            transforms.unshift(tr);
                        }
                        curGo = curGo.parent;
                    }
                    var res = p;
                    var m = game.api.math;
                    for (var i = 0; i < transforms.length; ++i) {
                        res = m.inverseTransform(transforms[i], res);
                    }
                    instance.params.x.value = res.x;
                    instance.params.y.value = res.y;
                }
            }
        };
        return instance;
    },
};

module.exports = transform;