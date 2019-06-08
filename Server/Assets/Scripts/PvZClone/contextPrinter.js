var contextPrinter = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Context printer',
            interface: {
                coroutine: function* (inst) {
                    game.api.baseStructures.saveGame.programsContext = inst.context;
                }
            }
        };
        return inst;
    }
};

module.exports = contextPrinter;