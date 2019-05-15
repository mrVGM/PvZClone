var input = {
    onLoad: function () {
        if (!game.dev) {
            game.dev = {};
        }
        game.dev.input = input;
    },
    createInstance: function () {
        var inst = {
            name: 'Collider',
            params: { },
            interface: {
                update: function (dt) {
                    function getColliders(go) {
                        var col = game.api.getComponent(go, game.dev.collider);
                        if (go.children.length === 0 && col) {
                            return [col];
                        }
                        var res = [];
                        if (col) {
                            res.push(col);
                        }
                        for (var i = 0; i < go.children.length; ++i) {
                            res = res.concat(getColliders(go.children[i]));
                        }
                        return res;
                    }
                    if (document.game.inputEvents.length > 0) {
                        for (var i = 0; i < document.game.inputEvents.length; ++i) {
                            var e = document.game.inputEvents[i];
                            if (e.type === 'click') {
                                var cols = [];
                                for (var i = 0; i < game.api.baseStructures.liveObjects.length; ++i) {
                                    cols = cols.concat(getColliders(game.api.baseStructures.liveObjects[i]));
                                }
                                for (var i = 0; i < cols.length; ++i) {
                                    var cur = cols[i];
                                    if (cur.interface.isInside(cur, game.api.math.vector.create(e.offsetX, e.offsetY))) {
                                        var tr = game.api.getComponent(cur.gameObject, game.dev.transform);
                                        tr.params.rotation.value += 10;
                                    }
                                }
                            }
                        }
                    }
                }
            },
        };
        return inst;
    },
};

module.exports = input;