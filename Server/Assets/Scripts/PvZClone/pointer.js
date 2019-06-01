var pointer = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Pointer',
            params: {
                pointedTargetsTag: {
                    name: 'Pointed Targets Tag:',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    function findColliders(go) {
                        var res = [];
                        var col = game.api.getComponent(go, game.dev.collider);
                        if (col && game.api.getComponent(go, game.dev.pointerTarget)) {
                            res = [col];
                        }
                        for (var i = 0; i < go.children.length; ++i) {
                            res = res.concat(findColliders(go.children[i]));
                        }
                        return res;
                    }
                    while (true) {
                        var liveObjects = game.api.baseStructures.liveObjects;
                        var cols = [];
                        for (var i = 0; i < liveObjects.length; ++i) {
                            cols = cols.concat(findColliders(liveObjects[i]));
                        }
                        var mousePos = game.input.mousePos;
                        if (mousePos) {
                            var pointed = [];
                            for (var i = 0; i < cols.length; ++i) {
                                var curCol = cols[i];
                                var pointerTarget = game.api.getComponent(curCol.gameObject, game.dev.pointerTarget);
                                if (!pointerTarget) {
                                    continue;
                                }
                                if (curCol.interface.isInside(curCol, mousePos)) {
                                    pointed.push(pointerTarget);
                                }
                            }
                            inst.interface.dispatchEvent(inst, inst.params.pointedTargetsTag.value, pointed);
                            //console.log(game.api.lastFrame, 'point events dispatched', pointed);
                        }
                        yield undefined;
                    }
                },
            }
        };
        return inst;
    }
};

module.exports = pointer;