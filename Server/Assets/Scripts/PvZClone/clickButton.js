var clickButton = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Click Button',
            params: {
                pointedTargetsTag: {
                    name: 'PointedTargetsTag',
                    type: 'fileObject',
                    value: undefined
                },
                buttonTag: {
                    name: 'Button Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    function hoveredButton(pointed, buttonTag) {
                        if (!pointed) {
                            return undefined;
                        }
                        for (var i = 0; i < pointed.length; ++i) {
                            if (pointed[i].params.targetType.value === buttonTag) {
                                return pointed[i].gameObject;
                            }
                        }
                    }
                    while (true) {
                        while (!game.input.mouseDown || game.input.mouseButton !== 0) {
                            yield undefined;
                        }
                        var pointedTargets = inst.events[inst.params.pointedTargetsTag.value];
                        var pointedButton = hoveredButton(pointedTargets, inst.params.buttonTag.value);
                        if (!pointedButton) {
                            yield undefined;
                            continue;
                        }
                        while (game.input.mouseDown) {
                            yield undefined;
                        }
                        pointedTargets = inst.events[inst.params.pointedTargetsTag.value];
                        var button = hoveredButton(pointedTargets, inst.params.buttonTag.value);
                        if (button && button.id === pointedButton.id) {
                            return;
                        }
                    }
                }
            }
        };
        return inst;
    }
};

module.exports = clickButton;