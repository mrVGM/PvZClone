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
                },
                pointerTargetOrder: {
                    name: 'Pointer Target Order',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'fileObject',
                        value: undefined
                    }
                }
            },
            interface: {
                sortPointed: function(inst, pointed) {
                    function comp(x, y) {
                        var typeX = x.params.targetType.value;
                        var typeY = y.params.targetType.value;

                        var indX = inst.params.pointerTargetOrder.value.length;
                        var indY = inst.params.pointerTargetOrder.value.length;

                        for (var i = 0; i < inst.params.pointerTargetOrder.value.length; ++i) {
                            if (inst.params.pointerTargetOrder.value[i].value === typeX) {
                                indX = i;
                            }
                            if (inst.params.pointerTargetOrder.value[i].value === typeY) {
                                indY = i;
                            }
                        }
                        return indX - indY;
                    }
                    for (var i = 0; i < pointed.length - 1; ++i) {
                        for (var j = i + 1; j < pointed.length; ++j) {
                            if (comp(pointed[i], pointed[j]) > 0) {
                                var tmp = pointed[i];
                                pointed[i] = pointed[j];
                                pointed[j] = tmp;
                            }
                        }
                    }
                },
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

                            if (inst.params.pointerTargetOrder.value.length > 0 && pointed.length > 0) {
                                inst.interface.sortPointed(inst, pointed);
                                for (var i = 0; i < inst.params.pointerTargetOrder.value.length; ++i) {
                                    if (inst.params.pointerTargetOrder.value[i].value === pointed[0].params.targetType.value) {
                                        pointed = [pointed[0]];
                                        break;
                                    }
                                }
                            }

                            inst.interface.dispatchEvent(inst, inst.params.pointedTargetsTag.value, pointed);
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