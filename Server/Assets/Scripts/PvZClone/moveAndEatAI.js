var forwardMove = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Move and Eat AI',
            params: {
                activateMovingTag: {
                    name: 'Activate Moving Tag',
                    type: 'fileObject',
                    value: undefined
                },
                waitTime: {
                    name: 'Wait Time',
                    type: 'number',
                    value: 1
                }
            },
            interface: {
                coroutine: function* (inst) {
                    for (var i = 0; i < inst.params.waitTime.value; ++i) {
                        yield undefined;
                    }
                    inst.interface.dispatchEvent(inst, inst.params.activateMovingTag.value, true);
                }
            },
        };
        return inst;
    }
};

module.exports = forwardMove;