var contextPrinter = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function () {
        var inst = {
            name: 'Context printer',
            interface: {
                coroutine: function* (inst) {
                    console.log(inst.context);
                }
            }
        };
        return inst;
    }
};

module.exports = contextPrinter;