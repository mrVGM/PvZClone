var pointer = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            interface: {
                coroutine: function (inst) {
                    function findColliders(go) {
                        var res = [];
                        var col = game.api.getComponent(go, game.dev.collider);
                        if (col) {
                            res = [col];
                        }
                        for (var i = 0; i < go.children.length; ++i) {
                            res = res.concat(findColliders(go.children[i]));
                        }
                        return res;
                    }
                    function crt() {
                        var liveObjects = game.api.baseStructures.liveObjects;
                        var cols = [];
                        for (var i = 0; i < liveObjects.length; ++i) {
                            cols = cols.concat(findColliders(liveObjects[i]));
                        }
                        var mousePos = game.input.mousePos;
                        if (mousePos) {
                            for (var i = 0; i < cols.length; ++i) {
                                if (cols[i].interface.isInside(cols[i], mousePos)) {
                                    var tr = game.api.getComponent(cols[i].gameObject, game.dev.transform);
                                    tr.params.x.value += 10;
                                }
                            }
                        }
                        return crt;
                    }
                    return crt;
                },
            }
        };
        return inst;
    }
};

module.exports = pointer;