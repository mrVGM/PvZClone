var finishLevel = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Summary Screen',
            params: {
                levelDefinitionTag: {
                    name: 'Level Definition Tag',
                    type: 'fileObject',
                    value: undefined
                },
                winScreen: {
                    name: 'Win Screen',
                    type: 'fileObject',
                    value: undefined
                },
                loseScreen: {
                    name: 'Lose Screen',
                    type: 'fileObject',
                    value: undefined
                }
            },
            interface: {
                coroutine: function* (inst) {
                    var levelDef = undefined;
                    if (game.api.baseStructures.levelState.result === 'won') {
                        levelDef = inst.params.winScreen.value;
                    }
                    else if (game.api.baseStructures.levelState.result === 'lost') {
                        levelDef = inst.params.loseScreen.value;
                    }
                    inst.context[inst.params.levelDefinitionTag.value] = levelDef;
                    game.api.baseStructures.levelState = undefined;
                }
            },
        };
        return inst;
    }
};

module.exports = finishLevel;