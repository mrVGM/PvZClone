var checkFinishConditions = {
    extendsFrom: 'Assets\\Scripts\\ProgramsAPI\\program.js',
    createInstance: function() {
        var inst = {
            name: 'Check Finish Conditions',
            params: {},
            interface: {
                coroutine: function* (inst) {
                    if (!game.api.baseStructures.levelState) {
                        game.api.baseStructures.levelState =  { result: 'playing' };
                    }
                    while (game.api.baseStructures.levelState.result === 'playing') {
                        yield undefined;
                    }
                    console.log(game.api.baseStructures.levelState.result);
                    game.api.baseStructures.levelState = undefined;
                }
            },
        };
        return inst;
    }
};

module.exports = checkFinishConditions;