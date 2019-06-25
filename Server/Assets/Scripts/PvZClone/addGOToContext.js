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
                },
                component: {
                    name: 'Component',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var go = inst.params.transform.gameObjectRef;
                    if (typeof inst.params.component.value !== 'undefined') {
                        var script = game.scripts[inst.params.component.value];
                        go = game.api.getComponent(go, script);
                    }
                    inst.context[inst.params.tag.value] = go;
                }
            },
        };
        return inst;
    }
};

module.exports = addGOToContext;