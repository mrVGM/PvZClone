var checkFinishConditions = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Check Finish Conditions',
            params: {},
            interface: {
                coroutine: function* (inst) {
                    while (game.api.baseStructures.levelState.result === 'playing') {
                        yield undefined;
                    }

                    if (game.api.baseStructures.levelState.result === 'won') {
                        if (game.api.baseStructures.saveGame.levelCompleted < game.api.baseStructures.levelState.levelNumber) {
                            game.api.baseStructures.saveGame.levelCompleted = game.api.baseStructures.levelState.levelNumber;
                        }
                    }
                    game.api.baseStructures.levelState = undefined;
                }
            },
        };
        return inst;
    }
};

module.exports = checkFinishConditions;