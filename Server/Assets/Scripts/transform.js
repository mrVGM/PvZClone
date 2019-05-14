var transform = {
    onLoad: function () {
        if (!game.dev) {
            game.dev = {};
        }
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
                        var tr = document.game.api.getComponent(go, game.dev.transform);
                        if (tr) {
                            return tr;
                        }
                        return findParentTransform(go.parent);
                    }

                    var m = document.game.api.math;

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
            }
        };
        return instance;
    },
};

module.exports = transform;