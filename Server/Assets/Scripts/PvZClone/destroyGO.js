var destroyGO = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Destroy GO',
            params: {
                go: {
                    name: 'Game Object',
                    type: 'gameObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    game.api.destroy(inst.params.go.gameObjectRef);
                }
            },
        };
        return inst;
    }
};

module.exports = destroyGO;