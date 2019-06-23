var chooseRandomGO = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Choose Random GO',
            params: {
                chosenGOTag: {
                    name: 'Chosen GO Tag',
                    type: 'fileObject',
                    value: undefined
                },
                gos: {
                    name: 'GOs',
                    type: 'array',
                    value: [],
                    defaultElement: {
                        type: 'gameObject',
                        value: undefined
                    }
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var randIndex = Math.floor(Math.random() * inst.params.gos.value.length);
                    inst.context[inst.params.chosenGOTag.value] = inst.params.gos.value[randIndex].gameObjectRef;
                },
            }
        };
        return inst;
    }
};

module.exports = chooseRandomGO;