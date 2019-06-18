var addGOToContext = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Add GO To Context',
            params: {
                transform: {
                    name: 'Transform',
                    type: 'gameObject',
                    value: undefined
                },
                tag: {
                    name: 'Tag',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    inst.context[inst.params.tag.value] = inst.params.transform.gameObjectRef;
                }
            },
        };
        return inst;
    }
};

module.exports = addGOToContext;