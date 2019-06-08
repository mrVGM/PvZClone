var finishLevel = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Finish Level',
            params: {
                win: {
                    name: 'Win',
                    type: 'number',
                    value: 0
                }
            },
            interface: {
                coroutine: function* (inst) {
                    if (inst.params.win.value === 1) {
                        game.api.baseStructures.levelState.result = 'won';
                    } else {
                        game.api.baseStructures.levelState.result = 'lost';
                    }
                }
            },
        };
        return inst;
    }
};

module.exports = finishLevel;