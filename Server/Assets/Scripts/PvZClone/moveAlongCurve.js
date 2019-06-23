var moveAlongCurve = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Move Along Curve',
            params: {
                chosenCurveTag: {
                    name: 'Chosen Curve Tag',
                    type: 'fileObject',
                    value: undefined
                },
                goToMove: {
                    name: 'GO To Move',
                    type: 'gameObject',
                    value: undefined
                },
                framesDuration: {
                    name: 'Frames Duration',
                    type: 'number',
                    value: 0
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var curve = inst.context[inst.params.chosenCurveTag.value];
                    curve = game.api.getComponent(curve, game.dev.bezierCurve);

                    var tr = inst.params.goToMove.gameObjectRef;
                    tr = game.api.getComponent(tr, game.dev.transform);

                    for (var i = 0; i <= inst.params.framesDuration.value; ++i) {
                        var curWeight = i / inst.params.framesDuration.value;
                        var curPos = curve.interface.getPosition(curve, curWeight);
                        tr.interface.setWorldPosition(curPos);
                        yield;
                    }
                },
            }
        };
        return inst;
    }
};

module.exports = moveAlongCurve;